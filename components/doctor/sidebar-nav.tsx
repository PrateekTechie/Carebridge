'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/doctor', label: 'Patients', icon: '👥' },
  { href: '/doctor?tab=alerts', label: 'Alerts', icon: '🚨' },
  { href: '/doctor?tab=analytics', label: 'Analytics', icon: '📊' },
  { href: '/doctor?tab=messages', label: 'Messages', icon: '💬' },
];

export function DoctorSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/doctor') {
      return pathname === '/doctor';
    }
    return pathname === '/doctor';
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-primary text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-sidebar border-r border-border transition-transform duration-300 z-30 lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
                🏥
              </div>
              <h1 className="text-xl font-bold text-sidebar-foreground">CareBridge</h1>
            </Link>
          </div>

          {/* User Profile Card */}
          <div className="p-6 border-b border-border">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                👨‍⚕️
              </div>
              <div>
                <p className="font-semibold text-sidebar-foreground">Dr. Michael Smith</p>
                <p className="text-sm text-muted-foreground">Cardiologist</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border space-y-3">
            <Button variant="outline" className="w-full justify-start">
              ⚙️ Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600">
              🚪 Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
