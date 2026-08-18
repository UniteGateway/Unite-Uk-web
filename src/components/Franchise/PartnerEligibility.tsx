import React from 'react';
import {
  Users,
  Briefcase,
  Building,
  Award,
  Zap,
  CheckCircle2,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { PARTNER_PROFILES } from '../../data/franchiseData';

interface PartnerEligibilityProps {
  onApply: () => void;
}

export const PartnerEligibility: React.FC<PartnerEligibilityProps> = ({ onApply }) => {
  return (
    <section id="partner-eligibility" className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Users className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 10 // Stakeholder Inclusivity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            WHO CAN BECOME A PARTNER?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Our platform bridges commercial relationships with engineering execution. We welcome diverse professional backgrounds to build clean-energy leadership.
          </p>
        </div>

        {/* 8 Stakeholder Profiles Grid (Section 10 of Prompt 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PARTNER_PROFILES.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-[#0A1E3A] border border-line space-y-2.5 hover:border-[#7AAA2B]/60 transition-colors shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#7AAA2B] font-bold">
                    PROFILE 0{idx + 1}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#7AAA2B]" />
                </div>
                <h3 className="text-sm font-extrabold text-white uppercase font-display tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-line/60">
                <span className="text-[10px] font-mono text-slate-400">
                  Direct fit for territory leadership
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Non-Technical Engineer Statement (Mandated in Section 10) */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#040E20] border-2 border-line shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#7AAA2B]" />
            <span className="mini-tag text-slate-300 font-mono">NON-TECHNICAL INCLUSIVITY STATEMENT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-white uppercase font-display">
                YOU DO NOT NEED TO BE A TECHNICAL ENGINEER.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                You do not need to be a qualified electrical engineer to explore the business opportunity. Technical and project support is provided through the Unite Solar ecosystem, subject to the applicable operating model. Your primary focus is regional market origination, relationship development, and commercial leadership.
              </p>
            </div>

            <div className="lg:col-span-4 flex sm:justify-end">
              <button
                onClick={onApply}
                className="w-full sm:w-auto px-6 py-3 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs cursor-pointer shadow-md transition-colors"
              >
                <span>APPLY AS A PARTNER</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
