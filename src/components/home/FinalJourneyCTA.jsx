import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FinalJourneyCTA() {
  return (
    <section style={{ padding: '160px 0', backgroundColor: 'var(--color-black)', color: 'white', position: 'relative', zIndex: 10, textAlign: 'center', overflow: 'hidden' }}>
      
      {/* Immersive cinematic background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(circle at center, var(--color-accent) 0%, transparent 60%)', filter: 'blur(60px)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-gray-400)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}
        >
          اليوم قد ترى الرياضيات معقدة...
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.2 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: 'white', lineHeight: 1.3, marginBottom: 'var(--space-12)' }}
        >
          لكن بعد أشهر، قد تصبح طريقة تفكيرك <span style={{ color: 'var(--color-accent)' }}>مختلفة تماماً.</span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.4 }}
          style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/protocol" className="btn btn--primary btn--large" style={{ padding: '20px 48px', fontSize: '1.125rem', borderRadius: '99px', fontWeight: 700 }}>
            اكتشف طريقة التفكير
          </Link>
          <Link to="/book" className="btn btn--large" style={{ padding: '20px 48px', fontSize: '1.125rem', borderRadius: '99px', fontWeight: 700, backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
            تصفح الكتاب
          </Link>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, delay: 0.8 }}
          style={{ marginTop: 'var(--space-12)', fontSize: '0.875rem', color: 'var(--color-gray-500)' }}
        >
          طريقة التفكير التي ستتعلمها هنا... سترافقك بعد البكالوريا أيضاً.
        </motion.p>
      </div>
    </section>
  );
}
