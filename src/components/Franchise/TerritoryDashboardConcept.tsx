import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Layers,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Tag,
  Filter
} from 'lucide-react';
import {
  DEMO_CRM_KPIS,
  DEMO_CRM_LEADS,
  DEMO_CRM_PROJECTS
} from '../../data/franchiseData';

export const TerritoryDashboardConcept: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'leads' | 'projects'>('kpis');

  return (
    <section id="territory-dashboard-concept" className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
              <LayoutDashboard className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Section 06 // Centralized CRM Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              TERRITORY PARTNER DASHBOARD
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Real-time operational control center for your territory. Track lead pipeline, survey bookings, project milestones, and audited net profit share distributions.
            </p>
          </div>

          {/* Prominent Demo Flag as Mandated by Prompt 6 */}
          <div className="px-3 py-1.5 rounded-sm bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase flex items-center gap-2 self-start md:self-auto shrink-0 shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>DEMO DATA // CRM SIMULATION</span>
          </div>
        </div>

        {/* CRM Dashboard Frame */}
        <div className="bg-[#06152F] border-2 border-line rounded-sm shadow-2xl overflow-hidden">
          
          {/* Top Mock Window Bar */}
          <div className="bg-[#0A1E3A] px-4 py-3 border-b border-line flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                crm.unitegreentech.com / territory / DEVON-CORNWALL
              </span>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('kpis')}
                className={`px-3 py-1 rounded-sm text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'kpis'
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#06152F]'
                }`}
              >
                Executive Metrics
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3 py-1 rounded-sm text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'leads'
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#06152F]'
                }`}
              >
                Active Leads ({DEMO_CRM_LEADS.length})
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-1 rounded-sm text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'projects'
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#06152F]'
                }`}
              >
                Live Projects ({DEMO_CRM_PROJECTS.length})
              </button>
            </div>
          </div>

          {/* Tab 1: Executive KPI Cards (Section 6 of Prompt 5: LEADS, NEW ENQUIRIES, SITE SURVEYS, QUOTATIONS, PROJECTS, CUSTOMERS, REVENUE, PROFIT SHARE) */}
          {activeTab === 'kpis' && (
            <div className="p-6 space-y-6">
              
              {/* 8 Primary CRM Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* 1. LEADS */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">TOTAL LEADS</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-display">
                      {DEMO_CRM_KPIS.totalLeads}
                    </span>
                    <span className="text-[10px] font-mono text-[#7AAA2B]">+14% MoM</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">Territory wide pool</span>
                </div>

                {/* 2. NEW ENQUIRIES */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">NEW ENQUIRIES</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-sky-400 font-display">
                      {DEMO_CRM_KPIS.newEnquiries}
                    </span>
                    <span className="text-[10px] font-mono text-sky-400">Unread</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">Inbound web & portal</span>
                </div>

                {/* 3. SITE SURVEYS */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">SITE SURVEYS</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-amber-400 font-display">
                      {DEMO_CRM_KPIS.siteSurveysBooked}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Booked</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">Drone & structural checks</span>
                </div>

                {/* 4. QUOTATIONS */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">QUOTATIONS</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-purple-400 font-display">
                      {DEMO_CRM_KPIS.activeQuotations}
                    </span>
                    <span className="text-[10px] font-mono text-purple-300">Active</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">In negotiation</span>
                </div>

                {/* 5. PROJECTS */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">LIVE PROJECTS</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-teal-400 font-display">
                      {DEMO_CRM_KPIS.liveProjects}
                    </span>
                    <span className="text-[10px] font-mono text-teal-300">In build / O&M</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">Avg 285 kWp size</span>
                </div>

                {/* 6. CUSTOMERS */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">CUSTOMERS</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-display">
                      {DEMO_CRM_KPIS.activeCustomers}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Managed</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">C&I & Farms</span>
                </div>

                {/* 7. REVENUE */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">PIPELINE REVENUE</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-display">
                      £4.85M
                    </span>
                    <span className="text-[10px] font-mono text-[#7AAA2B]">Gross</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">Active proposals</span>
                </div>

                {/* 8. PROFIT SHARE */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border-2 border-[#7AAA2B]/60 space-y-1">
                  <span className="text-[10px] font-mono text-[#7AAA2B] uppercase block font-bold">
                    EST. PROFIT SHARE*
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#7AAA2B] font-display">
                      £121,250
                    </span>
                    <span className="text-[10px] font-mono text-[#7AAA2B]">25% Pool</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">Subject to completion</span>
                </div>

              </div>

              {/* CRM Interactive Snapshot */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Recent Pipeline Activity */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="text-xs font-bold text-white uppercase font-display">
                      Recent Inbound Qualified Leads
                    </span>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-[11px] text-[#7AAA2B] hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {DEMO_CRM_LEADS.slice(0, 3).map((lead) => (
                      <div
                        key={lead.leadId}
                        className="p-2.5 rounded-sm bg-[#06152F] border border-line flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-white block">{lead.customerName}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {lead.technology} • Est. £{lead.estimatedValueGbp.toLocaleString()}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-sm bg-[#0A1E3A] border border-line text-[10px] font-mono text-sky-300">
                          {lead.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Deliveries */}
                <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="text-xs font-bold text-white uppercase font-display">
                      Live Project Milestones
                    </span>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-[11px] text-[#7AAA2B] hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {DEMO_CRM_PROJECTS.map((prj) => (
                      <div
                        key={prj.projectId}
                        className="p-2.5 rounded-sm bg-[#06152F] border border-line flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-white block">{prj.projectName}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {prj.systemSizeKw} kW • Profit Share: £{prj.estimatedNetProfitShareGbp.toLocaleString()}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-sm bg-[#7AAA2B]/20 border border-[#7AAA2B]/40 text-[10px] font-mono text-[#7AAA2B] font-bold">
                          {prj.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Tab 2: Leads Table */}
          {activeTab === 'leads' && (
            <div className="p-4 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-line text-slate-400 uppercase text-[10px]">
                    <th className="pb-3">Lead ID</th>
                    <th className="pb-3">Customer / Company</th>
                    <th className="pb-3">Tech</th>
                    <th className="pb-3">Territory</th>
                    <th className="pb-3">Stage</th>
                    <th className="pb-3">Est. Value</th>
                    <th className="pb-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {DEMO_CRM_LEADS.map((l) => (
                    <tr key={l.leadId} className="hover:bg-[#0A1E3A]/60">
                      <td className="py-3 text-slate-400">{l.leadId}</td>
                      <td className="py-3 font-semibold text-white">{l.customerName}</td>
                      <td className="py-3 text-[#7AAA2B]">{l.technology}</td>
                      <td className="py-3 text-slate-300">{l.territory}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-sm bg-[#0A1E3A] border border-line text-[10px] text-sky-300">
                          {l.stage}
                        </span>
                      </td>
                      <td className="py-3 text-white">£{l.estimatedValueGbp.toLocaleString()}</td>
                      <td className="py-3 text-slate-400">{l.leadSource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Projects Table */}
          {activeTab === 'projects' && (
            <div className="p-4 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-line text-slate-400 uppercase text-[10px]">
                    <th className="pb-3">Project Code</th>
                    <th className="pb-3">Project Name</th>
                    <th className="pb-3">Capacity</th>
                    <th className="pb-3">Stage</th>
                    <th className="pb-3">Contract Value</th>
                    <th className="pb-3">Est. 25% Profit Share</th>
                    <th className="pb-3">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {DEMO_CRM_PROJECTS.map((p) => (
                    <tr key={p.projectId} className="hover:bg-[#0A1E3A]/60">
                      <td className="py-3 text-slate-400">{p.projectId}</td>
                      <td className="py-3 font-semibold text-white">{p.projectName}</td>
                      <td className="py-3 text-amber-400">{p.systemSizeKw} kW</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-sm bg-[#7AAA2B]/20 border border-[#7AAA2B]/40 text-[10px] text-[#7AAA2B] font-bold">
                          {p.stage}
                        </span>
                      </td>
                      <td className="py-3 text-white">£{p.contractValueGbp.toLocaleString()}</td>
                      <td className="py-3 text-[#7AAA2B] font-bold">£{p.estimatedNetProfitShareGbp.toLocaleString()}</td>
                      <td className="py-3 text-slate-400">{p.completionDateEstimated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
