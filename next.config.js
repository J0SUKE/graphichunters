/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.datocms-assets.com','www.graphichunters.com'],
  },
}

module.exports = nextConfig
