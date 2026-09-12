import Image from 'next/image';
import { Section } from '@/components/ui';
import { trust } from '@/content/pages/homepage';

/**
 * Archetype B — Ledger strip. Recognitions only, never presented as customers
 * (§10.4). Its job is to be a rest: the shortness is what makes the sections
 * either side feel considered.
 *
 * Logos are desaturated at rest with no hover change — these aren't
 * interactive, and grayscale unifies two marks of different colour
 * temperature that otherwise read as assembled.
 */
export function TrustStrip() {
  return (
    <Section tone="surface" spacing="strip" edge="none" className="border-b border-line">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
        <p className="text-label uppercase text-muted">{trust.eyebrow}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {trust.items.map((item) => (
            <li key={item.src} className="flex items-center gap-2.5">
              <Image
                src={item.src}
                alt={item.alt}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-[0.72] grayscale"
              />
              {item.caption && <span className="text-caption text-muted">{item.caption}</span>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
