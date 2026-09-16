import React from 'react';

interface OuterCanvasProps {
  children: React.ReactNode;
}

export const OuterCanvas: React.FC<OuterCanvasProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] ambient-background-glow p-0 lg:p-6 xl:p-8 transition-all duration-300 flex flex-col">
      {/* Outer Floating Canvas: 36px desktop radius, full width edge-to-edge mobile */}
      <div className="flex-1 w-full max-w-7xl mx-auto bg-white rounded-none lg:rounded-[36px] shadow-none lg:shadow-canvas border-0 lg:border border-slate-200/80 flex flex-col overflow-visible">
        {children}
      </div>
    </div>
  );
};
