'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { recoveryTrendData } from '@/lib/mock-data';

export function RecoveryTrendsChart() {
  return (
    <div className="w-full h-[300px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={recoveryTrendData}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
        >
          {/* Subtle horizontal-only grid lines */}
          <CartesianGrid 
            strokeDasharray="4 4" 
            vertical={false} 
            stroke="#e2e8f0" 
          />
          
          {/* Clean X Axis */}
          <XAxis 
            dataKey="date" 
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
            formatter={(value) => [`${value}%`, 'Recovery']}
          />
          
          {/* CareBridge Brand Teal Gradient (Left to Right) */}
          <defs>
            <linearGradient id="tealLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2dd4bf" /> {/* Tailwind teal-400 */}
              <stop offset="100%" stopColor="#0d9488" /> {/* Tailwind teal-600 */}
            </linearGradient>
          </defs>
          
          <Line
            type="monotone"
            dataKey="recovery"
            stroke="url(#tealLineGradient)"
            strokeWidth={4}
            dot={{ fill: '#ffffff', stroke: '#0d9488', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#0d9488', stroke: '#ffffff', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}