import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  PhoneCall
} from 'lucide-react';
import { FRANCHISE_FAQS } from '../../data/franchiseData';

interface FranchiseFaqProps {
  onRequestDiscussion?: () => void;
}

export const FranchiseFaq: React.FC<FranchiseFaqProps> = ({ onRequestDiscussion }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="franchise-faq" className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 16 // Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            FRANCHISE & PARTNER FAQ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Essential information regarding territory exclusivity, £20,000 package scope, engineering backing, and profit-sharing mechanics.
          </p>
        </div>

        {/* Accordion List (10 FAQs from Section 16 of Prompt 5) */}
        <div className="space-y-3">
          {FRANCHISE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-sm bg-[#06152F] border border-line overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0A1E3A]/70 transition-colors"
                >
                  <span className="text-sm font-bold text-white uppercase font-display tracking-tight flex items-center gap-3">
                    <span className="text-xs font-mono text-[#7AAA2B]">0{idx + 1}</span>
                    <span>{faq.q}</span>
                  </span>
                  <div className="p-1 rounded-sm bg-[#0A1E3A] text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 font-light leading-relaxed border-t border-line/60 bg-[#040E20]/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Support Box */}
        {onRequestDiscussion && (
          <div className="p-6 rounded-sm bg-[#06152F] border border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <strong className="text-white block uppercase font-display">
                Have a specific territory question?
              </strong>
              <span className="text-slate-400">
                Our commercial development managers are available for direct confidential briefings.
              </span>
            </div>

            <button
              onClick={onRequestDiscussion}
              className="px-5 py-2.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SCHEDULE BRIEFING</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
