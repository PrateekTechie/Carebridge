'use client';

import { 
  Activity, 
  Heart, 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  User, 
  FileText, 
  HelpCircle, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { mockPatients, mockAlerts } from '@/lib/mock-data';

export default function CaregiverPage() {
  const patient = mockPatients[0]; // Monitoring first patient
  const patientAlerts = mockAlerts.filter((a) => a.patientId === patient.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12 selection:bg-rose-100 selection:text-rose-900">
      
      {/* 1. Glassmorphic Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-16 flex justify-between items-center max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-rose-500">
              <Heart size={24} strokeWidth={2.5} className="fill-rose-500/20" />
              <span className="text-xl font-extrabold tracking-tight text-slate-900">CareBridge</span>
            </div>
            <span className="hidden sm:block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
              Family Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <User size={18} /> <span className="hidden sm:inline">My Account</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Reassuring Welcome Hero */}
      <div className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-10">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-green-700 tracking-wide uppercase">Status: Stable & Improving</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              {patient.name}'s Recovery
            </h1>
            <p className="text-slate-500 md:text-lg">
              {patient.condition} • Day {patient.daysSinceDays} of recovery
            </p>
          </div>
          
          {/* High-Priority Action Buttons */}
          <div className="flex w-full md:w-auto gap-3">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 px-5 py-3 rounded-xl font-semibold transition-colors border border-rose-100">
              <MessageSquare size={18} /> Message
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-teal-600 text-white hover:bg-teal-700 px-5 py-3 rounded-xl font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <Phone size={18} /> Call Doctor
            </button>
          </div>
        </div>
      </div>

      {/* 3. Dashboard Grid */}
      <main className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Progress & Daily Overview (Spans 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main Progress Bento Box */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Overall Progress</h2>
                    <p className="text-sm text-slate-500">Based on clinical milestones</p>
                  </div>
                  <span className="text-4xl font-extrabold text-teal-600">{patient.recoveryProgress}%</span>
                </div>
                
                {/* Beautiful Custom Progress Bar */}
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-8 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full relative"
                    style={{ width: `${patient.recoveryProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Days Since</p>
                    <p className="text-2xl font-bold text-slate-900">{patient.daysSinceDays}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Est. Remaining</p>
                    <p className="text-2xl font-bold text-slate-900">{Math.ceil((100 - patient.recoveryProgress) / 5)}</p>
                  </div>
                  <div className="col-span-2 bg-green-50 p-4 rounded-2xl border border-green-100 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                      <ShieldCheck size={18} /> Clinical Note
                    </div>
                    <p className="text-sm text-green-800 leading-tight">Vitals are responding perfectly to the new medication.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Summary Checklist */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Today's Summary</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                  <div className="mt-0.5"><CheckCircle2 className="text-teal-500" size={24} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Medications Taken</h3>
                    <p className="text-sm text-slate-500 mt-1">All scheduled morning and afternoon doses completed on time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                  <div className="mt-0.5"><CheckCircle2 className="text-teal-500" size={24} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Daily Exercise Completed</h3>
                    <p className="text-sm text-slate-500 mt-1">Completed 30-minute prescribed mobility walk around the house.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                  <div className="mt-0.5"><CheckCircle2 className="text-teal-500" size={24} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Vitals Logged</h3>
                    <p className="text-sm text-slate-500 mt-1">Blood pressure and oxygen levels remain within the healthy target range.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Alerts & Resources (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Emergency Action */}
            <button className="w-full flex items-center justify-between bg-red-50 hover:bg-red-100 border border-red-200 p-4 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3 text-red-700">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <AlertTriangle size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-sm">Emergency Info</h3>
                  <p className="text-xs text-red-600/80">View protocols & contacts</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-red-400" />
            </button>

            {/* Updates Feed */}
            {patientAlerts.length > 0 && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-rose-500"/> Recent Updates
                </h2>
                <div className="space-y-4">
                  {patientAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="relative pl-4 border-l-2 border-slate-100 pb-4 last:pb-0 last:border-transparent">
                      <div className="absolute w-2.5 h-2.5 bg-slate-300 rounded-full -left-[5.5px] top-1.5 border-2 border-white"></div>
                      <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock size={12} /> {alert.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Family Resources */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Support Resources</h2>
              <div className="grid grid-cols-1 gap-3">
                <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50 transition-all group">
                  <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-teal-100 text-slate-500 group-hover:text-teal-600 transition-colors"><FileText size={18} /></div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">Recovery Guide</h4>
                    <p className="text-xs text-slate-500">Diet and mobility tips</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50 transition-all group">
                  <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-teal-100 text-slate-500 group-hover:text-teal-600 transition-colors"><HelpCircle size={18} /></div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">Family FAQ</h4>
                    <p className="text-xs text-slate-500">Common questions</p>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 4. Simple Footer */}
      <footer className="mt-12 py-8 border-t border-slate-200 bg-white text-center">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} CareBridge AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-teal-500"/> HIPAA Compliant</span>
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}