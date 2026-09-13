'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui';
import { footerNav } from '@/content/navigation';
import { MobileNav } from './MobileNav';
export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderForRoute key={pathname} />;
}
function HeaderForRoute() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const reset = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', reset);
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node))
        header.current
          ?.querySelectorAll('details[open]')
          .forEach((item) => item.removeAttribute('open'));
    };
    document.addEventListener('pointerdown', outside);
    return () => {
      media.removeEventListener('change', reset);
      document.removeEventListener('pointerdown', outside);
    };
  }, []);
  return (
    <header className="site-header" ref={header}>
      <div className="design-container header-row">
        <Link href="/" aria-label="DocRack home" className="brand-logo">
          <Image src="/docrack_full_logo.png" width={138} height={36} alt="DocRack" priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {footerNav.slice(0, 2).map((group) => (
            <details
              key={group.title}
              name="main-navigation"
              className="nav-disclosure"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.currentTarget.open = false;
                  event.currentTarget.querySelector('summary')?.focus();
                }
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node))
                  event.currentTarget.open = false;
              }}
            >
              <summary>
                {group.title}
                <ChevronDown size={14} aria-hidden="true" />
              </summary>
              <div className="nav-panel">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link href="/security">Security</Link>
          <Link href="/company">Company</Link>
        </nav>
        <div className="header-actions">
          <Button href="/book-demo" size="sm">
            Book a demo
          </Button>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
      {open && <MobileNav onClose={() => setOpen(false)} returnFocusTo={toggle} />}
    </header>
  );
}
