import {
  DoctorPrepSummary,
  EmergencyHealthCard,
  FamilyMember,
  HabitLog,
  HealthArticle,
  LanguageCode,
  MedicalReport,
  Medication,
  MythFactItem,
  PeriodLog,
  PreventiveCareItem,
  SymptomSession,
  TimelineEvent,
  UserProfile
} from '../types';
import { DEMO_EMERGENCY_CARD, DEMO_MEDICATIONS, DEMO_PREVENTIVE_CARE, DEMO_REPORTS, DEMO_TIMELINE, DEMO_USER, DEMO_PROFILES } from '../data/demoData';
import { HEALTH_ARTICLES } from '../data/healthArticles';
import { MYTHS_AND_FACTS } from '../data/mythsAndFacts';

// Local storage keys
const STORAGE_KEYS = {
  USER: 'hb_user_profile',
  REPORTS: 'hb_reports',
  MEDS: 'hb_medications',
  HABITS: 'hb_habit_logs',
  PERIOD: 'hb_period_logs',
  PREVENTIVE: 'hb_preventive_care',
  TIMELINE: 'hb_timeline',
  EMERGENCY: 'hb_emergency_card',
  CUSTOM_ARTICLES: 'hb_custom_articles',
  CUSTOM_MYTHS: 'hb_custom_myths',
  FAMILY: 'hb_family_members',
  PROFILES: 'arogya_user_profiles',
  ACTIVE_PROFILE_ID: 'arogya_active_profile_id',
  PRIVACY: 'hb_privacy_settings',
  THEME_CONTRAST: 'hb_high_contrast',
  FONT_SCALE: 'hb_font_scale'
};

// Helper for local state
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error', e);
  }
}

// ----------------------------------------------------
// STATE & PERSISTENCE SERVICE
// ----------------------------------------------------
export const HealthBridgeStorage = {
  // Language
  getLanguage: (): LanguageCode => getStored<LanguageCode>('hb_language', 'en'),
  saveLanguage: (lang: LanguageCode) => setStored('hb_language', lang),

  // User Profile
  getUser: (): UserProfile => getStored<UserProfile>(STORAGE_KEYS.USER, DEMO_USER),
  saveUser: (user: UserProfile) => setStored(STORAGE_KEYS.USER, user),
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Multiple Profiles Management
  getProfiles: (): UserProfile[] => getStored<UserProfile[]>(STORAGE_KEYS.PROFILES, DEMO_PROFILES),
  saveProfiles: (profiles: UserProfile[]) => setStored(STORAGE_KEYS.PROFILES, profiles),
  getActiveProfileId: (): string => getStored<string>(STORAGE_KEYS.ACTIVE_PROFILE_ID, 'monika-reddy-1'),
  setActiveProfileId: (id: string) => setStored(STORAGE_KEYS.ACTIVE_PROFILE_ID, id),

  // Reports
  getReports: (): MedicalReport[] => getStored<MedicalReport[]>(STORAGE_KEYS.REPORTS, DEMO_REPORTS),
  saveReport: (report: MedicalReport) => {
    const reports = HealthBridgeStorage.getReports();
    const updated = [report, ...reports.filter(r => r.id !== report.id)];
    setStored(STORAGE_KEYS.REPORTS, updated);
    
    // Add timeline event
    HealthBridgeStorage.addTimelineEvent({
      id: 'tl-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: `Lab Report: ${report.reportTitle}`,
      description: `Uploaded diagnostic lab file (${report.tests.length} biomarkers analyzed).`,
      type: 'report',
      badge: 'Medical Report'
    });
    return updated;
  },
  deleteReport: (id: string) => {
    const reports = HealthBridgeStorage.getReports().filter(r => r.id !== id);
    setStored(STORAGE_KEYS.REPORTS, reports);
    return reports;
  },

  // Medications
  getMedications: (): Medication[] => getStored<Medication[]>(STORAGE_KEYS.MEDS, DEMO_MEDICATIONS),
  saveMedication: (med: Medication) => {
    const meds = HealthBridgeStorage.getMedications();
    const existing = meds.findIndex(m => m.id === med.id);
    let updated: Medication[];
    if (existing >= 0) {
      updated = [...meds];
      updated[existing] = med;
    } else {
      updated = [med, ...meds];
      HealthBridgeStorage.addTimelineEvent({
        id: 'tl-' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: `Added Medication: ${med.name}`,
        description: `Scheduled: ${med.frequency}`,
        type: 'medication',
        badge: 'Medication'
      });
    }
    setStored(STORAGE_KEYS.MEDS, updated);
    return updated;
  },
  deleteMedication: (id: string) => {
    const meds = HealthBridgeStorage.getMedications().filter(m => m.id !== id);
    setStored(STORAGE_KEYS.MEDS, meds);
    return meds;
  },
  logMedicationStatus: (medId: string, status: 'taken' | 'missed' | 'snoozed') => {
    const meds = HealthBridgeStorage.getMedications();
    const todayStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = meds.map(m => {
      if (m.id === medId) {
        return {
          ...m,
          history: [{ date: todayStr, time: timeStr, status }, ...m.history.slice(0, 30)]
        };
      }
      return m;
    });
    setStored(STORAGE_KEYS.MEDS, updated);
    return updated;
  },

  // Habit Logs
  getHabitLogs: (): Record<string, HabitLog> => {
    const today = new Date().toISOString().split('T')[0];
    const defaultToday: HabitLog = {
      date: today,
      hydrationGlasses: 5,
      sleepHours: 7.5,
      activityMinutes: 35,
      hygieneChecklist: {
        handWashing: true,
        bathing: true,
        dentalCare: true,
        skinHygiene: true
      },
      wellbeingMood: 'good',
      screenBreakCompleted: true
    };
    return getStored<Record<string, HabitLog>>(STORAGE_KEYS.HABITS, { [today]: defaultToday });
  },
  getTodayHabits: (): HabitLog => {
    const today = new Date().toISOString().split('T')[0];
    const logs = HealthBridgeStorage.getHabitLogs();
    if (logs[today]) return logs[today];
    const defaultToday: HabitLog = {
      date: today,
      hydrationGlasses: 5,
      sleepHours: 7.5,
      activityMinutes: 35,
      hygieneChecklist: {
        handWashing: true,
        bathing: true,
        dentalCare: true,
        skinHygiene: true
      },
      wellbeingMood: 'good',
      screenBreakCompleted: true
    };
    return defaultToday;
  },
  saveTodayHabit: (habit: HabitLog) => {
    const all = HealthBridgeStorage.getHabitLogs();
    all[habit.date] = habit;
    setStored(STORAGE_KEYS.HABITS, all);
    return all;
  },
  saveTodayHabits: (habit: HabitLog) => {
    return HealthBridgeStorage.saveTodayHabit(habit);
  },

  // Period Logs
  getPeriodLogs: (): PeriodLog[] => getStored<PeriodLog[]>(STORAGE_KEYS.PERIOD, []),
  savePeriodLog: (log: PeriodLog) => {
    const logs = HealthBridgeStorage.getPeriodLogs();
    const updated = [log, ...logs.filter(l => l.date !== log.date)];
    setStored(STORAGE_KEYS.PERIOD, updated);
    return updated;
  },

  // Preventive Care
  getPreventiveCare: (): PreventiveCareItem[] => getStored<PreventiveCareItem[]>(STORAGE_KEYS.PREVENTIVE, DEMO_PREVENTIVE_CARE),
  savePreventiveCare: (item: PreventiveCareItem) => {
    const items = HealthBridgeStorage.getPreventiveCare();
    const updated = [item, ...items.filter(i => i.id !== item.id)];
    setStored(STORAGE_KEYS.PREVENTIVE, updated);
    return updated;
  },

  // Timeline
  getTimeline: (): TimelineEvent[] => getStored<TimelineEvent[]>(STORAGE_KEYS.TIMELINE, DEMO_TIMELINE),
  getTimelineEvents: (): TimelineEvent[] => HealthBridgeStorage.getTimeline(),
  addTimelineEvent: (event: TimelineEvent) => {
    const events = HealthBridgeStorage.getTimeline();
    const updated = [event, ...events];
    setStored(STORAGE_KEYS.TIMELINE, updated);
    return updated;
  },
  deleteTimelineEvent: (id: string) => {
    const events = HealthBridgeStorage.getTimeline().filter(e => e.id !== id);
    setStored(STORAGE_KEYS.TIMELINE, events);
    return events;
  },

  // Emergency Health Card
  getEmergencyCard: (): EmergencyHealthCard => getStored<EmergencyHealthCard>(STORAGE_KEYS.EMERGENCY, DEMO_EMERGENCY_CARD),
  saveEmergencyCard: (card: EmergencyHealthCard) => {
    setStored(STORAGE_KEYS.EMERGENCY, card);
    return card;
  },

  // Articles & Myths (for Admin editing and dynamic additions)
  getAllArticles: (): HealthArticle[] => {
    const custom = getStored<HealthArticle[]>(STORAGE_KEYS.CUSTOM_ARTICLES, []);
    return [...custom, ...HEALTH_ARTICLES];
  },
  saveArticle: (art: HealthArticle) => {
    const custom = getStored<HealthArticle[]>(STORAGE_KEYS.CUSTOM_ARTICLES, []);
    const updated = [art, ...custom.filter(a => a.id !== art.id)];
    setStored(STORAGE_KEYS.CUSTOM_ARTICLES, updated);
    return HealthBridgeStorage.getAllArticles();
  },
  getAllMyths: (): MythFactItem[] => {
    const custom = getStored<MythFactItem[]>(STORAGE_KEYS.CUSTOM_MYTHS, []);
    return [...custom, ...MYTHS_AND_FACTS];
  },
  saveMyth: (item: MythFactItem) => {
    const custom = getStored<MythFactItem[]>(STORAGE_KEYS.CUSTOM_MYTHS, []);
    const updated = [item, ...custom.filter(m => m.id !== item.id)];
    setStored(STORAGE_KEYS.CUSTOM_MYTHS, updated);
    return HealthBridgeStorage.getAllMyths();
  },

  // Family Members Storage
  getFamilyMembers: (): FamilyMember[] =>
    getStored<FamilyMember[]>(STORAGE_KEYS.FAMILY, [
      {
        id: 'fam-1',
        name: 'Sunita Sharma (Mother)',
        relation: 'Parent',
        age: 58,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        allowSharedReminders: true,
        allowEmergencyCardView: true,
        allowFullReportView: true,
      },
    ]),
  addFamilyMember: (member: FamilyMember) => {
    const members = HealthBridgeStorage.getFamilyMembers();
    const updated = [...members, member];
    setStored(STORAGE_KEYS.FAMILY, updated);
    return updated;
  },
  removeFamilyMember: (id: string) => {
    const members = HealthBridgeStorage.getFamilyMembers();
    const updated = members.filter((m) => m.id !== id);
    setStored(STORAGE_KEYS.FAMILY, updated);
    return updated;
  },

  // Clear all data for Privacy Center
  clearAllUserData: () => {
    localStorage.clear();
  }
};

function generateSimpleClientFallback(userQuery: string): string {
  const q = userQuery.toLowerCase();
  if (q.includes('period') || q.includes('pad') || q.includes('cramp') || q.includes('menstrua') || q.includes('girl') || q.includes('pcos')) {
    return `🌸 **Simple Guide to Periods & Girls' Hygiene**:
- **Why Periods Happen**: Every month, a girl's body sheds the natural soft cushion lining of the uterus. It is **100% normal, healthy, and clean**.
- **Key Hygiene Steps**:
  1. Change pads every 4 to 6 hours to prevent bacteria and rashes.
  2. Always wash and wipe from **Front to Back** with plain water.
  3. Wear breathable cotton underwear and dry them in direct sunlight.
- **Relieving Cramps**: Sip warm water or ginger tea, apply a hot water bag to your lower tummy, and do gentle stretching.`;
  }
  if (q.includes('boy') || q.includes('voice') || q.includes('wet dream') || q.includes('nightfall') || q.includes('penis') || q.includes('testic') || q.includes('foreskin') || q.includes('shav')) {
    return `⚡ **Simple Guide to Boys' Puberty & Hygiene**:
- **Body Changes**: During puberty, male hormones make your voice deeper, shoulders broader, and hair grow.
- **Key Hygiene Steps**:
  1. Bathe daily with soap, washing underarms, groin, and feet thoroughly.
  2. If uncircumcised, gently slide back the foreskin, wash with warm plain water, and slide it forward.
  3. Wear fresh, clean underwear and socks every single day.
- **Wet Dreams (Nightfall)**: 100% natural pressure release by the body during sleep. It causes zero harm or weakness!`;
  }
  if (q.includes('timetable') || q.includes('routine') || q.includes('habit') || q.includes('water') || q.includes('sleep')) {
    return `⏰ **The Best Daily Health Timetable**:
- **Morning (6:00 AM - 7:30 AM)**: Wake up, drink 2 glasses of warm water, brush teeth (2 mins), take a bath, and eat a protein breakfast (idli/eggs/sprouts).
- **Midday (1:00 PM - 2:00 PM)**: Wash hands with soap for 20 seconds, eat a colorful balanced lunch, take a 20-20-20 screen rest.
- **Evening (5:00 PM - 7:30 PM)**: 30 minutes of running/sports, light dinner 2 hours before bed.
- **Night (9:30 PM - 10:00 PM)**: Night teeth brushing, put phones away, and get 7.5 to 8 hours of restful sleep.`;
  }
  if (q.includes('acne') || q.includes('pimple') || q.includes('skin') || q.includes('face')) {
    return `✨ **Simple Steps for Clear & Healthy Skin**:
- Wash face twice daily with gentle water and mild cleanser.
- Never pop or squeeze pimples to prevent dark spots and scars.
- Drink 8-10 glasses of water and avoid excessive oily fried foods.`;
  }
  return `💡 **BridgeBuddy Health & Wellness Support**:
- Good health rests on 4 pillars: Daily personal cleanliness, 2-3 liters of drinking water, balanced home-cooked meals, and 7-8 hours of sound sleep.
- Ask me anything specific: **girls' period care, boys' puberty, daily timetable, hospital finder, acne, or diet**!`;
}

// ----------------------------------------------------
// AI REST API CLIENT
// ----------------------------------------------------
export const AIService = {
  async askBridgeBuddy(
    messages: Array<{ role: string; content: string }>,
    userContext?: any,
    preferredLanguage: string = 'en'
  ): Promise<{ reply: string; isEmergency?: boolean; disclaimer: string }> {
    const lastUserQuery = messages?.[messages.length - 1]?.content || "";
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, userContext, preferredLanguage }),
      });
      if (!response.ok) throw new Error('Server response was not ok');
      return await response.json();
    } catch (e) {
      console.warn('Fallback to local assistant');
      return {
        reply: generateSimpleClientFallback(lastUserQuery),
        disclaimer: "HealthBridge provides general health education in simple words."
      };
    }
  },

  async evaluateSymptoms(payload: {
    bodyRegion: string;
    primarySymptom: string;
    duration: string;
    severity: number;
    associatedSymptoms: string[];
    notes?: string;
  }): Promise<any> {
    try {
      const response = await fetch('/api/ai/symptom-navigator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('API failed');
      return await response.json();
    } catch (e) {
      return {
        urgencyLevel: payload.severity >= 7 ? 'CONSIDER_CARE' : 'MONITOR',
        summary: `Assessment for ${payload.primarySymptom} in ${payload.bodyRegion}.`,
        generalEducation: [
          'Symptoms are signals from the body. Monitoring how they evolve over 48-72 hours helps clarify the picture.',
          'Supportive measures include resting, maintaining gentle hydration, and avoiding straining the affected region.'
        ],
        monitoringGuidance: [
          'Observe if pain intensity changes with movement or rest.',
          'Check for localized temperature changes or skin changes.'
        ],
        whenToConsultDoctor: [
          'If pain escalates or fails to subside with basic rest.',
          'If you develop systemic signs like chills, fever, or dizziness.'
        ],
        safetyDisclaimer: 'This triage evaluation is for educational awareness. Always consult a healthcare professional for diagnosis.'
      };
    }
  },

  async explainReport(payload: {
    reportText?: string;
    imageBase64?: string;
    mimeType?: string;
    reportTitle?: string;
  }): Promise<any> {
    try {
      const response = await fetch('/api/ai/explain-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('API failed');
      return await response.json();
    } catch (e) {
      return {
        reportTitle: payload.reportTitle || "Diagnostic Laboratory Report",
        overallSummary: "Your lab report contains clinical biomarkers. Each value should be interpreted in the context of the reference interval provided by the specific testing laboratory and reviewed alongside your personal health history.",
        tests: [
          {
            testName: "Hemoglobin (Hb)",
            resultValue: "11.2",
            unit: "g/dL",
            referenceRange: "12.0 - 15.5 g/dL",
            status: "below",
            simpleExplanation: "This result is slightly below the laboratory reference interval. Hemoglobin is the iron-containing protein in red blood cells that transports oxygen to your tissues.",
            whatItMeasures: "Oxygen transport capacity of your bloodstream.",
            questionsForDoctor: ["What dietary adjustments or further tests would help evaluate my iron status?"]
          }
        ],
        disclaimer: "Educational explanation only. Do not self-diagnose or alter medical treatments without consulting your healthcare clinician."
      };
    }
  },

  async generateDoctorPrep(payload: {
    chiefComplaint?: string;
    duration?: string;
    medications?: string[];
    reports?: string[];
    additionalContext?: string;
  }): Promise<any> {
    return AIService.prepareDoctorVisit({
      mainConcern: payload.chiefComplaint || 'General checkup',
      duration: payload.duration || 'Recently',
      symptoms: [],
      medications: payload.medications || [],
      reports: payload.reports || [],
      additionalContext: payload.additionalContext,
    });
  },

  async prepareDoctorVisit(payload: {
    mainConcern: string;
    duration: string;
    symptoms: string[];
    medications: string[];
    reports: string[];
    additionalContext?: string;
  }): Promise<any> {
    try {
      const response = await fetch('/api/ai/doctor-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('API failed');
      return await response.json();
    } catch (e) {
      return {
        appointmentSummary: `Patient presenting with ${payload.mainConcern || 'routine consultation'} present for ${payload.duration || 'recent duration'}.`,
        suggestedQuestions: [
          "What factors are most likely contributing to these symptoms?",
          "Are there any additional tests or screenings you would recommend?",
          "What warning signs should prompt me to seek care sooner?",
          "When should we plan a follow-up review?"
        ],
        keyNotesToShare: [
          `Concern: ${payload.mainConcern}`,
          `Duration: ${payload.duration}`,
          `Current Medicines: ${payload.medications.join(', ') || 'None reported'}`
        ]
      };
    }
  }
};
