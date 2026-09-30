import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Stethoscope,
  Pill,
  UserCheck,
  PhoneCall,
  Droplets,
  Moon,
  Footprints,
  Clock,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Plus,
  Heart,
  GraduationCap,
  Building2,
  Calendar,
  ShieldAlert,
  HelpCircle,
  Award,
  Users,
  Lock,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  Briefcase,
  MapPin,
  Train,
  Activity,
  Flame,
  Check,
  X
} from 'lucide-react';
import {
  HabitLog,
  HealthArticle,
  LanguageCode,
  MedicalReport,
  Medication,
  PreventiveCareItem,
  TimelineEvent,
  UserProfile
} from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DashboardProps {
  user: UserProfile;
  language: LanguageCode;
  todayHabit: HabitLog;
  onUpdateHabit: (habit: HabitLog) => void;
  medications: Medication[];
  onLogMedication: (id: string, status: 'taken' | 'missed' | 'snoozed') => void;
  reports: MedicalReport[];
  preventiveItems: PreventiveCareItem[];
  timeline: TimelineEvent[];
  articles: HealthArticle[];
  onSelectTab: (tab: string) => void;
  onSelectArticle: (article: HealthArticle) => void;
  onOpenEmergency: () => void;
  onOpenProfiles?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  language,
  todayHabit,
  onUpdateHabit,
  medications,
  onLogMedication,
  reports,
  preventiveItems,
  timeline,
  articles,
  onSelectTab,
  onSelectArticle,
  onOpenEmergency,
  onOpenProfiles,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // 5 Master Categories matching User Structure
  const dashboardCategories = [
    {
      id: 'daily-life',
      title: 'DAILY LIFE',
      colorBadge: 'bg-amber-100 text-amber-950 border-amber-300',
      headerBg: 'from-amber-500/10 to-orange-500/5',
      iconEmoji: '🟡',
      description: 'Your personalized schedules, routines, medicine tracking, and habit streaks.',
      items: [
        {
          id: 'timetable',
          title: 'Profession-Customized Routine',
          subtitle: 'Tailored 24h schedules for Software Engineers, Doctors, Students, Factory Shift workers & Homemakers.',
          badge: 'Role Customized',
          badgeColor: 'bg-orange-100 text-orange-950 border-orange-300',
          icon: Briefcase,
          iconBg: 'bg-orange-600 text-white',
          cardBorder: 'hover:border-orange-500 hover:shadow-orange-500/15',
        },
        {
          id: 'medicines',
          title: 'Medication Manager',
          subtitle: 'Prescription pill schedules, dosage alerts, adherence tracker, and food warnings.',
          badge: 'Prescription Tracker',
          badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
          icon: Pill,
          iconBg: 'bg-purple-600 text-white',
          cardBorder: 'hover:border-purple-500 hover:shadow-purple-500/15',
        },
        {
          id: 'wellness',
          title: 'Wellness & Streaks',
          subtitle: 'Daily hydration, sleep, exercise, dental/skin hygiene, and maintain your health streak 🔥.',
          badge: 'Streaks 🔥',
          badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
          icon: Flame,
          iconBg: 'bg-emerald-600 text-white',
          cardBorder: 'hover:border-emerald-500 hover:shadow-emerald-500/15',
        },
      ],
    },
    {
      id: 'body-personal-care',
      title: 'BODY & PERSONAL CARE',
      colorBadge: 'bg-pink-100 text-pink-950 border-pink-300',
      headerBg: 'from-pink-500/10 to-rose-500/5',
      iconEmoji: '🩷',
      description: 'Gentle, taboo-free guides for hygiene, puberty, menstrual cycle and bodily care.',
      items: [
        {
          id: 'hygiene',
          title: 'Personal Hygiene & Body Care',
          subtitle: 'Step-by-step hygiene routines for Girls, Boys, Transgender & Students with doctor guidance.',
          badge: 'Hygiene Vault',
          badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
          icon: Sparkles,
          iconBg: 'bg-teal-700 text-white',
          cardBorder: 'hover:border-teal-500 hover:shadow-teal-500/15',
        },
        {
          id: 'hormonalMen',
          title: 'Hormonal & Men’s Health',
          subtitle: 'PCOS & PCOD Awareness, evidence-based nutrition guides, and Men’s preventive wellness hub.',
          badge: 'PCOS / PCOD & Men',
          badgeColor: 'bg-rose-100 text-rose-950 border-rose-300',
          icon: Heart,
          iconBg: 'bg-rose-600 text-white',
          cardBorder: 'hover:border-rose-500 hover:shadow-rose-500/15',
        },
        {
          id: 'periodcare',
          title: 'Period & Cycle Tracker',
          subtitle: 'Cycle prediction, pad/cup safety rules, PMS relief tips & hygiene best practices.',
          badge: 'Cycle & Care',
          badgeColor: 'bg-pink-100 text-pink-950 border-pink-300',
          icon: Calendar,
          iconBg: 'bg-pink-600 text-white',
          cardBorder: 'hover:border-pink-500 hover:shadow-pink-500/15',
        },
        {
          id: 'studentEdu',
          title: 'Student Health & Puberty',
          subtitle: 'Breaking Indian family taboos: bodily changes, wet dreams, periods & safe touch explained simply.',
          badge: 'Taboo-Free Guide',
          badgeColor: 'bg-indigo-100 text-indigo-950 border-indigo-300',
          icon: GraduationCap,
          iconBg: 'bg-indigo-600 text-white',
          cardBorder: 'hover:border-indigo-500 hover:shadow-indigo-500/15',
        },
      ],
    },
    {
      id: 'understand-health',
      title: 'UNDERSTAND YOUR HEALTH',
      colorBadge: 'bg-blue-100 text-blue-950 border-blue-300',
      headerBg: 'from-blue-500/10 to-cyan-500/5',
      iconEmoji: '🔵',
      description: 'Interactive symptom check, lab test simplification, and clinical consultation tools.',
      items: [
        {
          id: 'symptoms',
          title: 'Symptom Navigator',
          subtitle: 'Interactive body map, safe home care suggestions, and red-flag warning triage detector.',
          badge: 'Body Map Triage',
          badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
          icon: Stethoscope,
          iconBg: 'bg-emerald-600 text-white',
          cardBorder: 'hover:border-emerald-500 hover:shadow-emerald-500/15',
        },
        {
          id: 'reports',
          title: 'Lab Report Explainer',
          subtitle: 'Translate complex blood tests, thyroid, lipid panels, and glucose metrics into plain English.',
          badge: 'Lab Translator',
          badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
          icon: FileText,
          iconBg: 'bg-blue-600 text-white',
          cardBorder: 'hover:border-blue-500 hover:shadow-blue-500/15',
        },
        {
          id: 'doctorPrep',
          title: 'Doctor Visit Prep',
          subtitle: 'Generate printable summary with symptoms, current pills, and smart questions to ask doctor.',
          badge: 'Visit Sheet',
          badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
          icon: UserCheck,
          iconBg: 'bg-cyan-600 text-white',
          cardBorder: 'hover:border-cyan-500 hover:shadow-cyan-500/15',
        },
      ],
    },
    {
      id: 'safety-prevention',
      title: 'SAFETY & PREVENTION',
      colorBadge: 'bg-red-100 text-red-950 border-red-300',
      headerBg: 'from-red-500/10 to-rose-500/5',
      iconEmoji: '🔴',
      description: 'Critical SOS tools, Bengaluru hospital network, screening checklist, and family health.',
      items: [
        {
          id: 'emergencyCard',
          title: 'Emergency ID & SOS 112',
          subtitle: '1-tap call to 112/108, digital QR medical badge, blood group & critical offline health ID.',
          badge: '112 SOS & ID',
          badgeColor: 'bg-red-100 text-red-950 border-red-300',
          icon: ShieldAlert,
          iconBg: 'bg-red-600 text-white',
          cardBorder: 'hover:border-red-500 hover:shadow-red-500/15',
        },
        {
          id: 'hospitals',
          title: 'Bengaluru Hospitals & Route Map',
          subtitle: 'Bengaluru hospitals with Namma Metro connections, 24/7 casualty & Jan Aushadhi generic stores.',
          badge: 'Bengaluru & Metro',
          badgeColor: 'bg-rose-100 text-rose-950 border-rose-300',
          icon: Building2,
          iconBg: 'bg-rose-600 text-white',
          cardBorder: 'hover:border-rose-500 hover:shadow-rose-500/15',
        },
        {
          id: 'preventive',
          title: 'Preventive Care Timeline',
          subtitle: 'Age-based screening checklist, routine vaccinations & lifelong medical milestone history.',
          badge: 'Screenings & Vault',
          badgeColor: 'bg-orange-100 text-orange-950 border-orange-300',
          icon: Calendar,
          iconBg: 'bg-orange-600 text-white',
          cardBorder: 'hover:border-orange-500 hover:shadow-orange-500/15',
        },
        {
          id: 'family',
          title: 'Family Care & Dependents',
          subtitle: 'Manage health records, appointments, and medication schedules for parents and children.',
          badge: 'Family Multi-Profile',
          badgeColor: 'bg-sky-100 text-sky-950 border-sky-300',
          icon: Users,
          iconBg: 'bg-sky-600 text-white',
          cardBorder: 'hover:border-sky-500 hover:shadow-sky-500/15',
        },
      ],
    },
    {
      id: 'learn-interact',
      title: 'LEARN & INTERACT',
      colorBadge: 'bg-purple-100 text-purple-950 border-purple-300',
      headerBg: 'from-purple-500/10 to-indigo-500/5',
      iconEmoji: '🟣',
      description: 'Science-backed myth busting, health knowledge challenge, and your 24/7 AI companion.',
      items: [
        {
          id: 'myths',
          title: 'Myth vs Fact',
          subtitle: 'Evidence-based science debunking popular Indian household medical superstitions and rumors.',
          badge: 'Science vs Rumors',
          badgeColor: 'bg-violet-100 text-violet-950 border-violet-300',
          icon: HelpCircle,
          iconBg: 'bg-violet-600 text-white',
          cardBorder: 'hover:border-violet-500 hover:shadow-violet-500/15',
        },
        {
          id: 'quiz',
          title: 'Health Literacy Quiz',
          subtitle: 'Interactive quiz to test what you know about hygiene, bodily health, nutrition, and first aid.',
          badge: 'Interactive Quiz',
          badgeColor: 'bg-yellow-100 text-yellow-950 border-yellow-300',
          icon: Award,
          iconBg: 'bg-yellow-600 text-white',
          cardBorder: 'hover:border-yellow-500 hover:shadow-yellow-500/15',
        },
        {
          id: 'buddy',
          title: 'BridgeBuddy AI',
          subtitle: 'Ask any medical, hygiene, or lifestyle question in simple words with 24/7 AI assistant guidance.',
          badge: '24/7 AI Companion',
          badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
          icon: Sparkles,
          iconBg: 'bg-teal-600 text-white',
          cardBorder: 'hover:border-teal-500 hover:shadow-teal-500/15',
        },
      ],
    },
  ];

  // Active meds
  const activeMeds = medications.filter((m) => m.isActive);

  return (
    <div className="space-y-10 pb-16">
      {/* Welcome Banner: ONLY WISH WITH NAME, NO PROFILE CARD */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/60 backdrop-blur-md text-teal-100 text-xs font-bold uppercase tracking-wider border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Arogyavidya • Health & Medical Hub
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-rose-300" />
              Bengaluru, Karnataka
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {getGreeting()}, {user.name} 👋
          </h1>
          
          <p className="text-sm sm:text-base text-teal-100 leading-relaxed max-w-2xl">
            Welcome to your daily health & wellness center. Explore your customized routine timetable, manage your medicines, check hospital routes, or track your daily health habits.
          </p>
        </div>
      </div>

      {/* 🔥 TOP ACTION CENTER: Daily Wellness Habits & Live Medications Tracker in front of features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Habits Quick Tracker (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Today's Habit Tracker
                </h3>
                <p className="text-xs text-slate-500">Daily hydration, sleep, exercise, and hygiene progress</p>
              </div>
            </div>
            <button
              id="btn-goto-full-timetable"
              onClick={() => onSelectTab('timetable')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View Full Routine</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Hydration */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-blue-700 text-xs font-semibold mb-2">
                <span className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  Water
                </span>
                <span className="font-bold">{todayHabit.hydrationGlasses} / 8</span>
              </div>
              <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (todayHabit.hydrationGlasses / 8) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-200/60">
                <button
                  id="btn-hydrate-minus"
                  onClick={() =>
                    onUpdateHabit({
                      ...todayHabit,
                      hydrationGlasses: Math.max(0, todayHabit.hydrationGlasses - 1),
                    })
                  }
                  className="w-6 h-6 rounded-md bg-white text-blue-800 text-xs font-bold shadow-xs hover:bg-blue-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-[11px] text-blue-800 font-medium">Glasses</span>
                <button
                  id="btn-hydrate-plus"
                  onClick={() =>
                    onUpdateHabit({
                      ...todayHabit,
                      hydrationGlasses: todayHabit.hydrationGlasses + 1,
                    })
                  }
                  className="w-6 h-6 rounded-md bg-white text-blue-800 text-xs font-bold shadow-xs hover:bg-blue-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Sleep */}
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-indigo-700 text-xs font-semibold mb-2">
                <span className="flex items-center gap-1">
                  <Moon className="w-4 h-4 text-indigo-500" />
                  Sleep
                </span>
                <span className="font-bold">{todayHabit.sleepHours}h</span>
              </div>
              <div className="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (todayHabit.sleepHours / 8) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-indigo-200/60">
                <button
                  id="btn-sleep-minus"
                  onClick={() =>
                    onUpdateHabit({
                      ...todayHabit,
                      sleepHours: Math.max(0, Number((todayHabit.sleepHours - 0.5).toFixed(1))),
                    })
                  }
                  className="w-6 h-6 rounded-md bg-white text-indigo-800 text-xs font-bold shadow-xs hover:bg-indigo-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-[11px] text-indigo-800 font-medium">Target: 8h</span>
                <button
                  id="btn-sleep-plus"
                  onClick={() =>
                    onUpdateHabit({
                      ...todayHabit,
                      sleepHours: Number((todayHabit.sleepHours + 0.5).toFixed(1)),
                    })
                  }
                  className="w-6 h-6 rounded-md bg-white text-indigo-800 text-xs font-bold shadow-xs hover:bg-indigo-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Physical Activity */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold mb-2">
                <span className="flex items-center gap-1">
                  <Footprints className="w-4 h-4 text-emerald-500" />
                  Activity
                </span>
                <span className="font-bold">{todayHabit.activityMinutes}m</span>
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (todayHabit.activityMinutes / 45) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-200/60">
                <button
                  id="btn-activity-minus"
                  onClick={() =>
                    onUpdateHabit({
                      ...todayHabit,
                      activityMinutes: Math.max(0, todayHabit.activityMinutes - 10),
                    })
                  }
                  className="w-6 h-6 rounded-md bg-white text-emerald-800 text-xs font-bold shadow-xs hover:bg-emerald-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-[11px] text-emerald-800 font-medium">Mins</span>
                <button
                  id="btn-activity-plus"
                  onClick={() =>
                    onUpdateHabit({
                      ...todayHabit,
                      activityMinutes: todayHabit.activityMinutes + 10,
                    })
                  }
                  className="w-6 h-6 rounded-md bg-white text-emerald-800 text-xs font-bold shadow-xs hover:bg-emerald-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Hygiene Checklist */}
            <div className="p-3.5 bg-cyan-50/70 border border-cyan-100 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-cyan-800 text-xs font-semibold mb-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  Hygiene
                </span>
                <span className="font-bold">
                  {Object.values(todayHabit.hygieneChecklist).filter(Boolean).length}/4
                </span>
              </div>
              <div className="w-full bg-cyan-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-600 h-full rounded-full transition-all"
                  style={{
                    width: `${(Object.values(todayHabit.hygieneChecklist).filter(Boolean).length / 4) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-cyan-200/60">
                <span className="text-[11px] text-cyan-900 font-medium">Dental/Bath</span>
                <button
                  id="btn-quick-hygiene-toggle"
                  onClick={() => {
                    const current = todayHabit.hygieneChecklist;
                    const allDone = Object.values(current).every(Boolean);
                    onUpdateHabit({
                      ...todayHabit,
                      hygieneChecklist: {
                        handWashing: !allDone,
                        bathing: !allDone,
                        dentalCare: !allDone,
                        skinHygiene: !allDone,
                      },
                    });
                  }}
                  className="text-[11px] font-bold text-cyan-800 underline hover:text-cyan-950 cursor-pointer"
                >
                  Toggle
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prescription Meds Tracker */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Today's Medicines</h3>
                <p className="text-xs text-slate-500">Active prescription schedule</p>
              </div>
            </div>
            <button
              id="btn-goto-meds"
              onClick={() => onSelectTab('medicines')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg cursor-pointer"
            >
              Manage
            </button>
          </div>

          {activeMeds.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs space-y-2">
              <p>No active medications scheduled today.</p>
              <button
                onClick={() => onSelectTab('medicines')}
                className="px-3 py-1.5 bg-purple-50 text-purple-800 rounded-lg font-medium text-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Prescribed Medication</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {activeMeds.slice(0, 3).map((med) => {
                const todayStr = new Date().toISOString().split('T')[0];
                const todayLog = med.history.find((h) => h.date === todayStr);
                const isTaken = todayLog?.status === 'taken';

                return (
                  <div
                    key={med.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isTaken ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{med.name}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">{med.instructions}</p>
                        <span className="inline-block mt-1 text-[10px] text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded-md">
                          {med.frequency}
                        </span>
                      </div>
                      <button
                        id={`btn-toggle-taken-${med.id}`}
                        onClick={() => onLogMedication(med.id, isTaken ? 'missed' : 'taken')}
                        className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          isTaken
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isTaken ? 'Taken' : 'Mark Done'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 🚀 CATEGORIZED AROGYAVIDYA SECTIONS */}
      <div className="space-y-10">
        {dashboardCategories.map((category) => (
          <section key={category.id} id={`category-${category.id}`} className="space-y-4">
            {/* Category Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{category.iconEmoji}</span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>{category.title}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${category.colorBadge}`}>
                      {category.items.length} Modules
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Cards Grid for this category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {category.items.map((box, idx) => {
                const Icon = box.icon;
                return (
                  <button
                    key={`${box.id}-${idx}`}
                    id={`feature-box-${box.id}-${idx}`}
                    onClick={() => {
                      if (box.id === 'emergencyCard') {
                        onOpenEmergency();
                      } else {
                        onSelectTab(box.id);
                      }
                    }}
                    className={`bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-xl ${box.cardBorder} transition-all text-left flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
                  >
                    <div className="space-y-3">
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ${box.iconBg}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${box.badgeColor}`}>
                          {box.badge}
                        </span>
                      </div>

                      {/* Title and Subtitle */}
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                          {box.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                          {box.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                      <span>{box.id === 'emergencyCard' ? 'Open SOS & Card' : 'Open Page & Details'}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
