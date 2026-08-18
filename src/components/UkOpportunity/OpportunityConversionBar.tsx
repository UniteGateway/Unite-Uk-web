import React from 'react';
import {
  LandPlot,
  TrendingUp,
  Building2,
  Users,
  Briefcase,
  ArrowRight,
  PhoneCall,
  Zap
} from 'lucide-react';

interface OpportunityConversionBarProps {
  onSelectRole: (role: 'LANDOWNER' | 'INVESTOR' | 'BUSINESS' | 'DEVELOPER') => void;
  onOpenAssessment: () => void;
}

export const OpportunityConversionBar: React.FC<OpportunityConversionBarProps> = ({
  onSelectRole,
  onOpenAssessment
}) => {
  return (
    <div className="py-12 bg-gradient-to-r from-[#020A17] via-[#06152F] to-[#020A17] border-t border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Banner Title */}
        <div className="text-center space-y-1">
          <span className="mini-tag text-[#7AAA2B]">TAKE ACTION // SECTION 24</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase">
            READY TO DEVELOP OR POWER YOUR PROJECT?
          </h2>
          <p className="text-xs text-slate-300">
            Select your pathway below to initiate technical screening or request a proposal.
          </p>
        </div>

        {/* 5 Conversion Triggers Grid (Section 24 of Prompt) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          <button
            onClick={() => onSelectRole('LANDOWNER')}
            className="p-3.5 rounded-sm bg-[#0A1E3A] hover:bg-[#0A1E3A]/80 border border-line hover:border-[#7AAA2B] transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <LandPlot className="w-4 h-4 text-[#7AAA2B]" />
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#7AAA2B] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">LANDOWNER INQUIRY</span>
              <span className="text-[10px] text-slate-400">Lease Farmland or Land</span>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('BUSINESS')}
            className="p-3.5 rounded-sm bg-[#0A1E3A] hover:bg-[#0A1E3A]/80 border border-line hover:border-sky-400 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Building2 className="w-4 h-4 text-sky-400" />
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">REQUEST PPA PROPOSAL</span>
              <span className="text-[10px] text-slate-400">Commercial & Industrial Offtake</span>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('INVESTOR')}
            className="p-3.5 rounded-sm bg-[#0A1E3A] hover:bg-[#0A1E3A]/80 border border-line hover:border-[#FF6321] transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <TrendingUp className="w-4 h-4 text-[#FF6321]" />
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FF6321] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">INVESTOR INQUIRY</span>
              <span className="text-[10px] text-slate-400">SPV Equity & Co-Investment</span>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('DEVELOPER')}
            className="p-3.5 rounded-sm bg-[#0A1E3A] hover:bg-[#0A1E3A]/80 border border-line hover:border-purple-400 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Users className="w-4 h-4 text-purple-400" />
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-white uppercase block font-display">CO-DEVELOPMENT</span>
              <span className="text-[10px] text-slate-400">Developers & EPC Partners</span>
            </div>
          </button>

          <button
            onClick={onOpenAssessment}
            className="p-3.5 rounded-sm bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] transition-all text-left flex flex-col justify-between group cursor-pointer shadow-lg"
          >
            <div className="flex items-center justify-between">
              <Zap className="w-4 h-4 text-[#06152F] fill-current" />
              <ArrowRight className="w-3.5 h-3.5 text-[#06152F] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-[#06152F] uppercase block font-display">PROJECT ASSESSMENT</span>
              <span className="text-[10px] text-[#06152F]/80 font-bold">Launch Interactive Tool</span>
            </div>
          </button>

        </div>

      </div>
    </div>
  );
};
