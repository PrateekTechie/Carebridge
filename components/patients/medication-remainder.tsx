'use client';

import { useState, useEffect } from 'react';
import { Pill, CheckCircle2, Circle, Clock } from 'lucide-react';
import { Medication } from '@/lib/mock-data';

interface MedicationRemindersProps {
  medications: Medication[];
}

export function MedicationReminders({ medications }: MedicationRemindersProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // 1. Create a local state copy of the medications so we can update them
  const [localMeds, setLocalMeds] = useState<Medication[]>(medications);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. The simulation function for the hackathon demo
  const handleLogDose = (medId: string) => {
    setLocalMeds(prevMeds => prevMeds.map(med => {
      if (med.id === medId) {
        let doseLogged = false;
        
        // Find the first untaken slot and mark it as taken
        const newSchedule = med.schedule.map(slot => {
          if (!slot.taken && !doseLogged) {
            doseLogged = true;
            return { ...slot, taken: true };
          }
          return slot;
        });

        // Update the medication object with the new schedule and current time
        return {
          ...med,
          schedule: newSchedule,
          lastDose: new Date().toISOString()
        };
      }
      return med;
    }));
  };

  const getTimeUntilNextDose = (nextTime: string) => {
    if (!isMounted) return 'Calculating...'; 

    const [hours, minutes] = nextTime.split(':').map(Number);
    const now = new Date();
    const next = new Date();
    next.setHours(hours, minutes, 0);

    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }

    const diffMs = next.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor((diffMs % 3600000) / 60000);

    return `in ${diffHours}h ${diffMins}m`;
  };

  const formatLastDose = (dateString: string) => {
    if (!isMounted) return '--:--'; 
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {/* 3. Map over localMeds instead of the static medications prop */}
      {localMeds.map((med) => (
        <div 
          key={med.id} 
          className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:border-blue-200 transition-colors group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 opacity-50"></div>

          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                <Pill size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 leading-tight">{med.name}</h4>
                <p className="text-xs font-medium text-slate-500 mt-0.5">{med.dosage}</p>
              </div>
            </div>
            <div className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100">
              {med.frequency}
            </div>
          </div>

          <div className="space-y-2.5 mb-4 border-t border-slate-50 pt-4">
            {med.schedule.map((slot, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm bg-slate-50/50 p-2 rounded-lg">
                <div className="flex items-center gap-2.5">
                  {slot.taken ? (
                    <CheckCircle2 size={18} className="text-teal-500" />
                  ) : (
                    <Circle size={18} className="text-slate-300" />
                  )}
                  <span className={`font-semibold ${slot.taken ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {slot.time}
                  </span>
                </div>
                {!slot.taken && (
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {getTimeUntilNextDose(slot.time)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 4. Wire up the button to the function */}
          {med.schedule.some((s) => !s.taken) && (
            <button 
              onClick={() => handleLogDose(med.id)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 mb-3"
            >
              Log Dose as Taken
            </button>
          )}

          {med.lastDose && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <Clock size={12} />
              Last logged: {formatLastDose(med.lastDose)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}