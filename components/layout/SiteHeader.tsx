'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { cn } from '@/lib/utils';
import { primaryNav, DEMO_HREF } from '@/lib/nav';
import { MobileNav } from './MobileNav';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Hairline appears only once the page has moved, so the header sits flush
  // with the hero at rest (§10.2 "sticky after scrolling").
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'tone-light sticky top-0 z-40 bg-surface transition-[box-shadow,border-color] duration-base ease-out',
        'supports-[backdrop-filter]:bg-surface/80 supports-[backdrop-filter]:backdrop-blur-md',
        // At rest the header sits on the hero's white gradient and is
        // invisible; a shadow as well as a border is what detaches it.
        scrolled ? 'border-b border-line shadow-1' : 'border-b border-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label="DocRack — home">
            <Image
              src="/docrack_full_logo.png"
              alt="DocRack"
              width={140}
              height={34}
              priority
              className="h-[26px] w-auto object-contain"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative rounded-button px-3 py-2 text-body-sm transition-colors duration-fast ease-out',
                        active ? 'text-ink' : 'text-muted hover:text-ink'
                      )}
                    >
                      {item.label}
                      {/* Colour alone at 15px is a weak current-page cue. */}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-[9px] h-0.5 bg-accent"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* No Sign in link until the product app has a public entry
                point — see the note in MobileNav. */}
            <Button href="/support" variant="ghost" size="sm" className="hidden lg:inline-flex">
              Contact us
            </Button>
            <Button href={DEMO_HREF} size="sm" className="hidden sm:inline-flex">
              Book a demo
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open navigation"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-button text-ink hover:bg-canvas lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusTo={toggleRef} />
    </header>
  );
}
