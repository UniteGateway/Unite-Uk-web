import React, { useState } from 'react';
import {
  Sun,
  Wind,
  Layers,
  Sparkles,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  LandPlot
} from 'lucide-react';

interface ProjectOpportunityCardsProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const ProjectOpportunityCards: React.FC<ProjectOpportunityCardsProps> = ({
  onSelectCategory
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>('rooftop');

  const opportunities = [
    {
      id: 'rooftop',
      code: 'ROOFTOP SOLAR',
      title: 'Commercial & Residential Rooftop Opportunities',
      tagline: 'Transform inactive commercial roofs into high-yielding private power plants.',
      icon: <Building2 className="w-6 h-6 text-[#FF6321]" />,
      accentColor: 'border-l-[#FF6321]',
      badgeColor: 'text-[#FF6321] bg-[#FF6321]/10',
      description: 'Zero upfront capital corporate PPAs and turnkey installations for logistics warehouses, industrial units, manufacturing plants, and estate portfolios.',
      typicalScales: '50 kWp – 10 MWp',
      keyBenefits: [
        'Immediate reduction in daytime grid electricity bills',
        'Long-term price hedge against volatile retail tariffs',
        'Enhanced corporate ESG ratings and EPC property certifications',
        'Zero structural disruption with non-penetrative mounting options'
      ],
      idealFor: 'Logistics hubs, cold storage, manufacturing plants, retail parks, schools'
    },
    {
      id: 'solar-parks',
      code: 'SOLAR PARKS',
      title: 'Utility-Scale Solar Development Opportunities',
      tagline: 'Ground-mount solar energy generation directly feeding the national grid.',
      icon: <Sun className="w-6 h-6 text-amber-400" />,
      accentColor: 'border-l-amber-400',
      badgeColor: 'text-amber-400 bg-amber-400/10',
      description: 'Turnkey development, planning, grid connection, and financing of large-scale solar farms on agricultural land, brownfield plots, and industrial estates.',
      typicalScales: '10 MWp – 250 MWp',
      keyBenefits: [
        'Guaranteed index-linked 30–40 year rental income for landowners',
        'High-efficiency N-type TOPCon and bifacial single-axis tracking',
        'Comprehensive biodiversity net gain (+20%) and sheep grazing integration',
        'Full planning, environmental EIA, and DNO grid management'
      ],
      idealFor: 'Agricultural landowners, rural estates, brownfield sites, local authorities'
    },
    {
      id: 'wind-projects',
      code: 'WIND PROJECTS',
      title: 'Onshore & Offshore Development Opportunities',
      tagline: 'High-capacity clean power capturing Britain world-class wind resources.',
      icon: <Wind className="w-6 h-6 text-sky-400" />,
      accentColor: 'border-l-sky-400',
      badgeColor: 'text-sky-400 bg-sky-400/10',
      description: 'Strategic wind power origination, environmental permitting, turbine procurement, and grid interconnection across prime Scottish, Welsh, and English wind corridors.',
      typicalScales: '5 MW – 200 MW+',
      keyBenefits: [
        'Exceptional capacity factors exceeding 35–45% in prime terrains',
        'Ideal winter generation profile complementary to solar summer peaks',
        'Long-term private wire supply agreements with heavy industry',
        'Direct co-development partnership options with local stakeholders'
      ],
      idealFor: 'Rural landowners, hill farms, coastal industrial parks, heavy energy users'
    },
    {
      id: 'bess',
      code: 'BESS',
      title: 'Grid-Connected & Behind-the-Meter Storage',
      tagline: 'Advanced lithium LFP battery storage stabilizing power and monetising flexibility.',
      icon: <Layers className="w-6 h-6 text-[#7AAA2B]" />,
      accentColor: 'border-l-[#7AAA2B]',
      badgeColor: 'text-[#7AAA2B] bg-[#7AAA2B]/10',
      description: 'Utility-scale 1–4 hour duration battery energy storage systems providing frequency response to National Grid ESO and peak shaving for industrial facilities.',
      typicalScales: '1 MWh – 200 MWh',
      keyBenefits: [
        'Dynamic Containment, Moderation, and Firm Frequency response revenues',
        'Wholesale power price arbitrage and Triad/DUoS charge avoidance',
        'Critical uninterruptible backup power for sensitive manufacturing',
        'Liquid-cooled Tier-1 enclosures with NFPA 855 certified safety'
      ],
      idealFor: 'Substation-adjacent landowners, heavy industrial consumers, data centres'
    },
    {
      id: 'hybrid-projects',
      code: 'HYBRID PROJECTS',
      title: 'Solar + Wind + BESS Co-Located Energy Hubs',
      tagline: 'Unified multi-technology clean generation sharing grid infrastructure.',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      accentColor: 'border-l-purple-400',
      badgeColor: 'text-purple-400 bg-purple-400/10',
      description: 'Maximising grid capacity and achieving 24/7 firm green power by co-locating solar generation, wind turbines, and utility battery storage behind a single substation.',
      typicalScales: '20 MW – 300 MW (Multi-Technology)',
      keyBenefits: [
        'Overcomes grid export bottlenecks through intelligent curtailment control',
        'Smoothed year-round green power generation curve',
        'Substantial savings on substation, transformer, and contestable works',
        'Premium bankability for long-term corporate 24/7 clean energy PPAs'
      ],
      idealFor: 'Large estate owners, infrastructure investment funds, industrial clusters'
    },
    {
      id: 'corporate-energy',
      code: 'CORPORATE ENERGY',
      title: 'PPA / RESCO / BOOT / BOO Commercial Structures',
      tagline: 'Zero-capex flexible commercial models tailored to corporate balance sheets.',
      icon: <Briefcase className="w-6 h-6 text-teal-400" />,
      accentColor: 'border-l-teal-400',
      badgeColor: 'text-teal-400 bg-teal-400/10',
      description: 'Tailored renewable energy supply contracts structured to deliver locked, inflation-hedged electricity rates without demanding upfront capital investment.',
      typicalScales: '100 kWp – 50 MW+',
      keyBenefits: [
        'Zero capital expenditure required — Unite funds and operates the asset',
        'Transparent discounted per-kWh electricity billing for 10–25 years',
        'Comprehensive 24/7 operations, maintenance, and insurance included',
        'Optional BOOT pathway transferring full asset equity for £1 at term end'
      ],
      idealFor: 'C&I enterprises, public sector bodies, NHS trusts, multi-site retailers'
    }
  ];

  return (
    <section id="explore-opportunities" className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 03 // Multi-Vector Clean Energy Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            EXPLORE PROJECT OPPORTUNITIES
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            From commercial rooftops and utility solar parks to onshore wind, battery storage and corporate PPAs — discover how Unite structures and delivers clean energy assets.
          </p>
        </div>

        {/* 6 Grid Cards (Section 5 of Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {opportunities.map((item) => {
            const isSelected = selectedCardId === item.id;
            return (
              <div
                key={item.id}
                id={`opp-card-${item.id}`}
                onClick={() => {
                  setSelectedCardId(item.id);
                  onSelectCategory(item.id);
                }}
                className={`bg-[#0A1E3A] border rounded-sm p-6 space-y-4 shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden group hover:border-[#7AAA2B]/60 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-[#7AAA2B] bg-[#0A1E3A] ring-1 ring-[#7AAA2B]/50'
                    : 'border-line'
                } border-l-4 ${item.accentColor}`}
              >
                {/* Card Top */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-sm bg-[#06152F] border border-line">
                      {item.icon}
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm ${item.badgeColor} border border-line`}>
                      {item.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-white font-display uppercase tracking-tight group-hover:text-[#7AAA2B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium italic mt-1 leading-relaxed">
                      "{item.tagline}"
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-2.5 rounded-sm bg-[#06152F] border border-line text-xs space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Typical System Scale:</span>
                    <span className="font-mono font-bold text-white text-xs">{item.typicalScales}</span>
                  </div>

                  {/* Key Benefits List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Strategic Advantages:</span>
                    {item.keyBenefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-4 border-t border-line/70 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    Click to Initiate
                  </span>
                  <button
                    className="flex items-center gap-1.5 text-xs font-bold text-[#7AAA2B] group-hover:text-white transition-colors cursor-pointer"
                  >
                    <span>DEVELOP THIS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footnote statement */}
        <div className="text-center text-[11px] text-slate-400 italic">
          *Indicative project structures. All projects subject to detailed site assessment, DNO network capacity, planning constraints, and formal contractual execution.
        </div>

      </div>
    </section>
  );
};
