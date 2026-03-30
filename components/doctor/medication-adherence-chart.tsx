'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { medicationAdherenceData } from '@/lib/mock-data';

export function MedicationAdherenceChart() {
  return (
    <div className="w-full h-[300px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={medicationAdherenceData} 
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
        >
          {/* Subtle horizontal-only grid lines */}
          <CartesianGrid 
            strokeDasharray="4 4" 
            vertical={false} 
            stroke="#e2e8f0" 
          />
          
          {/* Clean X Axis with no harsh solid line */}
          <XAxis 
            dataKey="patient" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          
          {/* Clean Y Axis */}
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            domain={[0, 100]}
          />
          
          {/* Premium Light-Mode Tooltip */}
          <Tooltip
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              color: '#0f172a',
              fontWeight: 600,
              padding: '8px 12px'
            }}
            itemStyle={{ color: '#0d9488' }}
            formatter={(value) => [`${value}%`, 'Adherence']}
          />
          
          {/* CareBridge Brand Teal Gradient */}
          <defs>
            <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" />   {/* Tailwind teal-600 */}
              <stop offset="100%" stopColor="#5eead4" /> {/* Tailwind teal-300 */}
            </linearGradient>
          </defs>
          
          <Bar
            dataKey="adherence"
            fill="url(#tealGradient)"
            radius={[6, 6, 0, 0]}
            animationDuration={1500}
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}