import { DoctorSidebar } from '@/components/doctor/sidebar-nav';
import { DoctorDashboardContent } from '@/components/doctor/dashboard-content';

export const metadata = {
  title: 'Doctor Dashboard - CareBridge AI',
  description: 'Manage your patients, monitor alerts, and track recovery progress.',
};

export default function DoctorPage() {
  return (
    <div className="flex min-h-screen bg-gradient-bg">
      <DoctorSidebar />
      <DoctorDashboardContent />
    </div>
  );
}
