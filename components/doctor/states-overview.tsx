'use client';

import { dashboardStats, mockPatients } from '@/lib/mock-data';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export function DoctorStatsOverview() {
  const highRiskPatients = mockPatients.filter((p) => p.riskLevel === 'high').length;
  const criticalPercentage = dashboardStats.totalPatients > 0 
    ? Math.round((highRiskPatients / dashboardStats.totalPatients) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      
      {/* 1. Active Patients Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
            <Users size={24} />
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
            Total
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-1">{dashboardStats.totalPatients}</h3>
          <p className="text-sm font-medium text-slate-500">Active patients under care</p>
        </div>
      </div>

      {/* 2. Critical Alerts Card (Red Theme) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <AlertTriangle size={24} />
          </div>
          {highRiskPatients > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-1 rounded-md">
              <ArrowUpRight size={14} /> {criticalPercentage}%
            </div>
          )}
        </div>
        <div>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-1">{dashboardStats.activeAlerts}</h3>
          <p className="text-sm font-medium text-slate-500">
            <span className="text-red-600 font-bold">{highRiskPatients} high risk</span> files require review
          </p>
        </div>
      </div>

      {/* 3. Recovery Rate Card (Blue Theme) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <TrendingUp size={24} />
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 border border-green-200 px-2 py-1 rounded-md">
            <ArrowUpRight size={14} /> 5.0%
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-1">{dashboardStats.recoveryRate}%</h3>
          <p className="text-sm font-medium text-slate-500">Average ward recovery progress</p>
        </div>
      </div>

      {/* 4. Adherence Rate Card (Green Theme) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <CheckCircle2 size={24} />
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 border border-green-200 px-2 py-1 rounded-md">
            <ArrowUpRight size={14} /> 3.0%
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-1">{dashboardStats.adherenceRate}%</h3>
          <p className="text-sm font-medium text-slate-500">Overall medication adherence</p>
        </div>
      </div>

    </div>
  );
}