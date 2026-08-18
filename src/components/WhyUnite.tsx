import React from 'react';
import { Cpu, Layers, ShieldCheck, Handshake, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface WhyUniteProps {
  onOpenAssessment: () => void;
}

export const WhyUnite: React.FC<WhyUniteProps> = ({ onOpenAssessment }) => {
  const pillars = [
    {
      id: '01',
      title: 'SMART TECHNOLOGY',
      description: 'Modern renewable-energy technologies selected for performance and project requirements.',
      icon: Cpu,
      accent: '#FF6321',
      highlights: ['Tier-1 N-Type TOPCon & PERC Modules', 'Liquid-Cooled LFP Energy Storage', 'Autonomous SCADA & EMS Telemetry'],
    },
    {
      id: '02',
      title: 'FLEXIBLE MODELS',
      description: 'Multiple ways to structure renewable-energy projects.',
      icon: Layers,
      accent: '#7AAA2B',
      highlights: ['Corporate PPA (Zero Capex)', 'Direct CAPEX & Asset Ownership', 'RESCO, BOOT & Project Leasing'],
    },
    {
      id: '03',
      title: 'END-TO-END DELIVERY',
      description: 'From assessment and engineering through installation, commissioning and ongoing support.',
      icon: ShieldCheck,
      accent: '#38BDF8',
      highlights: ['Feasibility & Half-Hourly Yield Modeling', 'DNO G99 / G100 Grid Approvals', 'Turnkey EPC & Preventative O&M'],
    },
    {
      id: '04',
      title: 'LONG-TERM PARTNERSHIP',
      description: 'Built around customers, project partners and sustainable growth.',
      icon: Handshake,
      accent: '#A855F7',
      highlights: ['Performance & Yield Guarantees', 'Dedicated UK Asset Management', '25+ Year Lifecycle Stewardship'],
    },
  ];

  return (
    <section id="why-unite" className="py-24 bg-[#06152F] relative overflow-hidden border-t border-slate-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="mini-tag">Why Unite Solar</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">CORE ADVANTAGES</span>
            </div>
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            ENERGY FOR TODAY. <br />
            <span className="text-[#7AAA2B]">
              READY FOR TOMORROW.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            A disciplined, technology-first approach to UK clean energy infrastructure — delivering bankable yield, flexible commercial structuring, and decades of operational reliability.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group p-5 rounded-sm glass-dense border-line flex flex-col justify-between space-y-4 hover:border-white/30 transition-all duration-300 shadow-xl border-l-2"
                style={{ borderLeftColor: pillar.accent }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center"
                      style={{ backgroundColor: `${pillar.accent}15`, color: pillar.accent, border: `1px solid ${pillar.accent}30` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      PILLAR {pillar.id}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white font-display uppercase tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-line space-y-1.5 text-[11px]">
                  {pillar.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-[#7AAA2B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Note */}
        <div className="mt-12 p-4 rounded-sm glass-dense border-line max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Ready to assess your site's renewable capability?
            </p>
            <p className="text-[11px] text-slate-400">
              Receive a bespoke solar yield study and financial structure model.
            </p>
          </div>
          <button
            onClick={onOpenAssessment}
            className="px-5 py-2.5 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-lg"
          >
            <span>Request Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
