/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // Para posters da OMDb
      },
    ],
  },
};

module.exports = nextConfig;