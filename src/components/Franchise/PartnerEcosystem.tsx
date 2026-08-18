import React from 'react';
import {
  Globe2,
  Users,
  Building2,
  Cpu,
  Coins,
  Wrench,
  Compass,
  TrendingUp,
  MapPin,
  Sparkles,
  Zap
} from 'lucide-react';
import { UniteSolarLogo } from '../UniteLogos';

export const PartnerEcosystem: React.FC = () => {
  const nodes = [
    { name: 'CUSTOMERS', desc: 'Commercial & Industrial Offtakers', icon: <Building2 className="w-4 h-4 text-sky-400" /> },
    { name: 'LANDOWNERS', desc: 'Agricultural & Estate Leases', icon: <MapPin className="w-4 h-4 text-[#7AAA2B]" /> },
    { name: 'EPC PARTNERS', desc: 'Civil & Electrical Contractors', icon: <Wrench className="w-4 h-4 text-amber-400" /> },
    { name: 'TECHNOLOGY SUPPLIERS', desc: 'Tier-1 Modules, Inverters & BESS', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
    { name: 'FINANCE', desc: 'Non-Recourse Debt & PPA Capital', icon: <Coins className="w-4 h-4 text-emerald-400" /> },
    { name: 'INSTALLERS', desc: 'Accredited Regional Crews', icon: <Zap className="w-4 h-4 text-yellow-400" /> },
    { name: 'CONSULTANTS', desc: 'Planning, DNO & Environmental', icon: <Compass className="w-4 h-4 text-teal-400" /> },
    { name: 'INVESTORS', desc: 'SPV Co-Investment & Equity', icon: <TrendingUp className="w-4 h-4 text-[#FF6321]" /> },
    { name: 'FRANCHISE PARTNERS', desc: 'Territory Commercial Leaders', icon: <Users className="w-4 h-4 text-[#7AAA2B]" /> }
  ];

  return (
    <section id="partner-ecosystem" className="py-16 bg-[#040E20] border-b border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Globe2 className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 11 // Connected Partner Network</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            ONE NETWORK. <br />
            <span className="text-[#7AAA2B]">MANY OPPORTUNITIES.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            As a territory partner, you sit at the epicenter of an interconnected renewable-energy ecosystem backed by global supply lines and institutional capital.
          </p>
        </div>

        {/* Centralized Network Diagram Graphic */}
        <div className="p-8 sm:p-12 rounded-sm bg-[#06152F] border border-line shadow-2xl relative">
          
          {/* Subtle connecting lines behind */}
          <div className="absolute inset-0 bg-[radial-gradient(#7AAA2B15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />

          {/* Central Hub */}
          <div className="flex flex-col items-center justify-center text-center max-w-xs mx-auto p-6 rounded-sm bg-[#0A1E3A] border-2 border-[#7AAA2B] shadow-[0_0_30px_rgba(122,170,43,0.2)] mb-10 relative z-10">
            <div className="p-2 rounded-full bg-[#06152F] border border-[#7AAA2B]/60 mb-2">
              <Sparkles className="w-6 h-6 text-[#7AAA2B] animate-pulse" />
            </div>
            <span className="text-xs font-mono font-bold uppercase text-[#7AAA2B]">CENTRAL PLATFORM</span>
            <h3 className="text-lg font-black text-white uppercase font-display tracking-tight mt-0.5">
              UNITE SOLAR
            </h3>
            <span className="text-[10px] font-mono text-slate-400 mt-1">
              Unite Greentek Limited (UK)
            </span>
          </div>

          {/* 9 Surrounding Nodes Grid (Section 11 of Prompt 5) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {nodes.map((node, idx) => (
              <div
                key={idx}
                className="p-4 rounded-sm bg-[#0A1E3A] border border-line hover:border-[#7AAA2B]/60 transition-all flex items-start gap-3 group"
              >
                <div className="p-2 rounded-sm bg-[#06152F] border border-line shrink-0 group-hover:border-[#7AAA2B]/40 transition-colors">
                  {node.icon}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[#7AAA2B] font-bold">NODE 0{idx + 1}</span>
                  <h4 className="text-xs font-extrabold text-white uppercase font-display tracking-tight">
                    {node.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 font-light leading-snug">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
