'use client';
import dynamic from 'next/dynamic';
import { DoctorSidebar } from '@/components/doctor/sidebar-nav';

// 🛑 THE SLEDGEHAMMER FIX: 
// This forces the dashboard to render ONLY on the client browser.
// It instantly cures all hydration mismatches caused by dates, random numbers, or charts.
const DoctorDashboardContent = dynamic(
  () => import('@/components/doctor/dashboard-content').then(mod => mod.DoctorDashboardContent),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex-1 flex items-center justify-center h-full text-slate-400 font-medium">
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-teal-500"></div>
          Loading Dashboard Data...
        </div>
      </div>
    ) 
  }
);

export default function DoctorPage() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar stays fixed on the left */}
      <DoctorSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto relative w-full">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
          
          {/* This is now a pure Client-Side component */}
          <DoctorDashboardContent />
          
        </div>
      </main>
      
    </div>
  );
}