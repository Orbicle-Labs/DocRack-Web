/** Read-only repository audit. Never reads local configuration, credentials or product data. */
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, extname } from 'node:path';
import sharp from 'sharp';

async function files(root) {
  return (
    await Promise.all(
      (await readdir(root, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? files(join(root, e.name)) : [join(root, e.name)]
      )
    )
  ).flat();
}
const report = {
  publicAssets: [],
  sourceFindings: [],
  duplicateRoots: [],
  forbiddenPublicFiles: [],
};
for (const root of ['app', 'pages', 'components', 'lib']) {
  try {
    await access(root);
    report.duplicateRoots.push(root);
  } catch {
    /* absent */
  }
}
for (const path of await files('public')) {
  const buffer = await readFile(path);
  const entry = {
    path: path.replaceAll('\\', '/'),
    bytes: buffer.length,
    sha256: createHash('sha256').update(buffer).digest('hex'),
  };
  if (/\.(png|webp|jpe?g|svg)$/.test(path)) {
    const meta = await sharp(buffer).metadata();
    Object.assign(entry, {
      width: meta.width,
      height: meta.height,
      exif: Boolean(meta.exif),
      xmp: Boolean(meta.xmp),
    });
  }
  if (
    /\.(pdf|xlsx?|docx?|csv|zip|pem|key|env|json)$/i.test(path) ||
    /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|"private_key"\s*:/.test(buffer.toString('utf8'))
  )
    report.forbiddenPublicFiles.push(entry.path);
  report.publicAssets.push(entry);
}
const obsolete =
  /five (?:possible |result )?(?:test )?(?:states|outcomes)|request evidence|document.request management|auditee upload|trusted by|SOC.?2 certified|ISO.?27001 certified/gi;
for (const path of await files('src')) {
  if (!['.ts', '.tsx', '.css'].includes(extname(path))) continue;
  const content = await readFile(path, 'utf8');
  content.split('\n').forEach((line, i) => {
    if (line.match(obsolete))
      report.sourceFindings.push({ path: path.replaceAll('\\', '/'), line: i + 1 });
  });
}
await writeFile('docs/qa/phase-7-source-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(
  JSON.stringify({
    publicAssets: report.publicAssets.length,
    sourceFindings: report.sourceFindings,
    duplicateRoots: report.duplicateRoots,
    forbiddenPublicFiles: report.forbiddenPublicFiles,
  })
);
if (
  report.duplicateRoots.length ||
  report.forbiddenPublicFiles.length ||
  report.sourceFindings.length
)
  process.exitCode = 1;
