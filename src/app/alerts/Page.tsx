'use client';

import { DoctorSidebar } from '@/components/doctor/sidebar-nav';
import { AlertCard } from '@/components/doctor/alert-card';
import { mockAlerts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  BellRing, 
  Filter, 
  CheckCheck, 
  AlertTriangle, 
  AlertCircle, 
  Info,
  ShieldAlert,
  Activity
} from 'lucide-react';

export default function AlertsPage() {
  const sortedAlerts = [...mockAlerts].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const alertsByPriority = {
    high: sortedAlerts.filter((a) => a.priority === 'high'),
    medium: sortedAlerts.filter((a) => a.priority === 'medium'),
    low: sortedAlerts.filter((a) => a.priority === 'low'),
  };

  const actionRequiredCount = sortedAlerts.filter((a) => a.actionRequired).length;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Sidebar Navigation */}
      <DoctorSidebar />

      <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert size={14} /> Triage Center
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Alerts Management</h1>
            <p className="text-slate-500 mt-1">Monitor and triage patient alerts triggered by the CareBridge AI.</p>
          </div>
          
          <div className="flex gap-3 relative z-10 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-teal-600 transition-colors shadow-sm font-semibold text-sm">
              <CheckCheck size={18} /> Mark all read
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-teal-600 transition-colors shadow-sm font-semibold text-sm">
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>

        {/* 2. Key Metrics (Bento UI) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">High Priority</p>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20} /></div>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">{alertsByPriority.high.length}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Medium Priority</p>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertCircle size={20} /></div>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">{alertsByPriority.medium.length}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Low Priority</p>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Info size={20} /></div>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">{alertsByPriority.low.length}</h3>
          </div>

          <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-6 rounded-2xl border border-teal-800 shadow-sm relative overflow-hidden text-white hover:shadow-md transition-shadow">
            <div className="absolute right-0 bottom-0 text-teal-500/30 transform translate-x-4 translate-y-4">
              <Activity size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-teal-100 uppercase tracking-wider">Action Required</p>
                <div className="p-2 bg-teal-500/50 text-white rounded-lg"><BellRing size={20} /></div>
              </div>
              <h3 className="text-4xl font-extrabold">{actionRequiredCount}</h3>
            </div>
          </div>

        </div>

        {/* 3. Alerts Feed */}
        <div className="space-y-8">
          
          {/* High Priority Block */}
          {alertsByPriority.high.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertTriangle size={18} strokeWidth={2.5} />
                </div>
                High Priority Escalations
                <span className="ml-auto text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{alertsByPriority.high.length}</span>
              </h2>
              <div className="space-y-4">
                {alertsByPriority.high.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Medium Priority Block */}
          {alertsByPriority.medium.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <AlertCircle size={18} strokeWidth={2.5} />
                </div>
                Medium Priority
                <span className="ml-auto text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{alertsByPriority.medium.length}</span>
              </h2>
              <div className="space-y-4">
                {alertsByPriority.medium.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Low Priority Block */}
          {alertsByPriority.low.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Info size={18} strokeWidth={2.5} />
                </div>
                Low Priority / Informational
                <span className="ml-auto text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{alertsByPriority.low.length}</span>
              </h2>
              <div className="space-y-4">
                {alertsByPriority.low.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}