import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BrainCircuit, 
  FunctionSquare, 
  BookOpen, 
  LineChart, 
  Target, 
  Users, 
  User,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

const sidebarLinks = [
  { label: 'الرئيسية', icon: Home, href: '/home' },
  { label: 'بروتوكول SMART', icon: BrainCircuit, href: '/smart-protocol' },
  { label: 'الرياضيات', icon: FunctionSquare, href: '/bac-mathematics' },
  { label: 'قاموس الترجمة', icon: BookOpen, href: '/dictionary' },
  { label: 'ذكاء البكالوريا', icon: LineChart, href: '/bac-intelligence' },
  { label: 'تجربة الطالب', icon: Target, href: '/student-experience' },
  { label: 'المجتمع', icon: Users, href: '/community' },
  { label: 'الملف الشخصي', icon: User, href: '/profile' }
];

export default function AcademySidebar({ isCollapsed, toggleSidebar, isMobileMenuOpen, setMobileMenuOpen }) {
  
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 40, backdropFilter: 'blur(4px)' }}
        />
      )}

      <motion.aside 
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '260px',
        }}
        className={`academy-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        <div className="sidebar-header">
          <button onClick={toggleSidebar} className="collapse-btn" style={{ display: isMobileMenuOpen ? 'none' : 'flex' }}>
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title" style={{ opacity: isCollapsed ? 0 : 1 }}>مساحة التعلم</div>
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="icon-wrapper">
                <link.icon size={20} />
              </div>
              <motion.span 
                initial={false}
                animate={{ opacity: isCollapsed ? 0 : 1, display: isCollapsed ? 'none' : 'block' }}
                style={{ whiteSpace: 'nowrap' }}
              >
                {link.label}
              </motion.span>
            </NavLink>
          ))}
        </nav>

        <style>{`
          .academy-sidebar {
            background-color: #f8fafc;
            border-left: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            position: sticky;
            top: 0;
            z-index: 50;
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            overflow: hidden;
            flex-shrink: 0;
          }
          
          .sidebar-header {
            height: 60px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            border-bottom: 1px solid #e2e8f0;
          }

          .collapse-btn {
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }
          .collapse-btn:hover {
            background-color: #e2e8f0;
            color: #0f172a;
          }

          .sidebar-nav {
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            overflow-y: auto;
            flex: 1;
          }

          .nav-section-title {
            font-size: 0.75rem;
            font-weight: 700;
            color: #94a3b8;
            margin-bottom: 12px;
            padding: 0 12px;
            transition: opacity 0.2s ease;
          }

          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-radius: 8px;
            color: #475569;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          
          .sidebar-link:hover {
            background-color: #e2e8f0;
            color: #0f172a;
          }
          
          .sidebar-link.active {
            background-color: #e0e7ff;
            color: #4f46e5;
          }

          .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 24px;
            height: 24px;
          }

          @media (max-width: 992px) {
            .academy-sidebar {
              position: fixed;
              top: 0;
              right: 0;
              transform: translateX(100%);
              width: 280px !important;
              box-shadow: -10px 0 25px rgba(0,0,0,0.05);
            }
            .academy-sidebar.mobile-open {
              transform: translateX(0);
            }
            .sidebar-link span {
              display: block !important;
              opacity: 1 !important;
            }
            .nav-section-title {
              opacity: 1 !important;
            }
          }
        `}</style>
      </motion.aside>
    </>
  );
}
