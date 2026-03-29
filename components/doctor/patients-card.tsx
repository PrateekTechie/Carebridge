import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge, StatusIndicator } from '@/components/shared/status-badge';
import { Patient } from '@/lib/mock-data';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <Card className="card-hover h-full flex flex-col bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <CardTitle className="text-lg">{patient.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{patient.condition}</p>
          </div>
          <div className="text-2xl">👤</div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Status and Risk */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <StatusIndicator level={patient.riskLevel} />
            <span className="text-sm text-muted-foreground">
              {new Date(patient.admissionDate).toLocaleDateString()}
            </span>
          </div>
          <StatusBadge level={patient.riskLevel} pulse={patient.riskLevel === 'high'} />
        </div>

        {/* Recovery Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Recovery</span>
            <span className="font-bold text-primary">{patient.recoveryProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${patient.recoveryProgress}%` }}
            />
          </div>
        </div>

        {/* Days Info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900/50">
            <p className="text-muted-foreground text-xs">Days Since</p>
            <p className="font-semibold">{patient.daysSinceDays}d</p>
          </div>
          <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900/50">
            <p className="text-muted-foreground text-xs">Est. Recovery</p>
            <p className="font-semibold">{Math.ceil((100 - patient.recoveryProgress) / 5)}d</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <Button size="sm" variant="outline" className="text-xs">
            View Details
          </Button>
          <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
