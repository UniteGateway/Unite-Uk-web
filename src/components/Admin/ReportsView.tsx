import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Zap,
  DollarSign,
  Users,
  FolderKanban,
  Award
} from 'lucide-react';
import { AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface ReportsViewProps {
  currentUser: AdminUser;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ currentUser }) => {
  const projects = adminStore.getProjects();
  const leads = adminStore.getLeads();
  const ppas = adminStore.getPpas();
  const [timeRange, setTimeRange] = useState<'Q1' | 'Q2' | 'YTD' | 'ALL'>('YTD');

  const totalPipelineGbp = projects.reduce((a, b) => a + b.contractValueGbp, 0);
  const totalCapacityKw = projects.reduce((a, b) => a + b.capacityKw, 0);
  const totalCo2Offset = projects.reduce((a, b) => a + (b.co2OffsetTonnesAnnual || 0), 0);

  // Stage distribution
  const stageBreakdown = [
    { stage: 'Feasibility & Assessment', count: 1, gbp: 1850000 },
    { stage: 'Detailed Design & SLD', count: 2, gbp: 425000 },
    { stage: 'DNO G99 Grid Application', count: 1, gbp: 1450000 },
    { stage: 'EPC Installation & Works', count: 1, gbp: 2850000 },
    { stage: 'Commissioned & O&M', count: 1, gbp: 980000 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Executive Reporting & Analytics Engine
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              UK Portfolio Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Origination velocity, DNO conversion funnels, asset yield models and clean power ESG offset reporting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-0.5 rounded-sm border border-slate-200 text-xs font-mono">
            {(['Q1', 'Q2', 'YTD', 'ALL'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-sm font-bold cursor-pointer ${
                  timeRange === t ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting full analytics dossier to PDF/Excel...')}
            className="px-3 py-2 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Total Pipeline Value</span>
          <div className="text-2xl font-bold font-display text-slate-900">
            £{(totalPipelineGbp / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-[#7AAA2B] font-mono">Across active turnkey EPC projects</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Generation Capacity</span>
          <div className="text-2xl font-bold font-display text-[#7AAA2B]">
            {(totalCapacityKw / 1000).toFixed(2)} MWp
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Solar PV & BESS Storage</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Annual Carbon Abatement</span>
          <div className="text-2xl font-bold font-display text-emerald-700">
            {totalCo2Offset.toLocaleString()} Tonnes CO₂/yr
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">Audited GHG Protocol Scope 2</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Lead Conversion Rate</span>
          <div className="text-2xl font-bold font-display text-amber-600">
            42.8%
          </div>
          <span className="text-[10px] text-amber-600 font-mono">From Qualified to Proposal</span>
        </div>
      </div>

      {/* Stage Breakdown Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Stage Value Distribution */}
        <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-display flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-[#7AAA2B]" />
            Pipeline Capital by Engineering Stage
          </h3>

          <div className="space-y-3 pt-2">
            {stageBreakdown.map((st, idx) => {
              const pct = (st.gbp / totalPipelineGbp) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-slate-800">{st.stage}</span>
                    <span className="font-bold text-slate-900">£{(st.gbp / 1000).toLocaleString()}k ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7AAA2B] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commercial Framework Allocation */}
        <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-display flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-[#FF6321]" />
            Commercial Structure Allocation
          </h3>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Zero-CAPEX Corporate PPA</span>
              <div className="text-xl font-bold font-display text-slate-900">68% Portfolio</div>
              <span className="text-[10px] text-slate-400 font-mono">20-25 Year Long-Term Offtake</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Turnkey Direct CAPEX</span>
              <div className="text-xl font-bold font-display text-slate-900">22% Portfolio</div>
              <span className="text-[10px] text-slate-400 font-mono">Client Balance Sheet Purchase</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">RESCO / BOOT Shared Savings</span>
              <div className="text-xl font-bold font-display text-slate-900">10% Portfolio</div>
              <span className="text-[10px] text-slate-400 font-mono">Hybrid Performance Contracts</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Franchise Partner Sourced</span>
              <div className="text-xl font-bold font-display text-[#7AAA2B]">34% Origination</div>
              <span className="text-[10px] text-emerald-600 font-mono">From UK Territory Network</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
