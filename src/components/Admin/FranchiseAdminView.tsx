import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Plus,
  MapPin,
  CheckCircle2,
  Clock,
  DollarSign,
  Award,
  Users,
  Building,
  Mail,
  Phone
} from 'lucide-react';
import { AdminUser, FranchiseApplication } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface FranchiseAdminViewProps {
  currentUser: AdminUser;
}

export const FranchiseAdminView: React.FC<FranchiseAdminViewProps> = ({ currentUser }) => {
  const applications = adminStore.getFranchiseApplications();
  const territories = adminStore.getTerritories();
  const [searchQuery, setSearchQuery] = useState('');

  const assignedTerritoriesCount = territories.filter((t) => t.status === 'ASSIGNED').length;
  const reservedCount = territories.filter((t) => t.status === 'RESERVED').length;
  const availableCount = territories.filter((t) => t.status === 'AVAILABLE').length;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Franchise Partner Network & Governance
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {applications.length} Applications
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            £20,000 entry license, 25% net profit share model, regional exclusive territory allocations.
          </p>
        </div>

        <button
          onClick={() => alert('Franchise Prospect Onboarding Wizard')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ NEW FRANCHISE PROSPECT</span>
        </button>
      </div>

      {/* Network Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Total UK Territories</span>
          <div className="text-2xl font-bold font-display text-slate-900">
            {territories.length} Regions
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Mapped nationwide</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Active Partners</span>
          <div className="text-2xl font-bold font-display text-[#7AAA2B]">
            {assignedTerritoriesCount} Operational
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">Delivering local projects</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">In Due Diligence / Reserved</span>
          <div className="text-2xl font-bold font-display text-amber-600">
            {reservedCount} Reserved
          </div>
          <span className="text-[10px] text-amber-600 font-mono">Under vetting</span>
        </div>

        <div className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Available Exclusive Regions</span>
          <div className="text-2xl font-bold font-display text-purple-700">
            {availableCount} Available
          </div>
          <span className="text-[10px] text-purple-600 font-mono">£20,000 license</span>
        </div>
      </div>

      {/* Franchise Applications Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">
            Live Franchisee Applications & Review Queue
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase text-slate-500">
                <th className="p-3.5">App ID</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Applicant / Principal</th>
                <th className="p-3.5">Requested Territory</th>
                <th className="p-3.5">Experience & Background</th>
                <th className="p-3.5">Capital Confirmed</th>
                <th className="p-3.5">Stage</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#FF6321]">
                    {app.id}
                  </td>
                  <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                    {app.appliedDate}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{app.applicantName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{app.email} • {app.phone}</div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#7AAA2B]">
                    {app.requestedTerritory}
                  </td>
                  <td className="p-3.5 text-slate-700 text-[11px]">
                    {app.experience}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold ${
                      app.capitalAvailableGbp >= 20000 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      £{app.capitalAvailableGbp.toLocaleString()} Verified
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-sm bg-purple-50 text-purple-700 text-[10px] font-mono font-bold uppercase">
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => alert(`Reviewing application ${app.id}`)}
                      className="px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px]"
                    >
                      Review
                    </button>
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
