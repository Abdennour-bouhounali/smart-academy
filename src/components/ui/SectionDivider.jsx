import React from 'react';

export default function SectionDivider({ label }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        margin: 'var(--space-16) 0 var(--space-12)',
        opacity: 0.5,
      }}
    >
      <div style={{ flex: 1, height: 1, backgroundColor: 'var(--color-gray-200)' }} />
      {label && (
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-gray-400)',
          fontFamily: 'var(--font-mono)',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 1, backgroundColor: 'var(--color-gray-200)' }} />
    </div>
  );
}
