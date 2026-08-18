import React, { useState, useEffect } from 'react';
import {
  FileText,
  User,
  MapPin,
  Briefcase,
  Layers,
  Coins,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { submitFranchiseApplication } from '../../services/franchiseService';
import { FranchiseTerritory } from '../../types';

interface FranchiseApplicationFormProps {
  preselectedTerritory?: FranchiseTerritory | null;
  preselectedPathway?: string;
  onSuccess?: (refId: string) => void;
}

export const FranchiseApplicationForm: React.FC<FranchiseApplicationFormProps> = ({
  preselectedTerritory,
  preselectedPathway,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Your Details
    name: '',
    email: '',
    phone: '',

    // Step 2: Your Location
    city: '',
    region: 'South West',
    preferredTerritory: '',

    // Step 3: Your Business
    existingBusiness: true,
    companyName: '',
    industry: 'Property & Real Estate',
    yearsInBusiness: '3–5 years',
    teamSize: '1–5 people',

    // Step 4: Interests
    interests: ['Commercial', 'BESS', 'PPA'] as ('Residential' | 'Commercial' | 'Industrial' | 'BESS' | 'Wind' | 'PPA' | 'Project Development')[],

    // Step 5: Investment & Pathway
    investmentBracket: '£20k–£50k' as '£20k–£50k' | '£50k–£100k' | '£100k+' | 'Prefer to discuss',
    operatingPath: 'FULL-TIME BUSINESS' as 'FULL-TIME BUSINESS' | 'PART-TIME DEVELOPMENT' | 'BUSINESS EXPANSION',

    // Step 6: Notes & Consent
    notes: '',
    privacyConsent: true
  });

  // Synchronize preselected territory if passed
  useEffect(() => {
    if (preselectedTerritory) {
      setFormData((prev) => ({
        ...prev,
        city: preselectedTerritory.city,
        region: preselectedTerritory.region,
        preferredTerritory: `${preselectedTerritory.city} (${preselectedTerritory.county})`
      }));
    }
  }, [preselectedTerritory]);

  useEffect(() => {
    if (preselectedPathway) {
      if (
        preselectedPathway === 'FULL-TIME BUSINESS' ||
        preselectedPathway === 'PART-TIME DEVELOPMENT' ||
        preselectedPathway === 'BUSINESS EXPANSION'
      ) {
        setFormData((prev) => ({ ...prev, operatingPath: preselectedPathway as any }));
      }
    }
  }, [preselectedPathway]);

  const handleInterestToggle = (item: 'Residential' | 'Commercial' | 'Industrial' | 'BESS' | 'Wind' | 'PPA' | 'Project Development') => {
    setFormData((prev) => {
      const exists = prev.interests.includes(item);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== item) };
      } else {
        return { ...prev, interests: [...prev.interests, item] };
      }
    });
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        setErrorMsg('Please enter your full name, email and phone number.');
        return;
      }
      if (!formData.email.includes('@')) {
        setErrorMsg('Please provide a valid corporate or personal email address.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.city.trim() && !formData.preferredTerritory.trim()) {
        setErrorMsg('Please provide your city or preferred territory location.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setErrorMsg(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await submitFranchiseApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: {
          city: formData.city,
          region: formData.region,
          preferredTerritory: formData.preferredTerritory || formData.city
        },
        businessBackground: {
          existingBusiness: formData.existingBusiness,
          companyName: formData.companyName,
          industry: formData.industry,
          yearsInBusiness: formData.yearsInBusiness,
          teamSize: formData.teamSize
        },
        interests: formData.interests,
        investmentBracket: formData.investmentBracket,
        operatingPath: formData.operatingPath,
        notes: formData.notes,
        privacyConsent: formData.privacyConsent
      });

      setSubmittedRefId(res.application.referenceNumber);
      if (onSuccess) onSuccess(res.application.referenceNumber);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (submittedRefId) {
      navigator.clipboard.writeText(submittedRefId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // SUCCESS CONFIRMATION SCREEN (Section 15 of Prompt 5)
  if (submittedRefId) {
    return (
      <div id="franchise-application-success" className="p-8 sm:p-12 rounded-sm bg-[#040E20] border-2 border-[#7AAA2B] shadow-2xl max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#7AAA2B]/20 border-2 border-[#7AAA2B] flex items-center justify-center mx-auto text-[#7AAA2B]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-[#7AAA2B] font-bold">
            STAGE 01 RECORDED // DISCOVERY QUEUE
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-display tracking-tight">
            APPLICATION RECEIVED
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Your franchise enquiry for{' '}
            <strong>{formData.preferredTerritory || formData.city}</strong> has been logged with Unite Greentek Limited.
          </p>
        </div>

        {/* Reference ID Card (UG-FR-XXXXX) */}
        <div className="p-4 rounded-sm bg-[#06152F] border border-line flex items-center justify-between max-w-md mx-auto">
          <div className="text-left font-mono">
            <span className="text-[10px] text-slate-400 uppercase block">Your Enquiry Reference:</span>
            <span className="text-lg font-black text-[#7AAA2B] tracking-wider block">
              {submittedRefId}
            </span>
          </div>

          <button
            onClick={handleCopyRef}
            className="p-2 rounded-sm bg-[#0A1E3A] border border-line text-slate-300 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#7AAA2B]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto font-mono">
          <span className="text-[11px] font-bold text-white uppercase block">What happens next:</span>
          <p className="text-[11px] text-slate-300 leading-relaxed font-light">
            1. Our franchise development desk will evaluate territory status for {formData.city || 'your region'}.
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed font-light">
            2. You will receive the formal Franchise Prospectus and Discovery Invitation at <strong>{formData.email}</strong>.
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed font-light text-[10px] border-t border-line/60 pt-2">
            *Applications are reviewed individually subject to territory eligibility and commercial alignment.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmittedRefId(null);
            setCurrentStep(1);
          }}
          className="px-6 py-2.5 rounded-sm mini-tag bg-[#06152F] hover:bg-[#0A1E3A] text-slate-300 hover:text-white border border-line text-xs font-semibold cursor-pointer"
        >
          Submit Another Territory Enquiry
        </button>
      </div>
    );
  }

  return (
    <div id="franchise-application-form-container" className="p-6 sm:p-10 rounded-sm bg-[#040E20] border-2 border-line shadow-2xl max-w-3xl mx-auto space-y-6">
      
      {/* Progress Bar & Header */}
      <div className="space-y-3 border-b border-line pb-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#7AAA2B] font-bold">
            STEP 0{currentStep} OF 06: {
              currentStep === 1 ? 'YOUR DETAILS' :
              currentStep === 2 ? 'YOUR LOCATION' :
              currentStep === 3 ? 'YOUR BUSINESS BACKGROUND' :
              currentStep === 4 ? 'RENEWABLE INTERESTS' :
              currentStep === 5 ? 'CAPITAL & OPERATING MODEL' : 'SUBMISSION & REVIEW'
            }
          </span>
          <span className="text-slate-400">UG-FR FORM</span>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1.5 bg-[#06152F] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-sm bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Your Details */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase font-display">
              Step 1: Contact Information
            </h3>
            <p className="text-xs text-slate-400">
              Provide your details for direct correspondence with our UK franchise development team.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-mono mb-1">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Marcus Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Corporate / Direct Email *</label>
                <input
                  type="email"
                  placeholder="e.g. marcus@vancegroup.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Telephone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. +44 7700 900123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Your Location */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase font-display">
              Step 2: Location & Preferred Territory
            </h3>
            <p className="text-xs text-slate-400">
              Indicate the geographic territory you are looking to secure and develop.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Base City / Town *</label>
                <input
                  type="text"
                  placeholder="e.g. Exeter"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">UK Region</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                >
                  <option value="South West">South West</option>
                  <option value="South East & London">South East & London</option>
                  <option value="East of England">East of England</option>
                  <option value="West Midlands">West Midlands</option>
                  <option value="East Midlands">East Midlands</option>
                  <option value="North West">North West</option>
                  <option value="Yorkshire & Humber">Yorkshire & Humber</option>
                  <option value="North East">North East</option>
                  <option value="Scotland">Scotland</option>
                  <option value="Wales">Wales</option>
                  <option value="Northern Ireland">Northern Ireland</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">Preferred Territory / County Scope</label>
              <input
                type="text"
                placeholder="e.g. Devon & Cornwall or Greater Manchester"
                value={formData.preferredTerritory}
                onChange={(e) => setFormData({ ...formData, preferredTerritory: e.target.value })}
                className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Your Business Background */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase font-display">
              Step 3: Professional Background
            </h3>
            <p className="text-xs text-slate-400">
              Tell us about your commercial experience and existing operations.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Company Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Vance Property & Energy Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Primary Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                >
                  <option value="Property & Real Estate">Property & Real Estate</option>
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Construction & EPC">Construction & EPC</option>
                  <option value="Commercial Sales & Consulting">Commercial Sales & Consulting</option>
                  <option value="Electrical Contracting">Electrical Contracting</option>
                  <option value="Agriculture & Farming">Agriculture & Farming</option>
                  <option value="Private Investment">Private Investment</option>
                  <option value="Other">Other Enterprise</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Years in Commercial Practice</label>
                <select
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                >
                  <option value="Under 2 years">Under 2 years</option>
                  <option value="3–5 years">3–5 years</option>
                  <option value="6–10 years">6–10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Existing Team / Organisation Size</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                >
                  <option value="Individual Entrepreneur">Individual Entrepreneur</option>
                  <option value="1–5 people">1–5 people</option>
                  <option value="6–20 people">6–20 people</option>
                  <option value="20+ people">20+ people</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Renewable Interests */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase font-display">
              Step 4: Target Renewable Technologies
            </h3>
            <p className="text-xs text-slate-400">
              Select the solutions you plan to originate within your territory (select all that apply).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { id: 'Commercial', label: 'Commercial & Industrial Rooftop Solar' },
              { id: 'BESS', label: 'Battery Energy Storage Systems (BESS)' },
              { id: 'PPA', label: 'Zero-CAPEX Corporate PPAs' },
              { id: 'Project Development', label: 'Utility Ground-Mount Solar Parks' },
              { id: 'Industrial', label: 'Manufacturing & Cold-Storage Microgrids' },
              { id: 'Wind', label: 'Onshore Wind Energy Corridors' },
              { id: 'Residential', label: 'Residential Decarbonisation Bundles' }
            ].map((item) => {
              const selected = formData.interests.includes(item.id as any);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleInterestToggle(item.id as any)}
                  className={`p-3 rounded-sm text-left border flex items-center justify-between transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#7AAA2B]/15 border-[#7AAA2B] text-white'
                      : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="font-semibold">{item.label}</span>
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                      selected ? 'bg-[#7AAA2B] border-[#7AAA2B] text-[#06152F]' : 'border-slate-600'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 5: Capital & Operating Model */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase font-display">
              Step 5: Investment Scope & Operating Pathway
            </h3>
            <p className="text-xs text-slate-400">
              Select your indicative investment bracket and operating format.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-mono">Indicative Capital Bracket *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['£20k–£50k', '£50k–£100k', '£100k+', 'Prefer to discuss'].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setFormData({ ...formData, investmentBracket: b as any })}
                    className={`p-2.5 rounded-sm border text-center font-mono transition-all cursor-pointer ${
                      formData.investmentBracket === b
                        ? 'bg-[#7AAA2B] text-[#06152F] font-bold border-[#7AAA2B]'
                        : 'bg-[#06152F] text-slate-300 border-line hover:border-slate-500'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 font-mono">Operating Pathway</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'FULL-TIME BUSINESS', title: 'Full-Time Enterprise' },
                  { id: 'PART-TIME DEVELOPMENT', title: 'Part-Time Origination' },
                  { id: 'BUSINESS EXPANSION', title: 'Corporate Expansion' }
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setFormData({ ...formData, operatingPath: p.id as any })}
                    className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      formData.operatingPath === p.id
                        ? 'bg-[#7AAA2B]/15 border-[#7AAA2B] text-white font-bold'
                        : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="block text-xs font-mono font-bold">{p.title}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{p.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Submission & Review */}
      {currentStep === 6 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase font-display">
              Step 6: Review & Submit Application
            </h3>
            <p className="text-xs text-slate-400">
              Confirm your application details before dispatching to the franchise onboarding desk.
            </p>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-sm bg-[#06152F] border border-line text-xs font-mono space-y-2">
            <div className="flex justify-between border-b border-line/60 pb-1.5">
              <span className="text-slate-400">Applicant:</span>
              <strong className="text-white">{formData.name} ({formData.email})</strong>
            </div>
            <div className="flex justify-between border-b border-line/60 pb-1.5">
              <span className="text-slate-400">Target Territory:</span>
              <strong className="text-[#7AAA2B]">{formData.preferredTerritory || formData.city} ({formData.region})</strong>
            </div>
            <div className="flex justify-between border-b border-line/60 pb-1.5">
              <span className="text-slate-400">Operating Path:</span>
              <strong className="text-white">{formData.operatingPath}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Capital Bracket:</span>
              <strong className="text-white">{formData.investmentBracket}</strong>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="block text-slate-300 font-mono">Additional Notes or Project Questions (Optional)</label>
            <textarea
              rows={3}
              placeholder="Provide any context regarding specific client opportunities or local connections..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
            />
          </div>

          <div className="flex items-start gap-2 pt-2 text-[11px] text-slate-300">
            <input
              type="checkbox"
              id="privacy-consent"
              checked={formData.privacyConsent}
              onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              className="mt-0.5"
            />
            <label htmlFor="privacy-consent" className="cursor-pointer">
              I agree to receive confidential franchise disclosure documentation from Unite Greentek Limited under UK data protection standards.
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-sm mini-tag bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:from-[#5aa222] hover:to-[#8bc232] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isSubmitting ? 'LOGGING ENQUIRY...' : 'SUBMIT FRANCHISE APPLICATION'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Navigation Buttons for Steps 1-5 */}
      {currentStep < 6 && (
        <div className="flex items-center justify-between pt-4 border-t border-line">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-sm text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'text-slate-300 hover:text-white bg-[#06152F] border border-line cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
