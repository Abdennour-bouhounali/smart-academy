import React from 'react';
import { motion } from 'framer-motion';
import { smartSteps } from '../../data/index.js';
import { Link } from 'react-router-dom';

export default function ProtocolPreview() {
  return (
    <section style={{ padding: 'var(--space-30) 0', position: 'relative', zIndex: 10 }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: 'var(--color-black)', color: 'white', borderRadius: '99px', fontWeight: 800, letterSpacing: '0.2em', marginBottom: 'var(--space-6)' }}>
            الحل
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--color-black)', marginBottom: 'var(--space-6)', letterSpacing: '-0.02em' }}
          >
            نقدم لك بروتوكول SMART
          </motion.h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', maxWidth: 700, marginInline: 'auto' }}>
            منهجية تفكير من 5 خطوات تقودك من قراءة التمرين إلى الحل بدقة وثقة تامة، دون أن تضيع في الحسابات العشوائية.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', direction: 'ltr', position: 'relative' }}>
          
          {smartSteps.map((step, i) => (
            <motion.div
              key={step.letter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              style={{
                backgroundColor: 'white', borderRadius: '24px', padding: 'var(--space-8) var(--space-6)',
                border: '1px solid var(--color-gray-200)', textAlign: 'center',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', cursor: 'default'
              }}
            >
              <div style={{ 
                fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', lineHeight: 1, 
                color: 'var(--color-black)', marginBottom: 'var(--space-4)',
                WebkitTextStroke: '2px var(--color-black)', WebkitTextFillColor: 'transparent' 
              }}>
                {step.letter}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-black)', marginBottom: '4px' }}>
                {step.nameEN}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-gray-500)', direction: 'rtl' }}>
                {step.nameAR}
              </div>
            </motion.div>
          ))}

        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
          <Link to="/protocol" className="btn btn--primary btn--large" style={{ padding: '20px 48px', fontSize: '1.125rem', borderRadius: '99px', fontWeight: 700 }}>
            تعرف على الخطوات بالتفصيل
          </Link>
        </div>

      </div>
    </section>
  );
}
