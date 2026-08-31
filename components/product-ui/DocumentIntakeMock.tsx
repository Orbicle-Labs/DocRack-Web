import { Badge } from '@/components/ui';

/**
 * The Documents step (§7): inputs classified by the role they play in the
 * test, not just uploaded. The classification column is the point — an
 * upload list alone would not show what DocRack does with the evidence.
 */

interface Doc {
  name: string;
  kind: string;
  role: string;
  tone: 'brand' | 'neutral';
  status: string;
  done: boolean;
}

const DOCS: Doc[] = [
  {
    name: 'ap-invoices-q3.zip',
    kind: '412 PDFs',
    role: 'Population',
    tone: 'brand',
    status: 'Extracted',
    done: true,
  },
  {
    name: 'po-master.xlsx',
    kind: 'Sheet · 4,182 rows',
    role: 'Source of truth',
    tone: 'brand',
    status: 'Extracted',
    done: true,
  },
  {
    name: 'grn-register.xlsx',
    kind: 'Sheet · 3,908 rows',
    role: 'Supporting source',
    tone: 'neutral',
    status: 'Extracted',
    done: true,
  },
  {
    name: 'procurement-policy-v4.pdf',
    kind: '18 pages',
    role: 'Policy',
    tone: 'neutral',
    status: 'Indexed',
    done: true,
  },
  {
    name: 'vendor-master.csv',
    kind: '1,204 rows',
    role: 'Reference data',
    tone: 'neutral',
    status: 'Extracting',
    done: false,
  },
];

export function DocumentIntakeMock() {
  return (
    <div className="flex h-full w-full flex-col bg-surface text-caption tabular-nums">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="font-medium text-ink">Evidence · P2P Q3 FY26</span>
        <span className="hidden text-muted sm:inline">5 inputs</span>
      </div>

      <div className="flex flex-1 flex-col divide-y divide-line overflow-hidden">
        {DOCS.map((doc) => (
          <div key={doc.name} className="flex flex-1 items-center gap-3 px-4 py-2">
            <span className="min-w-0 flex-1">
              <span className="block truncate font-mono text-ink">{doc.name}</span>
              <span className="block truncate text-mono-xs text-muted">{doc.kind}</span>
            </span>
            <span className="hidden shrink-0 sm:block">
              <Badge tone={doc.tone} size="sm">
                {doc.role}
              </Badge>
            </span>
            <span
              className={`w-[68px] shrink-0 text-right ${doc.done ? 'text-muted' : 'text-brand'}`}
            >
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
