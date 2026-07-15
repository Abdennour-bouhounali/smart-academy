import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AcademySidebar from '../components/academy/AcademySidebar';
import AcademyTopbar from '../components/academy/AcademyTopbar';
import ProtectedRoute from '../auth/ProtectedRoute';

export default function AcademyLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div style={{ display: 'flex', minHeight: '100vh', direction: 'rtl', backgroundColor: '#F8FAFC' }}>
        <AcademySidebar 
          isCollapsed={isCollapsed} 
          toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AcademyTopbar toggleMobileMenu={() => setMobileMenuOpen(true)} />
          <main style={{ flex: 1, overflowY: 'auto' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
