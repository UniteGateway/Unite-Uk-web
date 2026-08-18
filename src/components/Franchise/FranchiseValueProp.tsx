import React from 'react';
import {
  MapPin,
  LayoutDashboard,
  Megaphone,
  Wrench,
  GraduationCap,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { FRANCHISE_VALUE_PROPS } from '../../data/franchiseData';

interface FranchiseValuePropProps {
  onLearnMore?: (cardId: string) => void;
}

export const FranchiseValueProp: React.FC<FranchiseValuePropProps> = ({ onLearnMore }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-[#7AAA2B]" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-5 h-5 text-sky-400" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-[#FF6321]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-teal-400" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="franchise-value-prop" className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 02 // Franchise Value Proposition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            THE UNITE SOLAR BUSINESS PLATFORM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Everything you need to originate, develop, and deliver high-margin renewable-energy projects within your exclusive regional market.
          </p>
        </div>

        {/* 6 Premium Cards Grid (Section 2 of Prompt 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FRANCHISE_VALUE_PROPS.map((item) => (
            <div
              key={item.number}
              className="p-6 rounded-sm bg-[#06152F] border border-line hover:border-[#7AAA2B]/60 transition-all shadow-xl space-y-4 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-sm bg-[#0A1E3A] border border-line group-hover:border-[#7AAA2B]/40 transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-[#7AAA2B] transition-colors">
                    {item.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-white font-display uppercase tracking-tight group-hover:text-[#7AAA2B] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>

              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Included in Package
                </span>
                <span className="text-[#7AAA2B] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                  <span>STANDARD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
