import type { SchemaNode } from '@/lib/schema';

/**
 * Renders a schema.org node as inline JSON-LD.
 *
 * Safe under the CSP: production is `script-src 'self' 'unsafe-inline'`
 * (next.config.ts), and an `application/ld+json` block is data, not executable
 * script. `JSON.stringify` escaping is not enough on its own — a `</script>`
 * sequence inside any string value would close the tag early, so `<` is escaped
 * as well. All current input is authored content, but the component should not
 * depend on that staying true.
 */
export function JsonLd({ data }: { data: SchemaNode }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
