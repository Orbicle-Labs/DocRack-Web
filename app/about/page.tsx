import React from 'react';
import Link from 'next/link';
import { Compass, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="legacy-page min-h-screen pb-20">
      {/* Page Title Section */}
      <header className="page-title-section">
        <span className="page-tag">Our Mission</span>
        <h1 className="page-title">Sovereign Audit Systems</h1>
        <p className="page-subtitle max-w-xl mx-auto">
          We engineer technical tools that restore complete transparency, data control, and
          tamper-proof verification records to enterprise auditing.
        </p>
      </header>

      {/* Split Editorial Layout */}
      <section className="about-split-layout">
        {/* Left Column: Sand/Obsidian Editorial Box */}
        <div className="about-editorial-panel">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-muted tracking-wider uppercase">
              {'// COMPLIANCE CONTEXT'}
            </span>
            <h3 className="font-header font-black text-[24px] uppercase tracking-tight text-primary leading-tight">
              Sovereign data integrity for Indian risk professionals.
            </h3>
          </div>

          <div className="border-t border-color pt-6 mt-6 font-mono text-[11px] text-secondary flex flex-col gap-1.5">
            <div>[ LOCATION ] ap-south-1 (Mumbai)</div>
            <div>[ STANDARD ] CARO 2020 Compliant</div>
            <div>[ PROTOCOL ] Ed25519 & Merkle Trees</div>
          </div>
        </div>

        {/* Right Column: Paragraph Details and Team */}
        <div className="about-details-content">
          <div className="flex flex-col gap-4">
            <h3 className="font-header font-extrabold text-[18px] uppercase tracking-tight text-primary flex items-center gap-2">
              <Compass size={18} className="text-muted" /> The DocRack Paradigm
            </h3>
            <p>
              Traditional auditing practices in India rely on fragile spreadsheet exchanges,
              unverified ERP exports, and manual, high-risk compliance checklist checks. This leaves
              firms exposed to transaction tampering, ledger adjustments, and audit-trail gaps.
            </p>
            <p>
              DocRack replaces this vulnerability with an automated, cryptographically secured
              operating console. By directly parsing accounting schemas and cross-checking inputs
              against national records (like GSTR tax tables) inside a secure sandboxed system, we
              provide absolute confidence to risk managers.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="max-w-[1100px] mx-auto px-[8%] mt-8">
        <div className="border border-color p-8 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <h4 className="font-header font-extrabold text-lg uppercase mb-2 flex items-center gap-2">
              <Target size={16} /> DATA SOVEREIGNTY BY DESIGN
            </h4>
            <p className="text-[12px] text-secondary">
              We operate under the fundamental belief that financial records are sovereign assets.
              We do not participate in advertising networks, sell metadata, or utilize unverified
              cloud models. Your workspace remains entirely isolated, controlled, and verifiable.
            </p>
          </div>
          <Link
            href="/intake"
            className="btn btn-primary self-stretch md:self-auto text-center shrink-0"
          >
            Audit Workspace Setup
          </Link>
        </div>
      </section>
    </div>
  );
}
