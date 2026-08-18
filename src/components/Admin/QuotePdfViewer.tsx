import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Zap, Building, Mail, Phone, Globe } from 'lucide-react';
import { AdminQuote } from '../../types/adminTypes';
import { UniteSolarLogo } from '../UniteLogos';

interface QuotePdfViewerProps {
  quote: AdminQuote | null;
  onClose: () => void;
}

export const QuotePdfViewer: React.FC<QuotePdfViewerProps> = ({ quote, onClose }) => {
  if (!quote) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white animate-fade-in">
      
      {/* Floating Action Controls (Hidden when printing) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 print:hidden">
        <button
          onClick={handlePrint}
          className="px-3.5 py-2 rounded-sm bg-[#7AAA2B] text-[#06152F] text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg hover:bg-[#8ec236] cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT / EXPORT PDF</span>
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-sm bg-[#06152F] border border-slate-700 text-white hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* A4 Document Canvas Container */}
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden border border-slate-200 print:border-none print:shadow-none p-8 sm:p-12 space-y-8 font-sans">
        
        {/* Document Header with Unite Solar Logo */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 border-b-2 border-[#06152F] pb-6">
          <div className="space-y-2">
            <UniteSolarLogo size="md" theme="light" />
            <div className="text-[11px] text-slate-600 font-mono pt-1">
              <span className="font-bold text-[#06152F]">UNITE GREENTEK LIMITED</span> (United Kingdom)<br />
              Brand: Unite Solar • Parent: Unite Group Inc., USA<br />
              Website: unitegreentech.com • Tel: +44 (0) 203 034 1066
            </div>
          </div>

          <div className="sm:text-right space-y-1 text-xs font-mono">
            <span className="inline-block px-2.5 py-1 bg-[#06152F] text-white text-[11px] font-bold uppercase tracking-wider">
              COMMERCIAL PROPOSAL
            </span>
            <div className="text-slate-800 font-bold text-sm pt-1">
              Quote Ref: {quote.quoteNumber}
            </div>
            <div className="text-slate-500 text-[11px]">
              Issue Date: {quote.createdAt}
            </div>
            <div className="text-[#FF6321] font-bold text-[11px]">
              Validity: Until {quote.validUntil}
            </div>
          </div>
        </div>

        {/* Client & Project Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-sm border border-slate-200 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">
              Client & Site Details
            </span>
            <div className="font-bold text-sm text-slate-900">{quote.customerName}</div>
            <div className="text-slate-600 font-mono">{quote.customerEmail}</div>
            <div className="text-slate-600">{quote.location}</div>
          </div>

          <div className="space-y-1 sm:text-right">
            <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">
              Engineering Scope
            </span>
            <div className="font-bold text-sm text-slate-900">{quote.projectName}</div>
            <div className="text-[#7AAA2B] font-bold font-mono text-sm">
              {quote.systemSizeKw >= 1000 ? `${(quote.systemSizeKw / 1000).toFixed(2)} MWp` : `${quote.systemSizeKw} kWp`} System Capacity
            </div>
            <div className="text-slate-600 font-mono">
              Model: <strong className="text-slate-900">{quote.commercialModel}</strong>
            </div>
          </div>
        </div>

        {/* Commercial Model Highlight (PPA vs CAPEX) */}
        {quote.commercialModel === 'PPA' && quote.ppaRatePencePerKwh && (
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-sm text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 uppercase font-mono">
                Zero-CAPEX Corporate Power Purchase Agreement (PPA)
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-emerald-700 text-white font-mono font-bold text-[10px]">
                GUARANTEED TARIFF
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2 text-slate-800 font-mono">
              <div>
                <span className="text-slate-500 text-[10px] block">Initial Solar Tariff:</span>
                <strong className="text-base text-emerald-800">{quote.ppaRatePencePerKwh}p / kWh</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Contract Term:</span>
                <strong className="text-base text-slate-900">{quote.ppaTermYears || 20} Years</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Est. Annual Savings:</span>
                <strong className="text-base text-emerald-700">£{quote.ppaEstimatedAnnualSavingsGbp?.toLocaleString() || '185,000'} / yr</strong>
              </div>
            </div>
          </div>
        )}

        {/* Itemized Bill of Materials & Services */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
            Itemized Bill of Materials & Turnkey Scope
          </h4>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#06152F] text-white font-mono text-[10px] uppercase">
                <th className="p-3">Category</th>
                <th className="p-3">Specification / Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Unit Rate</th>
                <th className="p-3 text-right">Total (GBP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {quote.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-[10px] text-slate-600">
                    {item.category}
                  </td>
                  <td className="p-3 text-slate-800">
                    {item.description}
                  </td>
                  <td className="p-3 text-center font-mono text-slate-600">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="p-3 text-right font-mono text-slate-600">
                    {item.unitPriceGbp > 0 ? `£${item.unitPriceGbp.toLocaleString()}` : 'Included'}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    £{item.totalGbp.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Summary Breakdown */}
        <div className="flex justify-end pt-2">
          <div className="w-72 bg-slate-50 p-4 rounded-sm border border-slate-200 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>£{quote.subtotalGbp.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>VAT ({quote.taxRatePct}%):</span>
              <span>£{quote.taxAmountGbp.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t-2 border-slate-900 pt-2 text-sm font-bold text-slate-900">
              <span>Total Contract Value:</span>
              <span className="text-[#7AAA2B]">£{quote.totalGbp.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Contractual Terms & Disclaimers */}
        <div className="border-t border-slate-200 pt-4 space-y-2 text-[10px] text-slate-500 font-mono leading-relaxed">
          <div className="font-bold text-slate-700 uppercase">Terms & Conditions of Proposal:</div>
          <p>
            {quote.termsAndConditions}
          </p>
          <p>
            * All figures subject to structural roof survey validation, DNO G99 formal connection acceptance and final legal agreement. Powered by Unite Greentek Limited (UK).
          </p>
        </div>

        {/* Signature & Acceptance Block */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-xs">
          <div className="space-y-6">
            <span className="text-[10px] text-slate-500 font-mono uppercase block">
              Issued On Behalf of Unite Solar:
            </span>
            <div className="border-b border-slate-400 pb-1 font-bold font-mono">
              {quote.issuedBy}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Commercial Origination Desk</span>
          </div>

          <div className="space-y-6">
            <span className="text-[10px] text-slate-500 font-mono uppercase block">
              Client Acceptance & Sign-off:
            </span>
            <div className="border-b border-slate-400 pb-1 font-mono text-slate-400">
              Authorised Signature / Date
            </div>
            <span className="text-[10px] text-slate-400 font-mono">For {quote.customerName}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
