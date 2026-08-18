import React, { useState } from 'react';
import { FRANCHISE_TERRITORIES } from '../data/energyData';
import { LegacyFranchiseRegion } from '../types';
import { Briefcase, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Users, Cpu, Award, FileText, AlertCircle, Sparkles } from 'lucide-react';

interface FranchiseSectionProps {
  onOpenFranchiseModal: (territory?: string) => void;
  onOpenAssessment: (type: string) => void;
}

export const FranchiseSection: React.FC<FranchiseSectionProps> = ({
  onOpenFranchiseModal,
  onOpenAssessment,
}) => {
  const [selectedTerritory, setSelectedTerritory] = useState<LegacyFranchiseRegion>(FRANCHISE_TERRITORIES[0]);
  const [activePathway, setActivePathway] = useState<'CUSTOMERS' | 'PROJECT_PARTNERS' | 'FRANCHISE'>('FRANCHISE');

  const franchiseBenefits = [
    { title: 'Exclusive Territory Rights', desc: 'Protected geographical operating zone with high commercial solar density.', icon: ShieldCheck },
    { title: 'Full Enterprise CRM & Software', desc: 'Automated solar quoting, PVSyst proposals, and pipeline telemetry.', icon: Cpu },
    { title: 'Sales & Marketing Engine', desc: 'Centralized lead generation, marketing collateral, and brand assets.', icon: TrendingUp },
    { title: 'Unite Academy Training', desc: 'Accredited technical, commercial PPA, and regulatory installation masterclasses.', icon: Award },
    { title: 'Engineering & Grid Support', desc: 'Direct access to chartered engineers for G99 submissions & design SLDs.', icon: Briefcase },
    { title: '25% Net Profit Share*', desc: 'Lucrative contractually applicable profit share structure on delivery.', icon: Sparkles },
  ];

  return (
    <section id="franchise" className="py-24 bg-[#0A1E3A] relative overflow-hidden border-t border-slate-800">
      {/* Visual lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#F37021]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#FF6321]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#FF6321] uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span className="mini-tag">06. Commercial Expansion</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">FRANCHISE & PARTNERS</span>
            </div>
            <span className="h-[1px] w-8 bg-[#FF6321]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            BUILD THE CLEAN ENERGY <br />
            <span className="text-[#FF6321]">
              FUTURE WITH US.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Whether you are an enterprise power consumer, renewable project co-developer, or ambitious entrepreneur expanding our regional franchise footprint.
          </p>

          {/* Three Main Pathways Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3">
            {[
              { id: 'CUSTOMERS', label: 'CUSTOMERS', sub: 'Power your site with clean solar & BESS' },
              { id: 'PROJECT_PARTNERS', label: 'PROJECT PARTNERS', sub: 'Co-develop solar, wind & grid BESS' },
              { id: 'FRANCHISE', label: 'FRANCHISE PARTNERS', sub: 'Own a Unite Solar business territory' },
            ].map((p) => {
              const isActive = activePathway === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePathway(p.id as any)}
                  className={`p-3 rounded-sm text-left transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#0A1E3A] border-[#FF6321] border-l-2 border-l-[#FF6321] shadow-xl text-white'
                      : 'bg-[#06152F] border-line text-slate-400 hover:text-slate-200 hover:bg-[#0A1E3A]'
                  }`}
                >
                  <span className="mini-tag text-[#FF6321] block mb-0.5">
                    PATHWAY {p.id === 'CUSTOMERS' ? '01' : p.id === 'PROJECT_PARTNERS' ? '02' : '03'}
                  </span>
                  <span className="text-xs font-extrabold font-display block text-white uppercase">{p.label}</span>
                  <span className="text-[11px] opacity-80 mt-0.5 block">{p.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display based on active pathway */}
        {activePathway === 'CUSTOMERS' && (
          <div className="bg-[#06152F] border border-line rounded-sm p-6 max-w-4xl mx-auto text-center space-y-4 shadow-2xl border-l-2 border-l-[#7AAA2B]">
            <h3 className="text-xl font-bold text-white font-display uppercase">CUSTOMERS</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Reduce dependence on conventional energy through renewable-energy solutions. Cut electricity bills, achieve net-zero ESG compliance, and protect your business against tariff volatility with our turnkey Solar PV and BESS storage systems.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenAssessment('customer-commercial')}
                className="px-6 py-3 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-colors"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activePathway === 'PROJECT_PARTNERS' && (
          <div className="bg-[#06152F] border border-line rounded-sm p-6 max-w-4xl mx-auto text-center space-y-4 shadow-2xl border-l-2 border-l-[#FF6321]">
            <h3 className="text-xl font-bold text-white font-display uppercase">PROJECT PARTNERS</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Work with us on solar, wind and BESS opportunities. We partner with landowners, commercial real estate portfolios, and developers to originate, engineer, and operate multi-megawatt renewable assets.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenAssessment('project-partner')}
                className="px-6 py-3 rounded-sm mini-tag text-white bg-[#FF6321] hover:bg-orange-600 font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-colors"
              >
                <span>PARTNER WITH US</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activePathway === 'FRANCHISE' && (
          <div className="space-y-8">
            
            {/* Major Franchise Hero Banner */}
            <div className="bg-[#06152F] border border-line rounded-sm p-5 sm:p-8 shadow-2xl relative overflow-hidden border-l-2 border-l-[#FF6321]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#FF6321]/15 border border-[#FF6321]/30 text-[#FF6321] text-[10px] font-bold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="mini-tag">Nationwide Expansion Programme</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight uppercase">
                    UNITE SOLAR <br />
                    <span className="text-[#FF6321]">FRANCHISE OPPORTUNITY</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Build and scale a lucrative, high-margin renewable-energy business in your exclusive UK territory. Backed by global technology OEM relationships, turnkey engineering support, and an institutional brand.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="p-2.5 rounded-sm stat-card-orange bg-[#0A1E3A]/60 border-line">
                      <span className="mini-tag text-slate-400">Entry Capital</span>
                      <p className="text-lg font-black text-[#FF6321] font-mono">FROM £20,000*</p>
                    </div>
                    <div className="p-2.5 rounded-sm stat-card bg-[#0A1E3A]/60 border-line">
                      <span className="mini-tag text-slate-400">Commercial Split</span>
                      <p className="text-lg font-black text-[#7AAA2B] font-mono">25% PROFIT SHARE*</p>
                    </div>
                    <div className="p-2.5 rounded-sm stat-card bg-[#0A1E3A]/60 border-line">
                      <span className="mini-tag text-slate-400">Territory</span>
                      <p className="text-lg font-black text-white font-mono">EXCLUSIVE ZONE</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#0A1E3A] p-4 sm:p-5 rounded-sm border border-line space-y-3">
                  <span className="mini-tag text-slate-200 block">
                    SELECT YOUR TERRITORY. <br />
                    START YOUR JOURNEY.
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Discover territory availability, commercial prerequisites, and launch timeline.
                  </p>
                  <button
                    id="franchise-apply-now-btn"
                    onClick={() => onOpenFranchiseModal(selectedTerritory.region)}
                    className="w-full py-3 px-4 rounded-sm mini-tag text-white bg-[#FF6321] hover:bg-orange-600 font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
                  >
                    <span>EXPLORE FRANCHISE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Franchise Benefits Grid */}
            <div>
              <h4 className="mini-tag text-slate-400 mb-4 text-center">
                Complete Turnkey Franchise Support Infrastructure
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {franchiseBenefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-sm stat-card bg-[#06152F] border-line hover:border-white/20 transition-all space-y-1.5"
                    >
                      <div className="w-7 h-7 rounded-sm bg-[#FF6321]/15 text-[#FF6321] flex items-center justify-center border border-[#FF6321]/30">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h5 className="text-xs font-bold text-white font-display uppercase">{b.title}</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{b.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive UK Territory Table / Selector */}
            <div className="bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-4 shadow-xl border-l-2 border-l-[#7AAA2B]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                <div>
                  <span className="mini-tag text-[#7AAA2B]">Interactive UK Grid</span>
                  <h4 className="text-lg font-extrabold text-white font-display uppercase">
                    Regional Territory Availability & Pipeline
                  </h4>
                </div>
                <span className="mini-tag text-slate-400">
                  10 Key Commercial Clusters
                </span>
              </div>

              {/* Territory Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line text-slate-400 uppercase tracking-wider font-mono text-[9px]">
                      <th className="pb-2 pr-3">Territory Name</th>
                      <th className="pb-2 px-3">Status</th>
                      <th className="pb-2 px-3">Industrial Density</th>
                      <th className="pb-2 px-3">Solar Irradiance</th>
                      <th className="pb-2 px-3">Target MRR Potential</th>
                      <th className="pb-2 pl-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {FRANCHISE_TERRITORIES.map((t) => {
                      const isSelected = selectedTerritory.code === t.code;
                      return (
                        <tr
                          key={t.code}
                          onClick={() => setSelectedTerritory(t)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#0A1E3A]' : 'hover:bg-[#0A1E3A]/50'
                          }`}
                        >
                          <td className="py-2.5 pr-3 font-bold text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6321]" />
                            <span className="text-[11px]">{t.region}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-sm mini-tag ${
                                t.status === 'Available'
                                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                                  : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-300 text-[11px]">{t.industrialDensity}</td>
                          <td className="py-2.5 px-3 text-slate-300 font-mono text-[10px]">{t.annualSolarIrradiance}</td>
                          <td className="py-2.5 px-3 text-[#7AAA2B] font-mono font-bold text-[11px]">{t.targetMrrPotential}</td>
                          <td className="py-2.5 pl-3 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenFranchiseModal(t.region);
                              }}
                              className="px-2.5 py-1 rounded-sm bg-[#0A1E3A] hover:bg-[#FF6321] text-slate-200 hover:text-white font-bold mini-tag transition-colors border border-line"
                            >
                              Inquire
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Disclaimer required by user prompt */}
              <div className="flex items-start gap-2 text-[10px] text-slate-400 p-2.5 rounded-sm bg-[#0A1E3A]/40 border border-line">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  *Terms, eligibility and commercial conditions apply. Franchise fee from £20,000 excl. VAT. Profit share models subject to contractual execution, territory qualification, and operational compliance. Do not imply availability of a territory unless formally confirmed in writing.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
