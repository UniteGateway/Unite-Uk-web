import React, { useState } from 'react';
import { X, Users, Building, MapPin, Zap } from 'lucide-react';
import { LeadType, CommercialBusinessModel } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (leadId: string) => void;
}

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Northamptonshire');
  const [region, setRegion] = useState('East Midlands');
  const [leadType, setLeadType] = useState<LeadType>('Commercial');
  const [technology, setTechnology] = useState('Commercial Rooftop Solar PV & BESS');
  const [estimatedCapacityKw, setEstimatedCapacityKw] = useState(250);
  const [businessModel, setBusinessModel] = useState<CommercialBusinessModel>('PPA');
  const [propertyType, setPropertyType] = useState('Distribution Center / Industrial Unit');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newLead = adminStore.addLead({
      name,
      company: company || undefined,
      email,
      phone,
      location,
      region,
      leadType,
      technology,
      estimatedCapacityKw: Number(estimatedCapacityKw) || 250,
      businessModel,
      status: 'NEW',
      source: 'Internal Admin Origination',
      assignedTo: 'Marcus Vance, Commercial Director',
      propertyType,
      notes: notes || undefined
    });

    onSuccess(newLead.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-sm border border-slate-300 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
            <Users className="w-4 h-4 text-[#FF6321]" />
            New Renewable Energy Lead Entry
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-slate-400 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono mb-1">Contact Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. David Morrison"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-sm focus:outline-none focus:border-[#7AAA2B]"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-mono mb-1">Company / Organization</label>
              <input
                type="text"
                placeholder="e.g. Midlands Logistics Park"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="client@company.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-mono mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+44 7700 900123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono mb-1">Location / Postcode</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-mono mb-1">Lead Type</label>
              <select
                value={leadType}
                onChange={(e) => setLeadType(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              >
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Landowner">Landowner</option>
                <option value="Residential">Residential</option>
                <option value="Franchise">Franchise Candidate</option>
                <option value="Investor">Investor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono mb-1">Estimated Capacity (kWp)</label>
              <input
                type="number"
                value={estimatedCapacityKw}
                onChange={(e) => setEstimatedCapacityKw(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-mono mb-1">Commercial Structure</label>
              <select
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-sm"
              >
                <option value="PPA">Corporate PPA (Zero-CAPEX)</option>
                <option value="CAPEX">Direct Purchase (CAPEX)</option>
                <option value="RESCO">RESCO Build-Own-Operate</option>
                <option value="LEASING">Equipment Leasing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-mono mb-1">Assessment Notes & Requirements</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Roof orientation, annual energy bill, half-hourly data availability..."
              className="w-full p-2 border border-slate-300 rounded-sm focus:outline-none focus:border-[#7AAA2B]"
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
              className="px-4 py-2 mini-tag bg-[#FF6321] text-white font-bold rounded-sm cursor-pointer shadow-xs"
            >
              Save Lead to Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
