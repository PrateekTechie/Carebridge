'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Real-time Monitoring',
    description:
      'Track vital signs and recovery progress with continuous monitoring and instant alerts for your healthcare team.',
    icon: '🔍',
  },
  {
    title: 'AI-Powered Insights',
    description:
      'Intelligent analysis predicts complications early and recommends personalized recovery adjustments in real-time.',
    icon: '✨',
  },
  {
    title: 'Patient Engagement',
    description:
      'Empower patients with daily checklists, medication reminders, and AI-assisted guidance for faster recovery.',
    icon: '📱',
  },
];

export function FeatureHighlights() {
  return (
    <section className="w-full py-20 px-4 bg-background relative">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why CareBridge AI?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The complete platform for post-hospital recovery management
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-hover bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 border-0 shadow-lg"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pt-16 border-t border-border">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">For Healthcare Providers</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>Centralized patient dashboard</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>Instant critical alerts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>Recovery analytics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>Secure messaging</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">For Patients</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>Daily recovery checklist</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>Medication reminders</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>AI assistant support</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary text-lg">✓</span>
                <span>Direct care team access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
