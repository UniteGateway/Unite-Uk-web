import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Compass,
  MapPin,
  Rocket,
  TrendingUp,
  Zap
} from 'lucide-react';

interface FranchiseJourneyProps {
  onStartJourney: () => void;
}

export const FranchiseJourney: React.FC<FranchiseJourneyProps> = ({ onStartJourney }) => {
  const steps = [
    {
      num: '01',
      title: 'APPLY',
      summary: 'Submit your franchise enquiry.',
      desc: 'Complete the structured application form with your background, preferred geographic territory, and commercial objectives.',
      icon: <FileCheck className="w-5 h-5 text-[#FF6321]" />
    },
    {
      num: '02',
      title: 'DISCOVER',
      summary: 'Discuss territory and business objectives.',
      desc: 'Join a confidential discovery session with the Unite Greentek franchise team to evaluate market density and commercial fit.',
      icon: <Compass className="w-5 h-5 text-sky-400" />
    },
    {
      num: '03',
      title: 'SELECT',
      summary: 'Choose your territory and commercial structure.',
      desc: 'Formalise territory boundaries, exclusive development rights, and applicable profit-share schedules.',
      icon: <MapPin className="w-5 h-5 text-amber-400" />
    },
    {
      num: '04',
      title: 'ONBOARD',
      summary: 'Complete agreement, training and setup.',
      desc: 'Execute formal franchise agreement, complete intensive PV/BESS/PPA training, and configure your territory CRM workspace.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#7AAA2B]" />
    },
    {
      num: '05',
      title: 'LAUNCH',
      summary: 'Start sales and customer acquisition.',
      desc: 'Deploy localized digital campaigns, access marketing decks, and begin engaging regional commercial prospects.',
      icon: <Rocket className="w-5 h-5 text-purple-400" />
    },
    {
      num: '06',
      title: 'GROW',
      summary: 'Develop your territory and renewable-energy business.',
      desc: 'Scale your project pipeline from commercial rooftops to multi-MW BESS and solar parks with full central engineering desk support.',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <section id="franchise-journey" className="py-16 bg-[#040E20] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Section 09 // Franchise Development Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
              THE FRANCHISE JOURNEY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              A transparent, step-by-step pathway from initial territory application to scalable commercial project execution.
            </p>
          </div>

          <button
            onClick={onStartJourney}
            className="px-6 py-3.5 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0 shadow-lg"
          >
            <Zap className="w-4 h-4 text-[#06152F] fill-current" />
            <span>START MY JOURNEY</span>
          </button>
        </div>

        {/* 6-Stage Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-5 rounded-sm bg-[#06152F] border border-line hover:border-[#7AAA2B]/60 transition-all flex flex-col justify-between space-y-4 shadow-xl group hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-sm bg-[#0A1E3A] border border-line">
                    {st.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-[#7AAA2B] transition-colors">
                    {st.num}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-tight group-hover:text-[#7AAA2B] transition-colors">
                    {st.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#7AAA2B] block mt-0.5">
                    {st.summary}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-line/60 flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <span>Phase {st.num}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
