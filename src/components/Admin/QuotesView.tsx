import React, { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  Plus,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  Zap,
  Building,
  X
} from 'lucide-react';
import { AdminQuote, AdminUser, QuoteLineItem } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';
import { QuotePdfViewer } from './QuotePdfViewer';

interface QuotesViewProps {
  currentUser: AdminUser;
}

export const QuotesView: React.FC<QuotesViewProps> = ({ currentUser }) => {
  const quotes = adminStore.getQuotes();
  const [selectedQuoteForPdf, setSelectedQuoteForPdf] = useState<AdminQuote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for Create Quote
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('Northamptonshire');
  const [systemSizeKw, setSystemSizeKw] = useState(500);
  const [commercialModel, setCommercialModel] = useState<'CAPEX' | 'PPA' | 'RESCO'>('PPA');
  const [ppaRate, setPpaRate] = useState(17.2);
  const [ppaYears, setPpaYears] = useState(20);

  const [items, setItems] = useState<QuoteLineItem[]>([
    { id: '1', category: 'MODULES', description: 'Tier-1 580W N-Type TOPCon Panels', quantity: 860, unit: 'pcs', unitPriceGbp: 135, totalGbp: 116100 },
    { id: '2', category: 'INVERTER', description: '125kW High-Power Commercial Inverters', quantity: 4, unit: 'units', unitPriceGbp: 4800, totalGbp: 19200 },
    { id: '3', category: 'MOUNTING', description: 'Aerodynamic Trapezoidal Roof Mounting Structure', quantity: 500, unit: 'kWp', unitPriceGbp: 45, totalGbp: 22500 },
    { id: '4', category: 'INSTALLATION', description: 'Mechanical & Electrical Installation & CDM', quantity: 1, unit: 'project', unitPriceGbp: 45000, totalGbp: 45000 },
    { id: '5', category: 'ENGINEERING', description: 'DNO G99 Commissioning & Structural Calculations', quantity: 1, unit: 'service', unitPriceGbp: 12000, totalGbp: 12000 }
  ]);

  const subtotal = items.reduce((acc, it) => acc + it.totalGbp, 0);
  const tax = commercialModel === 'PPA' ? 0 : subtotal * 0.2;
  const grandTotal = subtotal + tax;

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !projectName) return;

    const newQ = adminStore.addQuote({
      customerId: `CUST-${Date.now()}`,
      customerName,
      customerEmail,
      projectName,
      location,
      systemSizeKw: Number(systemSizeKw) || 500,
      technology: 'solar-pv',
      commercialModel,
      items,
      subtotalGbp: subtotal,
      taxRatePct: commercialModel === 'PPA' ? 0 : 20,
      taxAmountGbp: tax,
      totalGbp: grandTotal,
      ppaRatePencePerKwh: commercialModel === 'PPA' ? Number(ppaRate) : undefined,
      ppaTermYears: commercialModel === 'PPA' ? Number(ppaYears) : undefined,
      validUntil: new Date(Date.now() + 45 * 24 * 3600 * 1000).toISOString().substring(0, 10),
      status: 'SENT',
      issuedBy: currentUser.name,
      termsAndConditions: 'Proposal pricing valid for 45 calendar days. Commercial PPA indexed to CPI annually.'
    });

    setShowCreateModal(false);
    setSelectedQuoteForPdf(newQ);
  };

  const filteredQuotes = quotes.filter((q) =>
    q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: AdminQuote['status']) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'SENT':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ACCEPTED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'EXPIRED':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Quotation & Commercial Proposal Engine
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {quotes.length} Quotes
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Itemized Turnkey CAPEX, Zero-CAPEX PPA yield simulations, and formal corporate proposals.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ CREATE QUOTATION</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search quotations by quote ref, customer or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono focus:outline-none focus:border-[#7AAA2B]"
          />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase text-slate-500">
                <th className="p-3.5">Quote Ref</th>
                <th className="p-3.5">Issue Date</th>
                <th className="p-3.5">Customer & Project</th>
                <th className="p-3.5">Capacity</th>
                <th className="p-3.5">Model</th>
                <th className="p-3.5">Contract Total</th>
                <th className="p-3.5">Valid Until</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">PDF Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => setSelectedQuoteForPdf(q)}
                  className="hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <td className="p-3.5 font-mono font-bold text-[#FF6321]">
                    {q.quoteNumber}
                  </td>
                  <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                    {q.createdAt}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 group-hover:text-[#7AAA2B] transition-colors">
                      {q.customerName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {q.projectName}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-800">
                    {q.systemSizeKw >= 1000 ? `${(q.systemSizeKw / 1000).toFixed(2)} MWp` : `${q.systemSizeKw} kWp`}
                  </td>
                  <td className="p-3.5 font-mono">
                    <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {q.commercialModel}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#7AAA2B] text-sm">
                    £{q.totalGbp.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                    {q.validUntil}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold uppercase border ${getStatusBadge(q.status)}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedQuoteForPdf(q)}
                      className="px-3 py-1 rounded-sm bg-[#06152F] hover:bg-[#0A1E3A] text-white font-mono text-[11px] flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7AAA2B]" />
                      <span>View PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF View Modal */}
      {selectedQuoteForPdf && (
        <QuotePdfViewer
          quote={selectedQuoteForPdf}
          onClose={() => setSelectedQuoteForPdf(null)}
        />
      )}

      {/* Create Quote Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-sm border border-slate-300 shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 uppercase font-display">
                Create Commercial Proposal & Quotation
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-sm text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Customer / Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Northampton Logistics"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Customer Email</label>
                  <input
                    type="email"
                    placeholder="contact@company.co.uk"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phase 2 Warehouse Solar Rooftop"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Capacity (kWp)</label>
                  <input
                    type="number"
                    value={systemSizeKw}
                    onChange={(e) => setSystemSizeKw(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Commercial Structure</label>
                  <select
                    value={commercialModel}
                    onChange={(e) => setCommercialModel(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-sm"
                  >
                    <option value="PPA">Corporate PPA (Zero-CAPEX)</option>
                    <option value="CAPEX">Turnkey CAPEX (Direct Purchase)</option>
                    <option value="RESCO">RESCO Build-Own-Operate</option>
                  </select>
                </div>
                {commercialModel === 'PPA' && (
                  <>
                    <div>
                      <label className="block text-slate-700 font-mono mb-1">Tariff (pence/kWh)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={ppaRate}
                        onChange={(e) => setPpaRate(Number(e.target.value))}
                        className="w-full p-2 border border-slate-300 rounded-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-mono mb-1">PPA Term (Years)</label>
                      <input
                        type="number"
                        value={ppaYears}
                        onChange={(e) => setPpaYears(Number(e.target.value))}
                        className="w-full p-2 border border-slate-300 rounded-sm font-mono"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Item Summary calculation */}
              <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-1 font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Bill of Materials:</span>
                  <span>£{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT ({commercialModel === 'PPA' ? '0% Commercial Zero-Rated' : '20%'}):</span>
                  <span>£{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1 text-sm">
                  <span>Calculated Total:</span>
                  <span className="text-[#7AAA2B]">£{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-sm text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 mini-tag bg-[#7AAA2B] text-[#06152F] font-bold rounded-sm cursor-pointer"
                >
                  Generate Proposal PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
