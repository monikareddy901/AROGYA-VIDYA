import React from 'react';
import {
  HeartPulse,
  BookOpen,
  FileText,
  Stethoscope,
  Pill,
  Sparkles,
  Shield,
  UserCheck,
  Calendar,
  Lock,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface LandingPageProps {
  language: LanguageCode;
  onGetStarted: () => void;
  onExploreHealth: () => void;
  onSelectFeature: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onGetStarted,
  onExploreHealth,
  onSelectFeature,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const featureCards = [
    {
      id: 'learn',
      title: '🧠 Learn (Health Education Hub)',
      description: 'Respectful, age-appropriate, and evidence-based education covering puberty, reproductive health, mental wellbeing, and nutrition.',
      icon: BookOpen,
      color: 'from-teal-500/10 to-teal-500/5 text-teal-700 border-teal-200'
    },
    {
      id: 'reports',
      title: '📄 Understand Reports',
      description: 'Upload lab reports (CBC, Lipid, Metabolic) and get plain-language biomarker explanations using report-specific reference ranges.',
      icon: FileText,
      color: 'from-blue-500/10 to-blue-500/5 text-blue-700 border-blue-200'
    },
    {
      id: 'symptoms',
      title: '🩺 Symptom Navigator',
      description: 'Structured 4-step safety triage with non-diagnostic guidance (🟢 Monitor, 🟡 Consider Care, 🔴 Seek Urgent Care).',
      icon: Stethoscope,
      color: 'from-emerald-500/10 to-emerald-500/5 text-emerald-700 border-emerald-200'
    },
    {
      id: 'medicines',
      title: '💊 Manage Medicines',
      description: 'Track daily prescribed doses, adherence history, and get helpful safety advisories if doses are missed.',
      icon: Pill,
      color: 'from-purple-500/10 to-purple-500/5 text-purple-700 border-purple-200'
    },
    {
      id: 'hygiene',
      title: '🧼 Hygiene Center',
      description: 'Practical guides for hand, dental, scalp, foot, and external intimate care—without harmful chemicals or internal douches.',
      icon: Sparkles,
      color: 'from-cyan-500/10 to-cyan-500/5 text-cyan-700 border-cyan-200'
    },
    {
      id: 'preventive',
      title: '📅 Preventive Care',
      description: 'Personalized routine health schedules: dental cleanings, vision checks, vaccinations, and age-based screening reviews.',
      icon: Calendar,
      color: 'from-amber-500/10 to-amber-500/5 text-amber-700 border-amber-200'
    },
    {
      id: 'doctorPrep',
      title: '👨‍⚕️ Doctor Preparation',
      description: 'Organize symptoms, medications, and duration into a concise briefing sheet with high-value questions to ask your clinician.',
      icon: UserCheck,
      color: 'from-indigo-500/10 to-indigo-500/5 text-indigo-700 border-indigo-200'
    },
    {
      id: 'emergencyCard',
      title: '🚨 Emergency Health Card',
      description: 'User-controlled emergency QR card for first responders with blood group, allergies, contacts, and privacy toggles.',
      icon: Shield,
      color: 'from-rose-500/10 to-rose-500/5 text-rose-700 border-rose-200'
    }
  ];

  const steps = [
    { step: '01', title: 'LEARN', desc: 'Explore clear, stigma-free health and hygiene knowledge verified by global clinical guidelines.' },
    { step: '02', title: 'UNDERSTAND', desc: 'Demystify medical terminology and lab reports in plain, reassuring language.' },
    { step: '03', title: 'TRACK', desc: 'Log daily wellness habits, hydration, sleep, adherence, and menstrual cycles seamlessly.' },
    { step: '04', title: 'PREPARE', desc: 'Structure your health questions and history for productive, confident doctor visits.' },
    { step: '05', title: 'ACT', desc: 'Navigate symptoms safely and take informed next steps with 24/7 safety guardrails.' }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-medium">
              <HeartPulse className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>AI-Powered • Inclusive Health Navigation & Education</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
              <span className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
                AROGYAVIDYA
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-2">
                “Learn • Understand • Care • Live Better”
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                id="btn-hero-get-started"
                onClick={onGetStarted}
                className="px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-base rounded-xl shadow-lg shadow-teal-700/20 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.getStarted}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="btn-hero-explore-health"
                onClick={onExploreHealth}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.exploreHealth}</span>
                <BookOpen className="w-5 h-5 text-teal-600" />
              </button>
            </div>

            {/* Reassuring Stats & Trust signals */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium block">Non-Diagnostic</span>
                <span className="text-sm font-bold text-slate-800">100% Safety First</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium block">Trusted Sources</span>
                <span className="text-sm font-bold text-slate-800">WHO, CDC, AIIMS</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium block">Inclusivity</span>
                <span className="text-sm font-bold text-slate-800">All Bodies & Genders</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium block">Data Privacy</span>
                <span className="text-sm font-bold text-slate-800">Zero Selling of Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Comprehensive Platform
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Everything You Need for Health Awareness
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Designed to bridge the gap between confusion and confident healthcare conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                id={`card-feature-${feat.id}`}
                onClick={() => onSelectFeature(feat.id)}
                className={`p-6 rounded-2xl bg-white border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between group ${feat.color}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
                <div className="pt-4 flex items-center gap-1 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works: LEARN -> UNDERSTAND -> TRACK -> PREPARE -> ACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mb-10">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-wider block mb-2">
              The HealthBridge Methodology
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display">
              LEARN → UNDERSTAND → TRACK → PREPARE → ACT
            </h3>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              We empower you with accurate health intelligence so you always know the safe, right next step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-teal-300 font-mono font-bold text-sm block mb-2">{item.step}</span>
                  <h4 className="font-bold text-white text-base mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 text-teal-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HealthBridge & Inclusive Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Inclusive Healthcare Section */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Healthcare Built for Every Human Being
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              HealthBridge is deliberately built for teenagers, adults, men, women, transgender and gender-diverse individuals, elderly users, and families. 
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>No Stereotypes or Assumptions:</strong> We never assume a person's anatomy, gender identity, or condition.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Organ-Based Preventive Screening:</strong> Science-backed screenings matching the organs present in your body.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Respectful & Safe Communication:</strong> Guidance on discussing your health boundaries openly with clinicians.</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Data Sovereignty Section */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Your Data. Your Absolute Control.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Medical and wellness data is deeply sensitive. HealthBridge operates on strict data minimization principles.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Third-Party Data Selling:</strong> We never monetize or sell personal or health data.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>One-Click Export & Deletion:</strong> Instantly download your full health history or wipe all data permanently.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Selective Emergency QR Sharing:</strong> You choose exactly which fields appear on your emergency health card.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Safety Manifesto / Disclaimer Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-900 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-base text-amber-950">
                HealthBridge Safety Commitment
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 max-w-3xl leading-relaxed">
                HealthBridge empowers you with education to prepare for healthcare consultations. It does NOT diagnose diseases, prescribe medication, or replace clinical examination. In emergencies, please dial <strong>112</strong> immediately.
              </p>
            </div>
          </div>

          <button
            id="btn-landing-start-journey"
            onClick={onGetStarted}
            className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 text-white text-xs sm:text-sm font-semibold rounded-xl shrink-0 transition-colors cursor-pointer"
          >
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};
