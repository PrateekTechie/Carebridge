import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimelineEvent } from '@/lib/mock-data';

interface ProgressTimelineProps {
  events: TimelineEvent[];
}

const typeIcons: Record<string, string> = {
  discharge: '🏥',
  milestone: '🎯',
  followup: '📅',
  event: '📌',
};

const typeColors: Record<string, { bg: string; text: string }> = {
  discharge: { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300' },
  milestone: { bg: 'bg-green-100 dark:bg-green-950', text: 'text-green-700 dark:text-green-300' },
  followup: { bg: 'bg-purple-100 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-300' },
  event: { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-700 dark:text-gray-300' },
};

export function ProgressTimeline({ events }: ProgressTimelineProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card className="card-hover bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader>
        <CardTitle>Recovery Timeline</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-0">
          {events.map((event, index) => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            const isCompleted = event.completed || eventDate < today;
            const isCurrent = eventDate.getTime() === today.getTime();

            return (
              <div key={event.id} className="flex gap-4 pb-6 relative">
                {/* Timeline Line */}
                {index < events.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 w-0.5 h-12 ${
                      isCompleted ? 'bg-primary' : 'bg-border'
                    } transition-colors`}
                  />
                )}

                {/* Icon Circle */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                    isCompleted
                      ? 'bg-primary text-white'
                      : isCurrent
                        ? 'bg-primary/20 text-primary border-2 border-primary'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                  }`}
                >
                  {isCompleted ? '✓' : typeIcons[event.type]}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    {isCurrent && (
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-primary text-white rounded">
                        Today
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    {eventDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>

                  {event.description && (
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  )}

                  <div
                    className={`inline-block mt-2 px-3 py-1 rounded text-xs font-medium ${typeColors[event.type].bg} ${typeColors[event.type].text}`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
