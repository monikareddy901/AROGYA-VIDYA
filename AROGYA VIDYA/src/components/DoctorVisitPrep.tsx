import React, { useState } from 'react';
import {
  UserCheck,
  Printer,
  Sparkles,
  ShieldCheck,
  Calendar,
  FileText,
  Clock,
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { LanguageCode, UserProfile, MedicalReport, Medication } from '../types';
import { AIService, HealthBridgeStorage } from '../services/api';

interface DoctorVisitPrepProps {
  user: UserProfile;
  reports: MedicalReport[];
  medications: Medication[];
  initialData?: {
    mainConcern?: string;
    duration?: string;
    symptoms?: string[];
    reports?: string[];
    notes?: string;
  };
  language: LanguageCode;
  onNavigate?: (tab: string) => void;
}

export const DoctorVisitPrep: React.FC<DoctorVisitPrepProps> = ({
  user,
  reports,
  medications,
  initialData,
  language,
  onNavigate,
}) => {
  const [chiefComplaint, setChiefComplaint] = useState(
    initialData?.mainConcern || 'Persistent fatigue and occasional morning headaches'
  );
  const [duration, setDuration] = useState(initialData?.duration || '3 weeks');
  const [severity, setSeverity] = useState('Mild to Moderate (4/10)');
  const [additionalNotes, setAdditionalNotes] = useState(
    initialData?.notes || 'Worse on weekdays; slightly improved on weekends when sleeping 8+ hours.'
  );

  const [loadingAI, setLoadingAI] = useState(false);
  const [consultationQuestions, setConsultationQuestions] = useState<string[]>([
    'What do my recent laboratory biomarker levels (Hemoglobin 10.8 g/dL) indicate?',
    'Could my fatigue be related to nutritional iron status, sleep routines, or another factor?',
    'What specific lifestyle adjustments (diet, hydration, physical activity) would you recommend?',
    'What warning signs should prompt me to seek urgent care before our next follow-up?'
  ]);

  // Post-visit logging state
  const [doctorNotes, setDoctorNotes] = useState('');
  const [nextAppointment, setNextAppointment] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerateQuestions = async () => {
    setLoadingAI(true);
    try {
      const response = await AIService.generateDoctorPrep({
        chiefComplaint,
        duration,
        medications: medications.map((m) => `${m.name} (${m.frequency})`),
        reports: reports.map((r) => r.reportTitle),
      });

      if (response.suggestedQuestions && response.suggestedQuestions.length > 0) {
        setConsultationQuestions(response.suggestedQuestions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAI(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveVisitLog = (e: React.FormEvent) => {
    e.preventDefault();
    HealthBridgeStorage.addTimelineEvent({
      id: 'tl-doc-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: `Doctor Consultation: ${chiefComplaint}`,
      description: doctorNotes || `Prepared consultation brief for clinic visit.`,
      type: 'appointment',
      badge: 'Doctor Visit'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 print:space-y-4 print:p-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-indigo-200 text-xs font-semibold">
              <UserCheck className="w-4 h-4 text-indigo-300" />
              <span>Clinical Consultation Navigator</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Doctor Visit Preparation Sheet
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            Doctor visits can feel hurried. Organizing your symptoms, lab reports, medications, and specific questions ensures you get the most out of your consultation.
          </p>
        </div>

        <button
          id="btn-print-doctor-sheet"
          onClick={handlePrint}
          className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Printable Sheet Wrapper */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 print:border-none print:p-0 print:shadow-none">
        {/* Printable Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Patient Consultation Brief
            </h2>
            <p className="text-xs text-slate-500">
              Patient: <strong>{user.name}</strong> | Age: {user.age} | Generated on: {new Date().toLocaleDateString()}
            </p>
          </div>
          <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            HealthBridge Patient Preparedness
          </span>
        </div>

        {/* Section 1: Chief Reason for Visit */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            1. Reason for Visit & Primary Concerns
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Main Symptom / Concern
              </label>
              <input
                id="input-doc-complaint"
                type="text"
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Duration & Frequency
              </label>
              <input
                id="input-doc-duration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Context, Triggers, and Daily Observations
            </label>
            <textarea
              rows={2}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Section 2: Active Medications & Lab Reports Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Active Medications ({medications.length})
            </h3>
            {medications.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                {medications.map((m) => (
                  <li key={m.id} className="flex items-center justify-between">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-slate-500 text-[11px]">{m.frequency}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl">
                No active prescription medications recorded.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3. Diagnostic Reports to Review ({reports.length})
            </h3>
            {reports.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                {reports.map((r) => (
                  <li key={r.id} className="flex items-center justify-between">
                    <span className="font-semibold">{r.reportTitle}</span>
                    <span className="text-slate-500 text-[11px]">{r.reportDate}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl">
                No diagnostic reports uploaded yet.
              </p>
            )}
          </div>
        </div>

        {/* Section 3: Recommended Questions for the Doctor */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              4. Key Questions to Ask Your Doctor ({consultationQuestions.length})
            </h3>
            <button
              id="btn-ai-generate-questions"
              onClick={handleGenerateQuestions}
              disabled={loadingAI}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer print:hidden"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{loadingAI ? 'Formulating questions...' : 'AI Suggest Questions'}</span>
            </button>
          </div>

          <div className="space-y-2">
            {consultationQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <span className="leading-relaxed flex-1">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Post-Visit Consultation Notes (Doctor's Advice) */}
        <div className="space-y-3 pt-2 border-t border-slate-100 print:hidden">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            5. Post-Visit Record: Doctor's Advice & Next Steps
          </h3>
          <form onSubmit={handleSaveVisitLog} className="space-y-3">
            <textarea
              rows={3}
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Record the doctor's assessment, lifestyle advice, or new prescriptions after your appointment..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex items-center justify-between">
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved to your Health Timeline!</span>
                </span>
              )}
              <button
                id="btn-save-doctor-notes"
                type="submit"
                className="ml-auto px-5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
              >
                Save to Health Timeline
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
