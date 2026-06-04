"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <nav className={`navbar ${isOpen ? "nav-open" : ""}`} aria-label="Main Navigation">
      <div className="nav-brand-container">
        <Link href="/" className="brand" aria-label="DocRack Home">
          <Image
            src="/docrack_full_logo.png"
            alt="DocRack Logo"
            width={140}
            height={34}
            className="brand-logo object-contain"
            priority
          />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link href="/" className={`nav-link ${isActive("/")}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/workflow" className={`nav-link ${isActive("/workflow")}`}>
            Workflow
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
          {mounted ? (isDarkTheme ? "🌙" : "☀") : "☀"}
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
                href="/workflow"
                className={`mobile-nav-link ${isActive("/workflow")}`}
                onClick={() => setIsOpen(false)}
              >
                Workflow
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
