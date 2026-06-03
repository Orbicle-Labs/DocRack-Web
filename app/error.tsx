"use client";

import React from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-4">
          Error
        </span>
        <h1 className="font-header font-black text-[48px] uppercase tracking-tight text-primary leading-none mb-4">
          Something went wrong
        </h1>
        <p className="text-[13px] text-secondary mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        {process.env.NODE_ENV === "development" && error?.message && (
          <pre className="text-left text-[11px] font-mono bg-rose-500/5 border border-rose-500/20 text-rose-500 p-4 rounded mb-6 overflow-auto">
            {error.message}
          </pre>
        )}
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
