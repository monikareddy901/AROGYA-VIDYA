import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Clock,
  Share2,
  UserCheck
} from 'lucide-react';
import { HealthArticle, LanguageCode } from '../types';

interface ArticleDetailModalProps {
  article: HealthArticle | null;
  isOpen: boolean;
  onClose: () => void;
  language?: LanguageCode;
  onNavigateToDoctorPrep?: (data?: any) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose,
  language = 'en',
  onNavigateToDoctorPrep,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.shortExplanation}. ${article.detailedExplanation}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleClose = () => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-teal-800 to-emerald-700 text-white shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-white/15 text-teal-100 rounded-full text-xs font-semibold uppercase tracking-wider">
                {article.category.replace('_', ' ')}
              </span>
              <span className="text-xs text-teal-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTimeMinutes} min read</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="btn-article-tts"
                onClick={handleSpeak}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSpeaking ? 'bg-amber-400 text-slate-900' : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title={isSpeaking ? 'Stop reading aloud' : 'Read article aloud'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
              </button>

              <button
                id="btn-article-share"
                onClick={handleShare}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors text-xs cursor-pointer"
                title="Copy share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                id="btn-close-article-modal"
                onClick={handleClose}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-3 font-display leading-tight">
            {article.title}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1.5 leading-relaxed">
            {article.shortExplanation}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm leading-relaxed">
          {copied && (
            <div className="p-2 bg-emerald-100 text-emerald-900 text-xs font-semibold rounded-lg text-center">
              Link copied to clipboard!
            </div>
          )}

          {/* Detailed Explanation */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-3">
              Biological & Health Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {article.detailedExplanation}
            </p>
          </div>

          {/* Healthy Habits */}
          {article.healthyHabits && article.healthyHabits.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Recommended Daily Habits
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {article.healthyHabits.map((habit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common Questions Accordion */}
          {article.commonQuestions && article.commonQuestions.length > 0 && (
            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3">
              <h4 className="font-bold text-sm text-teal-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-700" />
                <span>Frequently Asked Questions</span>
              </h4>
              <div className="space-y-2.5">
                {article.commonQuestions.map((q, qidx) => (
                  <div key={qidx} className="bg-white p-3 rounded-xl border border-teal-100 space-y-1">
                    <p className="font-bold text-xs text-slate-900">Q: {q.question}</p>
                    <p className="text-xs text-slate-600">A: {q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Myth vs Fact in this topic */}
          {article.mythVsFact && article.mythVsFact.length > 0 && (
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-3">
              <h4 className="font-bold text-sm text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Myth vs Fact Check</span>
              </h4>
              <div className="space-y-2.5">
                {article.mythVsFact.map((mf, midx) => (
                  <div key={midx} className="bg-white p-3 rounded-xl border border-amber-100 space-y-1.5">
                    <p className="text-xs text-red-700 font-semibold">❌ Myth: {mf.myth}</p>
                    <p className="text-xs text-emerald-800 font-semibold">✅ Fact: {mf.fact}</p>
                    <p className="text-[11px] text-slate-600">{mf.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning Signs & When to Seek Care */}
          {article.warningSigns && article.warningSigns.length > 0 && (
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
              <h4 className="font-bold text-sm text-rose-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>When to Consult a Healthcare Professional</span>
              </h4>
              <ul className="space-y-1.5">
                {article.warningSigns.map((ws, widx) => (
                  <li key={widx} className="flex items-start gap-2 text-xs text-rose-900">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{ws}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Evidence Sources & Last Updated */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>
                Evidence Sources: {article.trustedSources?.map(s => s.organization).join(', ') || 'Clinical Guidelines'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reviewed: {article.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Educational material for health awareness.
          </span>
          <div className="flex items-center gap-2">
            {onNavigateToDoctorPrep && (
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onNavigateToDoctorPrep({ mainConcern: `Questions regarding ${article.title}` });
                }}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-700" />
                <span>Prepare Doctor Questions</span>
              </button>
            )}
            <button
              id="btn-bottom-close-article"
              type="button"
              onClick={handleClose}
              className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
