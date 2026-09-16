import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academy';
import { Badge } from '../ui/Badge';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-navy-900 text-white pt-12 pb-20 md:pb-12 px-6 md:px-12 rounded-b-none lg:rounded-b-[36px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-navy-700">
        
        {/* Col 1: Institute Brand & Credibility */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-royal-600 text-white flex items-center justify-center font-bold text-lg">
              SA
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">SCIENCE ACADEMY</h3>
              <p className="text-xs text-slate-400 font-medium">Ratlam, Madhya Pradesh, India</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-md leading-relaxed mt-1">
            Dedicated academic coaching institution focused on conceptual clarity, rigorous problem solving, and structured preparation across Physics, Chemistry, Mathematics, Biology, Commerce, and Informatics Practices.
          </p>

          <div className="flex items-center gap-2 mt-2">
            <Badge variant="navy" className="border-navy-700">
              Verified Institute Phone: {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
            </Badge>
          </div>
        </div>

        {/* Col 2: Academic Subjects */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Subjects</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-300">
            {ACADEMY_CONFIG.subjects.map((sub) => (
              <li key={sub.slug}>
                <Link
                  to={`/courses/${sub.slug}`}
                  className="hover:text-royal-50 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{sub.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Verified Contact & Address */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact & Location</h4>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            
            {/* Phone */}
            <a
              href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
              className="flex items-start gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
              <span>{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</span>
            </a>

            {/* Address with TODO_VERIFY */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span>Ratlam, Madhya Pradesh</span>
                <Badge variant="verify">
                  Address: {ACADEMY_CONFIG.verifiedContact.addressDisplay}
                </Badge>
              </div>
            </div>

            {/* Email with TODO_VERIFY */}
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <Badge variant="verify">
                  Email: {ACADEMY_CONFIG.verifiedContact.emailDisplay}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar Copyright */}
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Science Academy Ratlam. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-slate-200 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
