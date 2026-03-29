'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatusOverview } from '@/components/patients/status-overview';
import { RecoveryChecklist } from '@/components/patients/recovery-checklist';
import { MedicationReminders } from '@/components/patients/medication-remainder';
import { ProgressTimeline } from '@/components/patients/progess-timeline';
import { SymptomForm } from '@/components/patients/symtomps-form';
import { AIChat } from '@/components/patients/ai-chats';
import { mockChecklist, mockMedications, mockTimeline, mockPatients } from '@/lib/mock-data';

export default function PatientPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Using first patient as the logged-in patient
  const patient = mockPatients[0];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                🏥
              </div>
              <h1 className="text-xl font-bold">CareBridge</h1>
            </div>

            <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <a href="#recovery" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Recovery
              </a>
              <a href="#checklist" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Checklist
              </a>
              <a href="#medications" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Medications
              </a>
              <a href="#assistant" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Assistant
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden md:block p-2 text-muted-foreground hover:text-foreground">
                🔔
              </button>
              <button className="hidden md:block w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                {patient.name.charAt(0)}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2 pb-4 border-t pt-4">
              <a href="#recovery" className="block text-sm font-medium py-2">
                Recovery
              </a>
              <a href="#checklist" className="block text-sm font-medium py-2">
                Checklist
              </a>
              <a href="#medications" className="block text-sm font-medium py-2">
                Medications
              </a>
              <a href="#assistant" className="block text-sm font-medium py-2">
                Assistant
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Welcome back, {patient.name.split(' ')[0]}</h1>
          <p className="text-muted-foreground">Keep up with your recovery journey</p>
        </div>

        {/* Status Overview */}
        <section id="recovery" className="scroll-mt-20">
          <StatusOverview recoveryProgress={patient.recoveryProgress} daysSinceDays={patient.daysSinceDays} />
        </section>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Checklist and Medications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recovery Checklist */}
            <section id="checklist" className="scroll-mt-20">
              <RecoveryChecklist items={mockChecklist} />
            </section>

            {/* Medication Reminders */}
            <section id="medications" className="scroll-mt-20">
              <MedicationReminders medications={mockMedications} />
            </section>

            {/* Progress Timeline */}
            <section className="scroll-mt-20">
              <ProgressTimeline events={mockTimeline} />
            </section>

            {/* Symptom Form */}
            <section className="scroll-mt-20">
              <SymptomForm />
            </section>
          </div>

          {/* Right Column - AI Chat */}
          <div className="space-y-4">
            <section id="assistant" className="scroll-mt-20 sticky top-24">
              <AIChat />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-4 border-t border-border bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-2">CareBridge AI</h4>
              <p className="text-sm text-muted-foreground">Your personal recovery companion</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Resources</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact Doctor
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CareBridge AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
