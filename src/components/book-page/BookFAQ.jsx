import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "لمن موجه هذا الكتاب؟", a: "الكتاب موجه بالأساس لطلاب البكالوريا الشعب العلمية والرياضية، وأيضاً لكل طالب يرغب في تطوير طريقة تفكيره في الرياضيات والابتعاد عن الحفظ الآلي الذي يؤدي إلى النسيان." },
  { q: "هل يحتوي الكتاب على تمارين محلولة؟", a: "نعم، يحتوي الكتاب على تمارين منتقاة بعناية، محلولة بالتفصيل ومصحوبة بشرح تطبيقي لمنهجية التفكير في كل خطوة باستخدام بروتوكول SMART المتكامل." },
  { q: "هل يمكن للطالب الضعيف في الرياضيات الاستفادة منه؟", a: "بالتأكيد! الكتاب مصمم ليبدأ معك من الصفر (تعلم ترجمة المعطيات البسيطة) وصولاً إلى التمارين المعقدة. المنهجية مصممة لتسهيل الرياضيات وتبسيطها للجميع بلا استثناء." },
  { q: "كيف أحصل على النسخة المطبوعة؟", a: "يمكنك طلب النسخة المطبوعة عبر الضغط على زر 'اطلب نسختك' وملء الاستمارة البسيطة، وسيتم التواصل معك مباشرة لتأكيد الطلب وتحديد تفاصيل الشحن." },
];

export default function BookFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: 850 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>الأسئلة الشائعة</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{ border: '1px solid var(--color-gray-200)', borderRadius: '24px', overflow: 'hidden', backgroundColor: openIdx === idx ? 'var(--color-gray-50)' : 'var(--color-white)', transition: 'all 0.3s' }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-8)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', transition: 'background-color 0.2s' }}
              >
                <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-black)' }}>{faq.q}</span>
                <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <ChevronDown size={24} style={{ color: openIdx === idx ? 'var(--color-accent)' : 'var(--color-gray-400)' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 var(--space-8) var(--space-8)', fontSize: '1.125rem', color: 'var(--color-gray-600)', lineHeight: 1.8 }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
