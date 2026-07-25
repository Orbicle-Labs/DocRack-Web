// One-time setup: names the "Demo Bookings" tab, adds the "Support Tickets" tab,
// and writes both header rows in the DocRack Leads spreadsheet.
//
// Prerequisites: the sheet is shared (Editor) with the service account, and
// GOOGLE_SHEET_ID + GOOGLE_APPLICATION_CREDENTIALS are set in .env.local.
//
// Run from the repo root:  node scripts/setup-sheet.mjs

import { readFileSync } from 'node:fs';
import { GoogleAuth } from 'google-auth-library';

for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const sheetId = process.env.GOOGLE_SHEET_ID;
if (!sheetId) throw new Error('GOOGLE_SHEET_ID is not set');

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
const client = await auth.getClient();
const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;

const { data: meta } = await client.request({ url: base });
const titles = meta.sheets.map((s) => s.properties.title);
const firstSheet = meta.sheets[0].properties;

const requests = [];
if (!titles.includes('Demo Bookings')) {
  requests.push({
    updateSheetProperties: {
      properties: { sheetId: firstSheet.sheetId, title: 'Demo Bookings' },
      fields: 'title',
    },
  });
}
if (!titles.includes('Support Tickets')) {
  requests.push({ addSheet: { properties: { title: 'Support Tickets' } } });
}
if (requests.length > 0) {
  await client.request({ url: `${base}:batchUpdate`, method: 'POST', data: { requests } });
}

await client.request({
  url: `${base}/values:batchUpdate`,
  method: 'POST',
  data: {
    valueInputOption: 'RAW',
    data: [
      {
        range: "'Demo Bookings'!A1:E1",
        values: [['Timestamp', 'Full Name', 'Email', 'Company', 'Annual Audits']],
      },
      {
        range: "'Support Tickets'!A1:D1",
        values: [['Timestamp', 'Full Name', 'Email', 'Message']],
      },
    ],
  },
});

console.log('Sheet is ready: tabs "Demo Bookings" and "Support Tickets" with header rows.');
