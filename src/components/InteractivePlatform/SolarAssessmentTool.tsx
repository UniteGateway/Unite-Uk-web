import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PropertyType,
  SpaceOption,
  EnergyInputMode,
  BatteryChoice,
  SolarAssessmentInput,
  SolarAssessmentResult
} from '../../types';
import {
  calculateSolarOpportunity,
  isCommercialPropertyType
} from '../../services/calculationEngine';
import { saveAssessmentDraft } from '../../services/crmService';
import {
  Home,
  Building,
  Building2,
  Store,
  Warehouse,
  Factory,
  Hotel,
  GraduationCap,
  HeartPulse,
  Tractor,
  HelpCircle,
  MapPin,
  Compass,
  Zap,
  Battery,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Sun,
  Leaf,
  Calendar,
  Layers,
  Sparkles,
  Info,
  BookmarkPlus
} from 'lucide-react';

interface SolarAssessmentToolProps {
  onOpenProjectEnquiry: (initialData: any) => void;
  onOpenBookCall: (initialData: any) => void;
  onOpenEligibilityModal: () => void;
}

export const SolarAssessmentTool: React.FC<SolarAssessmentToolProps> = ({
  onOpenProjectEnquiry,
  onOpenBookCall,
  onOpenEligibilityModal,
}) => {
  // Step State (1 to 6)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Form Inputs
  const [propertyType, setPropertyType] = useState<PropertyType>('WAREHOUSE');
  const [postcode, setPostcode] = useState<string>('SW1A 1AA');
  const [city, setCity] = useState<string>('London');
  const [region, setRegion] = useState<string>('London');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const [energyMode, setEnergyMode] = useState<EnergyInputMode>('MONTHLY_BILL');
  const [monthlyBill, setMonthlyBill] = useState<number>(1000);
  const [annualKwh, setAnnualKwh] = useState<number>(45000);

  const [spaceSize, setSpaceSize] = useState<SpaceOption>('Large');
  const [exactRoofArea, setExactRoofArea] = useState<number | undefined>(undefined);
  const [availableLandAcres, setAvailableLandAcres] = useState<number | undefined>(undefined);

  // Commercial mode inputs
  const [isCommercialMode, setIsCommercialMode] = useState<boolean>(true);
  const [peakDemandKw, setPeakDemandKw] = useState<number>(120);
  const [currentTariffPence, setCurrentTariffPence] = useState<number>(28);
  const [operatingHours, setOperatingHours] = useState<'Standard Business (9-5)' | 'Extended (7am-9pm)' | '24/7 Continuous' | 'Shift-based'>('Standard Business (9-5)');
  const [transformerCapacity, setTransformerCapacity] = useState<number>(200);
  const [preferredModel, setPreferredModel] = useState<'CAPEX' | 'PPA' | 'RESCO' | 'BOOT' | 'BOO' | 'LEASING'>('PPA');

  // Battery Storage
  const [wantsBattery, setWantsBattery] = useState<BatteryChoice>('YES');
  const [selectedBatteryKwh, setSelectedBatteryKwh] = useState<number>(100);

  // Results State
  const [calculationResult, setCalculationResult] = useState<SolarAssessmentResult | null>(null);
  const [savedRefNumber, setSavedRefNumber] = useState<string | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>('');
  const [saveEmail, setSaveEmail] = useState<string>('');

  // Update commercial mode when property type changes
  useEffect(() => {
    const isCommercial = isCommercialPropertyType(propertyType);
    setIsCommercialMode(isCommercial);
    if (isCommercial) {
      if (monthlyBill < 500) setMonthlyBill(1000);
      setSelectedBatteryKwh(100);
    } else {
      if (monthlyBill > 500) setMonthlyBill(250);
      setSelectedBatteryKwh(10);
    }
  }, [propertyType]);

  // Recalculate whenever inputs change or when entering Step 6
  useEffect(() => {
    const input: SolarAssessmentInput = {
      propertyType,
      postcode,
      city,
      region,
      energyInputMode: energyMode,
      monthlyBillGbp: energyMode === 'MONTHLY_BILL' ? monthlyBill : undefined,
      annualKwh: energyMode === 'ANNUAL_KWH' ? annualKwh : undefined,
      spaceSize,
      exactRoofAreaM2: exactRoofArea,
      availableLandAcres: availableLandAcres,
      wantsBattery,
      selectedBatteryKwh: wantsBattery === 'YES' ? selectedBatteryKwh : 0,
      isCommercialMode,
      peakDemandKw,
      currentTariffPencePerKwh: currentTariffPence,
      operatingHours,
      transformerCapacityKva: transformerCapacity,
      preferredBusinessModel: preferredModel,
    };

    const result = calculateSolarOpportunity(input);
    setCalculationResult(result);
  }, [
    propertyType,
    postcode,
    city,
    region,
    energyMode,
    monthlyBill,
    annualKwh,
    spaceSize,
    exactRoofArea,
    availableLandAcres,
    wantsBattery,
    selectedBatteryKwh,
    isCommercialMode,
    peakDemandKw,
    currentTariffPence,
    operatingHours,
    transformerCapacity,
    preferredModel,
  ]);

  // Handle Location Permission via explicit button
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        // Indicative default for UK center
        setRegion('South East');
        setCity('London Metro Area');
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 5000 }
    );
  };

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveEmail) return;
    const { referenceNumber } = saveAssessmentDraft({
      name: saveName,
      email: saveEmail,
      propertyType,
      city,
      region,
      calculationResult,
    });
    setSavedRefNumber(referenceNumber);
    setSaveModalOpen(false);
  };

  const propertyCards: { type: PropertyType; label: string; icon: any; category: string }[] = [
    { type: 'HOME', label: 'Home', icon: Home, category: 'Residential' },
    { type: 'APARTMENT', label: 'Apartment', icon: Building, category: 'Residential' },
    { type: 'OFFICE', label: 'Office', icon: Building2, category: 'Commercial' },
    { type: 'SHOP', label: 'Shop / Retail', icon: Store, category: 'Commercial' },
    { type: 'WAREHOUSE', label: 'Warehouse', icon: Warehouse, category: 'Industrial' },
    { type: 'FACTORY', label: 'Factory', icon: Factory, category: 'Industrial' },
    { type: 'HOTEL', label: 'Hotel', icon: Hotel, category: 'Commercial' },
    { type: 'SCHOOL', label: 'School / Univ', icon: GraduationCap, category: 'Institutional' },
    { type: 'HOSPITAL', label: 'Hospital', icon: HeartPulse, category: 'Institutional' },
    { type: 'FARM', label: 'Farm / Land', icon: Tractor, category: 'Agricultural' },
    { type: 'OTHER', label: 'Other', icon: HelpCircle, category: 'Custom' },
  ];

  const stepsList = [
    { num: 1, label: 'PROPERTY' },
    { num: 2, label: 'LOCATION' },
    { num: 3, label: 'ENERGY' },
    { num: 4, label: 'SITE' },
    { num: 5, label: 'STORAGE' },
    { num: 6, label: 'RESULT' },
  ];

  return (
    <section id="solar-assessment-platform" className="py-20 bg-[#06152F] relative overflow-hidden border-b border-line">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="mini-tag">Interactive Clean Energy Sizing Engine</span>
            <span className="text-slate-500">•</span>
            <span className="text-[10px] text-slate-400 font-mono">UK DESNZ BENCHMARKED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            FIND YOUR <span className="text-[#7AAA2B]">SOLAR SOLUTION.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Tell us about your property and energy use. We'll help identify the right renewable-energy approach, sizing metrics, and financing structure.
          </p>
        </div>

        {/* Multi-Step Calculator Shell */}
        <div className="bg-[#0A1E3A] border border-line rounded-sm shadow-2xl overflow-hidden">
          
          {/* Top Progress Bar & Steps Tabs */}
          <div className="border-b border-line bg-[#06152F]/70 px-4 sm:px-8 py-3">
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0">
              {stepsList.map((step) => {
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;
                return (
                  <button
                    key={step.num}
                    onClick={() => setCurrentStep(step.num)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md'
                        : isCompleted
                        ? 'text-[#7AAA2B] hover:bg-[#0A1E3A]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-mono font-bold ${
                      isActive ? 'bg-[#06152F] text-[#7AAA2B]' : isCompleted ? 'bg-[#7AAA2B]/20 text-[#7AAA2B]' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isCompleted ? <Check className="w-3 h-3" /> : `0${step.num}`}
                    </span>
                    <span className="mini-tag text-[11px]">{step.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4E8B1E] via-[#7AAA2B] to-[#FF6321]"
                initial={{ width: '16%' }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Body Step Views */}
          <div className="p-6 sm:p-10 min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: PROPERTY TYPE */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="mini-tag text-[#7AAA2B]">Step 01 of 06</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                        WHAT TYPE OF PROPERTY ARE YOU POWERING?
                      </h3>
                    </div>
                    {isCommercialMode && (
                      <span className="px-2.5 py-1 rounded-sm bg-[#FF6321]/20 text-[#FF6321] text-xs font-bold border border-[#FF6321]/40 mini-tag">
                        Commercial Energy Mode Active
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {propertyCards.map((card) => {
                      const Icon = card.icon;
                      const isSelected = propertyType === card.type;
                      return (
                        <button
                          key={card.type}
                          type="button"
                          onClick={() => setPropertyType(card.type)}
                          className={`p-4 rounded-sm border text-left transition-all flex flex-col justify-between min-h-[110px] cursor-pointer ${
                            isSelected
                              ? 'bg-[#7AAA2B]/15 border-[#7AAA2B] border-l-4 shadow-xl text-white'
                              : 'bg-[#06152F] border-line hover:border-slate-500 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className={`p-2 rounded-sm ${isSelected ? 'bg-[#7AAA2B] text-[#06152F]' : 'bg-[#0A1E3A] text-slate-400'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono uppercase">{card.category}</span>
                          </div>
                          <div>
                            <span className="text-sm font-bold block uppercase tracking-tight">{card.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LOCATION */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="mini-tag text-[#7AAA2B]">Step 02 of 06</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      WHERE IS YOUR PROPERTY LOCATED?
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Solar irradiation and grid regional constraints vary across the UK. Used only for regional yield calibration.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="mini-tag text-slate-300 block">Postcode (UK)</label>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                        placeholder="e.g. SW1A 1AA / M1 1AE"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#06152F] border border-line text-white font-mono text-sm focus:outline-none focus:border-[#7AAA2B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="mini-tag text-slate-300 block">City / Town</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Manchester, Birmingham, London"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#06152F] border border-line text-white text-sm focus:outline-none focus:border-[#7AAA2B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="mini-tag text-slate-300 block">UK Region</label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#06152F] border border-line text-white text-sm focus:outline-none focus:border-[#7AAA2B]"
                      >
                        <option value="London">London & Greater London</option>
                        <option value="South East">South East England</option>
                        <option value="South West">South West England (High Irradiance)</option>
                        <option value="East of England">East of England</option>
                        <option value="East Midlands">East Midlands</option>
                        <option value="West Midlands">West Midlands</option>
                        <option value="North West">North West England</option>
                        <option value="Yorkshire & Humber">Yorkshire & The Humber</option>
                        <option value="North East">North East England</option>
                        <option value="Wales">Wales</option>
                        <option value="Scotland">Scotland</option>
                        <option value="Northern Ireland">Northern Ireland</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleUseMyLocation}
                      disabled={isLocating}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-sm glass text-xs font-bold text-[#7AAA2B] hover:bg-[#7AAA2B]/10 transition-colors cursor-pointer"
                    >
                      <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                      <span>{isLocating ? 'Detecting approximate UK region...' : 'USE MY LOCATION'}</span>
                    </button>
                    <span className="text-[11px] text-slate-400 ml-3">
                      *Optional. No exact GPS coordinates are stored.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: ENERGY CONSUMPTION */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="mini-tag text-[#7AAA2B]">Step 03 of 06</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                        WHAT IS YOUR APPROXIMATE ELECTRICITY USE?
                      </h3>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex items-center rounded-sm bg-[#06152F] p-1 border border-line">
                      <button
                        type="button"
                        onClick={() => setEnergyMode('MONTHLY_BILL')}
                        className={`px-3 py-1 text-xs font-bold rounded-sm transition-all cursor-pointer ${
                          energyMode === 'MONTHLY_BILL' ? 'bg-[#7AAA2B] text-[#06152F]' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        MONTHLY BILL
                      </button>
                      <button
                        type="button"
                        onClick={() => setEnergyMode('ANNUAL_KWH')}
                        className={`px-3 py-1 text-xs font-bold rounded-sm transition-all cursor-pointer ${
                          energyMode === 'ANNUAL_KWH' ? 'bg-[#7AAA2B] text-[#06152F]' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        ANNUAL CONSUMPTION (kWh)
                      </button>
                    </div>
                  </div>

                  {energyMode === 'MONTHLY_BILL' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                          { val: 100, label: '£100 / mo' },
                          { val: 250, label: '£250 / mo' },
                          { val: 500, label: '£500 / mo' },
                          { val: 1000, label: '£1,000 / mo' },
                          { val: 2500, label: '£2,500 / mo' },
                          { val: 5000, label: '£5,000+ / mo' },
                        ].map((tier) => {
                          const isSel = monthlyBill === tier.val;
                          return (
                            <button
                              key={tier.val}
                              type="button"
                              onClick={() => setMonthlyBill(tier.val)}
                              className={`p-3.5 rounded-sm border text-center font-mono font-bold text-sm transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-[#7AAA2B] text-[#06152F] border-[#7AAA2B] shadow-lg scale-[1.02]'
                                  : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                              }`}
                            >
                              {tier.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-4 rounded-sm bg-[#06152F] border border-line flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="mini-tag text-slate-400 block">Custom Monthly Spend:</span>
                          <span className="text-xl font-bold font-mono text-[#7AAA2B]">£{monthlyBill.toLocaleString()} / month</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="20000"
                          step="50"
                          value={monthlyBill}
                          onChange={(e) => setMonthlyBill(Number(e.target.value))}
                          className="w-full sm:w-64 accent-[#7AAA2B]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-sm bg-[#06152F] border border-line space-y-3">
                        <label className="mini-tag text-slate-300 block">Enter Total Annual kWh:</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            min="1000"
                            max="5000000"
                            step="1000"
                            value={annualKwh}
                            onChange={(e) => setAnnualKwh(Number(e.target.value))}
                            className="w-full px-4 py-2.5 rounded-sm bg-[#0A1E3A] border border-line text-white font-mono text-base focus:outline-none focus:border-[#7AAA2B]"
                          />
                          <span className="font-mono text-sm text-[#7AAA2B] font-bold">kWh / Year</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Commercial Mode Advanced Fields */}
                  {isCommercialMode && (
                    <div className="p-4 rounded-sm bg-[#06152F]/70 border border-[#FF6321]/30 border-l-2 border-l-[#FF6321] space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#FF6321]" />
                        <span className="mini-tag text-[#FF6321]">Commercial Mode Energy Parameters</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-slate-400 block mb-1">Peak Demand (kW):</label>
                          <input
                            type="number"
                            value={peakDemandKw}
                            onChange={(e) => setPeakDemandKw(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 rounded-sm bg-[#0A1E3A] border border-line text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Current Tariff (p/kWh):</label>
                          <input
                            type="number"
                            value={currentTariffPence}
                            onChange={(e) => setCurrentTariffPence(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 rounded-sm bg-[#0A1E3A] border border-line text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Operating Profile:</label>
                          <select
                            value={operatingHours}
                            onChange={(e) => setOperatingHours(e.target.value as any)}
                            className="w-full px-2.5 py-1.5 rounded-sm bg-[#0A1E3A] border border-line text-white"
                          >
                            <option value="Standard Business (9-5)">Standard (9am - 5pm)</option>
                            <option value="Extended (7am-9pm)">Extended (7am - 9pm)</option>
                            <option value="24/7 Continuous">24/7 Continuous Heavy Load</option>
                            <option value="Shift-based">Shift-Based Manufacturing</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 4: ROOF / SITE SIZE */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="mini-tag text-[#7AAA2B]">Step 04 of 06</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      HOW MUCH SPACE IS AVAILABLE FOR RENEWABLES?
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      System sizing is constrained by structural roof area or ground land availability.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { size: 'Small' as SpaceOption, desc: isCommercialMode ? '< 300 m² (Up to 40 kWp)' : 'Small Rooftop (2–4 kWp)' },
                      { size: 'Medium' as SpaceOption, desc: isCommercialMode ? '300 – 1,000 m² (Up to 120 kWp)' : 'Standard Semi/Detached (4–8 kWp)' },
                      { size: 'Large' as SpaceOption, desc: isCommercialMode ? '1,000 – 3,000 m² (Up to 350 kWp)' : 'Large Detached / Farm (8–16 kWp)' },
                      { size: 'Very Large' as SpaceOption, desc: isCommercialMode ? '3,000+ m² / Megawatt Scale' : 'Estate / Multitenant Roof' },
                    ].map((opt) => {
                      const isSel = spaceSize === opt.size;
                      return (
                        <button
                          key={opt.size}
                          type="button"
                          onClick={() => setSpaceSize(opt.size)}
                          className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                            isSel
                              ? 'bg-[#7AAA2B]/15 border-[#7AAA2B] border-l-4 text-white shadow-xl'
                              : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <span className="text-base font-bold font-display uppercase">{opt.size}</span>
                          <span className="text-[11px] text-slate-400 leading-tight mt-2">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional exact dimensions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-sm bg-[#06152F] border border-line space-y-1.5">
                      <label className="mini-tag text-slate-300 block">Optional: Exact Roof Area (m²)</label>
                      <input
                        type="number"
                        placeholder="e.g. 850"
                        value={exactRoofArea || ''}
                        onChange={(e) => setExactRoofArea(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full px-3 py-2 rounded-sm bg-[#0A1E3A] border border-line text-white font-mono text-sm focus:outline-none focus:border-[#7AAA2B]"
                      />
                    </div>

                    <div className="p-3.5 rounded-sm bg-[#06152F] border border-line space-y-1.5">
                      <label className="mini-tag text-slate-300 block">Optional: Available Land (Acres / Hectares)</label>
                      <input
                        type="number"
                        placeholder="e.g. 5"
                        value={availableLandAcres || ''}
                        onChange={(e) => setAvailableLandAcres(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full px-3 py-2 rounded-sm bg-[#0A1E3A] border border-line text-white font-mono text-sm focus:outline-none focus:border-[#7AAA2B]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: STORAGE RECOMMENDATION */}
              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="mini-tag text-[#7AAA2B]">Step 05 of 06</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      WOULD YOU LIKE TO ADD BATTERY STORAGE?
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      BESS stores excess daytime solar, delivers peak shaving, and unlocks time-of-use tariff arbitrage.
                    </p>
                  </div>

                  {/* Choice Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { choice: 'YES' as BatteryChoice, label: 'YES', sub: 'Include BESS for higher autonomy' },
                      { choice: 'NO' as BatteryChoice, label: 'NO', sub: 'Solar PV only' },
                      { choice: 'NOT_SURE' as BatteryChoice, label: 'NOT SURE', sub: 'Recommend best sizing' },
                    ].map((btn) => {
                      const isSel = wantsBattery === btn.choice;
                      return (
                        <button
                          key={btn.choice}
                          type="button"
                          onClick={() => setWantsBattery(btn.choice)}
                          className={`p-4 rounded-sm border text-center transition-all cursor-pointer ${
                            isSel
                              ? 'bg-[#7AAA2B] text-[#06152F] border-[#7AAA2B] font-bold shadow-lg'
                              : 'bg-[#06152F] border-line text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <span className="text-base font-extrabold font-display block uppercase">{btn.label}</span>
                          <span className={`text-[11px] block mt-1 ${isSel ? 'text-[#06152F]/90 font-medium' : 'text-slate-400'}`}>{btn.sub}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* If YES: display indicative battery capacity selector */}
                  {wantsBattery === 'YES' && (
                    <div className="p-5 rounded-sm bg-[#06152F] border border-line space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="mini-tag text-sky-400">Indicative Battery Capacity Selection</span>
                        <span className="text-xs font-mono font-bold text-white">{selectedBatteryKwh} kWh LFP Storage</span>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {(isCommercialMode
                          ? [50, 100, 250, 500, 1000, 2500]
                          : [5, 10, 15, 20, 30, 50]
                        ).map((kwh) => (
                          <button
                            key={kwh}
                            type="button"
                            onClick={() => setSelectedBatteryKwh(kwh)}
                            className={`p-2.5 rounded-sm text-center font-mono text-xs font-bold transition-all border cursor-pointer ${
                              selectedBatteryKwh === kwh
                                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                                : 'bg-[#0A1E3A] border-line text-slate-300 hover:bg-[#0A1E3A]/80'
                            }`}
                          >
                            {kwh >= 1000 ? `${(kwh / 1000).toFixed(1)} MWh` : `${kwh} kWh`}
                          </button>
                        ))}
                      </div>

                      <div className="p-3 rounded-sm glass flex items-center gap-3 text-xs text-slate-300 mt-2">
                        <Battery className="w-5 h-5 text-sky-400 shrink-0" />
                        <div>
                          <strong className="text-white">SOLAR + BATTERY = SMARTER ENERGY MANAGEMENT</strong>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Increases on-site clean power consumption from ~40% up to ~80%, insulating operations from peak red-band network surcharges.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 6: RESULTS & INDICATIVE ESTIMATE */}
              {currentStep === 6 && calculationResult && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#7AAA2B]/15 text-[#7AAA2B] text-[10px] font-bold tracking-wider uppercase mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Sizing Assessment Complete</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
                        YOUR INDICATIVE SOLAR OPPORTUNITY
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="mini-tag text-slate-400">Ref:</span>
                      <span className="font-mono text-xs text-[#7AAA2B] font-bold bg-[#06152F] px-2.5 py-1 rounded-sm border border-line">
                        {savedRefNumber || calculationResult.assessmentReferenceId}
                      </span>
                    </div>
                  </div>

                  {/* 4 Core Metric Stat Blocks */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    {/* System Size */}
                    <div className="p-4 rounded-sm bg-[#06152F] border border-line stat-card">
                      <span className="mini-tag text-slate-400 block mb-1">Estimated System Size</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                          {calculationResult.estimatedSystemSizeKw}
                        </span>
                        <span className="text-xs text-[#7AAA2B] font-bold">kWp</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        ~{calculationResult.estimatedPanelsCount} Tier-1 Monocrystalline Modules
                      </span>
                    </div>

                    {/* Annual Generation */}
                    <div className="p-4 rounded-sm bg-[#06152F] border border-line stat-card">
                      <span className="mini-tag text-slate-400 block mb-1">Estimated Annual Generation</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-[#7AAA2B] font-mono">
                          {calculationResult.estimatedAnnualGenerationKwh.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">kWh/yr</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Region: {region} ({((calculationResult.estimatedAnnualGenerationKwh / (calculationResult.estimatedSystemSizeKw || 1))).toFixed(0)} kWh/kWp)
                      </span>
                    </div>

                    {/* Solar Coverage */}
                    <div className="p-4 rounded-sm bg-[#06152F] border border-line stat-card">
                      <span className="mini-tag text-slate-400 block mb-1">Estimated Solar Coverage</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                          {calculationResult.estimatedSolarCoveragePercent}%
                        </span>
                        <span className="text-xs text-[#7AAA2B] font-bold">Demand Offset</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {wantsBattery === 'YES' ? `+ ${calculationResult.indicativeBatteryCapacityKwh} kWh BESS Storage` : 'Direct Solar Generation'}
                      </span>
                    </div>

                    {/* Carbon Abatement (Defensible UK DESNZ Factor) */}
                    <div className="p-4 rounded-sm bg-[#06152F] border border-line stat-card">
                      <span className="mini-tag text-slate-400 block mb-1">Estimated CO₂ Avoidance</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                          {(calculationResult.estimatedCo2AvoidanceKgPerYear / 1000).toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">Tonnes/yr</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        DESNZ Factor: 0.193 kg CO₂e / kWh
                      </span>
                    </div>

                  </div>

                  {/* Financial & Business Model Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    <div className="p-4 rounded-sm bg-[#06152F] border border-line space-y-2">
                      <span className="mini-tag text-slate-400 block">Indicative Financial Scope</span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-line">
                          <span className="text-slate-300">Project Cost Range (CAPEX):</span>
                          <span className="font-mono text-white font-bold">
                            £{calculationResult.estimatedProjectCostRangeGbp.min.toLocaleString()} – £{calculationResult.estimatedProjectCostRangeGbp.max.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-line">
                          <span className="text-slate-300">Annual Energy Value:</span>
                          <span className="font-mono text-[#7AAA2B] font-bold">
                            £{calculationResult.estimatedAnnualEnergyValueGbp.min.toLocaleString()} – £{calculationResult.estimatedAnnualEnergyValueGbp.max.toLocaleString()} / yr
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-300">Indicative Payback:</span>
                          <span className="font-mono text-white font-bold">
                            {calculationResult.indicativePaybackYears.min} – {calculationResult.indicativePaybackYears.max} Years
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-sm bg-[#06152F] border border-line space-y-2 border-l-2 border-l-[#FF6321]">
                      <span className="mini-tag text-[#FF6321] block">Recommended Financing Structure</span>
                      <h4 className="text-base font-bold text-white font-display uppercase">
                        {calculationResult.recommendedBusinessModel}
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {calculationResult.isCommercialScale
                          ? 'Zero-CAPEX Corporate PPA or RESCO models enable immediate clean energy procurement with zero upfront capital outlay.'
                          : 'Asset ownership via CAPEX delivers maximal lifetime return on capital with standard manufacturer warranties.'}
                      </p>
                      <button
                        type="button"
                        onClick={onOpenEligibilityModal}
                        className="text-xs font-bold text-[#FF6321] hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <span>Check Zero-CAPEX PPA Eligibility</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line flex flex-col justify-between space-y-3">
                      <div>
                        <span className="mini-tag text-slate-300 block">Next Steps</span>
                        <h4 className="text-sm font-bold text-white mt-1">Book a Site & Grid Assessment</h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Our technical engineering team will run 3D solar shading models, DNO G99 checks, and yield simulations.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenProjectEnquiry({ ...calculationResult, propertyType, city, region })}
                          className="w-full py-2.5 px-3 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                        >
                          <span>REQUEST FULL PROPOSAL</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => onOpenBookCall({ ...calculationResult, propertyType })}
                            className="flex-1 py-2 px-2.5 rounded-sm mini-tag glass hover:bg-white/10 text-white font-bold text-center cursor-pointer transition-colors"
                          >
                            BOOK A CALL
                          </button>
                          <button
                            type="button"
                            onClick={() => setSaveModalOpen(true)}
                            className="py-2 px-2.5 rounded-sm mini-tag glass hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            title="Save Assessment"
                          >
                            <BookmarkPlus className="w-4 h-4" />
                            <span>SAVE</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Mandatory Compliance Disclaimer */}
                  <div className="p-3 rounded-sm bg-[#06152F]/90 border border-line text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-slate-300">Indicative estimate only:</strong> Final system size, generation yield, export capacity, grid connection approvals (G99/G100), and financial performance require a formal site survey, structural verification, and professional energy assessment by Unite Greentek Limited.
                    </p>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

            {/* Bottom Step Navigation Bar */}
            <div className="flex items-center justify-between pt-8 border-t border-line mt-6">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 rounded-sm mini-tag glass text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  STEP {currentStep} OF {totalSteps}
                </span>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                    className="px-6 py-2.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-extrabold flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenProjectEnquiry({ ...calculationResult, propertyType, city, region })}
                    className="px-6 py-2.5 rounded-sm mini-tag bg-[#FF6321] hover:bg-orange-600 text-white font-extrabold flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                  >
                    <span>REQUEST ASSESSMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Save Assessment Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0A1E3A] border border-line rounded-sm p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h4 className="text-base font-bold text-white font-display uppercase">SAVE MY ASSESSMENT</h4>
              <button
                onClick={() => setSaveModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your details to generate a saved project dossier reference. You can retrieve this during your engineering consultation.
            </p>
            <form onSubmit={handleSaveAssessment} className="space-y-3">
              <div>
                <label className="mini-tag text-slate-400 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>
              <div>
                <label className="mini-tag text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={saveEmail}
                  onChange={(e) => setSaveEmail(e.target.value)}
                  placeholder="name@company.co.uk"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] font-bold hover:bg-[#689423] cursor-pointer transition-colors"
              >
                GENERATE REFERENCE & SAVE
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
