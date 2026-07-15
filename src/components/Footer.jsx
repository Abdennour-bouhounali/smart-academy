import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { navigation } from '../data/index.js';
import { Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-gray-800)', padding: 'var(--space-16) 0 var(--space-8)' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-12)', marginBottom: 'var(--space-12)', direction: 'rtl',
        }}>
          {/* Brand */}
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.5rem', color: 'white', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)' }}>
              <img src="/images/logo.webp" alt="SMART Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              SMART
            </span>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 260 }}>
              منهجية متكاملة لحل المسائل الرياضية في البكالوريا الجزائرية.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gray-500)', marginBottom: 'var(--space-5)' }}>
              الصفحات
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {navigation.map(item => (
                <Link key={item.href} to={item.href}
                  style={{ color: 'var(--color-gray-400)', fontSize: '0.9375rem', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-gray-400)'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gray-500)', marginBottom: 'var(--space-5)' }}>
              تواصل معنا
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Link to="/contact" className="btn btn--secondary"
                style={{ color: 'var(--color-gray-400)', borderColor: 'rgba(255,255,255,0.12)', fontSize: '0.875rem', width: 'fit-content' }}
              >
                اتصل بنا
              </Link>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <a href="https://www.facebook.com/SmartMathProtocol/" target="_blank" rel="noopener noreferrer"
                   style={{ color: 'var(--color-gray-400)', transition: 'color 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.color = '#1877F2'}
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--color-gray-400)'}
                   aria-label="Facebook Page"
                >
                  <Facebook size={24} />
                </a>
                <a href="https://www.youtube.com/@SmartMathProtocol" target="_blank" rel="noopener noreferrer"
                   style={{ color: 'var(--color-gray-400)', transition: 'color 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.color = '#FF0000'}
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--color-gray-400)'}
                   aria-label="YouTube Channel"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.875rem' }}>
            أ. عبد النور · بروتوكول SMART لحل المسائل الرياضية
          </p>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
