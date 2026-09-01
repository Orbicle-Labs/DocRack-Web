import { SITE_NAME, SITE_URL } from './seo';
import type { Faq } from './content/support';
import type { GlossaryTerm } from './content/glossary';

/**
 * Schema.org builders.
 *
 * Kept as pure functions rather than inline JSX so the shapes can be asserted
 * against directly, and so every node is built from the same content module the
 * page renders. Structured data that disagrees with the visible page is both a
 * Google policy violation and, on a site aimed at auditors, exactly the kind of
 * unverifiable claim §16 rules out.
 */

/** Minimal structural type. Schema.org nodes are open, so this stays loose. */
export type SchemaNode = Record<string, unknown>;

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * FAQPage for /support.
 *
 * Worth knowing: Google restricted FAQ rich results in August 2023 to
 * authoritative government and health sites, so this will not produce a rich
 * snippet for DocRack. It stays because it is valid, cheap and still read by
 * other consumers — not because it will win a SERP feature.
 */
export function faqPageSchema(items: readonly Faq[], path: string): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absolute(path)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** DefinedTermSet for /glossary. */
export function definedTermSetSchema(
  terms: readonly GlossaryTerm[],
  { name, description, path }: { name: string; description: string; path: string }
): SchemaNode {
  const setId = `${absolute(path)}#glossary`;

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': setId,
    name,
    description,
    url: absolute(path),
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    hasDefinedTerm: terms.map((entry) => ({
      '@type': 'DefinedTerm',
      '@id': `${absolute(path)}#${entry.slug}`,
      name: entry.term,
      description: entry.definition,
      inDefinedTermSet: setId,
    })),
  };
}
