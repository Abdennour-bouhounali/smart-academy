import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const comparisons = [
  { trad: 'حفظ القوانين دون فهم عميق', smart: 'فهم العلاقات وبناء القوانين منطقياً' },
  { trad: 'حل التمارين بالتكرار والتعود', smart: 'حل التمارين بالاستنتاج والتفكير' },
  { trad: 'الخوف من الأفكار غير المألوفة', smart: 'اكتساب منهجية ثابتة لتفكيك أي تمرين' },
  { trad: 'تضييع الوقت في البحث عن البداية', smart: 'خريطة ذهنية واضحة من أول دقيقة' },
];

export default function ComparisonSection() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>لماذا هذا الكتاب مختلف؟</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)', maxWidth: 1000, marginInline: 'auto' }}>
          
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: 'var(--color-gray-50)', padding: 'var(--space-10) var(--space-8)', borderRadius: '32px', border: '1px solid var(--color-gray-200)' }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-gray-500)', marginBottom: 'var(--space-10)', textAlign: 'center' }}>التحضير التقليدي</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {comparisons.map((c, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-gray-600)' }}>
                  <XCircle size={24} strokeWidth={1.5} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.5 }}>{c.trad}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SMART */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: 'var(--color-black)', padding: 'var(--space-10) var(--space-8)', borderRadius: '32px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, transparent 100%)', pointerEvents: 'none' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: 'var(--space-10)', textAlign: 'center', position: 'relative', zIndex: 1 }}>بروتوكول SMART</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', position: 'relative', zIndex: 1 }}>
              {comparisons.map((c, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <CheckCircle2 size={24} strokeWidth={1.5} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.5 }}>{c.smart}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
