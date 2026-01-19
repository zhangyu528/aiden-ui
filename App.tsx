
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Activity, DollarSign, Layers, Cpu, RefreshCw, Database, Clock, Zap, BarChart3
} from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { PerformanceChart } from './components/PerformanceChart';
import { Terminal } from './components/Terminal';
import { UserBadge } from './components/UserBadge';
import { 
  TokenMetrics, PerformanceMetrics, TimeSeriesPoint 
} from './types';

// Mock Constants
const MODEL_VERSION = "v0.9.1-beta";
const MOCK_USER = {
  name: "Admin_Nexus_01",
  activeDays: 142
};

const App: React.FC = () => {
  // Capture session start time including full date on initialization
  const sessionStartTimestamp = useMemo(() => {
    const now = new Date();
    const date = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    const time = now.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${date} ${time}`;
  }, []);

  // --- States ---
  const [tokens, setTokens] = useState<TokenMetrics>({
    input: 125430,
    output: 45210,
    cost: 1.28,
    contextFill: 12.4
  });

  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // --- Mock Generators ---
  const updateMetrics = useCallback(() => {
    const inputIncr = Math.floor(Math.random() * 50) + 10;
    const outputIncr = Math.floor(Math.random() * 30);
    
    setTokens(prev => ({
      ...prev,
      input: prev.input + inputIncr,
      output: prev.output + outputIncr,
      cost: prev.cost + 0.001,
      contextFill: Math.min(prev.contextFill + (inputIncr / 20000) * 100, 100)
    }));

    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    setTimeSeries(prev => {
      const newData = [...prev.slice(-30), { time: timeStr, tokens: inputIncr, cost: 0.01 }];
      return newData;
    });

    if (Math.random() > 0.7) {
      const messages = [
        "Ingesting payload: Syncing context...",
        "Input buffer optimized for high throughput.",
        "Token gateway health: Nominal.",
        "Aiden processing input stream...",
        "Quotas verified. Processing tokens."
      ];
      setLogs(prev => [...prev.slice(-50), `<span class="text-cyan-500">[INPUT]</span> ${messages[Math.floor(Math.random() * messages.length)]}`]);
    }
  }, []);

  // --- Effects ---
  useEffect(() => {
    setLogs([
      "AIDEN_CORE: Initializing intake valves...",
      "SYSTEM: Input monitoring focused. Priority 1: Tokens_Ingress",
      "READY: Tracking session tokens and consumption rates."
    ]);

    const metricInterval = setInterval(updateMetrics, 2000);
    return () => clearInterval(metricInterval);
  }, [updateMetrics]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl glow-cyan animate-pulse">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 whitespace-nowrap">
              AIDEN <span className="text-cyan-400">ENGINE_CORE</span>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-cyan-400 font-bold uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                Input Focused Monitoring
              </span>
              <span className="text-[10px] text-slate-500 mono bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700">
                {MODEL_VERSION}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserBadge username={MOCK_USER.name} activationDays={MOCK_USER.activeDays} />
          <button className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg border border-slate-700 transition-colors text-slate-300">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Layout: Focus on Input Tokens */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <Clock className="w-3 h-3 text-cyan-500" />
          Session Active Since <span className="text-cyan-400 mono ml-1">{sessionStartTimestamp}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Focus Card: Input Tokens (Large) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/20 border border-cyan-500/30 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Layers className="w-48 h-48 text-cyan-400" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/30">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest">Primary Engine Load</span>
                </div>
                <h2 className="text-slate-400 text-lg font-medium mb-1 uppercase tracking-tight">Input Tokens</h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black mono text-white tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    {tokens.input.toLocaleString()}
                  </span>
                  <span className="text-xl text-cyan-600 font-bold uppercase mono">TKNS</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Growth (24H)</span>
                  <span className="text-emerald-400 font-bold text-lg flex items-center gap-1">
                    ↑ 12.5% <span className="text-[10px] text-slate-600 font-normal uppercase">vs yesterday</span>
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Processing Mode</span>
                  <span className="text-cyan-400 font-bold text-lg uppercase tracking-tight">STREAMING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Diagnostics Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            <MetricCard 
              title="Output Tokens" 
              value={tokens.output.toLocaleString()} 
              unit="tkns" 
              trend={{ value: 3.2, isUp: false }}
              icon={<Activity className="w-5 h-5" />}
              colorClass="text-indigo-400"
            />
            <MetricCard 
              title="Session Cost" 
              value={`$${tokens.cost.toFixed(2)}`} 
              unit="usd" 
              trend={{ value: 0.4, isUp: true }}
              icon={<DollarSign className="w-5 h-5" />}
              colorClass="text-emerald-400"
            />
            
            {/* Expanded Context Fill Card */}
            <div className="sm:col-span-2 glass p-6 rounded-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Context Window Fill</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Real-time memory allocation of input payload</p>
                </div>
                <Database className="w-6 h-6 text-amber-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-4xl font-bold mono tracking-tight text-slate-200">
                    {tokens.contextFill.toFixed(2)}%
                  </span>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 font-mono uppercase">Quota Used</span>
                    <span className="text-sm font-bold text-slate-400 mono">{(tokens.input / 1000).toFixed(1)}k / 2.0M</span>
                  </div>
                </div>
                <div className="relative w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                    style={{ width: `${tokens.contextFill}%` }}
                  ></div>
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] animate-shimmer pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Monitoring Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 min-h-[350px]">
          <PerformanceChart data={timeSeries} />
        </div>
        <div className="lg:col-span-1 h-full">
          <Terminal logs={logs} />
        </div>
      </div>

      {/* System Status Footer */}
      <footer className="mt-auto pt-4 border-t border-slate-800/50 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] text-slate-500 mono font-bold uppercase tracking-widest">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Engine: Aiden Stable</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Buffer: OK</div>
        <div className="flex items-center gap-1.5 text-cyan-400 underline decoration-cyan-500/30">Diagnostics: Passive</div>
        <div className="flex items-center gap-1.5">Load: 0.12ms Latency</div>
      </footer>
    </div>
  );
};

export default App;
