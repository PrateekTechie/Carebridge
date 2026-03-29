'use client';

import { StatCard } from '@/components/shared/stat-card';
import { dashboardStats, mockAlerts, mockPatients } from '@/lib/mock-data';
import { Users, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

export function DoctorStatsOverview() {
  const highRiskPatients = mockPatients.filter((p) => p.riskLevel === 'high').length;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Patients"
        value={dashboardStats.totalPatients}
        icon={<Users className="w-5 h-5" />}
        description="Under your care"
      />
      <StatCard
        title="Critical Alerts"
        value={dashboardStats.activeAlerts}
        icon={<AlertTriangle className="w-5 h-5" />}
        change={
          highRiskPatients > 0 ? Math.round((highRiskPatients / dashboardStats.totalPatients) * 100) : 0
        }
        changeType="negative"
        description={`${highRiskPatients} high risk`}
      />
      <StatCard
        title="Recovery Rate"
        value={`${dashboardStats.recoveryRate}%`}
        icon={<TrendingUp className="w-5 h-5" />}
        change={5}
        changeType="positive"
        description="Average progress"
      />
      <StatCard
        title="Adherence Rate"
        value={`${dashboardStats.adherenceRate}%`}
        icon={<CheckCircle className="w-5 h-5" />}
        change={3}
        changeType="positive"
        description="Medication adherence"
      />
    </div>
  );
}
