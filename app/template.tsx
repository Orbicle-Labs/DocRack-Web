'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * App Router template — re-mounts on every navigation, so it's the right place
 * for route transitions. Opacity-only (no transform) so we never create a
 * containing block that would break position: fixed overlays inside pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
