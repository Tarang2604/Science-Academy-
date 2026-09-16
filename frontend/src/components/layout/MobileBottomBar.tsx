import React from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academy';

interface MobileBottomBarProps {
  onOpenEnquiryModal: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenEnquiryModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Direct Call Button */}
        <a
          href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-100 hover:bg-slate-200 text-navy-900 rounded-full text-xs font-semibold transition-colors active:scale-95"
        >
          <Phone className="w-4 h-4 text-royal-600 mb-0.5" />
          <span>Call</span>
        </a>

        {/* WhatsApp Direct Link */}
        <a
          href={ACADEMY_CONFIG.verifiedContact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs font-semibold transition-colors active:scale-95 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Quick Enquiry Trigger */}
        <button
          onClick={onOpenEnquiryModal}
          className="flex flex-col items-center justify-center py-2 px-1 bg-royal-600 hover:bg-royal-700 text-white rounded-full text-xs font-semibold transition-colors active:scale-95 shadow-sm"
        >
          <Send className="w-4 h-4 mb-0.5" />
          <span>Enquire</span>
        </button>
      </div>
    </div>
  );
};
