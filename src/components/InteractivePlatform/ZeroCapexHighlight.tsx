import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, ArrowRight, CheckCircle2, Coins, TrendingUp, Building2 } from 'lucide-react';

interface ZeroCapexHighlightProps {
  onCheckEligibility: () => void;
}

export const ZeroCapexHighlight: React.FC<ZeroCapexHighlightProps> = ({ onCheckEligibility }) => {
  return (
    <section className="py-16 bg-[#0A1E3A] relative overflow-hidden border-b border-line">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#06152F] border border-line rounded-sm p-6 sm:p-10 shadow-2xl border-l-4 border-l-[#FF6321]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#FF6321]/15 border border-[#FF6321]/30 text-[#FF6321] text-xs font-bold uppercase tracking-wider">
                <Coins className="w-3.5 h-3.5" />
                <span className="mini-tag">Zero / Low-Upfront-Capital Options</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
                PAY FOR ENERGY. <br />
                <span className="text-[#FF6321]">NOT JUST EQUIPMENT.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl opacity-90">
                Eligible commercial, industrial, and institutional clients may be able to deploy multi-hundred kilowatt to multi-megawatt solar and storage assets without capital outlay. Structures such as Corporate PPA, RESCO, BOOT, or project leasing let you buy clean kilowatt-hours at agreed discounts to grid tariffs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#7AAA2B] shrink-0 mt-0.5" />
                  <span>£0 Initial Capital Required for eligible commercial sites</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#7AAA2B] shrink-0 mt-0.5" />
                  <span>Full Operations & Maintenance (O&M) included</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#7AAA2B] shrink-0 mt-0.5" />
                  <span>Immediate balance sheet and ESG carbon benefits</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0A1E3A] p-6 rounded-sm border border-line space-y-4 text-center">
              <span className="mini-tag text-slate-400 block">Commercial Assessment</span>
              <h3 className="text-lg font-bold text-white font-display">
                Are You Eligible for Zero-CAPEX Solar?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Subject to project size (typically &gt; 100 kWp), credit profile, site characteristics, and commercial terms.
              </p>

              <button
                id="zero-capex-eligibility-btn"
                type="button"
                onClick={onCheckEligibility}
                className="w-full py-3 px-5 rounded-sm mini-tag bg-[#FF6321] hover:bg-orange-600 text-white font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
              >
                <span>CHECK ELIGIBILITY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
