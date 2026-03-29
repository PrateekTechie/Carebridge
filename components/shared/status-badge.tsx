import { Badge } from '@/components/ui/badge';

export type RiskLevel = 'low' | 'medium' | 'high';
export type StatusType = 'healthy' | 'caution' | 'critical';

interface StatusBadgeProps {
  level: RiskLevel | StatusType;
  label?: string;
  pulse?: boolean;
}

export function StatusBadge({ level, label, pulse = false }: StatusBadgeProps) {
  const config: Record<string, { variant: 'default' | 'secondary' | 'destructive'; label: string }> = {
    low: { variant: 'secondary', label: 'Low Risk' },
    medium: { variant: 'secondary', label: 'Medium Risk' },
    high: { variant: 'destructive', label: 'High Risk' },
    healthy: { variant: 'secondary', label: 'Healthy' },
    caution: { variant: 'secondary', label: 'Caution' },
    critical: { variant: 'destructive', label: 'Critical' },
  };

  const { variant, label: defaultLabel } = config[level] || config.low;
  const displayLabel = label || defaultLabel;

  return (
    <Badge
      variant={variant}
      className={`${
        level === 'high' || level === 'critical'
          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          : level === 'medium' || level === 'caution'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      } ${pulse && (level === 'high' || level === 'critical') ? 'animate-pulse' : ''}`}
    >
      {displayLabel}
    </Badge>
  );
}

export function StatusIndicator({ level }: { level: RiskLevel | StatusType }) {
  const colorMap: Record<string, string> = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
    healthy: 'bg-green-500',
    caution: 'bg-yellow-500',
    critical: 'bg-red-500',
  };

  const isActive = level === 'high' || level === 'critical';

  return (
    <div className="relative inline-block">
      <div
        className={`relative inline-block w-2 h-2 rounded-full ${colorMap[level]} ${
          isActive ? 'pulse-glow' : ''
        }`}
      />
    </div>
  );
}
