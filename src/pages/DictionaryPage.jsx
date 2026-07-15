import React from 'react';
import TranslationDictionary from '../components/TranslationDictionary.jsx';
import FinalCTA from '../components/FinalCTA.jsx';

export default function DictionaryPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <TranslationDictionary />
      <FinalCTA />
    </main>
  );
}
