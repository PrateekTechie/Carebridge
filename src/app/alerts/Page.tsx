import { DoctorSidebar } from '@/components/doctor/sidebar-nav';
import { AlertCard } from '@/components/doctor/alert-card';
import { mockAlerts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Alerts - CareBridge AI',
  description: 'View and manage patient alerts and critical notifications.',
};

export default function AlertsPage() {
  const sortedAlerts = [...mockAlerts].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const alertsByPriority = {
    high: sortedAlerts.filter((a) => a.priority === 'high'),
    medium: sortedAlerts.filter((a) => a.priority === 'medium'),
    low: sortedAlerts.filter((a) => a.priority === 'low'),
  };

  return (
    <div className="flex min-h-screen bg-gradient-bg">
      <DoctorSidebar />

      <div className="flex-1 lg:ml-0 p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Alerts Management</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage all patient alerts</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                🔔 Mark all as read
              </Button>
              <Button variant="outline" size="sm">
                ⚙️ Filter
              </Button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50">
              <div className="text-sm text-red-600 dark:text-red-400">High Priority</div>
              <div className="text-3xl font-bold text-red-700">{alertsByPriority.high.length}</div>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50">
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Medium Priority</div>
              <div className="text-3xl font-bold text-yellow-700">{alertsByPriority.medium.length}</div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50">
              <div className="text-sm text-blue-600 dark:text-blue-400">Low Priority</div>
              <div className="text-3xl font-bold text-blue-700">{alertsByPriority.low.length}</div>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50">
              <div className="text-sm text-green-600 dark:text-green-400">Action Required</div>
              <div className="text-3xl font-bold text-green-700">
                {sortedAlerts.filter((a) => a.actionRequired).length}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts by Priority */}
        <div className="space-y-8">
          {/* High Priority */}
          {alertsByPriority.high.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                High Priority ({alertsByPriority.high.length})
              </h2>
              <div className="space-y-3">
                {alertsByPriority.high.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Medium Priority */}
          {alertsByPriority.medium.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                Medium Priority ({alertsByPriority.medium.length})
              </h2>
              <div className="space-y-3">
                {alertsByPriority.medium.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Low Priority */}
          {alertsByPriority.low.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Low Priority ({alertsByPriority.low.length})
              </h2>
              <div className="space-y-3">
                {alertsByPriority.low.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
