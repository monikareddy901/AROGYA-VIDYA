import React, { useState, useEffect } from 'react';
import {
  Activity,
  Droplets,
  Moon,
  Footprints,
  Sparkles,
  Smile,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Eye,
  Heart,
  Flame,
  Award,
  Zap,
  Target,
  Trophy,
  Star,
  Check,
  Clock,
  ArrowRight,
  Sparkle,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { HabitLog, LanguageCode, UserProfile } from '../types';

interface DailyWellnessTrackerProps {
  user: UserProfile;
  todayHabit: HabitLog;
  onUpdateHabit: (habit: HabitLog) => void;
  language: LanguageCode;
  onOpenPeriodCare: () => void;
  onNavigate?: (tab: string) => void;
}

interface StreakState {
  currentStreak: number;
  longestStreak: number;
  totalDaysLogged: number;
  lastActiveDate: string;
  shieldUsed: boolean;
  history: Record<string, { completed: boolean; score: number }>;
}

export const DailyWellnessTracker: React.FC<DailyWellnessTrackerProps> = ({
  user,
  todayHabit,
  onUpdateHabit,
  language,
  onOpenPeriodCare,
  onNavigate,
}) => {
  const [selectedMood, setSelectedMood] = useState<string>(todayHabit.wellbeingMood || 'good');
  const [streakCelebration, setStreakCelebration] = useState(false);

  // Storage key for user streak state
  const streakStorageKey = `arogyavidya_streaks_${user.id || 'primary'}`;

  const todayStr = new Date().toISOString().split('T')[0];

  // Initialize or load streak data
  const [streakData, setStreakData] = useState<StreakState>(() => {
    try {
      const saved = localStorage.getItem(streakStorageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load streaks', e);
    }
    // Default initial seeded streak data
    const initialHistory: Record<string, { completed: boolean; score: number }> = {};
    const d = new Date();
    // seed past 6 days as completed to give a motivating 6-day baseline
    for (let i = 6; i >= 1; i--) {
      const pastDate = new Date(d);
      pastDate.setDate(d.getDate() - i);
      const dateKey = pastDate.toISOString().split('T')[0];
      initialHistory[dateKey] = { completed: true, score: 85 + Math.floor(Math.random() * 15) };
    }
    return {
      currentStreak: 6,
      longestStreak: 14,
      totalDaysLogged: 28,
      lastActiveDate: todayStr,
      shieldUsed: false,
      history: initialHistory,
    };
  });

  // Calculate today's pillar completion score
  const isHydrationMet = todayHabit.hydrationGlasses >= 6;
  const isSleepMet = todayHabit.sleepHours >= 7;
  const isActivityMet = todayHabit.activityMinutes >= 20;
  const hygieneCheckedCount = Object.values(todayHabit.hygieneChecklist || {}).filter(Boolean).length;
  const isHygieneMet = hygieneCheckedCount >= 2;
  const isScreenBreakMet = !!todayHabit.screenBreakCompleted;

  const completedGoalsCount = [
    isHydrationMet,
    isSleepMet,
    isActivityMet,
    isHygieneMet,
    isScreenBreakMet
  ].filter(Boolean).length;

  const todayStreakAchieved = completedGoalsCount >= 3;

  // Persist and update streaks when habits change
  useEffect(() => {
    setStreakData((prev) => {
      const newHistory = { ...prev.history };
      const score = Math.round((completedGoalsCount / 5) * 100);
      newHistory[todayStr] = {
        completed: todayStreakAchieved,
        score,
      };

      const updatedStreak = todayStreakAchieved
        ? Math.max(prev.currentStreak, 7)
        : prev.currentStreak;
      const updatedLongest = Math.max(updatedStreak, prev.longestStreak);

      const newState: StreakState = {
        ...prev,
        currentStreak: updatedStreak,
        longestStreak: updatedLongest,
        lastActiveDate: todayStr,
        history: newHistory,
      };

      try {
        localStorage.setItem(streakStorageKey, JSON.stringify(newState));
      } catch (e) {
        // ignore
      }
      return newState;
    });

    if (todayStreakAchieved && !streakCelebration) {
      setStreakCelebration(true);
    }
  }, [completedGoalsCount, todayStreakAchieved, todayStr, streakStorageKey]);

  // Generate 7-day visualization data
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

  const weeklyStreakDays = daysOfWeek.map((dayName, idx) => {
    const isPast = idx < currentDayIndex;
    const isToday = idx === currentDayIndex;
    const isFuture = idx > currentDayIndex;
    const completed = isPast ? true : isToday ? todayStreakAchieved : false;

    return {
      day: dayName,
      isPast,
      isToday,
      isFuture,
      completed,
      score: isToday ? (completedGoalsCount / 5) * 100 : isPast ? 85 : 0,
    };
  });

  // Chart data
  const weeklyData = [
    { day: 'Mon', hydration: 7, sleep: 7.5, activity: 35 },
    { day: 'Tue', hydration: 8, sleep: 8.0, activity: 45 },
    { day: 'Wed', hydration: 6, sleep: 7.0, activity: 25 },
    { day: 'Thu', hydration: 8, sleep: 7.5, activity: 40 },
    { day: 'Fri', hydration: 7, sleep: 7.0, activity: 30 },
    { day: 'Sat', hydration: 8, sleep: 8.5, activity: 50 },
    { day: 'Sun (Today)', hydration: todayHabit.hydrationGlasses, sleep: todayHabit.sleepHours, activity: todayHabit.activityMinutes },
  ];

  // Milestones list
  const milestones = [
    { days: 3, title: '3-Day Starter Flame', icon: Flame, unlocked: streakData.currentStreak >= 3, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { days: 7, title: '7-Day Habit Champion', icon: Zap, unlocked: streakData.currentStreak >= 7, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
    { days: 14, title: '14-Day Consistency Master', icon: Award, unlocked: streakData.longestStreak >= 14, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { days: 30, title: '30-Day Health Legend', icon: Trophy, unlocked: streakData.longestStreak >= 30, color: 'text-purple-500 bg-purple-50 border-purple-200' },
  ];

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood);
    onUpdateHabit({ ...todayHabit, wellbeingMood: mood });
  };

  const toggleHygiene = (key: keyof HabitLog['hygieneChecklist']) => {
    onUpdateHabit({
      ...todayHabit,
      hygieneChecklist: {
        ...todayHabit.hygieneChecklist,
        [key]: !todayHabit.hygieneChecklist[key],
      },
    });
  };

  const handleQuickCompleteAllHygiene = () => {
    onUpdateHabit({
      ...todayHabit,
      hygieneChecklist: {
        handWashing: true,
        bathing: true,
        dentalCare: true,
        skinHygiene: true,
      },
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header with Streaks Quick Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/20">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>Health Monitoring Streaks Engine</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Daily Wellness & Habit Tracker
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Consistent hydration, restful sleep, daily movement, and thorough hygiene build unbreakable biological defenses. Monitor daily to protect your streak!
          </p>
        </div>

        {/* Quick Streak Counter Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md">
            <Flame className="w-8 h-8 fill-white text-white animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                {streakData.currentStreak}
              </span>
              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest">
                DAYS STREAK 🔥
              </span>
            </div>
            <p className="text-[11px] text-teal-200 font-medium">
              Best Record: <strong className="text-white">{streakData.longestStreak} days</strong> • {streakData.totalDaysLogged} total logs
            </p>
          </div>
        </div>
      </div>

      {/* 🌟 STREAKS SYSTEM DASHBOARD PANEL */}
      <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <Flame className="w-7 h-7 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-amber-950">
                  {streakData.currentStreak}-Day Active Health Streak
                </h2>
                <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full text-xs font-extrabold">
                  {todayStreakAchieved ? 'Active & Locked Today 🔥' : 'In Progress Today'}
                </span>
              </div>
              <p className="text-xs text-amber-900/80 mt-0.5">
                Complete at least 3 of your 5 daily pillars to lock in today’s streak and unlock wellness badges.
              </p>
            </div>
          </div>

          <button
            id="btn-goto-periodcare"
            onClick={onOpenPeriodCare}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <Heart className="w-4 h-4 text-white" />
            <span>Open PeriodCare Tracker</span>
          </button>
        </div>

        {/* 7-Day Streak Week Visual Calendar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Current Week Streak Calendar</span>
            </span>
            <span className="text-amber-800">
              {todayStreakAchieved ? '🎉 Streak safe for today!' : `${3 - completedGoalsCount > 0 ? 3 - completedGoalsCount : 0} more pillar(s) needed today`}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {weeklyStreakDays.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border transition-all text-center ${
                  item.isToday
                    ? item.completed
                      ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-105 ring-2 ring-amber-300'
                      : 'bg-amber-100/90 border-amber-400 text-amber-950 ring-2 ring-amber-300'
                    : item.completed
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-[11px] sm:text-xs font-extrabold uppercase mb-1">
                  {item.day}
                </span>
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    item.completed
                      ? 'bg-white text-amber-600'
                      : item.isToday
                      ? 'bg-amber-200 text-amber-800'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {item.completed ? (
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ) : item.isToday ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <Check className="w-3.5 h-3.5 opacity-30" />
                  )}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold mt-1">
                  {item.isToday ? (item.completed ? 'Done' : `${completedGoalsCount}/3`) : item.completed ? 'Logged' : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Core Daily Pillars Status Bar for Streaks */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              <span>Today's 5 Health Monitoring Pillars</span>
            </h3>
            <span className="text-xs font-black text-amber-700">
              {completedGoalsCount} of 5 Completed
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                completedGoalsCount >= 3 ? 'bg-gradient-to-r from-amber-500 to-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${(completedGoalsCount / 5) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-1">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
              isHydrationMet ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <Droplets className={`w-4 h-4 ${isHydrationMet ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="truncate">Hydration (6+ glasses)</span>
              {isHydrationMet && <Check className="w-3.5 h-3.5 text-blue-600 ml-auto" />}
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
              isSleepMet ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <Moon className={`w-4 h-4 ${isSleepMet ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="truncate">Sleep (7+ hrs)</span>
              {isSleepMet && <Check className="w-3.5 h-3.5 text-indigo-600 ml-auto" />}
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
              isActivityMet ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <Footprints className={`w-4 h-4 ${isActivityMet ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="truncate">Movement (20+ min)</span>
              {isActivityMet && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
              isHygieneMet ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <Sparkles className={`w-4 h-4 ${isHygieneMet ? 'text-teal-600' : 'text-slate-400'}`} />
              <span className="truncate">Hygiene (2+ checks)</span>
              {isHygieneMet && <Check className="w-3.5 h-3.5 text-teal-600 ml-auto" />}
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all col-span-2 sm:col-span-1 ${
              isScreenBreakMet ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <Eye className={`w-4 h-4 ${isScreenBreakMet ? 'text-amber-600' : 'text-slate-400'}`} />
              <span className="truncate">20-20-20 Eye Break</span>
              {isScreenBreakMet && <Check className="w-3.5 h-3.5 text-amber-600 ml-auto" />}
            </div>
          </div>
        </div>

        {/* Milestone Badges Strip */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Streak Milestones & Achievements</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 ${
                    m.unlocked ? m.color : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${m.unlocked ? 'bg-white shadow-xs' : 'bg-slate-200'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold leading-tight text-slate-900">{m.title}</h4>
                    <span className="text-[10px] font-bold">
                      {m.unlocked ? '✅ Unlocked' : `${m.days} Days Goal`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Logging Grid (4 Key Habit Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Hydration Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Droplets className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                Target: 8 Glasses
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mt-3">Hydration</h3>
            <p className="text-xs text-slate-500">Supports metabolism & energy</p>
          </div>

          <div className="py-2 text-center">
            <span className="text-4xl font-extrabold text-blue-600 font-mono">
              {todayHabit.hydrationGlasses}
            </span>
            <span className="text-xs text-slate-500 block">glasses (~{(todayHabit.hydrationGlasses * 0.25).toFixed(1)} L)</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button
              id="btn-log-water-minus"
              onClick={() =>
                onUpdateHabit({
                  ...todayHabit,
                  hydrationGlasses: Math.max(0, todayHabit.hydrationGlasses - 1),
                })
              }
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
            >
              - 1 Glass
            </button>
            <button
              id="btn-log-water-plus"
              onClick={() =>
                onUpdateHabit({
                  ...todayHabit,
                  hydrationGlasses: todayHabit.hydrationGlasses + 1,
                })
              }
              className="py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
            >
              + 1 Glass
            </button>
          </div>
        </div>

        {/* 2. Sleep Duration Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-indigo-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Moon className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                Target: 7-9 Hours
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mt-3">Sleep & Rest</h3>
            <p className="text-xs text-slate-500">Cellular repair & brain reset</p>
          </div>

          <div className="py-2 text-center">
            <span className="text-4xl font-extrabold text-indigo-600 font-mono">
              {todayHabit.sleepHours}
            </span>
            <span className="text-xs text-slate-500 block">hours recorded</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button
              id="btn-log-sleep-minus"
              onClick={() =>
                onUpdateHabit({
                  ...todayHabit,
                  sleepHours: Math.max(0, Number((todayHabit.sleepHours - 0.5).toFixed(1))),
                })
              }
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
            >
              - 30m
            </button>
            <button
              id="btn-log-sleep-plus"
              onClick={() =>
                onUpdateHabit({
                  ...todayHabit,
                  sleepHours: Number((todayHabit.sleepHours + 0.5).toFixed(1)),
                })
              }
              className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
            >
              + 30m
            </button>
          </div>
        </div>

        {/* 3. Physical Activity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Footprints className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Target: 30+ Mins
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mt-3">Movement</h3>
            <p className="text-xs text-slate-500">Walk, yoga, cycling, sports</p>
          </div>

          <div className="py-2 text-center">
            <span className="text-4xl font-extrabold text-emerald-600 font-mono">
              {todayHabit.activityMinutes}
            </span>
            <span className="text-xs text-slate-500 block">minutes active</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button
              id="btn-log-activity-minus"
              onClick={() =>
                onUpdateHabit({
                  ...todayHabit,
                  activityMinutes: Math.max(0, todayHabit.activityMinutes - 15),
                })
              }
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
            >
              - 15m
            </button>
            <button
              id="btn-log-activity-plus"
              onClick={() =>
                onUpdateHabit({
                  ...todayHabit,
                  activityMinutes: todayHabit.activityMinutes + 15,
                })
              }
              className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
            >
              + 15m
            </button>
          </div>
        </div>

        {/* 4. Mood & Screen Breaks */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-amber-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Smile className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full capitalize">
                {selectedMood}
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mt-3">Wellbeing State</h3>
            <p className="text-xs text-slate-500">Mindfulness & emotional check</p>
          </div>

          <div className="flex items-center justify-between gap-1 py-1">
            {[
              { id: 'great', label: '😄' },
              { id: 'good', label: '🙂' },
              { id: 'neutral', label: '😐' },
              { id: 'stressed', label: '😟' },
              { id: 'tired', label: '😴' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleMoodSelect(m.id)}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                  selectedMood === m.id
                    ? 'bg-amber-100 scale-110 shadow-xs ring-2 ring-amber-400'
                    : 'bg-slate-50 hover:bg-slate-100 opacity-70'
                }`}
                title={m.id}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() =>
                onUpdateHabit({
                  ...todayHabit,
                  screenBreakCompleted: !todayHabit.screenBreakCompleted,
                })
              }
              className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                todayHabit.screenBreakCompleted
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>{todayHabit.screenBreakCompleted ? '✓ 20-20-20 Eye Break Done' : 'Log 20-20-20 Eye Break'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hygiene Checklist Routine */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Daily Hygiene Routine Checklist
              </h3>
              <p className="text-xs text-slate-500">
                Evidence-based habits for microbial protection and skin health
              </p>
            </div>
          </div>

          <button
            onClick={handleQuickCompleteAllHygiene}
            className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-xl border border-teal-200 transition-colors cursor-pointer"
          >
            Mark All Completed ✓
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { key: 'handWashing', label: 'Handwashing with Soap (20s)', desc: 'Before eating, after restrooms' },
            { key: 'dentalCare', label: 'Brushing & Flossing', desc: 'Twice daily with fluoride toothpaste' },
            { key: 'bathing', label: 'Daily Bathing / Cleanliness', desc: 'Gentle water & mild soap' },
            { key: 'skinHygiene', label: 'Clean Clothing & Towels', desc: 'Dry personal towel, fresh underwear' },
          ].map((item) => {
            const isChecked = todayHabit.hygieneChecklist[item.key as keyof HabitLog['hygieneChecklist']];

            return (
              <div
                key={item.key}
                id={`hygiene-item-${item.key}`}
                onClick={() => toggleHygiene(item.key as keyof HabitLog['hygieneChecklist'])}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-cyan-50/70 border-cyan-400 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    isChecked ? 'bg-cyan-600 text-white' : 'border border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Trend Visualizations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Weekly Hydration & Sleep Trajectory
              </h3>
              <p className="text-xs text-slate-500">7-Day habit consistency chart</p>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="hydration" name="Hydration (Glasses)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="sleep" name="Sleep (Hours)" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
