import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-white rounded-[24px] border border-slate-200/80 p-6 md:p-8 shadow-card transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-lg hover:-translate-y-1 hover:border-slate-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
