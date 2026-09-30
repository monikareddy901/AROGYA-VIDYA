import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  User, 
  Users, 
  Layers, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Stethoscope,
  Info,
  ArrowLeft
} from 'lucide-react';
import { HYGIENE_BODY_CARE_DATA, HygieneGuideSection } from '../data/hygieneAndBodyCareData';

interface PersonalHygieneHubProps {
  onNavigate?: (tab: any) => void;
}

export const PersonalHygieneHub: React.FC<PersonalHygieneHubProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'girls' | 'boys' | 'transgender' | 'universal'>('girls');
  const [expandedTabooIndex, setExpandedTabooIndex] = useState<number | null>(null);

  const currentSection = HYGIENE_BODY_CARE_DATA.find(sec => sec.category === activeCategory) || HYGIENE_BODY_CARE_DATA[0];

  const categories = [
    { id: 'girls', label: "Girls & Women", icon: Heart, color: 'pink' },
    { id: 'boys', label: "Boys & Men", icon: User, color: 'blue' },
    { id: 'transgender', label: "Transgender & Diverse", icon: Sparkles, color: 'purple' },
    { id: 'universal', label: "All Students & Kids", icon: Users, color: 'emerald' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-700/50 backdrop-blur-md text-teal-200 text-xs font-semibold uppercase tracking-wider border border-teal-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              Respectful • Taboo-Free • Doctor-Reviewed
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Personal Health & Hygiene Hub
          </h1>
          <p className="text-teal-100 text-base sm:text-lg leading-relaxed">
            Clear, step-by-step hygiene instructions for girls, boys, transgender individuals, and students. Learn how to take care of your body with dignity, safety, and scientific facts.
          </p>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`hygiene-tab-${cat.id}`}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setExpandedTabooIndex(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                isActive
                  ? 'bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-500/30'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />}
              </div>
              <span className="font-bold text-sm sm:text-base leading-tight mt-1">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Section Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={currentSection.headerImage}
            alt={currentSection.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-lg bg-teal-600/90 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Audience: {currentSection.targetAudience}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              {currentSection.title}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
              {currentSection.summary}
            </p>
          </div>
        </div>

        {/* Step-by-Step Action Guide */}
        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-600" />
              Step-by-Step Instructions with Visual Guidance
            </h3>
            <p className="text-slate-500 text-sm">
              Follow these simple everyday steps to maintain clean, fresh, and infection-free health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSection.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-300 transition-all shadow-sm"
              >
                {step.image && (
                  <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                      {step.stepNumber}
                    </span>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-base leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Pro Tip and Mistake Box */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs">
                    {step.proTip && (
                      <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Doctor's Tip:</strong> {step.proTip}</span>
                      </div>
                    )}
                    {step.commonMistakeToAvoid && (
                      <div className="bg-amber-50 text-amber-900 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Avoid This:</strong> {step.commonMistakeToAvoid}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Do's and Don'ts Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* DO's */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-3">
              <h4 className="font-bold text-emerald-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                What You SHOULD Do (Best Habits)
              </h4>
              <ul className="space-y-2 text-sm text-emerald-950">
                {currentSection.dosAndDonts.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONT's */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 space-y-3">
              <h4 className="font-bold text-rose-900 text-base flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                What to NEVER Do (Harmful Myths & Habits)
              </h4>
              <ul className="space-y-2 text-sm text-rose-950">
                {currentSection.dosAndDonts.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Taboo Busters (Indian Family & Cultural Myths) */}
          {currentSection.tabooBusters.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
                <h4 className="font-bold text-slate-900 text-lg">
                  Breaking Superstitions & Family Taboos
                </h4>
              </div>
              <p className="text-slate-600 text-sm">
                Many families in India avoid talking about these topics out of false shame. Here is what science and medicine actually say:
              </p>

              <div className="space-y-3">
                {currentSection.tabooBusters.map((taboo, idx) => {
                  const isExpanded = expandedTabooIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedTabooIndex(isExpanded ? null : idx)}
                        className="w-full p-4 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-2 text-rose-700">
                          <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-semibold">
                            Myth
                          </span>
                          "{taboo.myth}"
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 pt-2 bg-slate-50/50 border-t border-slate-100 space-y-2 text-sm"
                          >
                            <div className="font-semibold text-emerald-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              The Real Scientific Truth: {taboo.truth}
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-5">
                              {taboo.explanation}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* When to see a Doctor */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 space-y-3">
            <h4 className="font-bold text-amber-900 text-base flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-amber-700" />
              When Should You Consult a Healthcare Professional?
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-amber-950">
              {currentSection.whenToSeeDoctor.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-100">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
