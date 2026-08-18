import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Sun, BatteryCharging, Wind, Building2, Shield, TrendingUp, Layers } from 'lucide-react';

interface HeroProps {
  onExploreSolar: () => void;
  onBuildWithUs: () => void;
  onOpenAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSolar, onBuildWithUs, onOpenAssessment }) => {
  const [activeTab, setActiveTab] = useState<'SOLAR' | 'WIND' | 'BESS' | 'PPA'>('SOLAR');

  const tabs: Array<{
    id: 'SOLAR' | 'WIND' | 'BESS' | 'PPA';
    icon: React.ReactNode;
    title: string;
    stat: string;
    caption: string;
    color: string;
  }> = [
    {
      id: 'SOLAR',
      icon: <Sun className="w-4 h-4 text-[#F37021]" />,
      title: 'Solar Photovoltaics',
      stat: 'Up to 70%',
      caption: 'Energy cost offset for C&I',
      color: '#F37021',
    },
    {
      id: 'WIND',
      icon: <Wind className="w-4 h-4 text-[#7AAA2B]" />,
      title: 'Onshore Wind Generation',
      stat: '38% Avg',
      caption: 'High winter capacity factor',
      color: '#7AAA2B',
    },
    {
      id: 'BESS',
      icon: <BatteryCharging className="w-4 h-4 text-[#38BDF8]" />,
      title: 'Battery Energy Storage',
      stat: '< 20ms',
      caption: 'UPS & dynamic arbitrage',
      color: '#38BDF8',
    },
    {
      id: 'PPA',
      icon: <Building2 className="w-4 h-4 text-[#A855F7]" />,
      title: 'Corporate PPA / RESCO',
      stat: '£0 Capex',
      caption: 'Pay only for clean power used',
      color: '#A855F7',
    },
  ];

  // Auto cycle tabs smoothly every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((current) => {
        const order: Array<'SOLAR' | 'WIND' | 'BESS' | 'PPA'> = ['SOLAR', 'WIND', 'BESS', 'PPA'];
        const nextIndex = (order.indexOf(current) + 1) % order.length;
        return order[nextIndex];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 overflow-hidden">
      {/* Background with cinematic composite & gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2200&q=85"
          alt="Cinematic UK Solar and Renewable Skyline"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out animate-pulse-glow"
          style={{ filter: 'brightness(0.38) contrast(1.15) saturate(1.2)' }}
        />
        {/* Dynamic Dark Modern Corporate Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06152F] via-[#06152F]/85 to-[#06152F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-transparent to-[#06152F]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(78,139,30,0.18),rgba(255,255,255,0))]" />
      </div>

      {/* Subtle floating energy particles animation canvas overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7AAA2B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7AAA2B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="energyBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F37021" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#7AAA2B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Animated floating particles */}
          {[
            { cx: '15%', cy: '25%', r: 3, delay: '0s', dur: '8s' },
            { cx: '45%', cy: '40%', r: 4, delay: '2s', dur: '10s' },
            { cx: '75%', cy: '20%', r: 2.5, delay: '1s', dur: '9s' },
            { cx: '85%', cy: '65%', r: 3.5, delay: '3s', dur: '12s' },
            { cx: '25%', cy: '70%', r: 3, delay: '4s', dur: '7s' },
            { cx: '60%', cy: '80%', r: 2, delay: '1.5s', dur: '11s' },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="url(#particleGlow)"
              className="animate-pulse"
              style={{ animationDuration: p.dur, animationDelay: p.delay }}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Core Positioning */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top entity tag with High Density accent line */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-[1px] w-8 sm:w-12 bg-[#7AAA2B]" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm glass text-slate-300 text-xs shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#FF6321] animate-pulse" />
                <span className="mini-tag text-[#7AAA2B]">UK RENEWABLE ENERGY PLATFORM</span>
                <span className="text-slate-500">•</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider">Unite Greentek Limited</span>
              </div>
              <span className="h-[1px] w-8 sm:w-12 bg-[#7AAA2B]" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white leading-[0.95] font-display"
            >
              POWERING A <br />
              <span className="text-[#7AAA2B]">
                CLEANER FUTURE.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed opacity-85"
            >
              Smart renewable-energy solutions for homes, businesses and industries across the UK.
            </motion.p>

            {/* CTA Buttons - High Density sharp styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="hero-explore-solutions-btn"
                onClick={onExploreSolar}
                className="px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest text-[#06152F] bg-white hover:bg-[#7AAA2B] hover:text-white shadow-xl transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <span>EXPLORE SOLUTIONS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-start-project-btn"
                onClick={onOpenAssessment}
                className="px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest text-white border border-white/30 hover:border-white hover:bg-white hover:text-[#06152F] glass transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>START YOUR PROJECT</span>
                <Sparkles className="w-4 h-4 text-[#FF6321]" />
              </button>
            </motion.div>

            {/* Key trust pillars in High Density Stat Card format */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-4 grid grid-cols-3 gap-3 border-t border-line max-w-xl text-xs"
            >
              <div className="stat-card">
                <p className="mini-tag text-slate-400">Tier-1 OEM</p>
                <p className="text-slate-100 font-bold text-sm">BloombergNEF</p>
              </div>
              <div className="stat-card">
                <p className="mini-tag text-slate-400">Grid Compliant</p>
                <p className="text-slate-100 font-bold text-sm">G99 / G100 Certified</p>
              </div>
              <div className="stat-card-orange">
                <p className="mini-tag text-slate-400">Parent Group</p>
                <p className="text-slate-100 font-bold text-sm">Unite Group Inc., USA</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Energy Switcher & Live Flow Widget */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Floating Live Energy Selector Panel */}
            <div className="p-5 rounded-sm glass-dense shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4E8B1E]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-line">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7AAA2B] animate-pulse" />
                  <h3 className="mini-tag text-slate-300">
                    Live Technology Vector
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#06152F] text-[#7AAA2B] font-mono border border-line">
                  UK OPTIMISED
                </span>
              </div>

              {/* 4 Interactive Selector Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-[#06152F] rounded-sm border border-line">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 text-center rounded-sm text-xs font-bold tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        isActive
                          ? 'bg-[#0A1E3A] text-white shadow-md border border-white/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      {tab.icon}
                      <span className="text-[9px] uppercase tracking-wider font-bold">{tab.id}</span>
                    </button>
                  );
                })}
              </div>

              {/* Animated Detail Display */}
              <AnimatePresence mode="wait">
                {tabs.filter(t => t.id === activeTab).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-3"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{item.title}</span>
                      <span className="text-2xl font-extrabold font-display" style={{ color: item.color }}>
                        {item.stat}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-[#06152F]/70 p-2.5 rounded-sm border border-line">
                      {item.caption}. Engineered for high yield across UK solar irradiance and wind load conditions.
                    </p>

                    <button
                      onClick={onOpenAssessment}
                      className="w-full py-2.5 rounded-sm mini-tag text-white bg-slate-800 hover:bg-[#7AAA2B] hover:text-[#06152F] border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Calculate {item.id} ROI For Your Site</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Quick Interactive Energy Flow Indicator Line */}
            <div className="p-3.5 rounded-sm glass text-xs text-slate-300 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span className="mini-tag">Energy Flow Concept:</span>
                <span className="text-[#7AAA2B] font-mono text-[9px] uppercase font-bold">Hover For Details</span>
              </div>
              
              {/* The interactive visual flow line with hover info cards */}
              <div className="flex items-center justify-between gap-1 py-0.5 text-[9px] font-bold text-center">
                <div className="relative group cursor-pointer">
                  <span className="px-2 py-1 rounded-sm bg-[#FF6321]/15 text-[#FF6321] border border-[#FF6321]/30 block hover:bg-[#FF6321] hover:text-white transition-colors">SUN</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-36 p-2 rounded-sm bg-[#06152F] border border-line text-[10px] font-normal text-slate-200 shadow-2xl z-30 pointer-events-none text-left">
                    <strong className="text-[#FF6321] block font-bold uppercase">1. Solar Irradiance</strong>
                    Natural photon flux harnessed across UK rooftop & ground sites.
                  </div>
                </div>
                
                <span className="text-slate-500 font-mono">↓</span>
                
                <div className="relative group cursor-pointer">
                  <span className="px-2 py-1 rounded-sm bg-[#7AAA2B]/15 text-[#7AAA2B] border border-[#7AAA2B]/30 block hover:bg-[#7AAA2B] hover:text-[#06152F] transition-colors">SOLAR</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-36 p-2 rounded-sm bg-[#06152F] border border-line text-[10px] font-normal text-slate-200 shadow-2xl z-30 pointer-events-none text-left">
                    <strong className="text-[#7AAA2B] block font-bold uppercase">2. PV Generation</strong>
                    Tier-1 monocrystalline panels convert light to clean DC power.
                  </div>
                </div>

                <span className="text-slate-500 font-mono">↓</span>

                <div className="relative group cursor-pointer">
                  <span className="px-2 py-1 rounded-sm bg-sky-500/15 text-sky-400 border border-sky-500/30 block hover:bg-sky-500 hover:text-white transition-colors">BATTERY</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-36 p-2 rounded-sm bg-[#06152F] border border-line text-[10px] font-normal text-slate-200 shadow-2xl z-30 pointer-events-none text-left">
                    <strong className="text-sky-400 block font-bold uppercase">3. BESS Storage</strong>
                    LFP battery storage for load shifting, peak shaving & backup power.
                  </div>
                </div>

                <span className="text-slate-500 font-mono">↓</span>

                <div className="relative group cursor-pointer">
                  <span className="px-2 py-1 rounded-sm bg-purple-500/15 text-purple-400 border border-purple-500/30 block hover:bg-purple-500 hover:text-white transition-colors">BUILDING</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-36 p-2 rounded-sm bg-[#06152F] border border-line text-[10px] font-normal text-slate-200 shadow-2xl z-30 pointer-events-none text-left">
                    <strong className="text-purple-400 block font-bold uppercase">4. Smart Facility</strong>
                    On-site consumption powers operations with zero carbon emissions.
                  </div>
                </div>

                <span className="text-slate-500 font-mono">↓</span>

                <div className="relative group cursor-pointer">
                  <span className="px-2 py-1 rounded-sm bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 block hover:bg-emerald-500 hover:text-[#06152F] transition-colors">BUSINESS</span>
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-36 p-2 rounded-sm bg-[#06152F] border border-line text-[10px] font-normal text-slate-200 shadow-2xl z-30 pointer-events-none text-left">
                    <strong className="text-emerald-400 block font-bold uppercase">5. Commercial Value</strong>
                    Reduced OPEX, ESG compliance, and long-term tariff certainty.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Hero Trust Strip: 4 Compact Indicators */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-sm glass-dense border-line flex items-center gap-3 shadow-lg hover:border-white/30 transition-all">
            <div className="w-10 h-10 rounded-sm bg-[#FF6321]/15 text-[#FF6321] flex items-center justify-center shrink-0 border border-[#FF6321]/30">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white uppercase tracking-wider font-display">SOLAR</p>
              <p className="text-[11px] text-slate-400">Rooftop & Commercial</p>
            </div>
          </div>

          <div className="p-3.5 rounded-sm glass-dense border-line flex items-center gap-3 shadow-lg hover:border-white/30 transition-all">
            <div className="w-10 h-10 rounded-sm bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white uppercase tracking-wider font-display">BESS</p>
              <p className="text-[11px] text-slate-400">Energy Storage</p>
            </div>
          </div>

          <div className="p-3.5 rounded-sm glass-dense border-line flex items-center gap-3 shadow-lg hover:border-white/30 transition-all">
            <div className="w-10 h-10 rounded-sm bg-[#7AAA2B]/15 text-[#7AAA2B] flex items-center justify-center shrink-0 border border-[#7AAA2B]/30">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white uppercase tracking-wider font-display">WIND</p>
              <p className="text-[11px] text-slate-400">Renewable Generation</p>
            </div>
          </div>

          <div className="p-3.5 rounded-sm glass-dense border-line flex items-center gap-3 shadow-lg hover:border-white/30 transition-all">
            <div className="w-10 h-10 rounded-sm bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white uppercase tracking-wider font-display">PPA</p>
              <p className="text-[11px] text-slate-400">Flexible Energy Models</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
