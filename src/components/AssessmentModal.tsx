import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  InterestType,
  ProjectSizeBracket,
  LeadRecord
} from '../types';
import { submitProjectLead } from '../services/crmService';
import {
  X,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  Phone,
  Mail,
  User,
  MapPin,
  Sparkles,
  Check,
  Coins,
  ShieldAlert,
  Info
} from 'lucide-react';

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
  const isFranchiseMode = initialType.includes('franchise');
  const [formMode, setFormMode] = useState<'PROJECT_ENQUIRY' | 'FRANCHISE'>(
    isFranchiseMode ? 'FRANCHISE' : 'PROJECT_ENQUIRY'
  );

  // 5-Step Project Enquiry State
  const [step, setStep] = useState<number>(1);
  const [userRole, setUserRole] = useState<UserRole>('Business');
  const [interests, setInterests] = useState<InterestType[]>([
    initialData?.projectType?.includes('BESS') ? 'BESS' : 'Solar',
  ]);
  const [postcode, setPostcode] = useState<string>(initialData?.postcode || '');
  const [city, setCity] = useState<string>(initialData?.city || '');
  const [region, setRegion] = useState<string>(initialData?.region || 'London');
  const [projectSize, setProjectSize] = useState<ProjectSizeBracket>('50–250 kW');

  // Contact Info
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(true);

  // Franchise Specific State
  const [franchiseTerritory, setFranchiseTerritory] = useState<string>(
    initialData?.region || 'Greater London & M25 Ring'
  );
  const [investmentCapacity, setInvestmentCapacity] = useState<string>('£20,000 – £50,000');
  const [businessBackground, setBusinessBackground] = useState<string>('Executive / Commercial Sales');

  // Submission State
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [generatedRefNumber, setGeneratedRefNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleInterest = (interest: InterestType) => {
    if (interests.includes(interest)) {
      if (interests.length > 1) {
        setInterests(interests.filter((i) => i !== interest));
      }
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !phone) {
      setErrorMessage('Please complete your name, telephone number, and email address.');
      return;
    }

    if (!privacyConsent) {
      setErrorMessage('Please accept the privacy consent statement to proceed.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await submitProjectLead({
        name,
        company,
        email,
        phone,
        userRole,
        interests: formMode === 'FRANCHISE' ? ['Franchise'] : interests,
        location: {
          postcode: postcode || 'UK',
          city: city || 'UK City',
          region: formMode === 'FRANCHISE' ? franchiseTerritory : region,
        },
        projectType: formMode === 'FRANCHISE' ? 'Franchise Partner Application' : interests.join(' + '),
        projectSizeBracket: projectSize,
        leadSource: formMode === 'FRANCHISE' ? 'Franchise Modal Application' : 'Project Assessment Enquiry 5-Step Form',
        privacyConsent: true,
        notes: formMode === 'FRANCHISE'
          ? `Franchise Investment: ${investmentCapacity} | Background: ${businessBackground}`
          : initialData?.assessmentReferenceId
          ? `Calculated Assessment Ref: ${initialData.assessmentReferenceId}`
          : undefined,
      });

      setGeneratedRefNumber(res.leadRecord.referenceNumber);
      setIsSuccess(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6321', '#4E8B1E', '#7AAA2B', '#38BDF8'],
        });
      } catch (err) {}
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit enquiry. Please verify your details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  const roleOptions: UserRole[] = [
    'Homeowner',
    'Business',
    'Industrial Customer',
    'Landowner',
    'Investor',
    'EPC Partner',
    'Technology Supplier',
    'Franchise Applicant',
    'Other',
  ];

  const interestOptions: InterestType[] = [
    'Solar',
    'BESS',
    'Wind',
    'Hybrid',
    'PPA',
    'RESCO',
    'BOOT',
    'BOO',
    'CAPEX',
    'Project Leasing',
    'Franchise',
  ];

  const sizeBrackets: ProjectSizeBracket[] = [
    'Under 10 kW',
    '10–50 kW',
    '50–250 kW',
    '250 kW–1 MW',
    '1–5 MW',
    '5–50 MW',
    '50 MW+',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0A1E3A] border border-line rounded-sm max-w-xl w-full p-5 sm:p-7 shadow-2xl relative text-slate-200 my-6 border-l-2 border-l-[#7AAA2B]">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-sm bg-[#06152F] hover:bg-slate-800 text-slate-400 hover:text-white border border-line transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* SECTION 13: FORM SUCCESS EXPERIENCE */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#7AAA2B]/20 text-[#7AAA2B] flex items-center justify-center mx-auto border border-[#7AAA2B]/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="mini-tag text-[#FF6321] block">
                Audit Reference #{generatedRefNumber}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase">
                THANK YOU. <br />
                <span className="text-[#7AAA2B]">YOUR PROJECT IS ON ITS WAY.</span>
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Our team will review the information provided and determine the appropriate next step. A dedicated clean-energy director from Unite Greentek Limited will contact you directly.
              </p>
            </div>

            <div className="p-3.5 rounded-sm bg-[#06152F] border border-line text-xs text-slate-400 max-w-md mx-auto text-left space-y-1 font-mono text-[11px]">
              <p><strong>Operating Entity:</strong> Unite Greentek Limited (United Kingdom)</p>
              <p><strong>Direct Line:</strong> +44 203 034 1066</p>
              <p><strong>Official Inquiries:</strong> info@unitegreentech.com</p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-sm mini-tag text-white bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold transition-colors cursor-pointer shadow-lg"
            >
              FINISH & CLOSE
            </button>
          </div>
        ) : formMode === 'FRANCHISE' ? (
          /* SECTION 21: FRANCHISE LEAD FLOW */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#FF6321]/15 text-[#FF6321] text-[10px] font-bold tracking-wider uppercase">
                <Coins className="w-3 h-3" />
                <span>ENTRY FROM £20,000* • 25% PROFIT SHARE*</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase">
                BECOME A UNITE SOLAR PARTNER
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Build an exclusive renewable-energy franchise in your UK territory with Tier-1 OEM technology supply, turnkey EPC support, and enterprise CRM systems.
              </p>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-sm bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mini-tag text-slate-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Miller"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                />
              </div>

              <div>
                <label className="mini-tag text-slate-300 block mb-1">City / Base Town *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bristol / Leeds"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mini-tag text-slate-300 block mb-1">Preferred Territory</label>
                <select
                  value={franchiseTerritory}
                  onChange={(e) => setFranchiseTerritory(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                >
                  <option value="Greater London & M25 Ring">Greater London & M25 Ring</option>
                  <option value="West Midlands & Birmingham">West Midlands & Birmingham</option>
                  <option value="Manchester & North West Hub">Manchester & North West Hub</option>
                  <option value="South West & Bristol Corridor">South West & Bristol Corridor</option>
                  <option value="Yorkshire & Leeds Corridor">Yorkshire & Leeds Corridor</option>
                  <option value="East of England & Cambridge">East of England & Cambridge</option>
                  <option value="Scotland Central Belt">Scotland Central Belt</option>
                  <option value="Wales & Cardiff Metro">Wales & Cardiff Metro</option>
                </select>
              </div>

              <div>
                <label className="mini-tag text-slate-300 block mb-1">Investment Capacity</label>
                <select
                  value={investmentCapacity}
                  onChange={(e) => setInvestmentCapacity(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                >
                  <option value="£20,000 – £50,000">£20,000 – £50,000</option>
                  <option value="£50,000 – £100,000">£50,000 – £100,000</option>
                  <option value="£100,000+">£100,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mini-tag text-slate-300 block mb-1">Business Background</label>
              <input
                type="text"
                value={businessBackground}
                onChange={(e) => setBusinessBackground(e.target.value)}
                placeholder="e.g. Construction, Engineering, Executive Sales"
                className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mini-tag text-slate-300 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7123 456789"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="mini-tag text-slate-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.co.uk"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="franchise-consent"
                checked={privacyConsent}
                onChange={(e) => setPrivacyConsent(e.target.checked)}
                className="mt-0.5 accent-[#FF6321]"
              />
              <label htmlFor="franchise-consent" className="text-[10px] text-slate-400 cursor-pointer leading-tight">
                *Subject to franchise agreement and applicable commercial terms. I agree to receive the confidential Unite Solar franchise prospectus.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-sm mini-tag bg-[#FF6321] hover:bg-orange-600 text-white font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
            >
              <span>{submitting ? 'PROCESSING...' : 'REQUEST FRANCHISE INFORMATION'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* SECTION 12: 5-STEP PROJECT ENQUIRY FORM */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header & Step Tracker */}
            <div className="space-y-1 border-b border-line pb-3">
              <div className="flex justify-between items-center">
                <span className="mini-tag text-[#7AAA2B]">Step {step} of 5</span>
                <span className="text-[11px] font-mono text-slate-400">PROJECT ASSESSMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase">
                LET'S DISCUSS YOUR PROJECT.
              </h3>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-sm bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: I AM A */}
            {step === 1 && (
              <div className="space-y-3">
                <label className="mini-tag text-slate-300 block">I AM A:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {roleOptions.map((role) => {
                    const isSelected = userRole === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setUserRole(role)}
                        className={`p-2.5 rounded-sm text-left text-xs font-semibold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#7AAA2B] text-[#06152F] border-[#7AAA2B] shadow-md font-bold'
                            : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: INTERESTED IN */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="mini-tag text-slate-300 block">INTERESTED IN (Select all that apply):</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {interestOptions.map((item) => {
                    const isSelected = interests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`p-2.5 rounded-sm text-left text-xs transition-all border cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FF6321] text-white border-[#FF6321] shadow-md font-bold'
                            : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: PROJECT LOCATION */}
            {step === 3 && (
              <div className="space-y-3">
                <label className="mini-tag text-slate-300 block">PROJECT LOCATION:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Postcode</label>
                    <input
                      type="text"
                      placeholder="e.g. SW1A 1AA"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">City / Town</label>
                    <input
                      type="text"
                      placeholder="e.g. Manchester"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Region</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                    >
                      <option value="London">London</option>
                      <option value="South East">South East</option>
                      <option value="South West">South West</option>
                      <option value="Midlands">Midlands</option>
                      <option value="North West">North West</option>
                      <option value="Yorkshire">Yorkshire</option>
                      <option value="North East">North East</option>
                      <option value="Wales">Wales</option>
                      <option value="Scotland">Scotland</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: PROJECT SIZE */}
            {step === 4 && (
              <div className="space-y-3">
                <label className="mini-tag text-slate-300 block">PROJECT SIZE / CAPACITY TARGET:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sizeBrackets.map((bracket) => {
                    const isSelected = projectSize === bracket;
                    return (
                      <button
                        key={bracket}
                        type="button"
                        onClick={() => setProjectSize(bracket)}
                        className={`p-2.5 rounded-sm text-left text-xs transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#7AAA2B] text-[#06152F] border-[#7AAA2B] font-bold shadow-md'
                            : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {bracket}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT */}
            {step === 5 && (
              <div className="space-y-3">
                <label className="mini-tag text-slate-300 block">CONTACT DETAILS:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Robert Craig"
                      className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Company / Organisation</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Craig Logistics Ltd"
                      className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="robert@craiglogistics.co.uk"
                      className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 203 034 1066"
                      className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="modal-consent"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-0.5 accent-[#7AAA2B]"
                  />
                  <label htmlFor="modal-consent" className="text-[11px] text-slate-400 cursor-pointer">
                    I agree to be contacted regarding my enquiry by Unite Greentek Limited in accordance with the Privacy Policy.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-line">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="px-3 py-1.5 rounded-sm mini-tag glass text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>BACK</span>
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(5, s + 1))}
                  className="px-5 py-2 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] font-bold hover:bg-[#689423] flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] font-extrabold hover:bg-[#689423] flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{submitting ? 'PROCESSING...' : 'REQUEST ASSESSMENT'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
