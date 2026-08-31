import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { footerNav } from '@/lib/nav';
import { SITE_DESCRIPTION } from '@/lib/seo';

export function SiteFooter() {
  return (
    <footer className="tone-light relative bg-surface">
      {/* Soft boundary rather than a hard rule. */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-hairline" />
      <Container>
        <div className="grid gap-10 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2 lg:max-w-sm">
            <Image
              src="/docrack_full_logo.png"
              alt="DocRack"
              width={140}
              height={34}
              className="h-[26px] w-auto object-contain"
            />
            <p className="mt-4 max-w-prose text-body-sm text-muted">{SITE_DESCRIPTION}</p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-label uppercase text-ink">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-muted underline decoration-transparent underline-offset-[3px] transition-[color,text-decoration-color] duration-fast ease-out hover:text-ink hover:decoration-current"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* The previous footer asserted "All data residency strictly localized
            in AWS Mumbai ap-south-1 VPC". Omitted until verified — §10.13
            allows only confirmed security and hosting claims. */}
        <div className="flex flex-col gap-2 border-t border-line py-7 text-body-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Orbicle Labs Pvt. Ltd. All rights reserved.</p>
          <p>Built for internal audit teams.</p>
        </div>
      </Container>
    </footer>
  );
}
