"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <nav className={`navbar ${isOpen ? "nav-open" : ""}`} aria-label="Main Navigation">
      <div className="nav-brand-container">
        <Link href="/" className="brand" aria-label="Orvyn Home">
          <span className="brand-dot"></span>Orvyn
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link href="/" className={`nav-link ${isActive("/")}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/features" className={`nav-link ${isActive("/features")}`}>
            Features
          </Link>
        </li>
        <li>
          <Link href="/pricing" className={`nav-link ${isActive("/pricing")}`}>
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/about" className={`nav-link ${isActive("/about")}`}>
            About
          </Link>
        </li>
        <li>
          <Link href="/support" className={`nav-link ${isActive("/support")}`}>
            Support
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        <button
          className="theme-toggle-btn"
          id="theme-toggle"
          onClick={toggleTheme}
          title="Toggle visual theme"
          aria-label="Toggle visual theme"
        >
          {isDarkTheme ? "🌙" : "☀"}
        </button>

        <Link href="/support" className="btn btn-secondary nav-action-desktop">
          Contact Us
        </Link>
        <Link href="/intake" className="btn btn-primary nav-action-desktop">
          Book a Demo
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          <ul className="mobile-nav-links">
            <li>
              <Link
                href="/"
                className={`mobile-nav-link ${isActive("/")}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className={`mobile-nav-link ${isActive("/features")}`}
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`mobile-nav-link ${isActive("/pricing")}`}
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`mobile-nav-link ${isActive("/about")}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className={`mobile-nav-link ${isActive("/support")}`}
                onClick={() => setIsOpen(false)}
              >
                Support
              </Link>
            </li>
            <li className="mt-4 pt-4 border-t border-color w-full flex flex-col gap-3">
              <Link
                href="/support"
                className="btn btn-secondary w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/intake"
                className="btn btn-primary w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Book a Demo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
