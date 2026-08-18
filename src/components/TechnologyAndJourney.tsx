import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OEM_ECOSYSTEM, PROJECT_JOURNEY } from '../data/energyData';
import { Cpu, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, Zap, Info, Clock, Compass } from 'lucide-react';

interface TechnologyAndJourneyProps {
  onOpenAssessment: () => void;
}

export const TechnologyAndJourney: React.FC<TechnologyAndJourneyProps> = ({ onOpenAssessment }) => {
  const [activeOemCategory, setActiveOemCategory] = useState<number>(0);
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(0);

  const currentCategory = OEM_ECOSYSTEM[activeOemCategory];

  return (
    <section id="technology" className="py-24 bg-[#0A1E3A] relative overflow-hidden border-t border-slate-800">
      {/* Visual background elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span className="mini-tag">04. Bankability & Standards</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">TIER-1 ARCHITECTURE</span>
            </div>
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            TIER-1 TECHNOLOGY ECOSYSTEM & <br />
            <span className="text-[#7AAA2B]">
              END-TO-END PROJECT JOURNEY.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            We integrate bankable Tier-1 hardware with our disciplined 7-step turnkey engineering delivery framework across the UK.
          </p>
        </div>

        {/* Split Grid: Left = OEM Ecosystem, Right = 7-Step Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT: Technology & OEM Ecosystem */}
          <div className="lg:col-span-6 bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-4 shadow-xl border-l-2 border-l-[#7AAA2B]">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <span className="mini-tag text-[#FF6321]">
                  Hardware Architecture
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white font-display mt-0.5 uppercase">
                  Technology & Supplier Network
                </h3>
              </div>
              <span className="mini-tag px-2 py-0.5 rounded-sm bg-[#0A1E3A] text-slate-300 border border-line">
                BloombergNEF Tier 1
              </span>
            </div>

            {/* Category Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {OEM_ECOSYSTEM.map((cat, i) => {
                const isActive = activeOemCategory === i;
                return (
                  <button
                    key={cat.category}
                    id={`oem-tab-${i}`}
                    onClick={() => setActiveOemCategory(i)}
                    className={`py-1.5 px-2 text-center rounded-sm mini-tag transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md'
                        : 'bg-[#0A1E3A] text-slate-400 hover:text-white border border-line'
                    }`}
                  >
                    {cat.category}
                  </button>
                );
              })}
            </div>

            {/* Category Description */}
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0A1E3A]/60 p-3 rounded-sm border border-line">
              {currentCategory.description}
            </p>

            {/* Brands Showcase List */}
            <div className="space-y-2">
              <span className="mini-tag text-slate-400">
                Integrated Equipment Manufacturers:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {currentCategory.brands.map((brand, i) => (
                  <div
                    key={brand.name}
                    className="p-3 rounded-sm stat-card bg-[#0A1E3A]/50 border-line hover:border-white/20 transition-colors flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white uppercase">{brand.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#06152F] text-slate-400 font-mono">
                          {brand.origin}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{brand.specialty}</p>
                    </div>
                    <span className="mini-tag px-2 py-0.5 rounded-sm bg-[#7AAA2B]/15 text-[#7AAA2B] border border-[#7AAA2B]/30 whitespace-nowrap">
                      {brand.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Compliance Note from prompt */}
            <div className="flex items-start gap-2 p-2.5 rounded-sm bg-[#0A1E3A]/40 border border-line text-[10px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>
                Technology / OEM Ecosystem represents our equipment supplier network and engineered integration standards across UK client installations.
              </span>
            </div>
          </div>

          {/* RIGHT: Our Project Journey (7-Step Timeline) */}
          <div id="journey" className="lg:col-span-6 bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-4 shadow-xl border-l-2 border-l-[#FF6321]">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <span className="mini-tag text-[#7AAA2B]">
                  Turnkey EPC Delivery
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white font-display mt-0.5 uppercase">
                  Our Project Journey
                </h3>
              </div>
              <span className="mini-tag text-[#FF6321] font-bold">
                7 Structured Phases
              </span>
            </div>

            {/* 7-Step Horizontal / Vertical Interactive Progress Bar */}
            <div className="flex items-center justify-between gap-1 p-1 bg-[#0A1E3A] rounded-sm border border-line overflow-x-auto">
              {PROJECT_JOURNEY.map((step, idx) => {
                const isActive = activeJourneyStep === idx;
                const isPassed = activeJourneyStep > idx;
                return (
                  <button
                    key={step.step}
                    id={`journey-step-btn-${idx}`}
                    onClick={() => setActiveJourneyStep(idx)}
                    className={`flex-1 min-w-[36px] py-1.5 text-center rounded-sm mini-tag transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                      isActive
                        ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md'
                        : isPassed
                        ? 'bg-slate-800 text-slate-300'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-[9px]">{step.step}</span>
                    <span className="text-[8px] uppercase tracking-wider truncate max-w-[44px]">
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detailed Showcase */}
            <AnimatePresence mode="wait">
              {(() => {
                const step = PROJECT_JOURNEY[activeJourneyStep];
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 rounded-sm glass-dense border-line space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-line pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black font-display text-[#7AAA2B]">
                            PHASE {step.step}
                          </span>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            {step.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{step.subtitle}</p>
                      </div>
                      <span className="mini-tag px-2 py-0.5 rounded-sm bg-[#06152F] text-slate-300 border border-line flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF6321]" />
                        <span>{step.duration}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Key Deliverables */}
                    <div className="space-y-1 pt-1">
                      <span className="mini-tag text-slate-400">
                        Phase Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {step.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300 p-1.5 rounded-sm bg-[#06152F]/60 border border-line">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0" />
                            <span className="truncate">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next / Previous Controls */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => setActiveJourneyStep((prev) => Math.max(0, prev - 1))}
                        disabled={activeJourneyStep === 0}
                        className="mini-tag text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                      >
                        ← Previous Phase
                      </button>

                      {activeJourneyStep < PROJECT_JOURNEY.length - 1 ? (
                        <button
                          onClick={() => setActiveJourneyStep((prev) => Math.min(PROJECT_JOURNEY.length - 1, prev + 1))}
                          className="px-3 py-1.5 rounded-sm mini-tag text-white bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>Next: {PROJECT_JOURNEY[activeJourneyStep + 1].title}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={onOpenAssessment}
                          className="px-3 py-1.5 rounded-sm mini-tag text-white bg-[#FF6321] hover:bg-orange-600 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>Start Phase 01 Assessment</span>
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
