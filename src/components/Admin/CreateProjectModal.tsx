import React, { useState } from 'react';
import { X, FolderKanban, Building, MapPin, Zap } from 'lucide-react';
import { ProjectStage, CommercialBusinessModel } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (projectId: string) => void;
  initialLead?: any;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialLead
}) => {
  const [name, setName] = useState(initialLead ? `${initialLead.name} - Solar Installation` : '');
  const [customerName, setCustomerName] = useState(initialLead ? (initialLead.company || initialLead.name) : '');
  const [location, setLocation] = useState(initialLead?.location || 'Northamptonshire');
  const [region, setRegion] = useState(initialLead?.region || 'East Midlands');
  const [capacityKw, setCapacityKw] = useState(initialLead?.estimatedCapacityKw || 500);
  const [commercialModel, setCommercialModel] = useState<CommercialBusinessModel>(initialLead?.businessModel || 'PPA');
  const [contractValueGbp, setContractValueGbp] = useState(initialLead?.estimatedCapacityKw ? initialLead.estimatedCapacityKw * 850 : 425000);
  const [projectManager, setProjectManager] = useState('Gareth Evans, Senior EPC PM');
  const [stage, setStage] = useState<ProjectStage>('DESIGN');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !customerName) return;

    const newProject = adminStore.addProject({
      name,
      customerName,
      location,
      region,
      technology: 'Solar PV & BESS',
      capacityKw: Number(capacityKw) || 500,
      developmentStage: stage,
      commercialModel,
      projectManager,
      contractValueGbp: Number(contractValueGbp) || 425000,
      annualYieldMwh: Math.round(Number(capacityKw) * 0.95),
      co2OffsetTonnesAnnual: Math.round(Number(capacityKw) * 0.95 * 0.21),
      estimatedCompletionDate: '2026-11-30',
      status: 'ON_TRACK',
      dnoStatus: {
        dnoName: 'National Grid Electricity Distribution (NGED)',
        applicationType: 'G99',
        gridStatus: 'ACCEPTED',
        exportCapacityKw: Number(capacityKw) || 500
      }
    });

    onSuccess(newProject.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-sm border border-slate-300 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-[#7AAA2B]" />
            New Renewable Energy Project Dossier
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-slate-400 hover:text-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-mono mb-1">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Northampton Logistics 500kWp Rooftop Solar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-sm focus:outline-none focus:border-[#7AAA2B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono mb-1">Customer / Offtaker *</label>
              <input
                type="text"
                required
                placeholder="e.g. Northampton Logistics Terminal Ltd"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-mono mb-1">Location / Postcode</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono mb-1">Capacity (kWp)</label>
              <input
                type="number"
                value={capacityKw}
                onChange={(e) => {
                  const kw = Number(e.target.value);
                  setCapacityKw(kw);
                  setContractValueGbp(kw * 850);
                }}
                className="w-full p-2 border border-slate-300 rounded-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-mono mb-1">Commercial Structure</label>
              <select
                value={commercialModel}
                onChange={(e) => setCommercialModel(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              >
                <option value="PPA">Corporate PPA (Zero-CAPEX)</option>
                <option value="CAPEX">Direct Purchase (CAPEX)</option>
                <option value="RESCO">RESCO Build-Own-Operate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono mb-1">Contract Value (GBP)</label>
              <input
                type="number"
                value={contractValueGbp}
                onChange={(e) => setContractValueGbp(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-mono mb-1">Starting Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-sm font-mono"
              >
                <option value="FEASIBILITY">Feasibility</option>
                <option value="SITE_ASSESSMENT">Site Assessment</option>
                <option value="DESIGN">Detailed Design</option>
                <option value="DNO_GRID">DNO G99 Grid</option>
                <option value="INSTALLATION">EPC Installation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-mono mb-1">Assigned Project Manager</label>
            <input
              type="text"
              value={projectManager}
              onChange={(e) => setProjectManager(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-sm font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-sm text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 mini-tag bg-[#7AAA2B] text-[#06152F] font-bold rounded-sm cursor-pointer shadow-xs"
            >
              Create Project Dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
