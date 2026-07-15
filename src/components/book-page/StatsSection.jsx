import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import statsData from '../../data/statistics.json';

export default function StatsSection() {
  const { title, subtitle, timeline } = statsData.bookPage;

  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-white)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--color-black)', marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.25rem', color: 'var(--color-gray-600)', maxWidth: 600, marginInline: 'auto' }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div style={{ maxWidth: 800, marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {timeline.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{
                  backgroundColor: 'var(--color-gray-50)',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '24px',
                  padding: 'var(--space-8) var(--space-10)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 'var(--space-2)'
                }}
              >
                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-accent)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-600)', fontWeight: 600 }}>
                  {step.description}
                </p>
              </motion.div>
              
              {idx < timeline.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.1 }}
                  style={{ display: 'flex', justifyContent: 'center', color: 'var(--color-gray-400)' }}
                >
                  <ArrowDown size={32} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
