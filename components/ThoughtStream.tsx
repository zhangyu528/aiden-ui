
import React, { useEffect, useRef } from 'react';
import { ThoughtStep } from '../types';
import { Search, Code, Brain, Database, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface ThoughtStreamProps {
  steps: ThoughtStep[];
}

const getIcon = (stage: ThoughtStep['stage'], status: ThoughtStep['status']) => {
  if (status === 'active') return <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />;
  if (status === 'error') return <AlertCircle className="w-4 h-4 text-rose-400" />;
  
  switch (stage) {
    case 'PARSING': return <Database className="w-4 h-4" />;
    case 'SEARCHING': return <Search className="w-4 h-4" />;
    case 'DECIDING': return <Brain className="w-4 h-4" />;
    case 'EXECUTING': return <Code className="w-4 h-4" />;
    case 'REPAIRING': return <CheckCircle2 className="w-4 h-4" />;
    default: return <Brain className="w-4 h-4" />;
  }
};

export const ThoughtStream: React.FC<ThoughtStreamProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [steps]);

  return (
    <div className="glass rounded-xl h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" />
          THOUGHT STREAM <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-400">LIVE</span>
        </h3>
        <span className="text-[10px] mono text-slate-500">TRACE_ID: AD-9921-X</span>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700"
      >
        {steps.map((step, idx) => (
          <div key={step.id} className="relative pl-7 pb-1 group">
            {/* Timeline Line */}
            {idx !== steps.length - 1 && (
              <div className="absolute left-[13px] top-6 bottom-[-16px] w-[1px] bg-slate-800"></div>
            )}
            
            {/* Stage Icon */}
            <div className={`absolute left-0 top-1 w-7 flex justify-center items-center z-10 
              ${step.status === 'completed' ? 'text-emerald-400' : 'text-slate-500'}`}>
              {getIcon(step.stage, step.status)}
            </div>

            <div className={`transition-all duration-300 ${step.status === 'active' ? 'bg-cyan-500/5 p-3 rounded-lg border border-cyan-500/20' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{step.stage}</span>
                <span className="text-[10px] mono text-slate-600">{step.timestamp}</span>
              </div>
              <p className={`text-xs mono leading-relaxed ${step.status === 'active' ? 'text-cyan-100' : 'text-slate-400'}`}>
                {step.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
