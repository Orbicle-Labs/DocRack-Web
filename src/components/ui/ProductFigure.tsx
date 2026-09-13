import type { ReactNode } from 'react';

export function ProductFigure({
  children,
  caption,
  className = '',
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`product-figure ${className}`}>
      <div className="figure-label">Interactive example · synthetic data</div>
      {children}
      <figcaption>
        {caption ??
          'Representative interface. Invented evidence and policy; no live audit execution.'}
      </figcaption>
    </figure>
  );
}
