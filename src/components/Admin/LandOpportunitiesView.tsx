import React, { useState } from 'react';
import {
  Sun,
  Search,
  Plus,
  MapPin,
  Compass,
  Zap,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { LandOpportunity, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface LandOpportunitiesViewProps {
  currentUser: AdminUser;
}

export const LandOpportunitiesView: React.FC<LandOpportunitiesViewProps> = ({ currentUser }) => {
  const landList = adminStore.getLand();
  const [searchQuery, setSearchQuery] = useState('');

  const totalAcres = landList.reduce((acc, l) => acc + l.areaAcres, 0);
  const totalSolarPotentialMw = landList.reduce((acc, l) => acc + l.estimatedSolarCapacityMw, 0);

  const filteredLand = landList.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.landownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.substationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Land & Utility Solar Farm Origination
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {landList.length} Sites Identified
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Ground-mounted solar farms, 33kV/132kV primary substation proximity audits, lease option negotiations.
          </p>
        </div>

        <button
          onClick={() => alert('Add Land Opportunity Wizard')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ LOG LAND OPPORTUNITY</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Total Land Portfolio</span>
          <div className="text-2xl font-bold font-display text-slate-900">
            {totalAcres.toLocaleString()} Acres
          </div>
          <span className="text-[10px] text-[#7AAA2B] font-mono">Agricultural Grade 3b / Brownfield</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Utility Solar Potential</span>
          <div className="text-2xl font-bold font-display text-[#7AAA2B]">
            {totalSolarPotentialMw.toFixed(1)} MWp Potential
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Export generation capacity</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Grid Connection Scope</span>
          <div className="text-2xl font-bold font-display text-slate-900">
            &lt; 2.5 km Avg Proximity
          </div>
          <span className="text-[10px] text-slate-500 font-mono">To DNO primary 33kV substations</span>
        </div>
      </div>

      {/* Land Opportunities Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLand.map((site) => (
          <div
            key={site.id}
            className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs hover:border-[#7AAA2B] transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#FF6321]">
                    {site.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-sm bg-purple-50 text-purple-700 text-[10px] font-mono font-bold uppercase">
                    {site.stage.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  {site.title}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-2 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{site.location}, {site.region}</span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-lg font-bold text-[#7AAA2B] block">
                  {site.areaAcres} Acres
                </span>
                <span className="text-[10px] text-slate-500">
                  ~{site.estimatedSolarCapacityMw} MWp PV
                </span>
              </div>
            </div>

            {/* Grid & Lease Metrics */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-sm border border-slate-100 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Substation Connection:</span>
                <strong className="text-slate-800 text-[11px]">{site.substationName} ({site.distanceToSubstationKm} km)</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Target Lease Rate:</span>
                <strong className="text-slate-800 text-[11px]">£{site.annualLeaseGbpPerAcre} / acre / yr</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Landowner:</span>
                <strong className="text-slate-800 text-[11px]">{site.landownerName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Grid Status:</span>
                <strong className="text-[#7AAA2B] text-[11px]">{site.gridCapacityAvailable}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {site.notes}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
