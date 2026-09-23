import { ArrowRight } from 'lucide-react';
import localFont from 'next/font/local';
import { Button } from '@/components/ui';
import { HeroEvidence } from '@/components/demos/HeroEvidence';
import { Workflow } from '@/components/sections/home/Workflow';
import {
  RecipeChapter,
  CoverageChapter,
  UseCasesChapter,
  OutputChapter,
  GovernanceChapter,
  FinalChapter,
} from '@/components/sections/home/Chapters';
import { home } from '@/content/pages/home';
import '@/styles/home.css';
// Preload only the regular accent used in the LCP heading, not the unused italic face.
const openingAccent = localFont({
  src: '../../../public/fonts/instrument-serif-regular.woff2',
  display: 'optional',
  weight: '400',
  preload: true,
  variable: '--font-editorial',
  adjustFontFallback: false,
  fallback: ['Georgia'],
});
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({
  title: home.metadata.title,
  description: home.metadata.description,
  path: '/',
});
export default function HomePage() {
  return (
    <div className={`v2 ${openingAccent.variable}`}>
      <section data-chapter="opening" className="design-container home-opening">
        <div className="opening-copy">
          <p className="eyeline">AI-assisted internal-audit fieldwork</p>
          <h1>
            From audit evidence to answers you can{' '}
            <span className={`editorial ${openingAccent.className}`}>review.</span>
          </h1>
          <p className="opening-lead">{home.introduction}</p>
          <div className="opening-actions">
            <Button
              href="/book-demo"
              size="lg"
              iconRight={<ArrowRight size={18} aria-hidden="true" />}
            >
              Book a demo
            </Button>
            <a href="#workflow" className="text-action">
              Explore the workflow <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="opening-note caption">For internal-audit teams at Indian enterprises.</p>
        </div>
        <HeroEvidence />
      </section>
      <Workflow />
      <RecipeChapter />
      <CoverageChapter />
      <UseCasesChapter />
      <OutputChapter />
      <GovernanceChapter />
      <FinalChapter />
    </div>
  );
}
