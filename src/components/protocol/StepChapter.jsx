import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import GoldenRuleCard from './GoldenRuleCard.jsx';
import ProcedureTimeline from './ProcedureTimeline.jsx';
import InsightQuote from './InsightQuote.jsx';
import StepIllustration from '../ui/StepIllustration.jsx';

export default function StepChapter({ step, index, onEnter, illustrationSpec }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const letterY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const letterOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]);

  useEffect(() => { 
    if (inView) onEnter(index); 
  }, [inView, index, onEnter]);

  const bgColors = ['#FAFAFA', '#F8FAFC', '#FDF8F6', '#F8F9FA', '#F5F7F9'];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <section
      id={`chapter-${index}`}
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: 'clamp(60px, 15vw, 120px) 0',
        overflow: 'hidden',
        backgroundColor: bgColor,
        borderBottom: '1px solid var(--color-gray-100)'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(var(--color-black) 1px, transparent 1px)' }} />

      <motion.div
        style={{
          y: letterY,
          opacity: letterOpacity,
          position: 'absolute', top: '50%', left: '50%',
          x: '-50%',
          fontSize: 'min(70vw, 800px)', fontWeight: 900,
          fontFamily: 'var(--font-mono)', lineHeight: 1,
          color: 'var(--color-black)', pointerEvents: 'none',
          userSelect: 'none', zIndex: 0,
          WebkitTextStroke: '2px var(--color-black)',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {step.letter}
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-20)', alignItems: 'center', direction: 'rtl' }}>
        
        <div style={{ order: isEven ? 0 : 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: 'clamp(3.5rem, 12vw, 5rem)', color: 'var(--color-accent)', lineHeight: 1 }}>
              {step.letter}
            </span>
            <div style={{ width: 2, height: 'clamp(50px, 15vw, 80px)', backgroundColor: 'var(--color-gray-200)' }} />
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '8px' }}>
                {step.nameEN}
              </p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 6vw, 3.25rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: 'var(--color-black)' }}>
                {step.nameAR}
              </h2>
            </div>
          </motion.div>

          <GoldenRuleCard rule={step.rule} />
          <ProcedureTimeline procedure={step.procedure} />
          <InsightQuote insight={step.insight} />

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-10)' }}>
            {step.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4, backgroundColor: 'var(--color-accent)', color: 'white', borderColor: 'var(--color-accent)' }}
                className="tag"
                style={{ cursor: 'pointer', transition: 'all 0.2s ease', backgroundColor: 'white', fontSize: '0.9375rem', padding: '10px 20px', borderRadius: '99px', fontWeight: 600 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ order: isEven ? 1 : 0, display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          <StepIllustration spec={illustrationSpec} animate={inView} />
        </motion.div>
      </div>
    </section>
  );
}
