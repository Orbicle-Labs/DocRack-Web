import { ImageResponse } from 'next/og';

export const alt = 'DocRack — Audit fieldwork execution for internal audit';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generated at build time. Replaces the static /og-image.png that metadata
 * referenced but which never existed in public/ — every share rendered a
 * broken image.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '7px',
            backgroundColor: '#2855d9',
          }}
        />
        <div style={{ fontSize: '30px', fontWeight: 600, color: '#10141c' }}>DocRack</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '66px',
            fontWeight: 600,
            color: '#10141c',
            letterSpacing: '-0.028em',
            lineHeight: 1.08,
          }}
        >
          Run audit fieldwork faster.
        </div>
        <div
          style={{
            fontSize: '66px',
            fontWeight: 600,
            color: '#2855d9',
            letterSpacing: '-0.028em',
            lineHeight: 1.08,
          }}
        >
          Defend every conclusion.
        </div>
      </div>

      <div style={{ display: 'flex', fontSize: '27px', color: '#5b6577', lineHeight: 1.4 }}>
        Documents, Excel and policies into repeatable audit tests, source-linked exceptions and
        review-ready working papers.
      </div>
    </div>,
    size
  );
}
