const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Create Brand
  const brand = await prisma.brand.create({
    data: {
      name: 'Apple Store Iran',
      logo: '/logo.svg',
      primaryColor: '#007AFF',
      currency: 'تومان',
      slogan: 'فروشگاه رسمی محصولات اپل',
      domain: 'applestore.ir',
    }
  })
  console.log('✅ Brand created:', brand.name)

  // 2. Create Branches
  const branches = await prisma.branch.createMany({
    data: [
      { name: 'شعبه ونک', address: 'تهران، خیابان ونک، پلاک ۱۲۳', phone: '۰۲۱-۸۸۷۷۶۶۵۵', hours: '۹:۰۰ - ۲۱:۰۰', lat: 35.7575, lng: 51.3999, brandId: brand.id },
      { name: 'شعبه تجریش', address: 'تهران، میدان تجریش، خیابان جعفری', phone: '۰۲۱-۲۲۷۷۸۸۹۹', hours: '۹:۰۰ - ۲۲:۰۰', lat: 35.8047, lng: 51.4330, brandId: brand.id },
      { name: 'شعبه اصفهان', address: 'اصفهان، خیابان چهارباغ، پلاک ۴۵', phone: '۰۳۱-۳۳۲۲۱۱۰۰', hours: '۹:۰۰ - ۲۱:۰۰', lat: 32.6546, lng: 51.6680, brandId: brand.id },
    ]
  })
  console.log('✅ Branches created:', branches.count)

  // 3. Create Users
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const users = await prisma.user.createMany({
    data: [
      { name: 'مدیر سیستم', email: 'admin@applestore.ir', phone: '۰۹۱۲۳۴۵۶۷۸۹', password: adminPassword, role: 'admin', addresses: ['تهران، ونک'], brandId: brand.id },
      { name: 'علی احمدی', email: 'ali@example.com', phone: '۰۹۱۲۱۱۲۲۳۳۴۴', password: userPassword, role: 'customer', addresses: ['تهران، تجریش'], brandId: brand.id },
    ]
  })
  console.log('✅ Users created:', users.count)

  // 4. Create Products
  const products = await prisma.product.createMany({
    data: [
      { slug: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'mobile', brandName: 'Apple', description: 'قدرتمندترین آیفون با طراحی تیتانیومی و دوربین پیشرفته.', featured: true, brandId: brand.id, specs: { display: '6.3" Super Retina XDR', chip: 'A18 Pro', camera: '48MP Main + 48MP Ultra Wide', battery: 'Up to 27h video', os: 'iOS 18' } },
      { slug: 'iphone-16', name: 'iPhone 16', category: 'mobile', brandName: 'Apple', description: 'آیفون ۱۶ با چیپ A18 و دوربین کنترل دوربین جدید.', featured: true, brandId: brand.id, specs: { display: '6.1" Super Retina XDR', chip: 'A18', camera: '48MP Main + 12MP Ultra Wide', battery: 'Up to 22h video', os: 'iOS 18' } },
      { slug: 'macbook-pro-14', name: 'MacBook Pro 14"', category: 'laptop', brandName: 'Apple', description: 'قدرت حرفه‌ای در یک لپ‌تاپ فوق‌العاده.', featured: true, brandId: brand.id, specs: { display: '14.2" Liquid Retina XDR', chip: 'M4 Pro', ram: '18GB unified memory', storage: '512GB SSD', battery: 'Up to 22h' } },
      { slug: 'airpods-pro-2', name: 'AirPods Pro 2', category: 'accessory', brandName: 'Apple', description: 'صدای فوق‌العاده با حذف نویز فعال نسل دوم.', featured: false, brandId: brand.id, specs: { type: 'In-ear', anc: 'Active Noise Cancellation', battery: 'Up to 6h listening', connectivity: 'Bluetooth 5.3' } },
      { slug: 'apple-watch-series-10', name: 'Apple Watch Series 10', category: 'accessory', brandName: 'Apple', description: 'نازک‌ترین و بزرگ‌ترین صفحه نمایش اپل واچ.', featured: true, brandId: brand.id, specs: { display: '46mm OLED', health: 'ECG, Blood Oxygen, Sleep', waterResistant: '50m', battery: 'Up to 18h' } },
      { slug: 'ipad-pro-13', name: 'iPad Pro 13"', category: 'tablet', brandName: 'Apple', description: 'قدرت بی‌نظیر در نازک‌ترین آیپد.', featured: false, brandId: brand.id, specs: { display: '13" Ultra Retina XDR', chip: 'M4', storage: '256GB', connectivity: 'Wi-Fi 6E + 5G' } },
    ]
  })
  console.log('✅ Products created:', products.count)

  // 5. Create Variants
  const allProducts = await prisma.product.findMany()
  const variantData = []

  const variantConfigs = [
    { productSlug: 'iphone-16-pro', variants: [
      { color: 'Natural Titanium', storage: '256GB', price: 89990000, sku: 'IP16P-256-NT' },
      { color: 'Natural Titanium', storage: '512GB', price: 104990000, sku: 'IP16P-512-NT' },
      { color: 'Black Titanium', storage: '256GB', price: 89990000, sku: 'IP16P-256-BT' },
      { color: 'White Titanium', storage: '512GB', price: 104990000, sku: 'IP16P-512-WT' },
    ]},
    { productSlug: 'iphone-16', variants: [
      { color: 'Black', storage: '128GB', price: 54990000, sku: 'IP16-128-BK' },
      { color: 'White', storage: '256GB', price: 62990000, sku: 'IP16-256-WH' },
    ]},
    { productSlug: 'macbook-pro-14', variants: [
      { color: 'Space Black', storage: '512GB', price: 124990000, sku: 'MB14-512-SB' },
    ]},
    { productSlug: 'airpods-pro-2', variants: [
      { color: 'White', storage: '-', price: 12990000, sku: 'APP2-WH' },
    ]},
    { productSlug: 'apple-watch-series-10', variants: [
      { color: 'Silver', storage: '46mm', price: 24990000, sku: 'AW10-46-SV' },
    ]},
    { productSlug: 'ipad-pro-13', variants: [
      { color: 'Space Black', storage: '256GB', price: 84990000, sku: 'IP13-256-SB' },
    ]},
  ]

  for (const config of variantConfigs) {
    const product = allProducts.find(p => p.slug === config.productSlug)
    if (product) {
      for (const v of config.variants) {
        variantData.push({ ...v, productId: product.id })
      }
    }
  }

  await prisma.variant.createMany({ data: variantData })
  console.log('✅ Variants created:', variantData.length)

  // 6. Create Inventories
  const allBranches = await prisma.branch.findMany()
  const allVariants = await prisma.variant.findMany()
  const inventoryData = []

  for (const branch of allBranches) {
    for (const variant of allVariants) {
      inventoryData.push({
        qty: Math.floor(Math.random() * 20) + 5,
        branchId: branch.id,
        variantId: variant.id,
      })
    }
  }

  await prisma.inventory.createMany({ data: inventoryData })
  console.log('✅ Inventories created:', inventoryData.length)

  // 7. Create Contents
  await prisma.content.createMany({
    data: [
      { type: 'blog', slug: 'iphone-16-review', title: 'بررسی کامل iPhone 16 Pro', excerpt: 'آیا آیفون ۱۶ پرو ارزش خرید دارد؟', body: '...', featured: true, brandId: brand.id },
      { type: 'news', slug: 'new-store-opening', title: 'افتتاح شعبه جدید در شیراز', excerpt: 'شعبه جدید اپل استور ایران در شیراز افتتاح شد.', body: '...', featured: false, brandId: brand.id },
    ]
  })
  console.log('✅ Contents created')

  // 8. Create Reviews
  const iphone16Pro = allProducts.find(p => p.slug === 'iphone-16-pro')
  const iphone16 = allProducts.find(p => p.slug === 'iphone-16')

  if (iphone16Pro && iphone16) {
    await prisma.review.createMany({
      data: [
        { productId: iphone16Pro.id, rating: 5, comment: 'عالی! کاملاً اورجینال و باکیفیت.', userName: 'علی احمدی' },
        { productId: iphone16Pro.id, rating: 4, comment: 'خیلی خوب بود فقط بسته‌بندی می‌تونست بهتر باشه.', userName: 'سارا کریمی' },
        { productId: iphone16.id, rating: 5, comment: 'بهترین خریدم تا حالا!', userName: 'محمد رضایی' },
      ]
    })
    console.log('✅ Reviews created')
  }

  // 9. Create Orders
  const aliUser = await prisma.user.findUnique({ where: { email: 'ali@example.com' } })
  const venakBranch = await prisma.branch.findFirst({ where: { name: 'شعبه ونک' } })
  const ip16ProVariant = await prisma.variant.findFirst({ where: { sku: 'IP16P-256-NT' } })

  if (aliUser && venakBranch && ip16ProVariant) {
    const order = await prisma.order.create({
      data: {
        userId: aliUser.id,
        branchId: venakBranch.id,
        status: 'delivered',
        total: ip16ProVariant.price,
        address: 'تهران، تجریش',
        items: {
          create: {
            variantId: ip16ProVariant.id,
            quantity: 1,
            price: ip16ProVariant.price,
          }
        }
      }
    })
    console.log('✅ Order created:', order.id)
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
