import React, { useState, useEffect } from 'react';
import { navigation } from '../data/index.js';
import { useScrollY } from '../hooks/index.js';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 40;
  const location = useLocation();
  const isAdminLoggedIn = !!localStorage.getItem('adminToken');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [mobileMenuOpen]);

  return (
    <>
      <style>
        {`
          .desktop-nav { display: none; }
          .mobile-menu-btn { display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; color: var(--color-black); padding: 8px; }
          @media (min-width: 992px) {
            .desktop-nav { display: flex; }
            .mobile-menu-btn { display: none; }
          }
        `}
      </style>

      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px 0',
          backgroundColor: scrolled || mobileMenuOpen ? 'rgba(255,255,255,0.98)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--color-gray-200)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)', color: 'var(--color-black)', zIndex: 101 }}>
            <img src="/images/logo.webp" alt="SMART Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            SMART
          </Link>

          <div className="desktop-nav" style={{ gap: 'var(--space-8)', alignItems: 'center' }}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href} style={{ fontSize: '1.05rem', fontWeight: 600, color: isActive ? 'var(--color-accent)' : 'var(--color-gray-600)', transition: 'color 0.2s' }}>
                  {item.label}
                </Link>
              );
            })}
            {isAdminLoggedIn && (
              <Link to="/admin/dashboard" className="btn" style={{ padding: '12px 20px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'var(--space-2)', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700 }}>
                لوحة التحكم <LayoutDashboard size={18} />
              </Link>
            )}
            <Link to="/purchase" className="btn btn--primary" style={{ padding: '12px 28px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'var(--space-4)' }}>
              الكتاب <ShoppingCart size={18} />
            </Link>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ zIndex: 102, position: 'relative' }}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', inset: 0, top: '68px', backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', zIndex: 99, display: 'flex', flexDirection: 'column', padding: 'var(--space-8)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href} to={item.href}
                    style={{ fontSize: '1.25rem', fontWeight: 700, padding: '16px', borderRadius: '12px', backgroundColor: isActive ? 'var(--color-accent-light)' : 'transparent', color: isActive ? 'var(--color-accent)' : 'var(--color-black)', display: 'flex', alignItems: 'center' }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div style={{ marginTop: 'auto', paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {isAdminLoggedIn && (
                <Link to="/admin/dashboard" className="btn" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.125rem', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700 }}>
                  لوحة التحكم <LayoutDashboard size={20} />
                </Link>
              )}
              <Link to="/book" className="btn btn--primary btn--large" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.125rem' }}>
                احصل على الكتاب <ShoppingCart size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
