import React from 'react';
import { MapPin, Phone, MessageCircle, Mail, ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ACADEMY_CONFIG } from '../../config/academy';

interface LocationContactSectionProps {
  onOpenEnquiryModal: () => void;
}

export const LocationContactSection: React.FC<LocationContactSectionProps> = ({ onOpenEnquiryModal }) => {
  return (
    <section className="px-6 md:px-12 py-16 bg-white border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <Badge variant="royal" icon={<MapPin className="w-3.5 h-3.5" />}>
            Location & Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Connect with Science Academy
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Reach out directly to our academic office in Ratlam, Madhya Pradesh for admissions, batch schedules, and consultation bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Phone Card */}
            <Card hoverEffect={false} className="p-6 border-royal-200 bg-royal-50/50 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-royal-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Verified Public Phone</h4>
                  <a
                    href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
                    className="text-lg font-extrabold text-royal-600 hover:underline"
                  >
                    {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-600">Available Monday to Saturday for admission queries and academic consultation.</p>
            </Card>

            {/* Address Card */}
            <Card hoverEffect={false} className="p-6 border-slate-200 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-navy-900 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Institute Location</h4>
                  <span className="text-sm font-bold text-navy-900">617, Gali Number 6, Central Plaza Colony, Kasturba Nagar, Ratlam, MP 457001</span>
                  <Badge variant="verify" className="w-fit mt-1">
                    Verified Address
                  </Badge>
                </div>
              </div>
            </Card>

            {/* WhatsApp CTA */}
            <a
              href={ACADEMY_CONFIG.verifiedContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-sm transition-colors shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Connect on WhatsApp</span>
            </a>

          </div>

          {/* Location Map Box */}
          <div className="lg:col-span-7 h-full">
            <Card hoverEffect={false} className="p-4 bg-slate-50 border-slate-200 h-full flex flex-col justify-between gap-4">
              <div className="w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-slate-100 to-royal-50 border border-slate-300/80 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 gap-3 shadow-inner">
                <div className="w-14 h-14 rounded-full bg-navy-900 text-white flex items-center justify-center shadow-lg">
                  <MapPin className="w-7 h-7 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-navy-900">Science Academy Ratlam</h4>
                  <p className="text-xs text-slate-600 max-w-sm mt-1">
                    617, Gali Number 6, Central Plaza Colony, Kasturba Nagar, Ratlam, Madhya Pradesh 457001, India
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/MsJqrRB5f67cSFyJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold rounded-full transition-colors shadow-md mt-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Location: Kasturba Nagar, Ratlam, MP
                </span>
                <Button variant="ghost" size="sm" onClick={onOpenEnquiryModal} icon={<ExternalLink className="w-3.5 h-3.5" />}>
                  Enquire Office Visit
                </Button>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};
