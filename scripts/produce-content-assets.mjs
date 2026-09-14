import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import prettier from 'prettier';

// Only self-contained editorial modules. Never load application env or product code.
async function content(file) {
  const source = await fs.readFile(file, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { fixtures, resultStates, syntheticLabel, formatMoney } = await content(
  'src/content/demos/fixtures.ts'
);
const { launchPages } = await content('src/content/pages/launch.ts');
const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const root = 'docs/design/phase-3';
await fs.mkdir(root, { recursive: true });
await fs.mkdir('public/illustrations', { recursive: true });
await fs.mkdir('public/brand', { recursive: true });
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
const assets = [];
const css = `@font-face{font-family:Manrope;src:url('../../../public/fonts/manrope-variable.woff2')}*{box-sizing:border-box}html{background:#f5f2eb;color:#182823;font-family:Manrope,Arial,sans-serif}body{margin:0}main{padding:32px;max-width:1440px;margin:auto}h1{font-size:clamp(28px,4vw,52px);line-height:1.12;letter-spacing:-.04em}h2{font-size:clamp(24px,3vw,40px);line-height:1.15}h3{font-size:23px}p,dd,dt,li{font-size:17px;line-height:1.65}a{color:inherit}a:focus-visible{outline:3px solid #285e4b;outline-offset:5px}nav{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:32px}article{background:#153c31;color:#fff;margin:40px 0;padding:36px;scroll-margin-top:20px}article>p{color:#d9ed91}.label{font-size:14px;letter-spacing:.02em}.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.paper{background:#fff;color:#182823;padding:28px;min-width:0}.paper p{overflow-wrap:anywhere}.amount{font-size:clamp(25px,3vw,44px);font-weight:700;font-variant-numeric:tabular-nums;line-height:1.3}dl{margin:0}dt{font-size:14px;color:#52635b}dd{margin:0 0 18px;overflow-wrap:anywhere}.highlight{background:#d9ed91;padding:14px}.trace{border-top:1px solid #748579;padding-top:14px}.state{border:1px solid #748579;padding:10px;display:flex;justify-content:space-between;gap:12px;font-size:16px}.state strong{font-variant-numeric:tabular-nums}.states{display:grid;gap:8px}.foot{font-size:15px;margin-bottom:0}.row{padding:14px 0;border-bottom:1px solid #748579}.row strong{display:block}.links{padding:24px;background:#fff;color:#182823}.arrow{font-size:24px;color:#d9ed91;padding:8px}.steps{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center}.steps .paper{height:100%}@media(min-width:1600px){main{max-width:2200px}article{padding:70px}.paper{padding:48px}p,dd,dt,li{font-size:27px}.label,.foot{font-size:23px}.state{font-size:26px}.amount{font-size:64px}h2{font-size:58px}h3{font-size:36px}}@media(max-width:600px){main{padding:12px}.grid,.steps{grid-template-columns:1fr}article{padding:16px;margin:24px 0}.paper{padding:18px}.label{font-size:14px}.arrow{transform:rotate(90deg);text-align:center}.amount{font-size:28px}h3{font-size:21px}nav{gap:16px}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}`;
const scenes = [];
for (const f of Object.values(fixtures)) {
  scenes.push({
    id: `${f.id}-review`,
    fixture: f.id,
    width: f.id === 'p2p' ? 2560 : 2000,
    caption: `${f.title}. ${f.record}: ${f.verdict}. ${f.review}. ${syntheticLabel}.`,
    body: `<h2>${esc(f.title)}</h2><p>${esc(syntheticLabel)}</p><div class="grid"><section class="paper"><p class="label">${esc(f.record)} · ${esc(f.run)}</p><h3>Fail · ${esc(f.verdict)}</h3><dl><dt>Expected</dt><dd class="amount">${esc(f.expected)}</dd><dt>Actual</dt><dd class="amount">${esc(f.actual)}</dd>${f.money ? `<dt>Difference / tolerance</dt><dd>${esc(formatMoney(f.money.deltaPaise))} / ${esc(formatMoney(f.money.tolerancePaise))}</dd>` : ''}</dl><p class="highlight">${esc(f.policy.title)} v${f.policy.version} · ${esc(f.policy.clause)}</p><p>${esc(f.policy.text)}</p><p class="foot">${esc(f.recipe.name)} v${f.recipe.version} · Effective ${f.policy.effective}</p></section><section class="paper"><h3>Source Traces</h3>${f.traces.map((t) => `<div class="trace"><p><strong>${esc(t.file)}</strong><br>${esc(t.location)} · v${t.version}<br>${esc(t.role)}</p><p class="highlight">Original: ${esc(t.raw)}<br>Normalised: ${esc(t.normalised)}</p><p class="foot">${esc(t.method)} · ${esc(t.corrections)}</p></div>`).join('')}</section></div><p class="foot">${esc(f.review)} · ${esc(f.workingPaper)}. No finding raised. Recipe approval is illustrative; it does not approve this result.</p>`,
  });
}
const p = fixtures.p2p;
scenes.push({
  id: 'p2p-recipe',
  fixture: 'p2p',
  width: 2400,
  caption:
    'Illustrative P2P Recipe v3 and DEMO-RUN-018; Policy v3 §4.2, inputs v1. Human review remains incomplete.',
  body: `<h2>The procedure behind the result</h2><p>${esc(syntheticLabel)}</p><div class="grid"><section class="paper"><h3>${esc(p.recipe.name)} · v3</h3><div class="row"><strong>Scope</strong>PO-backed invoices · Q1 FY27<br>1 April–30 June 2026</div><div class="row"><strong>Logic inside Tests</strong>Extract subtotal → Reconcile against PO → Check absolute difference ≤ ₹1</div><div class="row"><strong>Criteria</strong>Synthetic Procurement Policy v3 · §4.2<br>Effective 1 April 2026</div><div class="row"><strong>Approval</strong>Recipe approved in illustration.<br>Results await reviewer confirmation.</div></section><section class="paper"><h3>Run / ${p.run}</h3><p>Recipe v3 · Policy v3 · Inputs v1<br>Engine demo-1 · Model fixture-1</p><p class="highlight">A Test defines the procedure.<br>A Run records one execution.</p><p>Completed Run history is immutable in the product model. Later policy or Recipe versions create new work, without rewriting this snapshot.</p><p class="foot">Illustrative identifiers; no product execution or integrity verification performed.</p></section></div>`,
});
scenes.push({
  id: 'p2p-population',
  fixture: 'p2p',
  width: 2400,
  caption:
    'Illustrative single-check population: 200 received, 190 eligible, 180 completed, 6 awaiting evidence and 4 processing failures; all six states shown.',
  body: `<h2>180 of 190 eligible records completed</h2><p>${esc(syntheticLabel)} · ${p.run}</p><div class="grid"><section class="paper"><h3>Population / one check per record</h3>${Object.entries(
    p.population
  )
    .map(
      ([k, v]) =>
        `<div class="state"><span>${esc({ received: 'Received', excluded: 'Excluded', eligible: 'Eligible', completed: 'Execution completed', awaitingEvidence: 'Awaiting evidence', processingFailures: 'Processing failures' }[k])}</span><strong>${v}</strong></div>`
    )
    .join(
      ''
    )}<p>200 = 10 excluded + 190 eligible.<br>190 = 180 completed + 6 awaiting + 4 errors.</p></section><section class="paper"><h3>Results / 190 eligible records</h3><div class="states">${resultStates.map((s) => `<div class="state"><span>${s}</span><strong>${p.outcomes[s]}</strong></div>`).join('')}</div><p>157 Pass + 17 Fail + 6 Needs human review = 180 completed.</p></section></div><p class="foot">Completion does not resolve human review. Not applicable is zero for this check. Exclusions are separate. Working paper: Draft / review incomplete.</p>`,
});
scenes.push({
  id: 'knowledge-versions',
  fixture: 'p2p',
  width: 2000,
  caption:
    'Illustrative relationship: Policy v3 informs Recipe v3 and DEMO-RUN-018; a new policy needs reapproval and does not rewrite completed history.',
  body: `<h2>A source change starts a review</h2><p>${esc(syntheticLabel)}</p><div class="steps"><section class="paper"><h3>Policy v3</h3><p>Synthetic Procurement Policy<br>§4.2 · effective 1 April 2026</p></section><div class="arrow" aria-hidden="true">→</div><section class="paper"><h3>Recipe v3</h3><p>P2P amount check<br>Approved in illustration</p></section><div class="arrow" aria-hidden="true">→</div><section class="paper"><h3>DEMO-RUN-018</h3><p>Inputs v1<br>Review incomplete</p></section></div><p class="foot">Later policy version → affected Recipe review → reapproval before new work. Completed history remains unchanged in the product model.</p>`,
});
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DocRack Phase 3 illustrative asset review</title><style>${css}</style><main><h1>Evidence, in focus / asset review</h1><p>Code-rendered illustrations. All records, policy criteria and approval states are invented. These are not current product screenshots or genuine exports.</p><nav aria-label="Asset scenes">${scenes.map((s) => `<a href="#${s.id}">${s.id}</a>`).join('')}</nav>${scenes.map((s) => `<article id="${s.id}" tabindex="-1" aria-label="${s.id}">${s.body}</article>`).join('')}<section class="links"><h2>Publication boundary</h2><p>No genuine product capture or working-paper download is included. New artwork and film are unnecessary for these source-led scenes.</p></section></main></html>`;
await fs.writeFile(`${root}/index.html`, html);
let briefs =
  '# Phase 3 — final page briefs and publication copy\n\nGenerated from `src/content/pages/launch.ts`. Copy is complete for implementation; current-release evidence is not inferred. Privacy and terms remain held for owner/legal review. No Phase 4/5 routes are activated.\n\n';
for (const p of launchPages) {
  briefs += `## ${p.path}\n\n**Audience:** ${p.brief.audience}\n\n**Visitor question:** ${p.brief.question}\n\n**Composition:** ${p.brief.composition}\n\n**Metadata:** ${p.metadata.title} — ${p.metadata.description}\n\n**Canonical at launch:** \`${p.path}\` · **Claims:** ${p.claims.join(', ')} · **Treatment:** ${p.readiness.treatment}\n\n**Proof assets:** ${p.brief.proof.join(', ') || 'Text only; no unavailable media placeholder'}\n\n### ${p.heading}\n\n${p.introduction}\n\n`;
  for (const s of p.sections)
    briefs += `**${s.heading}** (\`${s.id}\`; ${s.claims.join(', ')})\n\n${s.paragraphs.join('\n\n')}\n\n`;
  for (const f of p.faq) briefs += `**${f.question}**\n\n${f.answer} (${f.claims.join(', ')})\n\n`;
  briefs += `**Next action:** ${p.cta.label} → \`${p.cta.href}\`\n\n**Publication:** ${p.readiness.publication}. ${p.readiness.limitations.join(' ')}\n\n`;
}
await fs.writeFile('docs/content/page-briefs.md', briefs);
// Mechanically trace existing black silhouettes; do not draw a new identity.
for (const [name, source] of [
  ['mark', 'src/app/icon.png'],
  ['wordmark', 'public/docrack_full_logo.png'],
]) {
  const original = await fs.readFile(source);
  const { data, info } = await sharp(original)
    .flatten({ background: '#fff' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const segments = [];
  for (let y = 0; y < info.height; y++) {
    let x = 0;
    while (x < info.width) {
      if (data[y * info.width + x] >= 128) {
        x++;
        continue;
      }
      const start = x;
      while (x < info.width && data[y * info.width + x] < 128) x++;
      segments.push(`M${start} ${y}h${x - start}v1H${start}z`);
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}" viewBox="0 0 ${info.width} ${info.height}" role="img" aria-label="DocRack${name === 'mark' ? ' mark' : ''}"><title>DocRack${name === 'mark' ? ' mark' : ''}</title><path fill="#000" d="${segments.join('')}"/></svg>`;
  const dest = `public/brand/docrack-${name}.svg`;
  await fs.writeFile(dest, svg);
  assets.push({
    id: `brand-${name}`,
    src: dest.replace('public', ''),
    kind: 'Mechanically traced existing identity',
    width: info.width,
    height: info.height,
    bytes: Buffer.byteLength(svg),
    sha256: hash(svg),
    source,
    sourceSha256: hash(original),
    alt: name === 'mark' ? 'DocRack mark' : 'DocRack',
    rights: 'Inherited DocRack identity; independent legal ownership not attested',
    limitations:
      'Threshold trace preserves silhouette; existing active marks retained. This is not an authoritative original vector.',
  });
}
for (const size of [16, 32, 48, 180, 192, 512]) {
  const png = await sharp('public/brand/docrack-mark.svg')
    .resize(size, size)
    .flatten({ background: '#fff' })
    .png()
    .toBuffer();
  await fs.writeFile(`public/brand/favicon-${size}.png`, png);
  assets.push({
    id: `brand-${size}`,
    src: `/brand/favicon-${size}.png`,
    kind: 'Deterministic favicon output',
    width: size,
    height: size,
    bytes: png.length,
    sha256: hash(png),
    source: 'public/brand/docrack-mark.svg',
    alt: 'DocRack mark',
    rights: 'Inherited DocRack identity',
    limitations: 'Candidate output; existing metadata icons remain active.',
  });
}
const pngs = await Promise.all(
  [16, 32, 48].map((s) => fs.readFile(`public/brand/favicon-${s}.png`))
);
const head = Buffer.alloc(6 + 16 * pngs.length);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(pngs.length, 4);
let offset = head.length;
pngs.forEach((b, i) => {
  const pos = 6 + 16 * i;
  head[pos] = [16, 32, 48][i];
  head[pos + 1] = head[pos];
  head.writeUInt16LE(1, pos + 4);
  head.writeUInt16LE(32, pos + 6);
  head.writeUInt32LE(b.length, pos + 8);
  head.writeUInt32LE(offset, pos + 12);
  offset += b.length;
});
const ico = Buffer.concat([head, ...pngs]);
await fs.writeFile('public/brand/favicon.ico', ico);
assets.push({
  id: 'brand-ico',
  src: '/brand/favicon.ico',
  kind: 'ICO containing 16/32/48 PNG frames',
  width: 48,
  height: 48,
  bytes: ico.length,
  sha256: hash(ico),
  source: 'public/brand/docrack-mark.svg',
  alt: 'DocRack mark',
  rights: 'Inherited DocRack identity',
  limitations: 'Candidate output; no existing favicon endpoint replaced.',
});
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.route('**/*', (r) =>
    new URL(r.request().url()).protocol === 'file:' ? r.continue() : r.abort()
  );
  await page.goto(pathToFileURL(path.resolve(`${root}/index.html`)).href);
  await page.evaluate(() => document.fonts.ready);
  for (const scene of scenes) {
    const variants = [];
    for (const [label, width] of [
      ['desktop', scene.width],
      ['tablet', 768],
      ['mobile', 390],
      ['narrow', 320],
    ]) {
      await page.setViewportSize({ width, height: 1600 });
      const el = page.locator(`#${scene.id}`);
      const box = await el.boundingBox();
      const src = `/illustrations/${scene.id}-${label}.png`;
      await el.screenshot({ path: `public${src}` });
      const b = await fs.readFile(`public${src}`);
      const meta = await sharp(b).metadata();
      variants.push({
        src,
        width: meta.width,
        height: meta.height,
        bytes: b.length,
        sha256: hash(b),
        treatment:
          label === 'desktop'
            ? 'Full scene; contain, never clip source text'
            : `Dedicated ${width}px layout; not a scaled desktop crop`,
        renderedWidth: Math.round(box.width),
      });
    }
    assets.push({
      id: scene.id,
      kind: 'Illustrative interface',
      fixture: scene.fixture,
      alt: scene.caption,
      caption: scene.caption,
      source: 'src/content/demos/fixtures.ts + scripts/produce-content-assets.mjs',
      productCommit: null,
      productRun: null,
      illustrativeRun: fixtures[scene.fixture].run,
      created: '2026-09-13',
      synthetic: true,
      rights: 'Original code-rendered website illustration; local Manrope under SIL OFL',
      limitations:
        'Not an authenticated product capture. No executable source file or working-paper download. Human review remains incomplete.',
      variants,
    });
  }
} finally {
  await browser.close();
}
assets.push({
  id: 'social-sharing',
  src: '/opengraph-image',
  kind: 'Generated social image',
  generated: true,
  width: 1200,
  height: 630,
  source: 'src/app/opengraph-image.tsx',
  alt: 'DocRack — From audit evidence to answers you can review.',
  rights: 'Original website composition; preserved inherited DocRack mark',
  limitations:
    'Editorial category and procedure, not product proof. Encoded bytes/hash are recorded from the production response in Phase 3 QA.',
});
await fs.writeFile(
  `${root}/asset-manifest.json`,
  JSON.stringify({ created: '2026-09-13', assets }, null, 2) + '\n'
);
await fs.writeFile(
  'src/content/assets.ts',
  `/** Generated by npm run assets:produce. See docs/design/phase-3/asset-manifest.json. */\nexport interface AssetVariant { src: string; width: number; height: number; bytes: number; sha256: string; treatment: string; renderedWidth: number }\nexport interface ContentAsset { id: string; kind: string; generated?: boolean; alt: string; source: string; rights: string; limitations: string; src?: string; width?: number; height?: number; bytes?: number; sha256?: string; sourceSha256?: string; fixture?: string; caption?: string; productCommit?: null; productRun?: null; illustrativeRun?: string; created?: string; synthetic?: boolean; variants?: readonly AssetVariant[] }\nexport const assets = ${JSON.stringify(assets, null, 2)} as const satisfies readonly ContentAsset[];\nexport type AssetId = (typeof assets)[number]['id'];\n`
);
console.log(
  `Produced ${scenes.length} responsive illustrative scenes, 9 brand outputs and ${launchPages.length} page briefs. No product or external service accessed.`
);
const formatConfig = await prettier.resolveConfig('package.json');
for (const file of [
  'src/content/assets.ts',
  'docs/content/page-briefs.md',
  `${root}/index.html`,
  `${root}/asset-manifest.json`,
]) {
  await fs.writeFile(
    file,
    await prettier.format(await fs.readFile(file, 'utf8'), { ...formatConfig, filepath: file })
  );
}
