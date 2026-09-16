import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 gap-4 text-center">
      <div className="w-10 h-10 border-4 border-royal-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
        Loading Science Academy Content...
      </span>
    </div>
  );
};
