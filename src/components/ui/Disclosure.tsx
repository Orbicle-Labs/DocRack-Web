import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="disclosure">
      <summary>
        {title}
        <Plus size={18} aria-hidden="true" />
      </summary>
      <div>{children}</div>
    </details>
  );
}
