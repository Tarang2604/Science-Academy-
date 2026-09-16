import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from './Badge';

interface PageHeaderProps {
  category: string;
  title: string;
  subtitle: string;
  badgeVariant?: 'royal' | 'navy' | 'gold' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'violet';
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  title,
  subtitle,
  badgeVariant = 'royal',
  breadcrumbs = [{ label: 'Home', href: '/' }],
}) => {
  return (
    <div className="pt-8 pb-10 px-6 md:px-12 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/60 rounded-t-none lg:rounded-t-[36px]">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-navy-900 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-navy-900 font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Category Badge & Titles */}
        <div className="flex flex-col gap-2 max-w-2xl mt-1">
          <Badge variant={badgeVariant} className="w-fit">
            {category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mt-1">
            {subtitle}
          </p>
        </div>

      </div>
    </div>
  );
};
