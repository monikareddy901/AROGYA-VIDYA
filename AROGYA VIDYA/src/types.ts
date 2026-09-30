export type HealthCategory =
  | 'mens_health'
  | 'womens_health'
  | 'hormonal_health'
  | 'trans_health'
  | 'puberty_academy'
  | 'hygiene_center'
  | 'sexual_health'
  | 'mental_wellbeing'
  | 'nutrition';

export type LanguageCode = 'en' | 'hi' | 'kn' | 'te';

export type NavTab =
  | 'home'
  | 'dashboard'
  | 'education'
  | 'learn'
  | 'hygiene'
  | 'bodycare'
  | 'personalHygiene'
  | 'timetable'
  | 'routine'
  | 'studentEdu'
  | 'student_edu'
  | 'puberty'
  | 'hormonalMen'
  | 'hormones'
  | 'pcos_mens'
  | 'hospitals'
  | 'pharmacy'
  | 'myths'
  | 'symptoms'
  | 'reports'
  | 'medications'
  | 'medicines'
  | 'habits'
  | 'wellness'
  | 'periodcare'
  | 'periodCare'
  | 'doctor_prep'
  | 'doctorPrep'
  | 'preventive'
  | 'timeline'
  | 'bridgebuddy'
  | 'buddy'
  | 'quiz'
  | 'emergencyCard'
  | 'emergency'
  | 'privacy'
  | 'admin'
  | 'family';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isEmergency?: boolean;
  disclaimer?: string;
}

export type ReportTestResult = LabTestItem;
export type HealthTimelineEvent = TimelineEvent;

export type ProfessionType =
  | 'software_engineer'
  | 'doctor_nurse'
  | 'student'
  | 'teacher'
  | 'desk_corporate'
  | 'field_worker'
  | 'night_shift'
  | 'homemaker'
  | 'other';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: 'Female' | 'Male' | 'Non-Binary' | 'Other';
  profession?: ProfessionType;
  professionTitle?: string;
  bloodGroup?: string;
  city?: string;
  locality?: string;
  dateOfBirth?: string;
  chronicConditions?: string[];
  allergies?: string[];
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  preferredLanguage: LanguageCode;
  selectedTopics: HealthCategory[];
  isAdmin?: boolean;
  isGuest?: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: HealthCategory;
  readTimeMinutes: number;
  shortExplanation: string;
  detailedExplanation: string;
  commonQuestions: Array<{
    question: string;
    answer: string;
  }>;
  mythVsFact: Array<{
    myth: string;
    fact: string;
    explanation: string;
  }>;
  healthyHabits: string[];
  warningSigns: string[];
  whenToSeekHelp: string[];
  trustedSources: Array<{
    name: string;
    url?: string;
    organization: string;
  }>;
  lastUpdated: string;
  tags: string[];
  targetAudience?: string;
}

export interface MythFactItem {
  id: string;
  category: HealthCategory;
  myth: string;
  fact: string;
  explanation: string;
  evidenceSource: string;
}

export type TriageUrgency = 'MONITOR' | 'CONSIDER_CARE' | 'SEEK_URGENT_CARE';

export interface SymptomSession {
  id: string;
  userId: string;
  timestamp: string;
  bodyRegion: string;
  primarySymptom: string;
  duration: string;
  severity: number; // 1-10
  associatedSymptoms: string[];
  hasRedFlags: boolean;
  redFlagsDetected: string[];
  urgencyLevel: TriageUrgency;
  summary: string;
  generalEducation: string[];
  monitoringGuidance: string[];
  whenToConsultDoctor: string[];
  emergencyAdvice?: string;
  safetyDisclaimer: string;
}

export interface LabTestItem {
  testName: string;
  resultValue: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'below' | 'above' | 'inconclusive';
  simpleExplanation: string;
  whatItMeasures: string;
  questionsForDoctor: string[];
}

export interface MedicalReport {
  id: string;
  userId: string;
  reportTitle: string;
  reportDate: string;
  laboratoryName: string;
  category: string;
  fileName: string;
  tests: LabTestItem[];
  overallSummary: string;
  disclaimer: string;
  uploadedAt: string;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  prescribedBy?: string;
  purpose: string;
  instructions: string;
  frequency: string; // e.g. 'Once daily with breakfast'
  reminderTimes: string[]; // e.g. ['08:00']
  startDate: string;
  endDate?: string;
  isActive: boolean;
  history: Array<{
    date: string;
    time: string;
    status: 'taken' | 'missed' | 'snoozed';
  }>;
}

export interface HabitLog {
  date: string;
  hydrationGlasses: number; // target 8
  sleepHours: number; // target 7-9
  activityMinutes: number; // target 30
  hygieneChecklist: {
    handWashing: boolean;
    bathing: boolean;
    dentalCare: boolean;
    skinHygiene: boolean;
  };
  wellbeingMood: 'great' | 'good' | 'neutral' | 'low' | 'stressed';
  screenBreakCompleted: boolean;
  notes?: string;
}

export interface PeriodLog {
  id: string;
  userId: string;
  date: string;
  flowLevel?: 'spotting' | 'light' | 'medium' | 'heavy';
  symptoms: string[];
  mood: string;
  notes?: string;
  cycleDay?: number;
}

export interface PreventiveCareItem {
  id: string;
  title: string;
  category: 'Dental' | 'Vision' | 'Vaccination' | 'Screening' | 'Routine' | 'Follow-up';
  recommendedFrequency: string;
  lastDoneDate?: string;
  nextDueDate: string;
  status: 'due' | 'scheduled' | 'completed' | 'upcoming';
  guidelineSource: string;
  notes?: string;
}

export interface DoctorPrepSummary {
  id: string;
  userId: string;
  createdDate: string;
  appointmentDate?: string;
  doctorSpecialty?: string;
  mainConcern: string;
  duration: string;
  symptomSeverity: string;
  symptomProgression: string;
  currentMedications: string[];
  recentReports: string[];
  personalQuestions: string[];
  aiSuggestedQuestions: string[];
  keyNotesToShare: string[];
}

export interface EmergencyHealthCard {
  userId: string;
  fullName: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  emergencyContacts: Array<{
    name: string;
    relation: string;
    phone: string;
    isPrimary: boolean;
  }>;
  organDonor: boolean;
  specialMedicalNotes?: string;
  preferredHospital?: string;
  isPubliclyVisible: boolean;
  qrPayloadUrl: string;
  lastUpdated: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  avatar: string;
  allowSharedReminders: boolean;
  allowEmergencyCardView: boolean;
  allowFullReportView: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'report' | 'medication' | 'appointment' | 'symptom' | 'wellness';
  badge: string;
}

export interface MedicalFacility {
  id: string;
  name: string;
  type: 'hospital_24x7' | 'govt_hospital' | 'pharmacy_24x7' | 'jan_aushadhi' | 'clinic';
  city: string;
  locality: string;
  distanceKm: number;
  open24Hours: boolean;
  phone: string;
  emergencyPhone?: string;
  address: string;
  services: string[];
  rating: number;
  googleMapQuery: string;
  hasBloodBank?: boolean;
  hasICU?: boolean;
  genericMedicineDiscount?: string;
}

export interface TimeTableItem {
  id: string;
  timeSlot: string;
  period: 'Morning' | 'Midday' | 'Afternoon' | 'Evening' | 'Night';
  title: string;
  description: string;
  category: 'hydration' | 'hygiene' | 'nutrition' | 'study_focus' | 'movement' | 'sleep' | 'mental_care' | 'posture' | 'mental' | 'exercise' | 'work' | 'relaxation';
  steps: string[];
  scientificWhy: string;
  completed?: boolean;
  imageUrl?: string;
}

