import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineMath } from 'react-katex';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Book, ArrowDown, ShieldCheck, Mail, Activity, Layers, Sigma, Hash, X } from 'lucide-react';

export default function DictionaryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetch(`${API_URL}/dictionary/data`)
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        if (fetchedData.length > 0) {
          setActiveChapterId(fetchedData[0].id);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dictionary data:", err);
        setLoading(false);
      });
  }, [API_URL]);

  // Icon mapping helper
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Activity': return <Activity size={20} strokeWidth={2} />;
      case 'Layers': return <Layers size={20} strokeWidth={2} />;
      case 'Sigma': return <Sigma size={20} strokeWidth={2} />;
      default: return <Hash size={20} strokeWidth={2} />;
    }
  };

  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) {
      const chapter = data.find(c => c.id === activeChapterId);
      return chapter ? chapter.items : [];
    }
    
    const query = searchQuery.toLowerCase();
    const results = [];
    data.forEach(chapter => {
      chapter.items.forEach(card => {
        if (
          card.arabic_statement.toLowerCase().includes(query) ||
          card.mathematical_translation.toLowerCase().includes(query) ||
          card.keywords?.toLowerCase().includes(query)
        ) {
          results.push({ ...card, chapterName: chapter.name });
        }
      });
    });
    return results;
  }, [data, activeChapterId, searchQuery]);

  const activeChapter = data.find(c => c.id === activeChapterId);

  return (
    <div style={{ backgroundColor: '#fff', direction: 'rtl', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
      
      <style>{`
        .dictionary-layout {
          display: flex;
          flex-direction: row-reverse;
          height: 100%;
        }
        .sidebar {
          width: 320px;
          flex-shrink: 0;
          background-color: #f8fafc;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .main-content {
          flex: 1;
          overflow-y: auto;
          height: 100%;
          padding: 40px;
          scroll-behavior: smooth;
        }
        .search-container {
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background-color: #f1f5f9;
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          color: #0F172A;
        }
        .search-input:focus {
          outline: none;
          background-color: #fff;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }
        .search-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
        }
        .chapter-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }
        .chapter-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          color: #475569;
        }
        .chapter-item:hover {
          background-color: #f1f5f9;
          color: #0F172A;
        }
        .chapter-item.active {
          background-color: var(--color-accent-light);
          color: var(--color-accent);
        }
        .translation-card {
          background-color: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .translation-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08);
          border-color: var(--color-accent);
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .mobile-toggle {
          display: none;
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--color-accent);
          color: white;
          border: none;
          box-shadow: 0 10px 25px -5px rgba(0, 102, 204, 0.4);
          z-index: 50;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        @media (max-width: 992px) {
          .sidebar {
            position: fixed;
            top: 60px;
            left: 0;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: 10px 0 25px rgba(0,0,0,0.05);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            padding: 24px;
          }
          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>

      <div className="dictionary-layout">
        
        {/* Sidebar */}
        <div className={`sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
          <div className="search-container">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Book size={24} color="var(--color-accent)" />
              قاموس الترجمة
            </h2>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="ابحث عن عبارة..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="chapter-list">
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', padding: '0 16px 8px', letterSpacing: '0.05em' }}>الفصول</div>
            {data.map(chapter => (
              <div 
                key={chapter.id} 
                className={`chapter-item ${activeChapterId === chapter.id && !searchQuery ? 'active' : ''}`}
                onClick={() => {
                  setActiveChapterId(chapter.id);
                  setSearchQuery('');
                  setMobileSidebarOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getIcon(chapter.icon)}
                  {chapter.name}
                </div>
                <ChevronRight size={18} style={{ opacity: activeChapterId === chapter.id && !searchQuery ? 1 : 0.3 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: 'var(--color-gray-500)' }}>
                جاري التحميل...
              </div>
            ) : (
              <>
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={searchQuery ? 'search' : activeChapterId}
                  style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}
                >
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>
                    {searchQuery ? 'نتائج البحث' : activeChapter?.name}
                  </h1>
                  <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
                    {searchQuery 
                      ? `تم العثور على ${filteredCards.length} نتيجة مطابقة لـ "${searchQuery}"`
                      : `${activeChapter?.items.length || 0} عبارة مترجمة • ${activeChapter?.description}`
                    }
                  </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="card-grid">
                  <AnimatePresence mode="popLayout">
                    {filteredCards.map((card, idx) => (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, delay: Math.min(idx * 0.05, 0.3) }}
                        className="translation-card"
                      >
                        {searchQuery && (
                          <div style={{ alignSelf: 'flex-start', fontSize: '0.8rem', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '8px' }}>
                            {card.chapterName}
                          </div>
                        )}
                        
                        {/* Phrase */}
                        <div style={{ color: '#0F172A', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.5rem', opacity: 0.8 }}>💬</span>
                          {card.arabic_statement}
                        </div>

                        {/* Arrow */}
                        <div style={{ color: '#cbd5e1' }}>
                          <ArrowDown size={24} />
                        </div>

                        {/* Math Translation */}
                        <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-accent-light)', borderRadius: '16px', color: 'var(--color-accent)', direction: 'ltr', fontSize: '1.4rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                          <InlineMath math={card.mathematical_translation} />
                        </div>

                        {/* Arrow */}
                        <div style={{ color: '#cbd5e1' }}>
                          <ArrowDown size={24} />
                        </div>

                        {/* Meaning & Example */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                          <div style={{ color: '#334155', fontSize: '0.95rem', fontWeight: 600, backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                            <span style={{ color: '#10b981', fontWeight: 800, marginLeft: '6px' }}>المعنى:</span>
                            {card.meaning}
                          </div>
                          {card.example && (
                            <div style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 500, padding: '12px', borderRadius: '12px', backgroundColor: '#fff', border: '1px dashed #cbd5e1' }}>
                              <span style={{ color: '#8b5cf6', fontWeight: 800, marginLeft: '6px' }}>مثال بكالوريا:</span>
                              {card.example}
                            </div>
                          )}
                        </div>
                        
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {filteredCards.length === 0 && !loading && (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                    <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>لم نتمكن من إيجاد ما تبحث عنه</h3>
                    <p>جرب استخدام كلمات مفتاحية مختلفة أو تصفح الفصول مباشرة.</p>
                  </div>
                )}

              </>
            )}
            
          </div>
        </div>

        {/* Mobile Sidebar Toggle Overlay */}
        {mobileSidebarOpen && (
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 30, backdropFilter: 'blur(4px)' }}
          />
        )}

        <button className="mobile-toggle" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
          {mobileSidebarOpen ? <X size={24} /> : <Book size={24} />}
        </button>

      </div>
    </div>
  );
}
