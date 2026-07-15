import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProtocolHero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-black)', color: 'white' }}>
      
      {/* Subtle cinematic gradient background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at center, var(--color-accent) 0%, transparent 70%)', zIndex: 0 }} />
      
      <motion.div style={{ y: yParallax, opacity: opacityFade, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 var(--space-6)' }} className="container">
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--color-accent)', marginBottom: 'var(--space-8)' }}
        >
          SMART PROTOCOL
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 'var(--space-10)', letterSpacing: '-0.02em' }}
        >
          خمس مراحل...<br />
          <span style={{ color: 'var(--color-gray-400)' }}>طريقة واحدة للتفكير.</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--color-gray-400)', maxWidth: 650, marginInline: 'auto', lineHeight: 1.8 }}
        >
          رحلة متدرجة تنقلك من القراءة العشوائية للتمرين إلى التمكن الكامل من التفكيك والحل، وبناء أساس متين من الثقة قبل الامتحان.
        </motion.p>
        
      </motion.div>

      {/* Animated progress indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gray-500)', letterSpacing: '0.1em', marginBottom: '16px' }}>ابدأ الرحلة</div>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 2, height: 80, background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} 
        />
      </motion.div>

    </section>
  );
}
