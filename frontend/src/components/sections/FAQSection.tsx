import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { ACADEMY_CONFIG } from '../../config/academy';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which subjects are taught at Science Academy Ratlam?',
      a: 'Science Academy offers structured conceptual coaching across 6 core disciplines: Physics, Chemistry, Mathematics, Biology, Commerce (Accountancy & Business Studies), and Informatics Practices.',
    },
    {
      q: 'Which classes are eligible for enrolment?',
      a: 'We offer courses tailored for Class 11, Class 12, and Target (Dropper/Competitive Revision) batches.',
    },
    {
      q: 'How are doubt sessions conducted for individual students?',
      a: 'In addition to classroom teaching, dedicated 1:1 doubt resolution slots are available where students can review worksheets and test papers with faculty members without hesitation.',
    },
    {
      q: 'How can parents track their child’s academic progress?',
      a: 'Parents receive regular test score updates, attendance notifications, and periodic academic feedback sessions with faculty.',
    },
    {
      q: 'What is the procedure for booking a 1-on-1 Academic Consultation?',
      a: 'You can complete our 4-Step Consultation Wizard on this website or call our verified institute contact directly at +91 78281 21320.',
    },
    {
      q: 'Where is Science Academy located in Ratlam?',
      a: 'Science Academy is located in Ratlam, Madhya Pradesh. Exact street address and office location details can be verified by calling +91 78281 21320.',
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <Badge variant="cyan" icon={<HelpCircle className="w-3.5 h-3.5" />}>
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Clear Answers to Common Questions
          </h2>
          <p className="text-sm text-slate-600 max-w-lg leading-relaxed">
            Everything you need to know about our teaching methodology, course offerings, and admission procedure.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-[20px] border border-slate-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-navy-900 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-600 rounded-[20px]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white text-navy-900 flex items-center justify-center shrink-0 border border-slate-200 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-navy-900 text-white border-navy-900' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="p-4 rounded-2xl bg-slate-100 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Have additional questions? Call our verified institute contact: <strong>{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</strong></span>
          </span>
          <a
            href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
            className="px-4 py-2 bg-navy-900 text-white rounded-full text-xs font-semibold hover:bg-navy-800 transition-colors shrink-0"
          >
            Call Now
          </a>
        </div>

      </div>
    </section>
  );
};
