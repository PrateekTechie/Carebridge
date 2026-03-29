import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  animate?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  description,
  animate = false,
}: StatCardProps) {
  const changeColors: Record<string, string> = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  };

  return (
    <Card className="card-hover bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className={`text-3xl font-bold ${animate ? 'tabular-nums' : ''}`}>{value}</div>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {change !== undefined && (
            <div className={`text-xs font-medium ${changeColors[changeType]}`}>
              {changeType === 'positive' ? '+' : changeType === 'negative' ? '-' : ''}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
