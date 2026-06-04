import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found — DocRack",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-4">
          404
        </span>
        <h1 className="font-header font-black text-[64px] uppercase tracking-tight text-primary leading-none mb-2">
          Not Found
        </h1>
        <p className="text-[13px] text-secondary mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/support" className="btn btn-secondary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
