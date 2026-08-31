import Image from 'next/image';
import { Container } from '@/components/ui';
import { trust } from '@/lib/content/homepage';

/**
 * Recognitions only — never presented as customers (§10.4). Rendered as a
 * single centred row rather than a logo wall, because two marks in a grid
 * built for six reads as a gap.
 */
export function TrustStrip() {
  return (
    <section className="border-b border-line bg-surface py-8">
      <Container>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-muted">
            {trust.eyebrow}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {trust.items.map((item) => (
              <li key={item.src} className="flex items-center gap-2.5">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
                {item.caption && <span className="text-xs text-muted">{item.caption}</span>}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
