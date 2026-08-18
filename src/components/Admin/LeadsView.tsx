import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  ArrowRight,
  Eye,
  Edit,
  FolderKanban,
  Kanban,
  Table as TableIcon,
  Building,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { AdminLead, LeadStatus, LeadType, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface LeadsViewProps {
  currentUser: AdminUser;
  onOpenLeadDetail: (id: string) => void;
  onOpenCreateLead: () => void;
  onConvertToProject: (lead: AdminLead) => void;
}

export const LeadsView: React.FC<LeadsViewProps> = ({
  currentUser,
  onOpenLeadDetail,
  onOpenCreateLead,
  onConvertToProject
}) => {
  const [viewMode, setViewMode] = useState<'TABLE' | 'KANBAN'>('TABLE');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const leads = adminStore.getLeads();

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesQuery =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'ALL' || lead.leadType === selectedType;
    const matchesStatus = selectedStatus === 'ALL' || lead.status === selectedStatus;

    return matchesQuery && matchesType && matchesStatus;
  });

  const handleExportCsv = () => {
    const headers = [
      'Lead ID',
      'Date',
      'Name',
      'Company',
      'Email',
      'Phone',
      'Location',
      'Region',
      'Type',
      'Technology',
      'Estimated Capacity (kWp)',
      'Business Model',
      'Status',
      'Assigned To'
    ];

    const rows = filteredLeads.map((l) => [
      l.id,
      l.createdAt,
      l.name,
      l.company || '',
      l.email,
      l.phone,
      l.location,
      l.region,
      l.leadType,
      l.technology,
      l.estimatedCapacityKw,
      l.businessModel,
      l.status,
      l.assignedTo
    ]);

    adminStore.exportToCsv('unite_solar_leads', headers, rows);
  };

  const getStatusBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'CONTACTED':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'QUALIFIED':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'SITE_SURVEY':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'PROPOSAL':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'NEGOTIATION':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'WON':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'LOST':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const KANBAN_STAGES: LeadStatus[] = [
    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'SITE_SURVEY',
    'PROPOSAL',
    'NEGOTIATION',
    'WON',
    'LOST'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Lead Management & Origination
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {filteredLeads.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Pipeline origination, commercial qualifications, and turnkey solar assessments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Table vs Kanban Toggle */}
          <div className="flex bg-slate-100 p-0.5 rounded-sm border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setViewMode('TABLE')}
              className={`px-3 py-1.5 rounded-sm flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'TABLE' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`px-3 py-1.5 rounded-sm flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'KANBAN' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

          <button
            onClick={handleExportCsv}
            className="px-3 py-2 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenCreateLead}
            className="px-3.5 py-2 rounded-sm mini-tag bg-[#FF6321] hover:bg-[#ff773b] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ NEW LEAD</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leads by name, company, postcode, or reference ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-[#7AAA2B] font-mono text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono">
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px]">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Landowner">Landowner</option>
              <option value="Investor">Investor</option>
              <option value="Partner">Partner</option>
              <option value="Franchise">Franchise</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="SITE_SURVEY">Site Survey</option>
              <option value="PROPOSAL">Proposal</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View: Table vs Kanban */}
      {viewMode === 'TABLE' ? (
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase text-slate-500">
                  <th className="p-3.5">Lead ID</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Contact / Company</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Est. Capacity</th>
                  <th className="p-3.5">Commercial Model</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Assigned To</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400 font-mono text-xs">
                      No leads match the selected filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => onOpenLeadDetail(lead.id)}
                    >
                      <td className="p-3.5 font-mono font-bold text-[#FF6321]">
                        {lead.id}
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                        {lead.createdAt.split(' ')[0]}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-900 group-hover:text-[#7AAA2B] transition-colors">
                          {lead.name}
                        </div>
                        {lead.company && (
                          <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                            {lead.company}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                        {lead.location}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                          {lead.leadType}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">
                        {lead.estimatedCapacityKw >= 1000 ? `${(lead.estimatedCapacityKw / 1000).toFixed(1)} MWp` : `${lead.estimatedCapacityKw} kWp`}
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px] truncate max-w-[140px]">
                        {lead.businessModel}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold uppercase border ${getStatusBadgeClass(lead.status)}`}>
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px]">
                        {lead.assignedTo}
                      </td>
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onOpenLeadDetail(lead.id)}
                            title="View Lead Details"
                            className="p-1.5 rounded-sm hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onConvertToProject(lead)}
                            title="Convert to Project"
                            className="p-1.5 rounded-sm hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 font-bold"
                          >
                            <FolderKanban className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Visual Sales Pipeline Kanban Board */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-[1350px]">
            {KANBAN_STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.status === stage);
              return (
                <div
                  key={stage}
                  className="flex-1 bg-slate-100/90 rounded-sm border border-slate-200 p-2.5 space-y-2 flex flex-col"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-700">
                      {stage.replace('_', ' ')}
                    </span>
                    <span className="px-1.5 py-0.2 rounded-sm bg-white border border-slate-300 text-slate-700 text-[10px] font-bold">
                      {stageLeads.length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1 min-h-[300px]">
                    {stageLeads.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[10px] text-slate-400 font-mono italic">
                        Empty Stage
                      </div>
                    ) : (
                      stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => onOpenLeadDetail(lead.id)}
                          className="p-3 bg-white rounded-sm border border-slate-200 shadow-xs hover:border-[#7AAA2B] hover:shadow-md transition-all cursor-pointer space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold text-[#FF6321]">
                              {lead.id}
                            </span>
                            <span className="text-[9px] font-mono font-bold text-slate-500">
                              {lead.leadType}
                            </span>
                          </div>

                          <div>
                            <div className="font-bold text-slate-900 text-xs line-clamp-1">
                              {lead.name}
                            </div>
                            {lead.company && (
                              <div className="text-[11px] text-slate-500 font-mono truncate">
                                {lead.company}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-100">
                            <span className="font-bold text-[#7AAA2B]">
                              {lead.estimatedCapacityKw} kWp
                            </span>
                            <span className="text-slate-400">
                              {lead.assignedTo.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
