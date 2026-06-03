import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <Link href="/" className="brand">
            <span className="brand-dot"></span>Orvyn
          </Link>
          <p className="footer-desc">
            The secure technical platform designed specifically for Indian CA firms and internal enterprise risk compliance audits.
          </p>
        </div>
        
        <div className="footer-link-col">
          <h5>Product Features</h5>
          <ul className="footer-links">
            <li>
              <Link href="/features">Pydantic AI Verifications</Link>
            </li>
            <li>
              <Link href="/features">Tally GST Reconciler</Link>
            </li>
            <li>
              <Link href="/features">Immutable Merkle Trails</Link>
            </li>
          </ul>
        </div>

        <div className="footer-link-col">
          <h5>Sovereign Security</h5>
          <ul className="footer-links">
            <li>
              <Link href="/features">DPDP Act Safeguards</Link>
            </li>
            <li>
              <Link href="/features">Postgres RLS Matrices</Link>
            </li>
            <li>
              <Link href="/features">AWS Mumbai VPC</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Orvyn Inc. All rights reserved. All data residency strictly localized in AWS Mumbai ap-south-1 VPC.
        </p>
      </div>
    </footer>
  );
};
