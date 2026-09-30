import React, { useState } from 'react';
import { Shield, Lock, Trash2, Download, CheckCircle, Database, Eye, RefreshCw, Key } from 'lucide-react';
import { LanguageCode } from '../types';
import { HealthBridgeStorage } from '../services/api';

interface PrivacyViewProps {
  language: LanguageCode;
  onNavigateHome: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ language, onNavigateHome }) => {
  const [dataCleared, setDataCleared] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [localEncryption, setLocalEncryption] = useState(true);

  const handleExportData = () => {
    const backup = {
      user: HealthBridgeStorage.getUser(),
      reports: HealthBridgeStorage.getReports(),
      medications: HealthBridgeStorage.getMedications(),
      habits: HealthBridgeStorage.getTodayHabits(),
      preventiveCare: HealthBridgeStorage.getPreventiveCare(),
      timeline: HealthBridgeStorage.getTimeline(),
      emergencyCard: HealthBridgeStorage.getEmergencyCard(),
      exportDate: new Date().toISOString(),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `healthbridge_data_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to permanently erase all locally saved health records, logs, and settings from this browser? This action cannot be undone.")) {
      HealthBridgeStorage.clearUser();
      localStorage.clear();
      setDataCleared(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Privacy & Data Sovereignty Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Your health data belongs exclusively to you. No unauthorized selling, tracking, or profiling.
            </p>
          </div>
        </div>
      </div>

      {dataCleared && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>All local health data successfully purged. Reloading workspace...</span>
        </div>
      )}

      {/* Core Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Zero Commercial Ads</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            HealthBridge does not sell your symptoms, reports, medications, or reading habits to advertising networks.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Local-First Storage</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your personal logs, lab reports, and period tracker entries remain in your local browser sandbox by default.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Immediate Data Portability</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Export a full JSON backup of your health history at any time or purge your records in a single click.
          </p>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Manage Your Data & Permissions
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div>
              <p className="font-bold text-sm text-slate-800">Local Session Encryption</p>
              <p className="text-xs text-slate-500">Encrypt local tokens and emergency card cache inside browser memory.</p>
            </div>
            <input
              type="checkbox"
              checked={localEncryption}
              onChange={(e) => setLocalEncryption(e.target.checked)}
              className="w-5 h-5 accent-teal-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div>
              <p className="font-bold text-sm text-slate-800">Anonymous Usage Telemetry</p>
              <p className="text-xs text-slate-500">Opt-in to share anonymized performance and error metrics (Disabled by default).</p>
            </div>
            <input
              type="checkbox"
              checked={analyticsConsent}
              onChange={(e) => setAnalyticsConsent(e.target.checked)}
              className="w-5 h-5 accent-teal-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Data Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            id="btn-export-health-data"
            onClick={handleExportData}
            className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Complete Health Data (JSON)</span>
          </button>

          <button
            id="btn-erase-all-data"
            onClick={handleClearAllData}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge All Local Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};
