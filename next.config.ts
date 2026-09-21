import { securityHeaders } from './src/lib/security-headers';
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone) for a lean Docker image
  output: 'standalone',

  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Permanent route migrations run in src/proxy.ts so 308 responses retain headers.

  // Compiler optimizations — keep console.error so route failures reach server logs
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer({ enabled: true, openAnalyzer: false })(nextConfig)
  : nextConfig;
