import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function GoldenRuleCard({ rule }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'linear-gradient(135deg, #FFFAF0 0%, #FFF4D9 100%)',
        border: '1px solid #FDE08B',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        marginBottom: 'var(--space-10)',
        boxShadow: '0 20px 40px rgba(217, 163, 0, 0.08), inset 0 2px 0 rgba(255,255,255,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1, color: '#B7791F' }}>
        <Award size={120} />
      </div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FFD54F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B7791F', boxShadow: '0 4px 12px rgba(217, 163, 0, 0.2)' }}>
            <Award size={16} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B7791F' }}>القاعدة الذهبية</span>
        </div>
        <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#744210', lineHeight: 1.8, margin: 0 }}>
          {rule}
        </p>
      </div>
    </motion.div>
  );
}
