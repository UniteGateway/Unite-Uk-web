import React from 'react';
import { ArrowRight, Zap, Users, Sparkles, Building2, ShieldCheck, Mail, Phone } from 'lucide-react';

interface FinalCtaProps {
  onRequestAssessment: () => void;
  onBecomePartner: () => void;
  onExploreFranchise: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  onRequestAssessment,
  onBecomePartner,
  onExploreFranchise,
}) => {
  return (
    <section id="contact" className="relative py-20 bg-[#06152F] overflow-hidden border-t border-line">
      {/* Background cinematic photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=80"
          alt="Renewable Wind and Solar Sunset UK Landscape"
          className="w-full h-full object-cover object-center opacity-25"
          style={{ filter: 'contrast(1.15)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-[#06152F]/80 to-[#06152F]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
          <span className="mini-tag">Accelerating UK Clean Power Independence</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-display leading-[1.05] uppercase">
          LET'S BUILD A <br />
          <span className="text-[#7AAA2B]">
            GREENER UK.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed opacity-90">
          Partner with Unite Solar and Unite Greentek Limited to engineer, finance, and operate industry-leading renewable generation assets across Britain.
        </p>

        {/* 3 Call-to-action buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <button
            id="final-cta-assessment"
            onClick={onRequestAssessment}
            className="px-6 py-3 rounded-sm font-bold text-xs mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>REQUEST A PROJECT ASSESSMENT</span>
          </button>

          <button
            id="final-cta-partner"
            onClick={onBecomePartner}
            className="px-6 py-3 rounded-sm font-bold text-xs mini-tag text-white bg-[#0A1E3A] hover:bg-[#06152F] border border-line shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>BECOME A PARTNER</span>
          </button>

          <button
            id="final-cta-franchise"
            onClick={onExploreFranchise}
            className="px-6 py-3 rounded-sm font-bold text-xs mini-tag text-white bg-[#FF6321] hover:bg-orange-600 shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPLORE FRANCHISE</span>
          </button>
        </div>

        {/* Quick Contact Bar */}
        <div className="pt-6 border-t border-line max-w-md mx-auto flex flex-wrap items-center justify-around gap-4 text-xs text-slate-300">
          <a href="tel:+442030341066" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#FF6321]" />
            <span className="font-mono text-xs">+44 203 034 1066</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <a href="mailto:info@unitegreentech.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#7AAA2B]" />
            <span className="font-mono text-xs">info@unitegreentech.com</span>
          </a>
        </div>

      </div>
    </section>
  );
};
