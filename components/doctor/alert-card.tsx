'use client';

import { 
  Pill, 
  Activity, 
  Stethoscope, 
  Info, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  MoreHorizontal
} from 'lucide-react';
import { Alert } from '@/lib/mock-data';

interface AlertCardProps {
  alert: Alert;
}

// 1. Clean, Professional Icons
const alertTypeIcons: Record<string, JSX.Element> = {
  medication: <Pill size={22} strokeWidth={2} />,
  vitals: <Activity size={22} strokeWidth={2} />,
  recovery: <Stethoscope size={22} strokeWidth={2} />,
  general: <Info size={22} strokeWidth={2} />,
};

// 2. High-Contrast Priority Styling (Softer backgrounds, sharper text)
const priorityConfig: Record<string, { bg: string; iconBg: string; badge: string; border: string }> = {
  high: { 
    bg: 'bg-white hover:bg-red-50/30 border-red-200 shadow-[0_4px_20px_-4px_rgba(239,68,68,0.1)]',
    iconBg: 'bg-red-100 text-red-600',
    badge: 'bg-red-50 text-red-700 border-red-200',
    border: 'border-l-4 border-l-red-500' // Visual anchor on the left
  },
  medium: { 
    bg: 'bg-white hover:bg-amber-50/30 border-amber-200 shadow-[0_4px_20px_-4px_rgba(245,158,11,0.05)]',
    iconBg: 'bg-amber-100 text-amber-600',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    border: 'border-l-4 border-l-amber-500'
  },
  low: { 
    bg: 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm',
    iconBg: 'bg-blue-50 text-blue-600',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    border: 'border-l-4 border-l-transparent'
  },
};

export function AlertCard({ alert }: AlertCardProps) {
  const styles = priorityConfig[alert.priority] || priorityConfig.low;
  const icon = alertTypeIcons[alert.type] || <Info size={22} strokeWidth={2} />;

  return (
    <div className={`group relative w-full rounded-2xl border transition-all duration-300 ${styles.bg} ${styles.border}`}>
      
      {/* 3. Main Content Container - Replaced complex flex with a clean Grid layout */}
      <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start">
        
        {/* Left Column: Icon */}
        <div className={`hidden sm:flex shrink-0 w-12 h-12 rounded-full items-center justify-center ${styles.iconBg}`}>
          {icon}
        </div>

        {/* Right Column: Alert Data */}
        <div className="flex flex-col h-full justify-between gap-4">
          
          <div className="space-y-2">
            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex items-center gap-3">
                {/* Mobile-only icon */}
                <div className={`sm:hidden shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${styles.iconBg}`}>
                  {icon}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
                  {alert.patientName}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles.badge}`}>
                  {alert.priority} Priority
                </span>
              </div>

              {/* Action Indicator */}
              <div className="flex items-center gap-3">
                {alert.actionRequired && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100/50">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Requires Review
                  </div>
                )}
                {/* Subtle menu dots for premium feel */}
                <button className="text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Alert Message */}
            <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-3xl">
              {alert.message}
            </p>
          </div>

          {/* Footer Metadata & Actions - Perfectly aligned using flex-wrap */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Clock size={14} />
              {alert.timestamp}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors">
                View File
              </button>
              
              <button className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${
                alert.priority === 'high' ? 'bg-red-600 hover:bg-red-700 ring-2 ring-transparent focus:ring-red-500/50' : 
                alert.priority === 'medium' ? 'bg-amber-600 hover:bg-amber-700 ring-2 ring-transparent focus:ring-amber-500/50' : 
                'bg-teal-600 hover:bg-teal-700 ring-2 ring-transparent focus:ring-teal-500/50'
              }`}>
                {alert.priority === 'high' ? <ShieldAlert size={16} /> : null}
                Take Action <ArrowRight size={16} />
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}