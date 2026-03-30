'use client';

import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';

const commonSymptoms = [
  'Fever',
  'Nausea',
  'Dizziness',
  'Fatigue',
  'Headache',
  'Swelling',
  'Redness',
  'Discharge',
];

export function SymptomForm() {
  const [painLevel, setPainLevel] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  
  // Simulation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // --- HACKATHON MAGIC: CREATE THE ALERT OBJECT ---
      const isCritical = painLevel >= 7 || selectedSymptoms.includes('Fever') || selectedSymptoms.includes('Discharge');
      
      const newAlert = {
        id: `live-alert-${Date.now()}`,
        patientId: "p1",
        patientName: "Sarah Johnson", // Hardcoded to your first mock patient
        type: "vitals",
        priority: isCritical ? "high" : painLevel >= 4 ? "medium" : "low",
        message: `Patient reported symptoms: ${selectedSymptoms.join(', ') || 'None'}. Pain level: ${painLevel}/10. ${notes ? `Notes: ${notes}` : ''}`,
        timestamp: new Date().toISOString(),
        actionRequired: isCritical,
        read: false
      };

      // Pull existing alerts from local storage, add the new one to the front, and save
      const existingAlerts = JSON.parse(localStorage.getItem('carebridge_live_alerts') || '[]');
      localStorage.setItem('carebridge_live_alerts', JSON.stringify([newAlert, ...existingAlerts]));
      
      // Manually trigger a storage event so the doctor dashboard hears it instantly
      window.dispatchEvent(new Event('storage'));
      // ------------------------------------------------

      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setPainLevel(3);
        setSelectedSymptoms([]);
        setNotes('');
      }, 3000);
    }, 1500);
  };

  // Determine pain color based on severity
  const getPainColor = () => {
    if (painLevel <= 3) return 'text-green-500';
    if (painLevel <= 6) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Pain Level Slider */}
      <div className="space-y-4 bg-slate-50 rounded-2xl p-5 border border-slate-100">
        <div className="flex justify-between items-end">
          <label className="font-bold text-slate-700">Pain Level</label>
          <div className="text-right">
            <span className={`text-3xl font-extrabold ${getPainColor()} transition-colors`}>
              {painLevel}
            </span>
            <span className="text-slate-400 font-medium">/10</span>
          </div>
        </div>

        <div className="relative pt-2">
          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-700 transition-all"
          />
        </div>

        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>No Pain</span>
          <span>Severe</span>
        </div>
      </div>

      {/* 2. Tap-Friendly Symptoms Pills */}
      <div className="space-y-3">
        <label className="font-bold text-slate-700">What are you experiencing?</label>
        <div className="flex flex-wrap gap-2.5">
          {commonSymptoms.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border ${
                  isSelected
                    ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/20 scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                {isSelected && <Check size={16} strokeWidth={3} />}
                {symptom}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Notes Area */}
      <div className="space-y-3">
        <label className="font-bold text-slate-700">Additional Notes <span className="text-slate-400 font-normal text-sm">(Optional)</span></label>
        <textarea
          placeholder="Describe any other concerns or observations..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm resize-none"
        />
      </div>

      {/* 4. Submit & Success States */}
      <div className="pt-2">
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-center gap-2 text-green-700 font-bold animate-in zoom-in-95 duration-300">
            <Check size={20} className="text-green-600" />
            Report Sent to Care Team
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-4 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Daily Report
              </>
            )}
          </button>
        )}
      </div>

    </div>
  );
}