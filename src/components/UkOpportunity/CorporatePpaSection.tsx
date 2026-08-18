import React from 'react';
import {
  Briefcase,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Building2,
  TrendingDown,
  Lock
} from 'lucide-react';

interface CorporatePpaSectionProps {
  onRequestPpa: () => void;
}

export const CorporatePpaSection: React.FC<CorporatePpaSectionProps> = ({
  onRequestPpa
}) => {
  const models = [
    {
      code: 'PPA',
      title: 'Power Purchase Agreement',
      summary: 'Zero upfront investment. Unite installs, owns, and maintains the renewable installation. You simply purchase the generated clean electricity at a pre-agreed, discounted per-kWh tariff for 10–25 years.',
      suitability: 'High daytime energy consumers, logistics hubs, retail estates.'
    },
    {
      code: 'RESCO',
      title: 'Renewable Energy Service Co.',
      summary: 'Comprehensive Energy-as-a-Service model covering on-site solar, battery storage, and active energy management under an all-inclusive monthly performance agreement.',
      suitability: 'Industrial manufacturing facilities seeking complete operational offloading.'
    },
    {
      code: 'BOOT',
      title: 'Build-Own-Operate-Transfer',
      summary: 'Unite finances, builds, and operates the clean energy plant for an agreed concession term (typically 12–15 years), after which full asset ownership transfers to your company for £1.',
      suitability: 'Enterprises wanting long-term free energy after a structured transition period.'
    },
    {
      code: 'CAPEX',
      title: 'Direct Turnkey Purchase',
      summary: 'Direct enterprise ownership funded upfront. Maximises immediate operational cash savings, unlocks 100% first-year capital allowances / full expensing tax relief.',
      suitability: 'Organisations with dedicated capital reserves seeking maximum internal rate of return.'
    }
  ];

  return (
    <section className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header from Prompt Section 17 */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-teal-400 text-xs font-mono font-bold uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Section 17 // Commercial Offtake & Supply Structures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase leading-tight">
            POWER YOUR BUSINESS WITH <br />
            <span className="text-[#7AAA2B]">RENEWABLE ENERGY.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Unite Solar can explore structured renewable-energy supply arrangements for eligible commercial and industrial customers across the UK.
          </p>
        </div>

        {/* 4 Models Grid (Section 17) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((m, idx) => (
            <div
              key={m.code}
              className="p-5 rounded-sm bg-[#06152F] border border-line space-y-3 flex flex-col justify-between hover:border-[#7AAA2B]/60 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-[#7AAA2B] bg-[#0A1E3A] px-2.5 py-1 rounded-sm border border-line">
                    {m.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">MODEL 0{idx + 1}</span>
                </div>
                <h3 className="text-sm font-extrabold text-white uppercase font-display">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {m.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-line/60">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Best Suited For:</span>
                <span className="text-[11px] text-slate-200 block font-medium mt-0.5">{m.suitability}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Mandatory Rules: No Guaranteed Savings Claims */}
        <div className="p-4 rounded-sm bg-[#0A1E3A]/60 border border-line text-center text-xs text-slate-400">
          *All commercial terms, indicative tariffs, and PPA savings are subject to detailed credit review, facility consumption audit, structural load survey, and definitive contract execution. No guaranteed tariff rates are implied without formal proposal.
        </div>

        <div className="flex justify-center">
          <button
            id="btn-request-ppa"
            onClick={onRequestPpa}
            className="px-8 py-3.5 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] shadow-xl transition-all flex items-center gap-2 cursor-pointer font-bold"
          >
            <Briefcase className="w-4 h-4" />
            <span>REQUEST A PPA DISCUSSION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
