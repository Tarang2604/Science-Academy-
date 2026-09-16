import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academy';
import { Button } from '../ui/Button';

interface FloatingNavbarProps {
  onOpenEnquiryModal: () => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ onOpenEnquiryModal }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full pt-4 pb-2 px-4 md:px-8 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 p-2 bg-slate-50/90 rounded-full border border-slate-200/80 shadow-sm">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white transition-colors">
          <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            SA
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-navy-900 tracking-tight leading-none">
              SCIENCE ACADEMY
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Ratlam, MP
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1 rounded-full border border-slate-200/60">
          {ACADEMY_CONFIG.navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-navy-900 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-600 hover:text-navy-900'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-navy-900 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-royal-600" />
            <span>{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</span>
          </a>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenEnquiryModal}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Enquire Now
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-navy-900 rounded-full hover:bg-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-6xl mx-auto mt-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col gap-1">
              {ACADEMY_CONFIG.navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-navy-900 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiryModal();
                  }}
                  icon={<Sparkles className="w-4 h-4" />}
                  className="w-full"
                >
                  Enquire Now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
