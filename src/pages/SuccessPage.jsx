import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Truck, CalendarClock } from 'lucide-react';

export default function SuccessPage() {
  const location = useLocation();
  const orderRef = location.state?.order_reference || 'SMART-XXXXX';

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '24px', direction: 'rtl' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ backgroundColor: '#fff', padding: 'clamp(32px, 5vw, 64px)', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '600px', width: '100%', border: '1px solid #e2e8f0' }}
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          style={{ width: 80, height: 80, backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#16a34a' }}
        >
          <CheckCircle2 size={40} />
        </motion.div>

        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '16px', color: '#0F172A' }}>تم تسجيل طلبك بنجاح!</h1>
        <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
          شكراً لثقتك بنا. فريقنا سيقوم بمعالجة طلبك قريباً والتواصل معك عبر الهاتف لتأكيد الشحن.
        </p>

        <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px dashed #cbd5e1', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '8px' }}>رقم الطلب الخاص بك:</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>{orderRef}</div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'right' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontWeight: 800, fontSize: '1.1rem' }}>
                <Truck size={20} color="#3b82f6" /> الشحن والتوصيل
              </div>
              <div style={{ fontSize: '0.95rem', color: '#64748b' }}>إلى باب المنزل (الدفع عند الاستلام)</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontWeight: 800, fontSize: '1.1rem' }}>
                <CalendarClock size={20} color="#f59e0b" /> مدة التوصيل المتوقعة
              </div>
              <div style={{ fontSize: '0.95rem', color: '#64748b' }}>من 2 إلى 4 أيام عمل</div>
            </div>
          </div>
        </div>

        <Link to="/" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '1.1rem' }}>
          العودة إلى الصفحة الرئيسية <ArrowRight size={22} style={{ marginRight: '8px' }} />
        </Link>
      </motion.div>
    </main>
  );
}
