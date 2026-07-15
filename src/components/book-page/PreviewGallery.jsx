import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['الكل', 'الأغلفة', 'المنهجية', 'الترجمة', 'التمارين'];

const images = [
  { src: '/images/front-cover.webp', alt: 'الغلاف الأمامي', category: 'الأغلفة' },
  { src: '/images/back-cover.webp', alt: 'الغلاف الخلفي', category: 'الأغلفة' },
  { src: '/images/flyer.webp', alt: 'المنشور التعريفي', category: 'الأغلفة' },
  { src: '/images/prtocole.webp', alt: 'خطوات البروتوكول', category: 'المنهجية' },
  { src: '/images/solving _techniques.webp', alt: 'تقنيات الحل', category: 'المنهجية' },
  { src: '/images/tranlation_section.webp', alt: 'قاموس الترجمة', category: 'الترجمة' },
  { src: '/images/bac_2016_exercice.webp', alt: 'تمرين بكالوريا محلول', category: 'التمارين' },
  { src: '/images/exercice_practice_protocol.webp', alt: 'تطبيق المنهجية', category: 'التمارين' },
  { src: '/images/exercies_for_problem_solving.webp', alt: 'تمارين التدريب', category: 'التمارين' },
  { src: '/images/exercies_for_problem_solving_2.webp', alt: 'تمارين التدريب (2)', category: 'التمارين' },
];

export default function PreviewGallery() {
  const [activeTab, setActiveTab] = useState('الكل');
  const [selectedImg, setSelectedImg] = useState(null);

  const filtered = images.filter(img => activeTab === 'الكل' || img.category === activeTab);

  return (
    <section id="preview" style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)', marginTop: 'var(--space-16)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', color: 'var(--color-black)' }}>تصفح محتويات الكتاب</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', maxWidth: 650, marginInline: 'auto', lineHeight: 1.6 }}>
            ألق نظرة حصرية على جودة المحتوى والتصميم الداخلي للكتاب وتأكد من أنك تقتني الأفضل.
          </p>

          <div style={{ display: 'inline-flex', gap: '6px', backgroundColor: 'var(--color-gray-100)', padding: '8px', borderRadius: '16px', marginTop: 'var(--space-8)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '10px 24px', border: 'none', borderRadius: '12px', cursor: 'pointer',
                  fontWeight: 700, fontSize: '1rem', transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  backgroundColor: activeTab === cat ? 'var(--color-white)' : 'transparent',
                  color: activeTab === cat ? 'var(--color-black)' : 'var(--color-gray-500)',
                  boxShadow: activeTab === cat ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !img.placeholder && setSelectedImg(img.src)}
                style={{ cursor: img.placeholder ? 'default' : 'zoom-in', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--color-gray-200)', backgroundColor: 'var(--color-gray-50)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
              >
                {img.placeholder ? (
                  <div style={{ color: 'var(--color-gray-400)', fontWeight: 600, fontSize: '1.125rem' }}>{img.alt} (قريباً)</div>
                ) : (
                  <>
                    <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white', fontWeight: 700, fontSize: '1.125rem', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }} className="image-overlay">
                      {img.alt}
                    </div>
                    {/* Add hover style via a style block hack or just inline events on parent */}
                    <div style={{ position: 'absolute', inset: 0, transition: 'all 0.3s', backgroundColor: 'rgba(0,0,0,0)' }} onMouseOver={e => { e.currentTarget.nextSibling.style.opacity = 1; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)' }} onMouseOut={e => { e.currentTarget.nextSibling.style.opacity = 0; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)' }}></div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white', fontWeight: 700, fontSize: '1.125rem', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
                      {img.alt}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)', cursor: 'zoom-out' }}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={selectedImg}
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
