
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon?: React.ReactNode;
  colorClass?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, value, unit, trend, icon, colorClass = "text-cyan-400" 
}) => {
  return (
    <div className="glass p-5 rounded-xl flex flex-col justify-between hover:border-slate-500 transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</span>
        <div className={`${colorClass} opacity-80`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold mono tracking-tight">{value}</span>
        {unit && <span className="text-xs text-slate-500 font-medium uppercase">{unit}</span>}
      </div>
      {trend && (
        <div className={`text-[10px] mt-2 font-bold flex items-center gap-1 ${trend.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend.isUp ? '↑' : '↓'} {trend.value}% <span className="text-slate-500 font-normal lowercase">vs yesterday</span>
        </div>
      )}
    </div>
  );
};
