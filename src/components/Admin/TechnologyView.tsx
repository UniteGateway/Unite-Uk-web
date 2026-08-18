import React, { useState } from 'react';
import {
  Cpu,
  Search,
  Plus,
  Zap,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { TechnologyProduct, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface TechnologyViewProps {
  currentUser: AdminUser;
}

export const TechnologyView: React.FC<TechnologyViewProps> = ({ currentUser }) => {
  const techProducts = adminStore.getTechnologyProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredProducts = techProducts.filter((p) => {
    const matchesQuery =
      p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Tier-1 Renewable Hardware Catalogue
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {techProducts.length} Pre-Qualified Components
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            N-Type TOPCon bifacial modules, utility string inverters, high-voltage C&I BESS storage, and mounting systems.
          </p>
        </div>

        <button
          onClick={() => alert('New Product Specification Onboarding')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ ADD HARDWARE SPEC</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search manufacturer or model number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-[#7AAA2B]"
          />
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="MODULE">Solar Modules (PV)</option>
            <option value="INVERTER">Inverters</option>
            <option value="BATTERY">Battery Storage (BESS)</option>
            <option value="MOUNTING">Mounting Substructure</option>
            <option value="MONITORING">Monitoring & Telemetry</option>
          </select>
        </div>
      </div>

      {/* Technology Hardware Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs hover:border-[#7AAA2B] transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#FF6321]">
                  {prod.id}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                  {prod.category}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#7AAA2B] font-mono font-bold uppercase block">
                  {prod.manufacturer}
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  {prod.model}
                </h3>
              </div>

              <div className="p-3 bg-slate-50 rounded-sm border border-slate-100 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nominal Rating:</span>
                  <strong className="text-slate-900">{prod.nominalPowerRating}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Efficiency / Spec:</span>
                  <strong className="text-slate-900">{prod.efficiencyPct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Warranty:</span>
                  <strong className="text-slate-900">{prod.warrantyYears} Years</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Unit Trade Price:</span>
                <strong className="text-slate-900 font-bold">£{prod.priceGbp.toLocaleString()} / {prod.unit}</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Stock Level:</span>
                <strong className="text-emerald-700 font-bold">{prod.inStockQty.toLocaleString()} units</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
