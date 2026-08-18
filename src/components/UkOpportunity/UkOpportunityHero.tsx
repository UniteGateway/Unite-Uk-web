import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Sparkles, MapPin, Layers, Sun, Wind } from 'lucide-react';

interface UkOpportunityHeroProps {
  onSubmitProject: () => void;
  onExploreMap: () => void;
}

export const UkOpportunityHero: React.FC<UkOpportunityHeroProps> = ({
  onSubmitProject,
  onExploreMap
}) => {
  return (
    <section className="relative pt-32 pb-20 bg-[#06152F] overflow-hidden border-b border-line">
      {/* Background cinematic photography overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2000&q=80"
          alt="UK Renewable Solar Farm & Wind Infrastructure Landscape"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-[#06152F]/80 to-[#06152F]/90" />
      </div>

      {/* Subtle floating renewable energy particle effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7AAA2B]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6321]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Core Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>UK RENEWABLE ENERGY OPPORTUNITY PLATFORM</span>
            </div>

            {/* Main Headline from Prompt Section 1 */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-display leading-[1.02] uppercase">
              BUILDING THE <br />
              <span className="text-[#7AAA2B]">
                CLEAN ENERGY FUTURE
              </span> <br />
              OF THE UK.
            </h1>

            {/* Supporting Text from Prompt Section 1 */}
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed max-w-2xl">
              We identify, structure and develop renewable-energy opportunities across solar, wind, battery storage and hybrid energy systems throughout Great Britain and Northern Ireland.
            </p>

            {/* Key Value Micro-metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="p-3 rounded-sm bg-[#0A1E3A]/80 border border-line">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Origination</span>
                <span className="text-sm font-bold text-white mt-0.5 block font-display">Solar • Wind • BESS</span>
              </div>
              <div className="p-3 rounded-sm bg-[#0A1E3A]/80 border border-line">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Grid Engineering</span>
                <span className="text-sm font-bold text-[#7AAA2B] mt-0.5 block font-display">G99 & Transmission</span>
              </div>
              <div className="p-3 rounded-sm bg-[#0A1E3A]/80 border border-line">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Structures</span>
                <span className="text-sm font-bold text-[#FF6321] mt-0.5 block font-display">PPA • RESCO • BOOT</span>
              </div>
            </div>

            {/* CTAs (Section 1) */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                id="uk-hero-submit-btn"
                onClick={onSubmitProject}
                className="px-7 py-3.5 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] shadow-xl shadow-green-950/40 hover:shadow-green-900/60 transition-all flex items-center gap-2 cursor-pointer font-bold transform hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>SUBMIT A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="uk-hero-explore-map-btn"
                onClick={onExploreMap}
                className="px-6 py-3.5 rounded-sm mini-tag text-slate-100 bg-[#0A1E3A] hover:bg-[#06152F] border border-line shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#FF6321]" />
                <span>EXPLORE THE MAP</span>
              </button>
            </div>

            {/* Operating Entity Endorsement Bar */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-400 border-t border-line/60">
              <ShieldCheck className="w-4 h-4 text-[#7AAA2B] shrink-0" />
              <span>
                Operating in the UK by <strong className="text-white font-medium">Unite Greentek Limited</strong> — A company of <strong className="text-slate-300">Unite Group Inc., USA</strong>
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Graphic Card with Vector Pulse */}
          <div className="lg:col-span-5 relative">
            <div className="p-6 rounded-sm bg-[#0A1E3A]/90 border border-line shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
              
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7AAA2B] animate-ping" />
                  <span className="text-xs font-mono font-bold text-white uppercase">UK Energy Transformation Vector</span>
                </div>
                <span className="mini-tag text-[#FF6321]">Active Origination</span>
              </div>

              {/* Graphical Schematic Preview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-sm bg-[#06152F] border border-line text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Sun className="w-4 h-4" />
                    <span>Solar Capacity</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Rooftops & Ground-mount utility parks</p>
                  <span className="text-[10px] font-mono text-[#7AAA2B] block pt-1">High Irradiance Corridors</span>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                    <Wind className="w-4 h-4" />
                    <span>Wind Resources</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Onshore wind & coastal landing points</p>
                  <span className="text-[10px] font-mono text-sky-400 block pt-1">High Capacity Factors</span>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#7AAA2B] font-bold">
                    <Layers className="w-4 h-4" />
                    <span>BESS Storage</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Fast-response 1-4 hour lithium LFP</p>
                  <span className="text-[10px] font-mono text-[#7AAA2B] block pt-1">Frequency & Peak Shaving</span>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Clean Hybrids</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Solar + Wind + BESS co-located</p>
                  <span className="text-[10px] font-mono text-purple-400 block pt-1">Grid Infrastructure Synergy</span>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3 rounded-sm bg-[#020A17] border border-line text-[11px] text-slate-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF6321] shrink-0 mt-0.5" />
                <p>
                  Active development coverage across South West, South East, Midlands, East of England, Yorkshire, North East, Scotland, Wales, and Northern Ireland.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
