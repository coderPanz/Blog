/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'media.graphassets.com'],
  },
}

module.exports = nextConfig
