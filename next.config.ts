import { activeRedirects } from './src/content/routes';
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      process.env.NODE_ENV === 'development'
        ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
        : "script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      'frame-src https://www.youtube-nocookie.com https://www.youtube.com',
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

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

  // Existing route migrations. 308 rather than 307: these are permanent moves
  // and the link equity should transfer. Each `source` is an exact path, so
  // none of them can shadow /api/*.
  async redirects() {
    return activeRedirects;
  },

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
