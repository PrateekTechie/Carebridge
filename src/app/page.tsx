import Link from 'next/link';
import { 
  Activity, 
  ArrowRight, 
  Mic, 
  ShieldCheck, 
  Video, 
  LineChart,
  MessageCircle,
  Briefcase,
  Code,
  CheckCircle2,
  Mail, // <-- Add this
  Shield // <-- Add this
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-teal-100 selection:text-teal-900 flex flex-col">
      
      {/* 1. Glassmorphic SaaS Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-teal-600">
              <Activity size={24} strokeWidth={2.5} />
              <span className="font-extrabold text-xl tracking-tight text-slate-900">RecoverAI</span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
              <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-teal-600 transition-colors">How it Works</a>
              <a href="#security" className="hover:text-teal-600 transition-colors">Security</a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/patients" className="text-sm font-semibold text-slate-600 hover:text-slate-900 hidden sm:block">
                Patient Login
              </Link>
              <Link 
                href="/doctor" 
                className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all hover:shadow-md"
              >
                Provider Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Centered SaaS Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Glowing Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-100/50 rounded-full blur-3xl -z-10 opacity-70"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
            Version 1.0 Live Prototype
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Post-discharge care, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              automated by voice AI.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate the hospital-to-home care gap. CareBridge interacts with patients daily via voice, catching complications days before they become costly readmissions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/doctor" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Try Provider Dashboard <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-teal-500 hover:text-teal-600 hover:-translate-y-0.5 shadow-sm transition-all"
            >
              Simulate Patient App
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SaaS Abstract Product Mockup */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 relative z-10">
        <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm p-2 shadow-2xl">
          <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
            {/* Mockup Header */}
            <div className="h-12 bg-white border-b border-slate-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            {/* Mockup Body */}
            <div className="p-8 grid md:grid-cols-3 gap-6 opacity-80">
              <div className="h-32 rounded-lg border border-slate-200 bg-white p-4 flex flex-col justify-between">
                <div className="w-24 h-4 bg-slate-200 rounded-full"></div>
                <div className="w-12 h-8 bg-teal-100 rounded-lg"></div>
              </div>
              <div className="h-32 rounded-lg border border-slate-200 bg-white p-4 flex flex-col justify-between">
                 <div className="w-32 h-4 bg-slate-200 rounded-full"></div>
                 <div className="w-16 h-8 bg-red-100 rounded-lg"></div>
              </div>
              <div className="h-32 rounded-lg border border-slate-200 bg-white p-4 flex flex-col justify-between">
                 <div className="w-20 h-4 bg-slate-200 rounded-full"></div>
                 <div className="w-14 h-8 bg-blue-100 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Everything you need to scale care</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 border border-teal-100">
              <Mic size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Voice-First AI</h3>
            <p className="text-slate-500 leading-relaxed">Elderly patients don't need to navigate complex UIs. They simply talk to the app as if they were speaking to a nurse.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 border border-blue-100">
              <LineChart size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Predictive Alerts</h3>
            <p className="text-slate-500 leading-relaxed">NLP algorithms parse daily sentiment and pain scales, instantly escalating files to the dashboard if deterioration is detected.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 border border-indigo-100">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Live Telehealth</h3>
            <p className="text-slate-500 leading-relaxed">Integrated WebRTC means doctors can instantly convert a critical alert into a secure video consultation with one click.</p>
          </div>
        </div>
      </section>

      {/* 5. Clean SaaS Footer */}
      {/* 5. Enterprise SaaS Footer */}
      <footer className="bg-[#0B1120] text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Section: Newsletter & Brand */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-800">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 text-white">
                <Activity size={28} className="text-teal-500" strokeWidth={2.5} />
                <span className="font-extrabold text-2xl tracking-tight">CareBridge</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                The first voice-native AI care companion. We bridge the gap between hospital discharge and full home recovery, ensuring no patient is left unmonitored.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/50 border border-slate-700 text-xs font-semibold text-slate-300">
                  <Shield size={14} className="text-teal-500" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/50 border border-slate-700 text-xs font-semibold text-slate-300">
                  <ShieldCheck size={14} className="text-blue-500" />
                  SOC2 Type II
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Voice AI Engine</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Telehealth Portal</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Predictive Analytics</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">EHR Integration</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Clinical Studies</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Patient Guide</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">API Documentation</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Stay Updated</h3>
              <p className="text-sm text-slate-400 mb-4">Get the latest news on AI in healthcare.</p>
              <form className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </form>
            </div>
          </div>

          {/* Bottom Section: Legal & Social */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500 font-medium flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span>&copy; {new Date().getFullYear()} CareBridge AI. All rights reserved.</span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span>Crafted by <span className="text-slate-300">The Exceptions</span></span>
            </div>
            
            <div className="flex gap-5">
              <a href="#" className="text-slate-500 hover:text-white transition-all hover:-translate-y-1" title="Community">
                <span className="sr-only">Community</span>
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-all hover:-translate-y-1" title="LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <Briefcase size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-all hover:-translate-y-1" title="GitHub">
                <span className="sr-only">GitHub</span>
                <Code size={20} />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}