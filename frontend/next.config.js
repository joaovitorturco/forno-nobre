/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite carregar os banners de produto servidos pela API local.
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
      },
    ],
  },
};

module.exports = nextConfig;
