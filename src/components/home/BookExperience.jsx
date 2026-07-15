import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BookExperience() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-black)', color: 'white', position: 'relative', zIndex: 10, overflow: 'hidden' }}>

      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at center, var(--color-accent) 0%, transparent 60%)', filter: 'blur(100px)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-20)', alignItems: 'center' }}>

          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--color-accent)', marginBottom: 'var(--space-4)' }}>
              THE MANUAL
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 'var(--space-6)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              المنهجية الكاملة بين يديك
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--color-gray-400)', lineHeight: 1.6, marginBottom: 'var(--space-10)' }}>
              تعلم كيف تحلل أي مسألة، وتترجم المعطيات، وتبني خطة الحل خطوة بخطوة. الكتاب ليس مجموعة تمارين، بل هو تدريب عملي على التفكير الذكي.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: 'var(--space-4)' }}>
              <Link
                to="/purchase"
                className="btn btn--primary btn--large"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '20px 40px', fontSize: '1.125rem', borderRadius: '99px',
                  fontWeight: 700, backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-black)', boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
                  border: 'none', transition: 'all 0.3s ease'
                }}
              >
                احصل على نسختك الآن
                <ArrowLeft size={20} />
              </Link>
              <Link
                to="/book"
                className="btn btn--large"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '20px 40px', fontSize: '1.125rem', borderRadius: '99px',
                  fontWeight: 700, backgroundColor: 'rgba(255,255,255,0.05)', color: 'white',
                  border: '2px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                تصفح محتويات الكتاب
                <ArrowLeft size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
              <div style={{ position: 'absolute', inset: -20, background: 'var(--color-accent)', filter: 'blur(60px)', opacity: 0.15, borderRadius: '50%' }} />
              <img
                src="/images/book-3d.webp"
                alt="الكتاب التفاعلي"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))', transform: 'rotate(-5deg) scale(1.05)' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback mockup if image is missing */}
              <div style={{ display: 'none', width: '100%', aspectRatio: '0.7', backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid #334155', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '1.5rem', fontWeight: 800, transform: 'rotate(-5deg)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                SMART Book
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
