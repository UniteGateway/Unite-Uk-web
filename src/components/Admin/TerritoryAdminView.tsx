import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Plus,
  Building,
  Users,
  Zap,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { TerritoryRecord, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface TerritoryAdminViewProps {
  currentUser: AdminUser;
}

export const TerritoryAdminView: React.FC<TerritoryAdminViewProps> = ({ currentUser }) => {
  const territories = adminStore.getTerritories();
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryRecord | null>(territories[0] || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerritories = territories.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.franchiseeName && t.franchiseeName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusBadge = (status: TerritoryRecord['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'RESERVED':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'ASSIGNED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              UK Regional Territory Allocation & Density Map
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {territories.length} UK Territories Mapped
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Exclusive regional territory rights, franchise partner allocation, industrial energy demand density.
          </p>
        </div>

        <button
          onClick={() => alert('New Regional Territory Configuration')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ DEFINE TERRITORY</span>
        </button>
      </div>

      {/* Grid Layout: Interactive Territory Grid + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Territory Cards List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase font-mono">
              Regional Territories (Click to Inspect)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">16 Nationwide Divisions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTerritories.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTerritory(t)}
                className={`p-4 rounded-sm border transition-all cursor-pointer space-y-2.5 ${
                  selectedTerritory?.id === t.id
                    ? 'bg-[#06152F] text-white border-[#7AAA2B] shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${
                    selectedTerritory?.id === t.id ? 'text-[#7AAA2B]' : 'text-[#FF6321]'
                  }`}>
                    {t.id}
                  </span>
                  <span className={`px-2 py-0.2 rounded-sm text-[9px] font-mono font-bold uppercase border ${
                    selectedTerritory?.id === t.id ? 'bg-slate-800 text-slate-200 border-slate-700' : getStatusBadge(t.status)
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm">
                    {t.name}
                  </h4>
                  <div className="text-xs opacity-70 font-mono">
                    {t.region}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-slate-200/40">
                  <div>
                    <span className="opacity-60 block">Annual Demand:</span>
                    <strong className={selectedTerritory?.id === t.id ? 'text-[#7AAA2B]' : 'text-slate-900'}>
                      {t.commercialDemandAnnualGwh.toLocaleString()} GWh
                    </strong>
                  </div>
                  <div>
                    <span className="opacity-60 block">Target Deployment:</span>
                    <strong className={selectedTerritory?.id === t.id ? 'text-white' : 'text-slate-900'}>
                      {t.targetMwDeployment} MWp
                    </strong>
                  </div>
                </div>

                {t.franchiseeName && (
                  <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Partner: {t.franchiseeName}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Territory Inspector */}
        <div>
          {selectedTerritory ? (
            <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-4 sticky top-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF6321]">
                    {selectedTerritory.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold uppercase border ${getStatusBadge(selectedTerritory.status)}`}>
                    {selectedTerritory.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 uppercase font-display mt-1">
                  {selectedTerritory.name}
                </h3>
                <span className="text-xs text-slate-500 font-mono">{selectedTerritory.region}</span>
              </div>

              {/* Territory Demographics & Energy Metrics */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 rounded-sm flex justify-between">
                  <span className="text-slate-500">Population:</span>
                  <strong className="text-slate-900">{selectedTerritory.population.toLocaleString()}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-sm flex justify-between">
                  <span className="text-slate-500">Commercial Energy Demand:</span>
                  <strong className="text-[#7AAA2B] font-bold">{selectedTerritory.commercialDemandAnnualGwh.toLocaleString()} GWh/yr</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-sm flex justify-between">
                  <span className="text-slate-500">Target PV Buildout:</span>
                  <strong className="text-slate-900">{selectedTerritory.targetMwDeployment} MWp</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-sm flex justify-between">
                  <span className="text-slate-500">Active Franchisee:</span>
                  <strong className="text-slate-900">{selectedTerritory.franchiseeName || 'None (Open for Application)'}</strong>
                </div>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-sm text-xs text-purple-900 space-y-1">
                <div className="font-bold font-mono text-[10px] uppercase">Franchise Economics</div>
                <p className="text-[11px] leading-relaxed">
                  £20,000 upfront exclusive territory license fee granting complete EPC, engineering and 25% net profit share rights.
                </p>
              </div>

              {selectedTerritory.status === 'AVAILABLE' ? (
                <button
                  onClick={() => alert(`Initiated franchise applicant screening for territory: ${selectedTerritory.name}`)}
                  className="w-full py-2.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold font-mono uppercase cursor-pointer"
                >
                  Assign to Candidate
                </button>
              ) : (
                <button
                  onClick={() => alert(`Managing partner agreement for: ${selectedTerritory.franchiseeName}`)}
                  className="w-full py-2.5 rounded-sm bg-[#06152F] hover:bg-[#0A1E3A] text-white text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  View Partner Agreement
                </button>
              )}

            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-mono bg-white rounded-sm border border-slate-200">
              Select a territory to inspect.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
