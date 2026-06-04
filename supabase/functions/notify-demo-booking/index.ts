// Supabase Edge Function — notify-demo-booking
// Triggered via Database Webhook when a row is inserted into demo_bookings
// Sends an instant email notification via Resend API

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") ?? ""; // Your email address

serve(async (req: Request) => {
  try {
    // Parse the Supabase Database Webhook payload
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record in payload" }), { status: 400 });
    }

    // Send email via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DocRack Leads <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `🎯 New Demo Booking — ${record.full_name} (${record.company_name})`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 6px;">
            <h2 style="font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">
              New Demo Booking
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr style="border-bottom: 1px solid #e5e5e5;">
                <td style="padding: 10px 0; color: #888; width: 140px;">Name</td>
                <td style="padding: 10px 0; font-weight: 700;">${record.full_name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e5e5;">
                <td style="padding: 10px 0; color: #888;">Email</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${record.email}" style="color: #000; font-weight: 700;">${record.email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e5e5;">
                <td style="padding: 10px 0; color: #888;">Organization</td>
                <td style="padding: 10px 0; font-weight: 700;">${record.company_name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e5e5;">
                <td style="padding: 10px 0; color: #888;">Annual Audits</td>
                <td style="padding: 10px 0; font-weight: 700;">${record.audit_count}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Submitted At</td>
                <td style="padding: 10px 0;">${new Date(record.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
              </tr>
            </table>

            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.08em;">
              DocRack Lead Notification System
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, resend: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-demo-booking error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
