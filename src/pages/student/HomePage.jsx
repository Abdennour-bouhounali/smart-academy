import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import { LogOut, BookOpen, GraduationCap, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <main className="student-home-main">
      <style>{`
        .student-home-main {
          padding-top: 120px;
          padding-bottom: 80px;
          background-color: #F8FAFC;
          min-height: 100vh;
          direction: rtl;
        }
        .home-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .welcome-card {
          background-color: #fff;
          padding: 32px 40px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }
        .welcome-bg-blob {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%);
          border-radius: 50%;
          top: -150px;
          left: -150px;
          z-index: 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .feature-card {
          background-color: #fff;
          padding: 32px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .feature-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          transform: translateY(-4px);
        }
        .feature-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: background-color 0.3s ease;
        }

        @media (max-width: 992px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .welcome-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            padding: 24px;
          }
        }
      `}</style>

      <div className="home-container">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="welcome-card">
          <div className="welcome-bg-blob"></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 900, marginBottom: '8px', color: '#0F172A' }}>
              مرحباً {user?.first_name} {user?.last_name} 👋
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>مرحباً بك في مساحتك التعليمية في أكاديمية SMART.</p>
          </div>
          
          <button onClick={logout} className="btn btn--outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1, borderColor: '#fca5a5', color: '#ef4444' }}>
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
              <BookOpen size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: '#0F172A' }}>الموارد التعليمية</h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>قريباً.. ستتمكن من الوصول إلى مكتبة شاملة من الدروس والتمارين المرفقة بحلول نموذجية.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
              <LayoutDashboard size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: '#0F172A' }}>لوحة المتابعة</h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>قريباً.. يمكنك تتبع مستواك ومتابعة تقدمك في حل المسائل واكتشاف نقاط ضعفك.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
              <GraduationCap size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: '#0F172A' }}>أكاديمية SMART</h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>بيئة تعليمية متكاملة لضمان التفوق وتطبيق بروتوكول سمارت بكفاءة واحترافية.</p>
          </div>

        </motion.div>

      </div>
    </main>
  );
}
