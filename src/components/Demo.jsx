import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlockMath, InlineMath } from 'react-katex';
import { Search, Map, ZoomIn, Link as LinkIcon, CheckCircle2, ChevronDown, Award, ArrowRight, ArrowLeft } from 'lucide-react';

const phases = [
  {
    id: 'start', letter: '!', color: '#64748B', title: 'الفوضى الابتدائية',
    desc: 'كيف يرى الطالب التمرين العادي.', icon: Search
  },
  {
    id: 'scanner', letter: 'S', color: '#3B82F6', title: 'الفحص',
    desc: 'لاحظ أن السؤال 3 يتحدث عن المقارب.', icon: Search,
    insight: 'تلميح: المقارب المائل y = x - 1 يكشف الكثير.'
  },
  {
    id: 'map', letter: 'M', color: '#10B981', title: 'الترجمة',
    desc: 'هذا يعني أن نهاية الفرق يجب أن تكون صفراً.', icon: Map,
    insight: 'رياضيات: lim [f(x) - (x-1)] = 0'
  },
  {
    id: 'analyze', letter: 'A', color: '#F59E0B', title: 'التحليل',
    desc: 'القسمة الإقليدية تجعل كل شيء أبسط.', icon: ZoomIn,
    insight: 'الشكل الجديد: f(x) = (x-1) + 2/(x+1)'
  },
  {
    id: 'relate', letter: 'R', color: '#8B5CF6', title: 'الربط',
    desc: 'الآن أصبحت جميع الأسئلة مترابطة وبديهية.', icon: LinkIcon,
    insight: 'المشتقة والتغيرات تصبح واضحة تماماً.'
  },
  {
    id: 'complete', letter: 'T', color: '#F43F5E', title: 'التحقق',
    desc: 'تأكد من منطقية النتيجة رياضياً.', icon: CheckCircle2,
    insight: 'اختبر النتيجة بقيمة بسيطة لتتأكد من صحتها.'
  },
  {
    id: 'conclusion', letter: '🏁', color: '#0F172A', title: 'النتيجة النهائية',
    desc: 'هكذا يحول SMART الفوضى إلى خطة.', icon: Award,
    insight: 'بروتوكول SMART يغير طريقة تفكيرك جذرياً.'
  }
];

function ExamCard() {
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'clamp(12px, 3vw, 24px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
      <div style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontWeight: 800, fontSize: 'clamp(0.95rem, 4vw, 1.2rem)' }}>امتحان البكالوريا</div>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>المدة: 3 ساعات</div>
      </div>
      <p style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.95rem' }}>التمرين الأول (7 نقاط):</p>
      <div style={{ direction: 'rtl', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: '100%' }}>
        لتكن الدالة <InlineMath math="f" /> المعرفة بـ:
        <div style={{ margin: '16px 0', direction: 'ltr', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '8px', width: '100%', maxWidth: '100%' }}>
          <BlockMath math="f(x) = \frac{x^2 + 1}{x + 1}" />
        </div>
        1) احسب النهايات.<br />
        2) ادرس التغيرات.<br />
        3) بين أن <InlineMath math="y = x - 1" /> مقارب مائل.<br />
        4) ادرس الوضعية النسبية.
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40, background: 'linear-gradient(135deg, transparent 50%, #f1f5f9 50%)', pointerEvents: 'none' }}></div>
    </div>
  );
}

function JourneySidebar({ activeIndex, setActiveIndex }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, bottom: 20, right: 28, width: 2, backgroundColor: '#e2e8f0', zIndex: 0 }} />
      <motion.div 
        style={{ position: 'absolute', top: 20, right: 28, width: 2, backgroundColor: phases[activeIndex].color, zIndex: 1, originY: 0 }}
        animate={{ scaleY: activeIndex / (phases.length - 1) }} transition={{ duration: 0.5 }}
      />
      {phases.map((phase, idx) => {
        const isActive = idx === activeIndex;
        const isPast = idx < activeIndex;
        return (
          <button
            key={phase.id} onClick={() => setActiveIndex(idx)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', zIndex: 2, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', opacity: isActive || isPast ? 1 : 0.4, transition: 'opacity 0.3s' }}
          >
            <div style={{ width: 56, height: 56, borderRadius: '16px', flexShrink: 0, backgroundColor: isActive ? phase.color : isPast ? '#f8fafc' : '#fff', border: `2px solid ${isActive || isPast ? phase.color : '#e2e8f0'}`, color: isActive ? '#fff' : phase.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', fontFamily: 'var(--font-mono)', boxShadow: isActive ? `0 10px 25px -5px ${phase.color}40` : 'none', transition: 'all 0.3s' }}>
              {phase.letter}
            </div>
            <div style={{ paddingTop: '8px' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: isActive ? phase.color : 'var(--color-black)' }}>{phase.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{phase.desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function WorkspaceContent({ activeIndex }) {
  if (activeIndex === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 'clamp(16px, 4vw, 40px)' }}>
        <ExamCard />
        <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '16px' }}>هكذا تبدو المسألة للوهلة الأولى: مربكة.</p>
        </div>
      </div>
    );
  }

  const phase = phases[activeIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 10, padding: 'clamp(16px, 4vw, 40px)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', minWidth: 0 }}>
        {activeIndex >= 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', direction: 'ltr', fontSize: 'clamp(1rem, 4vw, 1.25rem)', marginBottom: '16px', width: '100%', overflowX: 'auto', overflowY: 'hidden', minWidth: 0 }}>
            <BlockMath math="f(x) = \frac{x^2 + 1}{x + 1}" />
          </motion.div>
        )}
        {activeIndex >= 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ color: '#10B981', fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', marginBottom: '16px', textAlign: 'center', width: '100%', overflowX: 'auto', overflowY: 'hidden', minWidth: 0 }}>
            <BlockMath math="\lim_{x \to \infty} [f(x) - (x - 1)] = 0" />
          </motion.div>
        )}
        {activeIndex >= 3 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#F59E0B', fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: 'bold', padding: '10px 16px', border: '2px dashed #FCD34D', borderRadius: '16px', backgroundColor: '#FEF3C7', textAlign: 'center', width: '100%', overflowX: 'auto', overflowY: 'hidden', minWidth: 0 }}>
            <BlockMath math="f(x) = (x - 1) + \frac{2}{x + 1}" />
          </motion.div>
        )}
        {activeIndex >= 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', width: '100%', minWidth: 0 }}>
            <div style={{ padding: '8px 16px', backgroundColor: '#ede9fe', color: '#8b5cf6', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}>الاشتقاق أسهل</div>
            <div style={{ padding: '8px 16px', backgroundColor: '#ede9fe', color: '#8b5cf6', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}>النهايات بسيطة</div>
          </motion.div>
        )}
        {activeIndex >= 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: '16px', padding: '12px', border: '1px solid #fda4af', borderRadius: '16px', backgroundColor: '#fff1f2', textAlign: 'center', width: '100%', overflowX: 'auto', overflowY: 'hidden', minWidth: 0 }}>
            <div style={{ color: '#e11d48', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px' }}>تحقق: نعوض x = 0</div>
            <div style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)' }}>
              <BlockMath math="f(0) = (0 - 1) + \frac{2}{0 + 1} = 1" />
            </div>
          </motion.div>
        )}
      </div>

      <motion.div 
        key={phase.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ backgroundColor: phase.color + '10', border: `1px solid ${phase.color}40`, padding: '16px', borderRadius: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', marginTop: '16px' }}
      >
        <div style={{ color: phase.color, padding: '8px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', flexShrink: 0 }}>
          <phase.icon size={20} />
        </div>
        <div>
          <div style={{ color: phase.color, fontWeight: 800, marginBottom: '4px', fontSize: '0.9rem' }}>نقطة اكتشاف</div>
          <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6 }}>{phase.insight}</div>
        </div>
      </motion.div>

      {activeIndex === 6 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, backgroundColor: '#fff', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(16px, 4vw, 40px)', overflowY: 'auto' }}>
            <Award size={48} color="#F43F5E" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '8px', color: '#1e293b' }}>من الفوضى إلى الحل</h3>
            <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>طالب SMART يترجم، يحلل، ويربط، ويتحقق قبل أن يكتب سطراً واحداً.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
              <div style={{ padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '16px', border: '1px solid #a7f3d0' }}>
                <div style={{ fontWeight: 800, color: '#059669', marginBottom: '8px' }}>✅ مع SMART</div>
                <ul style={{ textAlign: 'right', color: '#064e3b', lineHeight: 1.8, fontSize: '0.9rem', paddingRight: '20px' }}>
                  <li>هدف رياضي واضح</li>
                  <li>ترجمة دقيقة للمعطيات</li>
                  <li>تحقق نهائي من النتيجة</li>
                </ul>
              </div>
            </div>
         </motion.div>
      )}
    </div>
  );
}

export default function Demo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex((prev) => Math.max(0, Math.min(phases.length - 1, prev + newDirection)));
  };

  const currentPhase = phases[activeIndex];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (dir) => ({ x: dir < 0 ? 100 : -100, opacity: 0, zIndex: 0 })
  };

  return (
    <section id="demo" style={{ padding: 'clamp(60px, 15vw, 120px) 0', backgroundColor: '#F8FAFC', position: 'relative' }}>
      <style>
        {`
          .desktop-demo { display: none; }
          .mobile-demo { display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 100%; min-width: 0; overflow: hidden; }
          #demo .katex-display { margin: 0.25em 0 !important; }
          @media (min-width: 992px) {
            .desktop-demo { display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: stretch; }
            .mobile-demo { display: none; }
            #demo .katex-display { margin: 0.5em 0 !important; }
          }
        `}
      </style>
      
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 8vw, 64px)' }}>
          <div style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: '#DBEAFE', color: '#2563EB', borderRadius: '99px', fontWeight: 800, fontSize: '0.8rem', marginBottom: '16px', letterSpacing: '0.05em' }}>
            SMART في الميدان
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.03em' }}>شاهد كيف يفكر SMART</h2>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#64748B', maxWidth: 700, marginInline: 'auto' }}>
            بدلاً من عرض الحل مباشرة، ستشاهد كيف يبنيه بروتوكول SMART خطوة بخطوة.
          </p>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="desktop-demo">
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <JourneySidebar activeIndex={activeIndex} setActiveIndex={(idx) => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }} />
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
             <WorkspaceContent activeIndex={activeIndex} />
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="mobile-demo">
          {/* Horizontal Step Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {phases.map((phase, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              return (
                <button
                  key={phase.id} onClick={() => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', border: `2px solid ${isActive || isPast ? phase.color : '#e2e8f0'}`,
                    backgroundColor: isActive ? phase.color : isPast ? '#f8fafc' : '#fff',
                    color: isActive ? '#fff' : phase.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.9rem', fontFamily: 'var(--font-mono)', padding: 0,
                    boxShadow: isActive ? `0 4px 10px -2px ${phase.color}60` : 'none', cursor: 'pointer', transition: 'all 0.3s'
                  }}
                  aria-label={`Step ${phase.title}`}
                >
                  {phase.letter}
                </button>
              );
            })}
          </div>

          {/* Single Interactive Card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden', minHeight: 480, display: 'flex', flexDirection: 'column' }}>
            {/* Header of Card */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f8fafc' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: currentPhase.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                {currentPhase.letter}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: currentPhase.color, fontSize: '0.95rem' }}>{currentPhase.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{currentPhase.desc}</div>
              </div>
            </div>

            {/* Content with AnimatePresence */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <WorkspaceContent activeIndex={activeIndex} />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Buttons */}
            <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => paginate(1)}
                disabled={activeIndex === phases.length - 1}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: activeIndex === phases.length - 1 ? '#f1f5f9' : 'var(--color-black)', color: activeIndex === phases.length - 1 ? '#cbd5e1' : 'white', fontWeight: 700, fontSize: '1rem', cursor: activeIndex === phases.length - 1 ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
              >
                التالي <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => paginate(-1)}
                disabled={activeIndex === 0}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: activeIndex === 0 ? '#cbd5e1' : '#64748b', fontWeight: 700, fontSize: '1rem', cursor: activeIndex === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
              >
                <ArrowRight size={18} /> السابق
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
