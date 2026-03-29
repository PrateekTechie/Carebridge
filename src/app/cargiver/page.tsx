import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge, StatusIndicator } from '@/components/shared/status-badge';
import { mockPatients, mockAlerts } from '@/lib/mock-data';

export const metadata = {
  title: 'Caregiver View - CareBridge AI',
  description: 'Family and support staff patient monitoring dashboard.',
};

export default function CaregiverPage() {
  const patient = mockPatients[0]; // Monitoring first patient
  const patientAlerts = mockAlerts.filter((a) => a.patientId === patient.id);

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold">
                ❤️
              </div>
              <h1 className="text-xl font-bold">CareBridge - Family Care</h1>
            </div>
            <button className="text-muted-foreground hover:text-foreground">👤</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Welcome */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">How is {patient.name} doing?</h1>
          <p className="text-muted-foreground">Stay updated on their recovery journey</p>
        </div>

        {/* Patient Status Card */}
        <Card className="card-hover bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-rose-950/20 dark:via-pink-950/20 dark:to-slate-900 border-rose-200 dark:border-rose-900/50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{patient.condition}</p>
              </div>
              <div className="text-5xl">👤</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recovery Status */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Recovery Progress</span>
                <span className="text-2xl font-bold text-primary">{patient.recoveryProgress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
                  style={{ width: `${patient.recoveryProgress}%` }}
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-center">
                <p className="text-sm text-muted-foreground">Days Since</p>
                <p className="text-2xl font-bold text-primary">{patient.daysSinceDays}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 text-center">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">Stable</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 text-center">
                <p className="text-sm text-muted-foreground">Est. Days</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.ceil((100 - patient.recoveryProgress) / 5)}
                </p>
              </div>
            </div>

            {/* Risk Badge */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50">
              <span className="font-semibold">Current Status</span>
              <div className="flex items-center gap-2">
                <StatusIndicator level={patient.riskLevel} />
                <StatusBadge level={patient.riskLevel} />
              </div>
            </div>

            {/* Supportive Message */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50">
              <p className="text-sm font-semibold text-green-900 dark:text-green-300">
                ✓ Everything is looking good! {patient.name} is progressing well with their recovery.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        {patientAlerts.length > 0 && (
          <Card className="card-hover bg-white dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patientAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <p className="text-sm font-semibold">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="card-hover bg-white dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                📞 Call Doctor
              </Button>
              <Button variant="outline" className="w-full">
                💬 Send Message
              </Button>
              <Button variant="outline" className="w-full text-red-600">
                🚨 Emergency
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Summary */}
        <Card className="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <CardTitle>Today&apos;s Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-sm">Medications Taken</p>
                <p className="text-xs text-muted-foreground">All scheduled doses completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-sm">Daily Exercise</p>
                <p className="text-xs text-muted-foreground">Completed 30-minute walk</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-sm">Vitals Normal</p>
                <p className="text-xs text-muted-foreground">All measurements within range</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="card-hover bg-white dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <a href="#" className="p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <h4 className="font-semibold mb-1">Recovery Guide</h4>
              <p className="text-sm text-muted-foreground">Tips for supporting recovery at home</p>
            </a>
            <a href="#" className="p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <h4 className="font-semibold mb-1">FAQ</h4>
              <p className="text-sm text-muted-foreground">Common questions and answers</p>
            </a>
            <a href="#" className="p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <h4 className="font-semibold mb-1">Contact Doctor</h4>
              <p className="text-sm text-muted-foreground">Reach out to the care team</p>
            </a>
            <a href="#" className="p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <h4 className="font-semibold mb-1">Emergency Info</h4>
              <p className="text-sm text-muted-foreground">Important emergency contacts</p>
            </a>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-4 border-t border-border bg-slate-50 dark:bg-slate-900/50 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 CareBridge AI. All rights reserved. | HIPAA Compliant | Secure Care Network</p>
      </footer>
    </div>
  );
}
