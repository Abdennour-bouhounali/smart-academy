import React from 'react';
import { motion } from 'framer-motion';

export default function ProcedureTimeline({ procedure }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ 
        marginBottom: 'var(--space-10)', 
        position: 'relative', 
        paddingRight: 'var(--space-8)', 
      }}
    >
      {/* Timeline visual line */}
      <div style={{ position: 'absolute', top: 8, bottom: -16, right: 0, width: 2, backgroundColor: 'var(--color-gray-200)' }} />
      
      {/* Top dot */}
      <div style={{ position: 'absolute', top: 6, right: -4, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-gray-400)', border: '2px solid var(--color-white)' }} />
      
      {/* Bottom dot */}
      <div style={{ position: 'absolute', bottom: -16, right: -4, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-gray-300)', border: '2px solid var(--color-white)' }} />

      <p style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--color-gray-500)', marginBottom: 'var(--space-4)' }}>
        الإجراء العملي
      </p>
      <p style={{ fontSize: '1.125rem', lineHeight: 1.9, color: 'var(--color-gray-800)', margin: 0, fontWeight: 500 }}>
        {procedure}
      </p>
    </motion.div>
  );
}
