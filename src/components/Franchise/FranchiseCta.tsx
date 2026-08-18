import React from 'react';
import {
  MapPin,
  FileText,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface FranchiseCtaProps {
  onSelectTerritory: () => void;
  onRequestInformation: () => void;
  onTalkToUs: () => void;
}

export const FranchiseCta: React.FC<FranchiseCtaProps> = ({
  onSelectTerritory,
  onRequestInformation,
  onTalkToUs
}) => {
  return (
    <section id="franchise-cta" className="py-20 bg-[#020A17] relative overflow-hidden text-white border-t border-line">
      
      {/* Background Energy Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(78,139,30,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
          <span>Unite Greentek UK Franchise Platform</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display uppercase leading-tight">
            YOUR TERRITORY. <br />
            YOUR BUSINESS. <br />
            <span className="bg-gradient-to-r from-white via-slate-100 to-[#7AAA2B] bg-clip-text text-transparent">
              OUR ENERGY PLATFORM.
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
            Join the transition towards cleaner energy.
          </p>
        </div>

        {/* 3 Explicit Conversion Actions (Section 17 of Prompt 5) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onSelectTerritory}
            className="px-6 py-3.5 rounded-sm mini-tag bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:from-[#5aa222] hover:to-[#8bc232] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xl shadow-green-950/40 transform hover:-translate-y-0.5 transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span>SELECT TERRITORY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onRequestInformation}
            className="px-6 py-3.5 rounded-sm mini-tag bg-[#06152F] hover:bg-[#0A1E3A] border border-line text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <FileText className="w-4 h-4 text-[#FF6321]" />
            <span>REQUEST INFORMATION</span>
          </button>

          <button
            onClick={onTalkToUs}
            className="px-5 py-3.5 rounded-sm mini-tag text-slate-300 hover:text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#7AAA2B]" />
            <span>TALK TO US</span>
          </button>
        </div>

        {/* Entity Signature Footer */}
        <div className="pt-6 border-t border-line/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <span>Operating Entity: <strong className="text-white">Unite Greentek Limited</strong> (UK)</span>
          <span>•</span>
          <span>Parent: <strong className="text-[#FF6321]">Unite Group Inc., USA</strong></span>
          <span>•</span>
          <span>Website: <a href="https://unitegreentech.com" className="text-slate-300 hover:underline">unitegreentech.com</a></span>
        </div>

      </div>
    </section>
  );
};
