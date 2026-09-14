/** Legacy content still consumed by company/security; adoption remains Phase 5. */
export const trust = {
  // "Backed by", never "Trusted by" — these are recognitions, not customers.
  eyebrow: 'Backed by',
  items: [
    { src: '/logos/nvidia-inception.png', alt: 'NVIDIA Inception Program', caption: null },
    { src: '/logos/iit-bombay.png', alt: 'IIT Bombay', caption: 'IDEAS Program' },
  ],
} as const;

export const security = {
  eyebrow: 'Security',
  heading: 'Built for the way audit teams handle company information.',
  // Only capabilities that follow from the architecture. Data residency,
  // encryption specifics, retention windows, subprocessors and any
  // certification stay off the site until verified (§10.13, §16).
  points: [
    {
      title: 'Tenant isolation',
      body: 'Each organisation’s engagements, evidence and results are separated from every other tenant.',
    },
    {
      title: 'Role-based access',
      body: 'Access follows the engagement. Preparers, reviewers and approvers see the work assigned to them.',
    },
    {
      title: 'Activity logging',
      body: 'Reviewer decisions, overrides and approvals are recorded with identity, time and reason.',
    },
    {
      title: 'Evidence stays evidence',
      body: 'Inputs are versioned, and a run records the exact input versions it read, so a result can be re-performed.',
    },
  ],
  note: 'Detailed hosting, residency, retention and subprocessor information is available on request during evaluation.',
} as const;
