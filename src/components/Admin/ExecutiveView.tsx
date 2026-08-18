import React from 'react';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  DollarSign,
  Building,
  Users,
  CheckCircle2
} from 'lucide-react';
import { AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface ExecutiveViewProps {
  currentUser: AdminUser;
}

export const ExecutiveView: React.FC<ExecutiveViewProps> = ({ currentUser }) => {
  const projects = adminStore.getProjects();
  const ppas = adminStore.getPpas();
  const territories = adminStore.getTerritories();
  const investors = adminStore.getInvestors();

  const totalContractValue = projects.reduce((a, b) => a + b.contractValueGbp, 0);
  const totalCapacityKw = projects.reduce((a, b) => a + b.capacityKw, 0);
  const totalCapitalAllocated = investors.reduce((a, b) => a + b.allocationGbp, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="bg-[#06152F] p-6 rounded-sm border-2 border-line text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#040E20] border border-line text-[#7AAA2B] text-[10px] font-mono font-bold uppercase">
          <span>EXECUTIVE DASHBOARD // BOARD OF DIRECTORS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight uppercase">
          Unite Greentek Limited — Strategic Performance
        </h1>
        <p className="text-xs text-slate-300 font-mono max-w-3xl">
          High-level corporate oversight: capital deployment velocity, UK market share, PPA generation revenues, and territory franchise expansion.
        </p>
      </div>

      {/* Strategic KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-sm border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Total EPC & Asset Pipeline</span>
          <div className="text-3xl font-bold font-display text-slate-900">
            £{(totalContractValue / 1000000).toFixed(2)}M
          </div>
          <p className="text-xs text-slate-600 font-sans">
            Committed and late-stage commercial contracts across Great Britain.
          </p>
        </div>

        <div className="p-5 bg-white rounded-sm border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">PPA Investor Facility</span>
          <div className="text-3xl font-bold font-display text-[#7AAA2B]">
            £{(totalCapitalAllocated / 1000000).toFixed(1)}M
          </div>
          <p className="text-xs text-slate-600 font-sans">
            Institutional capital facilities mobilized for Zero-CAPEX corporate installations.
          </p>
        </div>

        <div className="p-5 bg-white rounded-sm border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">UK Territory Coverage</span>
          <div className="text-3xl font-bold font-display text-purple-700">
            {territories.filter((t) => t.status === 'ASSIGNED' || t.status === 'RESERVED').length} / {territories.length}
          </div>
          <p className="text-xs text-slate-600 font-sans">
            Territories active or under exclusivity agreements with local franchise partners.
          </p>
        </div>
      </div>

      {/* Corporate Structure Statement */}
      <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">
          Corporate Governance & Brand Relationship
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed font-sans">
          <div className="p-4 bg-white rounded-sm border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-mono text-[11px] uppercase">Operating Entity:</strong>
            <p>
              <strong>UNITE GREENTEK LIMITED</strong> (Company No. 13854124) is the dedicated United Kingdom operating company delivering turnkey solar, battery storage, and corporate PPA infrastructure across England, Scotland, and Wales.
            </p>
          </div>

          <div className="p-4 bg-white rounded-sm border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-mono text-[11px] uppercase">Global Parent & Brand:</strong>
            <p>
              Operating under the consumer and enterprise brand <strong>UNITE SOLAR</strong>, backed by parent corporation <strong>UNITE GROUP INC., USA</strong>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
