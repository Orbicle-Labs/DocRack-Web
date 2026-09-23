import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
const documents = [
  'README.md',
  'DEPLOYMENT.md',
  'docs/CURRENT_PHASE.md',
  'docs/qa/phase-7.md',
  'docs/content/phase-7-review.md',
  'docs/content/claims-register.md',
  'docs/content/route-migration.md',
  'docs/design/assets.md',
  'docs/design/phase-7/index.html',
  ...process.argv.slice(2),
];
const checked = new Set();
const broken = [];
for (const file of documents) {
  const text = await readFile(file, 'utf8');
  const links = [...text.matchAll(/\]\(([^)]+)\)|(?:href|src)="([^"]+)"/g)].map(
    (m) => m[1] ?? m[2]
  );
  for (let link of links) {
    if (/^(?:https?:|mailto:|#)/.test(link)) continue;
    link = decodeURIComponent(link.split('#')[0].split('?')[0].replace(/^<|>$/g, ''));
    if (!link) continue;
    const target = resolve(dirname(file), link);
    checked.add(target);
    try {
      await access(target);
    } catch {
      broken.push({ file, link });
    }
  }
}
console.log(
  JSON.stringify({ documents: documents.length, targets: checked.size, broken }, null, 2)
);
if (broken.length) process.exitCode = 1;
