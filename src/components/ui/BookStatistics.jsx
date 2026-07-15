import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function BookStatistics({ stats, columns = "repeat(auto-fit, minmax(240px, 1fr))", theme = "light" }) {
  const isDark = theme === "dark";

  return (
    <div style={{ display: 'grid', gridTemplateColumns: columns, gap: 'var(--space-6)' }}>
      {stats.map((stat, idx) => {
        const IconComponent = Icons[stat.icon] || Icons.CheckCircle;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            style={{
              padding: 'var(--space-8)',
              backgroundColor: isDark ? 'var(--color-gray-800)' : 'var(--color-white)',
              borderRadius: '20px',
              border: `1px solid ${isDark ? 'var(--color-gray-700)' : 'var(--color-gray-200)'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              boxShadow: isDark ? 'none' : '0 10px 30px -5px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 900, 
                color: 'var(--color-accent)', 
                fontFamily: 'var(--font-mono)', 
                lineHeight: 1 
              }}>
                {stat.number}
              </div>
              <div style={{ 
                backgroundColor: 'var(--color-accent-light)', 
                color: 'var(--color-accent)', 
                padding: '12px', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent size={24} />
              </div>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                color: isDark ? 'var(--color-white)' : 'var(--color-black)', 
                marginBottom: '8px' 
              }}>
                {stat.title}
              </h4>
              <p style={{ 
                fontSize: '0.9375rem', 
                color: isDark ? 'var(--color-gray-300)' : 'var(--color-gray-600)', 
                lineHeight: 1.5,
                fontWeight: 500
              }}>
                {stat.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
