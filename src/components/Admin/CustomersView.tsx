import React, { useState } from 'react';
import {
  Building,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  FolderKanban,
  Zap,
  DollarSign,
  Download
} from 'lucide-react';
import { AdminCustomer, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface CustomersViewProps {
  currentUser: AdminUser;
  onOpenProject?: (id: string) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ currentUser, onOpenProject }) => {
  const customers = adminStore.getCustomers();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((c) =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Customer Accounts & Client CRM
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {customers.length} Accounts
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Commercial offtakers, industrial estates, agricultural estates, and educational academies.
          </p>
        </div>

        <button
          onClick={() => alert('New Customer Form Wizard')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ NEW CUSTOMER</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search customers by company or contact name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-[#7AAA2B]"
          />
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs hover:border-[#7AAA2B] transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#FF6321]">
                  {cust.id}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                  {cust.category}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {cust.companyName}
                </h3>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">
                  {cust.contactName}
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cust.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cust.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cust.address}, {cust.postcode}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Deployed:</span>
                <strong className="text-[#7AAA2B] font-bold text-sm">
                  {cust.totalInstalledCapacityKw >= 1000 ? `${(cust.totalInstalledCapacityKw / 1000).toFixed(1)} MWp` : `${cust.totalInstalledCapacityKw} kWp`}
                </strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Projects:</span>
                <strong className="text-slate-800">{cust.linkedProjectIds.length} Linked</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
