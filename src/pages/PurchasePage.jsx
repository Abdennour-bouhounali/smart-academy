import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PurchasePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    wilaya: '',
    commune: '',
    address: '',
    quantity: 1
  });
  const [wilayas, setWilayas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const bookPrice = 1400;
  const deliveryCost = formData.wilaya ? (formData.wilaya.includes('Alger') || formData.wilaya.includes('الجزائر') ? 400 : 600) : 0;
  const total = (bookPrice * formData.quantity) + deliveryCost;

  useEffect(() => {
    fetch(`${API_URL}/api/wilayas`)
      .then(res => res.json())
      .then(data => setWilayas(data))
      .catch(err => console.error("Failed to load wilayas"));
  }, []);

  const handleChange = (e) => {
    const value = e.target.name === 'quantity' ? parseInt(e.target.value) || 1 : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleQuantity = (delta) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/order-success', { state: { order_reference: data.order_reference } });
      } else {
        setError(data.error || 'حدث خطأ أثناء إرسال الطلب');
      }
    } catch (err) {
      setError('لا يمكن الاتصال بالخادم. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const BookPreviewContent = () => (
    <>
      <div className="book-image-container">
        <img src="/images/front-cover.webp" alt="كتاب SMART" loading="lazy" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px', color: '#1e293b' }}>كتاب SMART</h3>
        <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '16px' }}>منهجية التفكير الرياضي</p>
        <div style={{ fontWeight: 900, fontSize: '1.8rem', color: 'var(--color-accent)' }}>{bookPrice} دج</div>
      </div>
    </>
  );

  return (
    <main className="purchase-main">
      <style>{`
        .purchase-main {
          padding-top: 120px;
          padding-bottom: 80px;
          background-color: #F8FAFC;
          min-height: 100vh;
          direction: rtl;
          overflow-x: hidden;
          width: 100%;
        }
        .purchase-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .purchase-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 32px;
          align-items: start;
        }
        .col-summary {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 100px;
        }
        .col-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .p-card {
          background-color: #fff;
          padding: 32px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        }
        .book-preview-mobile {
          display: none;
        }
        .book-image-container {
          background-color: #f1f5f9;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 300px;
          margin: 0 auto 24px auto;
          aspect-ratio: 3/4;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .book-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .form-input {
          width: 100%;
          min-height: 48px;
          padding: 14px 16px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 1rem;
          font-family: inherit;
          background-color: #fff;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .form-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 8px;
          display: block;
        }
        .grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .qty-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 900;
          font-size: 1.2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .qty-btn:disabled {
          background-color: transparent;
          color: #cbd5e1;
          box-shadow: none;
          cursor: default;
        }
        .submit-btn {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 16px;
          font-size: 1.2rem;
          margin-top: 24px;
        }

        @media (max-width: 992px) {
          .purchase-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .purchase-main {
            padding-top: 80px;
            padding-bottom: 40px;
          }
          .purchase-container {
            padding: 0 16px;
          }
          .col-summary {
            order: 2;
            position: static;
          }
          .col-form {
            order: 1;
            gap: 20px;
          }
          .p-card {
            padding: 20px;
            border-radius: 20px;
          }
          .book-preview-mobile {
            display: block;
          }
          .book-preview-desktop {
            display: none;
          }
          .book-image-container {
            max-width: 240px;
            margin-bottom: 20px;
          }
          .grid-2-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="purchase-container">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, marginBottom: '12px', color: '#0F172A' }}>
            إتمام الطلب
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            أدخل معلوماتك وسنقوم بتوصيل الكتاب إلى باب منزلك - الدفع عند الاستلام
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="purchase-grid">

          {/* Right Column (Summary & Desktop Preview) - Order 1 in RTL */}
          <div className="col-summary">

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-card book-preview-desktop">
              <BookPreviewContent />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '24px', color: '#1e293b' }}>ملخص الطلب</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ fontWeight: 700, color: '#475569' }}>الكمية</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '6px' }}>
                  <button type="button" onClick={() => handleQuantity(1)} className="qty-btn">+</button>
                  <span style={{ fontWeight: 900, fontSize: '1.2rem', minWidth: '24px', textAlign: 'center' }}>{formData.quantity}</span>
                  <button type="button" onClick={() => handleQuantity(-1)} disabled={formData.quantity <= 1} className="qty-btn">-</button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '1.05rem' }}>
                  <span>الكتاب ({formData.quantity})</span>
                  <span style={{ fontWeight: 800 }}>{bookPrice * formData.quantity} دج</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '1.05rem' }}>
                  <span>التوصيل {formData.wilaya ? '' : <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>(اختر الولاية)</span>}</span>
                  <span style={{ fontWeight: 800 }}>{formData.wilaya ? `${deliveryCost} دج` : '--'}</span>
                </div>
              </div>

              <div style={{ height: '2px', backgroundColor: '#e2e8f0', margin: '20px 0', borderStyle: 'dashed' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e293b' }}>الإجمالي</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>{total} دج</span>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.wilaya}
                className="btn btn--primary submit-btn"
                style={{ opacity: (loading || !formData.wilaya) ? 0.7 : 1 }}
              >
                {loading ? 'جاري الإرسال...' : 'تأكيد الطلب'}
              </button>

              <div style={{ fontSize: '0.9rem', color: '#64748b', textAlign: 'center', marginTop: '20px', fontWeight: 700 }}>
                الدفع يتم يداً بيد عند استلام الكتاب 💵
              </div>
            </motion.div>

          </div>

          {/* Left Column (Form & Mobile Preview) - Order 2 in RTL */}
          <div className="col-form">

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-card book-preview-mobile">
              <BookPreviewContent />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-card">

              {error && (
                <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #fca5a5', fontWeight: 700 }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Section 1 */}
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '20px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ backgroundColor: '#f1f5f9', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', color: '#3b82f6' }}>1</span>
                    المعلومات الشخصية
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label className="form-label">الاسم الكامل *</label>
                      <input required name="customer_name" value={formData.customer_name} onChange={handleChange} className="form-input" placeholder="الاسم واللقب" />
                    </div>

                    <div className="grid-2-col">
                      <div>
                        <label className="form-label">رقم الهاتف *</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" style={{ direction: 'ltr', textAlign: 'right' }} placeholder="05XX XX XX XX" />
                      </div>
                      <div>
                        <label className="form-label">البريد الإلكتروني (اختياري)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="example@mail.com" />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

                {/* Section 2 */}
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '20px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ backgroundColor: '#f1f5f9', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', color: '#3b82f6' }}>2</span>
                    معلومات التوصيل
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="grid-2-col">
                      <div>
                        <label className="form-label">الولاية *</label>
                        <select required name="wilaya" value={formData.wilaya} onChange={handleChange} className="form-input">
                          <option value="">اختر الولاية</option>
                          {wilayas.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">البلدية / الدائرة *</label>
                        <input required name="commune" value={formData.commune} onChange={handleChange} className="form-input" placeholder="اسم البلدية" />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">العنوان الكامل *</label>
                      <textarea required name="address" value={formData.address} onChange={handleChange} className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="الحي، الشارع، رقم المنزل..." />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </form>
      </div>
    </main>
  );
}
