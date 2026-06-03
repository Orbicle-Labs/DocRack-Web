"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  title: string;
  tag: string;
  desc: string;
  metric: string;
  metricLabel: string;
}

const slides: SlideData[] = [
  {
    tag: "MODULE 01 / AI AUDIT",
    title: "CARO 2020 ENGINE",
    desc: "Autonomous validation of CARO 2020 audit checkpoints. Scans inventory statements, fixed assets registers, and queries discrepancies using secure localized NLP parsing.",
    metric: "98.7%",
    metricLabel: "Fuzzy Extraction Precision"
  },
  {
    tag: "MODULE 02 / RECONCILER",
    title: "TALLY GSTR RECONCILER",
    desc: "Direct ledgers analysis. Reconciles Tally journal entries with GSTR-2A/2B and GSTR-9C filings, mapping input tax credit drift and flagging vendor invoice mismatches.",
    metric: "< 12s",
    metricLabel: "Average Reconciliation Run"
  },
  {
    tag: "MODULE 03 / CRYPTO",
    title: "IMMUTABLE AUDIT TRAILS",
    desc: "Every verification action, checklist check, and document upload generates an Ed25519-signed verification card hashed into secure, verified cryptographic Merkle trees.",
    metric: "0.00%",
    metricLabel: "Tampering Vulnerability"
  }
];

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[slideIndex];

  return (
    <div className="brutalist-grid">
      {/* 1. LEFT COLUMN: Hero Pitch & Telemetry Status */}
      <section className="brutalist-col justify-between">
        {/* Drafting Axes Markers */}
        <span className="plus-marker plus-tl">+</span>
        <span className="plus-marker plus-tr">+</span>
        <span className="plus-marker plus-bl">+</span>
        <span className="plus-marker plus-br">+</span>

        <div className="hero-desc-block">
          <span className="hero-tag">ORVYN // AUDIT OPERATIONS CENTER</span>
          <h1 className="hero-heading">
            RECONCILE LEDGERS. <br />
            SAFEGUARD COMPLIANCE. <br />
            ZERO DRIFT.
          </h1>
          <p className="hero-sub">
            The next-generation technical operating platform designed specifically for Indian CA firms and internal risk compliance teams. Lock down audit trails, automate CARO checklists, and reconcile Tally with GST sheets securely.
          </p>
        </div>

        <div className="my-8 flex flex-col gap-3">
          <Link href="/intake" className="btn btn-primary w-full text-center">
            Book a Demo
          </Link>
          <Link href="/support" className="btn btn-secondary w-full text-center">
            Talk to Our Team
          </Link>
        </div>

        <div className="hero-stats-block">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold tracking-wider">SYSTEM TELEMETRY: ACTIVE</span>
          </div>
          <div className="font-mono text-[11px] text-secondary flex flex-col gap-1.5">
            <div className="flex justify-between border-b border-color pb-1">
              <span>LEDGER COMPRESSION:</span>
              <span className="text-primary font-bold">142,000 r/s</span>
            </div>
            <div className="flex justify-between border-b border-color pb-1">
              <span>MERKLE PATH PROOF:</span>
              <span className="text-primary font-bold">SHA-256</span>
            </div>
            <div className="flex justify-between pb-0.5">
              <span>LOCAL RESIDENCY:</span>
              <span className="text-primary font-bold">Mumbai (AWS)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE COLUMN: Branding Visualizer & Deep Dive Link */}
      <section className="brutalist-col items-center justify-center min-h-[400px]">
        <span className="plus-marker plus-tl">+</span>
        <span className="plus-marker plus-tr">+</span>
        <span className="plus-marker plus-bl">+</span>
        <span className="plus-marker plus-br">+</span>

        <div className="hero-visual-block w-full">
          <div className="bg-structural-text">ORV</div>
          
          {/* Hero graphic grayscale asset with fallbacks */}
          <Image
            src="/orvyn_hero_visual.png"
            alt="Orvyn Grayscale Drafting Graphic"
            width={400}
            height={300}
            className="hero-monochromatic-graphic object-contain max-h-[300px]"
            priority
          />

          <Link href="/features" className="details-circle-btn">
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
          <h2 className="hero-right-title">CORE COMPLIANCE ARTIFACTS</h2>
          <p className="text-[13px] text-secondary">
            Toggle between the underlying compliance engines running on the decentralized Orvyn framework:
          </p>
        </div>

        <div className="hero-interactive-card relative my-6">
          <div className="slider-controls">
            <span className="font-mono text-[9px] font-bold text-muted border border-color px-2 py-0.5 rounded">
              {currentSlide.tag}
            </span>
            <div className="slider-arrows">
              <button onClick={prevSlide} className="arrow-btn" aria-label="Previous operational mode">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextSlide} className="arrow-btn" aria-label="Next operational mode">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="min-h-[140px] flex flex-col justify-between">
            <div>
              <h3 className="font-header font-black text-lg tracking-tight mb-2 text-primary uppercase">
                {currentSlide.title}
              </h3>
              <p className="text-[12px] text-secondary leading-relaxed">
                {currentSlide.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-color flex items-center justify-between font-mono">
              <span className="text-[10px] text-muted uppercase">{currentSlide.metricLabel}</span>
              <span className="text-sm font-bold text-primary">{currentSlide.metric}</span>
            </div>
          </div>
        </div>

        <div className="border border-color p-5 rounded font-mono text-[11px] bg-neutral-900/5 dark:bg-white/5">
          <span className="text-muted block mb-2 uppercase text-[9px] font-bold">{"// SECURE AUDIT LEDGER TRAIL"}</span>
          <pre className="text-secondary overflow-x-auto whitespace-pre-wrap leading-tight">
{`$ orvyn verify-tally-ledger --strict
[STATUS] loading cryptographed ledger...
[OK] ed25519 leaf verification passed.
[OK] no unauthorized alterations found.
[OK] hash synced with public merklized tree.`}
          </pre>
        </div>
      </section>
    </div>
  );
}
