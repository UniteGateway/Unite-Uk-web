import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HybridAssessmentInput, HybridAssessmentResult } from '../../types';
import { calculateHybridProject } from '../../services/calculationEngine';
import { Wind, Sun, Battery, Layers, ArrowRight, Info, Sparkles, MapPin, Gauge } from 'lucide-react';

interface HybridProjectExplorerProps {
  onOpenAssessment: (initialData: any) => void;
}

export const HybridProjectExplorer: React.FC<HybridProjectExplorerProps> = ({ onOpenAssessment }) => {
  const [location, setLocation] = useState<string>('Scotland / East Coast Corridors');
  const [landAreaAcres, setLandAreaAcres] = useState<number>(35);
  const [solarCapacityMw, setSolarCapacityMw] = useState<number>(10);
  const [windOpportunityRating, setWindOpportunityRating] = useState<'High' | 'Medium' | 'Exceptional'>('Exceptional');
  const [gridConnectionStatus, setGridConnectionStatus] = useState<'Secured' | 'Application Pending' | 'Feasibility Stage'>('Secured');
  const [storageRequirementMwh, setStorageRequirementMwh] = useState<number>(8);

  const hybridInput: HybridAssessmentInput = {
    location,
    landAreaAcres,
    solarCapacityMw,
    windOpportunityRating,
    gridConnectionStatus,
    storageRequirementMwh,
  };

  const result: HybridAssessmentResult = calculateHybridProject(hybridInput);

  return (
    <section id="hybrid-explorer" className="py-20 bg-[#06152F] relative overflow-hidden border-b border-line">
      {/* Ambient background light */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span className="mini-tag">Multisource Utility & Private Wire</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            EXPLORE <span className="text-[#7AAA2B]">HYBRID ENERGY.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Combine high-yield Solar PV with class-leading UK onshore wind and utility BESS behind a unified G99 grid connection to flatten intermittency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Inputs Section */}
          <div className="lg:col-span-5 bg-[#0A1E3A] border border-line rounded-sm p-6 space-y-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-line pb-3">
                <span className="mini-tag text-[#7AAA2B]">Project Parameters</span>
                <h3 className="text-lg font-bold text-white font-display uppercase">SITE & GRID CRITERIA</h3>
              </div>

              {/* Location selection */}
              <div className="space-y-1.5">
                <label className="mini-tag text-slate-300 block">Target Region / Coastal Corridor</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs"
                >
                  <option value="Scotland / East Coast Corridors">Scotland (Exceptional Wind / 8.5+ m/s)</option>
                  <option value="Wales & Severn Estuary">Wales & Western Corridors</option>
                  <option value="East of England / Lincolnshire">East of England & Humber Cluster</option>
                  <option value="South West Coastal">South West High-Solar Corridor</option>
                  <option value="Northern Ireland">Northern Ireland Renewable Zone</option>
                </select>
              </div>

              {/* Solar Capacity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="mini-tag text-slate-300">Target Solar PV Capacity (MWp)</label>
                  <span className="font-mono text-[#7AAA2B] font-bold">{solarCapacityMw} MWp</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={solarCapacityMw}
                  onChange={(e) => setSolarCapacityMw(Number(e.target.value))}
                  className="w-full accent-[#7AAA2B]"
                />
              </div>

              {/* Land Area */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="mini-tag text-slate-300">Available Land Area (Acres)</label>
                  <span className="font-mono text-white font-bold">{landAreaAcres} Acres</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={landAreaAcres}
                  onChange={(e) => setLandAreaAcres(Number(e.target.value))}
                  className="w-full accent-slate-400"
                />
              </div>

              {/* Wind Potential Rating */}
              <div className="space-y-1.5">
                <label className="mini-tag text-slate-300 block">Wind Resource Rating</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Medium', 'High', 'Exceptional'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setWindOpportunityRating(r)}
                      className={`py-2 px-2 rounded-sm text-center text-xs font-mono font-bold transition-all border cursor-pointer ${
                        windOpportunityRating === r
                          ? 'bg-[#FF6321] text-white border-[#FF6321] shadow-md'
                          : 'bg-[#06152F] border-line text-slate-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Connection Status */}
              <div className="space-y-1.5">
                <label className="mini-tag text-slate-300 block">Grid Connection Point (DNO / ESO)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Secured', 'Application Pending', 'Feasibility Stage'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGridConnectionStatus(g)}
                      className={`py-2 px-1 text-center text-[10px] font-mono font-bold transition-all border cursor-pointer line-clamp-1 ${
                        gridConnectionStatus === g
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                          : 'bg-[#06152F] border-line text-slate-400'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block font-mono">
                Formula: Co-located PV + Wind + Storage with Shared Substation
              </span>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            
            {/* Main Conceptual Output Card */}
            <div className="bg-[#0A1E3A] border border-line rounded-sm p-6 shadow-xl border-l-2 border-l-[#7AAA2B] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                <div>
                  <span className="mini-tag text-[#7AAA2B]">CONCEPTUAL HYBRID PROJECT</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase">
                    SOLAR + WIND + BESS ARCHITECTURE
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-sm bg-[#7AAA2B]/20 text-[#7AAA2B] font-mono font-bold text-xs">
                  {result.combinedCapacityFactorPercent}% Capacity Factor
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-[#06152F] p-3 rounded-sm border border-line">
                {result.recommendedArchitecture}
              </p>

              {/* 3 Metric Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-sm bg-[#06152F] border border-line">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Sun className="w-3.5 h-3.5 text-[#7AAA2B]" />
                    <span className="mini-tag">Solar Output</span>
                  </div>
                  <p className="text-xl font-bold text-white font-mono">{result.solarGenerationGwhYear} GWh/yr</p>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Wind className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span className="mini-tag">Wind Output</span>
                  </div>
                  <p className="text-xl font-bold text-white font-mono">{result.windGenerationGwhYear} GWh/yr</p>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Battery className="w-3.5 h-3.5 text-sky-400" />
                    <span className="mini-tag">BESS Capacity</span>
                  </div>
                  <p className="text-xl font-bold text-sky-300 font-mono">{result.bessArbitrageCapacityMwh} MWh</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs p-3 rounded-sm glass">
                <span className="text-slate-300">Total Clean Annual Generation:</span>
                <span className="font-mono text-lg font-extrabold text-[#7AAA2B]">
                  {result.totalGenerationGwhYear} GWh / Year
                </span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-5 rounded-sm bg-[#06152F] border border-line space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">Request Utility / Industrial Hybrid Study</h4>
                  <p className="text-[11px] text-slate-400">
                    Includes G99 connection feasibility, environmental acoustics, and co-located planning advisory.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAssessment({ projectType: 'Hybrid (Solar + Wind + BESS)', ...hybridInput, ...result })}
                  className="px-5 py-2.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  <span>REQUEST HYBRID PROJECT ASSESSMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] text-slate-400 leading-tight border-t border-line pt-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>
                  *Conceptual assessment — detailed resource, wind LiDAR measurements, and grid interconnection studies required.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
