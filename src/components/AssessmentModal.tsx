import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Zap, ShieldCheck, CheckCircle2, ArrowRight, Building, Phone, Mail, User, MapPin, Sparkles } from 'lucide-react';
import { UK_REGIONS } from '../data/energyData';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
  initialData?: any;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  initialType = 'commercial',
  initialData,
}) => {
  const [formType, setFormType] = useState<string>(initialType.includes('franchise') ? 'franchise' : 'assessment');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState(initialData?.region || 'Midlands & Central UK');
  const [projectScale, setProjectScale] = useState(initialData?.estimatedKwp ? `${initialData.estimatedKwp} kWp` : '500 kW - 1 MW');
  const [preferredModel, setPreferredModel] = useState(initialData?.model || 'Corporate PPA (Zero Capex)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F37021', '#4E8B1E', '#7AAA2B', '#38BDF8'],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0A1E3A] border border-line rounded-sm max-w-xl w-full p-5 sm:p-7 shadow-2xl relative text-slate-200 my-6 border-l-2 border-l-[#7AAA2B]">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-sm bg-[#06152F] hover:bg-slate-800 text-slate-400 hover:text-white border border-line transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#7AAA2B]/20 text-[#7AAA2B] flex items-center justify-center mx-auto border border-[#7AAA2B]/40 animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="mini-tag text-[#FF6321] block">
                Request Registered • Ref #{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase">
                {formType === 'franchise' ? 'Franchise Dossier Requested' : 'Feasibility Assessment Initiated'}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{contactName || 'Valued Partner'}</strong>. A senior renewable-energy technical director from Unite Greentek Limited will contact you shortly.
              </p>
            </div>

            <div className="p-3 rounded-sm bg-[#06152F] border border-line text-xs text-slate-400 max-w-md mx-auto text-left space-y-1 font-mono text-[11px]">
              <p><strong>Entity:</strong> Unite Greentek Limited (United Kingdom)</p>
              <p><strong>Direct Line:</strong> +44 203 034 1066</p>
              <p><strong>Email:</strong> info@unitegreentech.com</p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-5 py-2.5 rounded-sm mini-tag text-white bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold transition-colors cursor-pointer shadow-lg"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6321]" />
                <span className="mini-tag text-[#7AAA2B]">
                  Unite Greentek Limited • UK Operations
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight">
                {formType === 'franchise' ? 'Explore Unite Solar Franchise' : 'Request Site Feasibility Assessment'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {formType === 'franchise'
                  ? 'Access exclusive UK territory allocation data, commercial terms, and prospectus (£20k* entry).'
                  : 'Receive custom PVSyst yield simulations, half-hourly load analysis, and financial structure options.'}
              </p>
            </div>

            {/* Type selector toggle */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#06152F] rounded-sm border border-line text-xs font-bold">
              <button
                type="button"
                onClick={() => setFormType('assessment')}
                className={`py-1.5 rounded-sm mini-tag transition-all cursor-pointer ${
                  formType === 'assessment'
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Project Assessment
              </button>
              <button
                type="button"
                onClick={() => setFormType('franchise')}
                className={`py-1.5 rounded-sm mini-tag transition-all cursor-pointer ${
                  formType === 'franchise'
                    ? 'bg-[#FF6321] text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Franchise Partner (£20k*)
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 mini-tag">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Logistics Ltd"
                    className="w-full bg-[#06152F] border border-line rounded-sm px-3 py-2 text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 mini-tag">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-[#06152F] border border-line rounded-sm px-3 py-2 text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 mini-tag">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#06152F] border border-line rounded-sm px-3 py-2 text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 mini-tag">Phone Number (UK/Intl) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7..."
                    className="w-full bg-[#06152F] border border-line rounded-sm px-3 py-2 text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 mini-tag">Target UK Region *</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-[#06152F] border border-line rounded-sm px-3 py-2 text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                  >
                    {UK_REGIONS.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 mini-tag">
                    {formType === 'franchise' ? 'Target Launch Timeframe' : 'Preferred Model'}
                  </label>
                  <select
                    value={preferredModel}
                    onChange={(e) => setPreferredModel(e.target.value)}
                    className="w-full bg-[#06152F] border border-line rounded-sm px-3 py-2 text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                  >
                    {formType === 'franchise' ? (
                      <>
                        <option value="Immediate (1-2 months)">Immediate (1-2 months)</option>
                        <option value="Q3/Q4 Target">Q3/Q4 Target</option>
                        <option value="Exploring Feasibility">Exploring Feasibility</option>
                      </>
                    ) : (
                      <>
                        <option value="Corporate PPA (Zero Capex)">Corporate PPA (Zero Capex)</option>
                        <option value="Direct CAPEX (Full Ownership)">Direct CAPEX (Full Ownership)</option>
                        <option value="RESCO (Energy as a Service)">RESCO (Energy as a Service)</option>
                        <option value="BOOT / BOO Concession">BOOT / BOO Concession</option>
                        <option value="Project Leasing">Project Leasing</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 mini-tag">Specific Site Notes or Questions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Estimated roof size, current tariff, connection details or franchise questions..."
                  className="w-full bg-[#06152F] border border-line rounded-sm px-3 py-2 text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-5 rounded-sm mini-tag font-bold text-white bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Registering with UK Operations...</span>
                  ) : (
                    <>
                      <span>{formType === 'franchise' ? 'SUBMIT FRANCHISE APPLICATION' : 'REQUEST DETAILED ASSESSMENT'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                By submitting, you agree to technical review by Unite Greentek Limited under strict NDA. No unsolicited spam.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
