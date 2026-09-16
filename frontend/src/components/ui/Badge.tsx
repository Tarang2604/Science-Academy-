import React from 'react';

interface BadgeProps {
  variant?: 'royal' | 'navy' | 'gold' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'violet' | 'verify';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'royal',
  children,
  icon,
  className = '',
}) => {
  const variantStyles = {
    royal: 'bg-royal-50 text-royal-700 border-royal-200',
    navy: 'bg-navy-900 text-white border-navy-800',
    gold: 'bg-gold-50 text-gold-700 border-gold-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
    verify: 'bg-slate-100 text-slate-600 border-slate-300 font-mono text-[10px]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
