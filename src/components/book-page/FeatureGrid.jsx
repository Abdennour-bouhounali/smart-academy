import React from 'react';
import { motion } from 'framer-motion';
import { Book, BrainCircuit, Languages, FileCheck, Target, Clock } from 'lucide-react';

const features = [
  { icon: <Book size={28} strokeWidth={1.5}/>, title: 'منهجية متكاملة', desc: 'شرح مفصل لكل مرحلة من مراحل التفكير الرياضي لتأسيس قاعدة صلبة.' },
  { icon: <BrainCircuit size={28} strokeWidth={1.5}/>, title: 'التفكير قبل الحل', desc: 'تدريب العقل على التحليل والاستنتاج قبل كتابة أي سطر على الورقة.' },
  { icon: <Languages size={28} strokeWidth={1.5}/>, title: 'قاموس لغة الرياضيات', desc: 'يحتوي على عشرات التحويلات اللفظية إلى عبارات رياضية دقيقة.' },
  { icon: <FileCheck size={28} strokeWidth={1.5}/>, title: 'تمارين محلولة بالتفصيل', desc: 'تطبيق عملي خطوة بخطوة للمنهجية على أمثلة نموذجية شاملة.' },
  { icon: <Target size={28} strokeWidth={1.5}/>, title: 'موجه لطلاب البكالوريا', desc: 'يتماشى تماماً مع طبيعة وأهداف أسئلة البكالوريا العلمية والرياضية.' },
  { icon: <Clock size={28} strokeWidth={1.5}/>, title: 'استراتيجيات الامتحان', desc: 'تقنيات ذهنية لإدارة الوقت وتجنب التوتر أثناء الامتحانات المصيرية.' },
];

export default function FeatureGrid() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-gray-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>مميزات الكتاب</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: '20px', padding: 'var(--space-8)', backgroundColor: 'var(--color-white)', borderRadius: '24px', border: '1px solid var(--color-gray-200)', transition: 'all 0.3s ease' }}
              whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.05)', borderColor: 'var(--color-gray-300)' }}
            >
              <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: '16px', backgroundColor: 'var(--color-gray-50)', color: 'var(--color-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-gray-100)' }}>
                {f.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px', color: 'var(--color-black)' }}>{f.title}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--color-gray-600)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
