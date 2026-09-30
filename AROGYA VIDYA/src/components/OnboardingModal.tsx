import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { HealthCategory, LanguageCode, UserProfile } from '../types';

interface OnboardingModalProps {
  user: UserProfile;
  isOpen: boolean;
  onComplete: (updated: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  user,
  isOpen,
  onComplete,
}) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState<number | undefined>(user.age || 28);
  const [language, setLanguage] = useState<LanguageCode>(user.preferredLanguage || 'en');
  const [selectedTopics, setSelectedTopics] = useState<HealthCategory[]>(
    user.selectedTopics.length > 0
      ? user.selectedTopics
      : ['hygiene_center', 'nutrition', 'mental_wellbeing']
  );

  if (!isOpen) return null;

  const allTopics: Array<{ id: HealthCategory; label: string; icon: string; desc: string }> = [
    { id: 'hygiene_center', label: 'Hygiene Center', icon: '🧼', desc: 'Hand, dental, skin, and personal cleanliness routines' },
    { id: 'nutrition', label: 'Nutrition & Hydration', icon: '🥗', desc: 'Balanced eating, dietary fiber, mindful meals' },
    { id: 'mental_wellbeing', label: 'Mental Wellbeing', icon: '🧠', desc: 'Stress management, sleep hygiene, emotional grounding' },
    { id: 'puberty_academy', label: 'Puberty Academy', icon: '🌱', desc: 'Body growth, acne, odor, voice changes, consent' },
    { id: 'womens_health', label: 'Women\'s Health', icon: '🌸', desc: 'Menstrual cycles, period hygiene, reproductive health' },
    { id: 'mens_health', label: 'Men\'s Health', icon: '🛡️', desc: 'Testicular awareness, prostate health, preventive care' },
    { id: 'trans_health', label: 'Trans-Inclusive Health', icon: '🌈', desc: 'Organ-based screenings, affirming care navigation' },
    { id: 'sexual_health', label: 'Sexual & Reproductive', icon: '💞', desc: 'STI prevention, consent, contraception education' },
  ];

  const toggleTopic = (cat: HealthCategory) => {
    if (selectedTopics.includes(cat)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== cat));
      }
    } else {
      setSelectedTopics([...selectedTopics, cat]);
    }
  };

  const handleFinish = () => {
    onComplete({
      ...user,
      name: name.trim() || 'Health Explorer',
      age: age ? Number(age) : undefined,
      preferredLanguage: language,
      selectedTopics,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-800 to-emerald-700 text-white shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <HeartPulse className="w-5 h-5 text-teal-300" />
            <span className="text-xs uppercase font-bold tracking-wider text-teal-200">
              Welcome to HealthBridge
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display">
            Personalize Your Health Learning
          </h2>
          <p className="text-xs text-teal-100 mt-1">
            Choose what you want to learn about. We collect only what is necessary to customize your experience.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Basic Profile info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Name / Nickname
              </label>
              <input
                id="input-onboarding-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Age (Optional, for relevant preventive guides)
              </label>
              <input
                id="input-onboarding-age"
                type="number"
                min={10}
                max={120}
                value={age || ''}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g. 28"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Preferred Language for Content & AI Assistant
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी (Hindi)' },
                { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                { code: 'te', label: 'తెలుగు (Telugu)' },
              ].map((l) => (
                <button
                  key={l.code}
                  id={`onboarding-lang-${l.code}`}
                  type="button"
                  onClick={() => setLanguage(l.code as LanguageCode)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                    language === l.code
                      ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Health Topics of Interest */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">
                Choose Health Topics of Interest (Pick at least 1)
              </label>
              <span className="text-[11px] text-teal-700 font-medium">
                {selectedTopics.length} selected
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allTopics.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    id={`onboarding-topic-${topic.id}`}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isSelected
                        ? 'bg-teal-50/80 border-teal-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{topic.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {topic.label}
                        </h4>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {topic.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              HealthBridge does not sell personal health data. You can edit or delete your choices anytime in the Privacy Center.
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 hidden sm:inline">
            You're ready to start exploring!
          </span>
          <button
            id="btn-complete-onboarding"
            type="button"
            onClick={handleFinish}
            className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer ml-auto"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
