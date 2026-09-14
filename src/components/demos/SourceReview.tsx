'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, FileText, LockKeyhole } from 'lucide-react';
import { p2p, outcomeExamples } from '@/content/demos/p2p';
import { OutcomeLabel } from '@/components/ui/OutcomeLabel';
import { ProductFigure } from '@/components/ui/ProductFigure';

type Source = 'invoice' | 'order' | 'rule';
const subscribe = () => () => {};
export function SourceReview() {
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const [selected, setSelected] = useState(1);
  const [source, setSource] = useState<Source>('invoice');
  const sourceRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const example = outcomeExamples[selected];
  function openSource(next: Source, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSource(next);
    sourceRef.current?.focus({ preventScroll: true });
    sourceRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
  return (
    <>
      <ProductFigure>
        <div className="review-toolbar">
          <span>{p2p.engagement}</span>
          <span className="caption">{p2p.run} · Recipe v3</span>
        </div>
        <div className="outcome-selector" role="group" aria-label="Explore result states">
          {outcomeExamples.map((item, index) => (
            <button
              type="button"
              disabled={!ready}
              key={item.outcome}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <OutcomeLabel outcome={item.outcome} />
            </button>
          ))}
        </div>
        <div className="review-grid">
          <div className="review-result">
            <p className="eyeline">
              Result / <span className="numbers">{example.record}</span>
            </p>
            <div aria-live="polite" aria-atomic="true" className="result-summary">
              <OutcomeLabel outcome={example.outcome} />
              <h3>{selected === 1 ? 'The amounts don’t match.' : example.outcome}</h3>
              <p>{example.reason}</p>
            </div>
            {selected === 1 ? (
              <>
                <dl className="comparison numbers">
                  <div>
                    <dt>Expected · approved PO</dt>
                    <dd>{p2p.expected}</dd>
                  </div>
                  <div>
                    <dt>Actual · invoice subtotal</dt>
                    <dd>{p2p.actual}</dd>
                  </div>
                  <div className="difference">
                    <dt>Difference</dt>
                    <dd>{p2p.difference}</dd>
                  </div>
                </dl>
                <div className="source-actions" aria-label="Source citations">
                  <button
                    disabled={!ready}
                    aria-pressed={source === 'invoice'}
                    onClick={(event) => openSource('invoice', event.currentTarget)}
                    aria-controls="source-evidence"
                  >
                    <FileText size={17} aria-hidden="true" />
                    Invoice · page 1<ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                  <button
                    disabled={!ready}
                    aria-pressed={source === 'order'}
                    onClick={(event) => openSource('order', event.currentTarget)}
                    aria-controls="source-evidence"
                  >
                    PO · {p2p.cell}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                  <button
                    disabled={!ready}
                    aria-pressed={source === 'rule'}
                    onClick={(event) => openSource('rule', event.currentTarget)}
                    aria-controls="source-evidence"
                  >
                    Policy v3 · §4.2
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : (
              <div className="state-citation">
                <p className="caption">
                  <strong>Source reference</strong>
                  <br />
                  {example.source}
                </p>
                <p className="caption">
                  <strong>Configured rule</strong>
                  <br />
                  {example.rule}
                </p>
              </div>
            )}
            <p className="review-boundary">
              <LockKeyhole size={17} aria-hidden="true" />
              {p2p.review}. Selecting an example does not approve a result.
            </p>
          </div>
          <section
            className="source-evidence"
            id="source-evidence"
            ref={sourceRef}
            tabIndex={-1}
            aria-label="Source evidence"
            onKeyDown={(event) => {
              if (event.key === 'Escape') triggerRef.current?.focus();
            }}
          >
            <div className="source-heading">
              <span className="eyeline">Source Trace</span>
              <span className="caption">
                {selected === 1 ? 'Version 1 · excerpt' : 'Example context'}
              </span>
            </div>
            {selected !== 1 ? (
              <div className="source-paper">
                <p className="eyeline">{example.record}</p>
                <h3>{example.outcome}</h3>
                <p>{example.reason}</p>
                <hr />
                <p className="caption">{example.source}</p>
                <p className="caption">{example.rule}</p>
                <p className="caption">
                  An unavailable source has no fabricated page or cell preview.
                </p>
              </div>
            ) : (
              <>
                <div className="source-tabs" role="group" aria-label="Evidence documents">
                  {(['invoice', 'order', 'rule'] as const).map((value) => (
                    <button
                      type="button"
                      disabled={!ready}
                      key={value}
                      aria-pressed={source === value}
                      onClick={() => setSource(value)}
                    >
                      {value === 'invoice'
                        ? 'Invoice'
                        : value === 'order'
                          ? 'Purchase order'
                          : 'Policy'}
                    </button>
                  ))}
                </div>
                <div className="source-paper numbers" aria-live="polite">
                  {source === 'invoice' ? (
                    <>
                      <p className="eyeline">Illustrative invoice</p>
                      <h3>Aranya Office Supplies</h3>
                      <p className="caption">
                        {p2p.invoice} · Page 1<br />
                        Invoice date: 15 April 2026 · PO-0042
                      </p>
                      <hr />
                      <div className="paper-row">
                        <span>Office equipment</span>
                        <span>₹1,25,000</span>
                      </div>
                      <div className="paper-highlight">
                        <span>Subtotal</span>
                        <strong>{p2p.actual}</strong>
                      </div>
                      <p className="caption">
                        Trace: page 1 · subtotal region
                        <br />
                        Original: “1,25,000.00” → normalised: ₹1,25,000
                        <br />
                        Method: illustrative extraction · confidence: 99%
                        <br />
                        Corrections: none in this fixture
                      </p>
                    </>
                  ) : source === 'order' ? (
                    <>
                      <p className="eyeline">Source of truth / approved PO</p>
                      <h3>{p2p.sheet}</h3>
                      <p className="caption">Sheet: Orders · Row 43 · Version 1</p>
                      <hr />
                      <div className="paper-row">
                        <span>A43 · PO reference</span>
                        <strong>PO-0042</strong>
                      </div>
                      <div className="paper-row">
                        <span>G43 · Status</span>
                        <strong>Approved</strong>
                      </div>
                      <div className="paper-highlight">
                        <span>H43 · Amount</span>
                        <strong>{p2p.expected}</strong>
                      </div>
                      <p className="caption">
                        Trace: {p2p.cell}
                        <br />
                        Original: “120000” → normalised: ₹1,20,000
                        <br />
                        Method: cell read · corrections: none
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="eyeline">Policy / illustrative criteria</p>
                      <h3>Synthetic Procurement Policy</h3>
                      <p className="caption">Version 3 · Effective 1 April 2026 · §4.2</p>
                      <hr />
                      <p className="policy-highlight">
                        Compare the invoice subtotal with the approved purchase-order amount. The
                        allowed absolute difference is ₹1.
                      </p>
                      <p className="caption">
                        Used by: {p2p.recipe}
                        <br />
                        Approval required before an official Run.
                        <br />
                        Invented company policy; not a regulatory requirement.
                      </p>
                    </>
                  )}
                </div>
                <p className="caption trace-caption">
                  Rule: {p2p.policy}
                  <br />
                  {p2p.recipe} · Allowed tolerance {p2p.tolerance}
                </p>
                <button
                  disabled={!ready}
                  className="return-result"
                  onClick={() =>
                    (
                      triggerRef.current ??
                      document.querySelector<HTMLButtonElement>('.source-actions button')
                    )?.focus()
                  }
                >
                  Return to result
                </button>
              </>
            )}
          </section>
        </div>
      </ProductFigure>
    </>
  );
}
