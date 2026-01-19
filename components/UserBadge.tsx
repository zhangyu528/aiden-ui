
import React from 'react';
import { User, Shield, Calendar } from 'lucide-react';

interface UserBadgeProps {
  username: string;
  activationDays: number;
}

export const UserBadge: React.FC<UserBadgeProps> = ({ username, activationDays }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 rounded-xl glass border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 shrink-0">
      <div className="relative shrink-0">
        <div className="bg-slate-800 p-1.5 sm:p-2 rounded-lg border border-slate-700">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border-2 border-slate-950"></div>
      </div>
      
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-tight truncate whitespace-nowrap">{username}</span>
          <Shield className="w-3 h-3 text-indigo-400 shrink-0" />
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
          <span className="text-[10px] mono text-slate-400 whitespace-nowrap">Active <span className="text-cyan-400 font-bold">{activationDays}</span>D</span>
        </div>
      </div>
    </div>
  );
};
