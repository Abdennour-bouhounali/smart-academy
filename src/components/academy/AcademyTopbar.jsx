import React from 'react';
import { Search, Menu, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AcademyTopbar({ toggleMobileMenu }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="academy-topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <Menu size={24} />
        </button>
        <Link to="/home" className="academy-brand">
          <img src="/images/logo.webp" alt="SMART Academy" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span>SMART Academy</span>
        </Link>
      </div>

      <div className="topbar-search">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="ابحث في الدروس، التمارين، والمصطلحات..." />
      </div>

      <div className="topbar-right">
        <div style={{ position: 'relative' }}>
          <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="avatar">
              {user?.first_name ? user.first_name.charAt(0) : 'S'}
            </div>
            <span className="profile-name">{user?.first_name} {user?.last_name}</span>
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setDropdownOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="profile-dropdown"
                >
                  <div className="dropdown-header">
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{user?.first_name} {user?.last_name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{user?.email}</div>
                  </div>
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} /> الحساب الشخصي
                  </Link>
                  <div className="dropdown-item" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <Settings size={16} /> الإعدادات (قريباً)
                  </div>
                  <div className="dropdown-divider"></div>
                  <button onClick={logout} className="dropdown-item text-danger">
                    <LogOut size={16} /> تسجيل الخروج
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .academy-topbar {
          height: 60px;
          background-color: #fff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .academy-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 900;
          font-family: var(--font-mono);
          font-size: 1.25rem;
          color: #0f172a;
          text-decoration: none;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
        }

        .topbar-search {
          flex: 1;
          max-width: 500px;
          position: relative;
          margin: 0 24px;
        }

        .topbar-search input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          background-color: #f1f5f9;
          border: 1px solid transparent;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          color: #0f172a;
        }

        .topbar-search input:focus {
          background-color: #fff;
          border-color: var(--color-accent);
          outline: none;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .topbar-search .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 24px;
          transition: background-color 0.2s ease;
        }

        .profile-btn:hover {
          background-color: #f1f5f9;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent) 0%, #3730a3 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .profile-name {
          font-weight: 600;
          color: #334155;
          display: block;
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 12px;
          background-color: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
          width: 240px;
          z-index: 100;
          overflow: hidden;
        }

        .dropdown-header {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          background-color: #f8fafc;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #475569;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: right;
          font-family: inherit;
          font-size: 0.95rem;
          transition: background-color 0.2s ease;
        }

        .dropdown-item:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .dropdown-divider {
          height: 1px;
          background-color: #e2e8f0;
          margin: 4px 0;
        }

        .text-danger {
          color: #ef4444;
        }
        .text-danger:hover {
          background-color: #fee2e2;
          color: #b91c1c;
        }

        @media (max-width: 992px) {
          .academy-topbar {
            padding: 0 16px;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .topbar-search {
            display: none;
          }
          .profile-name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
