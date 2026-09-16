import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
  caption?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/90 backdrop-blur-md p-4 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
        aria-label="Close image lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-50"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-50"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div
        className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={title || 'Science Academy Gallery Image'}
          className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
        />
        {(title || caption) && (
          <div className="mt-4 text-center max-w-lg">
            {title && <h4 className="text-lg font-bold text-white">{title}</h4>}
            {caption && <p className="text-xs text-slate-300 mt-1">{caption}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
