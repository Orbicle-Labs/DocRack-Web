# DocRack Platform (Lead Generation Site)

DocRack is the marketing and lead-generation portal for a next-generation security and compliance platform designed for Indian Chartered Accountant (CA) firms and corporate audit/compliance teams.

This repository hosts the public-facing platform website, designed to capture customer compliance queries and demo booking requests securely.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router with TypeScript)
- **Database**: [Supabase](https://supabase.com/) (Postgres database with Row Level Security)
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
  - **Duplicate Check**: Prevents identical email submissions within a cooldown window.
- **Row-Level Security (RLS)**: Scoped policies that block public `SELECT` queries while allowing `INSERT`-only operations for public traffic.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory and copy the contents from `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Server-only (Never commit to Git)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
```

### 3. Initialize the Supabase Database

Run the schema setup script inside your Supabase project's SQL Editor:

- File: [`supabase_schema.sql`](/supabase_schema.sql)

This script initializes:

- `demo_bookings` & `support_tickets` tables.
- CHECK constraints for inputs (length limiters, audit range enums, regex email checks).
- Indexes for query performance.
- RLS Policies.

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

## 📈 Performance & Bundle Analysis

To audit bundle sizes, run the compiler with the `ANALYZE` environment variable:

```bash
# Windows (PowerShell)
$env:ANALYZE="true"; npm run build

# Linux/macOS
ANALYZE=true npm run build
```

This launches the visual bundle analyzer pages in your browser once compilation completes.
