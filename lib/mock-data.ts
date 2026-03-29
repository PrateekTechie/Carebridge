import { RiskLevel, StatusType } from '@/components/shared/status-badge';

export interface Patient {
  id: string;
  name: string;
  condition: string;
  admissionDate: string;
  riskLevel: RiskLevel;
  status: StatusType;
  recoveryProgress: number;
  daysSinceDays: number;
  image?: string;
}

export interface Alert {
  id: string;
  type: 'medication' | 'vitals' | 'recovery' | 'general';
  priority: 'high' | 'medium' | 'low';
  patientId: string;
  patientName: string;
  message: string;
  timestamp: string;
  actionRequired?: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule: Array<{ time: string; taken: boolean }>;
  lastDose?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  category: 'exercise' | 'measurement' | 'medication' | 'other';
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: 'discharge' | 'milestone' | 'followup' | 'event';
  completed?: boolean;
}

export interface Symptom {
  id: string;
  date: string;
  painLevel: number;
  symptoms: string[];
  notes?: string;
}

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    condition: 'Post-operative recovery',
    admissionDate: '2024-03-10',
    riskLevel: 'low',
    status: 'healthy',
    recoveryProgress: 85,
    daysSinceDays: 12,
  },
  {
    id: '2',
    name: 'Michael Chen',
    condition: 'Heart surgery recovery',
    admissionDate: '2024-03-05',
    riskLevel: 'medium',
    status: 'caution',
    recoveryProgress: 60,
    daysSinceDays: 17,
  },
  {
    id: '3',
    name: 'Emma Davis',
    condition: 'Orthopedic surgery recovery',
    admissionDate: '2024-03-15',
    riskLevel: 'high',
    status: 'critical',
    recoveryProgress: 35,
    daysSinceDays: 7,
  },
  {
    id: '4',
    name: 'James Wilson',
    condition: 'General surgery recovery',
    admissionDate: '2024-03-08',
    riskLevel: 'low',
    status: 'healthy',
    recoveryProgress: 92,
    daysSinceDays: 14,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    condition: 'Cardiac rehabilitation',
    admissionDate: '2024-03-01',
    riskLevel: 'medium',
    status: 'caution',
    recoveryProgress: 70,
    daysSinceDays: 21,
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'medication',
    priority: 'high',
    patientId: '3',
    patientName: 'Emma Davis',
    message: 'Missed medication dose at 2:00 PM',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    actionRequired: true,
  },
  {
    id: '2',
    type: 'vitals',
    priority: 'high',
    patientId: '2',
    patientName: 'Michael Chen',
    message: 'Abnormal vitals detected - Blood pressure elevated',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    actionRequired: true,
  },
  {
    id: '3',
    type: 'recovery',
    priority: 'medium',
    patientId: '5',
    patientName: 'Lisa Anderson',
    message: 'Recovery milestone: Can now walk without assistance',
    timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
  },
  {
    id: '4',
    type: 'medication',
    priority: 'medium',
    patientId: '1',
    patientName: 'Sarah Johnson',
    message: 'Medication refill needed next week',
    timestamp: new Date(Date.now() - 4 * 60 * 60000).toISOString(),
  },
  {
    id: '5',
    type: 'general',
    priority: 'low',
    patientId: '4',
    patientName: 'James Wilson',
    message: 'Routine check-in reminder',
    timestamp: new Date(Date.now() - 6 * 60 * 60000).toISOString(),
  },
];

// Mock Medications
export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    schedule: [{ time: '08:00', taken: true }],
    lastDose: new Date(Date.now() - 16 * 60 * 60000).toISOString(),
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'Three times daily',
    schedule: [
      { time: '08:00', taken: true },
      { time: '14:00', taken: true },
      { time: '20:00', taken: false },
    ],
    lastDose: new Date(Date.now() - 4 * 60 * 60000).toISOString(),
  },
  {
    id: '3',
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily',
    schedule: [{ time: '09:00', taken: true }],
    lastDose: new Date(Date.now() - 15 * 60 * 60000).toISOString(),
  },
];

// Mock Checklist
export const mockChecklist: ChecklistItem[] = [
  {
    id: '1',
    title: 'Morning exercises',
    completed: true,
    completedAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    category: 'exercise',
  },
  {
    id: '2',
    title: 'Measure blood pressure',
    completed: true,
    completedAt: new Date(Date.now() - 1 * 60 * 60000).toISOString(),
    category: 'measurement',
  },
  {
    id: '3',
    title: 'Take medications',
    completed: false,
    category: 'medication',
  },
  {
    id: '4',
    title: 'Walk for 30 minutes',
    completed: false,
    category: 'exercise',
  },
  {
    id: '5',
    title: 'Evening stretches',
    completed: false,
    category: 'exercise',
  },
];

// Mock Timeline
export const mockTimeline: TimelineEvent[] = [
  {
    id: '1',
    date: '2024-03-10',
    title: 'Hospital Discharge',
    type: 'discharge',
    completed: true,
  },
  {
    id: '2',
    date: '2024-03-17',
    title: 'Remove bandages',
    type: 'milestone',
    completed: true,
  },
  {
    id: '3',
    date: '2024-03-24',
    title: 'Start light exercises',
    type: 'milestone',
    completed: true,
  },
  {
    id: '4',
    date: '2024-03-31',
    title: 'First follow-up appointment',
    type: 'followup',
    completed: false,
  },
  {
    id: '5',
    date: '2024-04-14',
    title: 'Full recovery expected',
    type: 'event',
    completed: false,
  },
];

// Mock Symptoms
export const mockSymptoms: Symptom[] = [
  {
    id: '1',
    date: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
    painLevel: 3,
    symptoms: ['slight discomfort'],
    notes: 'Pain decreased with rest',
  },
  {
    id: '2',
    date: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
    painLevel: 5,
    symptoms: ['moderate pain', 'swelling'],
    notes: 'Took pain medication',
  },
  {
    id: '3',
    date: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
    painLevel: 6,
    symptoms: ['pain', 'swelling', 'redness'],
    notes: 'Applied ice therapy',
  },
];

// Chart data
export const recoveryTrendData = [
  { date: '3/10', recovery: 15 },
  { date: '3/12', recovery: 22 },
  { date: '3/14', recovery: 28 },
  { date: '3/16', recovery: 35 },
  { date: '3/18', recovery: 42 },
  { date: '3/20', recovery: 50 },
  { date: '3/22', recovery: 58 },
  { date: '3/24', recovery: 65 },
  { date: '3/26', recovery: 72 },
  { date: '3/28', recovery: 78 },
  { date: '3/30', recovery: 85 },
];

export const medicationAdherenceData = [
  { patient: 'Sarah', adherence: 95 },
  { patient: 'Michael', adherence: 82 },
  { patient: 'Emma', adherence: 65 },
  { patient: 'James', adherence: 98 },
  { patient: 'Lisa', adherence: 88 },
];

export const dashboardStats = {
  totalPatients: mockPatients.length,
  activeAlerts: mockAlerts.filter((a) => a.actionRequired).length,
  recoveryRate: 72,
  adherenceRate: 85,
};
