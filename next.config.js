/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  optimizeFonts: false,
  env: {
    DB_CONNECTION_LOCAL: process.env.DB_CONNECTION_LOCAL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
};
