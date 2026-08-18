import React, { useState } from 'react';
import {
  Sun,
  Wind,
  Layers,
  Sparkles,
  Building2,
  Zap,
  Filter,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  Compass,
  Maximize2
} from 'lucide-react';
import {
  UK_OPPORTUNITY_REGIONS,
  UK_MAP_MARKERS
} from '../../data/ukOpportunityData';
import {
  UkOpportunityRegionData,
  UkMapMarker,
  TechnologyType
} from '../../types';

interface InteractiveUkMapProps {
  onSelectProject: (marker: UkMapMarker) => void;
  onSubmitProjectFromMap: (regionName: string, tech?: string) => void;
}

export const InteractiveUkMap: React.FC<InteractiveUkMapProps> = ({
  onSelectProject,
  onSubmitProjectFromMap
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | TechnologyType>('ALL');
  const [hoveredRegion, setHoveredRegion] = useState<UkOpportunityRegionData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<UkOpportunityRegionData>(UK_OPPORTUNITY_REGIONS[0]);
  const [activeMarker, setActiveMarker] = useState<UkMapMarker | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<UkMapMarker | null>(null);

  const filterButtons: { label: string; value: 'ALL' | TechnologyType; icon: React.ReactNode }[] = [
    { label: 'ALL OPPORTUNITIES', value: 'ALL', icon: <Layers className="w-3 h-3" /> },
    { label: 'SOLAR', value: 'SOLAR', icon: <Sun className="w-3 h-3 text-[#FF6321]" /> },
    { label: 'WIND', value: 'WIND', icon: <Wind className="w-3 h-3 text-sky-400" /> },
    { label: 'BESS STORAGE', value: 'BESS', icon: <Layers className="w-3 h-3 text-[#7AAA2B]" /> },
    { label: 'HYBRID', value: 'HYBRID', icon: <Sparkles className="w-3 h-3 text-purple-400" /> },
    { label: 'ROOFTOP', value: 'ROOFTOP', icon: <Building2 className="w-3 h-3 text-amber-400" /> },
    { label: 'COMMERCIAL', value: 'COMMERCIAL', icon: <Building2 className="w-3 h-3 text-teal-400" /> },
    { label: 'UTILITY SCALE', value: 'UTILITY', icon: <Zap className="w-3 h-3 text-yellow-400" /> }
  ];

  const filteredMarkers = UK_MAP_MARKERS.filter((m) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'UTILITY') return m.category === 'UTILITY';
    if (activeFilter === 'ROOFTOP') return m.category === 'ROOFTOP' || m.technology === 'ROOFTOP';
    if (activeFilter === 'COMMERCIAL') return m.category === 'COMMERCIAL' || m.technology === 'COMMERCIAL';
    return m.technology === activeFilter;
  });

  const getMarkerIcon = (tech: TechnologyType, category: string) => {
    if (category === 'UTILITY' || tech === 'UTILITY') {
      return <Zap className="w-3 h-3 text-yellow-300" />;
    }
    switch (tech) {
      case 'SOLAR':
        return <Sun className="w-3 h-3 text-[#FF6321]" />;
      case 'WIND':
        return <Wind className="w-3 h-3 text-sky-300" />;
      case 'BESS':
        return <Layers className="w-3 h-3 text-[#7AAA2B]" />;
      case 'HYBRID':
        return <Sparkles className="w-3 h-3 text-purple-300" />;
      case 'ROOFTOP':
      case 'COMMERCIAL':
        return <Building2 className="w-3 h-3 text-teal-300" />;
      default:
        return <Zap className="w-3 h-3 text-[#7AAA2B]" />;
    }
  };

  const displayedRegion = hoveredRegion || selectedRegion;

  return (
    <section id="uk-opportunity-map-section" className="py-16 bg-[#040E20] border-b border-line relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header with high-density hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
              <Compass className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Section 02 // UK Opportunity Vector Atlas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              INTERACTIVE UK RENEWABLE MAP
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Explore regional resource corridors, indicative development clusters, and grid nodes across England, Scotland, Wales, and Northern Ireland.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7AAA2B] animate-pulse" />
              12 Active Opportunity Corridors
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">
              Showing <strong className="text-white">{filteredMarkers.length}</strong> Indicative Projects
            </span>
          </div>
        </div>

        {/* Filter Navigation Bar (Section 4 of Prompt) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
          <span className="mini-tag text-slate-400 flex items-center gap-1 shrink-0 pl-1 pr-2">
            <Filter className="w-3 h-3 text-[#FF6321]" />
            FILTER:
          </span>
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.value;
            return (
              <button
                key={btn.value}
                id={`map-filter-${btn.value.toLowerCase()}`}
                onClick={() => setActiveFilter(btn.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs mini-tag transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md shadow-[#7AAA2B]/20'
                    : 'bg-[#06152F] text-slate-300 hover:text-white hover:bg-slate-800 border border-line'
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Map & Details Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Map Column (7 Cols on desktop) */}
          <div className="lg:col-span-7 bg-[#06152F] border border-line rounded-sm p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400 border-b border-line pb-2">
              <span className="font-mono text-[11px] text-[#7AAA2B] uppercase">
                // Vector GIS Topology: UK Clean Energy Grid
              </span>
              <span className="text-[10px] text-slate-400 italic">
                Hover or tap regions & markers
              </span>
            </div>

            {/* High-Resolution Vector SVG UK Map Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] max-h-[580px] bg-[#020A17] rounded-sm border border-line/60 overflow-hidden flex items-center justify-center p-2">
              
              {/* Subtle Grid Pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#7AAA2B 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* SVG Coordinate Canvas */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(78,139,30,0.15)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Definitions for Gradients & Glow */}
                <defs>
                  <linearGradient id="ukLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0B2347" />
                    <stop offset="50%" stopColor="#091A36" />
                    <stop offset="100%" stopColor="#06152F" />
                  </linearGradient>

                  <linearGradient id="scotlandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0D2E5C" />
                    <stop offset="100%" stopColor="#0A2244" />
                  </linearGradient>

                  <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Country Outline Shapes (Stylised UK Regions) */}
                
                {/* 1. Scotland Highlands & Islands */}
                <path
                  d="M 38 6 L 50 6 L 62 12 L 67 22 L 58 30 L 46 32 L 36 26 L 35 15 Z"
                  fill="url(#scotlandGrad)"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'scotland-highlands'
                      ? 'fill-[#12427E] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#12427E]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'scotland-highlands') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'scotland-highlands') || selectedRegion)}
                />

                {/* 2. Scotland Central Belt & Southern Uplands */}
                <path
                  d="M 36 26 L 46 32 L 58 30 L 63 36 L 57 42 L 44 42 L 38 36 Z"
                  fill="#0A2346"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'scotland-central'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'scotland-central') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'scotland-central') || selectedRegion)}
                />

                {/* 3. Northern Ireland */}
                <path
                  d="M 12 38 L 26 36 L 28 48 L 16 50 L 11 44 Z"
                  fill="#091F3D"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'northern-ireland'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'northern-ireland') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'northern-ireland') || selectedRegion)}
                />

                {/* 4. North East England */}
                <path
                  d="M 57 42 L 67 42 L 65 52 L 56 50 Z"
                  fill="#0B254A"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'north-east'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'north-east') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'north-east') || selectedRegion)}
                />

                {/* 5. North West England */}
                <path
                  d="M 44 42 L 56 42 L 56 50 L 48 58 L 40 54 L 43 46 Z"
                  fill="#0A2244"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'north-west'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'north-west') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'north-west') || selectedRegion)}
                />

                {/* 6. Yorkshire & The Humber */}
                <path
                  d="M 56 50 L 65 52 L 72 58 L 65 62 L 54 60 Z"
                  fill="#0B264D"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'yorkshire-humber'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'yorkshire-humber') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'yorkshire-humber') || selectedRegion)}
                />

                {/* 7. Wales */}
                <path
                  d="M 28 62 L 42 62 L 40 74 L 30 76 L 24 70 Z"
                  fill="#091F3E"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'wales'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'wales') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'wales') || selectedRegion)}
                />

                {/* 8. West Midlands */}
                <path
                  d="M 42 62 L 54 60 L 55 69 L 45 71 Z"
                  fill="#0B274F"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'west-midlands'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'west-midlands') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'west-midlands') || selectedRegion)}
                />

                {/* 9. East Midlands */}
                <path
                  d="M 54 60 L 65 62 L 66 70 L 55 69 Z"
                  fill="#0A2448"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'east-midlands'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'east-midlands') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'east-midlands') || selectedRegion)}
                />

                {/* 10. East of England */}
                <path
                  d="M 65 62 L 82 62 L 80 74 L 66 74 L 66 70 Z"
                  fill="#0C2954"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'east-of-england'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'east-of-england') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'east-of-england') || selectedRegion)}
                />

                {/* 11. South East & London */}
                <path
                  d="M 52 71 L 66 70 L 80 74 L 76 83 L 52 82 Z"
                  fill="#0C2B59"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'south-east-london'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'south-east-london') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'south-east-london') || selectedRegion)}
                />

                {/* 12. South West England */}
                <path
                  d="M 22 88 L 36 78 L 52 76 L 52 82 L 40 88 L 22 92 Z"
                  fill="#0E3063"
                  stroke="#1E3A63"
                  strokeWidth="0.8"
                  className={`transition-all duration-300 cursor-pointer ${
                    displayedRegion.id === 'south-west'
                      ? 'fill-[#13437D] stroke-[#7AAA2B] stroke-[1.5]'
                      : 'hover:fill-[#13437D]'
                  }`}
                  onMouseEnter={() => setHoveredRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'south-west') || null)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(UK_OPPORTUNITY_REGIONS.find((r) => r.id === 'south-west') || selectedRegion)}
                />

                {/* National Boundary Labels */}
                <text x="49" y="19" fill="#94A3B8" fontSize="2.8" fontWeight="bold" textAnchor="middle" letterSpacing="0.1" opacity="0.6">
                  SCOTLAND
                </text>
                <text x="20" y="44" fill="#94A3B8" fontSize="2.2" fontWeight="bold" textAnchor="middle" letterSpacing="0.1" opacity="0.6">
                  N. IRELAND
                </text>
                <text x="32" y="69" fill="#94A3B8" fontSize="2.4" fontWeight="bold" textAnchor="middle" letterSpacing="0.1" opacity="0.6">
                  WALES
                </text>
                <text x="61" y="66" fill="#94A3B8" fontSize="3" fontWeight="bold" textAnchor="middle" letterSpacing="0.1" opacity="0.6">
                  ENGLAND
                </text>

                {/* Render Interactive Project & Opportunity Markers */}
                {filteredMarkers.map((marker) => {
                  const isSelected = activeMarker?.id === marker.id;
                  const isHovered = hoveredMarker?.id === marker.id;

                  return (
                    <g
                      key={marker.id}
                      transform={`translate(${marker.coordinates.x}, ${marker.coordinates.y})`}
                      className="cursor-pointer transition-transform duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMarker(marker);
                        onSelectProject(marker);
                      }}
                      onMouseEnter={() => setHoveredMarker(marker)}
                      onMouseLeave={() => setHoveredMarker(null)}
                    >
                      {/* Pulse circle for highlight */}
                      <circle
                        r={isSelected || isHovered ? 4.5 : 3}
                        fill={
                          marker.technology === 'SOLAR'
                            ? 'rgba(255,99,33,0.3)'
                            : marker.technology === 'WIND'
                            ? 'rgba(56,189,248,0.3)'
                            : marker.technology === 'BESS'
                            ? 'rgba(122,170,43,0.3)'
                            : 'rgba(168,85,247,0.3)'
                        }
                        className="animate-ping"
                      />

                      {/* Solid marker badge */}
                      <circle
                        r={isSelected || isHovered ? 3.2 : 2.4}
                        fill="#06152F"
                        stroke={
                          marker.technology === 'SOLAR'
                            ? '#FF6321'
                            : marker.technology === 'WIND'
                            ? '#38BDF8'
                            : marker.technology === 'BESS'
                            ? '#7AAA2B'
                            : '#A855F7'
                        }
                        strokeWidth="0.8"
                      />

                      {/* Center symbol dot */}
                      <circle
                        r={1}
                        fill={
                          marker.technology === 'SOLAR'
                            ? '#FF6321'
                            : marker.technology === 'WIND'
                            ? '#38BDF8'
                            : marker.technology === 'BESS'
                            ? '#7AAA2B'
                            : '#A855F7'
                        }
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating Quick Marker Tooltip */}
              {hoveredMarker && (
                <div
                  className="absolute pointer-events-none z-30 p-2.5 rounded-sm bg-[#06152F]/95 border border-line text-white shadow-xl backdrop-blur-md max-w-xs transition-all"
                  style={{
                    left: `${Math.min(hoveredMarker.coordinates.x, 70)}%`,
                    top: `${Math.max(hoveredMarker.coordinates.y - 15, 10)}%`
                  }}
                >
                  <div className="flex items-center gap-1.5 pb-1 border-b border-line">
                    {getMarkerIcon(hoveredMarker.technology, hoveredMarker.category)}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7AAA2B]">
                      {hoveredMarker.indicativeCapacity} // {hoveredMarker.technology}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-white mt-1">{hoveredMarker.name}</p>
                  <p className="text-[9px] text-slate-300 font-mono mt-0.5">{hoveredMarker.region} • {hoveredMarker.gridDno}</p>
                </div>
              )}

            </div>

            {/* Map Legend Bar */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-line text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>SOLAR ENERGY</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-sky-400" />
                <span>WIND POWER</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#7AAA2B]" />
                <span>BESS STORAGE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>HYBRID HUBS</span>
              </div>
            </div>

          </div>

          {/* Region Opportunity Details Column (5 Cols on desktop) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#06152F] border border-line rounded-sm p-5 sm:p-6 space-y-4 shadow-xl border-l-2 border-l-[#7AAA2B]">
              
              {/* Region Title & Badge */}
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <span className="mini-tag text-[#FF6321]">
                    {displayedRegion.country} Corridor
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase mt-0.5">
                    {displayedRegion.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Indicative Pipeline</span>
                  <span className="text-base font-bold font-mono text-[#7AAA2B]">~{displayedRegion.indicativePipelineMw} MW</span>
                </div>
              </div>

              {/* Region Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {displayedRegion.summary}
              </p>

              {/* Resource Ratings */}
              <div className="grid grid-cols-3 gap-2">
                <div className="stat-card p-2 rounded-sm bg-[#0A1E3A]/70 border-line">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Solar Index</span>
                  <span className="text-xs font-bold text-amber-400 mt-0.5 block">{displayedRegion.solarResourceRating}</span>
                </div>
                <div className="stat-card p-2 rounded-sm bg-[#0A1E3A]/70 border-line">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Wind Index</span>
                  <span className="text-xs font-bold text-sky-400 mt-0.5 block">{displayedRegion.windResourceRating}</span>
                </div>
                <div className="stat-card-orange p-2 rounded-sm bg-[#0A1E3A]/70 border-line">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">BESS Priority</span>
                  <span className="text-xs font-bold text-[#7AAA2B] mt-0.5 block">{displayedRegion.bessOpportunityRating}</span>
                </div>
              </div>

              {/* Renewable Opportunity Categories */}
              <div className="space-y-1.5 pt-1">
                <h4 className="mini-tag text-slate-400">Renewable Opportunity Categories</h4>
                <div className="flex flex-wrap gap-1.5">
                  {displayedRegion.opportunities.map((opp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-sm bg-[#0A1E3A] border border-line text-[11px] text-slate-200 font-medium"
                    >
                      {opp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Potential Project Types */}
              <div className="space-y-1.5 pt-1">
                <h4 className="mini-tag text-slate-400">Potential Project Typologies</h4>
                <div className="space-y-1">
                  {displayedRegion.potentialProjectTypes.map((type, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 p-1.5 rounded-sm bg-[#0A1E3A]/40 border border-line text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0 mt-0.5" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DNO / Grid Network Info */}
              <div className="p-2.5 rounded-sm bg-[#020A17] border border-line text-xs space-y-1">
                <span className="text-[10px] font-mono text-[#7AAA2B] uppercase block">
                  Regional Distribution Network Operator (DNO):
                </span>
                <p className="text-[11px] text-slate-200 font-medium">
                  {displayedRegion.keyDnoZones.join(' • ')}
                </p>
              </div>

              {/* Prompt Required Mandatory Legal Disclaimers (Section 3 of Prompt) */}
              <div className="p-3 rounded-sm bg-[#0A1E3A]/60 border border-line space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="uppercase text-[10px] tracking-wider">Indicative renewable-energy opportunity.</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Detailed feasibility, planning, resource and grid assessments are required for every project. No guaranteed grid connection or planning approval is implied.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  id={`submit-opportunity-${displayedRegion.id}`}
                  onClick={() => onSubmitProjectFromMap(displayedRegion.name)}
                  className="flex-1 py-2.5 px-4 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                >
                  <span>SUBMIT PROJECT IN {displayedRegion.name.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
