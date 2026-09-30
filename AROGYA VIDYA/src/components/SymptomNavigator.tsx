import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  UserCheck,
  PhoneCall,
  Activity,
  Calendar,
  Clock,
  Sparkles,
  Info,
  ArrowLeft
} from 'lucide-react';
import { LanguageCode, SymptomSession, UserProfile } from '../types';
import { AIService, HealthBridgeStorage } from '../services/api';

interface SymptomNavigatorProps {
  user: UserProfile;
  language: LanguageCode;
  onOpenEmergency: () => void;
  onNavigateToDoctorPrep: (symptomData: any) => void;
  onNavigate?: (tab: string) => void;
}

export const SymptomNavigator: React.FC<SymptomNavigatorProps> = ({
  user,
  language,
  onOpenEmergency,
  onNavigateToDoctorPrep,
  onNavigate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [bodyRegion, setBodyRegion] = useState<string>('Head & Neck');
  const [primarySymptom, setPrimarySymptom] = useState<string>('');
  const [duration, setDuration] = useState<string>('1-2 days');
  const [severity, setSeverity] = useState<number>(3);
  const [associatedSymptoms, setAssociatedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  // Assessment Result State
  const [loading, setLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    urgencyLevel: 'MONITOR' | 'CONSIDER_CARE' | 'SEEK_URGENT_CARE';
    summary: string;
    generalEducation: string[];
    monitoringGuidance: string[];
    whenToConsultDoctor: string[];
    safetyDisclaimer: string;
  } | null>(null);

  const bodyRegions = [
    { id: 'Head & Neck', icon: '🧠', examples: 'Headache, sinus pressure, sore throat, vision strain' },
    { id: 'Chest & Heart', icon: '🫀', examples: 'Cough, mild congestion, rib soreness (Emergency if acute chest pressure)' },
    { id: 'Abdomen & Digestion', icon: '🫄', examples: 'Bloating, heartburn, mild cramping, nausea' },
    { id: 'Pelvic & Reproductive', icon: '🌸', examples: 'Menstrual cramps, localized soreness, urinary frequency' },
    { id: 'Musculoskeletal & Limbs', icon: '🦴', examples: 'Joint stiffness, muscle ache, back tightness' },
    { id: 'Skin & Surface', icon: '🩹', examples: 'Dryness, mild rash, itchiness, minor bump' },
    { id: 'General & Energy', icon: '⚡', examples: 'Fatigue, mild feverishness, malaise' },
  ];

  const commonAssociated = [
    'Mild Fever (< 100.4°F)',
    'Fatigue or low energy',
    'Nausea or reduced appetite',
    'Mild dizziness or lightheadedness',
    'Muscle soreness',
    'Poor sleep or insomnia',
    'Stress or anxiety',
    'Congestion / Runny nose'
  ];

  const toggleAssociated = (symptom: string) => {
    if (associatedSymptoms.includes(symptom)) {
      setAssociatedSymptoms(associatedSymptoms.filter((s) => s !== symptom));
    } else {
      setAssociatedSymptoms([...associatedSymptoms, symptom]);
    }
  };

  const handleEvaluate = async () => {
    setLoading(true);
    setStep(3); // Scanning step

    try {
      const result = await AIService.evaluateSymptoms({
        bodyRegion,
        primarySymptom: primarySymptom.trim() || 'General discomfort',
        duration,
        severity,
        associatedSymptoms,
        notes,
      });

      setAssessmentResult(result);

      // Save to local storage timeline
      HealthBridgeStorage.addTimelineEvent({
        id: 'tl-sym-' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: `Symptom Check: ${primarySymptom || 'Symptom Entry'}`,
        description: `Region: ${bodyRegion} | Severity: ${severity}/10 | Urgency: ${result.urgencyLevel}`,
        type: 'symptom',
        badge: 'Symptom Log'
      });

      setTimeout(() => {
        setStep(4);
        setLoading(false);
      }, 900);
    } catch (e) {
      setStep(4);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setPrimarySymptom('');
    setSeverity(3);
    setAssociatedSymptoms([]);
    setNotes('');
    setAssessmentResult(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-teal-100 text-xs font-semibold">
              <Stethoscope className="w-4 h-4 text-teal-300" />
              <span>Structured Health Navigation</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Symptom Navigator & Safety Triage
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Record what you are experiencing in a safe, structured format. HealthBridge evaluates urgency signals without delivering speculative diagnoses, guiding you toward the appropriate care level.
          </p>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Important Medical Notice:</strong> This tool is an educational safety evaluator. It does NOT diagnose illnesses. If you experience severe chest pain, sudden numbness, slurred speech, acute shortness of breath, or uncontrollable bleeding, call <strong>112</strong> immediately.
        </div>
      </div>

      {/* Progress Steps Indicator */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold text-slate-600">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>1</span>
            <span className="hidden sm:inline">Symptom Entry</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>2</span>
            <span className="hidden sm:inline">Context & Signs</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>3</span>
            <span className="hidden sm:inline">Safety Scan</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>4</span>
            <span className="hidden sm:inline">Guidance</span>
          </div>
        </div>
      </div>

      {/* STEP 1: Symptom Entry */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Step 1: Where and what are you experiencing?
          </h2>

          {/* Body Region Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Body Region
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {bodyRegions.map((region) => (
                <div
                  key={region.id}
                  id={`region-${region.id.replace(/\s+/g, '')}`}
                  onClick={() => setBodyRegion(region.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                    bodyRegion === region.id
                      ? 'bg-teal-50 border-teal-600 shadow-xs ring-1 ring-teal-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{region.icon}</span>
                    <h4 className="text-xs font-bold text-slate-900">{region.id}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {region.examples}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Symptom Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Describe the Primary Symptom
            </label>
            <input
              id="input-primary-symptom"
              type="text"
              value={primarySymptom}
              onChange={(e) => setPrimarySymptom(e.target.value)}
              placeholder="e.g. Mild throbbing headache on forehead, slight throat dryness, or joint stiffness..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Duration & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Duration
              </label>
              <select
                id="select-symptom-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Less than 6 hours">Less than 6 hours</option>
                <option value="1-2 days">1 - 2 days</option>
                <option value="3-5 days">3 - 5 days</option>
                <option value="1-2 weeks">1 - 2 weeks</option>
                <option value="More than a month">More than a month (Chronic)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Discomfort / Severity Scale
                </label>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  severity <= 3 ? 'bg-emerald-100 text-emerald-800' : severity <= 6 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {severity} / 10 ({severity <= 3 ? 'Mild' : severity <= 6 ? 'Moderate' : 'Severe'})
                </span>
              </div>
              <input
                id="range-symptom-severity"
                type="range"
                min={1}
                max={10}
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 (Barely noticeable)</span>
                <span>5 (Moderate)</span>
                <span>10 (Extremely severe)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              id="btn-symptom-next-step"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Context & Signs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Context & Associated Signs */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Step 2: Are you experiencing any associated signs?
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Any Accompanying Factors
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {commonAssociated.map((sym, idx) => {
                const isSelected = associatedSymptoms.includes(sym);
                return (
                  <div
                    key={idx}
                    id={`associated-sign-${idx}`}
                    onClick={() => toggleAssociated(sym)}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{sym}</span>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Additional Context (Triggers, what makes it better/worse, active medications)
            </label>
            <textarea
              id="textarea-symptom-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Started after long hours at computer screen; improves slightly when resting in a quiet room..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Back
            </button>
            <button
              id="btn-evaluate-symptoms"
              onClick={handleEvaluate}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Run Safety Triage Scan</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Scanning Animation */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto animate-pulse">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Evaluating Safety Signals...
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Checking clinical guidelines for danger flags, home observation criteria, and doctor preparation points.
          </p>
        </div>
      )}

      {/* STEP 4: Results & Guidance */}
      {step === 4 && assessmentResult && (
        <div className="space-y-6 animate-in fade-in">
          {/* Urgency Badge Header */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-md ${
              assessmentResult.urgencyLevel === 'SEEK_URGENT_CARE'
                ? 'bg-red-50 border-red-300 text-red-950'
                : assessmentResult.urgencyLevel === 'CONSIDER_CARE'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                    assessmentResult.urgencyLevel === 'SEEK_URGENT_CARE'
                      ? 'bg-red-600 text-white'
                      : assessmentResult.urgencyLevel === 'CONSIDER_CARE'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {assessmentResult.urgencyLevel === 'SEEK_URGENT_CARE' && '🔴 SEEK URGENT CARE'}
                  {assessmentResult.urgencyLevel === 'CONSIDER_CARE' && '🟡 CONSIDER PROFESSIONAL CARE'}
                  {assessmentResult.urgencyLevel === 'MONITOR' && '🟢 MONITOR & SELF-CARE'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display pt-2">
                  {assessmentResult.summary}
                </h3>
              </div>

              {assessmentResult.urgencyLevel === 'SEEK_URGENT_CARE' && (
                <button
                  id="btn-urgent-emergency-call"
                  onClick={onOpenEmergency}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg flex items-center gap-2 animate-bounce cursor-pointer shrink-0"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency 112</span>
                </button>
              )}
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* General Education */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-teal-600" />
                <span>Understanding This Area</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {assessmentResult.generalEducation.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monitoring Guidance */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Home Monitoring Tips</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {assessmentResult.monitoringGuidance.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When to see doctor */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>When to Consult a Clinician</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {assessmentResult.whenToConsultDoctor.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Bar: Export to Doctor Prep or Start Over */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              id="btn-restart-symptom-nav"
              onClick={resetForm}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 hover:bg-slate-100 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Check Another Symptom</span>
            </button>

            <button
              id="btn-export-to-doctor-prep"
              onClick={() =>
                onNavigateToDoctorPrep({
                  mainConcern: `${primarySymptom} (${bodyRegion})`,
                  duration,
                  symptoms: [primarySymptom, ...associatedSymptoms],
                  notes,
                })
              }
              className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Prepare Doctor Consultation Sheet</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
