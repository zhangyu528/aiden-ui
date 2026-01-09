
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, Zap, DollarSign, Layers, Cpu, Clock, Gauge, 
  ShieldCheck, RefreshCw, BarChart3, Database, Workflow, Terminal as TerminalIcon 
} from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { PerformanceChart } from './components/PerformanceChart';
import { ThoughtStream } from './components/ThoughtStream';
import { Terminal } from './components/Terminal';
import { 
  TokenMetrics, PerformanceMetrics, ThoughtStep, 
  HealthMetrics, TimeSeriesPoint 
} from './types';

// Mock Constants
const MODEL_NAME = "gemini-3-pro-preview";
const MODEL_VERSION = "v0.9.1-beta";

const App: React.FC = () => {
  // --- States ---
  const [tokens, setTokens] = useState<TokenMetrics>({
    input: 125430,
    output: 45210,
    cost: 1.28,
    contextFill: 12.4
  });

  const [performance, setPerformance] = useState<PerformanceMetrics>({
    ttft: 850,
    tps: 45.2,
    latencies: { network: 120, thinking: 730, io: 45 }
  });

  const [health, setHealth] = useState<HealthMetrics>({
    selfHealRate: 98.4,
    codeDiffRatio: 1.15,
    lintFixes: 24,
    activeErrors: 0
  });

  const [thoughtSteps, setThoughtSteps] = useState<ThoughtStep[]>([]);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // --- Mock Generators ---
  const generateStep = useCallback(() => {
    const stages: ThoughtStep['stage'][] = ['PARSING', 'SEARCHING', 'DECIDING', 'EXECUTING', 'REPAIRING'];
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const contents = [
      "Analyzing component dependency graph for Sidebar.tsx...",
      "Detected logic conflict in StateProvider hook implementation.",
      "Searching local codebase for similar architectural patterns...",
      "Synthesizing patch for hydration mismatch in Next.js layout.",
      "Running ESLint check on generated fragments...",
      "Refining reasoning chain based on context constraints."
    ];
    
    const newStep: ThoughtStep = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      stage,
      content: contents[Math.floor(Math.random() * contents.length)],
      status: 'completed'
    };
    
    setThoughtSteps(prev => [...prev.slice(-15), newStep]);
    setLogs(prev => [...prev.slice(-20), `<span class="text-indigo-400">[AIDEN]</span> [${newStep.stage}] ${newStep.content}`]);
  }, []);

  const updateMetrics = useCallback(() => {
    setTokens(prev => ({
      ...prev,
      input: prev.input + Math.floor(Math.random() * 50),
      output: prev.output + Math.floor(Math.random() * 30),
      cost: prev.cost + 0.001,
      contextFill: Math.min(prev.contextFill + 0.01, 100)
    }));

    setPerformance(prev => ({
      ...prev,
      tps: 40 + Math.random() * 15
    }));

    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    setTimeSeries(prev => {
      const newData = [...prev.slice(-20), { time: timeStr, tokens: Math.floor(Math.random() * 60) + 30, cost: 0.01 }];
      return newData;
    });
  }, []);

  // --- Effects ---
  useEffect(() => {
    // Initial data
    setThoughtSteps([
      { id: '1', timestamp: '10:00:01', stage: 'PARSING', content: "Initializing Gemini CLI 3.0 session...", status: 'completed' },
      { id: '2', timestamp: '10:00:05', stage: 'SEARCHING', content: "Loading DSL project definition from 'aiden.config.json'...", status: 'completed' },
      { id: '3', timestamp: '10:00:10', stage: 'DECIDING', content: "Planning engine deployment strategy for high-throughput mode.", status: 'active' },
    ]);
    
    setLogs([
      "BOOTSTRAP: Loading environment variables...",
      "SYSTEM: Connecting to Google GenAI Gateway (Region: US-CENTRAL-1)",
      "INFO: Engine 'Aiden' is now idling, awaiting task dispatch."
    ]);

    const metricInterval = setInterval(updateMetrics, 2000);
    const stepInterval = setInterval(generateStep, 5000);

    return () => {
      clearInterval(metricInterval);
      clearInterval(stepInterval);
    };
  }, [updateMetrics, generateStep]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-cyan-500 to-indigo-600 p-2.5 rounded-xl glow-cyan">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              AIDEN <span className="text-cyan-400">ENGINE_MONITOR</span>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                System Active
              </span>
              <span className="text-[10px] text-slate-500 mono bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700">
                MODEL: {MODEL_NAME} | {MODEL_VERSION}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-bold mono">Engine Latency</span>
            <span className="text-sm font-bold mono text-cyan-400">850ms TTFT</span>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg border border-slate-700 transition-colors">
            <RefreshCw className="w-5 h-5 text-slate-300" />
          </button>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg shadow-cyan-900/20 text-sm">
            FORCE REBOOT
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Row */}
        <MetricCard 
          title="Input Tokens" 
          value={tokens.input.toLocaleString()} 
          unit="tkns" 
          trend={{ value: 12.5, isUp: true }}
          icon={<Layers className="w-5 h-5" />}
          colorClass="text-cyan-400"
        />
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
        <div className="glass p-5 rounded-xl flex flex-col justify-between hover:border-slate-500 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Context Fill</span>
            <div className="text-amber-400 opacity-80"><Database className="w-5 h-5" /></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold mono tracking-tight">{tokens.contextFill.toFixed(1)}%</span>
              <span className="text-[10px] text-slate-500 font-mono">1.2M / 2M</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-1000" 
                style={{ width: `${tokens.contextFill}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Reasoning Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Visualization */}
        <div className="lg:col-span-2">
          <PerformanceChart data={timeSeries} />
        </div>

        {/* Right Sidebar - Thought Stream */}
        <div className="lg:col-span-1 h-full">
          <ThoughtStream steps={thoughtSteps} />
        </div>
      </div>

      {/* Footer / Terminal Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Terminal logs={logs} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="glass p-5 rounded-xl flex-1 bg-indigo-900/10 border-indigo-500/20">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
              <Workflow className="w-4 h-4 text-indigo-400" />
              TASK PIPELINE
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Parse DSL Structure', status: 'completed' },
                { label: 'Identify Impacted Components', status: 'completed' },
                { label: 'Synthesize Logical patch', status: 'active' },
                { label: 'Validate & Lint Fixes', status: 'pending' },
                { label: 'Final Output Serialization', status: 'pending' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    step.status === 'completed' ? 'bg-emerald-500' : 
                    step.status === 'active' ? 'bg-cyan-500 animate-pulse' : 
                    'bg-slate-700'
                  }`}></div>
                  <span className={`text-xs mono ${
                    step.status === 'completed' ? 'text-slate-400 line-through decoration-slate-600' : 
                    step.status === 'active' ? 'text-white font-bold' : 
                    'text-slate-600'
                  }`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 text-[10px] text-slate-500 mono justify-center mt-2">
             <span>v3.4.1-STABLE</span>
             <span>|</span>
             <span>CPU_USAGE: 2.1%</span>
             <span>|</span>
             <span>UPTIME: 4h 12m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
