import 'server-only';

// Email notifications for form submissions, sent via the Resend REST API.
// Email is best-effort: callers must catch — a failed notification must never
// fail the request (the Google Sheet row is the system of record).

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatIst(date: Date): string {
  return `${date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;
}

export async function sendEmail({
  from,
  subject,
  html,
}: {
  from: string;
  subject: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!apiKey || !notifyEmail) {
    console.warn('[notify] RESEND_API_KEY or NOTIFY_EMAIL not set — skipping email notification');
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      // Until docrack.ai is verified at Resend, the resend.dev sender only
      // delivers to the Resend account's own email address
      from: process.env.EMAIL_FROM ?? from,
      to: [notifyEmail],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
}

export function demoBookingEmailHtml({
  fullName,
  email,
  companyName,
  auditCount,
  submittedAt,
}: {
  fullName: string;
  email: string;
  companyName: string;
  auditCount: string;
  submittedAt: Date;
}): string {
  return `
    <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 6px;">
      <h2 style="font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">
        New Demo Booking
      </h2>

      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e5e5e5;">
          <td style="padding: 10px 0; color: #888; width: 140px;">Name</td>
          <td style="padding: 10px 0; font-weight: 700;">${escapeHtml(fullName)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e5e5;">
          <td style="padding: 10px 0; color: #888;">Email</td>
          <td style="padding: 10px 0;">
            <a href="mailto:${escapeHtml(email)}" style="color: #000; font-weight: 700;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e5e5;">
          <td style="padding: 10px 0; color: #888;">Organization</td>
          <td style="padding: 10px 0; font-weight: 700;">${escapeHtml(companyName)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e5e5;">
          <td style="padding: 10px 0; color: #888;">Annual Audits</td>
          <td style="padding: 10px 0; font-weight: 700;">${escapeHtml(auditCount)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888;">Submitted At</td>
          <td style="padding: 10px 0;">${formatIst(submittedAt)}</td>
        </tr>
      </table>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.08em;">
        DocRack Lead Notification System
      </div>
    </div>
  `;
}

export function supportTicketEmailHtml({
  fullName,
  email,
  message,
  submittedAt,
}: {
  fullName: string;
  email: string;
  message: string;
  submittedAt: Date;
}): string {
  return `
    <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 6px;">
      <h2 style="font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">
        New Support Message
      </h2>

      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e5e5e5;">
          <td style="padding: 10px 0; color: #888; width: 140px;">Name</td>
          <td style="padding: 10px 0; font-weight: 700;">${escapeHtml(fullName)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e5e5;">
          <td style="padding: 10px 0; color: #888;">Email</td>
          <td style="padding: 10px 0;">
            <a href="mailto:${escapeHtml(email)}" style="color: #000; font-weight: 700;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; vertical-align: top;">Message</td>
          <td style="padding: 10px 0; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br/>')}</td>
        </tr>
      </table>

      <div style="margin-top: 28px; padding: 16px; background: #f0f0f0; border-radius: 4px; font-size: 12px; color: #555;">
        <strong>Submitted:</strong> ${formatIst(submittedAt)}
      </div>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.08em;">
        DocRack Support Notification System
      </div>
    </div>
  `;
}
