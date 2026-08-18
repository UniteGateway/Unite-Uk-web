import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  ShieldCheck,
  Award,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PartnerEpcRecord, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface PartnersViewProps {
  currentUser: AdminUser;
}

export const PartnersView: React.FC<PartnersViewProps> = ({ currentUser }) => {
  const partners = adminStore.getPartners();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = partners.filter((p) =>
    p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              EPC Partners & Certified Supply Chain
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {partners.length} Vetted Partners
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Accredited electrical subcontractors (NICEIC, MCS, SafeContractor) and high-voltage grid engineers.
          </p>
        </div>

        <button
          onClick={() => alert('Onboard Partner Wizard')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ ONBOARD EPC PARTNER</span>
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs hover:border-[#7AAA2B] transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#FF6321]">
                  {partner.id}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase">
                  {partner.type.replace('_', ' ')}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {partner.companyName}
                </h3>
                <div className="text-xs text-slate-600 font-mono mt-0.5">
                  Contact: {partner.contactName}
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{partner.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{partner.phone}</span>
                </div>
              </div>

              {/* Accreditations */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Accreditations & Compliance:</span>
                <div className="flex flex-wrap gap-1">
                  {partner.accreditations.map((acc) => (
                    <span key={acc} className="px-1.5 py-0.5 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-mono font-bold">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Performance Rating:</span>
                <strong className="text-[#7AAA2B] font-bold">★ {partner.performanceRating} / 5.0</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Status:</span>
                <strong className="text-slate-800 uppercase text-[11px]">{partner.status}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
