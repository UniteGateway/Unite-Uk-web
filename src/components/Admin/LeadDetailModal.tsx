import React, { useState } from 'react';
import {
  X,
  Building,
  Mail,
  Phone,
  MapPin,
  Zap,
  Calendar,
  User,
  Plus,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FolderKanban,
  Upload,
  MessageSquare
} from 'lucide-react';
import { AdminLead, LeadStatus } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface LeadDetailModalProps {
  leadId: string | null;
  onClose: () => void;
  onRefresh: () => void;
  onConvertToProject?: (lead: AdminLead) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  leadId,
  onClose,
  onRefresh,
  onConvertToProject
}) => {
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'NOTE' | 'CALL' | 'EMAIL' | 'MEETING'>('NOTE');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [showStatusSelect, setShowStatusSelect] = useState(false);

  if (!leadId) return null;
  const lead = adminStore.getLeadById(leadId);
  if (!lead) return null;

  const handleStatusChange = (status: LeadStatus) => {
    adminStore.updateLeadStatus(lead.id, status);
    setShowStatusSelect(false);
    onRefresh();
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    adminStore.addLeadActivity(lead.id, {
      type: noteType,
      title: `${noteType}: Logged entry`,
      description: newNote.trim()
    });

    setNewNote('');
    setIsAddingNote(false);
    onRefresh();
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONTACTED':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'QUALIFIED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SITE_SURVEY':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'PROPOSAL':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'NEGOTIATION':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'WON':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'LOST':
        return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-2xl bg-white flex flex-col h-full shadow-2xl border-l border-slate-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-[#06152F] text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm bg-[#040E20] border border-line text-[#FF6321] text-[10px] font-mono font-bold">
                {lead.id}
              </span>
              <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold uppercase border ${getStatusBadge(lead.status)}`}>
                {lead.status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl font-bold font-display uppercase tracking-tight text-white">
              {lead.company ? `${lead.name} • ${lead.company}` : lead.name}
            </h2>
            <p className="text-xs text-slate-300 font-mono">
              Created {lead.createdAt} • Source: {lead.source}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowStatusSelect(!showStatusSelect)}
                className="px-3 py-1.5 rounded-sm bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Change Status</span>
              </button>
              {showStatusSelect && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-slate-300 rounded-sm shadow-lg z-20 py-1">
                  {(['NEW', 'CONTACTED', 'QUALIFIED', 'SITE_SURVEY', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 cursor-pointer ${
                        lead.status === st ? 'font-bold text-[#7AAA2B]' : 'text-slate-700'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsAddingNote(true)}
              className="px-3 py-1.5 rounded-sm bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Note</span>
            </button>
          </div>

          {onConvertToProject && (
            <button
              onClick={() => onConvertToProject(lead)}
              className="px-3 py-1.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8bc232] text-[#06152F] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>CONVERT TO PROJECT</span>
            </button>
          )}
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-sm border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Direct Contact</span>
              <div className="font-semibold text-slate-800">{lead.name}</div>
              <div className="text-slate-600 text-[11px] font-mono truncate">{lead.email}</div>
              <div className="text-slate-600 text-[11px] font-mono">{lead.phone}</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Location & Region</span>
              <div className="font-semibold text-slate-800">{lead.location}</div>
              <div className="text-slate-600 text-[11px] font-mono">{lead.region}</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Technology & Capacity</span>
              <div className="font-bold text-[#7AAA2B] text-sm">
                {lead.estimatedCapacityKw >= 1000 ? `${(lead.estimatedCapacityKw / 1000).toFixed(1)} MWp` : `${lead.estimatedCapacityKw} kWp`}
              </div>
              <div className="text-slate-600 text-[11px] uppercase font-mono">{lead.technology}</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Commercial Model</span>
              <div className="font-semibold text-slate-800">{lead.businessModel}</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Assigned Officer</span>
              <div className="font-semibold text-slate-800">{lead.assignedTo}</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Property Type</span>
              <div className="font-semibold text-slate-800">{lead.propertyType || 'Commercial Building'}</div>
            </div>
          </div>

          {/* Energy Profile */}
          {(lead.energyRequirementAnnualKwh || lead.monthlyBillGbp || lead.notes) && (
            <div className="p-4 rounded-sm border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px]">
                Energy Profile & Requirement Details
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                {lead.energyRequirementAnnualKwh && (
                  <div className="p-2 bg-slate-50 rounded-sm">
                    <span className="text-slate-500 block">Annual Consumption:</span>
                    <span className="font-bold text-slate-800">{lead.energyRequirementAnnualKwh.toLocaleString()} kWh/yr</span>
                  </div>
                )}
                {lead.monthlyBillGbp && (
                  <div className="p-2 bg-slate-50 rounded-sm">
                    <span className="text-slate-500 block">Monthly Spend:</span>
                    <span className="font-bold text-slate-800">£{lead.monthlyBillGbp.toLocaleString()} / mo</span>
                  </div>
                )}
              </div>
              {lead.notes && (
                <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-amber-900 block text-[10px] font-mono uppercase mb-0.5">Assessment Notes:</span>
                  {lead.notes}
                </div>
              )}
            </div>
          )}

          {/* Add Activity Form */}
          {isAddingNote && (
            <form onSubmit={handleAddActivity} className="p-4 rounded-sm bg-slate-50 border-2 border-slate-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono">Log CRM Activity</span>
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-mono"
                >
                  Cancel
                </button>
              </div>

              <div className="flex gap-2">
                {(['NOTE', 'CALL', 'EMAIL', 'MEETING'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNoteType(t)}
                    className={`px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold cursor-pointer ${
                      noteType === t ? 'bg-[#06152F] text-white' : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <textarea
                required
                rows={3}
                placeholder="Enter communication summary, client feedback, or agreed next steps..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-[#7AAA2B]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] font-bold text-xs cursor-pointer"
                >
                  Save Activity
                </button>
              </div>
            </form>
          )}

          {/* Timeline of Events & CRM Activities */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7AAA2B]" />
              Activity & Engagement Timeline ({lead.activities.length})
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {lead.activities.map((act) => (
                <div key={act.id} className="relative group text-xs space-y-1">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#7AAA2B] ring-4 ring-white" />
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="font-bold text-slate-700 uppercase">{act.title}</span>
                    <span>{act.timestamp}</span>
                  </div>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-sm border border-slate-100 leading-relaxed">
                    {act.description}
                  </p>
                  <span className="text-[9px] text-slate-400 font-mono block">Logged by {act.user}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Unite Greentek CRM Pipeline</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#06152F] text-white rounded-sm font-bold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
