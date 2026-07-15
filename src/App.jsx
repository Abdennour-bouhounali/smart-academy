import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx';
import AcademyLayout from './layouts/AcademyLayout.jsx';

// Public Pages
import Home from './pages/Home.jsx';
import ProtocolPage from './pages/ProtocolPage.jsx';
import DemoPage from './pages/DemoPage.jsx';
import BookPage from './pages/BookPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PurchasePage from './pages/PurchasePage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import LoginPage from './pages/student/LoginPage.jsx';
import RegisterPage from './pages/student/RegisterPage.jsx';

// Academy Pages
import HomePage from './pages/student/HomePage.jsx';
import DictionaryPage from './pages/DictionaryPage.jsx';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProtectedRoute from './components/admin/ProtectedRoute.jsx';

// Providers
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Helper component to redirect authenticated users away from public auth pages
function AuthRedirect({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

// Placeholder for new academy pages
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '64px', textAlign: 'center', color: '#64748b' }}>
    <h1 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '16px', fontWeight: 900 }}>{title}</h1>
    <p>هذه الصفحة قيد التطوير. سيتم إضافتها قريباً كجزء من الميزات الجديدة لأكاديمية SMART.</p>
  </div>
);

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/protocol" element={<ProtocolPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/order-success" element={<SuccessPage />} />
          <Route path="/testimonials" element={<PlaceholderPage title="آراء الطلاب" />} />
          
          <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
          <Route path="/register" element={<AuthRedirect><RegisterPage /></AuthRedirect>} />
        </Route>

        {/* ACADEMY ROUTES (Private) */}
        <Route element={<AcademyLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          
          <Route path="/smart-protocol" element={<PlaceholderPage title="بروتوكول SMART" />} />
          <Route path="/bac-mathematics" element={<PlaceholderPage title="الرياضيات" />} />
          <Route path="/bac-intelligence" element={<PlaceholderPage title="ذكاء البكالوريا" />} />
          <Route path="/student-experience" element={<PlaceholderPage title="تجربة الطالب" />} />
          <Route path="/community" element={<PlaceholderPage title="المجتمع" />} />
          <Route path="/profile" element={<PlaceholderPage title="الملف الشخصي" />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        
      </Routes>
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
