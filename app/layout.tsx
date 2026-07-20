import React from 'react';
import type { Metadata } from 'next';
import { Outfit, Inter, JetBrains_Mono, Poppins, Fraunces } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

// ── next/font — self-hosted, zero layout shift, no external request ────────
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
});

// ── Global SEO Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://docrack.in'),
  title: {
    default: 'DocRack | Compliance Tool for Indian CA Firms',
    template: '%s | DocRack',
  },
  description:
    'DocRack automates CARO 2020 checklists, reconciles Tally ledgers with GSTR-9C, and protects client records with Ed25519-signed Merkle audit trails. Built for Indian CA firms.',
  keywords: [
    'Compliance Tool India',
    'CARO 2020 Automation',
    'GSTR-9C Reconciliation',
    'Tally Integration',
    'CA Compliance Software',
    'Ed25519 Audit Trail',
    'Financial Data Security India',
  ],
  authors: [{ name: 'DocRack' }],
  creator: 'DocRack',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://docrack.in',
    siteName: 'DocRack',
    title: 'DocRack | Compliance Tool for Indian CA Firms',
    description:
      'Automate CARO 2020 checklists, reconcile Tally with GSTR-9C, and protect client records with cryptographic audit trails.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DocRack — Enterprise Compliance Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocRack | Compliance Tool for Indian CA Firms',
    description:
      'Automate CARO 2020, reconcile Tally with GSTR-9C, cryptographic audit trails. Built for Indian CA firms.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} ${poppins.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        {/* Skip to main content — keyboard/screen reader accessibility */}
        <a href="#main-content" className="skip-to-content" aria-label="Skip to main content">
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="marketing-workspace">
            {children}
          </main>
          <Footer />
          <Toaster
            richColors
            position="top-right"
            theme="system"
            aria-live="polite"
            aria-atomic="true"
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
