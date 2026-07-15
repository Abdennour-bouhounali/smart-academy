import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, Send, CheckCircle2, User, Gift, BookOpen, MessageSquare, AlertCircle, Facebook, Youtube } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function ContactPage() {
  const [formState, setFormState] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: 'Student',
    country: '',
    school: '',
    book_owner: 'false',
    wants_free_session: false,
    subject: 'General Question',
    message: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMessage('يجب الموافقة على شروط التواصل.');
      setFormState('error');
      return;
    }
    
    setFormState('loading');
    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.msg || errorData.error || 'حدث خطأ أثناء إرسال الرسالة');
      }

      setFormState('success');
      setFormData(prev => ({ ...prev, message: '', subject: 'General Question' }));
    } catch (error) {
      setErrorMessage(error.message);
      setFormState('error');
    }
  };

  return (
    <main style={{ padding: '160px 0', minHeight: '100vh', position: 'relative', backgroundColor: '#F8FAFC', overflow: 'hidden' }}>

      {/* Subtle Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at top right, #3B82F6 0%, transparent 40%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--color-black)', letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}
          >
            لنتحدث عن رحلتك مع SMART
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', maxWidth: 600, marginInline: 'auto' }}
          >
            مجتمع SMART هو المساحة التي نلتقي فيها لتبادل الأفكار، تحسين الأداء، وبناء جيل جديد من المفكرين.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-10)', alignItems: 'flex-start' }}>

          {/* Right Column - Info & Promo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
          >
            {/* Promo Card for Mentorship */}
            <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '2px solid #3B82F6', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(59,130,246,0.15)' }}>
              <div style={{ backgroundColor: '#3B82F6', color: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}>
                <Gift size={24} />
                <span style={{ fontSize: '1.2rem' }}>عرض خاص ومجاني</span>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-black)', marginBottom: '12px' }}>
                  جلسة توجيه مجانية
                </h3>
                <p style={{ color: 'var(--color-gray-600)', marginBottom: '16px', lineHeight: 1.6 }}>
                  لكل طالب يقتني كتاب بروتوكول SMART، نقدم جلسة توجيه فردية أو جماعية عبر الإنترنت مجاناً. في هذه الجلسة ستتعلم:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'كيفية استخدام SMART بشكل صحيح.',
                    'تطوير التفكير الرياضي السليم.',
                    'تحسين استراتيجيات حل المسائل المعقدة.',
                    'طرح أسئلتك المباشرة ومشاركة اقتراحاتك.'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--color-gray-700)' }}>
                      <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 64, height: 64, borderRadius: '20px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                <MessageSquare size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px', color: 'var(--color-black)' }}>تواصل معي مباشرة</h3>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '1.05rem', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                رسالتي هي أن أجعل التفكير الرياضي أكثر وضوحاً لكل طالب، لأن الرياضيات لغة وليست مجرد حسابات. أنا هنا للإجابة على تساؤلاتك ومقترحاتك.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-gray-600)', fontWeight: 600 }}>
                  <Mail size={20} color="var(--color-accent)" />
                  <span dir="ltr">abdennour.bouhounali@gmail.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-gray-600)', fontWeight: 600 }}>
                  <Clock size={20} color="var(--color-accent)" />
                  الرد خلال 24 - 48 ساعة
                </div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                  <a href="https://www.facebook.com/SmartMathProtocol/" target="_blank" rel="noopener noreferrer"
                     style={{ color: 'var(--color-accent)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                     onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = '#1877F2'; }}
                     onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'; }}
                     aria-label="Facebook Page"
                  >
                    <Facebook size={20} />
                  </a>
                  <a href="https://www.youtube.com/@SmartMathProtocol" target="_blank" rel="noopener noreferrer"
                     style={{ color: 'var(--color-accent)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                     onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = '#FF0000'; }}
                     onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'; }}
                     aria-label="YouTube Channel"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ backgroundColor: '#fff', padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <div style={{ display: 'inline-flex', width: 80, height: 80, borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-black)', marginBottom: 'var(--space-4)' }}>شكراً لتواصلك!</h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-500)', lineHeight: 1.6, maxWidth: 300, marginInline: 'auto' }}>
                      تم استلام رسالتك بنجاح. سيصلك بريد إلكتروني للتأكيد وسنقوم بالرد عليك قريباً.
                    </p>
                    <button onClick={() => setFormState('idle')} className="btn btn--secondary" style={{ marginTop: 'var(--space-8)' }}>
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {formState === 'error' && (
                      <div style={{ padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={20} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>الاسم الكامل *</label>
                        <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange}
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s' }}
                        />
                      </div>
                      
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>البريد الإلكتروني *</label>
                        <input type="email" name="email" required dir="ltr" value={formData.email} onChange={handleChange}
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s', direction: 'ltr' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>رقم الهاتف</label>
                        <input type="tel" name="phone" dir="ltr" value={formData.phone} onChange={handleChange}
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>الدور *</label>
                        <select name="role" required value={formData.role} onChange={handleChange}
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s' }}>
                          <option value="Student">طالب</option>
                          <option value="Teacher">أستاذ</option>
                          <option value="Parent">ولي أمر</option>
                          <option value="Other">آخر</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>البلد</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange}
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>المدرسة / الجامعة</label>
                        <input type="text" name="school" value={formData.school} onChange={handleChange}
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s' }}
                        />
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                      <label style={{ display: 'block', marginBottom: '12px', fontWeight: 700, fontSize: '0.95rem', color: '#0369a1' }}>هل تمتلك كتاب بروتوكول SMART؟</label>
                      <div style={{ display: 'flex', gap: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0c4a6e', fontWeight: 600 }}>
                          <input type="radio" name="book_owner" value="true" checked={formData.book_owner === 'true'} onChange={handleChange} style={{ width: 18, height: 18 }} />
                          نعم، أمتلكه
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0c4a6e', fontWeight: 600 }}>
                          <input type="radio" name="book_owner" value="false" checked={formData.book_owner === 'false'} onChange={handleChange} style={{ width: 18, height: 18 }} />
                          لا، ليس بعد
                        </label>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.book_owner === 'true' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>

                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', backgroundColor: '#ecfdf5', padding: '16px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                              <input type="checkbox" name="wants_free_session" checked={formData.wants_free_session} onChange={handleChange} style={{ width: 20, height: 20, marginTop: '2px', accentColor: '#10b981' }} />
                              <div>
                                <span style={{ fontWeight: 700, color: '#065f46', display: 'block' }}>أرغب في الحصول على جلسة التوجيه المجانية</span>
                                <span style={{ fontSize: '0.85rem', color: '#047857' }}>سنقوم بالتواصل معك لتحديد موعد الجلسة بعد تأكيد المعلومات.</span>
                              </div>
                            </label>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>موضوع الرسالة *</label>
                      <select name="subject" required value={formData.subject} onChange={handleChange}
                        style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s' }}>
                        <option value="General Question">سؤال عام</option>
                        <option value="Book Feedback">انطباعات حول الكتاب</option>
                        <option value="Mentoring Session">جلسة التوجيه المجانية</option>
                        <option value="Technical Support">دعم تقني</option>
                        <option value="Teacher Collaboration">تعاون (للأساتذة)</option>
                        <option value="Bulk Purchase">شراء كمية للمدارس</option>
                        <option value="Other">موضوع آخر</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-gray-600)' }}>نص الرسالة *</label>
                      <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="اكتب رسالتك هنا..."
                        style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'inherit', transition: 'all 0.3s', resize: 'vertical' }}
                      />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'var(--color-gray-600)', fontSize: '0.9rem' }}>
                      <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required style={{ width: 18, height: 18 }} />
                      أوافق على استخدام بياناتي للتواصل معي بخصوص طلبي.
                    </label>

                    <button type="submit" disabled={formState === 'loading'} className="btn btn--primary btn--large" style={{ marginTop: 'var(--space-2)', width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem', borderRadius: '12px', gap: '8px' }}>
                      {formState === 'loading' ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: 24, height: 24, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                      ) : (
                        <>إرسال الرسالة <Send size={20} /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
