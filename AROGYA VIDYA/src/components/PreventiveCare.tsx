import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  Sparkles,
  Info,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { LanguageCode, PreventiveCareItem, UserProfile } from '../types';
import { HealthBridgeStorage } from '../services/api';

interface PreventiveCareProps {
  user: UserProfile;
  preventiveItems: PreventiveCareItem[];
  onUpdateItems: (items: PreventiveCareItem[]) => void;
  language: LanguageCode;
  onNavigate?: (tab: string) => void;
}

export const PreventiveCare: React.FC<PreventiveCareProps> = ({
  user,
  preventiveItems,
  onUpdateItems,
  language,
  onNavigate,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Dental' | 'Vision' | 'Vaccination' | 'Screening' | 'Routine'>('Routine');
  const [frequency, setFrequency] = useState('Every 12 months');
  const [nextDueDate, setNextDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: PreventiveCareItem = {
      id: 'prev-' + Date.now(),
      title: title.trim(),
      category,
      recommendedFrequency: frequency,
      nextDueDate,
      status: 'upcoming',
      guidelineSource: 'Clinical Guidelines / Physician Recommendation',
      notes,
    };

    const updated = HealthBridgeStorage.savePreventiveCare(newItem);
    onUpdateItems(updated);
    setShowAddModal(false);
    setTitle('');
    setNotes('');
  };

  const handleMarkCompleted = (item: PreventiveCareItem) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updatedItem: PreventiveCareItem = {
      ...item,
      lastDoneDate: todayStr,
      status: 'completed',
    };
    const updated = HealthBridgeStorage.savePreventiveCare(updatedItem);
    onUpdateItems(updated);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-xs font-semibold">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Preventive Wellness Roadmap</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Routine Screenings & Preventive Care
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Preventive health checks identify subtle bodily changes before they become serious concerns. Track routine dental, eye, lab, and immunization schedules.
          </p>
        </div>

        <button
          id="btn-add-preventive-item"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Routine Checkup</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Preventive Screening</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Screening Name / Purpose
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Blood Pressure & Lipid Check"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Dental">Dental Care</option>
                    <option value="Vision">Vision / Eye</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Screening">Health Screening</option>
                    <option value="Routine">Routine Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Recommended Frequency
                  </label>
                  <input
                    type="text"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="e.g. Every 6 months"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Next Due Date
                </label>
                <input
                  type="date"
                  value={nextDueDate}
                  onChange={(e) => setNextDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Consult primary doctor for routine follow up"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Save to Preventive Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Screenings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {preventiveItems.map((item) => (
          <div
            key={item.id}
            id={`preventive-card-${item.id}`}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'due'
                      ? 'bg-red-100 text-red-800'
                      : item.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{item.title}</h3>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1">
                <p>
                  <strong>Frequency:</strong> {item.recommendedFrequency}
                </p>
                <p>
                  <strong>Guideline Source:</strong> {item.guidelineSource}
                </p>
                {item.notes && (
                  <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-200/50">
                    {item.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="text-slate-500 text-[11px]">
                <span>Due Date: <strong>{item.nextDueDate}</strong></span>
                {item.lastDoneDate && <span className="block">Last: {item.lastDoneDate}</span>}
              </div>

              <button
                id={`btn-complete-screening-${item.id}`}
                onClick={() => handleMarkCompleted(item)}
                className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mark Completed</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
