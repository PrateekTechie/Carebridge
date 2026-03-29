'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { recoveryTrendData } from '@/lib/mock-data';

export function RecoveryTrendsChart() {
  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader>
        <CardTitle>Recovery Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={recoveryTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
            <XAxis dataKey="date" stroke="rgba(107, 114, 128, 0.5)" />
            <YAxis stroke="rgba(107, 114, 128, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '8px',
              }}
              formatter={(value) => [`${value}%`, 'Recovery']}
            />
            <Line
              type="monotone"
              dataKey="recovery"
              stroke="url(#gradient)"
              strokeWidth={3}
              dot={{ fill: 'rgb(99, 102, 241)', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                <stop offset="100%" stopColor="rgb(167, 139, 250)" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
