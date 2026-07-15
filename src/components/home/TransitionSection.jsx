import React from 'react';
import { motion } from 'framer-motion';

export default function TransitionSection() {
  return (
    <section style={{ padding: 'var(--space-30) 0', position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--color-gray-400)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}
        >
          ربما المشكلة ليست في قدراتك.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--color-black)', lineHeight: 1.4 }}
        >
          ربما لم يعلمك أحد <span style={{ color: 'var(--color-accent)' }}>كيف تفكر</span> منهجياً.
        </motion.p>
      </div>
    </section>
  );
}
