'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Sparkles,
  PenLine,
  FileSpreadsheet,
  Link2,
  ShieldCheck,
  Clock,
  MapPin,
  Lock,
  Landmark,
  Server,
  type LucideIcon,
} from 'lucide-react';

interface SlideData {
  title: string;
  tag: string;
  desc: string;
  metric: string;
  metricLabel: string;
}

interface WheelSegment {
  icon: LucideIcon;
  label: string;
  detailTitle: string;
  detailText: string;
}

const wheelSegments: WheelSegment[] = [
  {
    icon: Database,
    label: 'Data Connection',
    detailTitle: 'Data Connection',
    detailText: 'Sync Tally, GST filings, bank statements, and ERP exports securely into DocRack.',
  },
  {
    icon: Sparkles,
    label: 'Classification',
    detailTitle: 'Classification',
    detailText:
      'AI suggests classifications · you confirm, override, or exclude · your stamp is truth.',
  },
  {
    icon: PenLine,
    label: 'Auditor Control',
    detailTitle: 'Auditor Control',
    detailText:
      'Every decision, verdict, and finding requires your signed approval before it becomes record.',
  },
  {
    icon: FileSpreadsheet,
    label: 'Working Papers',
    detailTitle: 'Working Papers',
    detailText:
      'Auto-draft 17 of 21 CARO clauses, reconciliations, and auditor checklists from your decisions.',
  },
  {
    icon: Link2,
    label: 'Evidence Link',
    detailTitle: 'Evidence Linked',
    detailText:
      'Every number traces back to source documents · click through from paper to invoice to proof.',
  },
  {
    icon: ShieldCheck,
    label: 'Crypto Seal',
    detailTitle: 'Crypto Sealed',
    detailText:
      'Ed25519 signatures + Merkle trees make audit tamper-proof · verify offline, years later.',
  },
  {
    icon: Clock,
    label: 'Time-Stamped',
    detailTitle: 'Time-Stamped',
    detailText:
      'Immutable audit trail · prove exactly when every action happened for SA 230 + NFRA readiness.',
  },
];

// Wheel geometry — all coordinates computed, viewBox 0 0 840 840
const WHEEL = { cx: 420, cy: 420, rOut: 200, rIn: 118, rIcon: 248, gapDeg: 1.6 };
const SEG_STEP = 360 / wheelSegments.length;

// deg is measured clockwise from 12 o'clock
function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [+(WHEEL.cx + r * Math.cos(a)).toFixed(2), +(WHEEL.cy + r * Math.sin(a)).toFixed(2)];
}

function segmentPath(index: number): string {
  const a0 = index * SEG_STEP + WHEEL.gapDeg;
  const a1 = (index + 1) * SEG_STEP - WHEEL.gapDeg;
  const [x1, y1] = polar(WHEEL.rOut, a0);
  const [x2, y2] = polar(WHEEL.rOut, a1);
  const [x3, y3] = polar(WHEEL.rIn, a1);
  const [x4, y4] = polar(WHEEL.rIn, a0);
  return `M ${x1} ${y1} A ${WHEEL.rOut} ${WHEEL.rOut} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${WHEEL.rIn} ${WHEEL.rIn} 0 0 0 ${x4} ${y4} Z`;
}

function segmentMidAngle(index: number): number {
  return index * SEG_STEP + SEG_STEP / 2;
}

// Place each label clear of its icon: above/below near 12 and 6 o'clock,
// beside the icon (anchored away from it) on the left/right flanks.
function labelPlacement(index: number): {
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
} {
  const mid = segmentMidAngle(index);
  const [ix, iy] = polar(WHEEL.rIcon, mid);
  if (mid <= 30 || mid >= 330) return { x: ix, y: iy - 54, anchor: 'middle' };
  if (mid >= 150 && mid <= 210) return { x: ix, y: iy + 54, anchor: 'middle' };
  if (mid < 180) return { x: ix + 48, y: iy, anchor: 'start' };
  return { x: ix - 48, y: iy, anchor: 'end' };
}

const slides: SlideData[] = [
  {
    tag: 'MODULE 01 / AI AUDIT',
    title: 'AUTOMATED COMPLIANCE ENGINE',
    desc: 'Drafts 17 of 21 CARO clauses instantly from your books — leaving only 4 for your physical sign-off. 98%+ accuracy in ledger mapping.',
    metric: '17 of 21',
    metricLabel: 'CARO 2020 Clauses Auto-Drafted',
  },
  {
    tag: 'MODULE 02 / RECONCILER',
    title: 'SEAMLESS TAX RECONCILIATION',
    desc: 'Reconciles Tally journal entries with GSTR-2A/2B and GSTR-9C filings automatically. Maps input tax credit drift and flags vendor invoice mismatches — all in seconds.',
    metric: '< 12s',
    metricLabel: 'Reconciliation Run',
  },
  {
    tag: 'MODULE 03 / AUDIT INTEGRITY',
    title: 'TAMPER-PROOF AUDIT TRAIL',
    desc: 'Every action — verification, review, document upload — is cryptographically signed and time-stamped. Years later, anyone can verify exactly what happened, when, and by whom.',
    metric: '0.00%',
    metricLabel: 'Tampering Risk',
  },
];

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeDetail, setActiveDetail] = useState(0);
  const visualizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animation trigger
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add animation-active class to trigger animations
          if (entry.target.parentElement) {
            entry.target.parentElement.classList.add('animation-active');
          }
        }
      },
      { threshold: 0.3 }
    );

    if (visualizationRef.current) {
      observer.observe(visualizationRef.current);
    }

    return () => {
      if (visualizationRef.current) {
        observer.unobserve(visualizationRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[slideIndex];

  return (
    <>
      <div className="brutalist-grid">
        {/* 1. LEFT COLUMN: Hero Pitch & Telemetry Status */}
        <section className="brutalist-col justify-between">
          {/* Drafting Axes Markers */}
          <span className="plus-marker plus-tl">+</span>
          <span className="plus-marker plus-tr">+</span>
          <span className="plus-marker plus-bl">+</span>
          <span className="plus-marker plus-br">+</span>

          <div className="hero-desc-block">
            <span className="hero-tag">BUILT FOR INDIAN STATUTORY, TAX & INTERNAL AUDIT</span>
            <h1 className="hero-heading">Audit software that has to prove its work.</h1>
            <p className="hero-sub">
              DocRack turns your engagement into evidence-linked working papers with a
              cryptographically time-stamped trail — deployable on cloud, in your firm&apos;s VPC,
              or fully air-gapped. Built to the standards ICAI, NFRA, and the Companies Act actually
              hold you to.
            </p>
          </div>

          <div className="my-8 flex flex-col gap-3">
            <Link href="/intake" className="btn btn-primary w-full text-center">
              Book a demo
            </Link>
            <a href="#how-it-works" className="btn btn-secondary w-full text-center">
              See how it works ↓
            </a>
          </div>

          <div className="hero-trust-badges">
            <div className="trust-badge">
              <span className="badge-icon">
                <MapPin size={17} strokeWidth={1.75} />
              </span>
              <span className="badge-text">100% India-Hosted Data</span>
            </div>
            <div className="trust-badge">
              <span className="badge-icon">
                <Lock size={17} strokeWidth={1.75} />
              </span>
              <span className="badge-text">DPDP-Ready Compliance</span>
            </div>
            <div className="trust-badge">
              <span className="badge-icon">
                <Landmark size={17} strokeWidth={1.75} />
              </span>
              <span className="badge-text">ICAI & NFRA Standards</span>
            </div>
            <div className="trust-badge">
              <span className="badge-icon">
                <Server size={17} strokeWidth={1.75} />
              </span>
              <span className="badge-text">Cloud or On-Premise</span>
            </div>
          </div>
        </section>

        {/* 2. MIDDLE COLUMN: Data to Evidence Flow Visualization */}
        <section className="brutalist-col items-center justify-center min-h-[400px]">
          <span className="plus-marker plus-tl">+</span>
          <span className="plus-marker plus-tr">+</span>
          <span className="plus-marker plus-bl">+</span>
          <span className="plus-marker plus-br">+</span>

          <div className="hero-visual-block w-full" ref={visualizationRef}>
            <div className="audit-lifecycle-visualization">
              <svg
                viewBox="0 0 840 840"
                className="lifecycle-svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Decorative rotating dashed ring */}
                <circle
                  cx={WHEEL.cx}
                  cy={WHEEL.cy}
                  r={WHEEL.rOut + 24}
                  className="lifecycle-ring"
                />

                {/* Center circle */}
                <circle cx={WHEEL.cx} cy={WHEEL.cy} r={WHEEL.rIn - 4} className="center-circle" />
                <text x={WHEEL.cx} y={WHEEL.cy - 6} className="center-text">
                  DocRack
                </text>
                <text x={WHEEL.cx} y={WHEEL.cy + 22} className="center-subtext">
                  Audit
                </text>

                {wheelSegments.map((segment, i) => {
                  const mid = segmentMidAngle(i);
                  const [iconX, iconY] = polar(WHEEL.rIcon, mid);
                  const label = labelPlacement(i);
                  const Icon = segment.icon;
                  return (
                    <g
                      key={segment.label}
                      className={`lifecycle-segment segment-${i + 1}`}
                      data-segment={i + 1}
                      onMouseEnter={() => setActiveDetail(i)}
                    >
                      <path d={segmentPath(i)} className="segment-path" />
                      <circle cx={iconX} cy={iconY} r="34" className="segment-icon-bg" />
                      <g className="segment-icon-svg">
                        <Icon
                          x={iconX - 13}
                          y={iconY - 13}
                          width={26}
                          height={26}
                          strokeWidth={1.75}
                        />
                      </g>
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor={label.anchor}
                        className="segment-label"
                      >
                        {segment.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover Detail Panel */}
              <div className="lifecycle-detail-panel">
                {wheelSegments.map((segment, i) => (
                  <div
                    key={segment.detailTitle}
                    className={`detail-item${activeDetail === i ? ' active' : ''}`}
                    data-detail={i + 1}
                  >
                    <h4>{segment.detailTitle}</h4>
                    <p>{segment.detailText}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/workflow" className="details-circle-btn">
              <span>SHOWCASE</span>
              <span>CAPABILITIES</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
          </div>
        </section>

        {/* 3. RIGHT COLUMN: Interactive Feature Slider */}
        <section className="brutalist-col justify-between">
          <span className="plus-marker plus-tl">+</span>
          <span className="plus-marker plus-tr">+</span>
          <span className="plus-marker plus-bl">+</span>
          <span className="plus-marker plus-br">+</span>

          <div className="flex flex-col gap-4">
            <span className="hero-tag">OPERATIONAL MODES</span>
            <h2 className="hero-right-title">What DocRack does</h2>
            <p className="text-[13px] text-secondary">
              Three integrated engines that work together to turn your engagement into defensible,
              verified working papers:
            </p>
          </div>

          <div className="hero-interactive-card relative my-6">
            <div className="slider-controls">
              <span className="font-mono text-[9px] font-bold text-muted border border-color px-2 py-0.5 rounded">
                {currentSlide.tag}
              </span>
              <div className="slider-arrows">
                <button
                  onClick={prevSlide}
                  className="arrow-btn"
                  aria-label="Previous operational mode"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="arrow-btn"
                  aria-label="Next operational mode"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="min-h-[140px] flex flex-col justify-between">
              <div>
                <h3 className="font-header font-black text-lg tracking-tight mb-2 text-primary uppercase">
                  {currentSlide.title}
                </h3>
                <p className="text-[12px] text-secondary leading-relaxed">{currentSlide.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-color flex items-center justify-between font-mono">
                <span className="text-[10px] text-muted uppercase">{currentSlide.metricLabel}</span>
                <span className="text-sm font-bold text-primary">{currentSlide.metric}</span>
              </div>
            </div>
          </div>

          <div className="audit-log-card">
            <div className="audit-log-header">
              <span className="text-muted font-mono text-[9px] font-bold">SYSTEM AUDIT TRAIL</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="audit-log-content">
              <div className="audit-log-item">
                <span className="status-icon">✓</span>
                <span className="status-text">Ledger Data Synced Securely</span>
              </div>
              <div className="audit-log-item">
                <span className="status-icon">✓</span>
                <span className="status-text">No Unauthorized Alterations Detected</span>
              </div>
              <div className="audit-log-item">
                <span className="status-icon">✓</span>
                <span className="status-text">Audit Trail Locked & Time-Stamped</span>
              </div>
              <div className="audit-log-item">
                <span className="status-icon">✓</span>
                <span className="status-text">Verification Records Immutable</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* NEW CONTENT SECTIONS */}
      <div className="content-sections-wrapper flex flex-col gap-10 py-20 px-6 md:px-12 max-w-6xl mx-auto">
        {/* 2.3 How it works */}
        <section id="how-it-works" className="content-panel flex flex-col gap-8">
          <div>
            <span className="hero-tag mb-2 inline-block">HOW IT WORKS</span>
            <h2 className="section-heading text-3xl md:text-4xl">
              From ledger to signed report — with the auditor in charge at every step
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-color p-6 relative">
              <span className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center bg-primary text-black font-bold font-mono rounded-lg">
                1
              </span>
              <h3 className="font-header font-bold text-lg mb-3 mt-2 text-primary">Connect.</h3>
              <p className="text-secondary text-sm">
                Bring in Tally, bank statements, GST filings, and ERP exports. Year-two engagements
                pick up where the last one left off — nothing re-classified from scratch.
              </p>
            </div>
            <div className="border border-color p-6 relative">
              <span className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center bg-primary text-black font-bold font-mono rounded-lg">
                2
              </span>
              <h3 className="font-header font-bold text-lg mb-3 mt-2 text-primary">
                The system proposes. You decide.
              </h3>
              <p className="text-secondary text-sm">
                Every classification, match, and finding is a suggestion until an auditor stamps it
                — confirmed, overridden, excluded, or marked not-applicable. Nothing becomes part of
                the record on its own.
              </p>
            </div>
            <div className="border border-color p-6 relative">
              <span className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center bg-primary text-black font-bold font-mono rounded-lg">
                3
              </span>
              <h3 className="font-header font-bold text-lg mb-3 mt-2 text-primary">
                Sign, seal, defend.
              </h3>
              <p className="text-secondary text-sm">
                Working papers export in your firm&apos;s template. Every stamp is signed and
                time-anchored, so the engagement can be verified — even offline, even years later —
                without asking anyone to take your word for it.
              </p>
            </div>
          </div>
        </section>

        {/* 2.4 Differentiators */}
        <section className="content-panel flex flex-col gap-8">
          <div>
            <span className="hero-tag mb-2 inline-block">WHAT WE DON&apos;T COMPROMISE ON</span>
            <h2 className="section-heading text-3xl md:text-4xl">
              The four things an audit actually gets defended on
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-t border-color pt-4">
              <h3 className="font-header font-bold text-lg mb-2 text-primary uppercase">
                Evidence
              </h3>
              <p className="text-secondary text-sm">
                Findings are executed against the actual documents, not just described from them —
                with a per-item sign-off, not a single blanket status for the whole test.
              </p>
            </div>
            <div className="border-t border-color pt-4">
              <h3 className="font-header font-bold text-lg mb-2 text-primary uppercase">Time</h3>
              <p className="text-secondary text-sm">
                Every signed action is anchored into a tamper-evident trail. If anyone asks{' '}
                <em className="text-primary not-italic font-bold">when</em> something happened —
                during the engagement, at peer review, or years into an inspection — there&apos;s a
                provable answer, not a database timestamp someone could have edited.
              </p>
            </div>
            <div className="border-t border-color pt-4">
              <h3 className="font-header font-bold text-lg mb-2 text-primary uppercase">
                Sovereignty
              </h3>
              <p className="text-secondary text-sm">
                One build. Run it in the cloud, inside your own VPC, or fully air-gapped with no
                outbound network at all. However you deploy, the engine doesn&apos;t stop
                mid-engagement waiting on a metered AI credit.
              </p>
            </div>
            <div className="border-t border-color pt-4">
              <h3 className="font-header font-bold text-lg mb-2 text-primary uppercase">
                Governance
              </h3>
              <p className="text-secondary text-sm">
                Independence checks, review-order enforcement, and inspection-readiness aren&apos;t
                a checklist you fill in — they&apos;re rules the software enforces before a report
                can go out.
              </p>
            </div>
          </div>
        </section>

        {/* 2.5 Who it's for */}
        <section className="content-panel flex flex-col gap-8">
          <h2 className="section-heading text-3xl md:text-4xl">
            Built for two kinds of audit teams
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/[0.03] dark:bg-white/5 p-8 border border-color">
              <h3 className="font-header font-bold text-xl mb-4 text-primary uppercase">
                For CA firms
              </h3>
              <p className="text-secondary text-sm mb-6 min-h-[80px]">
                Statutory and tax audit, end to end — from engagement setup through Form 3CD, CARO,
                Schedule III, and the signed opinion. One workspace, one shell learned once, every
                working paper in one place.
              </p>
              <Link
                href="/intake"
                className="text-primary font-mono text-xs font-bold hover:underline"
              >
                → Book a demo for your firm
              </Link>
            </div>
            <div className="bg-black/[0.03] dark:bg-white/5 p-8 border border-color">
              <h3 className="font-header font-bold text-xl mb-4 text-primary uppercase">
                For enterprise & BFSI internal audit
              </h3>
              <p className="text-secondary text-sm mb-6 min-h-[80px]">
                Internal audit that meets the same evidentiary bar as statutory work, with the
                deployment posture regulated entities actually require — including on-prem and
                VPC-isolated options.
              </p>
              <Link
                href="/support"
                className="text-primary font-mono text-xs font-bold hover:underline"
              >
                → Talk to us about internal audit
              </Link>
            </div>
          </div>
        </section>

        {/* 2.6 Compliance-native section */}
        <section className="content-panel">
          <span className="hero-tag mb-2 inline-block">NOT BOLTED ON</span>
          <h2 className="section-heading text-2xl md:text-3xl mb-4">
            Built to the standards, not around them
          </h2>
          <p className="text-secondary text-sm leading-relaxed max-w-3xl">
            Every working paper cites the exact standard, section, or rule behind it — ICAI&apos;s
            Standards on Auditing, the Companies Act, CBDT and CBIC rules, NFRA guidance. When a
            standard changes, the affected papers flag for review instead of quietly going stale.
            All statutory content is reviewed by our in-house chartered accountant before it ships —
            nothing about tax or audit law ships on engineering judgment alone.
          </p>
        </section>

        {/* 2.7 Manifesto */}
        <section className="content-panel flex flex-col gap-6">
          <h2 className="section-heading text-3xl md:text-4xl">Why we&apos;re building this</h2>
          <p className="text-secondary text-sm leading-relaxed max-w-3xl">
            Indian audits run on spreadsheets and generic global tools that don&apos;t know what a
            3CD is, or AI features bolted onto workflows never designed for audit evidence. We are a
            team of auditors and engineers building what we actually needed: a system where the
            auditor commands, the system proposes, and the auditor&apos;s stamp is always the final
            word.
          </p>
          <Link href="/about" className="btn btn-secondary mt-2 self-start">
            Read the full story
          </Link>
        </section>

        {/* 2.8 Final CTA */}
        <section className="content-panel flex flex-col gap-6">
          <div>
            <h2 className="section-heading text-3xl md:text-4xl mb-2">
              See it on your own engagement
            </h2>
            <p className="text-secondary text-sm">
              Bring a real (or anonymized) ledger. We&apos;ll walk through it with you.
            </p>
          </div>
          <Link href="/intake" className="btn btn-primary px-12 self-start">
            Book a demo — no pricing conversation required
          </Link>
        </section>

        {/* 2.9 FAQ */}
        <section className="content-panel flex flex-col gap-8">
          <h2 className="section-heading text-2xl md:text-3xl">Frequently Asked Questions</h2>
          <div className="flex flex-col divide-y divide-color border-y border-color">
            <div className="py-4">
              <h4 className="font-bold text-primary mb-1">
                Does any of my client&apos;s data train an AI model?
              </h4>
              <p className="text-secondary text-sm">
                No — client data is never used to train any underlying model.
              </p>
            </div>
            <div className="py-4">
              <h4 className="font-bold text-primary mb-1">
                Can this run without any internet access?
              </h4>
              <p className="text-secondary text-sm">
                Yes — the same product deploys fully air-gapped for firms and enterprises that
                require it.
              </p>
            </div>
            <div className="py-4">
              <h4 className="font-bold text-primary mb-1">
                What happens if I disagree with something the system suggests?
              </h4>
              <p className="text-secondary text-sm">
                Your decision always wins. Suggestions are never final until an auditor signs off,
                and your edits are never silently overwritten.
              </p>
            </div>
            <div className="py-4">
              <h4 className="font-bold text-primary mb-1">Is this DPDP-compliant?</h4>
              <p className="text-secondary text-sm">
                Yes, our infrastructure is built to meet the requirements of the Digital Personal
                Data Protection Act.
              </p>
            </div>
            <div className="py-4">
              <h4 className="font-bold text-primary mb-1">Which books/ERPs do you support?</h4>
              <p className="text-secondary text-sm">
                We currently support Tally, with more integrations being added.
              </p>
            </div>
            <div className="py-4">
              <h4 className="font-bold text-primary mb-1">
                Do you support internal audit as well as statutory audit?
              </h4>
              <p className="text-secondary text-sm">
                Yes — our platform handles both statutory/tax audit for CA firms and internal audit
                for enterprises & BFSI.
              </p>
            </div>
          </div>
        </section>

        {/* 2.10 Credibility — Trusted by & Backed by */}
        <section className="content-panel flex flex-col items-center gap-14 text-center">
          <div className="flex flex-col items-center gap-6 w-full">
            <span className="hero-tag">TRUSTED BY</span>
            <div className="credibility-strip">
              <div className="credibility-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="credibility-logo"
                  src="/logos/aditya-birla.png"
                  alt="Aditya Birla"
                  width={250}
                  height={154}
                  loading="lazy"
                />
                <span className="credibility-caption">Health Insurance</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <span className="hero-tag">BACKED BY</span>
            <div className="credibility-strip">
              <div className="credibility-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="credibility-logo credibility-logo--badge"
                  src="/logos/nvidia-inception.png"
                  alt="NVIDIA Inception Program"
                  width={636}
                  height={280}
                  loading="lazy"
                />
              </div>
              <div className="credibility-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="credibility-logo"
                  src="/logos/iit-bombay.png"
                  alt="IIT Bombay"
                  width={250}
                  height={244}
                  loading="lazy"
                />
                <span className="credibility-caption">IDEAS Program</span>
              </div>
            </div>
          </div>

          <p className="credibility-parent">Built by Orbicle Labs Pvt. Ltd.</p>
        </section>
      </div>
    </>
  );
}
