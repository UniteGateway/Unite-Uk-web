import React, { useState } from 'react';
import {
  X,
  Building,
  MapPin,
  Zap,
  Calendar,
  User,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  Cpu,
  Layers,
  Activity,
  FolderKanban
} from 'lucide-react';
import { AdminProject, ProjectStage, MilestoneTimelineState } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface ProjectDetailModalProps {
  projectId: string | null;
  onClose: () => void;
  onRefresh: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  projectId,
  onClose,
  onRefresh
}) => {
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'TECHNICAL' | 'COMMERCIAL' | 'GRID' | 'PLANNING' | 'PROCUREMENT' | 'INSTALLATION' | 'DOCUMENTS' | 'TASKS' | 'OM'
  >('OVERVIEW');

  if (!projectId) return null;
  const project = adminStore.getProjectById(projectId);
  if (!project) return null;

  const handleStageAdvance = (newStage: ProjectStage) => {
    adminStore.updateProjectStage(project.id, newStage);
    onRefresh();
  };

  const getMilestoneStateColor = (state: MilestoneTimelineState) => {
    switch (state) {
      case 'COMPLETE':
        return 'bg-[#7AAA2B] text-white border-[#7AAA2B]';
      case 'CURRENT':
        return 'bg-[#FF6321] text-white border-[#FF6321] animate-pulse';
      case 'BLOCKED':
        return 'bg-rose-500 text-white border-rose-500';
      case 'PENDING':
      default:
        return 'bg-slate-100 text-slate-400 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-4xl bg-white flex flex-col h-full shadow-2xl border-l border-slate-300">
        
        {/* Project Hero Header */}
        <div className="p-6 border-b border-slate-200 bg-[#06152F] text-white flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm bg-[#040E20] border border-line text-[#7AAA2B] text-[10px] font-mono font-bold">
                {project.id}
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-[#FF6321] text-white text-[10px] font-mono font-bold uppercase">
                {project.developmentStage.replace('_', ' ')}
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 text-[10px] font-mono">
                {project.commercialModel}
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white">
              {project.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {project.customerName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {project.location}
              </span>
              <span className="flex items-center gap-1 font-bold text-[#7AAA2B]">
                <Zap className="w-3.5 h-3.5" />
                {project.capacityKw >= 1000 ? `${(project.capacityKw / 1000).toFixed(2)} MWp` : `${project.capacityKw} kWp`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Interactive Multi-Stage Progress Timeline */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-3 h-0.5 bg-slate-200 -z-0" />
            {project.timeline.map((m, idx) => (
              <div
                key={m.stage}
                onClick={() => handleStageAdvance(m.stage)}
                className="flex flex-col items-center gap-1.5 relative z-10 cursor-pointer group"
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold shadow-xs transition-transform group-hover:scale-110 ${getMilestoneStateColor(
                    m.state
                  )}`}
                >
                  {m.state === 'COMPLETE' ? '✓' : idx + 1}
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase text-center max-w-[65px] truncate ${
                  m.state === 'CURRENT' ? 'text-[#FF6321]' : m.state === 'COMPLETE' ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {m.label.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 bg-white flex overflow-x-auto text-xs font-mono">
          {[
            { id: 'OVERVIEW', label: 'Overview' },
            { id: 'TECHNICAL', label: 'Technical' },
            { id: 'COMMERCIAL', label: 'Commercial & PPA' },
            { id: 'GRID', label: 'DNO / Grid G99' },
            { id: 'PLANNING', label: 'Planning' },
            { id: 'PROCUREMENT', label: 'Procurement' },
            { id: 'INSTALLATION', label: 'Installation' },
            { id: 'DOCUMENTS', label: 'Documents' },
            { id: 'TASKS', label: 'Tasks' },
            { id: 'OM', label: 'O&M & Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 border-b-2 font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'border-[#7AAA2B] text-[#06152F] bg-slate-50'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Contract Value</span>
                  <span className="text-base font-bold text-slate-900">£{project.contractValueGbp.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Estimated Yield</span>
                  <span className="text-base font-bold text-[#7AAA2B]">{project.annualYieldMwh || 0} MWh / yr</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Annual CO₂ Offset</span>
                  <span className="text-base font-bold text-emerald-600">{project.co2OffsetTonnesAnnual || 0} Tonnes</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Project Lead</span>
                  <span className="text-sm font-bold text-slate-900">{project.projectManager}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
                  Asset Location & Deployment Scope
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Turnkey engineered commercial solar installation deployed at {project.location}. Designed to hedge against wholesale grid tariffs while delivering net zero compliance under UK G99 electrical regulations.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'GRID' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
                Distribution Network Operator (DNO) & G99 Telemetry
              </h4>
              {project.dnoStatus ? (
                <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 font-mono block text-[10px]">DNO Operator</span>
                      <strong className="text-slate-800">{project.dnoStatus.dnoName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono block text-[10px]">Application Type</span>
                      <strong className="text-slate-800 font-mono">{project.dnoStatus.applicationType} Fast-Track</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono block text-[10px]">Export Approved</span>
                      <strong className="text-[#7AAA2B] font-mono">{project.dnoStatus.exportCapacityKw} kW</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono block text-[10px]">Grid Status</span>
                      <strong className="text-slate-800 font-mono">{project.dnoStatus.gridStatus}</strong>
                    </div>
                  </div>
                  {project.dnoStatus.quoteValueGbp && (
                    <div className="pt-2 border-t border-slate-200 text-[11px] font-mono text-slate-600">
                      Formal DNO Witness Testing Quote: <strong>£{project.dnoStatus.quoteValueGbp.toLocaleString()}</strong>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 font-mono">
                  No DNO records attached to this project.
                </div>
              )}
            </div>
          )}

          {activeTab === 'TECHNICAL' && (
            <div className="space-y-4 text-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
                Engineering & Hardware Bill of Materials (BOM)
              </h4>
              <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Solar Modules:</span>
                  <span className="font-bold text-slate-800">580W N-Type TOPCon Glass-Glass Bifacial</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Inverter Architecture:</span>
                  <span className="font-bold text-slate-800">125kW High-Power Three-Phase String Inverters</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Mounting Substructure:</span>
                  <span className="font-bold text-slate-800">Aerodynamic Ballasted / Standing Seam Aluminum</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Safety & Rapid Shutdown:</span>
                  <span className="font-bold text-slate-800">DC Arc-Fault AFCI & Automated G99 Trip Protection</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'COMMERCIAL' && (
            <div className="space-y-4 text-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
                Commercial Contract & Financial Model
              </h4>
              <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Commercial Framework:</span>
                  <span className="font-bold text-slate-800">{project.commercialModel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Gross Contract Value:</span>
                  <span className="font-bold text-slate-800">£{project.contractValueGbp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Estimated Target COD:</span>
                  <span className="font-bold text-[#FF6321]">{project.estimatedCompletionDate}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'DOCUMENTS' && (
            <div className="space-y-3 text-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
                Project Files & Engineering Dossiers
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#7AAA2B]" />
                    <span className="font-semibold text-slate-800">Electrical Single Line Diagram (SLD) Rev E.pdf</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">3.4 MB • Approved</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-500" />
                    <span className="font-semibold text-slate-800">National Grid G99 Connection Feasibility Offer.pdf</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">1.8 MB • Signed</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PLANNING' && (
            <div className="space-y-4 text-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
                UK Local Planning Authority Notice
              </h4>
              {project.planningStatus ? (
                <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Permitted Development Status:</span>
                    <strong className="text-slate-800">{project.planningStatus.type.replace('_', ' ')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Planning Authority:</span>
                    <strong className="text-slate-800">{project.planningStatus.authority}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-slate-400 font-mono">Planning details pending.</div>
              )}
            </div>
          )}

          {['PROCUREMENT', 'INSTALLATION', 'TASKS', 'OM'].includes(activeTab) && (
            <div className="p-8 text-center text-xs text-slate-400 font-mono bg-slate-50 rounded-sm border border-slate-200">
              Operational module data for {activeTab} is synchronized with live EPC site management.
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Unite Greentek Engineering Portal</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#06152F] text-white rounded-sm font-bold cursor-pointer"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
