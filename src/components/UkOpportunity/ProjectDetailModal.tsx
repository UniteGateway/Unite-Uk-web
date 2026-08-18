import React from 'react';
import {
  X,
  MapPin,
  Zap,
  Layers,
  Sun,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  Building2,
  Share2
} from 'lucide-react';
import { ProjectPortfolioItem } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectPortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (project: ProjectPortfolioItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onInquire
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#06152F] border border-line rounded-sm shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#0A1E3A] border-b border-line flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-mono font-bold uppercase">
                DEMO PROJECT // REFERENCE {project.code}
              </span>
              <span className="mini-tag text-[#7AAA2B]">
                {project.developmentStage}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-display">
              {project.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>{project.region}, {project.country}</span>
              <span className="text-slate-500">•</span>
              <span className="text-[#7AAA2B] font-bold">{project.capacity}</span>
              <span className="text-slate-500">•</span>
              <span>Model: {project.commercialModel}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-[#06152F] hover:bg-slate-800 text-slate-400 hover:text-white border border-line cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content (Section 19 of Prompt) */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Status Matrix (4 Status Indicators) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Grid Interconnection</span>
              <span className="text-xs font-bold text-amber-400 font-mono block">{project.gridStatus}</span>
            </div>
            <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Land / Site Rights</span>
              <span className="text-xs font-bold text-[#7AAA2B] font-mono block">{project.landStatus}</span>
            </div>
            <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Offtake Structure</span>
              <span className="text-xs font-bold text-sky-400 font-mono block">{project.offtakeStatus}</span>
            </div>
            <div className="p-3 rounded-sm bg-[#0A1E3A] border border-line space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Investment Status</span>
              <span className="text-xs font-bold text-purple-400 font-mono block">{project.investmentStatus}</span>
            </div>
          </div>

          {/* Project Overview */}
          <div className="space-y-2">
            <h3 className="mini-tag text-[#7AAA2B]">Project Overview</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#0A1E3A]/40 p-4 rounded-sm border border-line">
              {project.overview}
            </p>
          </div>

          {/* Technical & Commercial Summaries Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Technical Summary */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-2.5">
              <span className="text-xs font-bold font-mono text-white uppercase block">
                // Technical Engineering Summary
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-slate-400">Technology Spec:</span>
                  <span className="text-slate-100 font-medium text-right max-w-[200px]">{project.technicalSummary.technologySpec}</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-slate-400">Est. Generation:</span>
                  <span className="text-[#7AAA2B] font-mono font-bold">{project.technicalSummary.estimatedGenerationGwhYear} GWh / yr</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-slate-400">CO₂ Avoidance:</span>
                  <span className="text-white font-mono">{project.technicalSummary.co2AbatedTonnesYear.toLocaleString()} Tonnes / yr</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-slate-400">Substation Voltage:</span>
                  <span className="text-amber-400 font-mono">{project.technicalSummary.substationVoltage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Site Footprint:</span>
                  <span className="text-slate-200">{project.technicalSummary.footprint}</span>
                </div>
              </div>
            </div>

            {/* Commercial Structure */}
            <div className="p-4 rounded-sm bg-[#0A1E3A] border border-line space-y-2.5">
              <span className="text-xs font-bold font-mono text-white uppercase block">
                // Commercial & Governance Structure
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-slate-400">Offtake Mechanism:</span>
                  <span className="text-slate-100 font-medium text-right max-w-[200px]">{project.commercialStructure.offtakeMechanism}</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-slate-400">Target COD:</span>
                  <span className="text-sky-400 font-mono font-bold">{project.commercialStructure.targetOperationDate}</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-slate-400">Asset Operating Life:</span>
                  <span className="text-white font-mono">{project.commercialStructure.assetLifeYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Stakeholders:</span>
                  <span className="text-slate-200 text-right max-w-[200px]">{project.commercialStructure.partnerEcosystem}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Available Documents Matrix */}
          <div className="p-4 rounded-sm bg-[#040E20] border border-line space-y-2">
            <div className="flex items-center justify-between">
              <span className="mini-tag text-slate-300">Data Room & Available Documentation</span>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" /> NDA Required for Full Data Room
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.availableDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0A1E3A] border border-line text-xs text-slate-300">
                  <FileText className="w-3.5 h-3.5 text-[#7AAA2B]" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Note from Prompt Section 19 */}
          <div className="text-[11px] text-slate-400 italic">
            *Notice: Sensitive commercial, landowner identity, and grid confidential telemetry are restricted under NDA in accordance with UK energy governance regulations.
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0A1E3A] border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-300 font-mono">
            Unite Greentek Limited Development SPV
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-sm mini-tag bg-[#06152F] border border-line text-slate-300 hover:text-white text-xs cursor-pointer"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(project);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-sm mini-tag text-[#06152F] bg-[#7AAA2B] hover:bg-[#689423] font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>INQUIRE ABOUT THIS PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
