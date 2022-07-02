/** @type {import('next').NextConfig} */
// require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    NFTStorage_KEY: process.env.STORAGE_API_KEY,
  }
}

module.exports = nextConfig
