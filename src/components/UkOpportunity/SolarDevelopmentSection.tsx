import React from 'react';
import {
  Sun,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Sliders
} from 'lucide-react';

interface SolarDevelopmentSectionProps {
  onDevelopSolar: () => void;
}

export const SolarDevelopmentSection: React.FC<SolarDevelopmentSectionProps> = ({
  onDevelopSolar
}) => {
  const solarPillars = [
    { label: 'Land', detail: '25–40 yr lease on Grade 3/4 agricultural or brownfield land with biodiversity net gain (+20%).' },
    { label: 'Solar Resource', detail: 'Advanced PVsyst 3D irradiance modeling and bifacial single-axis tracking optimization.' },
    { label: 'Grid', detail: '11kV/33kV G99 & transmission interconnection studies, substation routing, and contestable works.' },
    { label: 'Planning', detail: 'Turnkey LPA planning management, ecological habitat assessments, and community engagement.' },
    { label: 'Technology', detail: 'Tier-1 BloombergNEF N-type TOPCon modules, string inverters, and anti-glare coatings.' },
    { label: 'Offtake', detail: 'Long-term corporate private wire, Corporate PPA, or wholesale power trading arrangements.' },
    { label: 'Finance', detail: 'Non-recourse project finance, institutional ESG infrastructure equity, and balance sheet funding.' },
    { label: 'EPC', detail: 'Turnkey engineering, civil piling, high-voltage cabling, and CDM safety governance.' },
    { label: 'O&M', detail: '24/7 remote SCADA telemetry, drone thermal imaging, panel washing, and guaranteed availability.' }
  ];

  return (
    <section className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Image with animated solar park badge */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative rounded-sm overflow-hidden border border-line shadow-2xl group aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                alt="Utility Scale Solar Park UK Development"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-sm bg-[#06152F]/90 border border-line backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white font-mono uppercase">N-Type TOPCon Agri-PV</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7AAA2B] font-bold">~1,050 kWh/kWp</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-sm bg-[#06152F] border border-line text-[11px] text-slate-300 flex items-center justify-between">
              <span className="text-slate-400 font-mono">Indicative Asset Lifespan:</span>
              <strong className="text-white font-mono">35–40 Years Dual-Use Farmland</strong>
            </div>
          </div>

          {/* Right Column: 9-Pillar Development Engine */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Section 13 // Solar Generation Asset Development</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
                SOLAR PROJECT DEVELOPMENT
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                From landowner option agreements and planning consents to grid energisation and 40-year O&M asset stewardship.
              </p>
            </div>

            {/* 9 Pillars Grid (Section 13 of Prompt) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {solarPillars.map((p, i) => (
                <div key={i} className="p-2.5 rounded-sm bg-[#06152F] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-[#7AAA2B] font-bold uppercase block">
                    0{i + 1}. {p.label}
                  </span>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                id="btn-develop-solar"
                onClick={onDevelopSolar}
                className="px-6 py-3 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] shadow-lg transition-all flex items-center gap-2 cursor-pointer font-bold"
              >
                <Sun className="w-4 h-4 fill-current" />
                <span>DEVELOP A SOLAR PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
