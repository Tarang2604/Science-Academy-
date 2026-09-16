import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { ACADEMY_CONFIG } from '../../config/academy';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Unable to load content at this moment. Please check your network or try again.',
  onRetry,
}) => {
  return (
    <Card hoverEffect={false} className="p-8 text-center flex flex-col items-center justify-center gap-4 max-w-lg mx-auto border-rose-200 bg-rose-50/40">
      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-navy-900">Content Unavailable</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Try Again
          </Button>
        )}
        <a
          href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
          className="text-xs font-semibold text-royal-600 hover:underline"
        >
          Call {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
        </a>
      </div>
    </Card>
  );
};
