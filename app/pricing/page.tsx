import React from "react";
import Link from "next/link";
import { Check, Info, ArrowRight } from "lucide-react";

interface PricingPlan {
  name: string;
  tag: string;
  desc: string;
  subtext: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Growth",
    tag: "INDEPENDENT FIRMS",
    desc: "For independent Indian CA firms and small audit practices handling localized compliance work.",
    subtext: "Tailored to your audit volume and firm size.",
    features: [
      "CARO 2020 Auto-Checklist",
      "Tally Ledger XML Upload & Parse",
      "GSTR-2B Reconciler Summary",
      "Ed25519 Signed Verification Cards",
      "AWS Mumbai Data Residency",
      "Standard Support SLA"
    ],
    cta: "Request Pricing",
    ctaLink: "/intake",
    popular: false
  },
  {
    name: "Enterprise",
    tag: "MULTI-PARTNER FIRMS",
    desc: "For multi-partner compliance agencies and mid-size audit firms requiring deep system integration.",
    subtext: "Pricing based on team size and engagement scope.",
    features: [
      "CARO 2020 Auto-Checklist (Unlimited)",
      "Real-time Tally REST API Sync",
      "Full GSTR-9C Ledger Reconciliation",
      "Merkle Tree Verification Audit Logs",
      "DPDP Act Consent Logs & Exports",
      "Priority SLA Technical Support",
      "Dedicated Onboarding Engineer"
    ],
    cta: "Book a Demo",
    ctaLink: "/intake",
    popular: true
  },
  {
    name: "Sovereign",
    tag: "LARGE ENTERPRISE",
    desc: "For major enterprise compliance operations requiring private infrastructure and custom deployment.",
    subtext: "Custom onboarding, deployment & infrastructure — built around your requirements.",
    features: [
      "Dedicated Private VPC Deployment",
      "Zero Shared Database Tenant Isolation",
      "Custom HSM Security Integrations",
      "On-Premise Server Sub-licensing",
      "24/7 Dedicated Compliance Engineer",
      "Unlimited Audit Workspace Capacity",
      "Custom SLA & Compliance Agreements"
    ],
    cta: "Contact Sales",
    ctaLink: "/support",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Page Title Section */}
      <header className="page-title-section">
        <span className="page-tag">Enterprise Pricing</span>
        <h1 className="page-title">Built Around Your Scale</h1>
        <p className="page-subtitle max-w-xl mx-auto">
          Orvyn is a consultative enterprise platform. Pricing is tailored to your audit volume, team size, and infrastructure requirements. No public rate cards — every engagement is scoped individually.
        </p>
      </header>

      {/* Pricing Grid */}
      <section className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-card justify-between ${plan.popular ? "popular" : ""}`}
            key={plan.name}
          >
            {plan.popular && <span className="popular-tag">MOST POPULAR</span>}

            <div className="pricing-header">
              <span className="font-mono text-[9px] text-muted tracking-widest uppercase mb-2 block">
                {plan.tag}
              </span>
              <h4 className="text-primary">{plan.name}</h4>
              <p>{plan.desc}</p>

              <div className="price-container mt-4">
                <span className="price-val-text text-primary">CUSTOM</span>
              </div>
              <p className="font-mono text-[10px] text-muted mt-1">{plan.subtext}</p>
            </div>

            <ul className="pricing-features border-t border-b border-color py-6 my-6">
              {plan.features.map((feat) => (
                <li className="flex items-start gap-2.5" key={feat}>
                  <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href={plan.ctaLink}
                className={`btn w-full text-center flex items-center justify-center gap-1.5 ${plan.popular ? "btn-primary" : "btn-secondary"}`}
              >
                {plan.cta} <ArrowRight size={13} />
              </Link>
              <p className="text-center font-mono text-[9px] text-muted uppercase tracking-wider">
                Enterprise consultation required
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* Trust Context */}
      <section className="max-w-[850px] mx-auto px-6 text-center font-mono text-[11px] text-muted mt-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Info size={14} />
          <span>ALL PLANS COMPLY WITH RBI CLOUD STORAGE GUIDELINES FOR FINANCIAL DATA</span>
        </div>
        <p>
          Engagements are scoped through a consultation process. Speak to our team to get a proposal built around your firm.
        </p>
      </section>
    </div>
  );
}
