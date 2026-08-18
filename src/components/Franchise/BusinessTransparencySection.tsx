import React from 'react';
import {
  ShieldCheck,
  Eye,
  FolderGit2,
  PieChart,
  FileCheck2,
  LineChart,
  ArrowRight,
  Zap,
  Lock,
  Sparkles
} from 'lucide-react';

export const BusinessTransparencySection: React.FC = () => {
  const pillars = [
    {
      title: 'LEAD VISIBILITY',
      subtitle: 'See assigned and generated leads.',
      desc: 'Complete tracking of territory inbound leads, web enquiries, and marketing campaign attribution with real-time timestamps.',
      icon: <Eye className="w-5 h-5 text-sky-400" />
    },
    {
      title: 'PROJECT VISIBILITY',
      subtitle: 'Track projects through each stage.',
      desc: 'Transparent progress milestones across site surveys, grid connection studies, planning consents, EPC procurement, and energisation.',
      icon: <FolderGit2 className="w-5 h-5 text-[#7AAA2B]" />
    },
    {
      title: 'COMMERCIAL VISIBILITY',
      subtitle: 'Access agreed commercial information.',
      desc: 'Line-item breakdown of project billings, equipment costs, subcontractor delivery, and agreed net-profit-share calculations.',
      icon: <PieChart className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'DOCUMENT VISIBILITY',
      subtitle: 'Keep project documentation organised.',
      desc: 'Encrypted cloud storage for all contracts, single-line electrical schematics, insurance policies, and structural certificates.',
      icon: <FileCheck2 className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'REPORTING',
      subtitle: 'Review territory activity and performance.',
      desc: 'Generate audited performance reports showing pipeline conversion velocity, annual kWh generation, and carbon abatement.',
      icon: <LineChart className="w-5 h-5 text-[#FF6321]" />
    }
  ];

  return (
    <section id="business-transparency" className="py-16 bg-[#020A17] border-b border-line text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 08 // Governance & Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            TRANSPARENCY <br />
            <span className="text-[#7AAA2B]">BUILT INTO THE BUSINESS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            We operate on absolute commercial integrity. Our partners have full visibility over their pipeline, operational delivery, and financial settlement.
          </p>
        </div>

        {/* Animated Value Flow Line: LEAD → PROJECT → REVENUE (Section 8 of Prompt 5) */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#06152F] border-2 border-line shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-400">
              AUDITED COMMERCIAL ENGINE PIPELINE
            </span>
            <span className="text-[11px] font-mono text-[#7AAA2B] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF6321]" />
              <span>Real-Time Audit Trail</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            
            {/* Step 1: Lead */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">STAGE 01</span>
                <span className="px-2 py-0.5 rounded-sm bg-[#06152F] text-[10px] font-mono text-sky-300">
                  Origin
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase font-display">LEAD</h3>
              <p className="text-xs text-slate-300 font-light">
                Logged with verified territory attribution, site consumption data, and contact credentials.
              </p>
            </div>

            {/* Step 2: Project */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-[#7AAA2B]/60 space-y-2 relative shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#7AAA2B] font-bold">STAGE 02</span>
                <span className="px-2 py-0.5 rounded-sm bg-[#7AAA2B]/20 text-[10px] font-mono text-[#7AAA2B] font-bold">
                  Engineering & Build
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase font-display">PROJECT</h3>
              <p className="text-xs text-slate-300 font-light">
                Delivered under strict milestone gates, PVsyst simulation, and ENA G99 grid compliance.
              </p>
            </div>

            {/* Step 3: Revenue */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">STAGE 03</span>
                <span className="px-2 py-0.5 rounded-sm bg-emerald-500/20 text-[10px] font-mono text-emerald-300 font-bold">
                  Disbursement
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase font-display">REVENUE</h3>
              <p className="text-xs text-slate-300 font-light">
                Up to 25% net profit share distributed transparently with open-book margin reconciliation.
              </p>
            </div>

          </div>

          <div className="flex items-center justify-center gap-3 pt-2 text-xs font-mono text-slate-400">
            <span>LEAD</span>
            <ArrowRight className="w-4 h-4 text-[#7AAA2B] animate-pulse" />
            <span>PROJECT</span>
            <ArrowRight className="w-4 h-4 text-[#7AAA2B] animate-pulse" />
            <span className="text-[#7AAA2B] font-bold">REVENUE</span>
          </div>
        </div>

        {/* 5 Transparency Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-[#06152F] border border-line space-y-3 hover:border-[#7AAA2B]/60 transition-colors shadow-lg"
            >
              <div className="p-2.5 rounded-sm bg-[#0A1E3A] border border-line w-fit">
                {p.icon}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase font-display tracking-tight">
                  {p.title}
                </h3>
                <span className="text-[11px] font-mono text-[#7AAA2B] block mt-0.5">
                  {p.subtitle}
                </span>
              </div>
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
