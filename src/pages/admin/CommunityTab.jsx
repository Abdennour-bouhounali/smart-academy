import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserCheck, MessageSquare, AlertCircle, Clock, 
  Search, Filter, Eye, Trash2, Edit, ChevronRight, ChevronLeft,
  X, CheckCircle, Mail, MapPin, Phone, Award, BookOpen
} from 'lucide-react';

export default function CommunityTab({ token, API_URL }) {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    role: '',
    wants_free_session: '',
    book_owner: ''
  });

  // Modal State
  const [selectedContact, setSelectedContact] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, search, filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Fetch Stats
      const statsRes = await fetch(`${API_URL}/api/admin/contacts/statistics`, { headers });
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }

      // Fetch Contacts
      const queryParams = new URLSearchParams({
        page, limit: 10, ...(search && { search })
      });
      Object.keys(filters).forEach(key => {
        if (filters[key]) queryParams.append(key, filters[key]);
      });

      const res = await fetch(`${API_URL}/api/admin/contacts?${queryParams}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setContacts(data.data || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchData();
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact(prev => ({ ...prev, status }));
        }
      }
    } catch (error) {
      console.error('Error updating status');
    }
  };

  const updateNotes = async () => {
    if (!selectedContact) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts/${selectedContact.id}/notes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ notes: adminNotes })
      });
      if (res.ok) {
        fetchData();
        setSelectedContact(prev => ({ ...prev, admin_notes: adminNotes }));
        alert('تم حفظ الملاحظات بنجاح');
      }
    } catch (error) {
      console.error('Error updating notes');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('هل أنت متأكد من أرشفة/حذف هذه الرسالة؟')) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Error deleting contact');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const getStatusColor = (status) => {
    const colors = {
      'NEW': '#3b82f6',
      'IN_PROGRESS': '#f59e0b',
      'REPLIED': '#10b981',
      'CLOSED': '#64748b',
      'ARCHIVED': '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'NEW': 'جديد',
      'IN_PROGRESS': 'قيد المعالجة',
      'REPLIED': 'تم الرد',
      'CLOSED': 'مغلق',
      'ARCHIVED': 'مؤرشف'
    };
    return labels[status] || status;
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
      <div style={{ width: 48, height: 48, borderRadius: '12px', backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
        <Icon size={24} />
      </div>
      <div>
        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e293b' }}>{value}</div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Stats Grid */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard title="إجمالي جهات الاتصال" value={stats.total_contacts || 0} icon={Users} color="#3b82f6" />
          <StatCard title="طلبات التوجيه (Mentoring)" value={stats.mentoring_requests || 0} icon={Award} color="#f59e0b" />
          <StatCard title="طلبات مفتوحة" value={stats.open_requests || 0} icon={AlertCircle} color="#ef4444" />
          <StatCard title="رسائل التقييم" value={stats.feedback_messages || 0} icon={MessageSquare} color="#8b5cf6" />
          <StatCard title="متوسط وقت الرد (ساعة)" value={stats.avg_response_hours || 0} icon={Clock} color="#10b981" />
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 16px', flex: '1 1 300px' }}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="ابحث بالاسم، البريد أو رقم الهاتف..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ border: 'none', outline: 'none', padding: '8px', width: '100%', background: 'transparent', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select style={filterStyle} value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option value="">كل الحالات</option>
            <option value="NEW">جديد</option>
            <option value="IN_PROGRESS">قيد المعالجة</option>
            <option value="REPLIED">تم الرد</option>
            <option value="CLOSED">مغلق</option>
          </select>

          <select style={filterStyle} value={filters.role} onChange={(e) => handleFilterChange('role', e.target.value)}>
            <option value="">كل الأدوار</option>
            <option value="Student">طالب</option>
            <option value="Teacher">أستاذ</option>
            <option value="Parent">ولي أمر</option>
          </select>

          <select style={filterStyle} value={filters.wants_free_session} onChange={(e) => handleFilterChange('wants_free_session', e.target.value)}>
            <option value="">طلب توجيه؟</option>
            <option value="true">نعم</option>
            <option value="false">لا</option>
          </select>
          
          <select style={filterStyle} value={filters.book_owner} onChange={(e) => handleFilterChange('book_owner', e.target.value)}>
            <option value="">يمتلك الكتاب؟</option>
            <option value="true">نعم</option>
            <option value="false">لا</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr>
              <th style={thStyle}>التاريخ</th>
              <th style={thStyle}>الاسم</th>
              <th style={thStyle}>الدور</th>
              <th style={thStyle}>يمتلك الكتاب / توجيه</th>
              <th style={thStyle}>الموضوع</th>
              <th style={thStyle}>الحالة</th>
              <th style={thStyle}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading && contacts.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>جاري التحميل...</td></tr>
            ) : contacts.length > 0 ? contacts.map(contact => (
              <tr key={contact.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                <td style={tdStyle}>{new Date(contact.created_at).toLocaleDateString('ar-DZ')}</td>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>{contact.full_name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{contact.email}</div>
                </td>
                <td style={tdStyle}><span style={{ padding: '4px 8px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem' }}>{contact.role}</span></td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {contact.book_owner ? <BookOpen size={18} color="#10b981" title="يمتلك الكتاب" /> : <BookOpen size={18} color="#cbd5e1" />}
                    {contact.wants_free_session && <Award size={18} color="#f59e0b" title="طلب توجيه مجاني" />}
                  </div>
                </td>
                <td style={tdStyle}>{contact.subject}</td>
                <td style={tdStyle}>
                  <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, backgroundColor: `${getStatusColor(contact.status)}20`, color: getStatusColor(contact.status) }}>
                    {getStatusLabel(contact.status)}
                  </span>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setSelectedContact(contact); setAdminNotes(contact.admin_notes || ''); }} style={{ padding: '6px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>
                      <Eye size={16} color="#64748b" />
                    </button>
                    <button onClick={() => deleteContact(contact.id)} style={{ padding: '6px', border: '1px solid #fecaca', borderRadius: '6px', background: '#fef2f2', cursor: 'pointer' }}>
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                    <select 
                      style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}
                      value={contact.status}
                      onChange={(e) => updateStatus(contact.id, e.target.value)}
                    >
                      <option value="NEW">جديد</option>
                      <option value="IN_PROGRESS">قيد المعالجة</option>
                      <option value="REPLIED">تم الرد</option>
                      <option value="CLOSED">مغلق</option>
                    </select>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>لا توجد بيانات مطابقة</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>الصفحة {page} من {totalPages}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}><ChevronRight size={18} /> السابق</button>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} style={pageBtnStyle}>التالي <ChevronLeft size={18} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedContact && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedContact(null); }}>
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ width: '100%', maxWidth: '600px', backgroundColor: 'white', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', position: 'sticky', top: 0, zIndex: 10 }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>تفاصيل التواصل</h2>
                <button onClick={() => setSelectedContact(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#64748b" /></button>
              </div>

              <div style={{ padding: '24px', flex: 1 }}>
                
                {/* Header Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: '#1e293b' }}>{selectedContact.full_name}</h3>
                    <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '0.95rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={16} /> {selectedContact.email}</span>
                      {selectedContact.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={16} /> <span dir="ltr">{selectedContact.phone}</span></span>}
                    </div>
                  </div>
                  <div>
                    <span style={{ padding: '6px 12px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 700, backgroundColor: `${getStatusColor(selectedContact.status)}20`, color: getStatusColor(selectedContact.status) }}>
                      {getStatusLabel(selectedContact.status)}
                    </span>
                  </div>
                </div>

                {/* Badges / Tags */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <span style={badgeStyle}>الدور: {selectedContact.role}</span>
                  {selectedContact.country && <span style={badgeStyle}><MapPin size={14}/> {selectedContact.country}</span>}
                  {selectedContact.book_owner && <span style={{ ...badgeStyle, backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>يمتلك الكتاب</span>}
                  {selectedContact.wants_free_session && <span style={{ ...badgeStyle, backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}><Award size={14}/> طلب توجيه مجاني</span>}

                </div>

                {/* Message */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>الرسالة: {selectedContact.subject}</h4>
                  <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', lineHeight: 1.7, color: '#1e293b', whiteSpace: 'pre-wrap' }}>
                    {selectedContact.message}
                  </div>
                </div>

                {/* Admin Actions */}
                <div style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '24px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginBottom: '16px' }}>ملاحظات المشرف (داخلية)</h4>
                  <textarea 
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="أضف ملاحظاتك هنا..."
                    rows={4}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit', marginBottom: '12px', resize: 'vertical' }}
                  />
                  <button 
                    onClick={updateNotes}
                    style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    حفظ الملاحظات
                  </button>
                </div>
                
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                   <a href={`mailto:${selectedContact.email}?subject=رد على رسالتك: ${selectedContact.subject}`} style={{ flex: 1, textAlign: 'center', backgroundColor: '#10b981', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700 }}>
                     رد عبر البريد الإلكتروني
                   </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

// Styles
const filterStyle = { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', outline: 'none', fontFamily: 'inherit', fontWeight: 600, color: '#334155' };
const thStyle = { padding: '16px 24px', backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: '0.85rem', borderBottom: '1px solid #e2e8f0' };
const tdStyle = { padding: '16px 24px', color: '#1e293b', fontSize: '0.95rem' };
const pageBtnStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' };
const badgeStyle = { display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem', color: '#475569', fontWeight: 600, border: '1px solid #e2e8f0' };
