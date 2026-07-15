import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StoryHero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 300]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
      <motion.div 
        style={{ y: yParallax, opacity: opacityFade, textAlign: 'center', padding: '0 var(--space-6)', maxWidth: 1000 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.1, color: 'var(--color-black)', letterSpacing: '-0.03em', marginBottom: 'var(--space-8)' }}>
            الرياضيات ليست صعبة...<br />
            <span style={{ color: 'var(--color-gray-400)' }}>لكن طريقة تعلمها قد تكون كذلك.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(1.125rem, 4vw, 1.75rem)', color: 'var(--color-gray-600)', lineHeight: 1.6, maxWidth: 700, marginInline: 'auto' }}
        >
          مشكلتك الأكبر ليست في الحفظ أو الذكاء. مشكلتك هي غياب <strong style={{ color: 'var(--color-accent)' }}>منهجية تفكير</strong> واضحة للتعامل مع التمارين.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: '16px' }}>اكتشف السبب</span>
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 2, height: 60, background: 'linear-gradient(to bottom, var(--color-black), transparent)' }} 
        />
      </motion.div>
    </section>
  );
}
