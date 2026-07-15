import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import { PlayCircle, FileText, Calendar, ArrowLeft, Bookmark, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-section {
          margin-bottom: 40px;
        }
        
        .welcome-title {
          font-size: 2rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .welcome-subtitle {
          color: #64748b;
          font-size: 1.1rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .dash-card {
          background-color: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 24px;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }

        .dash-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          transform: translateY(-2px);
        }

        .card-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .card-desc {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
          flex: 1;
        }

        .card-action {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-accent);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .list-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          padding: 24px;
        }

        .list-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .list-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .list-item-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          flex-shrink: 0;
        }

        .list-item-content h4 {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .list-item-content p {
          font-size: 0.85rem;
          color: #64748b;
        }

        .badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          background-color: #fef3c7;
          color: #d97706;
          margin-right: auto;
        }

        .badge-new {
          background-color: #e0e7ff;
          color: #4f46e5;
        }

        @media (max-width: 992px) {
          .dashboard-container { padding: 24px; }
          .dashboard-grid { grid-template-columns: 1fr; }
          .content-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="welcome-section">
        <h1 className="welcome-title">صباح الخير، {user?.first_name} 👋</h1>
        <p className="welcome-subtitle">مرحباً بك في مساحتك الشخصية للتعلم والتميز.</p>
      </motion.div>

      {/* Continue Learning Grid */}
      <div className="section-title">
        <PlayCircle size={24} color="var(--color-accent)" /> 
        أكمل التعلم
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
        className="dashboard-grid"
      >
        <Link to="/smart-protocol" className="dash-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
            <Lightbulb size={24} />
          </div>
          <h3 className="card-title">بروتوكول SMART</h3>
          <p className="card-desc">تعلم منهجية التفكير الرياضي وكيفية التعامل مع التمارين الصعبة.</p>
          <div className="card-action">ابدأ التعلم <ArrowLeft size={16} /></div>
        </Link>
        
        <Link to="/dictionary" className="dash-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
            <FileText size={24} />
          </div>
          <h3 className="card-title">قاموس الترجمة</h3>
          <p className="card-desc">ترجم العبارات الرياضية العربية إلى معادلات وصياغة منطقية.</p>
          <div className="card-action" style={{ color: '#db2777' }}>تصفح القاموس <ArrowLeft size={16} /></div>
        </Link>

        <Link to="/bac-intelligence" className="dash-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <TrendingUp size={24} />
          </div>
          <h3 className="card-title">ذكاء البكالوريا</h3>
          <p className="card-desc">تحليل أفكار وحيل البكالوريات السابقة لتوقع المواضيع القادمة.</p>
          <div className="card-action" style={{ color: '#16a34a' }}>اكتشف الآن <ArrowLeft size={16} /></div>
        </Link>
      </motion.div>

      {/* Main Content Grid */}
      <div className="content-grid">
        
        {/* Left Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="list-card">
            <h3 className="section-title" style={{ marginBottom: '16px' }}>مضاف حديثاً</h3>
            
            <div className="list-item">
              <div className="list-item-icon" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
                <FileText size={20} />
              </div>
              <div className="list-item-content">
                <h4>حل شامل لبكالوريا 2023</h4>
                <p>تم إضافة الحل المفصل باستخدام منهجية SMART</p>
              </div>
              <span className="badge badge-new">جديد</span>
            </div>

            <div className="list-item">
              <div className="list-item-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                <PlayCircle size={20} />
              </div>
              <div className="list-item-content">
                <h4>فيديو: كيف تتعامل مع دوال اللوغاريتم</h4>
                <p>شرح مبسط لكيفية استخراج النهايات المعقدة</p>
              </div>
              <span className="badge badge-new">جديد</span>
            </div>

            <div className="list-item">
              <div className="list-item-icon">
                <Bookmark size={20} />
              </div>
              <div className="list-item-content">
                <h4>ملخص المتتاليات</h4>
                <p>ملخص شامل لجميع قوانين وأفكار المتتاليات</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="list-card">
            <h3 className="section-title" style={{ marginBottom: '16px' }}>جلسات التوجيه</h3>
            
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#94a3b8' }}>
                <Calendar size={32} />
              </div>
              <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>جلسة مجانية</h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '24px' }}>بصفتك مالكاً للكتاب، يحق لك حجز جلسة توجيه مجانية لمدة 30 دقيقة.</p>
              <button className="btn btn--primary" style={{ width: '100%', padding: '12px' }}>حجز الجلسة الآن</button>
            </div>
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}
