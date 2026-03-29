import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert } from '@/lib/mock-data';

interface AlertCardProps {
  alert: Alert;
}

const alertTypeIcons: Record<string, string> = {
  medication: '💊',
  vitals: '❤️',
  recovery: '🏃',
  general: 'ℹ️',
};

const priorityConfig: Record<string, { color: string; label: string }> = {
  high: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: 'High' },
  medium: {
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    label: 'Medium',
  },
  low: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', label: 'Low' },
};

export function AlertCard({ alert }: AlertCardProps) {
  const priorityStyle = priorityConfig[alert.priority];
  const icon = alertTypeIcons[alert.type] || '📌';

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card
      className={`card-hover ${
        alert.actionRequired
          ? 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20'
          : 'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50'
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl">{icon}</span>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{alert.patientName}</h3>
                <Badge className={priorityStyle.color}>{priorityStyle.label}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground/60">{formatTime(alert.timestamp)}</p>
            </div>
          </div>
          {alert.actionRequired && <div className="w-2 h-2 rounded-full bg-red-500 pulse-glow" />}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            Review
          </Button>
          <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
            Take Action
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
