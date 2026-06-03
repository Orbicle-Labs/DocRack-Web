"use client";

import React from "react";

// global-error catches errors in the root layout itself.
// Must include its own <html> and <body> tags.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          background: "#F5F0E8",
          color: "#0A0A0A",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 16,
            }}
          >
            Critical Error
          </p>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}
          >
            Orvyn
          </h1>
          <p style={{ fontSize: 13, color: "#555", marginBottom: 32 }}>
            A critical error occurred. Please refresh the page.
          </p>
          {process.env.NODE_ENV === "development" && error?.message && (
            <pre
              style={{
                textAlign: "left",
                fontSize: 11,
                background: "rgba(220,38,38,0.05)",
                border: "1px solid rgba(220,38,38,0.2)",
                color: "#dc2626",
                padding: 16,
                borderRadius: 4,
                overflow: "auto",
                marginBottom: 24,
              }}
            >
              {error.message}
            </pre>
          )}
          <button
            onClick={reset}
            style={{
              padding: "10px 24px",
              background: "#0A0A0A",
              color: "#F5F0E8",
              border: "none",
              borderRadius: 4,
              fontFamily: "monospace",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
