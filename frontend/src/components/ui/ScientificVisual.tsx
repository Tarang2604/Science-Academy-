import React from 'react';

interface ScientificVisualProps {
  subject: 'physics' | 'chemistry' | 'mathematics' | 'biology' | 'commerce' | 'informatics-practices' | string;
  className?: string;
}

export const ScientificVisual: React.FC<ScientificVisualProps> = ({ subject, className = '' }) => {
  const baseClasses = `pointer-events-none select-none opacity-20 ${className}`;

  switch (subject) {
    case 'physics':
      // Atomic orbital paths & electron nodes
      return (
        <svg viewBox="0 0 200 200" className={baseClasses} fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(30 100 100)" stroke="currentColor" />
          <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(90 100 100)" stroke="currentColor" />
          <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(150 100 100)" stroke="currentColor" />
          <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.6" />
          <circle cx="170" cy="120" r="4" fill="currentColor" />
        </svg>
      );

    case 'chemistry':
      // Hexagonal molecular benzene structure
      return (
        <svg viewBox="0 0 200 200" className={baseClasses} fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="100,30 150,60 150,120 100,150 50,120 50,60" stroke="currentColor" />
          <polygon points="100,45 138,68 138,112 100,135 62,112 62,68" stroke="currentColor" strokeDasharray="4 2" />
          <circle cx="100" cy="30" r="4" fill="currentColor" />
          <circle cx="150" cy="60" r="4" fill="currentColor" />
          <circle cx="150" cy="120" r="4" fill="currentColor" />
          <circle cx="100" cy="150" r="4" fill="currentColor" />
          <circle cx="50" cy="120" r="4" fill="currentColor" />
          <circle cx="50" cy="60" r="4" fill="currentColor" />
        </svg>
      );

    case 'mathematics':
      // Sine wave & Euler summation geometry
      return (
        <svg viewBox="0 0 200 200" className={baseClasses} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 10 100 Q 50 20 100 100 T 190 100" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeDasharray="3 3" />
          <text x="75" y="160" fill="currentColor" fontSize="48" fontFamily="serif" fontWeight="bold">
            ∑
          </text>
        </svg>
      );

    case 'biology':
      // DNA double helix strand nodes
      return (
        <svg viewBox="0 0 200 200" className={baseClasses} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 30 20 Q 100 100 170 180" stroke="currentColor" strokeWidth="2" />
          <path d="M 170 20 Q 100 100 30 180" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="43" x2="150" y2="43" stroke="currentColor" />
          <line x1="75" y1="71" x2="125" y2="71" stroke="currentColor" />
          <line x1="100" y1="100" x2="100" y2="100" stroke="currentColor" />
          <line x1="75" y1="129" x2="125" y2="129" stroke="currentColor" />
          <line x1="50" y1="157" x2="150" y2="157" stroke="currentColor" />
        </svg>
      );

    case 'commerce':
      // Financial growth curve & candle geometry
      return (
        <svg viewBox="0 0 200 200" className={baseClasses} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 20 160 L 60 130 L 100 140 L 140 80 L 180 40" stroke="currentColor" strokeWidth="2.5" />
          <rect x="50" y="110" width="20" height="30" fill="currentColor" opacity="0.3" stroke="currentColor" />
          <rect x="130" y="60" width="20" height="40" fill="currentColor" opacity="0.3" stroke="currentColor" />
          <circle cx="180" cy="40" r="5" fill="currentColor" />
        </svg>
      );

    case 'informatics-practices':
      // Binary nodes & code brackets
      return (
        <svg viewBox="0 0 200 200" className={baseClasses} fill="none" stroke="currentColor" strokeWidth="1.5">
          <text x="30" y="90" fill="currentColor" fontSize="42" fontFamily="monospace" fontWeight="bold">
            &lt;/&gt;
          </text>
          <circle cx="140" cy="60" r="6" stroke="currentColor" />
          <circle cx="170" cy="110" r="6" stroke="currentColor" />
          <circle cx="130" cy="150" r="6" stroke="currentColor" />
          <line x1="140" y1="66" x2="170" y2="104" stroke="currentColor" strokeDasharray="2 2" />
          <line x1="170" y1="116" x2="136" y2="146" stroke="currentColor" strokeDasharray="2 2" />
        </svg>
      );

    default:
      return null;
  }
};
