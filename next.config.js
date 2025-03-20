/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['flagcdn.com', 'upload.wikimedia.org'],
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
