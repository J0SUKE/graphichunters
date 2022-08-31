/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
}

module.exports = nextConfig
