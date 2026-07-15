import React from 'react';
import { 
  BackgroundLayer, 
  StoryHero, 
  DiagnosisJourney, 
  TransitionSection, 
  ProtocolPreview, 
  BookExperience, 
  TrustSection, 
  FinalJourneyCTA 
} from '../components/home/index.js';
import Demo from '../components/Demo.jsx';

export default function Home() {
  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-white)', overflow: 'hidden' }}>
      {/* Global Evolving Background */}
      <BackgroundLayer />

      {/* Storytelling Journey */}
      <StoryHero />
      <DiagnosisJourney />
      <TransitionSection />
      <ProtocolPreview />
      
      {/* Interactive Proof */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Demo />
      </div>
      
      {/* Solution Context & Credibility */}
      <BookExperience />
      <TrustSection />
      
      {/* Inspirational Conclusion */}
      <FinalJourneyCTA />
    </div>
  );
}
