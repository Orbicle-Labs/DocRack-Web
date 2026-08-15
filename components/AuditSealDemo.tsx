'use client';

import React, { Fragment, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FileText, ShieldCheck } from 'lucide-react';

// Illustrative hashes — represents the Merkle-chained audit trail, not real data.
const BLOCKS = [
  { hash: 'a1f4…9c2', label: 'Upload' },
  { hash: '7c2b…d10', label: 'Verify' },
  { hash: 'e90a…4f8', label: 'Review' },
  { hash: 'b3d7…22e', label: 'Sign-off' },
];

export function AuditSealDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const node = (i: number) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.7 },
    animate: inView ? { opacity: 1, scale: 1 } : undefined,
    transition: { delay: i * 0.16, type: 'spring' as const, stiffness: 300, damping: 20 },
  });
  const link = (i: number) => ({
    initial: reduce ? false : { scaleX: 0 },
    animate: inView ? { scaleX: 1 } : undefined,
    transition: { delay: i * 0.16 - 0.05, duration: 0.25, ease: 'easeOut' as const },
  });

  return (
    <div ref={ref} className="seal-demo glass rounded-2xl p-6 md:p-8">
      <div className="seal-chain">
        <motion.div className="seal-node seal-node--edge" {...node(0)}>
          <FileText size={18} />
          <span className="seal-label">Engagement</span>
        </motion.div>

        {BLOCKS.map((b, i) => (
          <Fragment key={b.hash}>
            <motion.span className="seal-link" {...link(i + 1)} />
            <motion.div className="seal-node" {...node(i + 1)}>
              <span className="seal-hash">{b.hash}</span>
              <span className="seal-label">{b.label}</span>
            </motion.div>
          </Fragment>
        ))}

        <motion.span className="seal-link" {...link(BLOCKS.length + 1)} />
        <motion.div className="seal-node seal-node--sealed" {...node(BLOCKS.length + 1)}>
          <ShieldCheck size={18} />
          <span className="seal-label">Sealed</span>
        </motion.div>
      </div>

      <motion.div
        className="seal-foot"
        initial={reduce ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: (BLOCKS.length + 2) * 0.16, duration: 0.4 }}
      >
        <span className="seal-foot-dot" />
        Ed25519-signed · Merkle-chained · verify offline, years later
      </motion.div>
    </div>
  );
}
