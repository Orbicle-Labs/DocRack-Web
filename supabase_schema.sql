// ============================================================
// ORVYN DATABASE SCHEMA — Lead Generation Only
// Run this in your Supabase SQL Editor
// ============================================================

-- Drop old auth-linked tables if they exist
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- ============================================================
-- TABLE: demo_bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS demo_bookings (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name   text        NOT NULL,
  email       text        NOT NULL,
  company_name text       NOT NULL,
  audit_count text        NOT NULL,
  created_at  timestamptz DEFAULT now(),

  -- CHECK constraints (database-level validation)
  CONSTRAINT chk_demo_full_name_length
    CHECK (char_length(full_name) BETWEEN 2 AND 100),

  CONSTRAINT chk_demo_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),

  CONSTRAINT chk_demo_email_length
    CHECK (char_length(email) <= 254),

  CONSTRAINT chk_demo_company_name_length
    CHECK (char_length(company_name) BETWEEN 2 AND 200),

  -- audit_count must be one of the defined enum values
  CONSTRAINT chk_demo_audit_count_enum
    CHECK (audit_count IN ('1-10', '10-50', '50-100', '100+'))
);

-- ============================================================
-- TABLE: support_tickets
-- ============================================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name   text        NOT NULL,
  email       text        NOT NULL,
  message     text        NOT NULL,
  created_at  timestamptz DEFAULT now(),

  -- CHECK constraints
  CONSTRAINT chk_ticket_full_name_length
    CHECK (char_length(full_name) BETWEEN 2 AND 100),

  CONSTRAINT chk_ticket_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),

  CONSTRAINT chk_ticket_email_length
    CHECK (char_length(email) <= 254),

  CONSTRAINT chk_ticket_message_length
    CHECK (char_length(message) BETWEEN 10 AND 5000)
);

-- ============================================================
-- INDEXES for query performance (admin dashboards, reporting)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_demo_bookings_created_at
  ON demo_bookings (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_demo_bookings_email
  ON demo_bookings (email);

CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at
  ON support_tickets (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_support_tickets_email
  ON support_tickets (email);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies cleanly before recreating
DROP POLICY IF EXISTS "Allow public insert on demo_bookings" ON demo_bookings;
DROP POLICY IF EXISTS "Block public read on demo_bookings" ON demo_bookings;
DROP POLICY IF EXISTS "Allow public insert on support_tickets" ON support_tickets;
DROP POLICY IF EXISTS "Block public read on support_tickets" ON support_tickets;

-- Public: INSERT only (lead capture via API routes)
CREATE POLICY "anon_insert_demo_bookings"
  ON demo_bookings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_insert_support_tickets"
  ON support_tickets FOR INSERT
  TO anon
  WITH CHECK (true);

-- Explicitly block all public SELECT (defence in depth)
CREATE POLICY "block_public_select_demo_bookings"
  ON demo_bookings FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "block_public_select_support_tickets"
  ON support_tickets FOR SELECT
  TO anon
  USING (false);

-- service_role bypasses RLS by default in Supabase (no extra policy needed)
-- Authenticated admin users can read via Supabase Dashboard with service_role key
