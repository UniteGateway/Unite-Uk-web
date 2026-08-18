import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BatteryAssessmentInput, BessAssessmentResult } from '../../types';
import { calculateBessAssessment } from '../../services/calculationEngine';
import { Battery, Zap, Shield, Activity, Clock, CheckCircle2, ArrowRight, Info, Sparkles } from 'lucide-react';

interface BessAssessmentToolProps {
  onOpenAssessment: (initialData: any) => void;
}

export const BessAssessmentTool: React.FC<BessAssessmentToolProps> = ({ onOpenAssessment }) => {
  const [peakDemandKw, setPeakDemandKw] = useState<number>(250);
  const [operatingHours, setOperatingHours] = useState<string>('Two Shifts (16 hrs)');
  const [solarCapacityKwp, setSolarCapacityKwp] = useState<number>(150);
  const [desiredBackupHours, setDesiredBackupHours] = useState<number>(2);
  const [peakTariffPeriod, setPeakTariffPeriod] = useState<string>('4pm - 7pm (DUoS Red Band)');
  const [criticalLoads, setCriticalLoads] = useState<string[]>([
    'Cold Storage & Refrigeration',
    'Server & IT Infrastructure',
    'Manufacturing Assembly Lines',
  ]);

  const assessmentInput: BatteryAssessmentInput = {
    peakDemandKw,
    operatingHours,
    solarCapacityKwp,
    desiredBackupHours,
    peakTariffPeriod,
    criticalLoads,
  };

  const result: BessAssessmentResult = calculateBessAssessment(assessmentInput);

  const toggleCriticalLoad = (load: string) => {
    if (criticalLoads.includes(load)) {
      setCriticalLoads(criticalLoads.filter((l) => l !== load));
    } else {
      setCriticalLoads([...criticalLoads, load]);
    }
  };

  const loadOptions = [
    'Cold Storage & Refrigeration',
    'Server & IT Infrastructure',
    'Manufacturing Assembly Lines',
    'EV Fleet Charging Hub',
    'HVAC & Environmental Controls',
    'Safety & Fire Suppression Systems',
  ];

  return (
    <section id="bess-assessment" className="py-20 bg-[#06152F] relative overflow-hidden border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <Battery className="w-3.5 h-3.5" />
            <span className="mini-tag">Commercial & Utility Storage Assessor</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            BATTERY STORAGE <span className="text-sky-400">ASSESSMENT.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Evaluate optimal LFP battery capacity, C-rate discharge dynamics, peak demand shaving, and revenue-stacking use cases for your facility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-5 bg-[#0A1E3A] border border-line rounded-sm p-6 space-y-5 shadow-xl">
            <div className="border-b border-line pb-3">
              <span className="mini-tag text-sky-400">Facility Operational Parameters</span>
              <h3 className="text-lg font-bold text-white font-display uppercase">INPUT DATA</h3>
            </div>

            {/* Peak Demand */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="mini-tag text-slate-300">Site Peak Maximum Demand (kW)</label>
                <span className="font-mono text-sky-400 font-bold">{peakDemandKw} kW</span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="50"
                value={peakDemandKw}
                onChange={(e) => setPeakDemandKw(Number(e.target.value))}
                className="w-full accent-sky-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50 kW</span>
                <span>1,000 kW</span>
                <span>2,500 kW</span>
              </div>
            </div>

            {/* Desired Duration */}
            <div className="space-y-1.5">
              <label className="mini-tag text-slate-300 block">Desired Storage Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 4, 8].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setDesiredBackupHours(hrs)}
                    className={`py-2 px-2 rounded-sm text-center text-xs font-mono font-bold transition-all border cursor-pointer ${
                      desiredBackupHours === hrs
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                        : 'bg-[#06152F] border-line text-slate-300 hover:bg-[#06152F]/70'
                    }`}
                  >
                    {hrs} Hours
                  </button>
                ))}
              </div>
            </div>

            {/* Existing/Planned Solar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="mini-tag text-slate-300">Co-located Solar Capacity (kWp)</label>
                <span className="font-mono text-white font-bold">{solarCapacityKwp} kWp</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={solarCapacityKwp}
                onChange={(e) => setSolarCapacityKwp(Number(e.target.value))}
                className="w-full accent-[#7AAA2B]"
              />
            </div>

            {/* Critical Loads Selection */}
            <div className="space-y-2">
              <label className="mini-tag text-slate-300 block">Critical Facility Loads for Resilience:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {loadOptions.map((opt) => {
                  const isChecked = criticalLoads.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleCriticalLoad(opt)}
                      className={`p-2 rounded-sm text-left text-[11px] transition-all flex items-center gap-1.5 border cursor-pointer ${
                        isChecked
                          ? 'bg-sky-950/60 border-sky-400 text-sky-200 font-semibold'
                          : 'bg-[#06152F] border-line text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-sky-400' : 'text-slate-600'}`} />
                      <span className="line-clamp-1">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results & Use Cases Panel */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Recommendation Summary Card */}
            <div className="bg-[#0A1E3A] border border-line rounded-sm p-6 shadow-xl border-l-2 border-l-sky-400 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="mini-tag text-sky-400">Conceptual Sizing Recommendation</span>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {result.recommendedCapacityKwh.toLocaleString()} kWh ({((result.recommendedCapacityKwh / 1000)).toFixed(2)} MWh) LFP STORAGE
                  </h3>
                </div>
                <div className="px-3 py-1.5 rounded-sm glass text-xs font-mono text-slate-200">
                  Rating: <span className="text-sky-400 font-bold">{result.recommendedCrate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-sm bg-[#06152F] border border-line">
                  <span className="mini-tag text-slate-400 block mb-0.5">Discharge Power</span>
                  <span className="font-mono font-bold text-white text-sm">{peakDemandKw} kW Continuous</span>
                </div>
                <div className="p-2.5 rounded-sm bg-[#06152F] border border-line">
                  <span className="mini-tag text-slate-400 block mb-0.5">Cell Chemistry</span>
                  <span className="font-mono font-bold text-sky-300 text-sm">Lithium Iron (LFP)</span>
                </div>
                <div className="p-2.5 rounded-sm bg-[#06152F] border border-line">
                  <span className="mini-tag text-slate-400 block mb-0.5">Transfer Time</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">&lt; 20ms Seamless</span>
                </div>
              </div>
            </div>

            {/* 5 Potential Use Cases Grid */}
            <div className="space-y-2">
              <span className="mini-tag text-slate-400 block">Identified Commercial Value Stacks:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {result.useCases.map((uc, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-sm bg-[#0A1E3A] border border-line space-y-1 hover:border-slate-400 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white font-display uppercase line-clamp-1">{uc.title}</h4>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-mono font-bold uppercase ${
                        uc.relevanceScore === 'Essential'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      }`}>
                        {uc.relevanceScore}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{uc.description}</p>
                    <span className="text-[10px] text-sky-400 font-mono block pt-1">{uc.benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA & Disclaimer */}
            <div className="p-4 rounded-sm bg-[#06152F] border border-line space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">Ready for a Full BESS Engineering Study?</h4>
                  <p className="text-[11px] text-slate-400">
                    Includes half-hourly (HH) interval data parsing, DUoS red band optimisation, and G99 grid constraint modeling.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenAssessment({ projectType: 'BESS', ...assessmentInput, ...result })}
                  className="px-5 py-2.5 rounded-sm mini-tag bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  <span>REQUEST BESS PROPOSAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] text-slate-400 leading-tight border-t border-line pt-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>
                  *Conceptual recommendation — detailed load profiling, DNO connection verification, and actual market-clearing rates required for financial models.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
