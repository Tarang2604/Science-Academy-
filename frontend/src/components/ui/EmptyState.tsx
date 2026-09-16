import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { Badge } from './Badge';
import { Card } from './Card';
import { ACADEMY_CONFIG } from '../../config/academy';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <Card hoverEffect={false} className="p-8 text-center flex flex-col items-center justify-center gap-4 max-w-xl mx-auto border-dashed border-slate-300">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
        <Info className="w-6 h-6" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-navy-900">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">{description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <Badge variant="verify">
          Status: {ACADEMY_CONFIG.labels.contentPending}
        </Badge>
        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Verified Policy
        </span>
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 text-xs font-semibold text-royal-600 hover:underline"
        >
          {actionText}
        </button>
      )}
    </Card>
  );
};
