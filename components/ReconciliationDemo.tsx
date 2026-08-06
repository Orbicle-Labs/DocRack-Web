'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, AlertTriangle } from 'lucide-react';

type Row = { label: string; source: string; deck: string; ok: boolean };

// Illustrative sample — shows the reconciliation concept, not real figures.
const ROWS: Row[] = [
  { label: 'Gross Written Premium', source: '4,812.60', deck: '4,812.60', ok: true },
  { label: 'Net Claims Incurred', source: '2,145.30', deck: '2,145.30', ok: true },
  { label: 'Solvency Ratio', source: '1.87', deck: '1.72', ok: false },
  { label: 'Investment Assets', source: '9,004.10', deck: '9,004.10', ok: true },
  { label: 'Management Expenses', source: '612.40', deck: '618.90', ok: false },
];

const STEP = 0.16;

export function ReconciliationDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const flagged = ROWS.filter((r) => !r.ok).length;

  return (
    <div ref={ref} className="recon-demo glass rounded-2xl p-5 md:p-7">
      <div className="recon-demo-head" aria-hidden="true">
        <span>Source Excel</span>
        <span>AC Deck</span>
        <span className="text-right">Status</span>
      </div>

      {ROWS.map((row, i) => (
        <motion.div
          key={row.label}
          className="recon-row"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: i * STEP, duration: 0.35, ease: 'easeOut' }}
        >
          <div className="recon-cell">
            <span className="recon-label">{row.label}</span>
            <span className="recon-val">{row.source}</span>
          </div>
          <div className="recon-cell recon-cell--deck">
            <span className="recon-label">AC Deck</span>
            <span className={`recon-val ${row.ok ? '' : 'recon-val-bad'}`}>{row.deck}</span>
          </div>
          <motion.span
            className={`recon-status ${row.ok ? 'is-ok' : 'is-bad'}`}
            initial={reduce ? false : { scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ delay: i * STEP + 0.26, type: 'spring', stiffness: 340, damping: 18 }}
          >
            {row.ok ? <Check size={13} /> : <AlertTriangle size={13} />}
            {row.ok ? 'Matched' : 'Flagged'}
          </motion.span>
        </motion.div>
      ))}

      <motion.div
        className="recon-foot"
        initial={reduce ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: ROWS.length * STEP + 0.3, duration: 0.4 }}
      >
        <span className="recon-foot-dot" />
        {flagged} discrepancies surfaced · {ROWS.length - flagged} tied to source · full
        click-through trail
      </motion.div>
    </div>
  );
}
