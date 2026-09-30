import React, { useState } from 'react';
import {
  Heart,
  Calendar,
  Sparkles,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Info,
  Droplets,
  ArrowLeft
} from 'lucide-react';
import { LanguageCode, PeriodLog, UserProfile } from '../types';
import { HealthBridgeStorage } from '../services/api';

interface PeriodCareProps {
  user: UserProfile;
  language: LanguageCode;
  onNavigate?: (tab: string) => void;
}

export const PeriodCare: React.FC<PeriodCareProps> = ({ user, language, onNavigate }) => {
  const [logs, setLogs] = useState<PeriodLog[]>(() => HealthBridgeStorage.getPeriodLogs());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [flow, setFlow] = useState<'spotting' | 'light' | 'medium' | 'heavy'>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Mild Cramping']);
  const [notes, setNotes] = useState('');

  const commonPeriodSymptoms = [
    'Mild Cramping',
    'Bloating',
    'Fatigue',
    'Lower Back Aches',
    'Headache / Migraine',
    'Breast Tenderness',
    'Mood Shifts',
    'Digestive Changes',
  ];

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: PeriodLog = {
      id: 'prd-' + Date.now(),
      userId: user.id,
      date: selectedDate,
      flowLevel: flow as any,
      symptoms: selectedSymptoms,
      mood: 'Normal',
      notes,
    };

    const updated = HealthBridgeStorage.savePeriodLog(newLog);
    setLogs(updated);
    setNotes('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-pink-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-rose-200 text-xs font-semibold">
              <Heart className="w-4 h-4 text-rose-300" />
              <span>PeriodCare & Menstrual Health Hub</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            PeriodCare: Cycle Tracking & Evidence-Based Hygiene
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            Track cycle days, flow patterns, and symptoms while learning safe, scientific menstrual hygiene practices free from cultural taboos.
          </p>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Educational Tracking Only:</strong> Every menstrual cycle is unique (standard range 21–35 days). This tracker helps you observe patterns for doctor consultations and does not predict fertility or diagnose gynecological conditions.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cycle Logging Form (1 Col on lg) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Log Period Day</h3>
              <p className="text-xs text-slate-500">Record flow and physical signs</p>
            </div>
          </div>

          <form onSubmit={handleSaveLog} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date
              </label>
              <input
                id="input-period-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Flow Intensity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'spotting', label: 'Spotting', desc: 'Very light droplets' },
                  { id: 'light', label: 'Light', desc: 'Minimal pad/cup fill' },
                  { id: 'medium', label: 'Medium', desc: 'Standard cycle flow' },
                  { id: 'heavy', label: 'Heavy', desc: 'Frequent changes' },
                ].map((f) => (
                  <button
                    key={f.id}
                    id={`flow-${f.id}`}
                    type="button"
                    onClick={() => setFlow(f.id as any)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                      flow === f.id
                        ? 'bg-rose-50 border-rose-600 text-rose-950 font-bold ring-1 ring-rose-600'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block">{f.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Associated Symptoms
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {commonPeriodSymptoms.map((sym, idx) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`p-2 rounded-xl text-[11px] font-medium border text-left transition-all ${
                        isChecked
                          ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notes / Experience
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Used heat pack for cramps; rested in afternoon..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              id="btn-save-period-log"
              type="submit"
              className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Save Daily Cycle Log
            </button>
          </form>
        </div>

        {/* Evidence-Based Period Hygiene & Red Flags (2 Cols on lg) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scientific Hygiene Guides */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span>Evidence-Based Period Hygiene Guidelines</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">
                  1. Sanitary Pads & Liners
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Change disposable pads every 4 to 6 hours regardless of flow to prevent bacterial buildup and chafing. Wrap securely and dispose in trash bins.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">
                  2. Tampons & Toxic Shock Safety
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Change tampons every 4 to 8 hours (never exceed 8 hours). Use the lowest absorbency suitable for your flow to reduce risk of Toxic Shock Syndrome (TSS).
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">
                  3. Menstrual Cups & Discs
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Empty every 8 to 12 hours. Wash thoroughly with clean water and mild, unscented cleanser before reinsertion. Sterilize in boiling water between cycles.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">
                  4. Intimate Cleansing
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Wash external vulva gently with plain warm water from front to back. <strong>Never douche internally</strong>; the vagina is self-cleaning with a protective acidic pH.
                </p>
              </div>
            </div>
          </div>

          {/* When to Consult a Gynecologist / Doctor */}
          <div className="bg-rose-50/70 rounded-3xl p-6 border border-rose-200 space-y-3">
            <h3 className="font-bold text-sm text-rose-950 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-700" />
              <span>When to Consult a Healthcare Clinician</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-900">
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span>
                <span>Bleeding that completely soaks through a pad/tampon every hour for 2+ consecutive hours.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span>
                <span>Severe debilitating pelvic pain that does not respond to OTC relief and impairs daily function.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span>
                <span>Irregular cycles consistently shorter than 21 days or longer than 35 days.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span>
                <span>Sudden high fever, vomiting, or sunburn-like rash while using tampons (immediate urgent care).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
