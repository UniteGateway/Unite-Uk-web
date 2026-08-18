import React, { useState, useEffect } from 'react';
import { Sun, Battery, Building2, Zap, ArrowRight, Activity, ShieldCheck, RefreshCw } from 'lucide-react';

export const EnergyFlowInteractive: React.FC = () => {
  const [simulationMode, setSimulationMode] = useState<'DAY_SURGE' | 'EVENING_PEAK' | 'NIGHT_RESILIENCE'>('DAY_SURGE');
  const [solarKw, setSolarKw] = useState(480);
  const [batterySoc, setBatterySoc] = useState(88);
  const [buildingLoadKw, setBuildingLoadKw] = useState(260);
  const [gridExportKw, setGridExportKw] = useState(140);

  useEffect(() => {
    if (simulationMode === 'DAY_SURGE') {
      setSolarKw(520);
      setBatterySoc(92);
      setBuildingLoadKw(240);
      setGridExportKw(180);
    } else if (simulationMode === 'EVENING_PEAK') {
      setSolarKw(45);
      setBatterySoc(74);
      setBuildingLoadKw(380);
      setGridExportKw(0);
    } else {
      setSolarKw(0);
      setBatterySoc(65);
      setBuildingLoadKw(190);
      setGridExportKw(0);
    }
  }, [simulationMode]);

  return (
    <section className="py-14 bg-[#06152F] relative overflow-hidden border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm glass text-xs font-semibold text-[#7AAA2B] uppercase tracking-wider mb-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span className="mini-tag">07. Real-Time EMS Telemetry Simulation</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
              SYNCHRONISED CLEAN ENERGY FLOW
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
              Visualise continuous sub-second electron distribution across Solar PV, BESS storage, facility load, and the UK National Grid.
            </p>
          </div>

          {/* Simulation Condition Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#0A1E3A] rounded-sm border border-line self-stretch md:self-auto">
            {[
              { id: 'DAY_SURGE', label: 'Midday Solar Surge' },
              { id: 'EVENING_PEAK', label: 'Peak Tariff Shift' },
              { id: 'NIGHT_RESILIENCE', label: 'Night BESS Backup' },
            ].map((mode) => {
              const isActive = simulationMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSimulationMode(mode.id as any)}
                  className={`px-2.5 py-1.5 rounded-sm mini-tag transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7AAA2B] text-[#06152F] font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Node Interactive Visual Flow Stage */}
        <div className="bg-[#0A1E3A] border border-line rounded-sm p-4 sm:p-6 shadow-2xl relative border-l-2 border-l-[#7AAA2B]">
          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative z-10 items-center">
            
            {/* Node 1: SUN */}
            <div className="p-3 rounded-sm stat-card-orange bg-[#06152F] border-line flex flex-col items-center text-center space-y-1.5 relative group hover:border-[#FF6321]">
              <div className="w-9 h-9 rounded-sm bg-[#FF6321]/20 text-[#FF6321] flex items-center justify-center border border-[#FF6321]/40 animate-pulse">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="mini-tag text-slate-400">Irradiance</span>
                <h4 className="text-xs font-extrabold text-white uppercase">SUN RESOURCE</h4>
              </div>
              <span className="text-xs font-mono font-bold text-[#FF6321]">
                {simulationMode === 'DAY_SURGE' ? '985 W/m²' : simulationMode === 'EVENING_PEAK' ? '120 W/m²' : '0 W/m²'}
              </span>
            </div>

            {/* Node 2: SOLAR PV */}
            <div className="p-3 rounded-sm stat-card bg-[#06152F] border-line flex flex-col items-center text-center space-y-1.5 relative group hover:border-[#7AAA2B]">
              <div className="w-9 h-9 rounded-sm bg-[#7AAA2B]/20 text-[#7AAA2B] flex items-center justify-center border border-[#7AAA2B]/40">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="mini-tag text-slate-400">Generation</span>
                <h4 className="text-xs font-extrabold text-white uppercase">SOLAR ARRAY</h4>
              </div>
              <span className="text-xs font-mono font-bold text-[#7AAA2B]">
                {solarKw} kW DC
              </span>
            </div>

            {/* Node 3: BESS BATTERY */}
            <div className="p-3 rounded-sm stat-card bg-[#06152F] border-line flex flex-col items-center text-center space-y-1.5 relative group hover:border-sky-400">
              <div className="w-9 h-9 rounded-sm bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/40">
                <Battery className="w-5 h-5" />
              </div>
              <div>
                <span className="mini-tag text-slate-400">State of Charge</span>
                <h4 className="text-xs font-extrabold text-white uppercase">BESS STORAGE</h4>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400">
                {batterySoc}% ({simulationMode === 'DAY_SURGE' ? '+Charging' : '-Discharging'})
              </span>
            </div>

            {/* Node 4: BUILDING LOAD */}
            <div className="p-3 rounded-sm stat-card bg-[#06152F] border-line flex flex-col items-center text-center space-y-1.5 relative group hover:border-purple-400">
              <div className="w-9 h-9 rounded-sm bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="mini-tag text-slate-400">Consumption</span>
                <h4 className="text-xs font-extrabold text-white uppercase">FACILITY LOAD</h4>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400">
                {buildingLoadKw} kW Active
              </span>
            </div>

            {/* Node 5: NATIONAL GRID */}
            <div className="p-3 rounded-sm stat-card bg-[#06152F] border-line flex flex-col items-center text-center space-y-1.5 relative group hover:border-emerald-400">
              <div className="w-9 h-9 rounded-sm bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="mini-tag text-slate-400">UK National Grid</span>
                <h4 className="text-xs font-extrabold text-white uppercase">DNO INTERCONNECT</h4>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {gridExportKw > 0 ? `+${gridExportKw} kW Export` : '0 kW (Islanded)'}
              </span>
            </div>

          </div>

          {/* Status summary banner */}
          <div className="mt-6 pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#7AAA2B]" />
              <span className="text-[11px]">G99 Active Grid Synchronization • Sub-20ms Transfer Speed • Dynamic Power Inverter</span>
            </div>
            <div className="text-slate-400 font-mono text-[10px]">
              Active Profile: <strong className="text-white">{simulationMode.replace('_', ' ')}</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
