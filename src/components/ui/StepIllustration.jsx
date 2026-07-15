import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * StepIllustration
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders a single SMART-step illustration from /src/assets/illustrations/.
 *
 * REPLACING AN ILLUSTRATION
 *   Drop the new image file into /src/assets/illustrations/ using the same
 *   filename that was declared in /src/data/illustrations.js.
 *   No code changes are required anywhere else.
 *
 * Props
 *   spec     — one entry from illustrationSpecs (letter, file, alt, brief)
 *   animate  — whether the floating animation is active (boolean)
 */
export default function StepIllustration({ spec, animate = true }) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animate && !prefersReduced;

  // The images are stored in the public/images/steps/ folder.
  const src = `/images/steps/${spec.file}`;

  return (
    <div
      role="img"
      aria-label={spec.alt}
      style={{
        width: '100%',
        maxWidth: 550,
        aspectRatio: '4 / 3.4',
        position: 'relative',
      }}
    >
      <motion.div
        animate={shouldAnimate ? { y: [0, -14, 0] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%' }}
      >
        <img
          src={src}
          alt={spec.alt}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
            borderRadius: 'var(--radius-lg)',
          }}
        />
      </motion.div>
    </div>
  );
}
