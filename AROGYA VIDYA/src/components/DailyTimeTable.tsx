import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  CheckCircle2, 
  Circle, 
  Sun, 
  SunMedium, 
  Sunset, 
  Moon, 
  Sparkles, 
  Check, 
  RotateCcw,
  Info,
  ShieldCheck,
  AlertTriangle,
  Briefcase,
  ThumbsUp,
  Ban,
  ChevronRight,
  User,
  ArrowLeft
} from 'lucide-react';
import { PROFESSION_ROUTINES } from '../data/timetableData';
import { TimeTableItem, ProfessionType, UserProfile } from '../types';

interface DailyTimeTableProps {
  currentProfile?: UserProfile;
  onNavigate?: (tab: any) => void;
}

export const DailyTimeTable: React.FC<DailyTimeTableProps> = ({ currentProfile, onNavigate }) => {
  // Determine default profession based on active profile or software_engineer
  const initialProfession: ProfessionType = currentProfile?.profession || 'software_engineer';
  const [selectedProfession, setSelectedProfession] = useState<ProfessionType>(initialProfession);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`arogya_routine_${currentProfile?.id || 'monika'}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Sync when profile changes
  useEffect(() => {
    if (currentProfile?.profession) {
      setSelectedProfession(currentProfile.profession);
    }
  }, [currentProfile?.id, currentProfile?.profession]);

  const currentRoutine = PROFESSION_ROUTINES[selectedProfession] || PROFESSION_ROUTINES.software_engineer;
  const [activeItem, setActiveItem] = useState<TimeTableItem | null>(currentRoutine.schedule[0] || null);

  // Sync active item when profession changes
  useEffect(() => {
    if (currentRoutine.schedule.length > 0) {
      setActiveItem(currentRoutine.schedule[0]);
    }
  }, [selectedProfession]);

  useEffect(() => {
    localStorage.setItem(
      `arogya_routine_${currentProfile?.id || 'monika'}`,
      JSON.stringify(completedItems)
    );
  }, [completedItems, currentProfile?.id]);

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetAll = () => {
    if (window.confirm('Reset your daily habit progress for today?')) {
      setCompletedItems({});
    }
  };

  const filteredItems = selectedPeriod === 'All'
    ? currentRoutine.schedule
    : currentRoutine.schedule.filter(item => item.period === selectedPeriod);

  const completedCount = currentRoutine.schedule.filter(item => completedItems[item.id]).length;
  const totalCount = currentRoutine.schedule.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const professionOptions: { id: ProfessionType; label: string; icon: string }[] = [
    { id: 'software_engineer', label: 'Software / IT', icon: '💻' },
    { id: 'doctor_nurse', label: 'Doctor / Nurse', icon: '🩺' },
    { id: 'student', label: 'Student', icon: '🎓' },
    { id: 'teacher', label: 'Teacher / Prof', icon: '🧑‍🏫' },
    { id: 'desk_corporate', label: 'Corporate / Desk', icon: '💼' },
    { id: 'field_worker', label: 'Field / Labor', icon: '🏗️' },
    { id: 'night_shift', label: 'Night Shift / BPO', icon: '🌙' },
    { id: 'homemaker', label: 'Homemaker', icon: '🏡' },
    { id: 'other', label: 'Universal', icon: '⚡' }
  ];

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'Morning': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Midday': return <SunMedium className="w-4 h-4 text-orange-500" />;
      case 'Afternoon': return <SunMedium className="w-4 h-4 text-yellow-600" />;
      case 'Evening': return <Sunset className="w-4 h-4 text-rose-500" />;
      case 'Night': return <Moon className="w-4 h-4 text-indigo-500" />;
      default: return <Clock className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>← Back to Dashboard</span>
              </button>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600/60 backdrop-blur-md text-teal-100 text-xs font-bold uppercase tracking-wider border border-teal-400/30">
                <Briefcase className="w-3.5 h-3.5" />
                Profession-Customized Health Care
              </span>
            </div>
            {currentProfile && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
                <User className="w-3 h-3 text-teal-300" />
                Active Profile: {currentProfile.name}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>{currentRoutine.icon}</span>
            <span>{currentRoutine.title} Routine</span>
          </h1>

          <p className="text-teal-100 text-base sm:text-lg leading-relaxed">
            {currentRoutine.subtitle}. Customized daily habits, strict medical precautions, and 24-hour schedule tailored to your work style.
          </p>

          {/* Daily Progress Bar */}
          <div className="bg-teal-950/60 backdrop-blur-md rounded-2xl p-4 border border-teal-500/30 mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-teal-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Today's Work-Life Health Routine Progress
              </span>
              <span className="font-bold text-white bg-teal-600/80 px-2.5 py-0.5 rounded-full text-xs">
                {completedCount} / {totalCount} Completed ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-teal-950/80 rounded-full h-3 overflow-hidden p-0.5">
              <motion.div 
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profession Selector Switcher */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-teal-600" />
            Switch Daily Routine by Profession / Work Type:
          </label>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {professionOptions.map((prof) => {
            const isSelected = selectedProfession === prof.id;
            return (
              <button
                key={prof.id}
                id={`btn-select-prof-${prof.id}`}
                onClick={() => setSelectedProfession(prof.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-700/30'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                }`}
              >
                <span className="text-base">{prof.icon}</span>
                <span>{prof.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* WHAT TO DO vs WHAT NOT TO DO GRID (HIGH PROMINENCE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WHAT TO DO (GREEN / POSITIVE PRACTICES) */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-900 border-b border-emerald-200 pb-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-emerald-950">
                WHAT YOU SHOULD DO (Work Best Practices)
              </h3>
              <p className="text-xs text-emerald-800 font-medium">
                Mandatory habits to sustain high energy, posture, and health
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentRoutine.whatToDo.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs flex items-start gap-3"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT NOT TO DO (RED / CRITICAL PITFALLS) */}
        <div className="bg-rose-50/70 border-2 border-rose-300 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-rose-900 border-b border-rose-200 pb-3">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <Ban className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-rose-950">
                WHAT YOU MUST NOT DO (Critical Health Hazards)
              </h3>
              <p className="text-xs text-rose-800 font-medium">
                Dangerous habits that cause body strain, burnout, and chronic disease
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentRoutine.whatNOTToDo.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-2xl border border-rose-200/80 shadow-xs flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-xs">
                  ✕
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-bold text-rose-950 text-sm">{item.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                      {item.risk}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.warning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Period Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Morning', 'Midday', 'Afternoon', 'Evening', 'Night'].map((period) => (
            <button
              key={period}
              id={`tab-period-${period.toLowerCase()}`}
              onClick={() => setSelectedPeriod(period)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                selectedPeriod === period
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 ring-2 ring-teal-700/50'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {period !== 'All' && getPeriodIcon(period)}
              <span>{period} Schedule</span>
            </button>
          ))}
        </div>

        {completedCount > 0 && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-rose-600 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Progress
          </button>
        )}
      </div>

      {/* Main Grid: List on Left, Deep Detail Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Timetable Cards */}
        <div className="lg:col-span-7 space-y-4">
          {filteredItems.map((item, idx) => {
            const isDone = Boolean(completedItems[item.id]);
            const isSelected = activeItem?.id === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveItem(item)}
                id={`timetable-card-${item.id}`}
                className={`cursor-pointer rounded-2xl p-5 border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-teal-50/70 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                    : isDone
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-teal-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Complete Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item.id);
                    }}
                    id={`toggle-item-${item.id}`}
                    aria-label={`Mark ${item.title} as completed`}
                    className={`mt-1 flex-shrink-0 p-1 rounded-full transition-transform active:scale-90 ${
                      isDone
                        ? 'text-emerald-700 hover:text-emerald-800'
                        : 'text-slate-500 hover:text-teal-700'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  {/* Content Preview */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {getPeriodIcon(item.period)}
                        {item.timeSlot}
                      </span>
                      <span className="text-xs font-medium text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md capitalize">
                        {item.category.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className={`text-base font-bold transition-colors ${
                      isDone ? 'line-through text-slate-500' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-700 text-sm mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    isSelected ? 'text-teal-600 translate-x-1' : 'text-slate-300'
                  }`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Interactive Detail & Scientific Action Box */}
        <div className="lg:col-span-5 sticky top-6">
          {activeItem ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              {activeItem.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                      {activeItem.timeSlot}
                    </span>
                    <h2 className="text-lg font-bold drop-shadow-md">
                      {activeItem.title}
                    </h2>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Action Overview
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                {/* Step-by-Step Instructions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-teal-600" />
                    How to do this step-by-step
                  </h4>
                  <ol className="space-y-2.5">
                    {activeItem.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Scientific Reason (Why it works) */}
                <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 text-amber-900 text-xs sm:text-sm space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <Info className="w-4 h-4 text-amber-600" />
                    Why Doctors & Ergonomists Recommend This
                  </div>
                  <p className="text-amber-800/90 leading-relaxed">
                    {activeItem.scientificWhy}
                  </p>
                </div>

                {/* Toggle Action */}
                <button
                  type="button"
                  onClick={() => toggleItem(activeItem.id)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    completedItems[activeItem.id]
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  {completedItems[activeItem.id] ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Completed for Today! (Click to undo)
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5" />
                      Mark As Done Today
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400">
              Select any activity from the timetable on the left to view steps and pictures.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
