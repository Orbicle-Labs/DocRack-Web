import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { fixtures, formatMoney, resultStates } from '../../src/content/demos/fixtures';
import { p2p } from '../../src/content/demos/p2p';
import { launchPages } from '../../src/content/pages/launch';
import { assets } from '../../src/content/assets';
import { routes } from '../../src/content/routes';

describe('Phase 3 publication controls', () => {
  it('covers every launch destination without activating a new route', () => {
    const targets = routes
      .filter((r) => !('replacement' in r))
      .map((r) => r.path)
      .sort();
    expect(launchPages.map((p) => p.path).sort()).toEqual(targets);
    expect(new Set(launchPages.map((p) => p.metadata.title)).size).toBe(19);
    expect(new Set(launchPages.map((p) => p.metadata.description)).size).toBe(19);
    for (const page of launchPages) {
      expect(page.metadata.canonical).toBe(page.path);
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
      for (const id of page.brief.proof) expect(assets.some((a) => a.id === id)).toBe(true);
      if (['/privacy', '/terms'].includes(page.path))
        expect(page.readiness.publication).toBe('Hold for owner review');
    }
  });
  it('resolves every material copy claim into the source/status/decision register', () => {
    const register = readFileSync('docs/content/claims-register.md', 'utf8');
    for (const page of launchPages) {
      const claims = [
        ...page.claims,
        ...page.sections.flatMap((s) => s.claims),
        ...page.faq.flatMap((f) => f.claims),
      ];
      expect(claims.length).toBeGreaterThan(0);
      for (const id of claims) expect(register).toMatch(new RegExp(`\\| ${id} +\\|`));
      for (const section of page.sections) expect(section.claims.length).toBeGreaterThan(0);
    }
  });
  it('retains glossary compatibility and six exact outcome names', () => {
    const glossary = launchPages.find((p) => p.path === '/glossary')!;
    for (const id of [
      'audit-test-recipe',
      'configured-tests',
      'population',
      'evidence',
      'source-linked-result',
      'exception',
      'insufficient-evidence',
      'review',
      'human-approval',
      'finding',
      'working-paper',
    ])
      expect(glossary.sections.some((s) => s.id === id)).toBe(true);
    for (const state of resultStates)
      expect(glossary.sections.some((s) => s.heading === state)).toBe(true);
  });
});

describe('Synthetic fixture accounting and review boundaries', () => {
  for (const fixture of Object.values(fixtures)) {
    it(`${fixture.id} reconciles amounts, source values, population and outcomes`, () => {
      const p = fixture.population;
      expect(p.received).toBe(p.excluded + p.eligible);
      expect(p.eligible).toBe(p.completed + p.awaitingEvidence + p.processingFailures);
      expect(Object.keys(fixture.outcomes)).toEqual([...resultStates]);
      expect(Object.values(fixture.outcomes).reduce<number>((a, b) => a + b, 0)).toBe(p.eligible);
      expect(
        fixture.outcomes.Pass +
          fixture.outcomes.Fail +
          fixture.outcomes['Needs human review'] +
          fixture.outcomes['Not applicable']
      ).toBe(p.completed);
      expect(fixture.outcomes['Insufficient evidence']).toBe(p.awaitingEvidence);
      expect(fixture.outcomes['Processing error']).toBe(p.processingFailures);
      expect(fixture.review).toBe('Awaiting reviewer confirmation');
      expect(fixture.workingPaper).toBe('Draft / review incomplete');
      expect(fixture.finding.relatedConfirmedExceptions).toBe(0);
      expect(fixture.recipe.effective <= fixture.period.start).toBe(true);
      expect(fixture.policy.effective <= fixture.period.start).toBe(true);
      if (fixture.money) {
        const m = fixture.money;
        expect(m.deltaPaise).toBe(m.actualPaise - m.expectedPaise);
        expect(m.deltaPaise).toBeGreaterThan(m.tolerancePaise);
        expect(fixture.expected).toBe(formatMoney(m.expectedPaise));
        expect(fixture.actual).toBe(formatMoney(m.actualPaise));
        expect(fixture.traces.map((t) => t.normalised).sort()).toEqual(
          [fixture.expected, fixture.actual].sort()
        );
      }
      for (const trace of fixture.traces) {
        expect(trace.location).toMatch(/Page|Row|Orders!/);
        expect(trace.version).toBe(fixture.inputsVersion);
        expect(trace.method).toContain('Illustrative');
      }
    });
  }
  it('keeps the existing rendered P2P scene on the canonical fixture', () => {
    expect(p2p.expected).toBe(fixtures.p2p.expected);
    expect(p2p.actual).toBe(fixtures.p2p.actual);
    expect(p2p.run).toBe(fixtures.p2p.run);
    expect(p2p.cell).toBe(fixtures.p2p.traces[1].location);
    expect(new Set(Object.values(fixtures).map((f) => f.run)).size).toBe(3);
  });
});

describe('Public asset provenance and file integrity', () => {
  it('traced vectors preserve the existing mark and wordmark silhouettes', async () => {
    for (const [name, source] of [
      ['mark', 'src/app/icon.png'],
      ['wordmark', 'public/docrack_full_logo.png'],
    ]) {
      const original = await sharp(source)
        .flatten({ background: '#fff' })
        .greyscale()
        .threshold(128)
        .raw()
        .toBuffer();
      const vector = await sharp(`public/brand/docrack-${name}.svg`)
        .flatten({ background: '#fff' })
        .greyscale()
        .threshold(128)
        .raw()
        .toBuffer();
      expect(vector.equals(original)).toBe(true);
    }
  });
  for (const asset of assets) {
    it(`${asset.id} resolves with recorded dimensions, bytes, hash and rights`, async () => {
      expect(asset.alt.length).toBeGreaterThan(4);
      expect(asset.rights.length).toBeGreaterThan(5);
      expect(asset.limitations.length).toBeGreaterThan(5);
      if ('generated' in asset) {
        expect(existsSync(asset.source)).toBe(true);
        expect(asset.width).toBe(1200);
        expect(asset.height).toBe(630);
        return;
      }
      const files = 'variants' in asset ? asset.variants : [asset];
      for (const file of files) {
        const local = `public${file.src}`;
        expect(existsSync(local)).toBe(true);
        const buffer = readFileSync(local);
        expect(buffer.byteLength).toBe(file.bytes);
        expect(createHash('sha256').update(buffer).digest('hex')).toBe(file.sha256);
        if (!file.src.endsWith('.ico')) {
          const meta = await sharp(buffer).metadata();
          expect(meta.width).toBe(file.width);
          expect(meta.height).toBe(file.height);
        } else {
          expect(buffer.readUInt16LE(0)).toBe(0);
          expect(buffer.readUInt16LE(2)).toBe(1);
          expect(buffer.readUInt16LE(4)).toBe(3);
          for (let i = 0; i < 3; i++) {
            const offset = buffer.readUInt32LE(6 + 16 * i + 12);
            const size = buffer.readUInt32LE(6 + 16 * i + 8);
            expect(offset + size).toBeLessThanOrEqual(buffer.length);
            expect((await sharp(buffer.subarray(offset, offset + size)).metadata()).width).toBe(
              [16, 32, 48][i]
            );
          }
        }
      }
      if ('fixture' in asset) {
        expect(asset.productCommit).toBeNull();
        expect(asset.productRun).toBeNull();
        expect(asset.illustrativeRun).toBe(fixtures[asset.fixture].run);
        expect(asset.variants).toHaveLength(4);
      }
    });
  }
});
