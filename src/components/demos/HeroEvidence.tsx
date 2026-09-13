import { ArrowUpRight } from 'lucide-react';
import { ProductFigure } from '@/components/ui/ProductFigure';
import { OutcomeLabel } from '@/components/ui/OutcomeLabel';
import { p2p } from '@/content/demos/p2p';
export function HeroEvidence() {
  return (
    <ProductFigure
      className="hero-evidence"
      caption="Representative interface · P2P amount check v3."
    >
      <div className="hero-result">
        <div className="result-top">
          <span className="caption">{p2p.record}</span>
          <OutcomeLabel outcome="Fail" />
        </div>
        <p className="eyeline">Amount mismatch</p>
        <p className="hero-amount numbers">{p2p.difference}</p>
        <p className="caption">above the approved purchase order</p>
        <dl className="hero-values numbers">
          <div>
            <dt>Invoice subtotal</dt>
            <dd>{p2p.actual}</dd>
          </div>
          <div>
            <dt>Approved PO</dt>
            <dd>{p2p.expected}</dd>
          </div>
        </dl>
        <a href="#workflow" className="hero-source">
          Inspect the source <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="hero-evidence-rule">
        <span className="eyeline">The rule behind the result</span>
        <p>
          {p2p.policy}
          <br />
          Tolerance {p2p.tolerance} · Review incomplete
        </p>
      </div>
    </ProductFigure>
  );
}
