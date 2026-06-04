import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <Link href="/" className="brand" aria-label="DocRack Home">
            <Image
              src="/docrack_full_logo.png"
              alt="DocRack Logo"
              width={140}
              height={34}
              className="brand-logo object-contain"
            />
          </Link>
          <p className="footer-desc">
            The secure technical platform designed specifically for Indian CA firms and internal enterprise risk compliance audits.
          </p>
        </div>
        
        <div className="footer-link-col">
          <h5>Product Workflow</h5>
          <ul className="footer-links">
            <li>
              <Link href="/workflow">Pydantic AI Verifications</Link>
            </li>
            <li>
              <Link href="/workflow">Tally GST Reconciler</Link>
            </li>
            <li>
              <Link href="/workflow">Immutable Merkle Trails</Link>
            </li>
          </ul>
        </div>

        <div className="footer-link-col">
          <h5>Sovereign Security</h5>
          <ul className="footer-links">
            <li>
              <Link href="/workflow">DPDP Act Safeguards</Link>
            </li>
            <li>
              <Link href="/workflow">Postgres RLS Matrices</Link>
            </li>
            <li>
              <Link href="/workflow">AWS Mumbai VPC</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} DocRack Inc. All rights reserved. All data residency strictly localized in AWS Mumbai ap-south-1 VPC.
        </p>
      </div>
    </footer>
  );
};
