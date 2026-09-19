import { launchPages } from './launch';
export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  href?: string;
  hrefLabel?: string;
}
const page = launchPages.find((p) => p.path === '/glossary')!;
export const glossaryTerms: GlossaryTerm[] = page.sections.map((s) => ({
  slug: s.id,
  term: s.heading,
  definition: s.paragraphs.join(' '),
}));
