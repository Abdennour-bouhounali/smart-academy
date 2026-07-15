import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import BookStatistics from './ui/BookStatistics.jsx';
import statsData from '../data/statistics.json';

export default function BookShowcase() {
  return (
    <section id="book" style={{ backgroundColor: 'var(--color-gray-50)', position: 'relative', overflow: 'hidden' }}>
      {/* Math decoration */}
      <svg aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '2%', opacity: 0.03, pointerEvents: 'none' }}
        width="200" height="200" viewBox="0 0 200 200" fill="none">
        {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*40} x2="200" y2={i*40} stroke="black" strokeWidth="1"/>)}
        {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={i*40} y1="0" x2={i*40} y2="200" stroke="black" strokeWidth="1"/>)}
      </svg>

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-16)',
          alignItems: 'center',
          direction: 'rtl',
        }}>
          {/* Book mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              whileHover={{ rotateY: -8, rotateX: 4, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              style={{ perspective: 1000 }}
            >
              <img
                src="/images/book-3d.webp"
                alt="كتاب بروتوكول SMART"
                style={{
                  width: '100%',
                  maxWidth: 280,
                  height: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(12px 12px 24px rgba(0,0,0,0.15))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p className="section-label">الكتاب</p>
            <h2 className="section-title" style={{ marginBottom: 'var(--space-8)', letterSpacing: '-0.025em' }}>
              دليلك المنهجي الشامل
            </h2>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 'var(--space-6)', color: 'var(--color-black)' }}>
              {statsData.showcase.title}
            </h3>
            
            <div style={{ marginBottom: 'var(--space-10)' }}>
              <BookStatistics stats={statsData.showcase.stats} columns="repeat(1, 1fr)" theme="light" />
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                fontSize: '1.125rem', lineHeight: 1.85, color: 'var(--color-gray-700)',
                paddingRight: 'var(--space-6)', borderRight: '4px solid var(--color-accent)',
                marginBottom: 'var(--space-10)', fontStyle: 'italic',
              }}
            >
              "هذا الكتاب هو رفيقك في هذه الرحلة. ليس فقط لتنال العلامة الكاملة في البكالوريا، بل لتكتسب عقلية تحليلية ومنهجية تفكير ستنير دربك في كل محطات حياتك القادمة."
            </motion.blockquote>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link to="/book" className="btn btn--primary btn--large">
                احصل على الكتاب الآن
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
