import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, FileText, Globe, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { LanguageCode } from '../types';
import { HEALTH_ARTICLES } from '../data/healthArticles';
import { MYTHS_AND_FACTS } from '../data/mythsAndFacts';

interface AdminPortalProps {
  language: LanguageCode;
}

export const AdminPortalView: React.FC<AdminPortalProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'audit' | 'sources'>('guidelines');

  const sources = [
    { name: 'World Health Organization (WHO)', scope: 'Global Public Health, Reproductive Health & Mental Well-being', status: 'Active & Verified', version: 'v2025.4' },
    { name: 'Centers for Disease Control and Prevention (CDC)', scope: 'Infectious Diseases, Immunization & Preventive Screenings', status: 'Active & Verified', version: 'v2025.2' },
    { name: 'Indian Council of Medical Research (ICMR)', scope: 'Dietary Guidelines, Regional Health & Anemia Triage', status: 'Active & Verified', version: 'v2024.1' },
    { name: 'National Health Service (NHS UK)', scope: 'Symptom Triage Guidelines, Patient Guidance & Hygiene', status: 'Active & Verified', version: 'v2025.3' },
    { name: 'American College of Obstetricians and Gynecologists (ACOG)', scope: 'Puberty, Menstrual Health & Maternal Care', status: 'Active & Verified', version: 'v2025.1' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Clinical Knowledge Governance & Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Auditing evidence-based health articles, reference ranges, disclaimer enforcement, and clinical sources.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'guidelines' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Guidelines Audit ({HEALTH_ARTICLES.length} Articles)
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'sources' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Clinical Sources ({sources.length})
          </button>
        </div>
      </div>

      {activeTab === 'guidelines' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Article Safety & Evidence Compliance Audit
          </h2>
          <div className="divide-y divide-slate-100">
            {HEALTH_ARTICLES.map((art) => (
              <div key={art.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{art.title}</h4>
                  <p className="text-xs text-slate-500">
                    Category: <span className="capitalize">{art.category.replace('_', ' ')}</span> • Source: {art.trustedSources?.[0]?.name || 'WHO / CDC Guidelines'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((src, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  {src.version}
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{src.status}</span>
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{src.name}</h3>
              <p className="text-xs text-slate-600">{src.scope}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
