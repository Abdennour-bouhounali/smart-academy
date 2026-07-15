import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, BookOpen, Brain, TrendingUp } from 'lucide-react';

export default function FinalCTA() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0.8, 1], [100, -100]);

  return (
    <section style={{ backgroundColor: 'var(--color-black)', padding: 'clamp(80px, 15vw, 160px) 0', position: 'relative', overflow: 'hidden', color: 'white' }}>

      {/* Cinematic Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at center, var(--color-accent) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <motion.div
        style={{ y: yParallax, position: 'absolute', top: '50%', left: '50%', x: '-50%', fontSize: 'min(70vw, 400px)', fontWeight: 900, fontFamily: 'var(--font-mono)', lineHeight: 1, color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', zIndex: 0 }}
      >
        SMART
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900 }}>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: 'var(--space-16)' }}
        >
          {[
            { icon: CheckCircle, label: 'منهجية عملية' },
            { icon: Brain, label: 'تفكير رياضي سليم' },
            { icon: BookOpen, label: 'أمثلة تطبيقية' },
            { icon: TrendingUp, label: 'مناسبة للبكالوريا' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gray-400)', fontSize: '1rem', fontWeight: 600 }}>
              <item.icon size={20} color="var(--color-accent)" />
              {item.label}
            </div>
          ))}
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.1 }}
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--color-gray-400)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}
        >
          الفرق بين الطالب العادي والمتفوق...
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.2 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: 'white', lineHeight: 1.3, marginBottom: 'var(--space-16)' }}
        >
          ليس عدد التمارين التي يحلها، بل <span style={{ color: 'var(--color-accent)' }}>الطريقة التي يفكر بها</span>.
        </motion.h2>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-4)' }}
        >
          <Link to="/book" className="btn btn--primary btn--large" style={{ padding: '24px 56px', fontSize: '1.25rem', borderRadius: '99px', fontWeight: 800, boxShadow: '0 10px 40px -10px var(--color-accent)' }}>
            احصل على نسختك الآن
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
