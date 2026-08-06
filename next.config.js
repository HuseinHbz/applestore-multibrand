/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // نادیده گرفتن خطاهای ESLint هنگام build جهت جلوگیری از توقف سرور
    ignoreDuringBuilds: true,
  },
  typescript: {
    // نادیده گرفتن خطاهای تایپ اسکریپت در صورت وجود
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;