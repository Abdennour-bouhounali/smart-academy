import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Link2, Zap, RotateCcw } from 'lucide-react';

const phases = [
  { icon: <Search size={28}/>, name: 'Scan', title: 'افهم المسألة', desc: 'قراءة ذكية لاكتشاف المعطيات المخفية وتحليل السؤال.' },
  { icon: <PenTool size={28}/>, name: 'Map', title: 'ترجم اللغة', desc: 'تحويل العبارات اللفظية إلى صيغ رياضية دقيقة.' },
  { icon: <Link2 size={28}/>, name: 'Relate', title: 'اربط الأفكار', desc: 'بناء جسر منطقي بين المعطيات والمطلوب.' },
  { icon: <Zap size={28}/>, name: 'Act', title: 'نفذ الحل', desc: 'كتابة الإجابة بخطوات متسلسلة وسرعة.' },
  { icon: <RotateCcw size={28}/>, name: 'Test', title: 'تحقق وتأكد', desc: 'مراجعة منطقية للنتيجة النهائية لضمان صحتها.' }
];

export default function BookJourney() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-gray-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>رحلتك داخل الكتاب</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', maxWidth: 700, marginInline: 'auto', lineHeight: 1.6 }}>
            لا تقرأ الكتاب كقصة، بل عشه كرحلة منهجية. هكذا ستتعلم بروتوكول SMART خطوة بخطوة.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-8)' }}>
          {phases.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, borderColor: 'var(--color-accent)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-10) var(--space-6)',
                borderRadius: '24px',
                border: '1px solid var(--color-gray-200)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle phase number in background */}
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: '8rem', fontWeight: 900, color: 'var(--color-gray-50)', lineHeight: 1, pointerEvents: 'none', zIndex: 0 }}>
                {idx + 1}
              </div>

              <div style={{ position: 'relative', zIndex: 1, width: 72, height: 72, borderRadius: '20px', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                {phase.icon}
              </div>
              <p style={{ position: 'relative', zIndex: 1, fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-gray-400)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>
                Step {idx + 1} - {phase.name}
              </p>
              <h3 style={{ position: 'relative', zIndex: 1, fontSize: '1.375rem', fontWeight: 800, marginBottom: 'var(--space-4)', color: 'var(--color-black)' }}>{phase.title}</h3>
              <p style={{ position: 'relative', zIndex: 1, fontSize: '1rem', color: 'var(--color-gray-600)', lineHeight: 1.6 }}>{phase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
