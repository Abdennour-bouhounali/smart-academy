import React from 'react';

export default function MathBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 0.02 }}>
      {/* Clean Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      {/* Elegant Curves */}
      <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        <path d="M -100,300 C 200,100 400,600 800,300 S 1200,-100 1600,300" fill="none" stroke="black" strokeWidth="3" />
        <path d="M -100,500 C 300,700 500,200 900,400 S 1300,800 1600,400" fill="none" stroke="black" strokeWidth="1.5" />
      </svg>
      
      {/* Floating Math Symbols */}
      <div style={{ position: 'absolute', top: '15%', right: '10%', fontSize: '5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>∫</div>
      <div style={{ position: 'absolute', top: '55%', right: '85%', fontSize: '4rem', fontFamily: 'var(--font-serif)' }}>∑</div>
      <div style={{ position: 'absolute', top: '80%', right: '20%', fontSize: '6rem', fontFamily: 'var(--font-serif)' }}>π</div>
      <div style={{ position: 'absolute', top: '25%', right: '75%', fontSize: '4.5rem', fontFamily: 'var(--font-serif)' }}>∞</div>
    </div>
  );
}
