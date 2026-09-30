import React from 'react';
import { AlertTriangle, ShieldCheck, PhoneCall } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: LanguageCode;
  onOpenEmergency: () => void;
}

export const EmergencyBanner: React.FC<Props> = ({ language, onOpenEmergency }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs md:text-sm text-amber-950 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2 max-w-4xl">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          <strong className="font-semibold text-amber-900">HealthBridge Safety Notice:</strong>{' '}
          {t.emergencyDisclaimer}
        </span>
      </div>
      <button
        id="btn-emergency-quick-dial"
        onClick={onOpenEmergency}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs transition-colors shrink-0 cursor-pointer"
        title="Immediate Emergency Information"
      >
        <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
        <span>Emergency 112</span>
      </button>
    </div>
  );
};
