import React from 'react';
import {
  GitFork,
  ArrowDown,
  Building2,
  Users,
  MapPin,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const FranchiseBusinessModel: React.FC = () => {
  const steps = [
    { title: 'UNITE SOLAR', label: 'Central Operating Platform & Engineering Desk', color: 'border-[#7AAA2B] text-[#7AAA2B]' },
    { title: 'FRANCHISE PARTNER', label: 'Territory Operator & Commercial Leader', color: 'border-white text-white' },
    { title: 'TERRITORY', label: 'Exclusive County / Regional Market', color: 'border-sky-400 text-sky-400' },
    { title: 'CUSTOMERS', label: 'Commercial, Industrial & Farm Offtakers', color: 'border-amber-400 text-amber-400' },
    { title: 'PROJECTS', label: 'Turnkey Rooftops, PPAs & BESS Assets', color: 'border-purple-400 text-purple-400' },
    { title: 'REVENUE', label: 'Direct Project & PPA Cash Flow Billings', color: 'border-emerald-400 text-emerald-400' },
    { title: 'NET PROFIT SHARE*', label: 'Up to 25% Distributed to Territory Partner', color: 'border-[#FF6321] text-[#FF6321]' }
  ];

  return (
    <section id="franchise-model" className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <GitFork className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 13 // Structural Commercial Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            THE FRANCHISE BUSINESS MODEL
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            A clear commercial cascade connecting global engineering power with localized territory ownership and transparent financial returns.
          </p>
        </div>

        {/* Vertical Cascading Visual Flowchart (Section 13 of Prompt 5) */}
        <div className="flex flex-col items-center space-y-2">
          {steps.map((st, idx) => (
            <React.Fragment key={idx}>
              <div className={`w-full max-w-md p-4 rounded-sm bg-[#06152F] border-2 ${st.color} shadow-lg flex items-center justify-between`}>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Level 0{idx + 1}</span>
                  <h3 className="text-sm sm:text-base font-extrabold uppercase font-display tracking-tight">
                    {st.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-300 max-w-[200px] text-right font-light">
                  {st.label}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div className="py-0.5 text-slate-500">
                  <ArrowDown className="w-4 h-4 text-[#7AAA2B]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Legal Disclaimer Subtext */}
        <div className="p-4 rounded-sm bg-[#06152F] border border-line text-center text-xs text-slate-400 font-mono leading-relaxed">
          <span>*Actual commercial structures, performance thresholds, and net profit-sharing schedules are determined by the formal Franchise Agreement executed during onboarding.</span>
        </div>

      </div>
    </section>
  );
};
