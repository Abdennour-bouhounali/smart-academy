import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundLayer() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute', inset: '-50%',
          backgroundImage: 'radial-gradient(var(--color-gray-400) 1px, transparent 1px), linear-gradient(to right, var(--color-gray-200) 1px, transparent 1px), linear-gradient(to bottom, var(--color-gray-200) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 120px 120px, 120px 120px',
          opacity: 0.04,
          y: yBg,
          rotate: rotateBg,
        }}
      />
      {/* Soft ambient lights */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)', opacity: 0.05, filter: 'blur(80px)' }} 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: '20%', left: '5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', opacity: 0.04, filter: 'blur(100px)' }} 
      />
    </div>
  );
}
