const { withContentlayer } = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' - we need SSR for:
  // - Authentication middleware
  // - API routes (/api/auth/*, /api/users/*)
  // - Contentlayer2 with rehype-mermaid
  reactStrictMode: true,
  swcMinify: true,

  // Contentlayer2 configuration
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },

  // Ensure proper handling of server components
  experimental: {
    serverComponentsExternalPackages: ['playwright'],
  },
};

module.exports = withContentlayer(nextConfig);
