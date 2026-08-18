import React from 'react';
import {
  Zap,
  Activity,
  FileCheck2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  Radio,
  Share2
} from 'lucide-react';
import { GRID_CONNECTION_FLOW } from '../../data/ukOpportunityData';

export const GridConnectionSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Radio className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 11 // High-Voltage Grid Interconnection Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            GRID CONNECTION MATTERS.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Renewable-energy projects depend on available network capacity, connection requirements and project-specific grid studies across Distribution Network Operators (DNOs) and National Grid ESO.
          </p>
        </div>

        {/* Conceptual 6-Step Flow (Section 11 of Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {GRID_CONNECTION_FLOW.map((step, idx) => (
            <div
              key={step.step}
              className="bg-[#06152F] border border-line rounded-sm p-4 space-y-2 relative flex flex-col justify-between shadow-lg hover:border-[#7AAA2B]/60 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold flex items-center justify-center">
                  0{step.step}
                </span>
                {idx < GRID_CONNECTION_FLOW.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden lg:block" />
                )}
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-white uppercase font-display tracking-tight mt-1">
                  {step.title}
                </h3>
                <p className="text-[11px] text-slate-300 font-light leading-relaxed mt-1">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-line/50">
                <span className="text-[9px] font-mono text-[#7AAA2B] uppercase">
                  Phase 0{step.step} Milestone
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive DNO Information Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
          
          <div className="p-5 rounded-sm bg-[#06152F] border border-line space-y-2">
            <div className="flex items-center gap-2 text-[#7AAA2B]">
              <Zap className="w-4 h-4" />
              <h4 className="text-xs font-bold font-mono uppercase text-white">G98 / G99 Engineering Studies</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We model fault level headroom, voltage step changes, harmonic distortion, and reverse power flow on 11kV, 33kV, and 132kV networks prior to formal ENA submission.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#06152F] border border-line space-y-2">
            <div className="flex items-center gap-2 text-[#FF6321]">
              <Share2 className="w-4 h-4" />
              <h4 className="text-xs font-bold font-mono uppercase text-white">Contestable Works Optimization</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Independent Contestable Works procurement (substations, switchgear, trenching) reduces connection costs and avoids standard DNO timeline bottlenecks.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#06152F] border border-line space-y-2">
            <div className="flex items-center gap-2 text-sky-400">
              <Cpu className="w-4 h-4" />
              <h4 className="text-xs font-bold font-mono uppercase text-white">Export Limiting & ANM Readiness</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Where network capacity is constrained, we deploy G100-certified active network management (ANM) and co-located BESS to capture value without network delays.
            </p>
          </div>

        </div>

        {/* Mandatory Prompt Disclaimer (Section 11 & 28) */}
        <div className="p-4 rounded-sm bg-[#0A1E3A]/80 border border-line flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">
              Network Assessment Governance
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Subject to DNO / transmission network assessment and applicable connection requirements. Unite Greentek Limited conducts rigorous independent studies but does not guarantee network capacity without formal DNO / National Grid ESO connection agreements.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
