import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Explicit sequential focus keeps the bypass reachable in WebKit's limited link-tab mode. */}
      <a href="#main-content" className="skip-to-content" tabIndex={0}>
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
