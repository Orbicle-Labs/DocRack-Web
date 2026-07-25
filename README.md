# DocRack Platform (Lead Generation Site)

DocRack is the marketing and lead-generation portal for a next-generation security and compliance platform designed for Indian Chartered Accountant (CA) firms and corporate audit/compliance teams.

This repository hosts the public-facing platform website, designed to capture customer compliance queries and demo booking requests securely.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router with TypeScript)
- **Lead Storage**: [Google Sheets](https://sheets.google.com/) (one spreadsheet, one tab per form)
- **Notifications**: [Resend](https://resend.com/) (instant email per submission)
- **Hosting**: [GCP Cloud Run](https://cloud.google.com/run) (Docker, serverless)
- **Styling**: Vanilla CSS with [Tailwind CSS v3](https://tailwindcss.com/) utilities
- **Validation**: [Zod](https://zod.dev/) schemas
- **Tracking**: [@vercel/analytics](https://vercel.com/analytics)
- **Fonts**: `next/font/google` (Outfit, Inter, and JetBrains Mono)

---

## 🔒 Security & Spam Hardening

- **Content Security Policy (CSP)**: Strict headers configured in `next.config.ts` blocking `'unsafe-eval'` and `'unsafe-inline'` script injections in production.
- **Server Route Handlers**: All form submissions (Demos and Support tickets) bypass frontend client insertion and route securely via:
  - [`/api/demo-booking`](/app/api/demo-booking/route.ts)
  - [`/api/support-ticket`](/app/api/support-ticket/route.ts)
- **Anti-Spam Controls**:
  - **Honeypot Input**: Invisible `_hp` fields capture and discard bot submissions.
  - **IP Rate Limiting**: Limiters restrict abuse (3 demo requests/20m, 5 support tickets/30m).
- **HTML Escaping**: All user input is escaped before being rendered into notification emails.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create the Google Sheet

Create one spreadsheet (e.g. "DocRack Leads") with two tabs, and add a header row to each:

- `Demo Bookings`: `Timestamp | Full Name | Email | Company | Annual Audits`
- `Support Tickets`: `Timestamp | Full Name | Email | Message`

Share the spreadsheet (as **Editor**) with your GCP service account's email
(`docrack-web-sa@<project-id>.iam.gserviceaccount.com`). For local development, download a JSON
key for that service account and save it at `secrets/gcp-sa-key.json` (gitignored).

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and copy the contents from `.env.example`:

```env
GOOGLE_SHEET_ID=your-sheet-id-here
GOOGLE_APPLICATION_CREDENTIALS=./secrets/gcp-sa-key.json

# Optional — email notification per submission (server-only, never commit)
RESEND_API_KEY=re_your_resend_api_key
NOTIFY_EMAIL=you@yourdomain.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your local browser.

### 5. Build for Production

Verify typescript compilation, ESLint rules, and asset bundle sizes:

```bash
npm run build
```

---

## ☁️ Deploy (GCP Cloud Run)

The app ships as a Docker image (see `Dockerfile`, standalone Next.js output) and runs on
Cloud Run with the `docrack.ai` domain mapped. In production no key file is needed — the
Cloud Run service account provides keyless credentials for Sheets, and `RESEND_API_KEY`
is injected from Secret Manager. See `DEPLOYMENT.md` for the full step-by-step runbook
(GCP setup, deploy command, GoDaddy DNS, Resend domain verification).

---

## 📈 Performance & Bundle Analysis

To audit bundle sizes, run the compiler with the `ANALYZE` environment variable:

```bash
# Windows (PowerShell)
$env:ANALYZE="true"; npm run build

# Linux/macOS
ANALYZE=true npm run build
```

This launches the visual bundle analyzer pages in your browser once compilation completes.
