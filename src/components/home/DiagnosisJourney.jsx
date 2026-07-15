import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, BookOpen, Compass } from 'lucide-react';

const problems = [
  {
    icon: BookOpen,
    situation: "أحفظ كل القوانين وأفهم الدرس جيداً...",
    result: "لكني لا أعرف من أين أبدأ عندما أواجه تمريناً جديداً.",
    color: '#3B82F6'
  },
  {
    icon: Compass,
    situation: "أقوم بحل عشرات التمارين للتدريب...",
    result: "لكن في الامتحان تبدو لي الأسئلة مختلفة تماماً وكأني لم أدرسها.",
    color: '#F59E0B'
  },
  {
    icon: AlertCircle,
    situation: "أبدأ بحل السؤال وأندمج في الحسابات...",
    result: "ثم أكتشف في النهاية أنني أسير في طريق مسدود وأضعت الوقت.",
    color: '#F43F5E'
  }
];

export default function DiagnosisJourney() {
  return (
    <section style={{ padding: 'var(--space-30) 0', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ maxWidth: 900 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'var(--color-black)' }}
          >
            لماذا يظل أغلب الطلاب في حالة ضياع؟
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)', position: 'relative' }}>
          {/* Vertical connecting line */}
          <div style={{ position: 'absolute', top: 40, bottom: 40, right: 'clamp(20px, 4vw, 28px)', width: 2, backgroundColor: 'var(--color-gray-200)', zIndex: 0 }} />

          {problems.map((prob, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: 'clamp(16px, 4vw, 32px)', position: 'relative', zIndex: 1 }}
            >
              <div style={{ 
                width: 'clamp(44px, 12vw, 56px)', height: 'clamp(44px, 12vw, 56px)', borderRadius: '16px', backgroundColor: '#fff', border: `2px solid ${prob.color}`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: prob.color, flexShrink: 0,
                boxShadow: `0 10px 25px -5px ${prob.color}30`
              }}>
                <prob.icon size={24} strokeWidth={2.5} />
              </div>
              
              <div style={{ backgroundColor: '#fff', padding: 'clamp(20px, 5vw, 32px)', borderRadius: '24px', border: '1px solid var(--color-gray-200)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.04)', width: '100%' }}>
                <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', color: 'var(--color-gray-500)', marginBottom: 'var(--space-4)' }}>
                  "{prob.situation}"
                </p>
                <p style={{ fontSize: 'clamp(1.15rem, 4vw, 1.5rem)', fontWeight: 800, color: prob.color, lineHeight: 1.5, margin: 0 }}>
                  "{prob.result}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
