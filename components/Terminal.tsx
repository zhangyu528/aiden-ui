
import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  logs: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col h-full shadow-2xl">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold mono">
          <TerminalIcon className="w-3 h-3" />
          AIDEN_CLI_RUNTIME
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800"
        style={{ height: '300px' }}
      >
        {logs.map((log, i) => (
          <div key={i} className="mb-1">
            <span className="text-emerald-500 mr-2 opacity-50">$</span>
            <span dangerouslySetInnerHTML={{ __html: log }} />
          </div>
        ))}
        <div className="animate-pulse w-2 h-4 bg-cyan-500 inline-block align-middle ml-1"></div>
      </div>
    </div>
  );
};
