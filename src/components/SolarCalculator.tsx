import React, { useState, useId } from 'react';
import { PROPERTY_TYPES, UK_REGIONS } from '../data/energyData';
import { Calculator, Zap, Sun, DollarSign, Leaf, Sparkles, Building2, Factory, Warehouse, GraduationCap, Activity, Home, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

interface SolarCalculatorProps {
  onOpenAssessmentWithData: (calcData: any) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenAssessmentWithData }) => {
  const propertyTypeId = useId();
  const regionSelectId = useId();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('factory');
  const [roofAreaM2, setRoofAreaM2] = useState<number>(3500);
  const [annualSpendGbp, setAnnualSpendGbp] = useState<number>(180000);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('midlands');
  const [includeBess, setIncludeBess] = useState<boolean>(true);

  const currentProperty = PROPERTY_TYPES.find((p) => p.id === selectedPropertyId) || PROPERTY_TYPES[1];
  const currentRegion = UK_REGIONS.find((r) => r.id === selectedRegionId) || UK_REGIONS[3];

  // Property switch updates default sensible numbers
  const handlePropertyChange = (propId: string) => {
    setSelectedPropertyId(propId);
    const prop = PROPERTY_TYPES.find((p) => p.id === propId);
    if (prop) {
      setRoofAreaM2(prop.defaultRoof);
      setAnnualSpendGbp(prop.defaultSpend);
    }
  };

  // Calculations based on realistic UK solar yield metrics:
  // ~6.5m² per kWp installed for commercial high-efficiency N-Type modules
  const usableRoofFactor = selectedPropertyId === 'solar-park' ? 0.85 : 0.75;
  const estimatedKwp = Math.round((roofAreaM2 * usableRoofFactor) / 6.5);
  
  // Regional irradiance factor (South West = 1,120 kWh/kWp, Midlands = 980 kWh/kWp, Scotland = 890 kWh/kWp)
  let regionFactor = 980;
  if (currentRegion.solarPotential === 'Exceptional') regionFactor = 1120;
  else if (currentRegion.solarPotential === 'Very High') regionFactor = 1040;
  else if (currentRegion.solarPotential === 'High') regionFactor = 970;
  else regionFactor = 890;

  const annualGenerationKwh = Math.round(estimatedKwp * regionFactor);
  
  // Assuming average commercial electricity tariff ~ £0.26 / kWh (UK commercial blended)
  const tariffPerKwh = selectedPropertyId === 'home' ? 0.28 : 0.24;
  const estimatedElectricityKwh = annualSpendGbp / tariffPerKwh;
  
  // Offset percentage
  const rawOffset = Math.min(95, Math.round((annualGenerationKwh / (estimatedElectricityKwh || 1)) * 100));
  const effectiveOffset = includeBess ? Math.min(92, rawOffset + 18) : rawOffset;
  
  // Annual financial savings (self-consumption + export)
  const annualSavingsGbp = Math.round(annualGenerationKwh * 0.21);
  
  // Carbon offset: UK grid carbon intensity factor ~ 0.207 kg CO2e / kWh
  const annualCo2Tonnes = +( (annualGenerationKwh * 0.207) / 1000 ).toFixed(1);

  return (
    <section id="calculator" className="py-24 bg-[#06152F] relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#F37021]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#FF6321]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#FF6321] uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span className="mini-tag">05. Solar Estimator</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">PVSYST ALIGNED</span>
            </div>
            <span className="h-[1px] w-8 bg-[#FF6321]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            INDICATIVE SOLAR & <br />
            <span className="text-[#7AAA2B]">
              CLEAN ENERGY ESTIMATOR.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Select your property archetype and parameters to calculate estimated solar capacity, annual kWh generation, carbon offset, and commercial bill reduction.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Input Parameters */}
          <div className="lg:col-span-7 bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-5 shadow-xl border-l-2 border-l-[#FF6321]">
            
            {/* Step 1: Property Archetype Selector */}
            <div className="space-y-2.5">
              <label htmlFor={propertyTypeId} className="mini-tag text-slate-300 flex items-center justify-between">
                <span>1. Select Property Type</span>
                <span className="text-slate-500 font-normal">7 Architectural Categories</span>
              </label>
              
              <div id={propertyTypeId} className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {PROPERTY_TYPES.map((pt) => {
                  const isSelected = selectedPropertyId === pt.id;
                  return (
                    <button
                      key={pt.id}
                      onClick={() => handlePropertyChange(pt.id)}
                      className={`p-2.5 rounded-sm text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md border border-[#7AAA2B]'
                          : 'bg-[#0A1E3A] text-slate-400 hover:text-white border border-line hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs font-bold font-display uppercase">{pt.label.split(' ')[0]}</span>
                      <span className="text-[9px] opacity-80 truncate">{pt.label.split(' ').slice(1).join(' ') || 'Site'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Roof Area Slider */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="mini-tag text-slate-300">
                  2. Usable Roof / Land Area
                </span>
                <span className="text-xs font-bold text-white font-mono bg-[#0A1E3A] px-2.5 py-0.5 rounded-sm border border-line">
                  {roofAreaM2.toLocaleString()} m²
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={selectedPropertyId === 'solar-park' ? 40000 : 15000}
                step={50}
                value={roofAreaM2}
                onChange={(e) => setRoofAreaM2(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-sm appearance-none cursor-pointer accent-[#FF6321]"
                aria-label="Roof Area slider"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>50 m²</span>
                <span>{selectedPropertyId === 'solar-park' ? '40,000 m²' : '15,000 m²'}</span>
              </div>
            </div>

            {/* Step 3: Annual Energy Spend */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="mini-tag text-slate-300">
                  3. Current Annual Electricity Spend (£)
                </span>
                <span className="text-xs font-bold text-white font-mono bg-[#0A1E3A] px-2.5 py-0.5 rounded-sm border border-line">
                  £{annualSpendGbp.toLocaleString()} / yr
                </span>
              </div>
              <input
                type="range"
                min={1500}
                max={500000}
                step={1000}
                value={annualSpendGbp}
                onChange={(e) => setAnnualSpendGbp(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-sm appearance-none cursor-pointer accent-[#7AAA2B]"
                aria-label="Annual electricity spend slider"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>£1,500</span>
                <span>£500,000+</span>
              </div>
            </div>

            {/* Step 4: Region & BESS inclusion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor={regionSelectId} className="block mini-tag text-slate-300 mb-1.5">
                  4. UK Location
                </label>
                <select
                  id={regionSelectId}
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                  className="w-full bg-[#0A1E3A] border border-line rounded-sm px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#7AAA2B]"
                >
                  {UK_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.solarPotential} Yield)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2.5 p-2 rounded-sm bg-[#0A1E3A] border border-line cursor-pointer hover:border-white/20">
                  <input
                    type="checkbox"
                    checked={includeBess}
                    onChange={(e) => setIncludeBess(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-sm text-[#7AAA2B] accent-[#7AAA2B]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white block text-[11px]">Include BESS Battery</span>
                    <span className="text-[9px] text-slate-400">+18% self-consumption & UPS</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right: Results Output Cockpit */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Dynamic Architecture Visual preview */}
            <div className="rounded-sm bg-[#06152F] border border-line p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden border-l-2 border-l-[#7AAA2B]">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <span className="mini-tag text-[#7AAA2B]">Indicative Output</span>
                  <h3 className="text-lg font-extrabold text-white font-display uppercase">
                    Clean Energy Yield Profile
                  </h3>
                </div>
                <span className="mini-tag px-2 py-0.5 rounded-sm bg-[#0A1E3A] text-[#FF6321] border border-line font-bold">
                  {currentProperty.label}
                </span>
              </div>

              {/* 4 Core Output Metrics */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-sm stat-card-orange bg-[#0A1E3A]/60 border-line space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Sun className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span className="mini-tag">Solar Capacity</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    {estimatedKwp.toLocaleString()} <span className="text-[10px] font-sans text-slate-400 font-normal">kWp</span>
                  </p>
                </div>

                <div className="p-3 rounded-sm stat-card bg-[#0A1E3A]/60 border-line space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Zap className="w-3.5 h-3.5 text-[#7AAA2B]" />
                    <span className="mini-tag">Annual Yield</span>
                  </div>
                  <p className="text-xl font-black text-[#7AAA2B] font-mono">
                    {annualGenerationKwh.toLocaleString()} <span className="text-[10px] font-sans text-slate-400 font-normal">kWh</span>
                  </p>
                </div>

                <div className="p-3 rounded-sm stat-card bg-[#0A1E3A]/60 border-line space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="mini-tag">Bill Offset</span>
                  </div>
                  <p className="text-xl font-black text-emerald-400 font-mono">
                    {effectiveOffset}% <span className="text-[10px] font-sans text-slate-400 font-normal">coverage</span>
                  </p>
                </div>

                <div className="p-3 rounded-sm stat-card bg-[#0A1E3A]/60 border-line space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Leaf className="w-3.5 h-3.5 text-teal-400" />
                    <span className="mini-tag">Carbon Abated</span>
                  </div>
                  <p className="text-xl font-black text-teal-300 font-mono">
                    {annualCo2Tonnes} <span className="text-[10px] font-sans text-slate-400 font-normal">t/yr</span>
                  </p>
                </div>
              </div>

              {/* Commercial Value Estimation */}
              <div className="p-3.5 rounded-sm bg-[#0A1E3A] border border-line space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="mini-tag text-slate-300">Annual Value Created:</span>
                  <span className="text-base font-black text-white font-mono">
                    ~£{annualSavingsGbp.toLocaleString()} / yr
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-sm bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7AAA2B] to-[#FF6321] rounded-sm transition-all duration-500"
                    style={{ width: `${Math.min(100, effectiveOffset)}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Calculated using £0.21/kWh blended offset & export index in {currentRegion.name}.
                </p>
              </div>

              {/* Strict Disclaimer from prompt */}
              <div className="flex items-start gap-2 text-[10px] text-slate-400 p-2.5 rounded-sm bg-[#0A1E3A]/40 border border-line">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Indicative estimate — professional assessment required.</strong> Structural roof survey, DNO G99 network connection studies, and half-hourly demand audits required before contractual agreement.
                </p>
              </div>

              {/* CTA */}
              <button
                id="calculator-submit-assessment-btn"
                onClick={() => onOpenAssessmentWithData({
                  propertyType: currentProperty.label,
                  roofAreaM2,
                  annualSpendGbp,
                  region: currentRegion.name,
                  estimatedKwp,
                  annualGenerationKwh,
                  includeBess
                })}
                className="w-full py-3 px-5 rounded-sm mini-tag text-white bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-colors"
              >
                <span>REQUEST DETAILED SITE SURVEY & PVSYST REPORT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
