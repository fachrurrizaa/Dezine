import { createProxyMiddleware } from 'http-proxy-middleware';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.giphy.com'],
  },
  async rewrites() {
    return [
      {
        // Semua permintaan /api kecuali /api/auth, /api/contact, dan /api/user
        source: '/api/:path((?!auth|user|contact|subscribe|notification).*)', 
        destination: 'https://backend-dezine.vercel.app/api/:path*',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

export default nextConfig;
