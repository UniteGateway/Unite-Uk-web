import React, { useState } from 'react';
import {
  LandPlot,
  TrendingUp,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { submitProjectLead } from '../../services/crmService';

type UserCategory = 'LANDOWNER' | 'INVESTOR' | 'BUSINESS' | 'DEVELOPER';

interface ProjectSubmissionMultiRoleProps {
  initialRole?: UserCategory;
  initialRegion?: string;
  onSuccess?: (refNumber: string) => void;
}

export const ProjectSubmissionMultiRole: React.FC<ProjectSubmissionMultiRoleProps> = ({
  initialRole = 'LANDOWNER',
  initialRegion = '',
  onSuccess
}) => {
  const [activeRole, setActiveRole] = useState<UserCategory>(initialRole);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  // 1. LANDOWNER FORM STATE
  const [landLocation, setLandLocation] = useState(initialRegion || '');
  const [landPostcode, setLandPostcode] = useState('');
  const [landArea, setLandArea] = useState<'Under 5 acres' | '5–25 acres' | '25–100 acres' | '100–500 acres' | '500+ acres'>('25–100 acres');
  const [landOwnership, setLandOwnership] = useState('Freehold Owner');
  const [landTech, setLandTech] = useState<'SOLAR' | 'WIND' | 'BESS' | 'HYBRID' | 'NOT SURE'>('SOLAR');
  const [landGridInfo, setLandGridInfo] = useState('');
  const [landName, setLandName] = useState('');
  const [landEmail, setLandEmail] = useState('');
  const [landPhone, setLandPhone] = useState('');
  const [landNotes, setLandNotes] = useState('');

  // 2. INVESTOR FORM STATE
  const [investorName, setInvestorName] = useState('');
  const [investorCompany, setInvestorCompany] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [investorPhone, setInvestorPhone] = useState('');
  const [investorType, setInvestorType] = useState('Family Office');
  const [investorInterests, setInvestorInterests] = useState<string[]>(['Solar', 'BESS']);
  const [investorRange, setInvestorRange] = useState<'Under £250k' | '£250k–£1m' | '£1m–£5m' | '£5m–£25m' | '£25m+'>('£1m–£5m');
  const [investorPreference, setInvestorPreference] = useState<'Project Investment' | 'Development Partnership' | 'Equity' | 'Debt' | 'Strategic Partnership'>('Project Investment');

  // 3. BUSINESS COMMERCIAL FORM STATE
  const [bizCompany, setBizCompany] = useState('');
  const [bizContact, setBizContact] = useState('');
  const [bizEmail, setBizEmail] = useState('');
  const [bizPhone, setBizPhone] = useState('');
  const [bizLocation, setBizLocation] = useState(initialRegion || '');
  const [bizPostcode, setBizPostcode] = useState('');
  const [bizIndustry, setBizIndustry] = useState('Logistics & Warehousing');
  const [bizAnnualKwh, setBizAnnualKwh] = useState('');
  const [bizMonthlyBill, setBizMonthlyBill] = useState('');
  const [bizPeakDemand, setBizPeakDemand] = useState('');
  const [bizRoofArea, setBizRoofArea] = useState('');
  const [bizLandAvail, setBizLandAvail] = useState('');
  const [bizCurrentTariff, setBizCurrentTariff] = useState('26');
  const [bizModel, setBizModel] = useState<'CAPEX' | 'PPA' | 'RESCO' | 'BOOT' | 'BOO' | 'LEASING' | 'NOT SURE'>('PPA');

  // 4. DEVELOPER & PARTNER FORM STATE
  const [devRoleType, setDevRoleType] = useState<'PROJECT DEVELOPER' | 'EPC PARTNER' | 'TECHNOLOGY PROVIDER' | 'LOCAL AUTHORITY' | 'OTHER'>('PROJECT DEVELOPER');
  const [devName, setDevName] = useState('');
  const [devCompany, setDevCompany] = useState('');
  const [devEmail, setDevEmail] = useState('');
  const [devPhone, setDevPhone] = useState('');
  const [devStage, setDevStage] = useState('FEASIBILITY');
  const [devTech, setDevTech] = useState('SOLAR');
  const [devCapacity, setDevCapacity] = useState('20 MWp');
  const [devLocation, setDevLocation] = useState('');
  const [devCollaboration, setDevCollaboration] = useState('Co-development');
  const [devNotes, setDevNotes] = useState('');

  const toggleInvestorInterest = (interest: string) => {
    setInvestorInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let leadName = '';
      let leadEmail = '';
      let leadPhone = '';
      let leadCompany = '';
      let leadRole = '';
      let leadNotes = '';

      if (activeRole === 'LANDOWNER') {
        leadName = landName;
        leadEmail = landEmail;
        leadPhone = landPhone;
        leadRole = 'Landowner';
        leadNotes = `LAND OPPORTUNITY: ${landArea}, Ownership: ${landOwnership}, Tech: ${landTech}, Grid Info: ${landGridInfo}, Location: ${landLocation} ${landPostcode}. Notes: ${landNotes}`;
      } else if (activeRole === 'INVESTOR') {
        leadName = investorName;
        leadCompany = investorCompany;
        leadEmail = investorEmail;
        leadPhone = investorPhone;
        leadRole = 'Investor';
        leadNotes = `INVESTOR INQUIRY: Type: ${investorType}, Range: ${investorRange}, Pref: ${investorPreference}, Interests: ${investorInterests.join(', ')}`;
      } else if (activeRole === 'BUSINESS') {
        leadName = bizContact;
        leadCompany = bizCompany;
        leadEmail = bizEmail;
        leadPhone = bizPhone;
        leadRole = 'Business Customer';
        leadNotes = `BUSINESS ENERGY: Industry: ${bizIndustry}, Bill: £${bizMonthlyBill}/mo, kWh: ${bizAnnualKwh}/yr, Roof: ${bizRoofArea}m2, Model: ${bizModel}, Location: ${bizLocation} ${bizPostcode}`;
      } else {
        leadName = devName;
        leadCompany = devCompany;
        leadEmail = devEmail;
        leadPhone = devPhone;
        leadRole = devRoleType;
        leadNotes = `PARTNER/DEVELOPER: Role: ${devRoleType}, Stage: ${devStage}, Tech: ${devTech}, Capacity: ${devCapacity}, Collab: ${devCollaboration}, Location: ${devLocation}. Notes: ${devNotes}`;
      }

      const result = await submitProjectLead({
        name: leadName || 'Site Contact',
        company: leadCompany,
        email: leadEmail,
        phone: leadPhone,
        userRole: leadRole as any,
        location: {
          city: landLocation || bizLocation || devLocation || 'United Kingdom',
          postcode: landPostcode || bizPostcode || 'UK',
          region: initialRegion || 'UK Region'
        },
        leadSource: `UK Opportunity Portal [${activeRole}]`,
        notes: leadNotes,
        privacyConsent: true
      });

      setRefNumber(result.leadRecord.referenceNumber);
      setSubmissionComplete(true);
      if (onSuccess) {
        onSuccess(result.leadRecord.referenceNumber);
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit-project" className="py-16 bg-[#040E20] border-b border-line relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 06 // Structured Project Intake</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            SUBMIT A RENEWABLE ENERGY PROJECT
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Select your stakeholder profile to access dedicated technical intake parameters, evaluation matrices, and structuring pathways.
          </p>
        </div>

        {/* 4 Role Selector Tabs (Section 6 of Prompt) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            type="button"
            id="role-tab-landowner"
            onClick={() => {
              setActiveRole('LANDOWNER');
              setSubmissionComplete(false);
            }}
            className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeRole === 'LANDOWNER'
                ? 'bg-[#0A1E3A] border-[#7AAA2B] shadow-lg border-l-4 border-l-[#7AAA2B]'
                : 'bg-[#06152F] border-line hover:bg-[#0A1E3A]/60 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <LandPlot className={`w-5 h-5 ${activeRole === 'LANDOWNER' ? 'text-[#7AAA2B]' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono text-slate-500">01</span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">LANDOWNER</span>
              <span className="text-[10px] text-slate-400">Lease Farmland or Land</span>
            </div>
          </button>

          <button
            type="button"
            id="role-tab-investor"
            onClick={() => {
              setActiveRole('INVESTOR');
              setSubmissionComplete(false);
            }}
            className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeRole === 'INVESTOR'
                ? 'bg-[#0A1E3A] border-[#FF6321] shadow-lg border-l-4 border-l-[#FF6321]'
                : 'bg-[#06152F] border-line hover:bg-[#0A1E3A]/60 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <TrendingUp className={`w-5 h-5 ${activeRole === 'INVESTOR' ? 'text-[#FF6321]' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono text-slate-500">02</span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">INVESTOR</span>
              <span className="text-[10px] text-slate-400">Capital & Infrastructure</span>
            </div>
          </button>

          <button
            type="button"
            id="role-tab-business"
            onClick={() => {
              setActiveRole('BUSINESS');
              setSubmissionComplete(false);
            }}
            className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeRole === 'BUSINESS'
                ? 'bg-[#0A1E3A] border-sky-400 shadow-lg border-l-4 border-l-sky-400'
                : 'bg-[#06152F] border-line hover:bg-[#0A1E3A]/60 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Building2 className={`w-5 h-5 ${activeRole === 'BUSINESS' ? 'text-sky-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono text-slate-500">03</span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">BUSINESS</span>
              <span className="text-[10px] text-slate-400">Corporate Rooftop & PPA</span>
            </div>
          </button>

          <button
            type="button"
            id="role-tab-developer"
            onClick={() => {
              setActiveRole('DEVELOPER');
              setSubmissionComplete(false);
            }}
            className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeRole === 'DEVELOPER'
                ? 'bg-[#0A1E3A] border-purple-400 shadow-lg border-l-4 border-l-purple-400'
                : 'bg-[#06152F] border-line hover:bg-[#0A1E3A]/60 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Users className={`w-5 h-5 ${activeRole === 'DEVELOPER' ? 'text-purple-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono text-slate-500">04</span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">DEVELOPER / EPC</span>
              <span className="text-[10px] text-slate-400">Co-dev & Supply Chain</span>
            </div>
          </button>
        </div>

        {/* Success Confirmation View */}
        {submissionComplete ? (
          <div className="p-8 rounded-sm bg-[#06152F] border border-[#7AAA2B] text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-[#7AAA2B]/20 text-[#7AAA2B] flex items-center justify-center mx-auto">
              <FileCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="mini-tag text-[#7AAA2B]">SUBMISSION CONFIRMED</span>
              <h3 className="text-2xl font-extrabold text-white font-display uppercase">
                Project Opportunity Registered
              </h3>
              <p className="text-xs font-mono text-slate-300 pt-1">
                Reference ID: <strong className="text-[#FF6321] text-sm">{refNumber}</strong>
              </p>
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Our UK origination and technical engineering team will review site topography, grid constraints, and commercial options. A dedicated development manager will contact you within 1 business day.
            </p>
            <button
              onClick={() => setSubmissionComplete(false)}
              className="px-5 py-2 rounded-sm mini-tag bg-[#0A1E3A] hover:bg-[#06152F] border border-line text-white text-xs cursor-pointer"
            >
              SUBMIT ANOTHER OPPORTUNITY
            </button>
          </div>
        ) : (
          /* Role-Specific Form Container */
          <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 rounded-sm bg-[#06152F] border border-line shadow-2xl space-y-6">
            
            {/* 1. LANDOWNER FLOW (Section 7 of Prompt) */}
            {activeRole === 'LANDOWNER' && (
              <div className="space-y-5">
                <div className="border-b border-line pb-3">
                  <span className="mini-tag text-[#7AAA2B]">LANDOWNER ASSESSMENT PATHWAY</span>
                  <h3 className="text-xl font-extrabold text-white font-display uppercase mt-0.5">
                    Explore 30–40 Year Index-Linked Land Lease Income
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Unite Solar leases agricultural, rural, and brownfield acreage with zero cost to the landowner. All planning, grid connection, construction, and legal costs are 100% funded by Unite.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Site Location / Town <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Taunton, Somerset"
                      value={landLocation}
                      onChange={(e) => setLandLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#7AAA2B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Postcode / Grid Reference <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TA1 2AB"
                      value={landPostcode}
                      onChange={(e) => setLandPostcode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#7AAA2B]"
                    />
                  </div>
                </div>

                {/* Land Size Selector */}
                <div>
                  <label className="text-[11px] font-mono text-slate-300 block mb-1.5 uppercase">
                    Available Land Area <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(['Under 5 acres', '5–25 acres', '25–100 acres', '100–500 acres', '500+ acres'] as const).map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => setLandArea(area)}
                        className={`p-2.5 rounded-sm text-xs font-mono transition-all text-center border cursor-pointer ${
                          landArea === area
                            ? 'bg-[#7AAA2B] text-[#06152F] font-bold border-[#7AAA2B]'
                            : 'bg-[#020A17] text-slate-300 hover:text-white border-line'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Technology & Ownership Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1.5 uppercase">
                      Preferred Renewable Technology <span className="text-[#FF6321]">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['SOLAR', 'WIND', 'BESS', 'HYBRID', 'NOT SURE'] as const).map((tech) => (
                        <button
                          type="button"
                          key={tech}
                          onClick={() => setLandTech(tech)}
                          className={`p-2 rounded-sm text-[11px] font-mono transition-all border text-center cursor-pointer ${
                            landTech === tech
                              ? 'bg-[#FF6321] text-white font-bold border-[#FF6321]'
                              : 'bg-[#020A17] text-slate-300 border-line hover:text-white'
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Ownership Status <span className="text-[#FF6321]">*</span>
                    </label>
                    <select
                      value={landOwnership}
                      onChange={(e) => setLandOwnership(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#7AAA2B]"
                    >
                      <option value="Freehold Owner">Freehold Landowner (Sole / Joint)</option>
                      <option value="Long Leaseholder">Long Leaseholder</option>
                      <option value="Land Agent / Broker">Land Agent / Chartered Surveyor</option>
                      <option value="Tenant with Permission">Tenant with Landlord Authorisation</option>
                    </select>
                  </div>
                </div>

                {/* Grid Information if Known */}
                <div>
                  <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                    Grid Proximity / Existing Substation Info (If known)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 33kV overhead line crosses land, 1.2 miles to DNO bulk supply point"
                    value={landGridInfo}
                    onChange={(e) => setLandGridInfo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#7AAA2B]"
                  />
                </div>

                {/* Landowner Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-line/60">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Contact Name <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Davies"
                      value={landName}
                      onChange={(e) => setLandName(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#7AAA2B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Email Address <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. r.davies@estateland.co.uk"
                      value={landEmail}
                      onChange={(e) => setLandEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#7AAA2B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Phone Number <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 7700 900123"
                      value={landPhone}
                      onChange={(e) => setLandPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#7AAA2B]"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  *All land assessments are confidential. No financial commitment or site exclusivity is required for initial GIS screening.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  <LandPlot className="w-4 h-4" />
                  <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT LAND OPPORTUNITY'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 2. INVESTOR FLOW (Section 8 of Prompt) */}
            {activeRole === 'INVESTOR' && (
              <div className="space-y-5">
                <div className="border-b border-line pb-3">
                  <span className="mini-tag text-[#FF6321]">INVESTMENT & INFRASTRUCTURE PARTNERSHIP</span>
                  <h3 className="text-xl font-extrabold text-white font-display uppercase mt-0.5">
                    Co-Invest in High-Yielding UK Clean Energy Assets
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Unite Greentek structures bankable renewable energy assets across shovel-ready and development-stage portfolios.
                  </p>
                </div>

                {/* Investment Interests Multi-select */}
                <div>
                  <label className="text-[11px] font-mono text-slate-300 block mb-1.5 uppercase">
                    Investment Interest Areas <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {['Solar', 'Wind', 'BESS', 'Hybrid', 'Infrastructure', 'PPA'].map((tech) => {
                      const isChecked = investorInterests.includes(tech);
                      return (
                        <button
                          type="button"
                          key={tech}
                          onClick={() => toggleInvestorInterest(tech)}
                          className={`p-2.5 rounded-sm text-xs font-mono border text-center transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-[#FF6321] text-white font-bold border-[#FF6321]'
                              : 'bg-[#020A17] text-slate-300 border-line hover:text-white'
                          }`}
                        >
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Investment Range */}
                <div>
                  <label className="text-[11px] font-mono text-slate-300 block mb-1.5 uppercase">
                    Target Investment Allocation Range <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(['Under £250k', '£250k–£1m', '£1m–£5m', '£5m–£25m', '£25m+'] as const).map((range) => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setInvestorRange(range)}
                        className={`p-2.5 rounded-sm text-xs font-mono border text-center transition-all cursor-pointer ${
                          investorRange === range
                            ? 'bg-[#7AAA2B] text-[#06152F] font-bold border-[#7AAA2B]'
                            : 'bg-[#020A17] text-slate-300 border-line hover:text-white'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Investment Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Investment Preference Structure <span className="text-[#FF6321]">*</span>
                    </label>
                    <select
                      value={investorPreference}
                      onChange={(e) => setInvestorPreference(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#FF6321]"
                    >
                      <option value="Project Investment">Direct Project Investment (SPV Level)</option>
                      <option value="Development Partnership">Co-Development Partnership</option>
                      <option value="Equity">Construction & Operational Equity</option>
                      <option value="Debt">Senior / Mezzanine Debt Financing</option>
                      <option value="Strategic Partnership">Strategic Institutional Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Investor Classification <span className="text-[#FF6321]">*</span>
                    </label>
                    <select
                      value={investorType}
                      onChange={(e) => setInvestorType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#FF6321]"
                    >
                      <option value="Family Office">Family Office</option>
                      <option value="Infrastructure Fund">Infrastructure / Clean Energy Fund</option>
                      <option value="Private Equity">Private Equity / Venture Capital</option>
                      <option value="Corporate">Corporate / Strategic Investor</option>
                      <option value="High Net Worth">High Net Worth Individual (HNWI)</option>
                      <option value="Institutional">Pension Fund / Sovereign Wealth</option>
                    </select>
                  </div>
                </div>

                {/* Investor Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-line/60">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Principal Name <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victoria Sterling"
                      value={investorName}
                      onChange={(e) => setInvestorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#FF6321]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Organisation / Fund
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Meridian Clean Capital"
                      value={investorCompany}
                      onChange={(e) => setInvestorCompany(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#FF6321]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Email <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. v.sterling@meridian.com"
                      value={investorEmail}
                      onChange={(e) => setInvestorEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#FF6321]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Phone Number <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 20 7946 0912"
                      value={investorPhone}
                      onChange={(e) => setInvestorPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-[#FF6321]"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  *Unite Greentek Limited does not provide financial advice or promise guaranteed investment returns. All prospective co-investments are subject to formal due diligence and SPV agreements.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-sm mini-tag text-white bg-[#FF6321] hover:bg-orange-600 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{isSubmitting ? 'PROCESSING...' : 'SUBMIT INVESTMENT INQUIRY'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 3. BUSINESS ENERGY FLOW (Section 9 of Prompt) */}
            {activeRole === 'BUSINESS' && (
              <div className="space-y-5">
                <div className="border-b border-line pb-3">
                  <span className="mini-tag text-sky-400">COMMERCIAL & INDUSTRIAL ENERGY AUDIT</span>
                  <h3 className="text-xl font-extrabold text-white font-display uppercase mt-0.5">
                    Power Your Facility with Discounted Clean Energy
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Lock in low-cost electricity rates with zero capital outlay under our fully funded Corporate PPA, RESCO, or BOOT frameworks.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Company Name <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Cold Storage Ltd"
                      value={bizCompany}
                      onChange={(e) => setBizCompany(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Facility Location / Postcode <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Northampton, NN4 5EA"
                      value={bizLocation}
                      onChange={(e) => setBizLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Industry Sector <span className="text-[#FF6321]">*</span>
                    </label>
                    <select
                      value={bizIndustry}
                      onChange={(e) => setBizIndustry(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      <option value="Logistics & Warehousing">Logistics & Warehousing</option>
                      <option value="Manufacturing & Industrial">Manufacturing & Heavy Industry</option>
                      <option value="Cold Storage & Food Processing">Cold Storage & Food Processing</option>
                      <option value="Commercial Office & Retail">Commercial Office & Retail</option>
                      <option value="Data Centres & Tech">Data Centres & Technology</option>
                      <option value="Public Sector & Education">Public Sector, NHS & Education</option>
                      <option value="Agriculture & Dairy">Agriculture & Dairy Farming</option>
                    </select>
                  </div>
                </div>

                {/* Energy Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Annual Electricity (kWh)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 850000"
                      value={bizAnnualKwh}
                      onChange={(e) => setBizAnnualKwh(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Avg Monthly Bill (£)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 18500"
                      value={bizMonthlyBill}
                      onChange={(e) => setBizMonthlyBill(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Approx Roof Area (m²)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={bizRoofArea}
                      onChange={(e) => setBizRoofArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Peak Demand (kVA/kW)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 450"
                      value={bizPeakDemand}
                      onChange={(e) => setBizPeakDemand(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {/* Commercial Business Model Selection (Section 9) */}
                <div>
                  <label className="text-[11px] font-mono text-slate-300 block mb-1.5 uppercase">
                    Preferred Commercial Business Model <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {(['PPA', 'RESCO', 'BOOT', 'BOO', 'CAPEX', 'LEASING'] as const).map((model) => (
                      <button
                        type="button"
                        key={model}
                        onClick={() => setBizModel(model)}
                        className={`p-2.5 rounded-sm text-xs font-mono border text-center transition-all cursor-pointer ${
                          bizModel === model
                            ? 'bg-sky-400 text-slate-950 font-bold border-sky-400'
                            : 'bg-[#020A17] text-slate-300 border-line hover:text-white'
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Business Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-line/60">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Contact Name <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Thorne"
                      value={bizContact}
                      onChange={(e) => setBizContact(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Work Email <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. m.thorne@apexcold.co.uk"
                      value={bizEmail}
                      onChange={(e) => setBizEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Phone <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 1604 123456"
                      value={bizPhone}
                      onChange={(e) => setBizPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-sm mini-tag text-slate-950 bg-sky-400 hover:bg-sky-300 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'CALCULATING...' : 'REQUEST COMMERCIAL ASSESSMENT'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 4. DEVELOPER & PARTNER FLOW */}
            {activeRole === 'DEVELOPER' && (
              <div className="space-y-5">
                <div className="border-b border-line pb-3">
                  <span className="mini-tag text-purple-400">INDUSTRY CO-DEVELOPMENT & SUPPLY CHAIN</span>
                  <h3 className="text-xl font-extrabold text-white font-display uppercase mt-0.5">
                    Partner with Unite Greentek Limited
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Collaborate on project origination, high-voltage EPC delivery, Tier-1 equipment supply, and local authority energy initiatives.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Partner / Organisation Role <span className="text-[#FF6321]">*</span>
                    </label>
                    <select
                      value={devRoleType}
                      onChange={(e) => setDevRoleType(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="PROJECT DEVELOPER">Project Developer (Seeking Co-dev / Funding)</option>
                      <option value="EPC PARTNER">EPC Partner / Balance of Plant Contractor</option>
                      <option value="TECHNOLOGY PROVIDER">Tier-1 OEM Technology Provider (Modules / Inverters / BESS)</option>
                      <option value="LOCAL AUTHORITY">Local Authority / Public Sector Entity</option>
                      <option value="OTHER">Other Industry Stakeholder</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Target Renewable Technology <span className="text-[#FF6321]">*</span>
                    </label>
                    <select
                      value={devTech}
                      onChange={(e) => setDevTech(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="SOLAR">Utility Solar PV / Commercial Rooftops</option>
                      <option value="WIND">Onshore / Offshore Wind</option>
                      <option value="BESS">Battery Energy Storage Systems (BESS)</option>
                      <option value="HYBRID">Co-Located Hybrid Energy Hubs</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Project Capacity (MW)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 45 MWp"
                      value={devCapacity}
                      onChange={(e) => setDevCapacity(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Current Development Stage
                    </label>
                    <select
                      value={devStage}
                      onChange={(e) => setDevStage(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="OPPORTUNITY">Site Identification & Origination</option>
                      <option value="FEASIBILITY">Technical & Grid Feasibility</option>
                      <option value="LAND">Land Rights Under Negotiation</option>
                      <option value="GRID">Formal Grid Application Submitted</option>
                      <option value="PLANNING">Planning Application in Progress</option>
                      <option value="READY FOR INVESTMENT">Shovel-Ready / Ready to Build (RTB)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Collaboration Format
                    </label>
                    <select
                      value={devCollaboration}
                      onChange={(e) => setDevCollaboration(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Co-development">Joint Venture Co-Development</option>
                      <option value="EPC Delivery">Turnkey EPC Delivery Contract</option>
                      <option value="Offtake / PPA Structuring">Offtake / Corporate PPA Structuring</option>
                      <option value="Funding & Equity">Project Equity / Balance Sheet Funding</option>
                      <option value="O&M Partnership">Long-Term O&M Asset Servicing</option>
                    </select>
                  </div>
                </div>

                {/* Developer Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-line/60">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Contact Name <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jonathan Wright"
                      value={devName}
                      onChange={(e) => setDevName(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Organisation <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Energy Partners"
                      value={devCompany}
                      onChange={(e) => setDevCompany(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Email <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.wright@apexenergy.co.uk"
                      value={devEmail}
                      onChange={(e) => setDevEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1 uppercase">
                      Phone <span className="text-[#FF6321]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 20 8123 4567"
                      value={devPhone}
                      onChange={(e) => setDevPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#020A17] border border-line text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-sm mini-tag text-white bg-purple-600 hover:bg-purple-500 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  <Users className="w-4 h-4" />
                  <span>{isSubmitting ? 'CONNECTING...' : 'SUBMIT CO-DEVELOPMENT INQUIRY'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </form>
        )}

      </div>
    </section>
  );
};
