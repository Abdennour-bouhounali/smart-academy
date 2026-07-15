import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-black)', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(14,165,233,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: 'var(--space-6)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          هل أنت مستعد لتتعلم كيف <br/> <span style={{ color: 'var(--color-accent)' }}>تفكر</span> في الرياضيات؟
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: '1.375rem', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-12)', lineHeight: 1.6, maxWidth: 700, marginInline: 'auto' }}
        >
          انضم إلى آلاف الطلاب الذين غيروا نظرتهم للرياضيات تماماً وبدأوا رحلة التفوق الحقيقي نحو البكالوريا.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}
        >
          <Link to="/purchase" className="btn btn--primary btn--large" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '20px 48px', fontSize: '1.25rem', borderRadius: '16px', fontWeight: 800 }}>
            احصل على نسختك <ArrowRight size={24} />
          </Link>
          
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
            الدفع عند الاستلام - متوفر التوصيل لجميع الولايات
          </div>
          
          <Link to="/protocol" className="btn btn--large" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '20px 48px', fontSize: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: 'white', fontWeight: 700, transition: 'all 0.3s ease' }} onMouseOver={(e)=> e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e)=> e.currentTarget.style.backgroundColor = 'transparent'}>
            تصفح المنهجية <ArrowLeft size={24} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
