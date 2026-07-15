import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STEPS = ['S', 'M', 'A', 'R', 'T'];

export default function PageHero({
  letter,
  nameEN,
  nameAR,
  description,
  illustration: Illustration,
  accentColor = 'var(--color-accent)',
}) {
  const prefersReduced = useReducedMotion();
  const stepIndex = STEPS.indexOf(letter);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
  });

  return (
    <header
      style={{
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: 'var(--space-24)',
        backgroundColor: '#FAFBFC',
        borderBottom: '1px solid var(--color-gray-200)',
        overflow: 'hidden',
      }}
    >
      {/* Giant background letter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04, transition: { duration: 1.2 } }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-2%',
          transform: 'translateY(-50%)',
          fontSize: 'min(55vw, 480px)',
          fontWeight: 900,
          fontFamily: 'var(--font-mono)',
          lineHeight: 1,
          color: accentColor,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {letter}
      </motion.div>

      {/* Subtle math grid decoration */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, opacity: 0.025,
          pointerEvents: 'none', zIndex: 0,
        }}
        width="400" height="200" viewBox="0 0 400 200" fill="none"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200"
            stroke="var(--color-black)" strokeWidth="1" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40}
            stroke="var(--color-black)" strokeWidth="1" />
        ))}
      </svg>

      <div
        className="container"
        style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-16)',
          alignItems: 'center',
          direction: 'rtl',
        }}
      >
        {/* Text side */}
        <div>
          {/* Progress indicator */}
          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {STEPS.map((s, i) => (
                <Link
                  key={s}
                  to={`/protocol`}
                  style={{
                    width: 28, height: 28,
                    borderRadius: '50%',
                    border: `2px solid ${i === stepIndex ? accentColor : 'var(--color-gray-200)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.7rem',
                    color: i === stepIndex ? accentColor : i < stepIndex ? 'var(--color-accent)' : 'var(--color-gray-400)',
                    backgroundColor: i < stepIndex ? 'var(--color-accent-light)' : 'white',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                >
                  {s}
                </Link>
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', fontWeight: 600 }}>
              {stepIndex + 1} / {STEPS.length}
            </span>
          </motion.div>

          {/* Label + Title */}
          <motion.p {...fadeUp(0.08)} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accentColor, marginBottom: 'var(--space-3)' }}>
            {nameEN}
          </motion.p>
          <motion.h1 {...fadeUp(0.14)} style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 'var(--space-6)', letterSpacing: '-0.025em' }}>
            {nameAR}
          </motion.h1>
          <motion.p {...fadeUp(0.2)} style={{ fontSize: '1.125rem', lineHeight: 1.85, color: 'var(--color-gray-500)', maxWidth: 440 }}>
            {description}
          </motion.p>
        </div>

        {/* Illustration side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 } }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <motion.div
            animate={prefersReduced ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '100%', maxWidth: 380, aspectRatio: '1 / 0.85' }}
          >
            {Illustration && <Illustration />}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
