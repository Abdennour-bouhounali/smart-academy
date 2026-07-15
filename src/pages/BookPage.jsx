import React from 'react';
import {
  HeroSection,
  StatsSection,
  PreviewGallery,
  BookJourney,
  ComparisonSection,
  FeatureGrid,
  AuthorSection,
  Testimonials,
  BookFAQ,
  FinalCTASection
} from '../components/book-page';

export default function BookPage() {
  return (
    <main style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'var(--color-white)' }}>
      <HeroSection />
      <StatsSection />
      <PreviewGallery />
      <BookJourney />
      <ComparisonSection />
      <FeatureGrid />
      <AuthorSection />
      <Testimonials />
      <BookFAQ />
      <FinalCTASection />
    </main>
  );
}
