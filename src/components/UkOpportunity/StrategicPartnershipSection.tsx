import React from 'react';
import {
  LandPlot,
  TrendingUp,
  Building2,
  Users,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Award
} from 'lucide-react';

interface StrategicPartnershipSectionProps {
  onSelectRole: (role: 'LANDOWNER' | 'INVESTOR' | 'BUSINESS' | 'DEVELOPER') => void;
}

export const StrategicPartnershipSection: React.FC<StrategicPartnershipSectionProps> = ({
  onSelectRole
}) => {
  const partners = [
    {
      role: 'LANDOWNERS',
      title: 'Agricultural & Estate Landowners',
      desc: 'Monetise lower-yield acreage with stable 30–40 year index-linked lease income, zero capex, and biodiversity net gain stewardship.',
      key: 'LANDOWNER' as const
    },
    {
      role: 'INVESTORS',
      title: 'Infrastructure & Institutional Funds',
      desc: 'Participate in bankable, shovel-ready UK clean energy SPVs structured to deliver steady long-term ESG yields.',
      key: 'INVESTOR' as const
    },
    {
      role: 'COMMERCIAL CLIENTS',
      title: 'Commercial & Industrial Enterprises',
      desc: 'Lock in discounted daytime clean electricity without balance-sheet capital outlay via zero-capex Corporate PPAs.',
      key: 'BUSINESS' as const
    },
    {
      role: 'PROJECT DEVELOPERS',
      title: 'Developers & Regional EPCs',
      desc: 'Accelerate stalled pipeline assets through joint-venture co-development, balance sheet funding, and equipment procurement.',
      key: 'DEVELOPER' as const
    },
    {
      role: 'LOCAL AUTHORITIES',
      title: 'Public Sector & Municipalities',
      desc: 'Structure Net Zero public decarbonisation pathways, council estate rooftop solar, and community energy hubs.',
      key: 'DEVELOPER' as const
    },
    {
      role: 'EPC & SUPPLIERS',
      title: 'Balance of Plant Contractors',
      desc: 'Tier-1 supply chain framework agreements for high-voltage civil, electrical, transformer, and inverter delivery.',
      key: 'DEVELOPER' as const
    }
  ];

  return (
    <section className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Users className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Sections 20 & 21 // Ecosystem & Corporate Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            STRATEGIC PARTNERSHIP ECOSYSTEM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Collaborating with landholders, institutional capital, commercial heavy consumers, and engineering specialists to accelerate Britain's energy transition.
          </p>
        </div>

        {/* 6 Partners Grid (Section 20 of Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-[#0A1E3A] border border-line space-y-3 hover:border-[#7AAA2B]/60 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="mini-tag text-[#7AAA2B]">{p.role}</span>
                <h3 className="text-sm font-extrabold text-white uppercase font-display">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-line/60">
                <button
                  onClick={() => onSelectRole(p.key)}
                  className="text-xs font-bold text-[#7AAA2B] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>CONNECT WITH US</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust & Entity Statement (Section 21 of Prompt) */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#040E20] border border-line shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#FF6321]" />
            <span className="mini-tag text-slate-300">CORPORATE GOVERNANCE & LINEAGE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-display">
                UNITE SOLAR // UNITE GREENTEK LIMITED
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Unite Solar operates under <strong>Unite Greentek Limited</strong> in the United Kingdom, bringing international engineering standards and rigorous development discipline as part of <strong>Unite Group Inc., USA</strong> (Website: unitegreentech.com).
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-sm bg-[#06152F] border border-line">
                <span className="text-[10px] text-slate-400 uppercase block">UK Entity</span>
                <strong className="text-white block mt-0.5">Unite Greentek Ltd</strong>
              </div>
              <div className="p-3 rounded-sm bg-[#06152F] border border-line">
                <span className="text-[10px] text-slate-400 uppercase block">US Parent</span>
                <strong className="text-[#FF6321] block mt-0.5">Unite Group Inc.</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
