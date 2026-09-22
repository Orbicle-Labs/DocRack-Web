/** Build an offline index for existing website QA screenshots; never generates product proof. */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { routes } from '../src/content/routes.ts';
const directory = 'docs/design/phase-7';
const images = (await readdir(directory)).filter((name) => name.endsWith('.png')).sort();
const manifest = [];
for (const name of images) {
  const bytes = await readFile(`${directory}/${name}`);
  manifest.push({
    file: name,
    bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  });
}
const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const sections = routes.map(({ path }) => {
  const slug = path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
  for (const width of [1440, 390]) {
    if (!images.includes(`${slug}-${width}.png`)) throw Error(`Missing ${slug}-${width}.png`);
  }
  return `<section><h2>${escape(path)}</h2><div class="pair">${[1440, 390].map((width) => `<figure><a href="${slug}-${width}.png"><img loading="lazy" src="${slug}-${width}.png" alt="${escape(path)} website at ${width} pixels"></a><figcaption>${width}px · full page (open for original)</figcaption></figure>`).join('')}</div></section>`;
});
const canonicalImages = new Set(
  routes.flatMap(({ path }) => {
    const slug = path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
    return [1440, 390].map((width) => `${slug}-${width}.png`);
  })
);
sections.push(
  `<section><h2>Additional form and evidence views</h2><ul>${images
    .filter((name) => !canonicalImages.has(name))
    .map((name) => `<li><a href="${name}">${name}</a></li>`)
    .join('')}</ul></section>`
);
await writeFile(
  `${directory}/index.html`,
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DocRack Phase 7 website review</title><style>body{margin:0;padding:32px;background:#f5f2eb;color:#182823;font:16px/1.6 system-ui}main{max-width:1300px;margin:auto}a{color:inherit}h1{line-height:1.15}.pair{display:grid;grid-template-columns:3fr 1fr;gap:24px;align-items:start}figure{margin:0}img{width:100%;height:auto;border:1px solid #77857a}section{margin-block:48px}a:focus-visible{outline:3px solid #225c48;outline-offset:4px}@media(max-width:600px){body{padding:16px}.pair{grid-template-columns:1fr}}</style><main><h1>Phase 7 website review</h1><p>21 September 2026 · base main e8f7973 plus uncommitted Phase 7 changes. Credential-free local standalone production on 127.0.0.1:3100. These are website screenshots, never authenticated-product captures.</p><p><strong>Not release ready.</strong> Genuine capture/export, legal publication, mobile LCP and Phase 6 operational acceptance remain open. No founder approval inferred.</p><p><a href="../../qa/phase-7.md">Release report</a> · <a href="manifest.json">Screenshot SHA-256 manifest</a></p>${sections.join('')}</main></html>\n`
);
await writeFile(
  `${directory}/manifest.json`,
  JSON.stringify(
    {
      baseCommit: 'e8f7973',
      provenance: 'Uncommitted Phase 7 candidate; local website only; image IDs in phase-7.md',
      images: manifest,
    },
    null,
    2
  ) + '\n'
);
console.log(`${routes.length} pages indexed; ${images.length} screenshots hashed.`);
