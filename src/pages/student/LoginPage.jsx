import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-main">
      <style>{`
        .auth-main {
          padding-top: 100px;
          padding-bottom: 80px;
          background-color: #F8FAFC;
          min-height: 100vh;
          direction: rtl;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .auth-card {
          background-color: #fff;
          padding: 40px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 10;
        }
        .form-input {
          width: 100%;
          min-height: 48px;
          padding: 14px 44px 14px 16px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 1rem;
          font-family: inherit;
          background-color: #fff;
          transition: all 0.2s ease;
          box-sizing: border-box;
          color: #0F172A;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }
        .form-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 8px;
          display: block;
        }
        .input-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .back-link {
          display: none;
        }
        .auth-bg-blob {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 1;
          opacity: 0.6;
        }
      `}</style>



      <div className="auth-bg-blob" style={{ top: '-100px', right: '-100px' }}></div>
      <div className="auth-bg-blob" style={{ bottom: '-100px', left: '-100px', background: 'radial-gradient(circle, #e0f2fe 0%, transparent 70%)' }}></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="auth-card">
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--color-accent-light)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-accent)' }}>
            <LogIn size={32} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px', color: '#0F172A' }}>مرحباً بك مجدداً</h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>سجل دخولك لمتابعة رحلة التعلم مع SMART</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #fca5a5', fontWeight: 700, textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label className="form-label">البريد الإلكتروني *</label>
            <div style={{ position: 'relative' }}>
              <Mail className="input-icon" size={20} />
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="example@mail.com" style={{ direction: 'ltr', textAlign: 'right' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>كلمة المرور *</label>
              <button type="button" style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                نسيت كلمة المرور؟
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock className="input-icon" size={20} />
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="form-input" placeholder="••••••••" style={{ direction: 'ltr', textAlign: 'right' }} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', marginTop: '32px', fontWeight: 500 }}>
          ليس لديك حساب؟{' '}
          <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
            إنشاء حساب جديد
          </Link>
        </p>

      </motion.div>
    </main>
  );
}
