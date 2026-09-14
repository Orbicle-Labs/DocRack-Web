/** Editorial controls, not capability badges for visitors. Source review: 13 September 2026. */
export const inputReadiness = [
  {
    format: 'Born-digital PDF',
    ingest: 'Source implementation inspected',
    extraction: 'Historical synthetic evaluation only',
    preview: 'Page/region viewer source present',
    export: 'Current Trace round-trip unverified',
    claims: ['C19'],
  },
  {
    format: 'Scanned PDF / images',
    ingest: 'Source implementation inspected',
    extraction: 'Historical recorded-vision fixture; ten scans missing in evaluation',
    preview: 'Current exact-region acceptance unverified',
    export: 'Current Trace round-trip unverified',
    claims: ['C19', 'C20'],
  },
  {
    format: 'XLSX / CSV',
    ingest: 'Source implementation inspected',
    extraction: 'Structured-row processing source present',
    preview: 'Sheet/cell viewer source present',
    export: 'Current Trace round-trip unverified',
    claims: ['C19'],
  },
  {
    format: 'DOCX / PPTX / email / ZIP',
    ingest: 'Allowlist presence alone is insufficient',
    extraction: 'Format-specific acceptance unverified',
    preview: 'Format-specific acceptance unverified',
    export: 'Format-specific acceptance unverified',
    claims: ['C20'],
  },
  {
    format: 'Indian-script scans',
    ingest: 'No language acceptance established',
    extraction: 'Per-script evaluation needed',
    preview: 'Per-script legibility unverified',
    export: 'Per-script round-trip unverified',
    claims: ['C20'],
  },
] as const;
export const outputReadiness = [
  {
    format: 'Excel',
    source: 'services/api/app/exports/excel.py',
    evidence:
      'Renderer contains stored values, source hyperlinks and cell notes; no current downloaded sample',
    publication: 'Discuss required output; no download',
    claims: ['C21'],
  },
  {
    format: 'Word',
    source: 'services/api/app/exports/docx.py',
    evidence: 'Template renderer exists; retained alongside requested PDF',
    publication: 'No universal template-compatibility promise',
    claims: ['C21'],
  },
  {
    format: 'PDF',
    source: 'services/api/app/exports/pdf.py',
    evidence: 'Requires configured converter; unavailable converter can leave Excel and Word ready',
    publication: 'No unconditional PDF promise',
    claims: ['C21'],
  },
  {
    format: 'Exception register / evidence index CSV',
    source: 'services/api/app/exports/csv_exports.py',
    evidence: 'Renderer exists; no current exported file inspected',
    publication: 'Discuss format; no fabricated download',
    claims: ['C21'],
  },
  {
    format: 'Findings report / named GRC compatibility',
    source: 'DOCRACK_SPEC.md §8.7',
    evidence: 'Specification scope, not current consumer acceptance',
    publication: 'Withhold compatibility claim',
    claims: ['C27'],
  },
] as const;
