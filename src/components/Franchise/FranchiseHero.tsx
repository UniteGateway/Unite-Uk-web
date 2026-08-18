import React from 'react';
import {
  MapPin,
  FileText,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  Globe2,
  PhoneCall
} from 'lucide-react';
import { UniteGroupLogo } from '../UniteLogos';

interface FranchiseHeroProps {
  onSelectTerritory: () => void;
  onDownloadPack: () => void;
  onRequestDiscussion: () => void;
}

export const FranchiseHero: React.FC<FranchiseHeroProps> = ({
  onSelectTerritory,
  onDownloadPack,
  onRequestDiscussion
}) => {
  return (
    <section id="franchise-hero" className="relative min-h-[90vh] flex items-center justify-center bg-[#020914] text-white pt-20 pb-16 overflow-hidden border-b border-line">
      
      {/* Background Architectural Grid & Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(78,139,30,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06152F15_1px,transparent_1px),linear-gradient(to_bottom,#06152F15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Top Entity Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono border-b border-line pb-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7AAA2B] animate-ping" />
            <span className="text-white font-bold tracking-wider uppercase">FRANCHISE & PARTNER PLATFORM</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">United Kingdom</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Operating Entity: <strong className="text-white">Unite Greentek Limited</strong></span>
            <span className="text-slate-600">|</span>
            <span>Parent: <strong className="text-[#FF6321]">Unite Group Inc., USA</strong></span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>International Renewable Energy Business Opportunity</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04] font-display uppercase">
              BUILD YOUR OWN <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-[#7AAA2B] bg-clip-text text-transparent">
                CLEAN ENERGY
              </span> <br />
              BUSINESS.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              Bring renewable-energy solutions to your territory with the Unite Solar business platform.
            </p>

            {/* Supporting 4-Step Text */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-slate-300">
              <div className="p-2.5 rounded-sm bg-[#06152F] border border-line flex items-center gap-2">
                <span className="text-[#7AAA2B] font-bold">01</span>
                <span>Select Territory</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#06152F] border border-line flex items-center gap-2">
                <span className="text-[#7AAA2B] font-bold">02</span>
                <span>Build Team</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#06152F] border border-line flex items-center gap-2">
                <span className="text-[#7AAA2B] font-bold">03</span>
                <span>Develop Clients</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#06152F] border border-line flex items-center gap-2">
                <span className="text-[#7AAA2B] font-bold">04</span>
                <span>Grow Business</span>
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-select-territory-btn"
                onClick={onSelectTerritory}
                className="px-6 py-3.5 rounded-sm mini-tag bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:from-[#5aa222] hover:to-[#8bc232] text-white font-bold text-xs cursor-pointer shadow-xl shadow-green-950/40 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>SELECT YOUR TERRITORY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-download-pack-btn"
                onClick={onDownloadPack}
                className="px-5 py-3.5 rounded-sm mini-tag bg-[#0A1E3A] hover:bg-[#0A1E3A]/80 border border-line text-slate-200 hover:text-white font-bold text-xs cursor-pointer flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-[#FF6321]" />
                <span>DOWNLOAD FRANCHISE INFORMATION</span>
              </button>

              <button
                onClick={onRequestDiscussion}
                className="px-4 py-3.5 rounded-sm mini-tag text-slate-400 hover:text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#7AAA2B]" />
                <span>TALK TO ADVISOR</span>
              </button>
            </div>

            {/* Mandatory Disclaimer from Section 1 */}
            <p className="text-[11px] text-slate-400 font-mono leading-relaxed pt-2">
              *Subject to franchise agreement, eligibility and applicable commercial terms.
            </p>

          </div>

          {/* Right Highlight Box: £20,000 Entry & 25% Profit Share Badge */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-6 sm:p-7 rounded-sm bg-[#06152F] border-2 border-[#7AAA2B]/40 shadow-2xl space-y-5 relative">
              
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-sm bg-[#FF6321]/20 border border-[#FF6321]/40 text-[#FF6321] text-[10px] font-mono font-bold uppercase">
                UK OPPORTUNITY
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  CAPITAL ENTRY OPPORTUNITY
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-slate-400">FROM</span>
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
                    £20,000<span className="text-[#7AAA2B] text-2xl">*</span>
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Commercial Model</span>
                  <strong className="text-[#7AAA2B] font-mono">Territory Franchise</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Net Profit Share</span>
                  <strong className="text-amber-400 font-mono">Up to 25%*</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">CRM & Marketing</span>
                  <strong className="text-white font-mono">Complete Suite Included</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Technical Engineering</span>
                  <strong className="text-sky-400 font-mono">Unite Central Desk</strong>
                </div>
              </div>

              <button
                onClick={onSelectTerritory}
                className="w-full py-2.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <span>EXPLORE AVAILABLE TERRITORIES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Entity Assurance */}
            <div className="p-3.5 rounded-sm bg-[#040E20] border border-line flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-[#7AAA2B] shrink-0" />
              <p className="leading-tight">
                Corporate governance by <strong>Unite Greentek Limited</strong> under <strong>Unite Group Inc., USA</strong> standards.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
