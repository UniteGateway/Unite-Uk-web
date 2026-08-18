import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  ClipboardCheck,
  Zap,
  Sun,
  ShieldCheck,
  MapPin,
  Cpu,
  Layers,
  Clock,
  MessageSquare,
  BarChart3,
  Award,
  Activity,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  Globe,
  ExternalLink,
  Plus,
  Building,
  CheckCircle2,
  Lock,
  UserCheck
} from 'lucide-react';
import {
  AdminUser,
  AdminActiveView,
  AdminUserRole,
  AdminLead,
  AdminProject,
  AdminQuote
} from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';
import { UniteSolarLogo } from '../UniteLogos';

// Child Views
import { DashboardView } from './DashboardView';
import { LeadsView } from './LeadsView';
import { LeadDetailModal } from './LeadDetailModal';
import { ProjectsView } from './ProjectsView';
import { ProjectDetailModal } from './ProjectDetailModal';
import { SiteSurveysView } from './SiteSurveysView';
import { QuotesView } from './QuotesView';
import { PpaManagementView } from './PpaManagementView';
import { LandOpportunitiesView } from './LandOpportunitiesView';
import { CustomersView } from './CustomersView';
import { InvestorsView } from './InvestorsView';
import { FranchiseAdminView } from './FranchiseAdminView';
import { TerritoryAdminView } from './TerritoryAdminView';
import { PartnersView } from './PartnersView';
import { TechnologyView } from './TechnologyView';
import { DocumentsView } from './DocumentsView';
import { TasksView } from './TasksView';
import { CommunicationView } from './CommunicationView';
import { ReportsView } from './ReportsView';
import { ExecutiveView } from './ExecutiveView';
import { UsersRolesView } from './UsersRolesView';
import { AuditLogView } from './AuditLogView';

// Modals and Drawers
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationsDrawer } from './NotificationsDrawer';
import { CreateLeadModal } from './CreateLeadModal';
import { CreateProjectModal } from './CreateProjectModal';

interface AdminLayoutProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onNavigateToPublic: () => void;
  onSwitchRole: (role: AdminUserRole) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  onLogout,
  onNavigateToPublic,
  onSwitchRole
}) => {
  const [activeView, setActiveView] = useState<AdminActiveView>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [leadForProjectConversion, setLeadForProjectConversion] = useState<AdminLead | null>(null);

  // Subscribe to store changes
  useEffect(() => {
    const unsub = adminStore.subscribe(() => {
      setRefreshKey((k) => k + 1);
    });
    return () => unsub();
  }, []);

  // Global keyboard shortcut '/' for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = adminStore.getNotifications();
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  const handleNavigate = (view: AdminActiveView, id?: string) => {
    setActiveView(view);
    if (view === 'leads' && id) {
      setSelectedLeadId(id);
    } else if (view === 'projects' && id) {
      setSelectedProjectId(id);
    }
  };

  const handleConvertToProject = (lead: AdminLead) => {
    setLeadForProjectConversion(lead);
    setIsCreateProjectOpen(true);
  };

  // Nav Groups Configuration
  const NAV_SECTIONS = [
    {
      label: 'Core Operations',
      items: [
        { id: 'dashboard' as AdminActiveView, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'leads' as AdminActiveView, label: 'Leads & Origination', icon: Users, badge: adminStore.getLeads().filter(l => l.status === 'NEW').length },
        { id: 'customers' as AdminActiveView, label: 'Customer Accounts', icon: Building },
        { id: 'projects' as AdminActiveView, label: 'Projects & EPC', icon: FolderKanban, badge: adminStore.getProjects().length }
      ]
    },
    {
      label: 'Engineering & Energy',
      items: [
        { id: 'site-surveys' as AdminActiveView, label: 'Site Surveys & LiDAR', icon: ClipboardCheck },
        { id: 'quotes' as AdminActiveView, label: 'Quotes & Proposals', icon: FileText },
        { id: 'ppa' as AdminActiveView, label: 'PPA Asset Portfolio', icon: Zap },
        { id: 'land' as AdminActiveView, label: 'Land Opportunities', icon: Sun }
      ]
    },
    {
      label: 'Partners & Ecosystem',
      items: [
        { id: 'franchise' as AdminActiveView, label: 'Franchise Network', icon: ShieldCheck, badge: 3 },
        { id: 'territories' as AdminActiveView, label: 'UK Territory Density', icon: MapPin },
        { id: 'partners' as AdminActiveView, label: 'EPC & Installers', icon: Award },
        { id: 'investors' as AdminActiveView, label: 'ESG Capital CRM', icon: Users },
        { id: 'technology' as AdminActiveView, label: 'Hardware Catalogue', icon: Cpu }
      ]
    },
    {
      label: 'Enterprise Management',
      items: [
        { id: 'documents' as AdminActiveView, label: 'Document EDMS', icon: Layers },
        { id: 'tasks' as AdminActiveView, label: 'Tasks & Dispatch', icon: Clock, badge: adminStore.getTasks().filter(t => t.status !== 'COMPLETED').length },
        { id: 'communication' as AdminActiveView, label: 'Interaction Log', icon: MessageSquare },
        { id: 'reports' as AdminActiveView, label: 'Analytics & Reports', icon: BarChart3 }
      ]
    },
    {
      label: 'Governance & Security',
      items: [
        { id: 'executive' as AdminActiveView, label: 'Executive Board View', icon: Award },
        { id: 'users-roles' as AdminActiveView, label: 'Users & RBAC Roles', icon: Lock },
        { id: 'audit' as AdminActiveView, label: 'Immutable Audit Trail', icon: Activity }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#F4F6F9] overflow-hidden font-sans select-none antialiased">
      
      {/* 1. DARK NAVY SIDEBAR */}
      <aside className="w-64 bg-[#06152F] text-slate-300 flex flex-col border-r-2 border-line shrink-0 z-30">
        
        {/* Brand Header */}
        <div className="p-4 border-b border-line bg-[#040E20] flex items-center justify-between">
          <div className="space-y-1">
            <UniteSolarLogo size="sm" theme="dark" />
            <div className="text-[9px] font-mono text-slate-400 tracking-wider">
              OPERATING SYSTEM v4.2 // ENTERPRISE
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 custom-scrollbar">
          {NAV_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                {section.label}
              </span>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-sm'
                          : 'hover:bg-[#0A1E3A] text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#06152F]' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold font-mono ${
                            isActive
                              ? 'bg-[#06152F] text-[#7AAA2B]'
                              : 'bg-[#FF6321] text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile & Corporate Entity Footprint */}
        <div className="p-3 border-t border-line bg-[#040E20] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-sm bg-[#7AAA2B] text-[#06152F] font-bold font-mono flex items-center justify-center text-xs shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate font-mono">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-[#7AAA2B] font-mono truncate">
                  {currentUser.role.replace('_', ' ')}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-sm hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[9px] text-slate-500 font-mono pt-1 border-t border-line/60">
            Unite Greentek Limited (UK) • Co. #13854124
          </div>
        </div>

      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP ENTERPRISE NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-20 shadow-xs">
          
          {/* Left: Global Search Launcher */}
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-sm text-xs font-mono text-slate-400 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search leads, projects, customers, quotes...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 rounded text-slate-600 font-bold">
                /
              </kbd>
            </button>
          </div>

          {/* Right: Quick Action Controls, Role Switcher & Notifications */}
          <div className="flex items-center gap-3">
            
            {/* Instant Demo Role Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-sm border border-slate-200 text-xs font-mono">
              <span className="text-slate-400 text-[10px] uppercase font-bold pl-1.5">Role:</span>
              <select
                value={currentUser.role}
                onChange={(e) => onSwitchRole(e.target.value as AdminUserRole)}
                className="bg-white border-none rounded-sm px-2 py-1 text-slate-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Administrator</option>
                <option value="PROJECT_MANAGER">Project Manager</option>
                <option value="SALES_LEAD">Sales Origination</option>
                <option value="SITE_SURVEYOR">Site Surveyor</option>
                <option value="FRANCHISE_PARTNER">Franchise Partner</option>
                <option value="INVESTOR_VIEWER">Investor Viewer</option>
              </select>
            </div>

            {/* Notifications Trigger */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-sm hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF6321] ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Return to Public Website */}
            <button
              onClick={onNavigateToPublic}
              className="px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#7AAA2B]" />
              <span className="hidden md:inline">Public Website</span>
            </button>

          </div>

        </header>

        {/* SCROLLABLE VIEW CANVAS */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F4F6F9]">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {activeView === 'dashboard' && (
              <DashboardView
                currentUser={currentUser}
                onNavigate={handleNavigate}
                onOpenCreateLead={() => setIsCreateLeadOpen(true)}
                onOpenCreateProject={() => {
                  setLeadForProjectConversion(null);
                  setIsCreateProjectOpen(true);
                }}
                onOpenCreateQuote={() => setActiveView('quotes')}
              />
            )}

            {activeView === 'leads' && (
              <LeadsView
                currentUser={currentUser}
                onOpenLeadDetail={(id) => setSelectedLeadId(id)}
                onOpenCreateLead={() => setIsCreateLeadOpen(true)}
                onConvertToProject={handleConvertToProject}
              />
            )}

            {activeView === 'customers' && (
              <CustomersView
                currentUser={currentUser}
                onOpenProject={(id) => handleNavigate('projects', id)}
              />
            )}

            {activeView === 'projects' && (
              <ProjectsView
                currentUser={currentUser}
                onOpenProjectDetail={(id) => setSelectedProjectId(id)}
                onOpenCreateProject={() => {
                  setLeadForProjectConversion(null);
                  setIsCreateProjectOpen(true);
                }}
              />
            )}

            {activeView === 'site-surveys' && (
              <SiteSurveysView currentUser={currentUser} />
            )}

            {activeView === 'quotes' && (
              <QuotesView currentUser={currentUser} />
            )}

            {activeView === 'ppa' && (
              <PpaManagementView currentUser={currentUser} />
            )}

            {activeView === 'land' && (
              <LandOpportunitiesView currentUser={currentUser} />
            )}

            {activeView === 'franchise' && (
              <FranchiseAdminView currentUser={currentUser} />
            )}

            {activeView === 'territories' && (
              <TerritoryAdminView currentUser={currentUser} />
            )}

            {activeView === 'partners' && (
              <PartnersView currentUser={currentUser} />
            )}

            {activeView === 'investors' && (
              <InvestorsView currentUser={currentUser} />
            )}

            {activeView === 'technology' && (
              <TechnologyView currentUser={currentUser} />
            )}

            {activeView === 'documents' && (
              <DocumentsView currentUser={currentUser} />
            )}

            {activeView === 'tasks' && (
              <TasksView currentUser={currentUser} />
            )}

            {activeView === 'communication' && (
              <CommunicationView currentUser={currentUser} />
            )}

            {activeView === 'reports' && (
              <ReportsView currentUser={currentUser} />
            )}

            {activeView === 'executive' && (
              <ExecutiveView currentUser={currentUser} />
            )}

            {activeView === 'users-roles' && (
              <UsersRolesView currentUser={currentUser} />
            )}

            {activeView === 'audit' && (
              <AuditLogView currentUser={currentUser} />
            )}

          </div>
        </main>

      </div>

      {/* 3. GLOBAL MODALS AND OVERLAYS */}
      
      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Real-time Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleNavigate}
        notifications={notifications}
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />

      {/* Lead Detail Modal */}
      <LeadDetailModal
        leadId={selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
        onRefresh={() => setRefreshKey((k) => k + 1)}
        onConvertToProject={handleConvertToProject}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={isCreateLeadOpen}
        onClose={() => setIsCreateLeadOpen(false)}
        onSuccess={(id) => {
          setSelectedLeadId(id);
          setActiveView('leads');
        }}
      />

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => {
          setIsCreateProjectOpen(false);
          setLeadForProjectConversion(null);
        }}
        onSuccess={(id) => {
          setSelectedProjectId(id);
          setActiveView('projects');
        }}
        initialLead={leadForProjectConversion}
      />

    </div>
  );
};
