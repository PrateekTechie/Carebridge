import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatusOverviewProps {
  recoveryProgress: number;
  daysSinceDays: number;
}

export function StatusOverview({ recoveryProgress, daysSinceDays }: StatusOverviewProps) {
  const estimatedDaysRemaining = Math.ceil((100 - recoveryProgress) / 5);

  return (
    <Card className="card-hover bg-gradient-to-br from-primary/10 via-secondary/10 to-white dark:from-primary/20 dark:via-secondary/20 dark:to-slate-900 border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl">Your Recovery Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Circle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-200 dark:text-slate-700"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(recoveryProgress / 100) * 283} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                    <stop offset="100%" stopColor="rgb(168, 85, 247)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{recoveryProgress}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Days Since Discharge</p>
                <p className="text-2xl font-bold">{daysSinceDays} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Time Left</p>
                <p className="text-2xl font-bold text-primary">{estimatedDaysRemaining} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50">
          <p className="text-sm font-semibold text-green-900 dark:text-green-300">
            ✓ You&apos;re on track! Keep following your recovery plan.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-center">
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-xs text-muted-foreground">Milestones Reached</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 text-center">
            <p className="text-2xl font-bold text-secondary">12</p>
            <p className="text-xs text-muted-foreground">Days Streak</p>
          </div>
          <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-950/20 text-center">
            <p className="text-2xl font-bold text-accent">85%</p>
            <p className="text-xs text-muted-foreground">Adherence</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
