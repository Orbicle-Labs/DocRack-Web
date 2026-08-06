'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Layout,
  Eye,
  Search,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ReconciliationDemo } from '@/components/ReconciliationDemo';

interface WorkflowStep {
  num: string;
  title: string;
  headline: string;
  desc: string;
  details: string[];
  icon: React.ReactNode;
}

const steps: WorkflowStep[] = [
  {
    num: '01',
    title: 'Collect',
    headline: 'End the document scramble.',
    desc: 'The PBC portal replaces scattered WhatsApp threads and email chains with structured, area-wise requests. Clients upload once; the auditor tracks status, sends reminders, and starts work the moment evidence arrives.',
    details: [
      'Auto-structured PBC request templates',
      'Real-time upload tracking dashboard',
      'Automated email & SMS reminder chains',
    ],
    icon: <FileText size={20} />,
  },
  {
    num: '02',
    title: 'Engagement Room',
    headline: 'Every file, organized the moment it lands.',
    desc: 'A single secure room per engagement — every document automatically sorted, labelled, and mapped to its audit area. Searchable, version-controlled, and access-scoped by role, so the team works from one source of truth instead of a shared drive.',
    details: [
      'Role-scoped document workspaces',
      'Automatic file cataloging and tagging',
      'Full revision histories & file lock status',
    ],
    icon: <Layout size={20} />,
  },
  {
    num: '03',
    title: 'Copilot',
    headline: 'Answers you can trace, not just trust.',
    desc: "Ask anything about the engagement's documents in plain language. Every response cites its exact source — page, line, and figure — so the auditor can verify the basis of every answer in a single click. No black box, no taking the AI's word for it.",
    details: [
      'Natural language document querying',
      'Source verification link highlighting',
      'Zero AI training on CA client secrets',
    ],
    icon: <Search size={20} />,
  },
  {
    num: '04',
    title: 'Scrutiny & Cross-Verification',
    headline: 'Every rupee tested. Every number tied to source.',
    desc: 'Ledger and transaction scrutiny runs across the full population, not just a sample — surfacing outliers, mispostings, and unusual patterns. Each figure in a source document is matched against the underlying ledger, and anything that fails to tie out is flagged with the evidence on both sides.',
    details: [
      'Full ledger transaction scrutiny logs',
      'Automated Tally XML cross-matching',
      'Discrepancy validation matrices',
    ],
    icon: <Eye size={20} />,
  },
  {
    num: '05',
    title: 'Compliance & Reporting',
    headline: 'CARO, Form 3CD, and Schedule III — composed, not retyped.',
    desc: 'Materiality, sampling, and going-concern procedures feed directly into ICAI-format working papers and statutory outputs. CARO 2020 clauses are auto-drafted from the books, with the items needing physical verification clearly called out — so the firm reaches sign-off with a complete, standards-aligned file.',
    details: [
      'CARO 2020 auto-clause draft generator',
      'Form 3CD working paper population',
      'Schedule III financial statement mapping',
    ],
    icon: <Layers size={20} />,
  },
  {
    num: '06',
    title: 'Audit Trail & NFRA Readiness',
    headline: 'Proof that survives inspection.',
    desc: "Every action — upload, query, verification, sign-off — is cryptographically signed and timestamped. The trail is tamper-evident and reproducible, and the proof is mathematical: any reviewer or regulator can verify it independently, whether or not DocRack is in the room. This is the answer to the one question every inspection asks: 'How do you know this wasn't changed?'",
    details: [
      'Ed25519-signed digital action trail',
      'Regulator verification viewer console',
      'NFRA-standard review-ready checklist',
    ],
    icon: <ShieldCheck size={20} />,
  },
];

export default function WorkflowPage() {
  const [activeTab, setActiveTab] = useState<'ca' | 'internal'>('ca');
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState<number | null>(null);

  const toggleMobileExpand = (idx: number) => {
    setMobileExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Page Title Section */}
      <header className="page-title-section">
        <span className="page-tag">Platform Mechanics</span>
        <h1 className="page-title">DocRack Workflow</h1>
        <p className="page-subtitle max-w-xl mx-auto">
          Trace the audit lifecycle from raw evidence collection to immutable, regulator-verifiable
          documentation.
        </p>
      </header>

      {/* Tabs Selector */}
      <div className="max-w-[650px] mx-auto px-6 mb-12">
        <div className="flex border border-color rounded overflow-hidden bg-neutral-900/5 dark:bg-white/5 p-1.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('ca')}
            className={`flex-1 py-3 text-center transition-all duration-300 rounded ${
              activeTab === 'ca'
                ? 'bg-white text-black border border-color shadow font-extrabold'
                : 'bg-transparent border border-color text-black/60 dark:text-white hover:text-black dark:hover:text-white'
            }`}
          >
            Audit for CA Firms
          </button>
          <button
            onClick={() => setActiveTab('internal')}
            className={`flex-1 py-3 text-center transition-all duration-300 rounded ${
              activeTab === 'internal'
                ? 'bg-white text-black border border-color shadow font-extrabold'
                : 'bg-transparent border border-color text-black/60 dark:text-white hover:text-black dark:hover:text-white'
            }`}
          >
            Internal Audit
          </button>
        </div>
      </div>

      {/* Workflow Tabs Container */}
      <div className="max-w-[1200px] mx-auto px-6">
        {activeTab === 'internal' ? (
          /* INTERNAL AUDIT TAB */
          <div className="flex flex-col gap-16 max-w-[1000px] mx-auto">
            {/* Intro */}
            <section className="flex flex-col gap-4 text-center items-center">
              <span className="hero-tag">INTERNAL AUDIT</span>
              <h2 className="section-heading text-3xl md:text-4xl max-w-3xl">
                Manual reconciliation is slow. And it still misses errors.
              </h2>
              <p className="text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
                DocRack checks every number before your audit committee does — automatically,
                on-prem.
              </p>
            </section>

            {/* What it reconciles */}
            <section className="flex flex-col gap-6">
              <span className="hero-tag text-center">WHAT IT RECONCILES</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  ['Board / AC Deck', 'Source Excel'],
                  ['General Ledger', 'Financial Statements'],
                  ['IRDAI Return', 'Books of Accounts'],
                ].map(([left, right]) => (
                  <div
                    key={left}
                    className="border border-color rounded-xl p-6 bg-neutral-900/5 dark:bg-white/5 flex flex-col items-center justify-center gap-3 text-center min-h-[128px] transition-all hover:border-color-strong"
                  >
                    <span className="font-header font-bold text-sm md:text-[15px] text-primary">
                      {left}
                    </span>
                    <span className="text-[color:var(--gold)] text-xl font-bold leading-none">
                      ⇆
                    </span>
                    <span className="font-header font-bold text-sm md:text-[15px] text-primary">
                      {right}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Live reconciliation demo */}
            <section className="flex flex-col gap-6">
              <span className="hero-tag text-center">LIVE RECONCILIATION</span>
              <ReconciliationDemo />
            </section>

            {/* How it works */}
            <section className="flex flex-col gap-6">
              <span className="hero-tag text-center">HOW IT WORKS</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  ['01', 'Ingest', 'Drop in the source sheets and the deck.'],
                  ['02', 'Extract', 'Values are extracted from the PPT/PDF.'],
                  ['03', 'Reconcile', 'Every number matched to its source, automatically.'],
                  ['04', 'Flag', 'Discrepancies surfaced with a click-through audit trail.'],
                ].map(([num, title, desc], i) => (
                  <motion.div
                    key={num}
                    className="border border-color rounded-xl p-6 bg-neutral-900/5 dark:bg-white/5 flex flex-col gap-3"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.12, duration: 0.4, ease: 'easeOut' }}
                  >
                    <span className="font-mono font-bold text-sm text-[color:var(--gold)]">
                      {num}
                    </span>
                    <h4 className="font-header font-black text-base uppercase tracking-tight text-primary">
                      {title}
                    </h4>
                    <p className="text-secondary text-[13px] leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Data control */}
            <section className="flex flex-col gap-6">
              <span className="hero-tag text-center">YOUR DATA NEVER LEAVES YOUR CONTROL</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  [
                    'Runs on-prem / in your VPC',
                    'source data and decks stay inside your environment.',
                  ],
                  ['We never train on your data', 'every engagement fully isolated.'],
                  ['Full audit trail + deletion on demand', 'built for SEBI/IRDAI expectations.'],
                ].map(([lead, rest]) => (
                  <div
                    key={lead}
                    className="border border-color rounded-xl p-6 bg-neutral-900/5 dark:bg-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="text-[color:var(--gold)] shrink-0 mt-0.5" />
                    <p className="text-secondary text-[13px] leading-relaxed">
                      <span className="text-primary font-semibold">{lead}</span> — {rest}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Demo video */}
            <section className="flex flex-col gap-6">
              <span className="hero-tag text-center">WATCH DEMO</span>
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-color bg-neutral-900/5 dark:bg-white/5"
                style={{ aspectRatio: '16 / 9' }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/CEGk0AwvnxQ?rel=0"
                  title="DocRack Internal Audit — Demo"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </section>

            {/* CTA */}
            <section className="border border-color rounded-2xl p-8 md:p-12 bg-neutral-900/5 dark:bg-white/5 flex flex-col items-center text-center gap-4">
              <h3 className="section-heading text-2xl md:text-3xl max-w-xl">
                Run one reconciliation cycle with us.
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xl">
                Live now with a large Indian insurer — cutting reconciliation from days to hours.
                Low lift, fully data-isolated, deploys in days, not quarters.
              </p>
              <Link href="/intake" className="btn btn-primary mt-2">
                Book a Demo
              </Link>
            </section>
          </div>
        ) : (
          /* CA AUDIT TAB: 6-STAGE WORKFLOW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Hand: Workflow Nodes Timeline */}
            <div className="lg:col-span-7 flex flex-col gap-3 font-mono relative">
              {/* Decorative Timeline Line (Desktop Only) */}
              <div className="hidden lg:block absolute left-10 top-6 bottom-6 w-[2px] bg-color -z-10" />

              {steps.map((step, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <motion.div
                    key={step.num}
                    className={`border rounded p-4 lg:p-5 transition-all cursor-pointer select-none bg-background ${
                      isHovered
                        ? 'border-accent ring-1 ring-accent scale-[1.01]'
                        : 'border-color hover:border-color-strong'
                    }`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onViewportEnter={() => setHoveredIdx(idx)}
                    viewport={{ margin: '-45% 0px -45% 0px' }}
                    onClick={() => {
                      setHoveredIdx(idx);
                      toggleMobileExpand(idx);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Circle step badge */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isHovered
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-neutral-900/5 dark:bg-white/5 border border-color'
                          }`}
                        >
                          {step.num}
                        </div>
                        <h4 className="font-header font-black text-base lg:text-lg tracking-tight uppercase">
                          {step.title}
                        </h4>
                      </div>

                      {/* Desktop Icon Indicator */}
                      <span
                        className={`text-muted hidden lg:block ${isHovered ? 'text-primary' : ''}`}
                      >
                        {step.icon}
                      </span>

                      {/* Mobile Expand Indicator */}
                      <span className="lg:hidden text-xs text-muted">
                        {mobileExpandedIdx === idx ? 'Collapse ▲' : 'Expand ▼'}
                      </span>
                    </div>

                    {/* Inline detail expand (Mobile Only) */}
                    <div
                      className="lg:hidden overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: mobileExpandedIdx === idx ? '500px' : '0px',
                        marginTop: mobileExpandedIdx === idx ? '16px' : '0px',
                      }}
                    >
                      <div className="pt-3 border-t border-color font-sans">
                        <h5 className="font-header font-extrabold text-[15px] uppercase tracking-tight text-primary mb-2">
                          {step.headline}
                        </h5>
                        <p className="text-[12px] text-secondary leading-relaxed mb-4">
                          {step.desc}
                        </p>

                        <div className="border-t border-color pt-3 font-mono text-[10px] text-muted">
                          <span className="font-bold text-primary block mb-1">CAPABILITIES //</span>
                          <ul className="flex flex-col gap-1.5 list-none pl-0">
                            {step.details.map((det) => (
                              <li className="flex items-center gap-2" key={det}>
                                <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
                                <span>{det}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Hand: Active Detail Pane (Desktop Only) */}
            <div className="lg:col-span-5 sticky top-24 hidden lg:block">
              <div className="border border-color p-8 rounded bg-neutral-900/5 dark:bg-white/5 flex flex-col justify-between min-h-[460px]">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-xs text-muted font-bold tracking-widest border border-color px-2 py-0.5 rounded">
                      STAGE {steps[hoveredIdx].num} {'//'}
                    </span>
                    <span className="text-primary">{steps[hoveredIdx].icon}</span>
                  </div>

                  <h3 className="font-header font-black text-2xl uppercase tracking-tight text-primary leading-tight mb-4">
                    {steps[hoveredIdx].headline}
                  </h3>

                  <p className="text-secondary text-[13px] leading-relaxed mb-6 font-sans">
                    {steps[hoveredIdx].desc}
                  </p>
                </div>

                <div className="border-t border-color pt-5 font-mono text-[11px] text-muted">
                  <span className="font-bold text-primary block mb-3">STAGE CAPABILITIES:</span>
                  <ul className="flex flex-col gap-2.5 list-none pl-0">
                    {steps[hoveredIdx].details.map((det) => (
                      <li className="flex items-start gap-2.5" key={det}>
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="max-w-[850px] mx-auto text-center px-6 mt-16 lg:mt-24">
        <div className="border border-color p-8 lg:p-12 rounded bg-neutral-900/5 dark:bg-white/5">
          <span className="font-mono text-[10px] tracking-widest text-muted border border-color px-2.5 py-1 rounded block w-fit mx-auto mb-4 font-bold uppercase">
            Start Shortening Cycles
          </span>
          <h3 className="font-header text-[22px] lg:text-26px uppercase mb-3">
            Ready to shorten audit cycles?
          </h3>
          <p className="text-[13px] text-secondary max-w-lg mx-auto mb-8 font-sans">
            See how DocRack helps CA firms move from document collection to inspection-ready audit
            files in days instead of months.
          </p>
          <Link href="/intake" className="btn btn-primary w-fit mx-auto flex items-center gap-2">
            Book a Demo <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
