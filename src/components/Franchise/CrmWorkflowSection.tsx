import React from 'react';
import {
  Workflow,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Database,
  FileSpreadsheet,
  Users,
  ShieldCheck,
  Zap,
  Clock,
  Building2,
  FolderOpen
} from 'lucide-react';

export const CrmWorkflowSection: React.FC = () => {
  const stages = [
    { num: '01', name: 'LEAD', desc: 'Inbound web, referral or field outreach' },
    { num: '02', name: 'QUALIFICATION', desc: 'Roof area, half-hourly data & budget' },
    { num: '03', name: 'SITE SURVEY', desc: '3D drone imaging & structural check' },
    { num: '04', name: 'PROPOSAL', desc: 'PVsyst yield model & zero-capex PPA' },
    { num: '05', name: 'NEGOTIATION', desc: 'Commercial model & terms alignment' },
    { num: '06', name: 'CONTRACT', desc: 'Executed turnkey or PPA lease' },
    { num: '07', name: 'INSTALLATION', desc: 'Tier-1 EPC delivery & G99 grid energisation' },
    { num: '08', name: 'O&M', desc: 'Ongoing SCADA monitoring & 25-yr warranty' }
  ];

  const features = [
    {
      title: 'Lead Management',
      desc: 'Centralized lead repository with territory routing, automated deduplication, and qualified source attribution.'
    },
    {
      title: 'Customer Management',
      desc: 'Rich client profiles containing half-hourly consumption profiles, DNO MPAN numbers, and multiple site assets.'
    },
    {
      title: 'Quotation Management',
      desc: 'Instant financial simulation engine generating turnkey CAPEX, Corporate PPA, and RESCO proposals.'
    },
    {
      title: 'Project Tracking',
      desc: 'Stage-gate tracking across feasibility, structural surveys, LPA planning, and grid connection milestones.'
    },
    {
      title: 'Document Management',
      desc: 'Secure cloud repository for single-line electrical diagrams, structural reports, lease options, and warranties.'
    },
    {
      title: 'Follow-up Tasks',
      desc: 'Automated task reminders for client touchpoints, DNO response deadlines, and site inspection schedules.'
    },
    {
      title: 'Sales Pipeline',
      desc: 'Visual drag-and-drop Kanban view of all active opportunities with weighted revenue forecasting.'
    },
    {
      title: 'Territory Dashboard',
      desc: 'Dedicated geographic view showing localized market penetration, conversion ratios, and average deal sizes.'
    },
    {
      title: 'Executive Reporting',
      desc: 'Automated monthly PDF reports detailing pipeline velocity, generation potential, and carbon abatement.'
    },
    {
      title: 'Partner Dashboard',
      desc: 'Audited net profit share ledger detailing individual project margins and verified disbursement dates.'
    }
  ];

  return (
    <section id="crm-platform" className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Workflow className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 07 // Digital Operating Core</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            YOUR BUSINESS. <br />
            <span className="text-[#7AAA2B]">ONE DIGITAL PLATFORM.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Eliminate fragmented spreadsheets and ad-hoc tools. Our end-to-end CRM orchestrates every phase from initial lead generation to multi-decade O&M operations.
          </p>
        </div>

        {/* 8-Stage Visual CRM Workflow Flowchart (Section 7 of Prompt 5) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-400">
              END-TO-END PROJECT PIPELINE STAGES
            </span>
            <span className="text-[11px] font-mono text-[#7AAA2B]">8 Seamless Milestones</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {stages.map((st, idx) => (
              <div
                key={st.num}
                className="p-3 rounded-sm bg-[#040E20] border border-line hover:border-[#7AAA2B] transition-all flex flex-col justify-between space-y-2 relative group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#7AAA2B] font-bold">{st.num}</span>
                  {idx < stages.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden lg:block group-hover:text-[#7AAA2B] transition-colors" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-white uppercase font-display tracking-tight">
                    {st.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-light leading-tight mt-1">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10 CRM Features Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-400">
              INTEGRATED CRM SUITE CAPABILITIES
            </span>
            <span className="text-[11px] font-mono text-slate-400">Enterprise Grade</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-2 hover:border-[#7AAA2B]/60 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase font-display">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0" />
                  <span>{f.title}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
