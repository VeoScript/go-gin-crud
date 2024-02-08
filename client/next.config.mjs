/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL_DEVELOPMENT: process.env.API_URL_DEVELOPMENT,
    API_URL_PRODUCTION: process.env.API_URL_PRODUCTION,
    COOKIE_NAME: process.env.COOKIE_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
};

export default nextConfig;
