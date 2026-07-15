import React from 'react';
import { motion } from 'framer-motion';

export default function ContentCard({
  label,
  children,
  accent = false,
  borderLeft = false,
  delay = 0,
  style = {},
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', transition: { duration: 0.25 } }}
      style={{
        backgroundColor: accent ? 'var(--color-accent-light)' : 'var(--color-white)',
        border: `1px solid ${accent ? 'var(--color-accent)' : 'var(--color-gray-200)'}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-sm)',
        ...(borderLeft ? {
          borderRight: '4px solid var(--color-accent)',
          borderLeft: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          border: 'none',
          borderRight: '4px solid var(--color-accent)',
          backgroundColor: 'var(--color-gray-50)',
          padding: 'var(--space-6) var(--space-8)',
        } : {}),
        ...style,
      }}
    >
      {label && (
        <p style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: accent ? 'var(--color-accent)' : 'var(--color-gray-400)',
          marginBottom: 'var(--space-3)',
        }}>
          {label}
        </p>
      )}
      {children}
    </motion.div>
  );
}
