'use client';

import { useState } from 'react';
import { StatusOverview } from '@/components/patients/status-overview';
import { RecoveryChecklist } from '@/components/patients/recovery-checklist';
import { MedicationReminders } from '@/components/patients/medication-remainder';
import { ProgressTimeline } from '@/components/patients/progess-timeline';
import { SymptomForm } from '@/components/patients/symtomps-form';
import { AIChat } from '@/components/patients/ai-chats';
import { mockChecklist, mockMedications, mockTimeline, mockPatients } from '@/lib/mock-data';
import { Activity, Bell, Menu, X, Phone, ShieldCheck } from 'lucide-react';

export default function PatientPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Using first patient as the logged-in patient
  const patient = mockPatients[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 font-sans pb-12">
      
      {/* 1. Glassmorphic App Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-16 flex justify-between items-center max-w-7xl">
          
          {/* Logo */}
          <div className="flex items-center gap-2 text-teal-600">
            <Activity size={24} strokeWidth={2.5} />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">RecoverAI</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-slate-500">
            <a href="#recovery" className="hover:text-teal-600 transition-colors">Recovery Plan</a>
            <a href="#medications" className="hover:text-teal-600 transition-colors">Medications</a>
            <a href="#timeline" className="hover:text-teal-600 transition-colors">Timeline</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <Bell size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold shadow-inner">
                {patient.name.charAt(0)}
              </div>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg absolute w-full left-0 top-16">
            <a href="#recovery" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Recovery Plan</a>
            <a href="#medications" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Medications</a>
            <a href="#timeline" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Timeline</a>
          </nav>
        )}
      </header>

      {/* 2. Welcome Banner */}
      <div className="bg-teal-600 text-white">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/30 text-teal-50 text-xs font-semibold tracking-wide mb-3">
              <ShieldCheck size={14} /> Secured Patient Portal
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
              Good morning, {patient.name.split(' ')[0]}.
            </h1>
            <p className="text-teal-100 md:text-lg">You are on Day {patient.daysSinceDays || '4'} of your recovery journey. Keep it up!</p>
          </div>
          
          <button className="flex items-center gap-2 bg-white text-teal-700 px-5 py-3 rounded-xl font-bold shadow-sm hover:bg-teal-50 transition-colors">
            <Phone size={18} /> Call Doctor
          </button>
        </div>
      </div>

      {/* 3. Main Dashboard Layout (CSS Grid) */}
      <main className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Medical Data (Spans 8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            <section id="recovery" className="scroll-mt-24">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <StatusOverview recoveryProgress={patient.recoveryProgress} daysSinceDays={patient.daysSinceDays} />
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section id="checklist" className="scroll-mt-24">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Daily Checklist</h3>
                  <RecoveryChecklist items={mockChecklist} />
                </div>
              </section>

              <section id="medications" className="scroll-mt-24">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full bg-gradient-to-br from-white to-blue-50/30">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Medications</h3>
                  <MedicationReminders medications={mockMedications} />
                </div>
              </section>
            </div>

            <section id="timeline" className="scroll-mt-24">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Recovery Timeline</h3>
                <ProgressTimeline events={mockTimeline} />
              </div>
            </section>

            <section id="symptoms" className="scroll-mt-24">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Report a Symptom</h3>
                <SymptomForm />
              </div>
            </section>
          </div>

          {/* Right Column: AI Assistant (Spans 4 columns, Sticky) */}
          <div className="lg:col-span-4 relative">
            {/* Notice how we removed all the redundant UI wrappers here!
              We just give it the exact sticky height it needs, and let the 
              new AIChat component handle its own beautiful styling.
            */}
            <div className="sticky top-24 h-[600px] lg:h-[calc(100vh-8rem)]">
              <AIChat />
            </div>
          </div>

        </div>
      </main>

      {/* 4. Minimal Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Activity size={18} />
            <span className="text-sm font-semibold tracking-tight">CareBridge Patient Portal</span>
          </div>
          <div className="text-sm text-slate-400 flex gap-6">
            <a href="#" className="hover:text-teal-600 transition-colors">Help Center</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Log Out</a>
          </div>
        </div>
      </footer>

    </div>
  );
}