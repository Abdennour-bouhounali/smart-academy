import { useInView } from '../hooks/index.js';
import { Link } from 'react-router-dom';
import { InlineMath } from 'react-katex';
import { ArrowLeft, BookOpen, Search, FileText, Target, Link as LinkIcon, CheckCircle2, BookOpenCheck, Users, Award, ShieldCheck } from 'lucide-react';

const steps = [
  { icon: <Search size={24} />, letter: 'S', name: 'Scan', title: 'تحليل التمرين', desc: 'اقرأ التمرين ككل واكتشف الروابط بين أسئلته.' },
  { icon: <FileText size={24} />, letter: 'M', name: 'Translate Math', title: 'ترجمة نص التمرين', desc: 'حوّل اللغة الطبيعية إلى لغة الرياضيات.' },
  { icon: <Target size={24} />, letter: 'A', name: 'Aim', title: 'تحديد الهدف', desc: 'اعرف بدقة ما المطلوب رياضياً.' },
  { icon: <LinkIcon size={24} />, letter: 'R', name: 'Relate', title: 'ربط المعطيات', desc: 'استخرج المعطيات واربطها بذكاء للوصول للحل.' },
  { icon: <CheckCircle2 size={24} />, letter: 'T', name: 'Test', title: 'التحقق من النتيجة', desc: 'راجع وتحقق من صحة النتيجة منطقياً.' },
];

const stats = [
  { icon: <BookOpenCheck size={24} />, value: '+500', label: 'تمرين محلول بطريقة SMART' },
  { icon: <Award size={24} />, value: '+10', label: 'سنوات من الخبرة التعليمية' },
  { icon: <Users size={24} />, value: '+20K', label: 'طالب استفاد من المنهجية' },
  { icon: <ShieldCheck size={24} />, value: '100%', label: 'منهجية مبنية على المنطق' },
];

export default function Hero() {
  const [ref, inView] = useInView();

  return (
    <section id="hero" style={{ position: 'relative', paddingTop: '180px', paddingBottom: 'var(--space-30)', backgroundColor: '#F8FAFC', overflow: 'hidden' }}>

      {/* --- Background Math Elements --- */}
      <div style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.15, transform: 'rotate(5deg)', fontSize: '1.25rem', color: 'var(--color-gray-600)', zIndex: 0, pointerEvents: 'none' }}>
        <InlineMath math="f(x) = x^2 - 4x + 3" />
      </div>
      <div style={{ position: 'absolute', top: '22%', right: '38%', opacity: 0.15, fontSize: '1.5rem', color: 'var(--color-gray-600)', zIndex: 0, pointerEvents: 'none' }}>
        <InlineMath math="\lim_{x \to \infty} \frac{2x+1}{x-1} = 2" />
      </div>
      <div style={{ position: 'absolute', top: '35%', right: '35%', opacity: 0.15, fontSize: '1.3rem', color: 'var(--color-gray-600)', zIndex: 0, pointerEvents: 'none' }}>
        <InlineMath math="a^2 + b^2 = c^2" />
      </div>

      {/* Background Geometric Elements */}
      <div style={{ position: 'absolute', top: '55%', right: '12%', opacity: 0.08, zIndex: 0, pointerEvents: 'none', color: 'var(--color-gray-800)' }}>
        <svg width="80" height="80" viewBox="0 0 100 100">
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle fill="currentColor" cx="2" cy="2" r="2"></circle>
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#dots)"></rect>
        </svg>
      </div>
      <div style={{ position: 'absolute', top: '45%', right: '35%', opacity: 0.1, zIndex: 0, pointerEvents: 'none', color: 'var(--color-gray-800)' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M 10 90 L 90 90 L 10 10 Z" />
          <text x="45" y="98" fontSize="12" fill="currentColor" stroke="none">a</text>
          <text x="-2" y="55" fontSize="12" fill="currentColor" stroke="none">c</text>
          <text x="55" y="45" fontSize="12" fill="currentColor" stroke="none">b</text>
        </svg>
      </div>
      <div style={{ position: 'absolute', top: '30%', right: '5%', opacity: 0.1, zIndex: 0, pointerEvents: 'none', color: 'var(--color-gray-800)' }}>
        <svg width="150" height="100" viewBox="0 0 150 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="10" y1="50" x2="140" y2="50" />
          <line x1="10" y1="10" x2="10" y2="90" />
          <text x="145" y="52" fontSize="10" fill="currentColor" stroke="none">x</text>
          <text x="6" y="8" fontSize="10" fill="currentColor" stroke="none">y</text>
          <path d="M 10 50 Q 42.5 10, 75 50 T 140 50" />
        </svg>
      </div>
      <div style={{ position: 'absolute', top: '70%', right: '5%', opacity: 0.08, zIndex: 0, pointerEvents: 'none', color: 'var(--color-gray-800)' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="30" y="40" width="40" height="40" />
          <rect x="50" y="20" width="40" height="40" strokeDasharray="2 2" />
          <line x1="30" y1="40" x2="50" y2="20" strokeDasharray="2 2" />
          <line x1="70" y1="40" x2="90" y2="20" />
          <line x1="30" y1="80" x2="50" y2="60" strokeDasharray="2 2" />
          <line x1="70" y1="80" x2="90" y2="60" />
        </svg>
      </div>
      {/* ------------------------------- */}

      <div className="container " ref={ref} style={{ position: 'relative', zIndex: 10 }}>
        {/* Top 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-12)', alignItems: 'center' }}>

          {/* Right Column (Image) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', opacity: inView ? 1 : 0, transition: 'all 800ms ease 200ms' }}>
            <img
              src="/images/book-3d.webp"
              alt="كتاب بروتوكول SMART"
              fetchPriority="high"
              style={{
                width: '100%',
                maxWidth: 1200,
                position: 'relative',
                zIndex: 2,
                mixBlendMode: 'multiply',
                filter: 'contrast(1.15) brightness(1.02)',
                transform: 'scale(1.3)'
              }}
            />
          </div>

          {/* Left Column (Text) */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 600ms ease' }}>
            <p style={{ color: 'var(--color-accent)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>بروتوكول SMART للبكالوريا</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--space-6)', lineHeight: 1.2 }}>
              تعلم كيف تفكر رياضياً...<br />
              <span style={{ color: 'var(--color-accent)' }}>لا كيف تحفظ فقط</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', marginBottom: 'var(--space-8)', lineHeight: 1.8 }}>
              SMART ليست مجرد طريقة لحل التمارين، بل منهجية تفكير متكاملة تقودك خطوة بخطوة إلى الحل الصحيح بوضوح، منطق، وفعالية.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link to="/protocol" className="btn btn--primary btn--large" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                اكتشف البروتوكول <ArrowLeft size={20} />
              </Link>
              <Link to="/book" className="btn btn--large" style={{ backgroundColor: 'white', color: 'var(--color-black)', border: '1px solid var(--color-gray-200)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <BookOpen size={20} /> تصفح محتوى الكتاب
              </Link>
            </div>
          </div>
        </div>

        {/* Steps Cards Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-20)',
            backgroundColor: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.05)'
          }}
        >
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-4)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                {step.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.125rem', fontWeight: 900, marginBottom: 4 }}>
                {step.letter} <br /> <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gray-500)' }}>{step.name}</span>
              </h3>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 'var(--space-2) 0' }}>{step.title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-16)', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9375rem', color: 'var(--color-gray-500)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
