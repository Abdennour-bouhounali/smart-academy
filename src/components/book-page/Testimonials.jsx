import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { quote: "الكتاب غيّر نظرتي للرياضيات تماماً. لم أعد أخاف من التمارين الطويلة لأنني صرت أعرف كيف أفككها خطوة بخطوة.", author: "أحمد", role: "طالب بكالوريا" },
  { quote: "قاموس لغة الرياضيات في هذا الكتاب هو الكنز الحقيقي. أصبحت أفهم بالضبط ما يعنيه كل سؤال قبل أن أبدأ في الحل.", author: "سارة", role: "طالبة بكالوريا" },
  { quote: "منهجية SMART هي ما يحتاجه كل طالب اليوم. تبتعد عن التلقين السطحي وتؤسس لتفكير رياضي سليم ومستدام.", author: "أستاذ رياضيات", role: "خبرة 15 سنة" },
];

export default function Testimonials() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-gray-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>ماذا يقولون عن الكتاب؟</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: 'var(--space-10)', backgroundColor: 'var(--color-white)', borderRadius: '32px', border: '1px solid var(--color-gray-200)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ color: 'var(--color-accent-light)', fontSize: '5rem', fontFamily: 'serif', lineHeight: 0.5, marginBottom: 'var(--space-2)', marginTop: '20px' }}>"</div>
              <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-700)', lineHeight: 1.8, marginBottom: 'var(--space-10)', flex: 1, fontWeight: 500 }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--color-gray-500)' }}>
                  {t.author[0]}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-black)', marginBottom: '4px' }}>{t.author}</h4>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray-500)', fontWeight: 500 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
