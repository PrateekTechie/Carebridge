'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { medicationAdherenceData } from '@/lib/mock-data';

export function MedicationAdherenceChart() {
  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader>
        <CardTitle>Medication Adherence</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={medicationAdherenceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
            <XAxis dataKey="patient" stroke="rgba(107, 114, 128, 0.5)" />
            <YAxis stroke="rgba(107, 114, 128, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '8px',
              }}
              formatter={(value) => [`${value}%`, 'Adherence']}
            />
            <Bar
              dataKey="adherence"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                <stop offset="100%" stopColor="rgb(167, 139, 250)" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
