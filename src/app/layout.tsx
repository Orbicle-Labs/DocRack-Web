import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@/lib/analytics/Analytics';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo/metadata';
import './globals.css';

const manrope = localFont({
  src: '../../public/fonts/manrope-variable.woff2',
  variable: '--font-manrope',
  display: 'optional',
  weight: '200 800',
  adjustFontFallback: false,
});
const manropeExtended = localFont({
  src: '../../public/fonts/manrope-latin-ext.woff2',
  variable: '--font-manrope-ext',
  display: 'optional',
  weight: '200 800',
  adjustFontFallback: false,
  // Extended glyphs remain available without competing with the opening's fonts.
  preload: false,
  // Upstream Fontsource 5.3.0 subset coverage: avoid fetching this face for
  // unsupported symbols that will ultimately use the system fallback anyway.
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
    },
  ],
});
const editorial = localFont({
  src: [
    { path: '../../public/fonts/instrument-serif-regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/instrument-serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-editorial',
  display: 'optional',
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
