import Link from "next/link";

interface FeatureDetail {
  id: string;
  title: string;
  desc: string;
  icon: string;
  detail: string;
}

const featureList: FeatureDetail[] = [
  {
    id: "ENGINE // CARO",
    title: "Autonomous CARO 2020 Engine",
    desc: "Scan structural inventory reports, fixed assets registers, and financial transactions to extract discrepancy flags. The Pydantic AI parser reads standard reporting structures and highlights gaps directly to audit worksheets.",
    icon: "VERIFY-01",
    detail: "Supports custom audit checklists & automated compliance checks."
  },
  {
    id: "ENGINE // TALLY",
    title: "GST Ledger Reconciler",
    desc: "Reconcile thousands of Tally accounting lines against GSTR-2B credit summaries and GSTR-9C schedules. Automatically trace mismatched input tax credits (ITC), vendor reporting differences, and missing invoices.",
    icon: "LEDGER-02",
    detail: "Processes thousands of ledgers in seconds with comprehensive logs."
  },
  {
    id: "ENGINE // CRYPTO",
    title: "Cryptographic Merkle Audit Trails",
    desc: "Ensure absolute evidentiary proof for client record integrity. Each audit verification check and file checksum generates an Ed25519 signature card stored sequentially inside a structured Merkle tree database schema.",
    icon: "MERKLE-03",
    detail: "100% auditable proof that cannot be modified by any admin."
  },
  {
    id: "ENGINE // LAWS",
    title: "DPDP Act Sovereignty",
    desc: "Achieve direct compliance with India's Digital Personal Data Protection (DPDP) Act. All customer records are shielded with PostgreSQL Row Level Security (RLS) and cryptographic tokens.",
    icon: "DPDP-04",
    detail: "Configurable consent and automated record deletion scripts."
  },
  {
    id: "ENGINE // ARCH",
    title: "AWS Mumbai Sovereign VPC",
    desc: "We enforce strict localized data residency in ap-south-1 (Mumbai). Client file shares, profile structures, database rows, and query queues never exit Indian border nodes.",
    icon: "Mumbai-05",
    detail: "Secured via enterprise-grade VPC subnets and firewall shields."
  },
  {
    id: "ENGINE // INTEGRATE",
    title: "Direct Tally & ERP Connector",
    desc: "Connect directly to local Tally Prime installations or ERP ledger dumps securely. Safely push structural XML/JSON schemas via secure local tokens into the client-side compliance console.",
    icon: "ERP-06",
    detail: "Zero configuration schema mapping for standard Indian ERPs."
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Page Title Section */}
      <header className="page-title-section">
        <span className="page-tag">System Engines</span>
        <h1 className="page-title">Technical Capabilities</h1>
        <p className="page-subtitle max-w-xl mx-auto">
          Explore the underlying autonomous verifications, cryptographic logs, and structural databases that build {"Orvyn's"} enterprise compliance OS.
        </p>
      </header>

      {/* Brutalist Detail Cards Grid */}
      <section className="features-detail-grid">
        {featureList.map((feat) => (
          <article className="feature-detail-card justify-between" key={feat.icon}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="detail-icon-wrapper">{feat.icon}</span>
                <span className="font-mono text-[9px] text-muted">{feat.id}</span>
              </div>
              <h2 className="font-header font-extrabold text-[18px] uppercase tracking-tight text-primary mt-2">
                {feat.title}
              </h2>
              <p className="text-[12px] text-secondary leading-relaxed">
                {feat.desc}
              </p>
            </div>
            
            <div className="mt-6 pt-3 border-t border-color font-mono text-[10px] text-muted">
              <span className="font-bold text-primary block mb-1">SPECIFICATION //</span>
              {feat.detail}
            </div>
          </article>
        ))}
      </section>

      {/* Bottom CTA Block */}
      <section className="max-w-[800px] mx-auto text-center px-6 mt-10">
        <div className="border border-color p-8 rounded bg-neutral-900/5 dark:bg-white/5">
          <h3 className="font-header text-[22px] uppercase mb-3">Deploy Orvyn for Your Audit Operations</h3>
          <p className="text-[13px] text-secondary max-w-lg mx-auto mb-6">
            Get started with real-time tally audit ledgers and autonomous CARO checks today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn btn-primary">
              Deploy Instance
            </Link>
            <Link href="/intake" className="btn btn-secondary">
              Book Technical Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
