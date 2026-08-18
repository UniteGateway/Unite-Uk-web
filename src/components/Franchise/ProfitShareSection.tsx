import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  DollarSign,
  ArrowRight,
  Info,
  Scale
} from 'lucide-react';

interface ProfitShareSectionProps {
  onOpenApplication?: () => void;
}

export const ProfitShareSection: React.FC<ProfitShareSectionProps> = ({ onOpenApplication }) => {
  return (
    <section id="profit-share" className="py-16 bg-[#06152F] border-b border-line relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#7AAA2B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 03 // Commercial Alignment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            GROW TOGETHER. <br />
            <span className="bg-gradient-to-r from-white via-slate-100 to-[#7AAA2B] bg-clip-text text-transparent">
              SHARE SUCCESS.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Our interests are completely aligned. We build project value together and distribute transparent commercial returns.
          </p>
        </div>

        {/* Highlight Banner & 25% Feature Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Giant 25% Graphic Box */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-sm bg-[#040E20] border-2 border-[#7AAA2B]/60 shadow-2xl flex flex-col justify-between space-y-6 relative">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                PARTNER PARTICIPATION MODEL
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl sm:text-8xl font-black text-[#7AAA2B] font-display tracking-tight leading-none">
                  25%
                </span>
                <span className="text-xs font-mono text-slate-400">UP TO*</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display tracking-tight">
                NET PROFIT SHARE*
              </h3>
            </div>

            <p className="text-xs text-slate-300 font-light leading-relaxed border-t border-line/60 pt-4">
              Eligible franchise partners may participate in the agreed net-profit-sharing structure for business generated within their territory, subject to the franchise agreement and applicable commercial terms.
            </p>

            <div className="p-3.5 rounded-sm bg-[#06152F] border border-line text-[11px] font-mono text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Revenue Flow:</span>
                <strong className="text-white">Direct Project Billings</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Deductions:</span>
                <strong className="text-slate-400">Equipment + EPC Delivery</strong>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-1 text-[#7AAA2B]">
                <span>Net Margin Share:</span>
                <strong>Up to 25% Distributed</strong>
              </div>
            </div>

            {onOpenApplication && (
              <button
                onClick={onOpenApplication}
                className="w-full py-3 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <span>REQUEST COMMERCIAL TERMS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right: Key Pillars of Net Profit Sharing */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-5 rounded-sm bg-[#0A1E3A] border border-line space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm uppercase font-display">
                <PieChart className="w-4 h-4 text-[#7AAA2B]" />
                <span>Transparent Project Accounts</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Full line-item transparency through the CRM platform. Every project is accounted for with clear bills of materials (BOM), contractor labor, and grid interconnection costs before margin calculations.
              </p>
            </div>

            <div className="p-5 rounded-sm bg-[#0A1E3A] border border-line space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm uppercase font-display">
                <Scale className="w-4 h-4 text-[#FF6321]" />
                <span>Zero Balance-Sheet Capital Risk</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Unite Greentek Limited coordinates institutional procurement, PPA financing SPVs, and warranty underwriting, insulating the territory partner from equipment inventory risks and capital balance-sheet strain.
              </p>
            </div>

            <div className="p-5 rounded-sm bg-[#0A1E3A] border border-line space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm uppercase font-display">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Multiple Income Streams</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Earn profit share across turnkey CAPEX commercial rooftop installations, long-term PPA generation flows, BESS storage deployments, and ongoing O&M service contract renewals.
              </p>
            </div>

            {/* Mandatory Compliance Statement from Section 3 */}
            <div className="p-4 rounded-sm bg-[#040E20] border border-line flex items-start gap-3 text-xs text-slate-400">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Commercial Notice:</strong> Net profit share rates, payment milestones, and eligible project categories are defined strictly within the formal Franchise Agreement signed during onboarding. Commercial outcomes vary by project scale, complexity, and regional market conditions.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
