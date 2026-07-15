import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, BrainCircuit, Target, CheckCircle, FileText } from 'lucide-react';
import BookStatistics from '../ui/BookStatistics.jsx';
import statsData from '../../data/statistics.json';

export default function TrustSection() {
  return (
    <section style={{ padding: 'var(--space-30) 0', backgroundColor: 'var(--color-white)', position: 'relative', zIndex: 10 }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--color-black)', marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
            بنيت على الخبرة. صممت للنتيجة.
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', maxWidth: 650, marginInline: 'auto' }}>
            بروتوكول SMART ليس مجرد أفكار نظرية، بل هو حصيلة تحليل عميق لأخطاء الطلاب وطرق تفكيرهم.
          </p>
        </div>

        <BookStatistics stats={statsData.home.stats} />

      </div>
    </section>
  );
}
