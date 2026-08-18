import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_MODELS } from '../data/energyData';
import { BusinessModel } from '../types';
import { Check, ArrowRight, DollarSign, Sliders, ShieldCheck, Zap, AlertCircle, Building, PieChart, Sparkles } from 'lucide-react';

interface BusinessModelsProps {
  onOpenAssessment: (modelCode: string) => void;
}

const PROJECT_SIZES = [
  { size: '100 kW', label: 'Mid Commercial', annualKwh: '95,000 kWh', roofM2: '650 m²', typicalSite: 'Offices, Medium Supermarket, Small Logistics' },
  { size: '500 kW', label: 'Large Commercial', annualKwh: '480,000 kWh', roofM2: '3,200 m²', typicalSite: 'Distribution Warehouse, Manufacturing Plant' },
  { size: '1 MW', label: 'Industrial Scale', annualKwh: '970,000 kWh', roofM2: '6,500 m²', typicalSite: 'Heavy Industry, Cold Storage Complex, Tech Hub' },
  { size: '5 MW', label: 'Mega Industrial', annualKwh: '4,850,000 kWh', roofM2: '32,000 m²', typicalSite: 'Automotive Cluster, Multi-site Logistics, Port Terminal' },
  { size: '10 MW+', label: 'Utility & Campus', annualKwh: '10,200,000+ kWh', roofM2: '65,000+ m²', typicalSite: 'Major Energy Intensive Site, Private Wire Solar Park' },
];

export const BusinessModels: React.FC<BusinessModelsProps> = ({ onOpenAssessment }) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('ppa');
  const [sizeIndex, setSizeIndex] = useState<number>(2); // 1 MW default

  const currentModel = BUSINESS_MODELS.find((m) => m.id === selectedModelId) || BUSINESS_MODELS[1];
  const currentSize = PROJECT_SIZES[sizeIndex];

  return (
    <section id="models" className="py-24 bg-[#0A1E3A] relative overflow-hidden border-t border-b border-slate-800/80">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#FF6321]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#FF6321] uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="mini-tag">03. Business Models</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">ZERO CAPEX OPTIONS</span>
            </div>
            <span className="h-[1px] w-8 bg-[#FF6321]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            POWER YOUR BUSINESS. <br />
            <span className="text-[#7AAA2B]">
              NOT YOUR CAPITAL COSTS.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Choose the financial architecture that fits your corporate balance sheet. From 100% CAPEX ownership to zero-capital PPA and Energy-as-a-Service models.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest">
            <span className="px-2.5 py-1 rounded-sm bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              ZERO INVESTMENT OPTIONS AVAILABLE
            </span>
            <span className="px-2.5 py-1 rounded-sm bg-sky-950/80 text-sky-400 border border-sky-800/60">
              PAY FOR ENERGY. NOT JUST EQUIPMENT.
            </span>
          </div>
        </div>

        {/* Model Tabs Bar with High Density style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 mb-8 p-1 bg-[#06152F] rounded-sm border border-line">
          {BUSINESS_MODELS.map((model) => {
            const isSelected = selectedModelId === model.id;
            return (
              <button
                key={model.id}
                id={`model-tab-${model.id}`}
                onClick={() => setSelectedModelId(model.id)}
                className={`py-2.5 px-2 rounded-sm text-center transition-all cursor-pointer relative flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-[#0A1E3A] text-white shadow-md border border-white/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {model.badge && (
                  <span className="absolute -top-2 px-1.5 py-0.2 rounded-sm text-[8px] font-bold bg-[#FF6321] text-white shadow-sm uppercase tracking-wider">
                    {model.badge}
                  </span>
                )}
                <span className="text-xs font-bold font-display">{model.code}</span>
                <span className="text-[9px] text-slate-400 truncate max-w-full font-medium uppercase tracking-wider">
                  {model.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Model Deep-Dive Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Detail Column */}
          <div className="lg:col-span-7 bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-4 shadow-xl relative overflow-hidden border-l-2 border-l-[#7AAA2B]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
              <div>
                <span className="mini-tag text-[#FF6321]">
                  Model Code: {currentModel.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5 uppercase">
                  {currentModel.name}
                </h3>
              </div>
              <span className="mini-tag px-2.5 py-1 rounded-sm bg-[#0A1E3A] text-[#7AAA2B] border border-line">
                {currentModel.ownership}
              </span>
            </div>

            <p className="text-sm text-slate-200 font-medium leading-relaxed italic">
              "{currentModel.tagline}"
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentModel.description}
            </p>

            {/* 6 Core Structured Comparison Dimensions (Section 7) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-sm bg-[#0A1E3A]/70 border border-line">
                <span className="mini-tag text-[#7AAA2B] block mb-0.5">01. WHO IT MAY SUIT</span>
                <p className="text-xs text-white font-medium">{currentModel.whoItMaySuit || currentModel.bestFor}</p>
              </div>

              <div className="p-3 rounded-sm bg-[#0A1E3A]/70 border border-line">
                <span className="mini-tag text-[#7AAA2B] block mb-0.5">02. HOW IT WORKS</span>
                <p className="text-xs text-white font-medium">{currentModel.howItWorks || currentModel.description}</p>
              </div>

              <div className="p-3 rounded-sm bg-[#0A1E3A]/70 border border-line">
                <span className="mini-tag text-[#FF6321] block mb-0.5">03. CAPITAL REQUIREMENT</span>
                <p className="text-xs text-white font-medium">{currentModel.capitalRequirement || currentModel.upfrontCost}</p>
              </div>

              <div className="p-3 rounded-sm bg-[#0A1E3A]/70 border border-line">
                <span className="mini-tag text-sky-400 block mb-0.5">04. ASSET OWNERSHIP</span>
                <p className="text-xs text-white font-medium">{currentModel.ownership}</p>
              </div>

              <div className="p-3 rounded-sm bg-[#0A1E3A]/70 border border-line">
                <span className="mini-tag text-slate-400 block mb-0.5">05. CONTRACT STRUCTURE</span>
                <p className="text-xs text-white font-medium">{currentModel.contractStructure || 'Long-Term Contractual Agreement'}</p>
              </div>

              <div className="p-3 rounded-sm bg-[#0A1E3A]/70 border border-line">
                <span className="mini-tag text-slate-400 block mb-0.5">06. TYPICAL PROJECT TYPE</span>
                <p className="text-xs text-white font-medium">{currentModel.typicalProjectType || 'Commercial & Industrial Sites'}</p>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2 pt-1">
              <h4 className="mini-tag text-slate-400">Key Contractual Pillars</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentModel.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5 p-2 rounded-sm bg-[#0A1E3A]/40 border border-line text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 italic">
              *Subject to project assessment and contractual terms.
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                id="model-structure-inquire-btn"
                onClick={() => onOpenAssessment(currentModel.code)}
                className="flex-1 py-3 px-5 rounded-sm mini-tag text-white bg-[#FF6321] hover:bg-orange-600 flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
              >
                <span>STRUCTURE A {currentModel.code} PROPOSAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Project Sizing Simulator */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#7AAA2B]" />
                  <h3 className="mini-tag text-white">
                    Project Sizing Scale
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#7AAA2B] bg-[#0A1E3A] px-2 py-0.5 rounded-sm border border-line">
                  {currentSize.size}
                </span>
              </div>

              {/* Slider Component */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase">
                  <span>100 kW</span>
                  <span>500 kW</span>
                  <span>1 MW</span>
                  <span>5 MW</span>
                  <span>10 MW+</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={1}
                  value={sizeIndex}
                  onChange={(e) => setSizeIndex(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-sm appearance-none cursor-pointer accent-[#7AAA2B]"
                  aria-label="Select Project Scale"
                />
              </div>

              {/* Dynamic Sizing Card */}
              <div className="p-4 rounded-sm glass-dense border-line space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-line">
                  <div>
                    <span className="mini-tag text-[#FF6321]">Profile Scope</span>
                    <h4 className="text-base font-extrabold text-white font-display uppercase">{currentSize.label}</h4>
                  </div>
                  <span className="text-lg font-extrabold text-white font-mono">{currentSize.size}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Est. Generation:</span>
                    <span className="font-mono font-bold text-emerald-400">{currentSize.annualKwh} / yr</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Approx. Roof / Land Area:</span>
                    <span className="font-mono font-bold text-slate-200">{currentSize.roofM2}</span>
                  </div>
                  <div className="pt-2 border-t border-line text-slate-300">
                    <span className="text-slate-400 block text-[10px] mb-0.5 uppercase tracking-wider">Typical Facility Types:</span>
                    <span className="font-medium text-slate-200 text-[11px]">{currentSize.typicalSite}</span>
                  </div>
                </div>
              </div>

              {/* Legal disclaimer required by prompt */}
              <div className="flex items-start gap-2 p-3 rounded-sm bg-[#0A1E3A]/40 border border-line text-[10px] text-slate-400 leading-relaxed">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  *Subject to site eligibility, structural grid assessment, DNO G99 network capacity, and formal contractual execution. No guaranteed returns or savings are implied.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
