/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['flagcdn.com', 'upload.wikimedia.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // Fix the data.json path issue by copying it to the public folder during build
  async rewrites() {
    return [
      {
        source: '/api/countries',
        destination: '/api/countries',
      },
    ];
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:*'],
};

module.exports = nextConfig;
