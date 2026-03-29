'use client';

import { useState } from 'react';
import { PatientCard } from './patients-card';
import { AlertCard } from './alert-card';
import { DoctorStatsOverview } from './states-overview';
import { RecoveryTrendsChart } from './recover-trend-chart';
import { MedicationAdherenceChart } from './medication-adherence-chart';
import { mockPatients, mockAlerts } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DoctorDashboardContent() {
  const [activeTab, setActiveTab] = useState('patients');

  const criticalAlerts = mockAlerts.filter((a) => a.actionRequired);

  return (
    <div className="flex-1 lg:ml-0 p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Bar with Stats */}
      <DoctorStatsOverview />

      {/* Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚨</span>
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-300">
                {criticalAlerts.length} Critical Alert{criticalAlerts.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-red-800 dark:text-red-400">
                Action required for {criticalAlerts.length} patient{criticalAlerts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-xs grid-cols-4 bg-slate-100 dark:bg-slate-800">
          <TabsTrigger value="patients" className="text-xs md:text-sm">
            Patients
          </TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs md:text-sm">
            Alerts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="messages" className="text-xs md:text-sm">
            Messages
          </TabsTrigger>
        </TabsList>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Patients</h2>
              <span className="text-sm text-muted-foreground">{mockPatients.length} total</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Alerts</h2>
              <select className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
                <option>All Priority</option>
                <option>High Only</option>
                <option>Medium Only</option>
                <option>Low Only</option>
              </select>
            </div>

            <div className="grid gap-3">
              {mockAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recovery Analytics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <RecoveryTrendsChart />
              <MedicationAdherenceChart />
            </div>

            <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-900/50">
              <h3 className="font-bold text-lg mb-3">Key Insights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">📊</span>
                  <span>
                    Average recovery progress is 72%, up 5% from last week
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">💊</span>
                  <span>
                    Medication adherence is at 85%, with 1 patient below 70%
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">⚠️</span>
                  <span>
                    1 patient requires immediate attention for vital signs
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Messages</h2>

            <div className="grid md:grid-cols-3 gap-6 h-96">
              {/* Message List */}
              <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-1 p-2">
                  {mockPatients.slice(0, 3).map((patient) => (
                    <div
                      key={patient.id}
                      className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer transition"
                    >
                      <p className="font-semibold text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        How is your recovery going?
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Thread */}
              <div className="md:col-span-2 border rounded-lg flex flex-col">
                <div className="p-4 border-b bg-slate-50 dark:bg-slate-900/50">
                  <h3 className="font-bold">{mockPatients[0].name}</h3>
                  <p className="text-xs text-muted-foreground">Last message: 2 hours ago</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex justify-start">
                    <div className="max-w-xs p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <p className="text-sm">Hi Doctor, how am I doing?</p>
                      <p className="text-xs text-muted-foreground mt-1">2h ago</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-xs p-3 rounded-lg bg-primary text-white">
                      <p className="text-sm">You&apos;re progressing well! Keep up with the exercises.</p>
                      <p className="text-xs opacity-75 mt-1">1h ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  />
                  <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
