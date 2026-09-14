import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'DocRack — From audit evidence to answers you can review.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Editorial category and procedure, not a product capture or performance claim. C01/C03/C18. */
export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), 'public/favicon-192x192.png'));
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f5f2eb',
        padding: '58px 68px',
        color: '#182823',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* Existing identity, preserved while traced vector candidates are reviewed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${mark.toString('base64')}`}
          width={54}
          height={54}
          alt=""
        />
        <span style={{ fontSize: 34, fontWeight: 700 }}>DocRack</span>
        <span style={{ marginLeft: 'auto', fontSize: 19 }}>
          AI-assisted internal-audit fieldwork
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-3px',
          lineHeight: 1.08,
        }}
      >
        <span>From audit evidence</span>
        <span>to answers you can review.</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '26px 30px',
          background: '#153c31',
          color: '#fff',
          fontSize: 24,
        }}
      >
        <span>Evidence → Audit Test Recipe → Human review</span>
        <span style={{ color: '#d9ed91', fontSize: 20 }}>docrack.ai</span>
      </div>
    </div>,
    size
  );
}
