import React, { useState } from 'react';
import {
  Zap,
  Search,
  Plus,
  Download,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PpaAgreement, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface PpaManagementViewProps {
  currentUser: AdminUser;
}

export const PpaManagementView: React.FC<PpaManagementViewProps> = ({ currentUser }) => {
  const ppas = adminStore.getPpas();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPpa, setSelectedPpa] = useState<PpaAgreement | null>(ppas[0] || null);

  const totalPpaCapacityKw = ppas.reduce((acc, p) => acc + p.systemSizeKw, 0);
  const totalAnnualGenerationMwh = ppas.reduce((acc, p) => acc + p.estimatedAnnualGenerationMwh, 0);
  const totalAnnualRevenueGbp = ppas.reduce((acc, p) => acc + p.estimatedAnnualRevenueGbp, 0);

  const filteredPpas = ppas.filter((p) =>
    p.offtakerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Corporate PPA & Power Generation Portfolio
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {ppas.length} Contracts
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Zero-CAPEX corporate power purchase agreements, index-linked long-term power off-take contracts.
          </p>
        </div>

        <button
          onClick={() => alert('New PPA contract origination wizard opened.')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ NEW PPA AGREEMENT</span>
        </button>
      </div>

      {/* High-Level PPA Portfolio KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Total PPA Asset Capacity</span>
          <div className="text-2xl font-bold font-display text-slate-900">
            {(totalPpaCapacityKw / 1000).toFixed(2)} MWp
          </div>
          <span className="text-[10px] text-[#7AAA2B] font-mono">Under long-term PPA governance</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Annual Clean Power Yield</span>
          <div className="text-2xl font-bold font-display text-[#7AAA2B]">
            {totalAnnualGenerationMwh.toLocaleString()} MWh / yr
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Zero-carbon generation</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Projected Annual PPA Revenue</span>
          <div className="text-2xl font-bold font-display text-emerald-700">
            £{totalAnnualRevenueGbp.toLocaleString()} / yr
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">CPI indexed cash flows</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="max-w-md w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search PPA offtakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-[#7AAA2B]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase text-slate-500">
                <th className="p-3.5">Agreement ID</th>
                <th className="p-3.5">Offtaker / Corporate Client</th>
                <th className="p-3.5">Project Name</th>
                <th className="p-3.5">Capacity</th>
                <th className="p-3.5">Tariff (p/kWh)</th>
                <th className="p-3.5">Term</th>
                <th className="p-3.5">Est. Annual Revenue</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">COD Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPpas.map((ppa) => (
                <tr key={ppa.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#FF6321]">
                    {ppa.id}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{ppa.offtakerName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{ppa.investorFundName}</div>
                  </td>
                  <td className="p-3.5 text-slate-700">
                    {ppa.projectName}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-800">
                    {ppa.systemSizeKw >= 1000 ? `${(ppa.systemSizeKw / 1000).toFixed(2)} MWp` : `${ppa.systemSizeKw} kWp`}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#7AAA2B] text-sm">
                    {ppa.tariffPencePerKwh}p
                  </td>
                  <td className="p-3.5 font-mono text-slate-600">
                    {ppa.termYears} Years
                  </td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700">
                    £{ppa.estimatedAnnualRevenueGbp.toLocaleString()}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                      {ppa.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                    {ppa.codDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
