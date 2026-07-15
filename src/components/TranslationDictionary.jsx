import React from 'react';
import { motion } from 'framer-motion';
import { InlineMath } from 'react-katex';
import { Link } from 'react-router-dom';
import { ArrowDown, BookOpen, Activity, Layers, Sigma } from 'lucide-react';

const dictionaryData = [
  {
    title: 'الدوال',
    icon: <Activity size={24} strokeWidth={1.5} />,
    items: [
      { phrase: 'المماس أفقي', math: "f'(a) = 0", desc: 'هذا يعني أن ميل المماس يساوي صفراً.' },
      { phrase: 'الدالة متزايدة', math: "f'(x) > 0", desc: 'المشتقة موجبة تماماً على المجال.' },
      { phrase: 'الدالة متناقصة', math: "f'(x) < 0", desc: 'المشتقة سالبة تماماً على المجال.' },
      { phrase: 'مركز تناظر', math: 'f(2a-x)+f(x)=2b', desc: 'تحقق من القانون عند النقطة (a,b).' },
      { phrase: 'تقاطع مع محور الفواصل', math: 'f(x) = 0', desc: 'حل المعادلة لإيجاد الفواصل.' },
      { phrase: 'تقاطع مع محور التراتيب', math: 'f(0)', desc: 'حساب الصورة للعدد صفر.' },
      { phrase: 'مستقيم مقارب أفقي', math: '\\lim_{x \\to \\infty} f(x) = b', desc: 'نهاية الدالة عند المالانهاية.' },
    ]
  },
  {
    title: 'المتتاليات',
    icon: <Layers size={24} strokeWidth={1.5} />,
    items: [
      { phrase: 'متزايدة', math: 'U_{n+1} - U_n > 0', desc: 'يمكن الآن دراسة إشارة الفرق.' },
      { phrase: 'متناقصة', math: 'U_{n+1} - U_n < 0', desc: 'الفرق سالب تماماً.' },
      { phrase: 'هندسية', math: 'U_{n+1} = q \\times U_n', desc: 'نسبة حدين متتابعين ثابتة.' },
      { phrase: 'حسابية', math: 'U_{n+1} = U_n + r', desc: 'فرق حدين متتابعين ثابت.' },
      { phrase: 'محدودة', math: 'm \\le U_n \\le M', desc: 'محصورة بين قيمتين.' },
    ]
  },
  {
    title: 'التكامل',
    icon: <Sigma size={24} strokeWidth={1.5} />,
    items: [
      { phrase: 'مساحة', math: '\\int_a^b |f(x)| \\,dx', desc: 'تكامل القيمة المطلقة.' },
      { phrase: 'قيمة متوسطة', math: '\\frac{1}{b-a} \\int_a^b f(x) \\,dx', desc: 'تطبيق مباشر للقانون.' },
      { phrase: 'مساحة بين منحنيين', math: '\\int_a^b |f(x)-g(x)| \\,dx', desc: 'تكامل الفرق بين الدالتين.' },
    ]
  }
];

const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    style={{ textAlign: 'center', marginBottom: 'var(--space-20)', maxWidth: '800px', marginInline: 'auto' }}
  >
    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.025em', marginBottom: 'var(--space-6)', fontWeight: 800, lineHeight: 1.2 }}>
      تعلم لغة الرياضيات
    </h2>
    <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-600)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
      معظم أخطاء التلاميذ لا تحدث أثناء الحساب، بل قبل ذلك بكثير...<br/>
      <span style={{ fontWeight: 700, color: 'var(--color-black)' }}>عندما يسيئون فهم لغة السؤال.</span>
    </p>
    <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-500)', lineHeight: 1.7 }}>
      في بروتوكول SMART ستتعلم كيف تترجم كل عبارة لفظية إلى معناها الرياضي الدقيق، لأن فهم اللغة هو أول خطوة نحو الحل الصحيح.
    </p>
  </motion.div>
);

const TranslationCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)', borderColor: 'var(--color-accent)' }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'var(--space-8) var(--space-6)',
      backgroundColor: 'var(--color-white)',
      border: '1px solid var(--color-gray-200)',
      borderRadius: '24px',
      boxShadow: '0 4px 12px -4px rgba(0,0,0,0.03)',
      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      textAlign: 'center',
      gap: 'var(--space-4)'
    }}
  >
    {/* Phrase */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--color-black)', fontWeight: 700, fontSize: '1.125rem' }}>
      <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>💬</span>
      <span style={{ letterSpacing: '-0.01em' }}>{item.phrase}</span>
    </div>

    {/* Arrow */}
    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      style={{ color: 'var(--color-gray-300)' }}
    >
      <ArrowDown size={20} />
    </motion.div>

    {/* Math */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: 'var(--color-accent)', direction: 'ltr', fontSize: '1.25rem' }}
    >
      <span style={{ fontSize: '1.5rem' }}>🧠</span>
      <div style={{ padding: '12px 20px', backgroundColor: 'var(--color-accent-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '160px' }}>
        <InlineMath math={item.math} />
      </div>
    </motion.div>

    {/* Arrow */}
    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
      style={{ color: 'var(--color-gray-300)' }}
    >
      <ArrowDown size={20} />
    </motion.div>

    {/* Result */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--color-gray-600)', fontSize: '0.9375rem', fontWeight: 500, lineHeight: 1.5 }}>
      <span style={{ fontSize: '1.25rem' }}>✅</span>
      {item.desc}
    </div>
  </motion.div>
);

const TranslationCategory = ({ category }) => (
  <div style={{ marginBottom: 'var(--space-20)' }}>
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--space-8)' }}
    >
      <div style={{ padding: '12px', backgroundColor: 'var(--color-gray-50)', borderRadius: '16px', color: 'var(--color-black)', border: '1px solid var(--color-gray-200)' }}>
        {category.icon}
      </div>
      <h3 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-black)' }}>{category.title}</h3>
    </motion.div>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--space-6)'
    }}>
      {category.items.map((item, idx) => (
        <TranslationCard key={idx} item={item} index={idx} />
      ))}
    </div>
  </div>
);

const InspirationalQuote = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{
      margin: 'var(--space-24) auto var(--space-20)',
      maxWidth: '900px',
      textAlign: 'center',
      padding: 'var(--space-16) var(--space-8)',
      backgroundColor: 'var(--color-black)',
      borderRadius: '32px',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Subtle gradient overlay */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)', pointerEvents: 'none' }} />
    
    <p style={{
      fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
      fontWeight: 800,
      color: 'white',
      lineHeight: 1.6,
      letterSpacing: '-0.01em',
      position: 'relative',
      zIndex: 1
    }}>
      "كل سؤال رياضي هو رسالة مكتوبة بلغة خاصة...<br/>
      <span style={{ color: 'var(--color-accent)', opacity: 0.9 }}>إذا تعلمت ترجمتها، أصبح الحل واضحاً.</span>"
    </p>
  </motion.div>
);

const CTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{ textAlign: 'center', paddingBottom: 'var(--space-8)' }}
  >
    <p style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-black)', marginBottom: 'var(--space-3)' }}>
      هذا مجرد جزء صغير من قاموس SMART.
    </p>
    <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-500)', marginBottom: 'var(--space-8)', maxWidth: '650px', marginInline: 'auto', lineHeight: 1.7 }}>
      يحتوي الكتاب على عشرات التحويلات الرياضية الأكثر استعمالاً في البكالوريا مع شرح كيفية استخدامها أثناء الحل.
    </p>
    <Link to="/book" className="btn btn--primary btn--large" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '1.125rem', padding: '18px 40px', borderRadius: '999px', fontWeight: 700 }}>
      <BookOpen size={22} strokeWidth={2.5} /> اكتشف القاموس الكامل
    </Link>
  </motion.div>
);

const MathBackground = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 0.03 }}>
    {/* Clean Grid */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    
    {/* Elegant Curves */}
    <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
      <path d="M -100,300 C 200,100 400,600 800,300 S 1200,-100 1600,300" fill="none" stroke="black" strokeWidth="3" />
      <path d="M -100,500 C 300,700 500,200 900,400 S 1300,800 1600,400" fill="none" stroke="black" strokeWidth="1.5" />
    </svg>
    
    {/* Floating Math Symbols */}
    <div style={{ position: 'absolute', top: '15%', right: '10%', fontSize: '5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>∫</div>
    <div style={{ position: 'absolute', top: '55%', right: '85%', fontSize: '4rem', fontFamily: 'var(--font-serif)' }}>∑</div>
    <div style={{ position: 'absolute', top: '80%', right: '20%', fontSize: '6rem', fontFamily: 'var(--font-serif)' }}>π</div>
    <div style={{ position: 'absolute', top: '25%', right: '75%', fontSize: '4.5rem', fontFamily: 'var(--font-serif)' }}>∞</div>
    <div style={{ position: 'absolute', top: '45%', right: '25%', fontSize: '4rem', fontFamily: 'var(--font-serif)' }}>Δ</div>
    <div style={{ position: 'absolute', top: '75%', right: '65%', fontSize: '5rem', fontFamily: 'var(--font-serif)' }}>ƒ</div>
  </div>
);

export default function TranslationDictionary() {
  return (
    <section id="dictionary" style={{ position: 'relative', backgroundColor: 'var(--color-gray-50)', paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-24)', overflow: 'hidden' }}>
      <MathBackground />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader />
        
        <div style={{ marginTop: 'var(--space-16)' }}>
          {dictionaryData.map((category, idx) => (
            <TranslationCategory key={idx} category={category} />
          ))}
        </div>

        <InspirationalQuote />
        <CTA />
      </div>
    </section>
  );
}
