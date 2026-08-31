import type { Metadata } from 'next';

/** Single source for the canonical origin. Used by metadata, sitemap and robots. */
export const SITE_URL = 'https://docrack.ai';

export const SITE_NAME = 'DocRack';

/** §3 short description. Kept here so every page pulls the same positioning. */
export const SITE_DESCRIPTION =
  'DocRack turns documents, Excel, system data and company policies into repeatable ' +
  'audit tests, source-linked exceptions and review-ready working papers.';

interface BuildMetadataArgs {
  title: string;
  description?: string;
  /** Route path, e.g. "/product". Becomes the canonical URL. */
  path: string;
}

/** Per-page metadata with a canonical URL and inherited Open Graph defaults. */
export function buildMetadata({ title, description, path }: BuildMetadataArgs): Metadata {
  const resolved = description ?? SITE_DESCRIPTION;

  return {
    title,
    description: resolved,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: resolved,
      url: path,
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description: resolved,
    },
  };
}
