import React, { useState } from 'react';
import {
  Pill,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Trash2,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Sparkles,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { LanguageCode, Medication, UserProfile } from '../types';
import { HealthBridgeStorage } from '../services/api';

interface MedicationManagerProps {
  user: UserProfile;
  medications: Medication[];
  onUpdateMedications: (meds: Medication[]) => void;
  language: LanguageCode;
  onNavigate?: (tab: string) => void;
}

export const MedicationManager: React.FC<MedicationManagerProps> = ({
  user,
  medications,
  onUpdateMedications,
  language,
  onNavigate,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [prescribedBy, setPrescribedBy] = useState('');
  const [purpose, setPurpose] = useState('');
  const [instructions, setInstructions] = useState('');
  const [frequency, setFrequency] = useState('Once daily');
  const [reminderTime, setReminderTime] = useState('08:30');

  // Adherence calculation
  const totalLogs = medications.flatMap((m) => m.history);
  const takenLogs = totalLogs.filter((l) => l.status === 'taken');
  const adherenceRate = totalLogs.length > 0 ? Math.round((takenLogs.length / totalLogs.length) * 100) : 100;

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed: Medication = {
      id: 'med-' + Date.now(),
      userId: user.id,
      name: name.trim(),
      prescribedBy: prescribedBy.trim() || 'Attending Physician',
      purpose: purpose.trim() || 'Support general wellness',
      instructions: instructions.trim() || 'Take with water according to prescription',
      frequency,
      reminderTimes: [reminderTime],
      startDate: new Date().toISOString().split('T')[0],
      isActive: true,
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'taken',
        },
      ],
    };

    const updated = HealthBridgeStorage.saveMedication(newMed);
    onUpdateMedications(updated);
    setShowAddForm(false);
    setName('');
    setPrescribedBy('');
    setPurpose('');
    setInstructions('');
  };

  const handleToggleStatus = (medId: string, status: 'taken' | 'missed' | 'snoozed') => {
    const updated = HealthBridgeStorage.logMedicationStatus(medId, status);
    onUpdateMedications(updated);
  };

  const handleDeleteMedication = (id: string) => {
    if (confirm('Are you sure you want to remove this medication from your schedule?')) {
      const updated = HealthBridgeStorage.deleteMedication(id);
      onUpdateMedications(updated);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-purple-200 text-xs font-semibold">
              <Pill className="w-4 h-4 text-purple-300" />
              <span>Prescription & Adherence Navigator</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            My Medications & Supplements
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            Keep track of doctor-prescribed medications, schedule daily reminders, log doses safely, and view your weekly adherence trajectory.
          </p>
        </div>

        <button
          id="btn-toggle-add-med"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add Medication'}</span>
        </button>
      </div>

      {/* Missed Dose Safety Guardrail Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Safe Medication Practice:</strong> If you miss multiple doses or experience unexpected side effects, please consult your prescribing doctor or pharmacist. <strong>Never take a double dose</strong> to make up for a missed one unless explicitly instructed by a healthcare provider.
        </div>
      </div>

      {/* Adherence Summary Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base">
            {adherenceRate}%
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Overall Medication Adherence</h3>
            <p className="text-xs text-slate-500">
              {takenLogs.length} of {totalLogs.length} recorded doses taken on schedule
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
          <span>Taken</span>
          <span className="inline-block w-3 h-3 rounded-full bg-rose-500 ml-2"></span>
          <span>Missed</span>
        </div>
      </div>

      {/* Add Medication Form Modal / Panel */}
      {showAddForm && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Add Prescribed Medication</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddMedication} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Medication / Supplement Name
                </label>
                <input
                  id="input-med-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ferrous Ascorbate 100mg or Metformin 500mg"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prescribing Doctor / Clinic
                </label>
                <input
                  id="input-med-doctor"
                  type="text"
                  value={prescribedBy}
                  onChange={(e) => setPrescribedBy(e.target.value)}
                  placeholder="e.g. Dr. Priya Sharma (Internal Medicine)"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Purpose / Intended Benefit
                </label>
                <input
                  id="input-med-purpose"
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Support red blood cell iron levels"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Frequency
                </label>
                <select
                  id="select-med-frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Once daily (Morning)">Once daily (Morning)</option>
                  <option value="Once daily (Evening)">Once daily (Evening)</option>
                  <option value="Twice daily (Morning & Evening)">Twice daily (Morning & Evening)</option>
                  <option value="Three times daily (With meals)">Three times daily (With meals)</option>
                  <option value="Once weekly">Once weekly</option>
                  <option value="As needed (SOS)">As needed (SOS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Daily Reminder Time
                </label>
                <input
                  id="input-med-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctor Instructions / Food Requirements
              </label>
              <textarea
                id="textarea-med-instructions"
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Take with a glass of water after breakfast. Avoid taking with dairy or tea."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              id="btn-submit-medication"
              type="submit"
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Save to Medicine Schedule
            </button>
          </form>
        </div>
      )}

      {/* Medications List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Active Prescription Schedule ({medications.length})
        </h2>

        {medications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Pill className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No active medications logged</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add your current prescribed medicines or supplements to receive reminder schedules and track daily adherence.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-purple-50 text-purple-800 text-xs font-semibold rounded-xl"
            >
              Add First Medicine
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medications.map((med) => {
              const todayStr = new Date().toISOString().split('T')[0];
              const todayLog = med.history.find((h) => h.date === todayStr);
              const isTakenToday = todayLog?.status === 'taken';

              return (
                <div
                  key={med.id}
                  id={`med-card-${med.id}`}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 transition-all hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2.5 py-0.5 bg-purple-50 text-purple-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {med.frequency}
                        </span>
                        <h3 className="font-bold text-base text-slate-900 mt-1">
                          {med.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Prescribed by: {med.prescribedBy}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteMedication(med.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove medication"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1">
                      <p>
                        <strong>Purpose:</strong> {med.purpose}
                      </p>
                      <p>
                        <strong>Instructions:</strong> {med.instructions}
                      </p>
                    </div>

                    {/* Today's status */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>Reminder: {med.reminderTimes[0] || '08:30'}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          id={`btn-take-med-${med.id}`}
                          onClick={() => handleToggleStatus(med.id, 'taken')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                            isTakenToday
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isTakenToday ? 'Taken Today' : 'Mark Taken'}</span>
                        </button>

                        <button
                          id={`btn-miss-med-${med.id}`}
                          onClick={() => handleToggleStatus(med.id, 'missed')}
                          className={`p-1.5 rounded-xl text-xs transition-all ${
                            todayLog?.status === 'missed'
                              ? 'bg-rose-100 text-rose-800 font-bold'
                              : 'text-slate-400 hover:text-rose-600'
                          }`}
                          title="Log as missed"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recent 7-day adherence dots */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Recent Dose History:</span>
                    <div className="flex items-center gap-1">
                      {med.history.slice(0, 7).map((h, hidx) => (
                        <span
                          key={hidx}
                          title={`${h.date}: ${h.status}`}
                          className={`w-3 h-3 rounded-full ${
                            h.status === 'taken'
                              ? 'bg-emerald-500'
                              : h.status === 'missed'
                              ? 'bg-rose-400'
                              : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
