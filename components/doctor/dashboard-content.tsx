'use client';
import { PatientCard } from './patients-card';
import { AlertCard } from '@/components/doctor/alert-card';
import { DoctorStatsOverview } from './states-overview';
import { RecoveryTrendsChart } from './recover-trend-chart';
import { MedicationAdherenceChart } from './medication-adherence-chart';
import { mockPatients, mockAlerts } from '@/lib/mock-data';
import { 
  BellRing, 
  Users, 
  Activity, 
  MessageSquare, 
  TrendingUp, 
  Pill, 
  AlertTriangle,
  Send,
  Search,
  Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
export function DoctorDashboardContent() {
  const [activeTab, setActiveTab] = useState('patients');
  
  // --- HACKATHON MAGIC: LIVE SYNC STATE ---
  const [liveAlerts, setLiveAlerts] = useState(mockAlerts);

  useEffect(() => {
    const syncAlerts = () => {
      // Check local storage for new alerts submitted by the patient
      const saved = localStorage.getItem('carebridge_live_alerts');
      if (saved) {
        const parsedSaved = JSON.parse(saved);
        // Combine the live alerts with your mock alerts!
        setLiveAlerts([...parsedSaved, ...mockAlerts]);
      } else {
        setLiveAlerts(mockAlerts);
      }
    };

    syncAlerts(); // Run once on load
    
    // Listen for changes across tabs
    window.addEventListener('storage', syncAlerts);
    
    // Fallback polling every 1 second (guarantees it shows up on screen instantly)
    const interval = setInterval(syncAlerts, 1000); 

    return () => {
      window.removeEventListener('storage', syncAlerts);
      clearInterval(interval);
    };
  }, []);
  // ----------------------------------------

  // Calculate critical alerts using the NEW liveAlerts state
  const criticalAlerts = mockAlerts.filter((a) => a.actionRequired);


  return (
    <div className="flex-1 w-full space-y-8 pb-12">
      
      {/* 1. Top Bar with Stats */}
      <DoctorStatsOverview />

      {/* 2. Critical Action Banner (Refined to not bleed over edges) */}
      {criticalAlerts.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-white border border-red-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-[0_8px_30px_rgb(239,68,68,0.08)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-500 transition-all group-hover:w-3"></div>
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="shrink-0 w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 relative">
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-white"></span>
              </span>
              <BellRing size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
                {criticalAlerts.length} Critical Alert{criticalAlerts.length !== 1 ? 's' : ''} Require Attention
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                Immediate clinical review required for <span className="text-red-600 font-bold">{criticalAlerts.length} patient{criticalAlerts.length !== 1 ? 's' : ''}</span>.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('alerts')}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            Review Alerts Now
          </button>
        </div>
      )}

      {/* 3. Custom Segmented Control (Tabs - Fixed overflow and wrapping) */}
      <div className="bg-white p-1.5 rounded-2xl flex flex-wrap sm:flex-nowrap gap-1 border border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveTab('patients')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeTab === 'patients' ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-100/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <Users size={18} /> Roster
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeTab === 'alerts' ? 'bg-red-50 text-red-700 shadow-sm border border-red-100/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <BellRing size={18} /> Alerts
          {criticalAlerts.length > 0 && (
            <span className="bg-red-500 text-white text-[11px] px-2 py-0.5 rounded-full ml-1 shadow-sm">{criticalAlerts.length}</span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <Activity size={18} /> Analytics
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeTab === 'messages' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <MessageSquare size={18} /> Messages
        </button>
      </div>

      {/* 4. Tab Contents */}
      <div className="mt-8">
        
        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Active Patients</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Managing {mockPatients.length} total post-operative files.</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or ID..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm shadow-sm transition-all"
                />
              </div>
            </div>
            {/* Added larger gap to prevent overlapping cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Live Alerts Feed</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">AI-triaged patient events requiring review.</p>
              </div>
              <select className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                <option>Filter: All Priority</option>
                <option>Critical Only</option>
                <option>Medium Priority</option>
              </select>
            </div>
            <div className="grid gap-5">
              {liveAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Ward Analytics</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Macro-level recovery trends across all active patients.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="p-1.5 bg-teal-50 text-teal-600 rounded-lg"><TrendingUp size={20}/></span> 
                  Recovery Trajectories
                </h3>
                <RecoveryTrendsChart />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Pill size={20}/></span> 
                  Medication Adherence
                </h3>
                <MedicationAdherenceChart />
              </div>
            </div>

            {/* AI Insights Bento Box - Fixed Overflow */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl border border-slate-800">
              {/* Contained gradients */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs font-bold uppercase tracking-wider text-teal-300">
                    <Sparkles size={14} /> CareBridge AI
                  </span>
                </div>
                <h3 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-8">Automated Ward Insights</h3>
                
                <div className="grid md:grid-cols-3 gap-5">
                  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                      <TrendingUp size={20} className="text-teal-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                      Average recovery progress is <span className="text-white font-bold">72%</span>, up 5% from last week's cohort.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                      <Pill size={20} className="text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                      Medication adherence is stable at <span className="text-white font-bold">85%</span>. 1 patient requires counseling.
                    </p>
                  </div>
                  <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 p-6 rounded-2xl hover:bg-red-500/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                      <AlertTriangle size={20} className="text-red-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                      <span className="text-white font-bold">1 patient</span> requires immediate clinical attention for deteriorating vitals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab - Completely rebuilt to prevent overlapping corners */}
        {activeTab === 'messages' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6">Secure Messaging</h2>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
              
              {/* Message Sidebar */}
              <div className="w-full md:w-[320px] shrink-0 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 flex flex-col">
                <div className="p-5 border-b border-slate-200 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search conversations..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors" 
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {mockPatients.slice(0, 3).map((patient, idx) => (
                    <div key={patient.id} className={`p-5 cursor-pointer transition-colors border-b border-slate-100 ${idx === 0 ? 'bg-indigo-50/50 border-l-4 border-l-indigo-500' : 'hover:bg-white border-l-4 border-l-transparent'}`}>
                      <div className="flex justify-between items-start mb-1.5">
                        <p className={`font-bold text-sm ${idx === 0 ? 'text-indigo-900' : 'text-slate-900'}`}>{patient.name}</p>
                        <span className={`text-[11px] font-bold ${idx === 0 ? 'text-indigo-500' : 'text-slate-400'}`}>2h ago</span>
                      </div>
                      <p className={`text-xs truncate ${idx === 0 ? 'text-indigo-700 font-medium' : 'text-slate-500'}`}>Hi Doctor, how am I doing today?</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-extrabold text-lg">
                      {mockPatients[0].name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900">{mockPatients[0].name}</h3>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Active on Patient Portal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                  <div className="flex justify-start">
                    <div className="max-w-[85%] md:max-w-md p-5 rounded-2xl rounded-tl-sm bg-white border border-slate-200 shadow-sm">
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">Hi Doctor, I've been feeling a bit of stiffness in my knee this morning. Is that normal for Day 4?</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">Today, 8:42 AM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-[85%] md:max-w-md p-5 rounded-2xl rounded-tr-sm bg-indigo-600 text-white shadow-md">
                      <p className="text-sm font-medium leading-relaxed">Hi {mockPatients[0].name.split(' ')[0]}. Yes, mild stiffness is completely normal on Day 4. Make sure you are doing the gentle stretching exercises the AI assigned you. I'll review your vitals this afternoon.</p>
                      <p className="text-[10px] font-bold text-indigo-200 mt-3 uppercase tracking-wider">Today, 9:15 AM</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-5 border-t border-slate-200 bg-white">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type a secure medical message..."
                      className="flex-1 px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                    />
                    <button className="px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm flex items-center gap-2">
                      <Send size={18} /> <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}