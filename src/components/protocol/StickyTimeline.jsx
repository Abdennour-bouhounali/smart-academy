import React from 'react';
import { motion } from 'framer-motion';

export default function StickyTimeline({ smartSteps, activeIndex, progress }) {
  // progress is 0 to 1 based on how far we scrolled through the chapters
  return (
    <nav
      className="timeline-nav"
      aria-label="SMART Protocol Progress"
      style={{
        position: 'fixed', top: '50%', left: 40,
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 50,
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        
        {/* Background track */}
        <div style={{ position: 'absolute', top: 18, bottom: 18, left: '50%', width: 2, transform: 'translateX(-50%)', backgroundColor: 'var(--color-gray-200)', zIndex: 0 }} />
        
        {/* Active fill track */}
        <motion.div 
          style={{ 
            position: 'absolute', top: 18, bottom: 18, left: '50%', width: 2, 
            transform: 'translateX(-50%)', backgroundColor: 'var(--color-accent)', 
            zIndex: 1, transformOrigin: 'top', scaleY: progress 
          }} 
        />
        
        {smartSteps.map((step, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          
          return (
            <div key={step.letter} style={{ position: 'relative' }}>
              <motion.a
                href={`#chapter-${i}`}
                aria-label={step.nameAR}
                animate={{
                  scale: isActive ? 1.25 : 1,
                  backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-white)',
                  borderColor: isActive || isPast ? 'var(--color-accent)' : 'var(--color-gray-300)',
                  color: isActive ? 'var(--color-white)' : isPast ? 'var(--color-accent)' : 'var(--color-gray-400)'
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative', zIndex: 2,
                  width: 36, height: 36, borderRadius: '50%',
                  border: '2px solid',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.875rem',
                  textDecoration: 'none', cursor: 'pointer',
                  boxShadow: isActive ? '0 8px 24px rgba(0,102,204,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
                }}
              >
                {step.letter}
              </motion.a>
              
              {/* Tooltip on hover */}
              <div className="timeline-tooltip" style={{
                position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)',
                marginLeft: '16px', padding: '6px 12px', backgroundColor: 'var(--color-black)',
                color: 'white', fontSize: '0.75rem', fontWeight: 600, borderRadius: '6px',
                whiteSpace: 'nowrap', opacity: 0, pointerEvents: 'none', transition: 'opacity 0.2s',
                direction: 'rtl'
              }}>
                {step.nameAR}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Percentage Completion */}
      <div style={{ marginTop: '32px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-accent)', backgroundColor: 'var(--color-white)', padding: '4px 12px', borderRadius: '12px', border: '1px solid var(--color-gray-200)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {Math.round(progress * 100)}%
      </div>

      <style>{`
        .timeline-tooltip::before {
          content: '';
          position: absolute;
          right: 100%; top: 50%; transform: translateY(-50%);
          border-width: 4px; border-style: solid; border-color: transparent var(--color-black) transparent transparent;
        }
        .timeline-nav a:hover + .timeline-tooltip {
          opacity: 1 !important;
        }
        @media (max-width: 1024px) {
          .timeline-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
