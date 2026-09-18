import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight, Instagram, ExternalLink } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academy';
import { Badge } from '../ui/Badge';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-navy-950 text-white pt-16 pb-20 md:pb-12 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
        
        {/* Col 1: Institute Brand & Credibility */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <Link to="/" className="inline-block self-start bg-white px-5 py-3 rounded-2xl shadow-lg border border-white/30 hover:bg-slate-50 transition-all group overflow-hidden">
            <img 
              src="/images/logo.png" 
              alt="Science Academy Logo" 
              className="h-12 sm:h-14 w-auto object-contain scale-115 origin-center transition-transform group-hover:scale-120"
            />
          </Link>

          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            Science Academy Ratlam — Premier academic institution providing rigorous coaching for Classes 9th to 12th, JEE, NEET, and Board Exams across Physics, Chemistry, Mathematics, Biology, Commerce, and Informatics Practices.
          </p>

          {/* Social & Helpline Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</span>
            </a>

            <a
              href={ACADEMY_CONFIG.verifiedContact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold hover:bg-pink-500/20 transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@scienceacademyrtm</span>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation & Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-royal-400">Quick Navigation</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-300">
            {ACADEMY_CONFIG.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="text-royal-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Both Verified Campus Locations */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-gold-400">Verified Campus Locations</h4>
          <div className="flex flex-col gap-3 text-xs text-slate-300">
            {ACADEMY_CONFIG.verifiedContact.branches.map((branch) => (
              <a
                key={branch.id}
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0B192C] border border-slate-800 rounded-xl hover:border-royal-500/50 transition-all flex flex-col gap-1 group"
              >
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="flex items-center gap-1.5 text-xs text-gold-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {branch.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 leading-normal pl-5">
                  {branch.address}
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar Copyright */}
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Science Academy Ratlam. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hover:text-slate-200 transition-colors">
            Contact Us
          </Link>
          <span className="text-slate-700">•</span>
          <a href={ACADEMY_CONFIG.verifiedContact.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
            Google Maps Location
          </a>
        </div>
      </div>
    </footer>
  );
};

