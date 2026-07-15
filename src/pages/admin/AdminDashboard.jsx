import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  LogOut, 
  Home,
  Menu, 
  X, 
  Search, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  Eye, Trash2,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Phone,
  Users,
  Book
} from 'lucide-react';
import CommunityTab from './CommunityTab';
import DictionaryManager from './DictionaryManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'stats'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Stats State
  const [stats, setStats] = useState(null);

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchDashboardData();
  }, [page, search, statusFilter, activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Fetch stats regardless for the top cards
      const statsRes = await fetch(`${API_URL}/api/admin/statistics`, { headers });
      if (statsRes.status === 401) return handleUnauthorized();
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch orders if on orders tab
      if (activeTab === 'orders') {
        const queryParams = new URLSearchParams({
          page,
          limit: 10,
          ...(search && { search }),
          ...(statusFilter && { status: statusFilter })
        });
        
        const ordersRes = await fetch(`${API_URL}/api/admin/orders?${queryParams}`, { headers });
        if (ordersRes.status === 401) return handleUnauthorized();
        
        const ordersData = await ordersRes.json();
        setOrders(ordersData.data || []);
        setTotalPages(ordersData.totalPages || 1);
      }
      
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorized = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const updateOrderStatus = async (id, newStatus) => {
    if (!window.confirm(`هل أنت متأكد من تغيير حالة الطلب إلى ${getStatusName(newStatus)}؟`)) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Show success toast (simplified as alert for now, or just refetch)
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update status');
    }
  };

  const deleteOrderHandler = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟ لا يمكن التراجع عن هذه الخطوة.')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/orders/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to delete order');
    }
  };

  const handleLogout = () => {
    if (window.confirm('هل تريد تسجيل الخروج؟')) {
      localStorage.removeItem('adminToken');
      navigate('/admin');
    }
  };

  // -----------------------------------------------------
  // SUB-COMPONENTS
  // -----------------------------------------------------

  const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
    <div className={`stat-card ${bgColorClass}`}>
      <div className="stat-icon-wrapper" style={{ color: `var(--${colorClass})` }}>
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <h4 className="stat-title">{title}</h4>
        <h2 className="stat-value">{value}</h2>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    return (
      <span className="status-badge" style={{ backgroundColor: config.bg, color: config.color }}>
        {config.label}
      </span>
    );
  };

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------

  return (
    <div className="admin-layout">
      {/* ---------------- CSS ---------------- */}
      <style>{`
        :root {
          --admin-primary: #0f172a;
          --admin-sidebar: #020617;
          --admin-bg: #f8fafc;
          --admin-surface: #ffffff;
          --admin-border: #e2e8f0;
          --admin-text: #1e293b;
          --admin-text-light: #64748b;
          
          --color-pending: #f59e0b;
          --color-in-way: #3b82f6;
          --color-delivered: #10b981;
          --color-returned: #ef4444;
          --color-cancelled: #94a3b8;
        }
        
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: var(--admin-bg);
          direction: rtl;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* --- Sidebar --- */
        .sidebar {
          width: 260px;
          background-color: var(--admin-sidebar);
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 50;
          transition: transform 0.3s ease;
        }
        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sidebar-brand {
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
        }
        .sidebar-nav {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          color: #94a3b8;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          background: transparent;
          width: 100%;
          text-align: right;
        }
        .nav-item:hover {
          background-color: rgba(255,255,255,0.05);
          color: white;
        }
        .nav-item.active {
          background-color: #3b82f6;
          color: white;
        }
        .sidebar-footer {
          padding: 24px 16px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        /* --- Main Content --- */
        .main-content {
          flex: 1;
          margin-right: 260px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .top-navbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background-color: var(--admin-surface);
          border-bottom: 1px solid var(--admin-border);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .page-content {
          padding: 32px;
          flex: 1;
        }

        /* --- Stats Grid --- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        .stat-card {
          background-color: var(--admin-surface);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          border: 1px solid var(--admin-border);
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-title {
          font-size: 0.85rem;
          color: var(--admin-text-light);
          font-weight: 600;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--admin-text);
        }

        /* --- Toolbar --- */
        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
        }
        .search-box {
          display: flex;
          align-items: center;
          background-color: var(--admin-surface);
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          padding: 8px 16px;
          flex: 1;
          max-width: 400px;
        }
        .search-box input {
          border: none;
          outline: none;
          padding: 8px;
          width: 100%;
          background: transparent;
          font-family: inherit;
        }
        .filter-dropdown {
          padding: 12px 16px;
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          background-color: var(--admin-surface);
          font-family: inherit;
          font-weight: 600;
          color: var(--admin-text);
          outline: none;
          min-width: 150px;
        }

        /* --- Table --- */
        .table-container {
          background-color: var(--admin-surface);
          border-radius: 16px;
          border: 1px solid var(--admin-border);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          overflow: hidden;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: right;
        }
        .admin-table th {
          padding: 16px 24px;
          background-color: #f8fafc;
          color: var(--admin-text-light);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          border-bottom: 1px solid var(--admin-border);
        }
        .admin-table td {
          padding: 20px 24px;
          border-bottom: 1px solid var(--admin-border);
          color: var(--admin-text);
          font-size: 0.95rem;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .admin-table tr:hover {
          background-color: #f8fafc;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-block;
        }

        .status-select {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid var(--admin-border);
          background-color: var(--admin-surface);
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        /* --- Pagination --- */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background-color: var(--admin-surface);
          border-top: 1px solid var(--admin-border);
        }
        .page-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: var(--admin-bg);
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* --- Mobile Cards --- */
        .mobile-cards {
          display: none;
          flex-direction: column;
          gap: 16px;
        }
        .mobile-order-card {
          background-color: var(--admin-surface);
          border: 1px solid var(--admin-border);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .moc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--admin-border);
          padding-bottom: 12px;
        }
        .moc-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
        .moc-label {
          color: var(--admin-text-light);
          font-weight: 600;
        }

        /* --- Modal --- */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 24px;
        }
        .modal-content {
          background-color: var(--admin-surface);
          border-radius: 16px;
          padding: 32px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 24px;
          left: 24px;
          cursor: pointer;
          background: none;
          border: none;
          color: var(--admin-text-light);
        }
        
        /* --- Responsive --- */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            margin-right: 0;
          }
          .top-navbar {
            display: flex;
          }
          .toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            max-width: 100%;
          }
        }
        
        @media (max-width: 768px) {
          .table-container { display: none; }
          .mobile-cards { display: flex; }
          .page-content { padding: 16px; }
          .pagination { flex-direction: column; gap: 16px; }
        }
      `}</style>

      {/* ---------------- SIDEBAR ---------------- */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div style={{ backgroundColor: '#3b82f6', padding: '8px', borderRadius: '8px' }}>
            <LayoutDashboard size={24} color="white" />
          </div>
          <span className="sidebar-brand">SMART Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => { setActiveTab('orders'); setIsMobileMenuOpen(false); }}>
            <ShoppingBag size={20} />
            <span>إدارة الطلبات</span>
          </button>
          <button className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => { setActiveTab('stats'); setIsMobileMenuOpen(false); }}>
            <BarChart3 size={20} />
            <span>الإحصائيات المالية</span>
          </button>
          <button className={`nav-item ${activeTab === 'community' ? 'active' : ''}`} onClick={() => { setActiveTab('community'); setIsMobileMenuOpen(false); }}>
            <Users size={20} />
            <span>المجتمع (Community)</span>
          </button>
          <button className={`nav-item ${activeTab === 'dictionary' ? 'active' : ''}`} onClick={() => { setActiveTab('dictionary'); setIsMobileMenuOpen(false); }}>
            <Book size={20} />
            <span>قاموس الترجمة</span>
          </button>
        </nav>

        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="nav-item" onClick={() => navigate('/')} style={{ color: '#94a3b8' }}>
            <Home size={20} />
            <span>العودة للموقع</span>
          </button>
          <button className="nav-item" onClick={handleLogout} style={{ color: '#ef4444' }}>
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="main-content">
        
        <div className="top-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text)' }}>
              <Menu size={28} />
            </button>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{activeTab === 'orders' ? 'الطلبات' : activeTab === 'community' ? 'المجتمع' : activeTab === 'dictionary' ? 'قاموس الترجمة' : 'الإحصائيات'}</h2>
          </div>
          <div style={{ fontWeight: 700, color: 'var(--admin-text-light)' }}>
            مرحباً، المشرف
          </div>
        </div>

        <div className="page-content">
          
          {loading && !stats ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
              <div style={{ color: 'var(--admin-text-light)', fontWeight: 700 }}>جاري تحميل البيانات...</div>
            </div>
          ) : (
            <>
              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  
                  {/* Top Stats Cards */}
                  {stats && (
                    <div className="stats-grid">
                      <StatCard title="إجمالي الطلبات" value={stats.total_orders} icon={Package} colorClass="color-in-way" bgColorClass="" />
                      <StatCard title="الطلبات قيد الانتظار" value={stats.pending} icon={Clock} colorClass="color-pending" bgColorClass="" />
                      <StatCard title="الطلبات المشحونة" value={stats.in_way} icon={Truck} colorClass="color-in-way" bgColorClass="" />
                      <StatCard title="تم التسليم" value={stats.delivered} icon={CheckCircle} colorClass="color-delivered" bgColorClass="" />
                    </div>
                  )}

                  {/* Toolbar */}
                  <div className="toolbar">
                    <div className="search-box">
                      <Search size={20} color="var(--admin-text-light)" />
                      <input 
                        type="text" 
                        placeholder="ابحث بالاسم، الهاتف أو رقم الطلب..." 
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                      />
                    </div>
                    <select 
                      className="filter-dropdown"
                      value={statusFilter}
                      onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    >
                      <option value="">جميع الحالات</option>
                      <option value="pending">قيد الانتظار</option>
                      <option value="in_way">في الطريق</option>
                      <option value="delivered">تم التسليم</option>
                      <option value="returned">مرتجع</option>
                      <option value="cancelled">ملغى</option>
                    </select>
                  </div>

                  {/* Desktop Table */}
                  <div className="table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>رقم الطلب</th>
                          <th>العميل</th>
                          <th>الولاية / العنوان</th>
                          <th>المبلغ</th>
                          <th>الحالة</th>
                          <th>الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length > 0 ? orders.map(order => (
                          <tr key={order.id}>
                            <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{order.order_reference}</td>
                            <td>
                              <div style={{ fontWeight: 700 }}>{order.customer_name}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-light)', direction: 'ltr', textAlign: 'right' }}>{order.phone}</div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{order.wilaya}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>{order.commune}</div>
                            </td>
                            <td style={{ fontWeight: 800, color: 'var(--color-delivered)' }}>{order.total_price} دج</td>
                            <td>
                              <StatusBadge status={order.status} />
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                  onClick={() => setSelectedOrder(order)}
                                  style={{ padding: '8px', border: '1px solid var(--admin-border)', borderRadius: '6px', backgroundColor: 'var(--admin-surface)', cursor: 'pointer' }}
                                  title="عرض التفاصيل"
                                >
                                  <Eye size={18} color="var(--admin-text-light)" />
                                </button>
                                <button 
                                  onClick={() => deleteOrderHandler(order.id)}
                                  style={{ padding: '8px', border: '1px solid var(--color-returned)', borderRadius: '6px', backgroundColor: '#fee2e2', cursor: 'pointer' }}
                                  title="حذف الطلب"
                                >
                                  <Trash2 size={18} color="var(--color-returned)" />
                                </button>
                                <select 
                                  className="status-select"
                                  value={order.status} 
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                  disabled={['delivered', 'returned', 'cancelled'].includes(order.status)}
                                >
                                  <option value={order.status} hidden>{getStatusName(order.status)}</option>
                                  {order.status === 'pending' && <option value="in_way">شحن (في الطريق)</option>}
                                  {order.status === 'pending' && <option value="cancelled">إلغاء الطلب</option>}
                                  {order.status === 'in_way' && <option value="delivered">تم التسليم</option>}
                                  {order.status === 'in_way' && <option value="returned">استرجاع</option>}
                                </select>
                              </div>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="6" style={{ textAlign: 'center', padding: '48px', color: 'var(--admin-text-light)' }}>لا توجد طلبات تطابق بحثك حالياً</td></tr>
                        )}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="pagination">
                        <span style={{ fontSize: '0.9rem', color: 'var(--admin-text-light)', fontWeight: 600 }}>
                          الصفحة {page} من {totalPages}
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="page-btn" 
                            disabled={page <= 1} 
                            onClick={() => setPage(p => p - 1)}
                          >
                            <ChevronRight size={18} /> السابق
                          </button>
                          <button 
                            className="page-btn" 
                            disabled={page >= totalPages} 
                            onClick={() => setPage(p => p + 1)}
                          >
                            التالي <ChevronLeft size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Cards */}
                  <div className="mobile-cards">
                    {orders.length > 0 ? orders.map(order => (
                      <div className="mobile-order-card" key={order.id}>
                        <div className="moc-header">
                          <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{order.order_reference}</span>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className="moc-row">
                          <span className="moc-label">العميل</span>
                          <span style={{ fontWeight: 700 }}>{order.customer_name}</span>
                        </div>
                        <div className="moc-row">
                          <span className="moc-label">الهاتف</span>
                          <span style={{ direction: 'ltr' }}>{order.phone}</span>
                        </div>
                        <div className="moc-row">
                          <span className="moc-label">المبلغ</span>
                          <span style={{ fontWeight: 800, color: 'var(--color-delivered)' }}>{order.total_price} دج</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <button 
                            onClick={() => deleteOrderHandler(order.id)}
                            style={{ padding: '12px', border: '1px solid var(--color-returned)', borderRadius: '8px', backgroundColor: '#fee2e2', cursor: 'pointer', color: 'var(--color-returned)' }}
                            title="حذف الطلب"
                          >
                            <Trash2 size={20} />
                          </button>
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            style={{ flex: 1, padding: '12px', border: '1px solid var(--admin-border)', borderRadius: '8px', backgroundColor: 'var(--admin-surface)', cursor: 'pointer', fontWeight: 700, color: 'var(--admin-text-light)' }}
                          >
                            التفاصيل
                          </button>
                          <select 
                            className="status-select"
                            style={{ flex: 1 }}
                            value={order.status} 
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            disabled={['delivered', 'returned', 'cancelled'].includes(order.status)}
                          >
                            <option value={order.status} hidden>{getStatusName(order.status)}</option>
                            {order.status === 'pending' && <option value="in_way">شحن الطلب</option>}
                            {order.status === 'pending' && <option value="cancelled">إلغاء</option>}
                            {order.status === 'in_way' && <option value="delivered">تم التسليم</option>}
                            {order.status === 'in_way' && <option value="returned">استرجاع</option>}
                          </select>
                        </div>
                      </div>
                    )) : (
                      <div style={{ textAlign: 'center', padding: '48px', color: 'var(--admin-text-light)', backgroundColor: 'var(--admin-surface)', borderRadius: '16px' }}>لا توجد طلبات.</div>
                    )}
                    
                    {/* Mobile Pagination */}
                    {totalPages > 1 && (
                      <div className="pagination" style={{ border: 'none', backgroundColor: 'transparent' }}>
                        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                          <button className="page-btn" style={{ flex: 1, justifyContent: 'center' }} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                            <ChevronRight size={18} /> السابق
                          </button>
                          <button className="page-btn" style={{ flex: 1, justifyContent: 'center' }} disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                            التالي <ChevronLeft size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </motion.div>
              )}

              {activeTab === 'stats' && stats && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--admin-text)' }}>الملخص المالي العام</h2>
                  <div className="stats-grid">
                    <StatCard title="المداخيل المحصلة (تم التسليم)" value={`${stats.delivered_revenue} دج`} icon={BarChart3} colorClass="color-delivered" bgColorClass="" />
                    <StatCard title="المداخيل قيد الانتظار (في الطريق)" value={`${stats.total_expected_revenue - stats.delivered_revenue - stats.returned_amount} دج`} icon={Truck} colorClass="color-in-way" bgColorClass="" />
                    <StatCard title="خسائر التوصيل (المرتجعات)" value={`${stats.returned_amount} دج`} icon={XCircle} colorClass="color-returned" bgColorClass="" />
                  </div>
                  
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--admin-text)' }}>إحصائيات الشحن</h2>
                  <div className="stats-grid">
                    <StatCard title="إجمالي الطلبات" value={stats.total_orders} icon={Package} colorClass="color-in-way" bgColorClass="" />
                    <StatCard title="تم التسليم" value={stats.delivered} icon={CheckCircle} colorClass="color-delivered" bgColorClass="" />
                    <StatCard title="مرتجع" value={stats.returned} icon={XCircle} colorClass="color-returned" bgColorClass="" />
                    <StatCard title="ملغى" value={stats.cancelled} icon={X} colorClass="color-cancelled" bgColorClass="" />
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'community' && (
                <CommunityTab token={token} API_URL={API_URL} />
              )}
              
              {activeTab === 'dictionary' && (
                <DictionaryManager token={token} API_URL={API_URL} />
              )}
            </>
          )}

        </div>
      </main>

      {/* ---------------- MODAL ---------------- */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                <X size={24} />
              </button>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '24px' }}>تفاصيل الطلب</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h4 style={{ color: 'var(--admin-text-light)', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} /> معلومات العميل
                  </h4>
                  <div style={{ backgroundColor: 'var(--admin-bg)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--admin-text-light)' }}>الاسم:</span>
                      <span style={{ fontWeight: 700 }}>{selectedOrder.customer_name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--admin-text-light)' }}>الهاتف:</span>
                      <span style={{ fontWeight: 700, direction: 'ltr' }}>{selectedOrder.phone}</span>
                    </div>
                    {selectedOrder.email && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--admin-text-light)' }}>الإيميل:</span>
                        <span style={{ fontWeight: 700 }}>{selectedOrder.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--admin-text-light)', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} /> التوصيل
                  </h4>
                  <div style={{ backgroundColor: 'var(--admin-bg)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--admin-text-light)' }}>الولاية:</span>
                      <span style={{ fontWeight: 700 }}>{selectedOrder.wilaya}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--admin-text-light)' }}>البلدية:</span>
                      <span style={{ fontWeight: 700 }}>{selectedOrder.commune}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--admin-text-light)', display: 'block', marginBottom: '8px' }}>العنوان الكامل:</span>
                      <span style={{ fontWeight: 600, lineHeight: 1.5 }}>{selectedOrder.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--admin-text-light)', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={18} /> الطلبية
                  </h4>
                  <div style={{ backgroundColor: 'var(--admin-bg)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--admin-text-light)' }}>الرقم المرجعي:</span>
                      <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{selectedOrder.order_reference}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--admin-text-light)' }}>الكمية:</span>
                      <span style={{ fontWeight: 700 }}>{selectedOrder.quantity} كتب</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--admin-border)', paddingTop: '12px', marginTop: '4px' }}>
                      <span style={{ color: 'var(--admin-text-light)' }}>الإجمالي:</span>
                      <span style={{ fontWeight: 900, color: 'var(--color-delivered)', fontSize: '1.2rem' }}>{selectedOrder.total_price} دج</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// -----------------------------------------------------
// HELPERS
// -----------------------------------------------------

function getStatusConfig(status) {
  switch (status) {
    case 'pending': return { bg: '#fef3c7', color: '#d97706', label: 'قيد الانتظار' };
    case 'in_way': return { bg: '#dbeafe', color: '#2563eb', label: 'في الطريق' };
    case 'delivered': return { bg: '#d1fae5', color: '#059669', label: 'مستلم' };
    case 'returned': return { bg: '#fee2e2', color: '#dc2626', label: 'مرتجع' };
    case 'cancelled': return { bg: '#f1f5f9', color: '#475569', label: 'ملغى' };
    default: return { bg: '#f1f5f9', color: '#475569', label: status };
  }
}

function getStatusName(status) {
  return getStatusConfig(status).label;
}
