'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';
import { primaryNav, DEMO_HREF } from '@/content/navigation';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  /** Focus returns here on close, per dialog convention. */
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileNav({ open, onClose, returnFocusTo }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open, restoring whatever overflow was there before.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus in on open, and back to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    const toggle = returnFocusTo.current;
    return () => toggle?.focus();
  }, [open, returnFocusTo]);

  // Escape closes; Tab cycles within the panel.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items || items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col bg-surface lg:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-end border-b border-line px-5">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-button text-ink hover:bg-canvas"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-5">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-button py-3 text-lg font-medium text-ink hover:text-brand"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex shrink-0 flex-col gap-3 border-t border-line p-5">
        {/* §9 lists a Sign in link, but there is no authenticated surface on
            this domain yet — shipping one would be a dead link. Restore it
            when the product app has a public entry point. */}
        <Button href="/support" variant="secondary" size="lg" fullWidth onClick={onClose}>
          Contact us
        </Button>
        <Button href={DEMO_HREF} size="lg" fullWidth onClick={onClose}>
          Book a demo
        </Button>
      </div>
    </div>
  );
}
