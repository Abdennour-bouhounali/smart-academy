import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Plus, Edit2, Trash2, Copy, Save, X, Search, Activity, Layers, Sigma, Hash } from 'lucide-react';
import { InlineMath } from 'react-katex';

export default function DictionaryManager({ API_URL, token }) {
  const [chapters, setChapters] = defaultState([]);
  const [cards, setCards] = defaultState([]);
  const [loading, setLoading] = useState(true);
  
  // Create / Edit Modals
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  
  // Selected Chapter for filtering cards
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Default state helper
  function defaultState(initial) {
    return useState(initial);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [chaptersRes, cardsRes] = await Promise.all([
        fetch(`${API_URL}/api/dictionary/chapters`, { headers }),
        fetch(`${API_URL}/api/dictionary/cards`, { headers })
      ]);
      
      if (chaptersRes.ok && cardsRes.ok) {
        const chaptersData = await chaptersRes.json();
        const cardsData = await cardsRes.json();
        setChapters(chaptersData);
        setCards(cardsData);
        if (chaptersData.length > 0 && !selectedChapterId) {
          setSelectedChapterId(chaptersData[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch dictionary data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChapter = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      icon: formData.get('icon'),
      description: formData.get('description'),
      display_order: parseInt(formData.get('display_order')) || 0
    };

    const method = editingChapter ? 'PUT' : 'POST';
    const url = `${API_URL}/api/dictionary/chapters${editingChapter ? '/' + editingChapter.id : ''}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setShowChapterModal(false);
        setEditingChapter(null);
        fetchData();
      }
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleDeleteChapter = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الفصل؟ سيتم حذف جميع البطاقات المرتبطة به.')) return;
    try {
      const res = await fetch(`${API_URL}/api/dictionary/chapters/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        if (selectedChapterId === id) setSelectedChapterId(chapters[0]?.id || null);
        fetchData();
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleSaveCard = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      chapter_id: parseInt(formData.get('chapter_id')),
      arabic_statement: formData.get('arabic_statement'),
      mathematical_translation: formData.get('mathematical_translation'),
      meaning: formData.get('meaning'),
      example: formData.get('example'),
      keywords: formData.get('keywords'),
      difficulty: formData.get('difficulty'),
      display_order: parseInt(formData.get('display_order')) || 0
    };

    const method = editingCard ? 'PUT' : 'POST';
    const url = `${API_URL}/api/dictionary/cards${editingCard ? '/' + editingCard.id : ''}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setShowCardModal(false);
        setEditingCard(null);
        fetchData();
      }
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleDeleteCard = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه البطاقة؟')) return;
    try {
      const res = await fetch(`${API_URL}/api/dictionary/cards/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const duplicateCard = (card) => {
    const { id, created_at, updated_at, ...rest } = card;
    setEditingCard(null); // Force new
    setTimeout(() => {
      setEditingCard(rest);
      setShowCardModal(true);
    }, 0);
  };

  const filteredCards = cards.filter(c => {
    const matchesChapter = selectedChapterId === null || c.chapter_id === selectedChapterId;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      c.arabic_statement.toLowerCase().includes(q) || 
      c.mathematical_translation.toLowerCase().includes(q) ||
      (c.keywords || '').toLowerCase().includes(q);
    return matchesChapter && matchesSearch;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Chapters Management */}
      <div style={{ backgroundColor: 'var(--admin-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--admin-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>إدارة الفصول</h3>
          <button onClick={() => { setEditingChapter(null); setShowChapterModal(true); }} style={{ padding: '10px 16px', backgroundColor: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> إضافة فصل
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px' }}>
          <button 
            onClick={() => setSelectedChapterId(null)}
            style={{ padding: '12px 20px', borderRadius: '12px', fontWeight: 700, whiteSpace: 'nowrap', border: '1px solid', borderColor: selectedChapterId === null ? 'var(--color-accent)' : 'var(--admin-border)', backgroundColor: selectedChapterId === null ? 'var(--color-accent-light)' : 'var(--admin-surface)', color: selectedChapterId === null ? 'var(--color-accent)' : 'var(--admin-text)', cursor: 'pointer' }}
          >
            جميع الفصول
          </button>
          {chapters.map(chapter => (
            <div key={chapter.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: selectedChapterId === chapter.id ? 'var(--color-accent-light)' : 'var(--admin-surface)', border: '1px solid', borderColor: selectedChapterId === chapter.id ? 'var(--color-accent)' : 'var(--admin-border)', borderRadius: '12px', overflow: 'hidden' }}>
              <button 
                onClick={() => setSelectedChapterId(chapter.id)}
                style={{ padding: '12px 20px', background: 'transparent', border: 'none', fontWeight: 700, color: selectedChapterId === chapter.id ? 'var(--color-accent)' : 'var(--admin-text)', cursor: 'pointer', whiteSpace: 'nowrap', flex: 1, textAlign: 'right' }}
              >
                {chapter.name}
              </button>
              <div style={{ display: 'flex', padding: '0 8px', gap: '4px' }}>
                <button onClick={() => { setEditingChapter(chapter); setShowChapterModal(true); }} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Edit2 size={16} /></button>
                <button onClick={() => handleDeleteChapter(chapter.id)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Management */}
      <div style={{ backgroundColor: 'var(--admin-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--admin-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>البطاقات الرياضية</h3>
          <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '500px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="ابحث في البطاقات..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 40px 10px 16px', borderRadius: '8px', border: '1px solid var(--admin-border)', outline: 'none' }}
              />
            </div>
            <button onClick={() => { setEditingCard({ chapter_id: selectedChapterId || (chapters[0]?.id || '') }); setShowCardModal(true); }} style={{ padding: '10px 16px', backgroundColor: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
              <Plus size={18} /> بطاقة جديدة
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredCards.map(card => {
            const chapter = chapters.find(c => c.id === card.chapter_id);
            return (
              <div key={card.id} style={{ border: '1px solid var(--admin-border)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: '#64748b' }}>
                    {chapter?.name}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => duplicateCard(card)} style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }} title="نسخ"><Copy size={16} /></button>
                    <button onClick={() => { setEditingCard(card); setShowCardModal(true); }} style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }} title="تعديل"><Edit2 size={16} /></button>
                    <button onClick={() => handleDeleteCard(card.id)} style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }} title="حذف"><Trash2 size={16} /></button>
                  </div>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{card.arabic_statement}</div>
                <div style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)', padding: '12px', borderRadius: '8px', direction: 'ltr', textAlign: 'center', fontSize: '1.2rem' }}>
                  <InlineMath math={card.mathematical_translation} />
                </div>
                <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                  <strong>المعنى:</strong> {card.meaning}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Modal */}
      {showChapterModal && (
        <div className="modal-overlay" onClick={() => setShowChapterModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowChapterModal(false)}><X size={24} /></button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>{editingChapter ? 'تعديل فصل' : 'إضافة فصل'}</h2>
            <form onSubmit={handleSaveChapter} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>اسم الفصل</label>
                <input name="name" defaultValue={editingChapter?.name} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>الرابط (Slug)</label>
                <input name="slug" defaultValue={editingChapter?.slug} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)', direction: 'ltr' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>الأيقونة (مثال: Activity, Sigma)</label>
                <input name="icon" defaultValue={editingChapter?.icon || 'Hash'} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)', direction: 'ltr' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>الوصف</label>
                <textarea name="description" defaultValue={editingChapter?.description} rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>الترتيب</label>
                <input name="display_order" type="number" defaultValue={editingChapter?.display_order || 0} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <button type="submit" style={{ padding: '16px', backgroundColor: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '1.1rem', marginTop: '8px', cursor: 'pointer' }}>حفظ الفصل</button>
            </form>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {showCardModal && (
        <div className="modal-overlay" onClick={() => setShowCardModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close" onClick={() => setShowCardModal(false)}><X size={24} /></button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>{editingCard?.id ? 'تعديل بطاقة' : 'إضافة بطاقة'}</h2>
            <form onSubmit={handleSaveCard} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>الفصل</label>
                <select name="chapter_id" defaultValue={editingCard?.chapter_id} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                  {chapters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>العبارة باللغة العربية (السؤال)</label>
                <input name="arabic_statement" defaultValue={editingCard?.arabic_statement} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '1.1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>الترجمة الرياضية (Latex)</label>
                <input name="mathematical_translation" defaultValue={editingCard?.mathematical_translation} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)', direction: 'ltr', fontSize: '1.1rem', fontFamily: 'monospace' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>المعنى والهدف</label>
                <textarea name="meaning" defaultValue={editingCard?.meaning} required rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>مثال (اختياري)</label>
                <textarea name="example" defaultValue={editingCard?.example} rows="2" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>كلمات مفتاحية (مفصولة بفاصلة)</label>
                  <input name="keywords" defaultValue={editingCard?.keywords} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                </div>
                <div style={{ width: '150px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>الصعوبة</label>
                  <select name="difficulty" defaultValue={editingCard?.difficulty || 'Beginner'} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                    <option value="Beginner">مبتدئ</option>
                    <option value="Intermediate">متوسط</option>
                    <option value="Advanced">متقدم</option>
                  </select>
                </div>
              </div>
              <button type="submit" style={{ padding: '16px', backgroundColor: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '1.1rem', marginTop: '8px', cursor: 'pointer' }}>حفظ البطاقة</button>
            </form>
          </div>
        </div>
      )}

    </motion.div>
  );
}
