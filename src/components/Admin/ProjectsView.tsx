import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  Download,
  Plus,
  Kanban,
  Table as TableIcon,
  Building,
  MapPin,
  Zap,
  Calendar,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AdminProject, ProjectStage, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface ProjectsViewProps {
  currentUser: AdminUser;
  onOpenProjectDetail: (id: string) => void;
  onOpenCreateProject: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  currentUser,
  onOpenProjectDetail,
  onOpenCreateProject
}) => {
  const [viewMode, setViewMode] = useState<'TABLE' | 'KANBAN'>('TABLE');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');

  const projects = adminStore.getProjects();

  const filteredProjects = projects.filter((p) => {
    const matchesQuery =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage = selectedStage === 'ALL' || p.developmentStage === selectedStage;

    return matchesQuery && matchesStage;
  });

  const handleExportCsv = () => {
    const headers = [
      'Project ID',
      'Project Name',
      'Customer',
      'Location',
      'Region',
      'Technology',
      'Capacity (kWp)',
      'Development Stage',
      'Commercial Model',
      'Project Manager',
      'Status',
      'Contract Value (GBP)',
      'Est. Completion'
    ];

    const rows = filteredProjects.map((p) => [
      p.id,
      p.name,
      p.customerName,
      p.location,
      p.region,
      p.technology,
      p.capacityKw,
      p.developmentStage,
      p.commercialModel,
      p.projectManager,
      p.status,
      p.contractValueGbp,
      p.estimatedCompletionDate
    ]);

    adminStore.exportToCsv('unite_solar_projects', headers, rows);
  };

  const STAGES_LIST: ProjectStage[] = [
    'OPPORTUNITY',
    'FEASIBILITY',
    'SITE_ASSESSMENT',
    'DESIGN',
    'DNO_GRID',
    'PLANNING',
    'FINANCE',
    'PROCUREMENT',
    'INSTALLATION',
    'COMMISSIONING',
    'OM'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Renewable Project Engineering & EPC
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {filteredProjects.length} Active Projects
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            High-voltage grid connection (G99), multi-megawatt rooftop installations and utility solar parks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
              <span>Pipeline Kanban</span>
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
            onClick={onOpenCreateProject}
            className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ NEW PROJECT</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search projects by name, customer, town, or project ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-[#7AAA2B] font-mono text-xs"
          />
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400 text-[11px]">Development Stage:</span>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Stages (11)</option>
            {STAGES_LIST.map((s) => (
              <option key={s} value={s}>
                {s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table vs Kanban */}
      {viewMode === 'TABLE' ? (
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase text-slate-500">
                  <th className="p-3.5">Project ID</th>
                  <th className="p-3.5">Project Name & Customer</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Capacity</th>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Model</th>
                  <th className="p-3.5">Contract Value</th>
                  <th className="p-3.5">Project Manager</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400 font-mono text-xs">
                      No projects match the specified filter.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => onOpenProjectDetail(p.id)}
                      className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <td className="p-3.5 font-mono font-bold text-[#7AAA2B]">
                        {p.id}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 group-hover:text-[#7AAA2B] transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                          <Building className="w-3 h-3 text-slate-400" />
                          {p.customerName}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                        {p.location}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">
                        {p.capacityKw >= 1000 ? `${(p.capacityKw / 1000).toFixed(2)} MWp` : `${p.capacityKw} kWp`}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-mono font-bold uppercase">
                          {p.developmentStage.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">
                        {p.commercialModel}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">
                        £{p.contractValueGbp.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px]">
                        {p.projectManager}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProjectDetail(p.id);
                          }}
                          className="px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px]"
                        >
                          Dossier
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Multi-Stage Project Pipeline Kanban */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-[1700px]">
            {STAGES_LIST.map((stage) => {
              const stageProjects = filteredProjects.filter((p) => p.developmentStage === stage);
              return (
                <div
                  key={stage}
                  className="w-56 bg-slate-100 rounded-sm border border-slate-200 p-2.5 space-y-2 flex flex-col"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-700 truncate">
                      {stage.replace('_', ' ')}
                    </span>
                    <span className="px-1.5 py-0.2 rounded-sm bg-white border border-slate-300 text-slate-700 text-[10px] font-bold">
                      {stageProjects.length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1 min-h-[260px]">
                    {stageProjects.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[10px] text-slate-400 font-mono italic">
                        No projects
                      </div>
                    ) : (
                      stageProjects.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => onOpenProjectDetail(proj.id)}
                          className="p-3 bg-white rounded-sm border border-slate-200 shadow-xs hover:border-[#7AAA2B] hover:shadow-md transition-all cursor-pointer space-y-2"
                        >
                          <span className="text-[9px] font-mono font-bold text-[#7AAA2B] block">
                            {proj.id}
                          </span>
                          <div className="font-bold text-slate-900 text-xs line-clamp-2">
                            {proj.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {proj.customerName}
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-100">
                            <span className="font-bold text-slate-800">
                              {proj.capacityKw} kWp
                            </span>
                            <span className="text-emerald-700 font-bold">
                              £{(proj.contractValueGbp / 1000).toFixed(0)}k
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
