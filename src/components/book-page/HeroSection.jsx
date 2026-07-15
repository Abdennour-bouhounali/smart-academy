import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Award, ShoppingCart, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', paddingTop: '160px', paddingBottom: 'var(--space-30)', backgroundColor: 'var(--color-white)', overflow: 'hidden' }}>
      
      <style>
        {`
          .book-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-12);
            align-items: center;
          }
          @media (min-width: 992px) {
            .book-hero-grid {
              /* In RTL, the first column is the right side. Book (1.2fr), Text (1fr) */
              grid-template-columns: 1.2fr 1fr;
              gap: var(--space-20);
            }
          }
        `}
      </style>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="book-hero-grid">

          {/* RIGHT SIDE (First in DOM): Large Book Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <motion.img
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              src="/images/book-3d.webp"
              alt="كتاب SMART المنهجي"
              style={{
                width: '100%',
                maxWidth: 700,
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 50px 80px rgba(0,0,0,0.25))',
                transform: 'scale(1.05)'
              }}
            />
          </motion.div>

          {/* LEFT SIDE (Second in DOM): Marketing Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 500 }}
          >
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }} 
              style={{ display: 'inline-block', marginBottom: 'var(--space-6)', padding: '8px 16px', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 700 }}
            >
              الكتاب المنهجي الأول
            </motion.div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 'var(--space-6)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>
              أول كتاب يعلمك منهجية <span style={{ color: 'var(--color-accent)' }}>التفكير</span> قبل الحل.
            </h1>

            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--color-gray-500)', marginBottom: 'var(--space-10)' }}>
              دليل عملي لا يحتوي على حشو أو تمارين مكررة، بل يركز فقط على بناء المنهجية التي تمكنك من حل أي تمرين بكالوريا بثقة.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-12)' }}>
              <Link to="/purchase" className="btn btn--primary btn--large" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '18px 36px', fontSize: '1.125rem', borderRadius: '14px', fontWeight: 700, boxShadow: '0 10px 25px -5px rgba(0,102,204,0.3)' }}>
                احصل على نسختك
                <ArrowRight size={20} />
              </Link>
              
              <Link to="/demo" className="btn btn--secondary btn--large" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '18px 36px', fontSize: '1.125rem', borderRadius: '14px', fontWeight: 700, backgroundColor: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                تجربة المنهجية
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '0.95rem', fontWeight: 500, marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="#10b981" />
                الدفع عند الاستلام
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Target size={22} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-gray-600)' }}>خطوات تطبيقية</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={22} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-gray-600)' }}>لطلاب البكالوريا</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
