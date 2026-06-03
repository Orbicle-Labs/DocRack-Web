"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = React.memo(({ href, children, className = "" }) => {
  const pathname = usePathname();
  const active = pathname === href ? "active" : "";
  return (
    <Link href={href} className={`${className} nav-link ${active}`}>
      {children}
    </Link>
  );
});
NavLink.displayName = "NavLink";
