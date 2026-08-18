import React from 'react';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Sparkles,
  Info,
  Zap
} from 'lucide-react';
import { FRANCHISE_INVESTMENT_BREAKDOWN } from '../../data/franchiseData';

interface InvestmentSectionProps {
  onRequestDetails: () => void;
}

export const InvestmentSection: React.FC<InvestmentSectionProps> = ({ onRequestDetails }) => {
  return (
    <section id="investment-package" className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
              <Layers className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Section 04 // Entry Opportunity</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
              START YOUR JOURNEY <br />
              <span className="text-[#7AAA2B]">FROM £20,000*</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              An institutionally supported platform package designed to equip you with territory rights, complete CRM technology, branded marketing collateral, and full engineering desk access.
            </p>
          </div>

          <button
            onClick={onRequestDetails}
            className="px-6 py-3.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#06152F] fill-current" />
            <span>REQUEST FRANCHISE DETAILS</span>
          </button>
        </div>

        {/* 5-Item Package Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {FRANCHISE_INVESTMENT_BREAKDOWN.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-[#06152F] border border-line hover:border-[#7AAA2B]/60 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-tight group-hover:text-[#7AAA2B] transition-colors">
                  {item.category}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-line/60 flex items-center gap-1 text-[11px] text-[#7AAA2B] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Core Framework</span>
              </div>
            </div>
          ))}
        </div>

        {/* Compliant Subtext Disclaimer */}
        <div className="p-4 sm:p-5 rounded-sm bg-[#06152F] border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-start sm:items-center gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
              Indicative package structure — final commercial terms provided during franchise onboarding. Subject to eligibility and contract.
            </p>
          </div>

          <button
            onClick={onRequestDetails}
            className="text-xs font-bold text-[#7AAA2B] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>VIEW ONBOARDING STEPS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
