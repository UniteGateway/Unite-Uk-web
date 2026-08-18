import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Sparkles,
  Sliders,
  TrendingUp,
  Cpu,
  HeartHandshake,
  Zap
} from 'lucide-react';

export const WhyUniteSolarOpportunity: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'End-to-End Capabilities',
      desc: 'Seamless execution across origination, GIS screening, land optioning, planning approval, grid interconnection, EPC construction, and asset operations.',
      icon: <Workflow className="w-5 h-5 text-[#7AAA2B]" />
    },
    {
      num: '02',
      title: 'Multi-Vector Expertise',
      desc: 'Deep technical proficiency across rooftop solar, utility solar farms, onshore wind, battery storage, and synchronized hybrid energy parks.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />
    },
    {
      num: '03',
      title: 'Commercial Flexibility',
      desc: 'Tailored contractual structures matching balance-sheet preferences — including zero-capex PPAs, RESCO service models, BOOT transfers, and turnkey capex.',
      icon: <Sliders className="w-5 h-5 text-teal-400" />
    },
    {
      num: '04',
      title: 'Strategic Capital Approach',
      desc: 'Proven financial engineering connecting institutional infrastructure capital with shovel-ready development portfolios to unlock non-recourse debt and equity.',
      icon: <TrendingUp className="w-5 h-5 text-[#FF6321]" />
    },
    {
      num: '05',
      title: 'Technical Rigour & Precision',
      desc: 'Uncompromising engineering standards utilizing PVsyst 3D modeling, ENA G99 grid compliance studies, and automated SCADA operations.',
      icon: <Cpu className="w-5 h-5 text-sky-400" />
    },
    {
      num: '06',
      title: 'Long-Term Commitment',
      desc: 'We are long-term asset partners. Our 30–40 year stewardship ensures lasting community relationships, guaranteed availability, and biodiversity gains.',
      icon: <HeartHandshake className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header from Section 22 */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 22 // Corporate Differentiation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            WHY UNITE SOLAR FOR PROJECT DEVELOPMENT?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Delivering institutionally grade renewable energy infrastructure through engineering excellence, commercial agility, and multi-decade commitment.
          </p>
        </div>

        {/* 6 Pillars Grid (Section 22 of Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="p-5 rounded-sm bg-[#06152F] border border-line space-y-3 hover:border-[#7AAA2B]/60 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-sm bg-[#0A1E3A] border border-line">
                  {p.icon}
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">{p.num}</span>
              </div>

              <h3 className="text-sm font-extrabold text-white uppercase font-display tracking-tight">
                {p.title}
              </h3>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
