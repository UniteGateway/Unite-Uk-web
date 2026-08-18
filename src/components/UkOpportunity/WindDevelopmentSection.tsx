import React, { useState } from 'react';
import {
  Wind,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  AlertCircle
} from 'lucide-react';

interface WindDevelopmentSectionProps {
  onDevelopWind: () => void;
}

export const WindDevelopmentSection: React.FC<WindDevelopmentSectionProps> = ({
  onDevelopWind
}) => {
  const [activeTab, setActiveTab] = useState<'ONSHORE' | 'OFFSHORE'>('ONSHORE');

  const windPillars = [
    { label: 'Wind Resource', detail: 'Calibrated LiDAR & anemometer meteorological mast wind regime modeling (>7.5 m/s).' },
    { label: 'Land / Seabed', detail: 'Elevated rural estate leases, forestry co-existence, and coastal cable landing corridors.' },
    { label: 'Grid', detail: 'Transmission (132kV / 275kV / 400kV) and DNO high-voltage capacity interconnection.' },
    { label: 'Planning', detail: 'Local planning approval, visual amenity (LVIA), shadow flicker, and aviation radar mitigation.' },
    { label: 'Environmental Studies', detail: 'Comprehensive ornithology flight path tracking, bat surveys, and peat management.' },
    { label: 'Technology', detail: 'Modern 4.5 MW – 7.0 MW+ direct drive low-noise turbines with smart curtailment algorithms.' },
    { label: 'Offtake', detail: 'Government CfD auction contracts, corporate virtual PPAs, and green private wire arrangements.' },
    { label: 'Finance', detail: 'Long-term infrastructure project financing, mezzanine debt, and institutional equity.' },
    { label: 'EPC & Ops', detail: 'Specialist turbine transport, heavy crane erection, and 30-year predictive O&M servicing.' }
  ];

  return (
    <section className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#0A1E3A] border border-line text-sky-400 text-xs font-mono font-bold uppercase">
              <Wind className="w-3.5 h-3.5" />
              <span>Section 14 // Wind Power Generation Asset Development</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              WIND ENERGY DEVELOPMENT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Origination, environmental permitting, turbine procurement, and grid interconnection across prime Scottish, Welsh, and English wind corridors.
            </p>
          </div>

          {/* Onshore vs Offshore Switcher */}
          <div className="flex items-center gap-2 bg-[#0A1E3A] p-1 rounded-sm border border-line">
            <button
              onClick={() => setActiveTab('ONSHORE')}
              className={`px-4 py-1.5 rounded-sm text-xs mini-tag transition-all cursor-pointer ${
                activeTab === 'ONSHORE'
                  ? 'bg-sky-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ONSHORE WIND
            </button>
            <button
              onClick={() => setActiveTab('OFFSHORE')}
              className={`px-4 py-1.5 rounded-sm text-xs mini-tag transition-all cursor-pointer ${
                activeTab === 'OFFSHORE'
                  ? 'bg-sky-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              OFFSHORE CO-DEVELOPMENT
            </button>
          </div>
        </div>

        {/* 9 Pillars Grid (Section 14 of Prompt) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {windPillars.map((p, i) => (
            <div key={i} className="p-3.5 rounded-sm bg-[#0A1E3A] border border-line space-y-1.5 hover:border-sky-400/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">
                  0{i + 1}. {p.label}
                </span>
                <Wind className="w-3 h-3 text-slate-500" />
              </div>
              <p className="text-xs text-slate-200 leading-snug">
                {p.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Assessment Requirement Note */}
        <div className="p-4 rounded-sm bg-[#040E20] border border-line flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">
              Site Suitability & Planning Governance
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              No specific site is deemed suitable for wind turbine development without rigorous on-site LiDAR anemometry, radar line-of-sight studies, environmental impact assessment (EIA), and formal DNO / National Grid ESO capacity connection offers.
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <button
            id="btn-develop-wind"
            onClick={onDevelopWind}
            className="px-6 py-3 rounded-sm mini-tag text-slate-950 bg-sky-400 hover:bg-sky-300 shadow-lg transition-all flex items-center gap-2 cursor-pointer font-bold"
          >
            <Wind className="w-4 h-4" />
            <span>EXPLORE WIND OPPORTUNITIES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
