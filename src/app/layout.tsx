import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@/lib/analytics/Analytics';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo/metadata';
import './globals.css';

const manrope = localFont({
  src: '../../public/fonts/manrope-variable.woff2',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
  adjustFontFallback: false,
});
const manropeExtended = localFont({
  src: '../../public/fonts/manrope-latin-ext.woff2',
  variable: '--font-manrope-ext',
  display: 'swap',
  weight: '200 800',
  adjustFontFallback: false,
});
const editorial = localFont({
  src: [
    { path: '../../public/fonts/instrument-serif-regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/instrument-serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-editorial',
  display: 'swap',
  preload: false,
  fallback: ['Georgia'],
});

// ── Global SEO Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DocRack — Audit fieldwork execution for internal audit',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Internal audit software',
    'Audit fieldwork automation',
    'Audit test recipes',
    'Working paper automation',
    'Credit audit software',
    'IFC SOX control testing',
    'Audit evidence traceability',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Open Graph images come from app/opengraph-image.tsx, which Next wires up
  // automatically — the previous static /og-image.png never existed and every
  // share rendered a broken image.
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'DocRack — Audit fieldwork execution for internal audit',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocRack — Audit fieldwork execution for internal audit',
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${manropeExtended.variable} ${editorial.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
