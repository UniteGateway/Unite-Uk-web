import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

export const UkOpportunityFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does a renewable energy land lease work for agricultural or estate landowners?',
      a: 'Unite Solar enters into an initial Option Agreement (typically 3–5 years) to fund all planning permissions, grid studies, environmental surveys, and legal work. Once ready to build, we execute a 30–40 year Lease Agreement providing guaranteed, index-linked (RPI or CPI) annual rental payments per acre with zero financial expenditure required from the landowner. Sheep grazing and dual-use farming can continue across the site.'
    },
    {
      q: 'What is the typical timescale for obtaining planning permission and DNO grid connection?',
      a: 'Timelines vary by regional local planning authority (LPA) and Distribution Network Operator (DNO). Commercial rooftop projects typically take 2–4 months (often under Permitted Development Rights). Ground-mount solar parks and BESS storage installations generally require 12–24 months for environmental impact assessment (EIA), public consultation, planning consent, and ENA G99 grid energisation.'
    },
    {
      q: 'How are Corporate PPAs priced, and what happens to our existing retail electricity supplier?',
      a: 'Under a private wire Corporate PPA, Unite generates electricity on your roof or adjacent land and delivers it directly behind your electricity meter at a fixed, discounted unit rate (p/kWh) for 10–25 years. Any supplementary power required (e.g. at night or during winter peaks) continues to be seamlessly drawn from your existing licensed energy supplier with no disruption.'
    },
    {
      q: 'What are the investment criteria and legal structures for co-investors?',
      a: 'Unite Greentek Limited structures individual projects as ring-fenced Special Purpose Vehicles (SPVs) under English law. Institutional funds, family offices, and accredited corporate partners can participate via senior debt, mezzanine finance, or construction-stage equity with clear project cash-flow mechanics, audited warranties, and Tier-1 insurance coverage.'
    },
    {
      q: 'How safe are Battery Energy Storage Systems (BESS) and what standards do you enforce?',
      a: 'We deploy exclusively Tier-1 Lithium Iron Phosphate (LFP) chemistry, renowned for its superior thermal and chemical stability over older NMC battery chemistries. All enclosures feature multi-stage aerosol and Novec fire suppression, deflagration venting conforming to NFPA 855 / UL 9540A, and 24/7 internal cell temperature telemetry with automated isolation.'
    },
    {
      q: 'What happens at the end of the 35–40 year project asset lifespan?',
      a: 'Our land lease agreements include a legally ring-fenced Decommissioning Bond established during the operational phase. At end-of-life, all above-ground equipment, inverters, racking, and cabling are dismantled and recycled in accordance with WEEE regulations, and the land is fully restored to agricultural use.'
    }
  ];

  return (
    <section className="py-16 bg-[#06152F] border-b border-line">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Section 23 // Technical & Commercial Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Essential answers on land lease contracts, grid connection procedures, PPA structures, and development governance.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0A1E3A] border border-line rounded-sm overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-extrabold text-white font-display uppercase tracking-tight">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-sm bg-[#06152F] border border-line text-slate-300 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-line/50 text-xs text-slate-300 leading-relaxed font-light bg-[#06152F]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
