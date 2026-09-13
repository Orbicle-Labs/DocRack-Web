'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { footerNav } from '@/content/navigation';
export function MobileNav({
  onClose,
  returnFocusTo,
}: {
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
    const element = dialog.current;
    const trigger = returnFocusTo.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, [returnFocusTo]);
  return (
    <dialog
      ref={dialog}
      className="mobile-dialog"
      aria-label="Site navigation"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="mobile-dialog-head">
        <span className="eyeline">Explore DocRack</span>
        <button type="button" aria-label="Close navigation" onClick={onClose}>
          <X size={24} aria-hidden="true" />
        </button>
      </div>
      <nav
        aria-label="Mobile navigation"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) onClose();
        }}
      >
        <Link href="/product" className="mobile-overview">
          Product
        </Link>
        {footerNav.slice(0, 2).map((group) => (
          <div className="mobile-nav-group" key={group.title}>
            <p className="eyeline">{group.title}</p>
            {group.items.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="mobile-nav-group">
          <Link href="/security">Security</Link>
          <Link href="/company">Company</Link>
          <Link href="/support">Support</Link>
          <Link href="/book-demo">Book a demo</Link>
        </div>
      </nav>
    </dialog>
  );
}
