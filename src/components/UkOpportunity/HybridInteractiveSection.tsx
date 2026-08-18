import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Wind,
  Layers,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Activity,
  Sliders
} from 'lucide-react';

interface HybridInteractiveSectionProps {
  onRequestHybridDiscussion: () => void;
}

export const HybridInteractiveSection: React.FC<HybridInteractiveSectionProps> = ({
  onRequestHybridDiscussion
}) => {
  const [solarMw, setSolarMw] = useState<number>(40);
  const [windMw, setWindMw] = useState<number>(25);
  const [bessMwh, setBessMwh] = useState<number>(50);

  // Dynamic calculations
  const estimatedSolarGwh = +(solarMw * 1.05).toFixed(1);
  const estimatedWindGwh = +(windMw * 3.1).toFixed(1);
  const totalGenerationGwh = +(estimatedSolarGwh + estimatedWindGwh).toFixed(1);
  const combinedCapacityFactor = +(
    ((totalGenerationGwh * 1000) / ((solarMw + windMw) * 8760)) *
    100
  ).toFixed(1);

  const advantages = [
    {
      title: 'More Flexible Generation',
      desc: 'Wind generates heavily in winter and night; solar peaks in summer and daylight. Combining both provides smooth, predictable power.'
    },
    {
      title: 'Better Renewable Utilisation',
      desc: 'Shared substation infrastructure enables continuous export without idling expensive high-voltage transformers.'
    },
    {
      title: 'Energy Storage Integration',
      desc: 'Battery storage absorbs excess peak output when grid export is constrained and dispatches during premium evening market hours.'
    },
    {
      title: 'Infrastructure Optimisation',
      desc: 'Single G99 grid application, shared civil access roads, joint switchgear, and streamlined planning drastically lower balance-of-plant costs.'
    }
  ];

  return (
    <section className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-purple-400 text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 16 // Multi-Technology Energy Parks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            SOLAR + WIND + BESS HYBRID PROJECTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Synthesizing complimentary solar irradiance, high-capacity wind regimes, and fast-acting battery storage behind a unified point of connection.
          </p>
        </div>

        {/* Interactive Hybrid Simulator Panel */}
        <div className="bg-[#0A1E3A] border border-line rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Column */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono text-[#7AAA2B] uppercase block">
                // Adjust Hybrid Capacity Mix:
              </span>

              {/* Solar Slider */}
              <div className="space-y-1.5 p-3 rounded-sm bg-[#06152F] border border-line">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-amber-400 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" /> Solar Capacity
                  </span>
                  <strong className="text-white font-mono">{solarMw} MWp</strong>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={solarMw}
                  onChange={(e) => setSolarMw(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Wind Slider */}
              <div className="space-y-1.5 p-3 rounded-sm bg-[#06152F] border border-line">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-sky-400 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" /> Wind Capacity
                  </span>
                  <strong className="text-white font-mono">{windMw} MW</strong>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={windMw}
                  onChange={(e) => setWindMw(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              {/* BESS Slider */}
              <div className="space-y-1.5 p-3 rounded-sm bg-[#06152F] border border-line">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-[#7AAA2B] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> BESS Storage
                  </span>
                  <strong className="text-white font-mono">{bessMwh} MWh</strong>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={10}
                  value={bessMwh}
                  onChange={(e) => setBessMwh(Number(e.target.value))}
                  className="w-full accent-[#7AAA2B] cursor-pointer"
                />
              </div>

            </div>

            {/* Simulated Output Metrics Column */}
            <div className="lg:col-span-6 space-y-4 bg-[#06152F] p-5 rounded-sm border border-line">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Simulated Hybrid Yield & Infrastructure Metrics:
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Generation</span>
                  <span className="text-xl font-bold font-mono text-white">{totalGenerationGwh} GWh/yr</span>
                </div>

                <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Capacity Factor</span>
                  <span className="text-xl font-bold font-mono text-purple-400">{combinedCapacityFactor}%</span>
                </div>

                <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Solar Generation</span>
                  <span className="text-base font-bold font-mono text-amber-400">{estimatedSolarGwh} GWh</span>
                </div>

                <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Wind Generation</span>
                  <span className="text-base font-bold font-mono text-sky-400">{estimatedWindGwh} GWh</span>
                </div>
              </div>

              <div className="p-2.5 rounded-sm bg-[#040E20] border border-line text-[11px] text-slate-300 flex items-center justify-between">
                <span>Substation Architecture:</span>
                <strong className="text-[#7AAA2B] font-mono">Shared 33kV/132kV G99 Node</strong>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Core Strategic Advantages (Section 16 of Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((adv, idx) => (
            <div key={idx} className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-2">
              <span className="mini-tag text-purple-400">ADVANTAGE 0{idx + 1}</span>
              <h3 className="text-xs font-extrabold text-white uppercase font-display">
                {adv.title}
              </h3>
              <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Required Disclaimer */}
        <div className="text-center text-xs text-slate-400 italic">
          *Project-specific modelling required. Exact yields, connection constraints, and economic viability depend on site geography, DNO terms, and commercial offtake.
        </div>

      </div>
    </section>
  );
};
