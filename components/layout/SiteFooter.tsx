import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { footerNav } from '@/lib/nav';
import { SITE_DESCRIPTION } from '@/lib/seo';

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2 lg:max-w-sm">
            <Image
              src="/docrack_full_logo.png"
              alt="DocRack"
              width={140}
              height={34}
              className="h-[26px] w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted">{SITE_DESCRIPTION}</p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.09em] text-ink">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted hover:text-ink">
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
        <div className="flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Orbicle Labs Pvt. Ltd. All rights reserved.</p>
          <p>Built for internal audit teams.</p>
        </div>
      </Container>
    </footer>
  );
}
