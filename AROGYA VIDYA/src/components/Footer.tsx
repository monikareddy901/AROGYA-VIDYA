import React from 'react';
import { HeartPulse, ShieldAlert, Lock, Globe2, PhoneCall, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: LanguageCode;
  onSelectTab: (tab: string) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectTab, onOpenEmergency }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white tracking-tight">Arogyavidya</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              “Learn • Understand • Care • Live Better.” A comprehensive health awareness, profession routines, and Bengaluru medical guidance platform designed for everyone.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-teal-950/80 text-teal-300 border border-teal-800">
                <Globe2 className="w-3 h-3" />
                <span>Multi-Language Ready</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <Lock className="w-3 h-3" />
                <span>Private & Secure</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-learn"
                  onClick={() => onSelectTab('learn')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.learn} (Health Education Hub)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-hygiene"
                  onClick={() => onSelectTab('hygiene')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.hygiene}
                </button>
              </li>
              <li>
                <button
                  id="footer-link-symptoms"
                  onClick={() => onSelectTab('symptoms')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.symptoms} (Symptom Navigator)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-reports"
                  onClick={() => onSelectTab('reports')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.reports} (Lab Explainer)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-medicines"
                  onClick={() => onSelectTab('medicines')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.medicines} (Medication Manager)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Inclusive & Safety */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Safety & Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-myths"
                  onClick={() => onSelectTab('myths')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{t.myths}</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-privacy"
                  onClick={() => onSelectTab('privacy')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.privacy} (Data Sovereignty)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-doctor"
                  onClick={() => onSelectTab('doctorPrep')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.doctorPrep}
                </button>
              </li>
              <li>
                <button
                  id="footer-link-card"
                  onClick={() => onSelectTab('emergencyCard')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {t.emergencyCard}
                </button>
              </li>
              <li>
                <button
                  id="footer-link-admin"
                  onClick={() => onSelectTab('admin')}
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  {t.admin}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Assistance */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
            <div className="flex items-center gap-1.5 text-red-400 font-semibold text-xs uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>Emergency Helplines</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              If you or someone around you is in immediate danger or experiencing severe symptoms, call emergency services immediately:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 block">India (National)</span>
                <span className="font-bold text-white text-base">112 / 108</span>
              </div>
              <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 block">Mental Health (India)</span>
                <span className="font-bold text-white text-base">14416 (Tele-MANAS)</span>
              </div>
            </div>
            <button
              id="footer-btn-emergency"
              onClick={onOpenEmergency}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer text-center"
            >
              Open Emergency Hub
            </button>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="border-t border-slate-800 pt-6 mt-6">
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-300 block mb-1">
                Mandatory Medical Disclaimer:
              </strong>
              HealthBridge is an AI-powered educational and health navigation platform. HealthBridge is NOT a doctor, hospital, diagnostic system, or replacement for professional healthcare providers. The application never diagnoses diseases, prescribes medications, changes dosages, or provides emergency dispatch. Always consult a qualified medical professional for personal clinical concerns.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} HealthBridge. Evidence-based health awareness for all individuals.</p>
            <div className="flex items-center gap-4">
              <span>Evidence Sources: WHO, CDC, NHS, AIIMS</span>
              <span>•</span>
              <button onClick={() => onSelectTab('privacy')} className="hover:underline">Privacy Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
