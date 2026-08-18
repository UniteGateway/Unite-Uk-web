import React from 'react';
import {
  Layers,
  Zap,
  Sun,
  Wind,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Activity,
  Cpu,
  TrendingUp,
  BatteryCharging
} from 'lucide-react';

interface BessDevelopmentSectionProps {
  onExploreBess: () => void;
}

export const BessDevelopmentSection: React.FC<BessDevelopmentSectionProps> = ({
  onExploreBess
}) => {
  const applications = [
    {
      title: 'Grid Support & Ancillary Services',
      desc: 'Sub-second fast frequency response (Dynamic Containment, Moderation & Regulation) and Black Start readiness.',
      badge: 'National Grid ESO'
    },
    {
      title: 'Wholesale Energy Shifting',
      desc: 'Absorbing cheap off-peak renewable power and dispatching during peak market price spikes.',
      badge: 'Arbitrage Monetisation'
    },
    {
      title: 'Peak Demand & DUoS Management',
      desc: 'Shaving high industrial kVA capacity charges and Triad/red-band distribution network tariffs.',
      badge: 'Behind-the-Meter'
    },
    {
      title: 'Renewable Integration & Curtailment Avoidance',
      desc: 'Preventing wind/solar export curtailment during network constraints to monetise every generated kWh.',
      badge: 'Co-Located Asset'
    },
    {
      title: 'Commercial & Industrial Resilience',
      desc: 'Uninterruptible micro-second power supply shielding sensitive manufacturing processes from grid outages.',
      badge: 'C&I Microgrid'
    },
    {
      title: 'Utility-Scale Transmission Nodes',
      desc: 'High-voltage 33kV–132kV stand-alone storage facilities delivering stability to regional bulk supply points.',
      badge: 'Utility Scale'
    }
  ];

  return (
    <section className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 15 // Energy Storage Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            BATTERY ENERGY STORAGE PROJECTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Deploying Tier-1 liquid-cooled Lithium Iron Phosphate (LFP) battery systems across grid-connected and behind-the-meter industrial topologies.
          </p>
        </div>

        {/* Conceptual 4-Node Interactive System (SOLAR + WIND + BESS + GRID) */}
        <div className="bg-[#06152F] border border-line rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <span className="text-[10px] font-mono text-[#7AAA2B] uppercase block text-center mb-6">
            // Conceptual Synchronized 4-Vector Grid Architecture
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            
            {/* Node 1: SOLAR */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-400/15 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-400">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white uppercase block font-display">SOLAR PV</span>
              <span className="text-[10px] text-slate-400 block font-mono">Daytime Generation</span>
            </div>

            {/* Node 2: WIND */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-sky-400/15 border border-sky-400/40 flex items-center justify-center mx-auto text-sky-400">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white uppercase block font-display">WIND POWER</span>
              <span className="text-[10px] text-slate-400 block font-mono">24/7 Wind Resource</span>
            </div>

            {/* Node 3: BESS (Highlighted) */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border-2 border-[#7AAA2B] text-center space-y-2 shadow-lg shadow-[#7AAA2B]/20">
              <div className="w-12 h-12 rounded-full bg-[#7AAA2B]/20 border border-[#7AAA2B] flex items-center justify-center mx-auto text-[#7AAA2B]">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#7AAA2B] uppercase block font-display">BESS STORAGE</span>
              <span className="text-[10px] text-slate-300 block font-mono">Sub-second Buffer</span>
            </div>

            {/* Node 4: GRID */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-purple-400/15 border border-purple-400/40 flex items-center justify-center mx-auto text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white uppercase block font-display">UK NATIONAL GRID</span>
              <span className="text-[10px] text-slate-400 block font-mono">DNO / Transmission</span>
            </div>

          </div>
        </div>

        {/* 6 Applications Grid (Section 15 of Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app, idx) => (
            <div key={idx} className="p-4 rounded-sm bg-[#06152F] border border-line space-y-2 hover:border-[#7AAA2B]/60 transition-colors">
              <div className="flex items-center justify-between">
                <span className="mini-tag text-[#7AAA2B]">{app.badge}</span>
                <span className="text-[10px] font-mono text-slate-500">APP 0{idx + 1}</span>
              </div>
              <h3 className="text-sm font-extrabold text-white uppercase font-display">
                {app.title}
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {app.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <button
            id="btn-explore-bess"
            onClick={onExploreBess}
            className="px-7 py-3 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] shadow-lg transition-all flex items-center gap-2 cursor-pointer font-bold"
          >
            <Layers className="w-4 h-4" />
            <span>EXPLORE BESS OPPORTUNITIES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
