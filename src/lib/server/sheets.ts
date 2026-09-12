import 'server-only';

import { GoogleAuth } from 'google-auth-library';

// Auth is created lazily so builds don't require env vars or credentials.
// Credentials resolve via Application Default Credentials:
//   - Cloud Run: the service account attached to the service (keyless)
//   - Local dev: the JSON key file at GOOGLE_APPLICATION_CREDENTIALS
let auth: GoogleAuth | null = null;
function getAuth() {
  if (!auth) {
    auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  return auth;
}

/**
 * Appends one row to the given tab of the GOOGLE_SHEET_ID spreadsheet.
 * Throws on failure — callers should treat the sheet as the system of record.
 */
export async function appendRow(tab: string, values: string[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not set');
  }

  const client = await getAuth().getClient();
  // Tab names contain spaces, so the range must be single-quoted
  const range = encodeURIComponent(`'${tab}'!A1`);
  await client.request({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    method: 'POST',
    data: { values: [values] },
  });
}
