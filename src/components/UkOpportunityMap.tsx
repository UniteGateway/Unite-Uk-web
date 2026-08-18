import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UK_REGIONS } from '../data/energyData';
import { UkRegionOpportunity } from '../types';
import { MapPin, Sun, Wind, Battery, ArrowRight, Zap, Info, Layers, CheckCircle2, Shield } from 'lucide-react';

interface UkOpportunityMapProps {
  onExploreProject: (regionName?: string) => void;
}

export const UkOpportunityMap: React.FC<UkOpportunityMapProps> = ({ onExploreProject }) => {
  const [selectedRegion, setSelectedRegion] = useState<UkRegionOpportunity>(UK_REGIONS[0]); // South West default
  const [filterMode, setFilterMode] = useState<'ALL' | 'SOLAR' | 'WIND' | 'BESS'>('ALL');

  return (
    <section id="uk-opportunity" className="py-24 bg-[#06152F] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span className="mini-tag">02. National Footprint</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">INDICATIVE MAPPING</span>
            </div>
            <span className="h-[1px] w-8 bg-[#7AAA2B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            THE UK ENERGY TRANSITION <br />
            <span className="text-[#7AAA2B]">
              IS UNDERWAY.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto opacity-85">
            Accelerating the shift towards distributed clean power across England, Scotland, and Wales. Explore regional yield hotspots, commercial rooftop pipelines, and strategic battery storage nodes.
          </p>

          {/* 3 Core Opportunity Pillars (Section 14) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 max-w-3xl mx-auto text-left">
            <div className="p-3 rounded-sm glass-dense border-line border-l-2 border-l-[#FF6321]">
              <span className="mini-tag text-[#FF6321] block">01. ROOFTOP SOLAR</span>
              <p className="text-xs text-slate-300 mt-1 font-medium">Commercial and residential rooftop opportunities across the UK.</p>
            </div>
            <div className="p-3 rounded-sm glass-dense border-line border-l-2 border-l-sky-400">
              <span className="mini-tag text-sky-400 block">02. ENERGY STORAGE</span>
              <p className="text-xs text-slate-300 mt-1 font-medium">Growing need for flexible energy storage, peak shaving and grid arbitrage.</p>
            </div>
            <div className="p-3 rounded-sm glass-dense border-line border-l-2 border-l-[#7AAA2B]">
              <span className="mini-tag text-[#7AAA2B] block">03. RENEWABLE PROJECTS</span>
              <p className="text-xs text-slate-300 mt-1 font-medium">Utility solar, onshore wind and hybrid multi-source generation.</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              { id: 'ALL', label: 'All Vectors' },
              { id: 'SOLAR', label: 'Solar Hotspots', icon: Sun },
              { id: 'WIND', label: 'Wind Corridors', icon: Wind },
              { id: 'BESS', label: 'BESS & Grid Nodes', icon: Battery },
            ].map((tab) => {
              const isActive = filterMode === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterMode(tab.id as any)}
                  className={`px-3 py-1.5 rounded-sm mini-tag flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md'
                      : 'bg-[#0A1E3A] text-slate-300 hover:text-white border border-line'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Map & Telemetry Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Interactive Vector Map of Great Britain */}
          <div className="lg:col-span-6 bg-[#06152F] border border-line rounded-sm p-5 relative flex flex-col items-center justify-center min-h-[500px] shadow-2xl overflow-hidden">
            
            <div className="absolute top-3 left-3 z-10">
              <span className="mini-tag text-slate-300 bg-[#0A1E3A] px-2 py-0.5 rounded-sm border border-line">
                Interactive Regional Grid
              </span>
            </div>

            <div className="absolute top-3 right-3 z-10 mini-tag text-slate-400">
              Select Region Marker
            </div>

            {/* Stylized Vector Map representation */}
            <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
              
              {/* Stylized UK Outline SVG */}
              <svg
                viewBox="0 0 400 560"
                className="w-full h-full drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* UK Mainland Simplified stylized poly-geometry */}
                <defs>
                  <linearGradient id="ukGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
                  </linearGradient>
                  <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.25" />
                  </pattern>
                </defs>

                {/* Ambient Grid overlay */}
                <rect width="400" height="560" fill="url(#gridPattern)" />

                {/* Scotland stylized shape */}
                <path
                  d="M170,40 L210,35 L225,65 L215,100 L240,115 L225,160 L180,175 L150,150 L140,110 L160,85 Z"
                  fill="url(#ukGradient)"
                  stroke="#334155"
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-slate-800"
                />

                {/* Northern England & Yorkshire */}
                <path
                  d="M180,175 L225,160 L245,210 L250,260 L200,275 L165,240 L165,190 Z"
                  fill="url(#ukGradient)"
                  stroke="#334155"
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-slate-800"
                />

                {/* Wales shape */}
                <path
                  d="M145,290 L180,285 L185,345 L135,355 L115,310 Z"
                  fill="url(#ukGradient)"
                  stroke="#334155"
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-slate-800"
                />

                {/* Midlands & East Anglia */}
                <path
                  d="M185,275 L250,260 L310,285 L320,340 L260,370 L195,360 Z"
                  fill="url(#ukGradient)"
                  stroke="#334155"
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-slate-800"
                />

                {/* South & South West England */}
                <path
                  d="M120,400 L195,360 L260,370 L300,410 L280,440 L200,445 L110,455 L80,440 Z"
                  fill="url(#ukGradient)"
                  stroke="#334155"
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-slate-800"
                />

                {/* Transmission backbone links */}
                <path
                  d="M190,110 L200,200 L210,310 L220,390"
                  stroke="#4E8B1E"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="opacity-40 animate-pulse"
                />
              </svg>

              {/* Animated Interactive Hotspot Markers */}
              {UK_REGIONS.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                // Determine marker visibility based on filter
                let isRelevant = true;
                if (filterMode === 'SOLAR' && region.solarPotential === 'Moderate') isRelevant = false;
                if (filterMode === 'WIND' && region.windPotential === 'Moderate') isRelevant = false;
                if (filterMode === 'BESS' && region.bessOpportunity === 'Strategic Storage') isRelevant = true;

                return (
                  <button
                    key={region.id}
                    id={`map-marker-${region.id}`}
                    onClick={() => setSelectedRegion(region)}
                    style={{
                      left: `${region.coordinates.x}%`,
                      top: `${region.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-transform ${
                      isRelevant ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
                    }`}
                  >
                    {/* Animated Pulsing Ring */}
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-7 h-7 rounded-full animate-ping ${
                          isSelected ? 'bg-[#F37021]/60' : 'bg-[#7AAA2B]/40'
                        }`}
                      />
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shadow-lg transition-all ${
                          isSelected
                            ? 'bg-[#F37021] border-white scale-125'
                            : 'bg-[#4E8B1E] border-slate-900 group-hover:scale-110 group-hover:bg-[#7AAA2B]'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Floating Label */}
                    <span
                      className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md transition-all ${
                        isSelected
                          ? 'bg-[#F37021] text-white'
                          : 'bg-slate-900/90 text-slate-300 group-hover:text-white border border-slate-700'
                      }`}
                    >
                      {region.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Note */}
            <div className="w-full pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>Indicative renewable-energy opportunity areas.</span>
              </span>
              <span className="text-slate-400 font-mono">UK Grid Ready</span>
            </div>

          </div>

          {/* Right: Selected Region Telemetry Dossier */}
          <div className="lg:col-span-6 space-y-4">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRegion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-4 shadow-2xl border-l-2 border-l-[#7AAA2B]"
              >
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                  <div>
                    <span className="mini-tag text-[#FF6321]">
                      Region Dossier
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase">
                      {selectedRegion.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="mini-tag text-slate-400 block">Identified Pipeline</span>
                    <span className="text-lg font-extrabold text-[#7AAA2B] font-mono">
                      {selectedRegion.installedPipelineMw} MW+
                    </span>
                  </div>
                </div>

                {/* Highlight narrative */}
                <p className="text-xs text-slate-200 font-medium leading-relaxed bg-[#0A1E3A]/70 p-3 rounded-sm border border-line">
                  {selectedRegion.highlight}
                </p>

                {/* Vector Ratings Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="stat-card-orange p-2.5 rounded-sm bg-[#0A1E3A]/50 border-line">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                      <Sun className="w-3.5 h-3.5 text-[#FF6321]" />
                      <span className="mini-tag">Solar Yield</span>
                    </div>
                    <span className="text-xs font-bold text-white font-mono">
                      {selectedRegion.solarPotential}
                    </span>
                  </div>

                  <div className="stat-card p-2.5 rounded-sm bg-[#0A1E3A]/50 border-line">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                      <Wind className="w-3.5 h-3.5 text-[#7AAA2B]" />
                      <span className="mini-tag">Wind Resource</span>
                    </div>
                    <span className="text-xs font-bold text-white font-mono">
                      {selectedRegion.windPotential}
                    </span>
                  </div>

                  <div className="stat-card p-2.5 rounded-sm bg-[#0A1E3A]/50 border-line">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                      <Battery className="w-3.5 h-3.5 text-sky-400" />
                      <span className="mini-tag">BESS Role</span>
                    </div>
                    <span className="text-[11px] font-bold text-sky-300 font-mono line-clamp-1">
                      {selectedRegion.bessOpportunity}
                    </span>
                  </div>
                </div>

                {/* Detailed Information Rows */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-sm bg-[#0A1E3A]/40 border border-line">
                    <span className="mini-tag text-slate-400 block mb-0.5">Typical Project Type:</span>
                    <span className="text-slate-200 font-medium text-[11px]">{selectedRegion.typicalProject}</span>
                  </div>

                  <div className="p-2.5 rounded-sm bg-[#0A1E3A]/40 border border-line">
                    <span className="mini-tag text-slate-400 block mb-0.5">Potential Customer Segments:</span>
                    <span className="text-slate-200 font-medium text-[11px]">{selectedRegion.customerSegment}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="mini-tag text-slate-400">Relevant Tech:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedRegion.relevantTech.map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-sm bg-[#0A1E3A] text-slate-300 border border-line font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-1">
                  <button
                    id="uk-map-explore-cta"
                    onClick={() => onExploreProject(selectedRegion.name)}
                    className="w-full py-3 px-5 rounded-sm mini-tag text-white bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-colors"
                  >
                    <span>EXPLORE UK PROJECT OPPORTUNITIES IN {selectedRegion.name.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
