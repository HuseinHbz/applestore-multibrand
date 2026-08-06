#!/bin/bash

# خروج در صورت بروز هرگونه خطا
set -e

DOMAIN="apple.zahrajim.ir"
DB_NAME="applestore"
DB_USER="applestore_user"
DB_PASS="SecurePassword123!" # تغییر این رمز عبور پیشنهاد می‌شود

echo "🚀 آغاز فرایند نصب کامل پیش‌نیازها و راه‌اندازی روی دامنه $DOMAIN..."

# ۱. به‌روزرسانی سیستم‌عامل
echo "🔄 ۱. به‌روزرسانی پکیج‌های سیستم..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential nginx certbot python3-certbot-nginx postgresql postgresql-contrib

# ۲. نصب Node.js (نسخه 20 LTS) و PM2
echo "📦 ۲. نصب Node.js 20 و PM2..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# ۳. پیکربندی پایگاه داده PostgreSQL
echo "🗄️ ۳. پیکربندی پایگاه داده PostgreSQL..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# ساخت دیتابیس و کاربر در صورتی که وجود نداشته باشند
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;" || true
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" || true
sudo -u postgres psql -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;" || true

# ۴. نصب بسته‌های پروژه و همگام‌سازی دیتابیس
echo "📂 ۴. نصب بسته‌ها و آماده‌سازی پروژه..."
npm install

# تنظیم فایل .env
cat << EOF > .env
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}?schema=public"
NEXT_PUBLIC_BASE_URL="https://${DOMAIN}"
ZARINPAL_MERCHANT_ID="134b0847-19cf-4a11-825f-200780211516"
NODE_ENV="production"
EOF

# ساخت جداول دیتابیس و Seed
npx prisma generate
npx prisma db push
node prisma/seed.js || true

# ۵. ساخت خروجی Production
echo "🏗️ ۵. Build کردن پروژه Next.js..."
npm run build

# ۶. مدیریت پروسه با PM2
echo "⚡ ۶. اجرای پروژه با PM2..."
pm2 delete applestore || true
pm2 start npm --name "applestore" -- start -- -p 3000
pm2 save
pm2 startup | tail -n 1 | bash || true

# ۷. پیکربندی Nginx Reverse Proxy
echo "🌐 ۷. تنظیم Nginx برای $DOMAIN..."
cat << EOF | sudo tee /etc/nginx/sites-available/applestore
server {
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    client_max_body_size 20M;
}
EOF

# فعال‌سازی کانفیگ Nginx
sudo ln -sf /etc/nginx/sites-available/applestore /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# ۸. دریافت گواهی SSL رایگان (HTTPS)
echo "🔒 ۸. نصب SSL روی دامنه $DOMAIN..."
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --redirect -m admin@zahrajim.ir || {
    echo "⚠️ دریافت SSL با خطا مواجه شد. لطفاً مطمئن شوید A Record دامنه $DOMAIN به IP این سرور اشاره می‌کند."
}

echo "✅ نصب و راه‌اندازی کامل شد! سایت شما روی https://$DOMAIN در دسترس است."
