/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // 允许跨指定的域访问图片
  images: {
    domains: ['avatars.githubusercontent.com', 'media.graphassets.com'],
  },
}

module.exports = nextConfig
