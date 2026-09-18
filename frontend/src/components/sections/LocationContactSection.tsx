import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck, ExternalLink, Clock, Building2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ACADEMY_CONFIG } from '../../config/academy';

interface LocationContactSectionProps {
  onOpenEnquiryModal: () => void;
}

export const LocationContactSection: React.FC<LocationContactSectionProps> = ({ onOpenEnquiryModal }) => {
  return (
    <section className="px-6 md:px-12 py-16 bg-slate-900 border-t border-slate-800 text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <Badge variant="royal" icon={<MapPin className="w-3.5 h-3.5" />}>
            Verified Locations & Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect with Science Academy Ratlam
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Visit our 2 verified campus branches in Ratlam, MP or call our academic office directly for admissions, batch schedules, and personal counseling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Call & Campus Locations */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Direct Click-to-Call Phone Card */}
            <Card hoverEffect={false} className="p-6 border-emerald-500/30 bg-gradient-to-r from-emerald-950/70 to-navy-950/80 flex flex-col gap-4 text-white shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Direct Admission Helpline
                  </span>
                  <a
                    href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
                    className="text-xl sm:text-2xl font-black text-white hover:text-emerald-300 transition-colors tracking-tight"
                  >
                    {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-500/20 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Mon - Sat: 8:00 AM - 8:00 PM
                </span>
                <a
                  href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-extrabold text-xs transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
              </div>
            </Card>

            {/* Both Verified Campus Branch Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACADEMY_CONFIG.verifiedContact.branches.map((branch, idx) => (
                <Card hoverEffect={false} key={branch.id} className="p-5 border-slate-800 bg-[#0B192C] flex flex-col justify-between gap-4 text-white shadow-lg">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-royal-500/20 text-royal-400 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-royal-300">
                        Campus {idx + 1}
                      </h4>
                    </div>
                    <h5 className="text-sm font-bold text-white">{branch.name.replace(/^Campus \d — /, '')}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{branch.address}</p>
                  </div>

                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-royal-600/30 hover:bg-royal-600 text-royal-200 hover:text-white border border-royal-500/30 rounded-xl text-xs font-bold transition-all w-full justify-center"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>
                </Card>
              ))}
            </div>

            {/* WhatsApp Direct Chat */}
            <a
              href={ACADEMY_CONFIG.verifiedContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-sm transition-all shadow-lg hover:shadow-emerald-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat Directly on WhatsApp</span>
            </a>

          </div>

          {/* Right Column: Google Maps Interactive Preview Box & Quick Enquiry CTA */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Card hoverEffect={false} className="p-6 bg-[#0B192C] border-slate-800 flex flex-col gap-5 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-400" />
                  <h3 className="text-base font-bold text-white">Google Verified Location</h3>
                </div>
                <Badge variant="verify">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified on Maps
                </Badge>
              </div>

              {/* Verified Map Card visual */}
              <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900 to-navy-950 border border-slate-700/80 p-6 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-royal-500/5 group-hover:bg-royal-500/10 transition-colors" />
                <div className="w-16 h-16 rounded-full bg-royal-600/30 border border-royal-500/50 text-gold-400 flex items-center justify-center shadow-xl relative z-10">
                  <MapPin className="w-8 h-8" />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <h4 className="text-lg font-black text-white">Science Academy Ratlam</h4>
                  <p className="text-xs text-slate-300 max-w-md">
                    Kasturba Nagar Main Campus & Shakti Nagar Branch Centres, Ratlam, MP 457001
                  </p>
                </div>

                <a
                  href={ACADEMY_CONFIG.verifiedContact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-royal-600 to-royal-500 hover:from-royal-500 hover:to-royal-400 text-white text-xs font-extrabold rounded-xl transition-all shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>

              {/* Quick Inquiry Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  Planning a visit? Request a call back from our counselor prior to visiting.
                </p>
                <Button variant="outline" size="sm" onClick={onOpenEnquiryModal} className="shrink-0 border-slate-700 hover:border-royal-500 text-slate-200">
                  Request Call Back
                </Button>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};

