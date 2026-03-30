'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Activity, 
  Users, 
  BellRing, 
  LineChart, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { href: '/doctor', tab: null, label: 'Patients roster', icon: <Users size={20} /> },
  { href: '/doctor?tab=alerts', tab: 'alerts', label: 'Alerts feed', icon: <BellRing size={20} /> },
  { href: '/doctor?tab=analytics', tab: 'analytics', label: 'Analytics', icon: <LineChart size={20} /> },
  { href: '/doctor?tab=messages', tab: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
];

// 1. Extract the navigation logic into a sub-component to safely use useSearchParams
function SidebarLinks({ closeSidebar }: { closeSidebar: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  const isActive = (itemTab: string | null) => {
    if (pathname !== '/doctor') return false;
    return currentTab === itemTab;
  };

  return (
    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
      <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Main Menu</p>
      {navItems.map((item) => {
        const active = isActive(item.tab);
        return (
          <Link key={item.href} href={item.href} onClick={closeSidebar}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? 'bg-teal-50 text-teal-700 font-bold'
                  : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className={`${active ? 'text-teal-600' : 'text-slate-400'}`}>
                {item.icon}
              </div>
              {item.label}
              {item.tab === 'messages' && !active && (
                <span className="ml-auto w-2 h-2 rounded-full bg-teal-500"></span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

// 2. Main Sidebar Component
export function DoctorSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button - Bumped to z-[60] so it's always on top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-xl bg-slate-900 text-white shadow-lg border border-slate-700 transition-transform active:scale-95"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile - Set strictly to z-40 */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar - Set strictly to z-50 and added shrink-0 */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[280px] shrink-0 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header & Logo */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-teal-600">
            <Activity size={28} strokeWidth={2.5} />
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">CareBridge</h1>
          </Link>
        </div>

        {/* Doctor Profile Snippet */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
              MS
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900 leading-tight">Dr. Michael Smith</p>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Orthopedics</p>
            </div>
          </div>
        </div>

        {/* 3. Wrap the links in a Suspense boundary to prevent Next.js crashes */}
        <Suspense fallback={<div className="flex-1 px-8 py-4 text-sm text-slate-400 font-medium">Loading menu...</div>}>
          <SidebarLinks closeSidebar={() => setIsOpen(false)} />
        </Suspense>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Settings size={20} className="text-slate-400" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors">
            <LogOut size={20} className="text-red-400" />
            Sign Out
          </button>
        </div>
        
      </aside>
    </>
  );
}