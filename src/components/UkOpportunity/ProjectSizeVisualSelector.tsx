import React, { useState } from 'react';
import {
  Home,
  Building,
  Factory,
  Sun,
  Zap,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { PROJECT_SIZE_SCALES } from '../../data/ukOpportunityData';

interface ProjectSizeVisualSelectorProps {
  onSelectSize?: (scaleId: string) => void;
}

export const ProjectSizeVisualSelector: React.FC<ProjectSizeVisualSelectorProps> = ({
  onSelectSize
}) => {
  const [selectedId, setSelectedId] = useState<string>('scale-4'); // Default 250 kW–1 MW

  const currentScale = PROJECT_SIZE_SCALES.find((s) => s.id === selectedId) || PROJECT_SIZE_SCALES[3];

  const getVisualIcon = (graphic: string) => {
    switch (graphic) {
      case 'home':
        return <Home className="w-12 h-12 text-[#FF6321]" />;
      case 'commercial':
        return <Building className="w-12 h-12 text-teal-400" />;
      case 'industrial':
        return <Factory className="w-12 h-12 text-sky-400" />;
      case 'solar-park':
        return <Sun className="w-12 h-12 text-amber-400" />;
      case 'utility-scale':
      default:
        return <Zap className="w-12 h-12 text-[#7AAA2B]" />;
    }
  };

  const getVisualGraphicComponent = (graphic: string) => {
    switch (graphic) {
      case 'home':
        return (
          <div className="relative w-full h-48 bg-[#040E20] rounded-sm border border-line flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] to-transparent opacity-80" />
            <div className="relative z-10 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#FF6321]/15 border border-[#FF6321]/40 flex items-center justify-center mx-auto text-[#FF6321]">
                <Home className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-white uppercase block">
                Single-Phase Residential & Small Business
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                230V Grid Interface // G98 Notification
              </span>
            </div>
          </div>
        );
      case 'commercial':
        return (
          <div className="relative w-full h-48 bg-[#040E20] rounded-sm border border-line flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] to-transparent opacity-80" />
            <div className="relative z-10 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-teal-400/15 border border-teal-400/40 flex items-center justify-center mx-auto text-teal-400">
                <Building className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-white uppercase block">
                Commercial Facility & Institutional Roofs
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                400V Three Phase // G99 Standard Connection
              </span>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="relative w-full h-48 bg-[#040E20] rounded-sm border border-line flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] to-transparent opacity-80" />
            <div className="relative z-10 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-sky-400/15 border border-sky-400/40 flex items-center justify-center mx-auto text-sky-400">
                <Factory className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-white uppercase block">
                Heavy Industrial Campus & Logistics Hub
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                11kV / 33kV Dedicated Substation Private Wire
              </span>
            </div>
          </div>
        );
      case 'solar-park':
        return (
          <div className="relative w-full h-48 bg-[#040E20] rounded-sm border border-line flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] to-transparent opacity-80" />
            <div className="relative z-10 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-400/15 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-400">
                <Sun className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-white uppercase block">
                Agricultural Ground-Mount Solar & BESS Park
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                33kV Bulk Supply Point Direct Export
              </span>
            </div>
          </div>
        );
      case 'utility-scale':
      default:
        return (
          <div className="relative w-full h-48 bg-[#040E20] rounded-sm border border-line flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] to-transparent opacity-80" />
            <div className="relative z-10 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#7AAA2B]/15 border border-[#7AAA2B]/40 flex items-center justify-center mx-auto text-[#7AAA2B]">
                <Zap className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-white uppercase block">
                Transmission-Scale Clean Energy Infrastructure
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                132kV / 400kV National Grid Transmission Grid Code
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 10 // Multi-Scale Project Classification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            PROJECT SIZE SELECTOR
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Select a project capacity tier to dynamically inspect the architectural footprint, electrical interconnection voltage, typical off-take model, and annual generation output.
          </p>
        </div>

        {/* Visual Scale Selector Buttons (Section 10 of Prompt) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {PROJECT_SIZE_SCALES.map((scale) => {
            const isSelected = selectedId === scale.id;
            return (
              <button
                key={scale.id}
                id={`scale-btn-${scale.id}`}
                onClick={() => {
                  setSelectedId(scale.id);
                  if (onSelectSize) onSelectSize(scale.id);
                }}
                className={`p-3 rounded-sm border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold border-[#7AAA2B] shadow-lg shadow-[#7AAA2B]/20'
                    : 'bg-[#0A1E3A] border-line text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-mono block uppercase">{scale.sizeLabel}</span>
                <span className={`text-[10px] mt-1 block font-normal ${isSelected ? 'text-[#06152F]' : 'text-slate-400'}`}>
                  {scale.archetype.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Visual & Specifications Display Card */}
        <div className="bg-[#0A1E3A] border border-line rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Schematic Column */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] font-mono text-[#7AAA2B] uppercase block">
                // System Archetype Schematic
              </span>
              {getVisualGraphicComponent(currentScale.visualGraphic)}
              
              <div className="p-3 rounded-sm bg-[#06152F] border border-line text-xs space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Typical Site Topology:</span>
                <p className="text-xs text-white font-medium">{currentScale.typicalSite}</p>
              </div>
            </div>

            {/* Specifications Matrix Column */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <span className="mini-tag text-[#FF6321]">{currentScale.rangeKw}</span>
                  <span className="text-xs font-mono text-slate-400">Scale Tier</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white font-display uppercase mt-1">
                  {currentScale.archetype}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentScale.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-sm bg-[#06152F] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Annual Electricity Generation</span>
                  <span className="text-sm font-bold text-[#7AAA2B] font-mono block">{currentScale.annualGenerationKwh}</span>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Grid Connection Level</span>
                  <span className="text-sm font-bold text-amber-400 font-mono block">{currentScale.gridVoltage}</span>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Land / Roof Footprint Required</span>
                  <span className="text-sm font-bold text-white font-mono block">{currentScale.landOrRoofArea}</span>
                </div>

                <div className="p-3 rounded-sm bg-[#06152F] border border-line space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Recommended Commercial Model</span>
                  <span className="text-sm font-bold text-sky-400 font-mono block">{currentScale.typicalCommercialModel}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
