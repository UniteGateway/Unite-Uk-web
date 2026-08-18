import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ENERGY_SOLUTIONS } from '../data/energyData';
import { EnergySolution } from '../types';
import { ArrowRight, CheckCircle2, X, Zap, ChevronRight, Layers, ShieldCheck, Activity } from 'lucide-react';

interface PlatformSolutionsProps {
  onSelectSolution: (solution: EnergySolution) => void;
  onOpenAssessment: (solutionId: string) => void;
}

export const PlatformSolutions: React.FC<PlatformSolutionsProps> = ({
  onSelectSolution,
  onOpenAssessment,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedSolutionModal, setSelectedSolutionModal] = useState<EnergySolution | null>(null);

  const handleCardClick = (solution: EnergySolution) => {
    setSelectedSolutionModal(solution);
    onSelectSolution(solution);
  };

  return (
    <section id="solutions" className="py-24 bg-[#06152F] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span className="mini-tag">01. Energy Platform</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">6 CORE SOLUTIONS</span>
            </div>
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            ONE PLATFORM. <br />
            <span className="text-[#7AAA2B]">
              MULTIPLE ENERGY SOLUTIONS.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Unite Solar delivers integrated renewable-energy solutions designed to help households, businesses and organisations transition towards cleaner, smarter and more resilient energy.
          </p>

          {/* 4 Pillar Badges: SOLAR | BESS | WIND | HYBRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 max-w-2xl mx-auto">
            <div className="stat-card">
              <span className="mini-tag text-[#FF6321]">Solar PV</span>
              <span className="text-white font-extrabold text-base font-display">Rooftop & C&I</span>
            </div>
            <div className="stat-card">
              <span className="mini-tag text-sky-400">BESS</span>
              <span className="text-white font-extrabold text-base font-display">Storage Systems</span>
            </div>
            <div className="stat-card">
              <span className="mini-tag text-[#7AAA2B]">Wind</span>
              <span className="text-white font-extrabold text-base font-display">Onshore Energy</span>
            </div>
            <div className="stat-card">
              <span className="mini-tag text-purple-400">Hybrid</span>
              <span className="text-white font-extrabold text-base font-display">Solar + Wind + BESS</span>
            </div>
          </div>
        </div>

        {/* 6 Large Interactive Solution Cards Grid with High Density aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {ENERGY_SOLUTIONS.map((solution, idx) => {
            const isOrangeAccent = idx === 3 || idx === 0;
            return (
              <div
                key={solution.id}
                id={`solution-card-${solution.id}`}
                onMouseEnter={() => setHoveredCard(solution.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(solution)}
                className={`group relative rounded-sm glass-dense border-line transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-xl hover:shadow-2xl hover:border-white/30 ${
                  isOrangeAccent ? 'border-l-2 border-l-[#FF6321]' : 'border-l-2 border-l-[#7AAA2B]'
                }`}
              >
                {/* Top Image Preview with clean ratio */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3A] via-[#0A1E3A]/40 to-transparent" />

                  {/* Top floating badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xl font-black font-display text-white/90 drop-shadow-md">
                      {solution.number}
                    </span>
                    <span className="mini-tag px-2.5 py-0.5 rounded-sm bg-[#06152F]/90 backdrop-blur-md text-[#7AAA2B] border border-line">
                      {solution.shortTag}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h3 className="text-lg font-bold text-white tracking-tight font-display uppercase">
                      {solution.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-300 mb-1">
                      {solution.subtitle}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* Quick Key Benefits Preview */}
                  <div className="space-y-1 pt-2 border-t border-line text-[11px]">
                    {solution.keyBenefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer CTA */}
                  <div className="pt-2.5 flex items-center justify-between border-t border-line text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-[#7AAA2B] group-hover:text-white transition-colors flex items-center gap-1">
                      {solution.id === 'rooftop-solar' && 'EXPLORE SOLAR'}
                      {solution.id === 'commercial-industrial' && 'EXPLORE C&I'}
                      {solution.id === 'battery-storage' && 'EXPLORE BESS'}
                      {solution.id === 'wind-energy' && 'EXPLORE WIND'}
                      {solution.id === 'hybrid-energy' && 'EXPLORE HYBRID'}
                      {solution.id === 'corporate-energy' && 'VIEW BUSINESS MODELS'}
                    </span>
                    <div className="w-6 h-6 rounded-sm bg-slate-800 group-hover:bg-[#7AAA2B] text-white group-hover:text-[#06152F] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Bottom Trust Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-medium">
            All systems designed strictly in adherence with British Standards, MCS guidelines, and DNO Engineering Recommendations (G99 / G100).
          </p>
        </div>

      </div>

      {/* Expanded Solution Modal / Detailed Deep-Dive View */}
      <AnimatePresence>
        {selectedSolutionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0A1E3A] border border-slate-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8 text-slate-200"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedSolutionModal(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Hero Banner */}
              <div className="relative h-64 sm:h-72 w-full">
                <img
                  src={selectedSolutionModal.image}
                  alt={selectedSolutionModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3A] via-[#0A1E3A]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#4E8B1E] text-white">
                      Solution {selectedSolutionModal.number}
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      {selectedSolutionModal.shortTag}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                    {selectedSolutionModal.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 font-medium">
                    {selectedSolutionModal.subtitle}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {selectedSolutionModal.description}
                </p>

                {/* Technical Specs Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#7AAA2B]" />
                    <span>Technical Architecture & Performance</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedSolutionModal.specs.map((spec, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <p className="text-[11px] text-slate-400">{spec.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#4E8B1E]" />
                    <span>Key Commercial & Engineering Benefits</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedSolutionModal.keyBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#4E8B1E] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typical Applications */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 mb-2">Ideal Application Sectors:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSolutionModal.applications.map((app, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      const id = selectedSolutionModal.id;
                      setSelectedSolutionModal(null);
                      onOpenAssessment(id);
                    }}
                    className="flex-1 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Request Feasibility for {selectedSolutionModal.title}</span>
                  </button>

                  <button
                    onClick={() => setSelectedSolutionModal(null)}
                    className="py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
