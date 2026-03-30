'use client';

import { 
  User, 
  Calendar, 
  Activity, 
  MessageSquare, 
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Patient } from '@/lib/mock-data';

interface PatientCardProps {
  patient: Patient;
}

// Map risk levels to high-contrast SaaS colors
const riskStyles = {
  high: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    dot: 'bg-red-500',
    label: 'High Risk'
  },
  medium: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    label: 'Med Risk'
  },
  low: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    dot: 'bg-teal-500',
    label: 'Stable'
  }
};

export function PatientCard({ patient }: PatientCardProps) {
  const risk = riskStyles[patient.riskLevel as keyof typeof riskStyles] || riskStyles.low;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      
      {/* 1. Header: Avatar, Name, Condition & Risk Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 group-hover:border-teal-200 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
            <User size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">{patient.name}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{patient.condition}</p>
          </div>
        </div>

        {/* Dynamic Risk Badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${risk.bg} ${risk.border} ${risk.text} text-[10px] font-bold uppercase tracking-wider`}>
          {patient.riskLevel === 'high' ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          ) : (
            <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`}></span>
          )}
          {risk.label}
        </div>
      </div>

      {/* 2. Admission Date */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 font-medium pb-4 border-b border-slate-100">
        <Calendar size={14} className="text-slate-400" />
        Admitted: {new Date(patient.admissionDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>

      <div className="flex-1 flex flex-col justify-end space-y-5">
        
        {/* 3. Progress Bar Component */}
        <div>
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Activity size={12} /> Recovery
            </span>
            <span className="text-sm font-extrabold text-teal-600">{patient.recoveryProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-1000"
              style={{ width: `${patient.recoveryProgress}%` }}
            />
          </div>
        </div>

        {/* 4. Patient Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Days Since</p>
            <p className="font-extrabold text-slate-800">{patient.daysSinceDays}d</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Est. Recovery</p>
            <p className="font-extrabold text-slate-800">{Math.ceil((100 - patient.recoveryProgress) / 5)}d</p>
          </div>
        </div>

        {/* 5. Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-xl text-xs font-semibold transition-colors shadow-sm">
            <MessageSquare size={14} /> Message
          </button>
          <button className="flex items-center justify-center gap-1 w-full py-2.5 bg-teal-600 text-white hover:bg-teal-700 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            File <ChevronRight size={14} />
          </button>
        </div>
        
      </div>
    </div>
  );
}