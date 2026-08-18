import React from 'react';
import {
  Sparkles,
  Briefcase,
  Clock,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PartTimePathwaysProps {
  onSelectPathway: (pathway: string) => void;
}

export const PartTimePathways: React.FC<PartTimePathwaysProps> = ({ onSelectPathway }) => {
  const pathways = [
    {
      title: 'FULL-TIME BUSINESS',
      badge: 'DEDICATED ENTERPRISE',
      desc: 'Build a full-scale renewable-energy enterprise in your territory. Establish a dedicated commercial sales team, manage multiple installation crews, and maximize your regional market share.',
      points: [
        'Dedicated territory focus',
        'Maximum lead allocation priority',
        'Direct executive mentorship',
        'Fast-track multi-MW pipeline scaling'
      ],
      cta: 'BUILD FULL-TIME ENTERPRISE',
      highlight: true
    },
    {
      title: 'PART-TIME DEVELOPMENT',
      badge: 'FLEXIBLE ORIGINATION',
      desc: 'Develop projects alongside your existing career, property consultancy, or business activities. Originate high-ticket clean-energy opportunities while our central desk executes technical delivery.',
      points: [
        'Flexible operating schedule',
        'Zero fixed employee overhead',
        'Originate high-margin C&I deals',
        'Transition to full-time at your pace'
      ],
      cta: 'EXPLORE PART-TIME MODEL',
      highlight: false
    },
    {
      title: 'BUSINESS EXPANSION',
      badge: 'CORPORATE DIVISION',
      desc: 'Integrate Unite Solar capabilities into your existing engineering firm, roofing business, electrical contracting company, or property consultancy as a turnkey renewable energy division.',
      points: [
        'Monetise existing client relationships',
        'Instant Tier-1 OEM procurement pricing',
        'Zero-capex PPA financing options',
        'High-margin value addition to core services'
      ],
      cta: 'ADD RENEWABLES DIVISION',
      highlight: false
    }
  ];

  return (
    <section id="pathways" className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 14 // Operating Flexibility</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            BUILD IT YOUR WAY.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Choose the operational format that matches your commercial background, capital availability, and growth timeline.
          </p>
        </div>

        {/* 3 Pathways Grid (Section 14 of Prompt 5) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-sm bg-[#0A1E3A] border-2 transition-all flex flex-col justify-between space-y-6 shadow-xl relative ${
                p.highlight
                  ? 'border-[#7AAA2B] shadow-[0_0_25px_rgba(122,170,43,0.15)] bg-[#0C2242]'
                  : 'border-line hover:border-slate-600'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] font-bold">
                    {p.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-extrabold text-white uppercase font-display tracking-tight">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {p.desc}
                </p>

                <div className="space-y-2 border-t border-line/60 pt-4">
                  {p.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPathway(p.title)}
                className={`w-full py-3 rounded-sm mini-tag text-xs font-bold cursor-pointer flex items-center justify-center gap-2 transition-colors ${
                  p.highlight
                    ? 'bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] shadow-md'
                    : 'bg-[#06152F] hover:bg-[#06152F]/80 text-white border border-line'
                }`}
              >
                <span>{p.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
