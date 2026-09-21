import 'server-only';
import { GoogleAuth } from 'google-auth-library';
import { deadline, ServiceFailure } from './deadline';

let auth: GoogleAuth | undefined;
export async function appendRow(tab: string, values: string[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId || !/^[\w-]+$/.test(sheetId)) throw new ServiceFailure('configuration');
  auth ??= new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  await deadline(8000, async (signal) => {
    const client = await auth!.getClient();
    signal.throwIfAborted();
    const headers = await client.getRequestHeaders();
    signal.throwIfAborted();
    headers.set('Content-Type', 'application/json');
    const range = encodeURIComponent(`'${tab}'!A1`);
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ values: [values] }),
        signal,
        redirect: 'error',
      }
    );
    await response.body?.cancel();
    if (!response.ok) throw new ServiceFailure('provider', response.status);
  });
}
