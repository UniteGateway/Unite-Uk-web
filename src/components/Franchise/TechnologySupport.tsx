import React from 'react';
import {
  Cpu,
  Sun,
  Zap,
  Layers,
  Activity,
  Wind,
  ShieldCheck,
  CheckCircle2,
  PlugZap,
  Boxes
} from 'lucide-react';

export const TechnologySupport: React.FC = () => {
  const techItems = [
    {
      title: 'SOLAR MODULES',
      desc: 'N-Type TOPCon & Heterojunction (HJT) high-efficiency Tier-1 PV modules with 25–30 year performance warranties.',
      icon: <Sun className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'INVERTERS',
      desc: 'String and central high-efficiency solar inverters with automated grid dispatch and high power factor control.',
      icon: <Zap className="w-5 h-5 text-yellow-400" />
    },
    {
      title: 'BESS STORAGE',
      desc: 'Lithium Iron Phosphate (LFP) energy storage enclosures with NFPA 855 fire protection and aerosol suppression.',
      icon: <Layers className="w-5 h-5 text-[#7AAA2B]" />
    },
    {
      title: 'MOUNTING STRUCTURES',
      desc: 'Corrosion-resistant aluminium and galvanized steel ballasted roof mounts and rammed ground-mount racking.',
      icon: <Boxes className="w-5 h-5 text-slate-300" />
    },
    {
      title: 'ELECTRICAL BOS',
      desc: 'High-voltage balance-of-plant components including step-up transformers, switchgear, and armored export cables.',
      icon: <Cpu className="w-5 h-5 text-sky-400" />
    },
    {
      title: 'MONITORING & SCADA',
      desc: 'Real-time telemetry, automated fault isolation, inverter string diagnostics, and revenue-grade tariff metering.',
      icon: <Activity className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'EV CHARGING',
      desc: 'Commercial fast-charging DC hubs integrated directly with solar PV arrays and on-site BESS storage buffering.',
      icon: <PlugZap className="w-5 h-5 text-teal-400" />
    },
    {
      title: 'WIND TURBINES',
      desc: 'Direct-drive medium and utility wind turbine configurations optimized for UK wind regime classes.',
      icon: <Wind className="w-5 h-5 text-blue-400" />
    }
  ];

  return (
    <section id="technology-support" className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Cpu className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 12 // Engineering Hardware Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            TECHNOLOGY & SUPPLIER NETWORK
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Direct access to international supply chain specifications, certified balance-of-plant equipment, and rigorous engineering compliance.
          </p>
        </div>

        {/* 8 Tech Categories Grid (Section 12 of Prompt 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {techItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-[#0A1E3A] border border-line space-y-3 hover:border-[#7AAA2B]/60 transition-colors shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="p-2 rounded-sm bg-[#06152F] border border-line w-fit">
                  {item.icon}
                </div>
                <h3 className="text-sm font-extrabold text-white uppercase font-display tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-line/60 flex items-center gap-1.5 text-[10px] font-mono text-[#7AAA2B]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Central Engineering Reviewed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer on Supplier Framework */}
        <div className="p-3.5 rounded-sm bg-[#040E20] border border-line text-center text-xs text-slate-400 font-mono">
          <span>Component specifications reflect standard Tier-1 engineering frameworks utilized across Unite Greentek development portfolios.</span>
        </div>

      </div>
    </section>
  );
};
