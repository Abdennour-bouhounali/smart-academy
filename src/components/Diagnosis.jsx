import React from 'react';
import { motion } from 'framer-motion';
import { features } from '../data/index.js';

const icons = ['01', '02', '03', '04'];

export default function Diagnosis() {
  return (
    <section id="diagnosis" style={{ backgroundColor: 'var(--color-gray-50)', position: 'relative', overflow: 'hidden' }}>
      {/* Math decoration */}
      <svg aria-hidden="true" style={{ position: 'absolute', bottom: -30, left: -30, opacity: 0.025, pointerEvents: 'none' }}
        width="250" height="250" viewBox="0 0 250 250" fill="none">
        <circle cx="125" cy="125" r="100" stroke="black" strokeWidth="1" strokeDasharray="4 4"/>
        <line x1="25" y1="125" x2="225" y2="125" stroke="black" strokeWidth="1"/>
        <line x1="125" y1="25" x2="125" y2="225" stroke="black" strokeWidth="1"/>
      </svg>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <p className="section-label">التشخيص</p>
          <h2 className="section-title" style={{ letterSpacing: '-0.025em' }}>لماذا يتوقف الطلاب رغم أنهم يعرفون الدرس؟</h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
              whileHover={{ y: -5, boxShadow: '0 12px 36px rgba(0,0,0,0.09)', transition: { duration: 0.25 } }}
              style={{
                padding: 'var(--space-8)',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-accent-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-5)',
                fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.8rem',
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 'var(--space-3)', letterSpacing: '-0.01em' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--color-gray-500)', lineHeight: 1.85, fontSize: '0.9375rem', margin: 0 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
