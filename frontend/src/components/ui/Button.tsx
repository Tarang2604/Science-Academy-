import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-600 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-royal-600 text-white hover:bg-royal-700 shadow-md hover:shadow-lg',
    secondary: 'bg-navy-900 text-white hover:bg-navy-800 shadow-md',
    outline: 'border border-slate-300 text-navy-900 hover:bg-slate-100 hover:border-slate-400',
    gold: 'bg-gold-500 text-navy-900 hover:bg-gold-600 font-semibold shadow-md',
    ghost: 'text-slate-700 hover:bg-slate-100 hover:text-navy-900',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
