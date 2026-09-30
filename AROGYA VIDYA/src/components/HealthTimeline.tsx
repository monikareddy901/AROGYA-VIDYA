import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Filter,
  Calendar,
  FileText,
  Stethoscope,
  Pill,
  Sparkles,
  ShieldCheck,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { HealthTimelineEvent, LanguageCode, UserProfile } from '../types';
import { HealthBridgeStorage } from '../services/api';

interface HealthTimelineProps {
  user: UserProfile;
  events: HealthTimelineEvent[];
  onUpdateEvents: (events: HealthTimelineEvent[]) => void;
  language: LanguageCode;
  onNavigate?: (tab: string) => void;
}

export const HealthTimeline: React.FC<HealthTimelineProps> = ({
  user,
  events,
  onUpdateEvents,
  language,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'report' | 'medication' | 'appointment' | 'symptom' | 'wellness'>('appointment');
  const [description, setDescription] = useState('');

  const filteredEvents = events.filter(
    (ev) => filterType === 'all' || ev.type === filterType
  );

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: HealthTimelineEvent = {
      id: 'tl-' + Date.now(),
      date,
      title: title.trim(),
      description: description.trim() || 'Recorded health event.',
      type,
      badge:
        type === 'report'
          ? 'Lab Report'
          : type === 'appointment'
          ? 'Doctor Visit'
          : type === 'symptom'
          ? 'Symptom Log'
          : type === 'medication'
          ? 'Medication'
          : 'Wellness Milestone',
    };

    const updated = HealthBridgeStorage.addTimelineEvent(newEvent);
    onUpdateEvents(updated);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Delete this event from your timeline?')) {
      const updated = HealthBridgeStorage.deleteTimelineEvent(id);
      onUpdateEvents(updated);
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'report':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'appointment':
        return <Stethoscope className="w-4 h-4 text-indigo-600" />;
      case 'symptom':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'screening':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-teal-200 text-xs font-semibold">
              <Clock className="w-4 h-4 text-teal-300" />
              <span>Lifelong Health Records Vault</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            My Health Timeline & History
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            A secure chronological journal of your medical checkups, diagnostic reports, symptom checks, and vaccinations in one organized place.
          </p>
        </div>

        <button
          id="btn-add-timeline-event"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Health Event</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { id: 'all', label: 'All History' },
          { id: 'appointment', label: 'Doctor Visits' },
          { id: 'report', label: 'Lab Reports' },
          { id: 'symptom', label: 'Symptom Checks' },
          { id: 'screening', label: 'Screenings & Vaccines' },
        ].map((f) => (
          <button
            key={f.id}
            id={`filter-tl-${f.id}`}
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterType === f.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Timeline Event</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Routine Dental Cleaning or Doctor Follow-up"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="appointment">Doctor Appointment</option>
                    <option value="report">Lab Report</option>
                    <option value="medication">Medication Log</option>
                    <option value="symptom">Symptom Note</option>
                    <option value="wellness">Wellness Milestone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Notes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Doctor checked vitals and recommended vitamin D supplementation."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Add to Timeline
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Events Timeline View */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Clock className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs">No health events recorded under this filter.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
            {filteredEvents.map((ev) => (
              <div key={ev.id} id={`tl-event-${ev.id}`} className="relative pl-6">
                {/* Node Dot */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center shadow-xs">
                  {getEventIcon(ev.type)}
                </div>

                <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700">
                      {ev.badge}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        {ev.date}
                      </span>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900">{ev.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
