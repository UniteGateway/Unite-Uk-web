import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Globe2,
  Sun,
  Wind
} from 'lucide-react';
import { UK_FRANCHISE_TERRITORIES } from '../../data/franchiseData';
import { FranchiseTerritory, UkMajorCountry } from '../../types';

interface TerritorySelectorProps {
  onRequestTerritory: (territory: FranchiseTerritory) => void;
}

export const TerritorySelector: React.FC<TerritorySelectorProps> = ({ onRequestTerritory }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTerritory, setSelectedTerritory] = useState<FranchiseTerritory>(
    UK_FRANCHISE_TERRITORIES[0]
  );

  const filteredTerritories = UK_FRANCHISE_TERRITORIES.filter((t) => {
    if (selectedCountry !== 'ALL' && t.country !== selectedCountry) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        t.city.toLowerCase().includes(q) ||
        t.county.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.territory_id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getStatusBadge = (status: FranchiseTerritory['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="px-2 py-0.5 rounded-sm bg-[#7AAA2B]/20 border border-[#7AAA2B]/50 text-[#7AAA2B] text-[10px] font-mono font-bold uppercase">
            ● AVAILABLE FOR ALLOCATION
          </span>
        );
      case 'ENQUIRY':
        return (
          <span className="px-2 py-0.5 rounded-sm bg-sky-400/20 border border-sky-400/50 text-sky-300 text-[10px] font-mono font-bold uppercase">
            ● DISCOVERY / ENQUIRY OPEN
          </span>
        );
      case 'RESERVED':
        return (
          <span className="px-2 py-0.5 rounded-sm bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-mono font-bold uppercase">
            ● UNDER RESERVATION
          </span>
        );
      case 'ACTIVE':
        return (
          <span className="px-2 py-0.5 rounded-sm bg-purple-400/20 border border-purple-400/50 text-purple-300 text-[10px] font-mono font-bold uppercase">
            ● ACTIVE PARTNER OPERATING
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-sm bg-slate-700/60 border border-slate-600 text-slate-300 text-[10px] font-mono font-bold uppercase">
            ● AVAILABILITY TO BE CONFIRMED
          </span>
        );
    }
  };

  return (
    <section id="select-territory" className="py-16 bg-[#06152F] border-b border-line relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 05 // Interactive Territory Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
            SELECT YOUR TERRITORY.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Search verified UK territory clusters across England, Scotland, Wales, and Northern Ireland. Inspect regional market potential and request allocation.
          </p>
        </div>

        {/* Filter & Country Bar */}
        <div className="bg-[#0A1E3A] border border-line p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          
          {/* Country Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'England', 'Scotland', 'Wales', 'Northern Ireland'].map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1.5 rounded-sm mini-tag text-xs font-semibold cursor-pointer transition-all ${
                  selectedCountry === country
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md'
                    : 'bg-[#06152F] text-slate-300 hover:text-white border border-line'
                }`}
              >
                {country === 'ALL' ? 'All UK Territories' : country}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, county or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-sm bg-[#06152F] border border-line text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-[#7AAA2B]"
            />
          </div>

        </div>

        {/* Main Grid: Interactive Map (Left) + Detail Card & Territory List (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Vector UK Territory Map Visualizer */}
          <div className="lg:col-span-6 bg-[#040E20] border border-line rounded-sm p-6 relative flex flex-col items-center justify-center min-h-[500px]">
            
            <div className="absolute top-4 left-4 z-10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">TERRITORY MAPPING</span>
              <span className="text-xs font-bold text-white font-display uppercase">
                {selectedCountry === 'ALL' ? 'United Kingdom' : selectedCountry}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#7AAA2B]" />
              <span>Click Marker to Inspect</span>
            </div>

            {/* Stylized UK SVG Map */}
            <div className="relative w-full max-w-[360px] aspect-[3/4] my-4">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              >
                {/* Scotland Highlands */}
                <path
                  d="M 38 8 L 48 10 L 52 18 L 44 24 L 34 22 L 32 14 Z"
                  fill="#0A1E3A"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#122A50] transition-colors cursor-pointer"
                />
                {/* Scotland Central Belt */}
                <path
                  d="M 34 24 L 46 25 L 50 32 L 38 34 L 32 30 Z"
                  fill="#0B2242"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#142F5A] transition-colors cursor-pointer"
                />
                {/* Northern Ireland */}
                <path
                  d="M 18 34 L 26 33 L 28 42 L 18 44 Z"
                  fill="#0A1E3A"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#122A50] transition-colors cursor-pointer"
                />
                {/* Northern England */}
                <path
                  d="M 40 34 L 52 33 L 56 46 L 40 48 Z"
                  fill="#0B2242"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#142F5A] transition-colors cursor-pointer"
                />
                {/* Midlands & East Anglia */}
                <path
                  d="M 40 48 L 56 46 L 70 56 L 62 66 L 44 64 Z"
                  fill="#0D264A"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#163564] transition-colors cursor-pointer"
                />
                {/* Wales */}
                <path
                  d="M 32 50 L 42 50 L 40 68 L 28 66 Z"
                  fill="#0A1E3A"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#122A50] transition-colors cursor-pointer"
                />
                {/* South West */}
                <path
                  d="M 22 74 L 40 68 L 42 78 L 24 82 Z"
                  fill="#0E2D56"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#183D74] transition-colors cursor-pointer"
                />
                {/* South East & London */}
                <path
                  d="M 42 66 L 64 64 L 72 74 L 44 80 Z"
                  fill="#0D264A"
                  stroke="#1E3A5F"
                  strokeWidth="0.8"
                  className="hover:fill-[#163564] transition-colors cursor-pointer"
                />
              </svg>

              {/* Territory Interactive Pins */}
              {filteredTerritories.map((t) => {
                const isSelected = selectedTerritory.territory_id === t.territory_id;
                const coords = t.coordinates || { x: 50, y: 50 };
                return (
                  <button
                    key={t.territory_id}
                    onClick={() => setSelectedTerritory(t)}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    title={`${t.city} (${t.county})`}
                  >
                    <div
                      className={`p-1 rounded-full transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#7AAA2B] text-[#06152F] scale-125 shadow-[0_0_15px_#7AAA2B]'
                          : 'bg-[#FF6321] text-white hover:scale-110 shadow-md'
                      }`}
                    >
                      <MapPin className="w-3 h-3 fill-current" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Territory Count */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-line/60 text-xs font-mono text-slate-400">
              <span>Matching Territories: <strong className="text-white">{filteredTerritories.length}</strong></span>
              <span className="text-[11px] text-slate-500">Unite Greentek Network</span>
            </div>

          </div>

          {/* Right: Selected Territory Detail Card & Application Trigger */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Selected Territory Detailed Profile */}
            <div className="p-6 sm:p-7 rounded-sm bg-[#040E20] border-2 border-[#7AAA2B]/60 shadow-2xl space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    SELECTED TERRITORY // {selectedTerritory.territory_id}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white uppercase font-display tracking-tight">
                    {selectedTerritory.city}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-mono mt-0.5">
                    <span>{selectedTerritory.county}</span>
                    <span>•</span>
                    <span className="text-[#7AAA2B]">{selectedTerritory.country}</span>
                  </div>
                </div>

                {getStatusBadge(selectedTerritory.status)}
              </div>

              {/* Business Opportunity Analysis */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 block font-bold">
                  BUSINESS OPPORTUNITY
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light bg-[#06152F] p-4 rounded-sm border border-line">
                  {selectedTerritory.businessOpportunity}
                </p>
              </div>

              {/* Resource Metrics & Market Potential */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-sm bg-[#06152F] border border-line">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 uppercase">
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>Solar</span>
                  </div>
                  <strong className="text-white text-xs block mt-1">
                    {selectedTerritory.solarRating || 'Very High'}
                  </strong>
                </div>

                <div className="p-2.5 rounded-sm bg-[#06152F] border border-line">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 uppercase">
                    <Wind className="w-3 h-3 text-sky-400" />
                    <span>Wind</span>
                  </div>
                  <strong className="text-white text-xs block mt-1">
                    {selectedTerritory.windRating || 'High'}
                  </strong>
                </div>

                <div className="p-2.5 rounded-sm bg-[#06152F] border border-line">
                  <span className="text-[10px] text-slate-400 uppercase block">Demand</span>
                  <strong className="text-[#7AAA2B] text-xs block mt-1">
                    {selectedTerritory.indicativeMarketPotential || 'High'}
                  </strong>
                </div>
              </div>

              {/* Next Step Guidance */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">NEXT STEP</span>
                <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line text-xs text-slate-300 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-[#FF6321] shrink-0 mt-0.5" />
                  <p>{selectedTerritory.nextStep}</p>
                </div>
              </div>

              {/* CTA Button: Request This Territory (pre-fills application) */}
              <button
                id="btn-request-selected-territory"
                onClick={() => onRequestTerritory(selectedTerritory)}
                className="w-full py-3.5 rounded-sm mini-tag bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:from-[#5aa222] hover:to-[#8bc232] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-950/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>REQUEST THIS TERRITORY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

            {/* Quick List of Other Territories */}
            <div className="bg-[#0A1E3A] border border-line rounded-sm p-4 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">
                Quick Select Available Territory:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {filteredTerritories.slice(0, 10).map((t) => (
                  <button
                    key={t.territory_id}
                    onClick={() => setSelectedTerritory(t)}
                    className={`px-2.5 py-1 rounded-sm text-[11px] font-mono transition-all cursor-pointer ${
                      selectedTerritory.territory_id === t.territory_id
                        ? 'bg-[#7AAA2B] text-[#06152F] font-bold'
                        : 'bg-[#06152F] text-slate-300 hover:text-white border border-line'
                    }`}
                  >
                    {t.city} ({t.region})
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
