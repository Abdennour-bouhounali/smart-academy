import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function InsightQuote({ insight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginBottom: 'var(--space-10)',
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-gray-50)',
        borderRadius: 'var(--radius-xl)',
        borderRight: '4px solid var(--color-accent)',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)' }}>
        <div style={{ color: 'var(--color-accent)' }}>
          <Lightbulb size={24} strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-gray-600)', letterSpacing: '0.05em' }}>درس من خبير</span>
      </div>
      
      <p style={{ 
        fontSize: '1.25rem', 
        lineHeight: 1.9, 
        color: 'var(--color-gray-700)', 
        fontStyle: 'italic', 
        fontWeight: 600, 
        margin: 0,
        position: 'relative',
        zIndex: 1
      }}>
        "{insight}"
      </p>

      {/* Decorative large quote mark */}
      <div style={{ 
        position: 'absolute', 
        top: 10, 
        left: 20, 
        fontSize: '6rem', 
        lineHeight: 1, 
        color: 'var(--color-gray-200)', 
        fontFamily: 'serif', 
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none'
      }}>
        "
      </div>
    </motion.div>
  );
}
