import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  Users,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { PROJECT_DEVELOPMENT_PIPELINE } from '../../data/ukOpportunityData';

export const ProjectPipelineInteractive: React.FC = () => {
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);

  const activeStage =
    PROJECT_DEVELOPMENT_PIPELINE.find((s) => s.stageNumber === activeStageNumber) ||
    PROJECT_DEVELOPMENT_PIPELINE[0];

  return (
    <section className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 12 // End-to-End Development Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            PROJECT DEVELOPMENT PIPELINE
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Click across the 10 sequential phases to inspect delivery milestones, stakeholder requirements, technical assessments, and statutory governance.
          </p>
        </div>

        {/* 10-Stage Pipeline Horizontal Scroller / Grid (Section 12 of Prompt) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5 overflow-x-auto pb-2">
          {PROJECT_DEVELOPMENT_PIPELINE.map((stage) => {
            const isSelected = stage.stageNumber === activeStageNumber;
            return (
              <button
                key={stage.stageNumber}
                id={`pipeline-step-${stage.stageNumber}`}
                onClick={() => setActiveStageNumber(stage.stageNumber)}
                className={`p-2.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'bg-[#7AAA2B] text-[#06152F] font-bold border-[#7AAA2B] shadow-lg shadow-[#7AAA2B]/20 scale-102'
                    : 'bg-[#0A1E3A] border-line text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono font-bold">
                    0{stage.stageNumber}
                  </span>
                  {stage.stageNumber < 10 && (
                    <span className="text-[9px] opacity-40">→</span>
                  )}
                </div>

                <div className="mt-2">
                  <span className="text-[11px] font-extrabold uppercase block leading-tight font-display">
                    {stage.stageCode}
                  </span>
                  <span className={`text-[9px] block truncate font-mono mt-0.5 ${isSelected ? 'text-[#06152F]' : 'text-slate-400'}`}>
                    {stage.timelineEstimate}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="bg-[#0A1E3A] border border-line rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Stage Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <span className="mini-tag text-[#FF6321]">
                STAGE 0{activeStage.stageNumber} OF 10 // {activeStage.timelineEstimate}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase mt-1">
                {activeStage.title}
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                {activeStage.subtitle}
              </p>
            </div>

            <div className="p-3 rounded-sm bg-[#06152F] border border-line text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Typical Phase Duration</span>
              <span className="text-sm font-bold text-[#7AAA2B] font-mono">{activeStage.timelineEstimate}</span>
            </div>
          </div>

          {/* 4 Core Dimensions: Objective, Key Activities, Stakeholders, Required Assessments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Objective & Activities */}
            <div className="space-y-4">
              
              <div className="p-4 rounded-sm bg-[#06152F] border border-line space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#7AAA2B] text-xs font-bold font-mono uppercase">
                  <Target className="w-4 h-4" />
                  <span>Strategic Objective</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activeStage.objective}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-300 uppercase block">
                  Key Technical & Operational Activities:
                </span>
                <div className="space-y-1.5">
                  {activeStage.keyActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-sm bg-[#06152F]/70 border border-line text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#7AAA2B] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Stakeholders & Required Assessments */}
            <div className="space-y-4">
              
              <div className="p-4 rounded-sm bg-[#06152F] border border-line space-y-2">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold font-mono uppercase">
                  <Users className="w-4 h-4" />
                  <span>Typical Stakeholders & Counterparties</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeStage.typicalStakeholders.map((stk, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-sm bg-[#0A1E3A] border border-line text-xs text-slate-200 font-medium"
                    >
                      {stk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-sm bg-[#06152F] border border-line space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono uppercase">
                  <FileText className="w-4 h-4" />
                  <span>Mandatory Technical & Legal Deliverables</span>
                </div>
                <div className="space-y-1 pt-1">
                  {activeStage.requiredAssessments.map((ass, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{ass}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Step Navigation Bar */}
          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              onClick={() => setActiveStageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={activeStageNumber === 1}
              className="px-4 py-2 rounded-sm text-xs mini-tag bg-[#06152F] border border-line text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              ← PREVIOUS STAGE
            </button>

            <span className="text-xs font-mono text-slate-400">
              Stage <strong>{activeStageNumber}</strong> of 10
            </span>

            <button
              onClick={() => setActiveStageNumber((prev) => Math.min(prev + 1, 10))}
              disabled={activeStageNumber === 10}
              className="px-4 py-2 rounded-sm text-xs mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              NEXT STAGE →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
