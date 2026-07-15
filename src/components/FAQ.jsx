import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { faqItems } from '../data/index.js';
import { Book, Brain, GraduationCap, FileText, Users, ChevronDown, Mail } from 'lucide-react';

// Assign categories automatically for a richer UI
const categorizedFaq = faqItems.map((item, index) => {
  let category = 'الكتاب';
  let icon = Book;
  let color = '#3B82F6';
  
  if (item.question.includes('موهبة') || item.question.includes('SMART')) {
    category = 'المنهجية'; icon = Brain; color = '#8B5CF6';
  }
  if (item.question.includes('البكالوريا') || item.question.includes('مستوى')) {
    category = 'البكالوريا'; icon = GraduationCap; color = '#F59E0B';
  }
  if (item.question.includes('الأساتذة')) {
    category = 'للمعلمين'; icon = Users; color = '#10B981';
  }

  return { ...item, category, icon, color, number: String(index + 1).padStart(2, '0') };
});

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: 'var(--space-30) 0', backgroundColor: '#F8FAFC', position: 'relative', zIndex: 10 }}>
      
      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container" style={{ maxWidth: 900, position: 'relative' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent)', letterSpacing: '0.1em', marginBottom: 'var(--space-4)' }}
          >
            قبل أن تبدأ...
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--color-black)', letterSpacing: '-0.02em', marginBottom: 'var(--space-6)' }}
          >
            أجبنا عن أكثر ما يشغل الطلاب.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.2 }}
            style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', maxWidth: 600, marginInline: 'auto' }}
          >
            لكي تطمئن تماماً وتدرك أن بروتوكول SMART هو الحل الذي تبحث عنه.
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {categorizedFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundColor: '#fff',
                  border: `1px solid ${isOpen ? item.color : '#e2e8f0'}`,
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: isOpen ? `0 20px 40px -10px ${item.color}20` : '0 4px 6px -1px rgba(0,0,0,0.02)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
                    padding: 'var(--space-8)', background: 'none', border: 'none',
                    textAlign: 'right', cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    width: 48, height: 48, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    backgroundColor: isOpen ? item.color : '#f1f5f9',
                    color: isOpen ? '#fff' : item.color,
                    transition: 'all 0.3s'
                  }}>
                    <item.icon size={24} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: item.color, backgroundColor: item.color + '15', padding: '4px 12px', borderRadius: '99px' }}>
                        {item.category}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gray-400)', fontFamily: 'var(--font-mono)' }}>
                        {item.number}
                      </span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.25rem', color: isOpen ? 'var(--color-black)' : 'var(--color-gray-700)', transition: 'color 0.3s' }}>
                      {item.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? item.color : '#f1f5f9', color: isOpen ? '#fff' : 'var(--color-gray-400)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 clamp(16px, 4vw, 32px) clamp(16px, 4vw, 32px)', paddingRight: 'clamp(20px, 15vw, 100px)' }}>
                        <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: 'var(--space-16)', textAlign: 'center' }}
        >
          <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-500)', marginBottom: 'var(--space-6)' }}>لم تجد إجابة لسؤالك؟</p>
          <Link to="/contact" className="btn btn--large" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', borderRadius: '99px', backgroundColor: '#fff', border: '1px solid #e2e8f0', color: 'var(--color-black)', fontWeight: 700, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <Mail size={20} color="var(--color-accent)" />
            تواصل معنا مباشرة
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
