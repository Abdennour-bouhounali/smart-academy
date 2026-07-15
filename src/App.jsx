import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import ProtocolPage from './pages/ProtocolPage.jsx';
import DictionaryPage from './pages/DictionaryPage.jsx';
import DemoPage from './pages/DemoPage.jsx';
import BookPage from './pages/BookPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PurchasePage from './pages/PurchasePage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProtectedRoute from './components/admin/ProtectedRoute.jsx';

import { AuthProvider } from './auth/AuthContext.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import LoginPage from './pages/student/LoginPage.jsx';
import RegisterPage from './pages/student/RegisterPage.jsx';
import HomePage from './pages/student/HomePage.jsx';

import ScrollToTop from './components/ScrollToTop.jsx';

import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const hideNavbarFooter = isAdminRoute || isAuthRoute;

  return (
    <>
      <ScrollToTop />
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protocol" element={<ProtocolPage />} />
        <Route path="/dictionary" element={<DictionaryPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/order-success" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        
        {/* Student Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
