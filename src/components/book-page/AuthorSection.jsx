import React from 'react';
import { motion } from 'framer-motion';

export default function AuthorSection() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-16)', alignItems: 'center', maxWidth: 1100, marginInline: 'auto' }}>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}
          >
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-gray-100)', backgroundImage: 'url(/images/front-cover.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--space-6)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>عن المؤلف</h2>
            <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: 'var(--space-8)' }}>أ. عبد النور — مبتكر بروتوكول SMART</h3>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-600)', lineHeight: 1.9, marginBottom: 'var(--space-6)' }}>
              بعد سنوات من تدريس الرياضيات ومراقبة الأخطاء المتكررة للطلاب، أدركت أن المشكلة الحقيقية ليست في صعوبة الرياضيات أو تعقيدها، بل في طريقة التفكير ومقاربة المسائل.
            </p>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-600)', lineHeight: 1.9, marginBottom: 'var(--space-10)' }}>
              قمت بتطوير بروتوكول SMART كحل منهجي جذري، لينقل الطالب من حالة "حفظ خطوات الحل" المجهدة والمحدودة إلى "فهم حقيقي ومنطق قوي" يجعله قادراً على تفكيك أي تمرين، مهما كانت فكرته جديدة أو معقدة.
            </p>
            <div style={{ padding: 'var(--space-8)', backgroundColor: 'var(--color-gray-50)', borderRadius: '24px', borderRight: '4px solid var(--color-accent)' }}>
              <p style={{ fontSize: '1.375rem', fontWeight: 800, fontStyle: 'italic', color: 'var(--color-black)', lineHeight: 1.6, margin: 0 }}>
                "هدفي ليس أن أحل المسائل مكان التلميذ، بل أن أجعله قادراً ومستعداً لحلها بنفسه، في أي وقت وأي امتحان."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
