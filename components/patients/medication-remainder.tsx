import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Medication } from '@/lib/mock-data';

interface MedicationRemindersProps {
  medications: Medication[];
}

export function MedicationReminders({ medications }: MedicationRemindersProps) {
  const getTimeUntilNextDose = (nextTime: string) => {
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

  return (
    <Card className="card-hover bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader>
        <CardTitle>Medication Reminders</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {medications.map((med) => (
          <div key={med.id} className="p-4 rounded-lg border border-border bg-white dark:bg-slate-800/50">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{med.name}</h4>
                  <p className="text-sm text-muted-foreground">{med.dosage}</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {med.frequency}
                </Badge>
              </div>

              {/* Schedule */}
              <div className="space-y-2">
                {med.schedule.map((slot, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={slot.taken ? '✓' : '○'}>
                        {slot.taken ? '✓' : '○'}
                      </span>
                      <span className={slot.taken ? 'text-muted-foreground line-through' : ''}>
                        {slot.time}
                      </span>
                    </div>
                    {!slot.taken && (
                      <span className="text-xs text-primary font-semibold">
                        {getTimeUntilNextDose(slot.time)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Take Now Button */}
              {med.schedule.some((s) => !s.taken) && (
                <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-2">
                  Take Now
                </Button>
              )}

              {/* Last Dose Info */}
              {med.lastDose && (
                <p className="text-xs text-muted-foreground">
                  Last dose: {new Date(med.lastDose).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
