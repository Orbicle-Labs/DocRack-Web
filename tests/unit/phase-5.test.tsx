// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import ErrorPage from '@/app/error';
import { recipeAnatomy } from '@/content/pages/recipe-anatomy';
import { solutionProcedures } from '@/content/pages/solution-procedures';
import { routes, sitemapRoutes, activeRedirects } from '@/content/routes';
afterEach(cleanup);

it('keeps legal drafts held, outside sitemap and out of public route imports', () => {
  expect(routes).toHaveLength(19);
  expect(sitemapRoutes).toHaveLength(17);
  for (const path of ['privacy', 'terms']) {
    expect(routes.find((r) => r.path === `/${path}`)?.indexable).toBe(false);
    const source = readFileSync(`src/app/(marketing)/${path}/page.tsx`, 'utf8');
    expect(source).not.toContain('pageCopy');
    expect(source).not.toContain('launchPages');
    expect(readFileSync(`docs/content/legal/${path}-review.md`, 'utf8')).toContain(
      'Publication HOLD'
    );
  }
  for (const redirect of activeRedirects)
    expect(activeRedirects.some((r) => r.source === redirect.destination)).toBe(false);
});

it('covers fourteen Recipe components and source-backed separate procedures', () => {
  expect(recipeAnatomy).toHaveLength(14);
  expect(new Set(recipeAnatomy.map(([name]) => name)).size).toBe(14);
  const register = readFileSync('docs/content/claims-register.md', 'utf8');
  for (const procedure of Object.values(solutionProcedures))
    for (const id of procedure.claims) expect(register).toMatch(new RegExp(`\\| ${id} +\\|`));
});

it('has no retired capture references in executable website source', () => {
  function files(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory()
        ? files(join(dir, e.name))
        : /\.(tsx?|css)$/.test(e.name)
          ? [join(dir, e.name)]
          : []
    );
  }
  for (const file of files('src')) {
    expect(readFileSync(file, 'utf8'), file).not.toMatch(
      /\/product\/(?:copilot|document-intake|engagement-dashboard|finding|knowledge-hub|recipe-builder|recipe|review-queue|run-progress|trace-link|working-paper)\.png/
    );
  }
});

it('offers a working retry and home/support recovery without revealing error text', () => {
  const reset = vi.fn();
  render(
    <ErrorPage
      error={Object.assign(new Error('PRIVATE_INTERNAL_DETAIL'), { digest: 'synthetic-reference' })}
      reset={reset}
    />
  );
  expect(screen.queryByText('PRIVATE_INTERNAL_DETAIL')).not.toBeInTheDocument();
  expect(screen.getByText('Reference: synthetic-reference')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
  expect(reset).toHaveBeenCalledOnce();
  expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'Contact the team' })).toHaveAttribute(
    'href',
    '/support'
  );
});
