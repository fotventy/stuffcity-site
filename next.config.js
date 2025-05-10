/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Позволяет Next.js обрабатывать изображения даже если они пустые/заглушки
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV !== 'production',
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig; 