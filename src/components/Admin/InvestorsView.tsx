import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Plus,
  TrendingUp,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { InvestorRecord, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface InvestorsViewProps {
  currentUser: AdminUser;
}

export const InvestorsView: React.FC<InvestorsViewProps> = ({ currentUser }) => {
  const investors = adminStore.getInvestors();
  const [searchQuery, setSearchQuery] = useState('');

  const totalAllocationGbp = investors.reduce((acc, i) => acc + i.allocationGbp, 0);
  const totalDeployedGbp = investors.reduce((acc, i) => acc + i.deployedGbp, 0);

  const filteredInvestors = investors.filter((i) =>
    i.fundName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Institutional Capital & ESG Investor CRM
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {investors.length} Capital Partners
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Infrastructure debt funds, ESG impact capital, PPA asset finance facilities, and family offices.
          </p>
        </div>

        <button
          onClick={() => alert('New Investor Partner Onboarding')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ ONBOARD INVESTOR</span>
        </button>
      </div>

      {/* Capital Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Total Capital Committed</span>
          <div className="text-2xl font-bold font-display text-slate-900">
            £{(totalAllocationGbp / 1000000).toFixed(1)}M Facility
          </div>
          <span className="text-[10px] text-slate-500 font-mono">ESG Infrastructure Funds</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Capital Deployed to Date</span>
          <div className="text-2xl font-bold font-display text-[#7AAA2B]">
            £{(totalDeployedGbp / 1000000).toFixed(1)}M Deployed
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">In high-yield solar assets</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Available PPA Liquidity</span>
          <div className="text-2xl font-bold font-display text-emerald-700">
            £{((totalAllocationGbp - totalDeployedGbp) / 1000000).toFixed(1)}M Available
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Ready for 2026/2027 deployments</span>
        </div>
      </div>

      {/* Investor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInvestors.map((inv) => (
          <div
            key={inv.id}
            className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs hover:border-[#7AAA2B] transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FF6321]">
                  {inv.id}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">
                  {inv.fundName}
                </h3>
                <div className="text-xs text-slate-500 font-mono">
                  {inv.type.replace('_', ' ')} • {inv.contactPerson}
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-sm font-bold text-[#7AAA2B]">
                  {inv.targetReturnIrrPct}% Target IRR
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-sm border border-slate-100 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Committed Facility:</span>
                <strong className="text-slate-800 text-[11px]">£{(inv.allocationGbp / 1000000).toFixed(1)}M</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Deployed Asset Base:</span>
                <strong className="text-emerald-700 text-[11px]">£{(inv.deployedGbp / 1000000).toFixed(1)}M</strong>
              </div>
            </div>

            <div className="text-xs text-slate-600 font-sans">
              <strong className="text-slate-800 font-mono text-[10px] uppercase block">Mandate & Target Assets:</strong>
              {inv.notes}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
