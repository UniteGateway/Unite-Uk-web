import React, { useState } from 'react';
import {
  FolderGit2,
  Filter,
  MapPin,
  Sun,
  Wind,
  Layers,
  Sparkles,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  Tag
} from 'lucide-react';
import { DEMO_PROJECT_PORTFOLIO } from '../../data/ukOpportunityData';
import { ProjectPortfolioItem, TechnologyType, ProjectDevelopmentStage } from '../../types';

interface ProjectPortfolioDatabaseProps {
  onOpenProjectDetail: (project: ProjectPortfolioItem) => void;
  onSubmitNewProject: () => void;
}

export const ProjectPortfolioDatabase: React.FC<ProjectPortfolioDatabaseProps> = ({
  onOpenProjectDetail,
  onSubmitNewProject
}) => {
  const [techFilter, setTechFilter] = useState<string>('ALL');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [modelFilter, setModelFilter] = useState<string>('ALL');

  const filteredProjects = DEMO_PROJECT_PORTFOLIO.filter((p) => {
    if (techFilter !== 'ALL' && p.technology !== techFilter) return false;
    if (stageFilter !== 'ALL' && p.developmentStage !== stageFilter) return false;
    if (modelFilter !== 'ALL' && p.commercialModel !== modelFilter) return false;
    return true;
  });

  const getTechIcon = (tech: TechnologyType) => {
    switch (tech) {
      case 'SOLAR':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'WIND':
        return <Wind className="w-4 h-4 text-sky-400" />;
      case 'BESS':
        return <Layers className="w-4 h-4 text-[#7AAA2B]" />;
      case 'HYBRID':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'ROOFTOP':
      case 'COMMERCIAL':
      default:
        return <Building2 className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <section id="project-portfolio" className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
              <FolderGit2 className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Section 18 // Project Development Portfolio UI</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              PROJECT PORTFOLIO
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Explore structured pipeline assets across Britain. Click any project card to inspect technical parameters, grid connection milestones, and commercial offtake.
            </p>
          </div>

          <button
            onClick={onSubmitNewProject}
            className="px-5 py-2.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0 shadow-md"
          >
            <Zap className="w-4 h-4" />
            <span>SUBMIT NEW PIPELINE ASSET</span>
          </button>
        </div>

        {/* Filter Toolbar (Section 18 of Prompt) */}
        <div className="bg-[#06152F] border border-line p-4 rounded-sm flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center gap-1.5 text-slate-400 mini-tag pr-2">
            <Filter className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>FILTERS:</span>
          </div>

          {/* Technology Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Tech:</span>
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-sm bg-[#0A1E3A] border border-line text-white text-xs focus:outline-none"
            >
              <option value="ALL">All Technologies</option>
              <option value="SOLAR">Solar PV</option>
              <option value="WIND">Onshore Wind</option>
              <option value="BESS">Battery BESS</option>
              <option value="HYBRID">Clean Hybrid</option>
              <option value="ROOFTOP">Commercial Rooftop</option>
            </select>
          </div>

          {/* Stage Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Stage:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-sm bg-[#0A1E3A] border border-line text-white text-xs focus:outline-none"
            >
              <option value="ALL">All Development Stages</option>
              <option value="OPPORTUNITY">Opportunity / Screening</option>
              <option value="FEASIBILITY">Feasibility & Engineering</option>
              <option value="LAND">Land Rights Secured</option>
              <option value="GRID">Grid Application Pending</option>
              <option value="PLANNING">Planning Submitted</option>
              <option value="DEVELOPMENT">Development Phase</option>
              <option value="READY FOR INVESTMENT">Ready for Investment / RTB</option>
              <option value="UNDER CONSTRUCTION">Under Construction</option>
              <option value="OPERATIONAL">Operational</option>
            </select>
          </div>

          {/* Commercial Model Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Model:</span>
            <select
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-sm bg-[#0A1E3A] border border-line text-white text-xs focus:outline-none"
            >
              <option value="ALL">All Commercial Models</option>
              <option value="PPA">Corporate PPA</option>
              <option value="RESCO">RESCO Service</option>
              <option value="BOOT">BOOT Concession</option>
              <option value="BOO">BOO Direct Asset</option>
              <option value="CAPEX">Turnkey CAPEX</option>
            </select>
          </div>

          <span className="ml-auto text-[11px] font-mono text-slate-400">
            Showing <strong className="text-white">{filteredProjects.length}</strong> Projects
          </span>

        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProjectDetail(project)}
              className="bg-[#06152F] border border-line rounded-sm p-5 space-y-4 hover:border-[#7AAA2B]/60 shadow-xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                
                {/* Demo Badge & Stage Tag (Section 18 Required Demo Project Flag) */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-sm bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold uppercase">
                    DEMO PROJECT
                  </span>
                  <span className="mini-tag text-[#7AAA2B]">{project.developmentStage}</span>
                </div>

                {/* Title & Location */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    {getTechIcon(project.technology)}
                    <span>{project.technology} // {project.code}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white font-display uppercase tracking-tight group-hover:text-[#7AAA2B] transition-colors mt-0.5">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono mt-1">
                    <MapPin className="w-3 h-3 text-[#FF6321]" />
                    <span>{project.region}, {project.country}</span>
                  </div>
                </div>

                {/* Brief Overview */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>

                {/* Technical Specs Snapshot */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-sm bg-[#0A1E3A] border border-line text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block">Capacity:</span>
                    <strong className="text-white text-[11px]">{project.capacity}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block">Grid Status:</span>
                    <strong className="text-amber-400 text-[11px] truncate block">{project.gridStatus}</strong>
                  </div>
                </div>

              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Commercial: <strong className="text-white">{project.commercialModel}</strong>
                </span>
                <span className="text-xs font-bold text-[#7AAA2B] group-hover:text-white flex items-center gap-1">
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
