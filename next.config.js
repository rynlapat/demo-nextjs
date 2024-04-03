/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// next.config.js

const withImages = require('next-images');
module.exports = withImages();

require('dotenv').config();


