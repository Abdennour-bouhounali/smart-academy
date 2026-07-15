import React, { useState, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { smartSteps } from '../data/index.js';
import { illustrationSpecs } from '../data/illustrations.js';
import { ProtocolHero, StickyTimeline, StepChapter } from './protocol/index.js';

export default function Protocol() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const [progress, setProgress] = useState(0);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.max(0, Math.min(1, latest)));
  });

  return (
    <div id="protocol" style={{ position: 'relative', backgroundColor: 'var(--color-white)' }}>
      <ProtocolHero />
      
      <StickyTimeline 
        smartSteps={smartSteps} 
        activeIndex={activeIndex} 
        progress={progress} 
      />

      <div ref={containerRef}>
        {smartSteps.map((step, index) => (
          <StepChapter
            key={step.letter}
            step={step}
            index={index}
            onEnter={setActiveIndex}
            illustrationSpec={illustrationSpecs[index]}
          />
        ))}
      </div>
    </div>
  );
}
