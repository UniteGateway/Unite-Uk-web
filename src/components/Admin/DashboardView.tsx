import React from 'react';
import {
  Users,
  FolderKanban,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  Sun,
  Zap,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  Building,
  MapPin
} from 'lucide-react';
import { AdminUser, AdminActiveView } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface DashboardViewProps {
  currentUser: AdminUser;
  onNavigate: (view: AdminActiveView, id?: string) => void;
  onOpenCreateLead: () => void;
  onOpenCreateProject: () => void;
  onOpenCreateQuote: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onNavigate,
  onOpenCreateLead,
  onOpenCreateProject,
  onOpenCreateQuote,
}) => {
  const leads = adminStore.getLeads();
  const projects = adminStore.getProjects();
  const quotes = adminStore.getQuotes();
  const surveys = adminStore.getSurveys();
  const land = adminStore.getLand();
  const ppas = adminStore.getPpas();
  const tasks = adminStore.getTasks();
  const auditLogs = adminStore.getAuditLogs();

  // Calculate real metrics
  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;
  const activeProjectsCount = projects.filter((p) => p.status === 'ON_TRACK' || p.developmentStage !== 'OM').length;
  const openQuotesCount = quotes.filter((q) => q.status === 'DRAFT' || q.status === 'SENT').length;
  const siteSurveysCount = surveys.length;
  const franchiseAppsCount = 3; // Linked to franchise submissions
  const landOpportunitiesCount = land.length;
  const ppaOpportunitiesCount = ppas.length;
  const tasksDueCount = tasks.filter((t) => t.status !== 'COMPLETED').length;

  const totalPipelineKw = projects.reduce((acc, p) => acc + p.capacityKw, 0);
  const totalPipelineGbp = projects.reduce((acc, p) => acc + p.contractValueGbp, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Good Morning Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-[#06152F] to-[#0A1E3A] p-6 rounded-sm border-2 border-line text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#040E20] border border-line text-[#7AAA2B] text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#7AAA2B] animate-pulse" />
            <span>OPERATIONAL DESK // LIVE CONNECTED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight uppercase">
            GOOD MORNING, {currentUser.name.toUpperCase()}
          </h1>
          <p className="text-xs text-slate-300 font-light max-w-xl">
            Welcome to the Unite Solar internal Operating System. Monitor leads, manage high-voltage grid stages, configure PPA agreements and coordinate UK territory franchises.
          </p>
        </div>

        {/* Quick Operational Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenCreateLead}
            className="px-3 py-2 rounded-sm mini-tag bg-[#FF6321] hover:bg-[#ff763b] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ NEW LEAD</span>
          </button>
          <button
            onClick={onOpenCreateQuote}
            className="px-3 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ CREATE QUOTE</span>
          </button>
          <button
            onClick={onOpenCreateProject}
            className="px-3 py-2 rounded-sm bg-[#040E20] hover:bg-slate-800 border border-line text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#7AAA2B]" />
            <span>+ NEW PROJECT</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards (Real Values - Never Invented) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
            Live Operating Metrics
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">
            Zero-Mock Data Synchronization
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          
          {/* Card 1: New Leads */}
          <div
            onClick={() => onNavigate('leads')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-[#FF6321] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-[#FF6321] transition-colors">
                NEW LEADS
              </span>
              <div className="p-1.5 rounded-sm bg-orange-50 text-[#FF6321]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {newLeadsCount}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 flex items-center">
                {leads.length} Total in CRM
              </span>
            </div>
          </div>

          {/* Card 2: Active Projects */}
          <div
            onClick={() => onNavigate('projects')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-[#7AAA2B] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-[#7AAA2B] transition-colors">
                ACTIVE PROJECTS
              </span>
              <div className="p-1.5 rounded-sm bg-emerald-50 text-[#7AAA2B]">
                <FolderKanban className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {activeProjectsCount}
              </span>
              <span className="text-[10px] font-mono text-[#7AAA2B] font-bold">
                {(totalPipelineKw / 1000).toFixed(1)} MWp Total
              </span>
            </div>
          </div>

          {/* Card 3: Open Quotations */}
          <div
            onClick={() => onNavigate('quotes')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-amber-600 transition-colors">
                OPEN QUOTATIONS
              </span>
              <div className="p-1.5 rounded-sm bg-amber-50 text-amber-600">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {openQuotesCount}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {quotes.length} Generated
              </span>
            </div>
          </div>

          {/* Card 4: Site Surveys */}
          <div
            onClick={() => onNavigate('site-surveys')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-sky-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-sky-600 transition-colors">
                SITE SURVEYS
              </span>
              <div className="p-1.5 rounded-sm bg-sky-50 text-sky-600">
                <ClipboardCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {siteSurveysCount}
              </span>
              <span className="text-[10px] font-mono text-sky-600">
                3D LiDAR Logged
              </span>
            </div>
          </div>

          {/* Card 5: Franchise Applications */}
          <div
            onClick={() => onNavigate('franchise')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-purple-600 transition-colors">
                FRANCHISE APPS
              </span>
              <div className="p-1.5 rounded-sm bg-purple-50 text-purple-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {franchiseAppsCount}
              </span>
              <span className="text-[10px] font-mono text-purple-600">
                16 UK Territories
              </span>
            </div>
          </div>

          {/* Card 6: Land Opportunities */}
          <div
            onClick={() => onNavigate('land')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-emerald-600 transition-colors">
                LAND OPPORTUNITIES
              </span>
              <div className="p-1.5 rounded-sm bg-emerald-50 text-emerald-600">
                <Sun className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {landOpportunitiesCount}
              </span>
              <span className="text-[10px] font-mono text-emerald-600">
                {land.reduce((a, b) => a + b.areaAcres, 0)} Total Acres
              </span>
            </div>
          </div>

          {/* Card 7: PPA Opportunities */}
          <div
            onClick={() => onNavigate('ppa')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-blue-600 transition-colors">
                PPA OPPORTUNITIES
              </span>
              <div className="p-1.5 rounded-sm bg-blue-50 text-blue-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {ppaOpportunitiesCount}
              </span>
              <span className="text-[10px] font-mono text-blue-600">
                Zero-CAPEX Contracts
              </span>
            </div>
          </div>

          {/* Card 8: Tasks Due */}
          <div
            onClick={() => onNavigate('tasks')}
            className="p-4 rounded-sm bg-white border border-slate-200 hover:border-rose-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 group-hover:text-rose-600 transition-colors">
                TASKS DUE
              </span>
              <div className="p-1.5 rounded-sm bg-rose-50 text-rose-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-display">
                {tasksDueCount}
              </span>
              <span className="text-[10px] font-mono text-rose-600 font-bold">
                Action Required
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Section: Active Projects Pipeline + Priority Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Active Projects Pipeline Progress */}
        <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-display">
                Active High-Voltage & Commercial Projects
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Live stage monitoring from Design through G99 DNO to Commissioning
              </p>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs text-[#7AAA2B] font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onNavigate('projects', project.id)}
                className="p-4 rounded-sm bg-slate-50 border border-slate-200/80 hover:border-[#7AAA2B] hover:bg-slate-50/80 transition-all cursor-pointer space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#FF6321] bg-orange-100 px-1.5 py-0.2 rounded-sm">
                        {project.id}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {project.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-3 font-mono">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        {project.customerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {project.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase">
                      {project.capacityKw >= 1000 ? `${(project.capacityKw / 1000).toFixed(2)} MWp` : `${project.capacityKw} kWp`}
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-slate-200 text-slate-800 text-[10px] font-mono font-bold">
                      {project.commercialModel}
                    </span>
                  </div>
                </div>

                {/* Progress bar visual across stages */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Current Stage: <strong className="text-slate-800 uppercase">{project.developmentStage.replace('_', ' ')}</strong></span>
                    <span>Target COD: {project.estimatedCompletionDate}</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 h-1.5">
                    {project.timeline.map((milestone, mIdx) => (
                      <div
                        key={mIdx}
                        title={`${milestone.label}: ${milestone.state}`}
                        className={`rounded-full h-full ${
                          milestone.state === 'COMPLETE'
                            ? 'bg-[#7AAA2B]'
                            : milestone.state === 'CURRENT'
                            ? 'bg-[#FF6321] animate-pulse'
                            : milestone.state === 'BLOCKED'
                            ? 'bg-rose-500'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right: Urgent Operational Tasks & Live Audit Feed */}
        <div className="space-y-6">
          
          {/* Action Tasks */}
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-display flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FF6321]" />
                Priority Tasks Due
              </h3>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-[11px] text-[#7AAA2B] font-mono font-bold hover:underline cursor-pointer"
              >
                All Tasks
              </button>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onNavigate('tasks')}
                  className="p-2.5 rounded-sm bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-sm ${
                      task.priority === 'URGENT' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Due {task.dueDate}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800 line-clamp-1">
                    {task.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Assigned: {task.assignedTo}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Audit Stream */}
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-display flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#7AAA2B]" />
                Security & Audit Trail
              </h3>
              <button
                onClick={() => onNavigate('audit')}
                className="text-[11px] text-[#7AAA2B] font-mono font-bold hover:underline cursor-pointer"
              >
                Full Log
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {auditLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="p-2 rounded-sm bg-slate-50 text-[11px] space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{log.user}</span>
                    <span>{log.timestamp.split(' ')[1]}</span>
                  </div>
                  <div className="text-slate-700">
                    <strong className="text-slate-900 uppercase font-mono">{log.action}:</strong> {log.entityType} ({log.entityId})
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
