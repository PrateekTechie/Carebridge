'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

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
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Card className="card-hover bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader>
        <CardTitle>Report Your Symptoms</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Help us monitor your recovery by reporting how you feel
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pain Level Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-sm">Pain Level</label>
            <span className="text-2xl font-bold text-primary">{painLevel}/10</span>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>No Pain</span>
            <span>Severe Pain</span>
          </div>
        </div>

        {/* Symptoms Checklist */}
        <div className="space-y-3">
          <label className="font-semibold text-sm">Symptoms (Select All That Apply)</label>

          <div className="grid grid-cols-2 gap-3">
            {commonSymptoms.map((symptom) => (
              <label
                key={symptom}
                className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
              >
                <Checkbox
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                />
                <span className="text-sm">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="font-semibold text-sm">Additional Notes (Optional)</label>
          <Textarea
            placeholder="Describe how you're feeling, any concerns, or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-24 resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-white"
          disabled={submitted}
        >
          {submitted ? '✓ Report Submitted' : 'Submit Report'}
        </Button>

        {submitted && (
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50">
            <p className="text-sm font-semibold text-green-900 dark:text-green-300">
              Thank you! Your report has been sent to your care team.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
