import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Clock,
  ShieldCheck,
  Filter,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { HealthArticle, HealthCategory, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HealthEducationHubProps {
  articles: HealthArticle[];
  language: LanguageCode;
  onSelectArticle: (art: HealthArticle) => void;
  onOpenMyths?: () => void;
  onNavigate?: (tab: string) => void;
}

export const HealthEducationHub: React.FC<HealthEducationHubProps> = ({
  articles,
  language,
  onSelectArticle,
  onOpenMyths,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const categories: Array<{ id: string; label: string; icon: string }> = [
    { id: 'all', label: 'All Topics', icon: '🌐' },
    { id: 'hygiene_center', label: 'Hygiene Center', icon: '🧼' },
    { id: 'puberty_academy', label: 'Puberty Academy', icon: '🌱' },
    { id: 'womens_health', label: "Women's Health", icon: '🌸' },
    { id: 'mens_health', label: "Men's Health", icon: '🛡️' },
    { id: 'trans_health', label: 'Trans-Inclusive', icon: '🌈' },
    { id: 'mental_wellbeing', label: 'Mental Wellbeing', icon: '🧠' },
    { id: 'nutrition', label: 'Nutrition & Body', icon: '🥗' },
    { id: 'sexual_health', label: 'Sexual & Reproductive', icon: '💞' },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.shortExplanation.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-teal-100 text-xs font-semibold">
              <BookOpen className="w-4 h-4 text-teal-300" />
              <span>HealthBridge Knowledge Vault</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display">
            Evidence-Based Health & Hygiene Education
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Respectful, clear, and age-appropriate guides aligned with WHO, CDC, NHS, and AIIMS medical guidelines. Demystify biology, build daily habits, and know when to consult a clinician.
          </p>
        </div>

        {/* Quick Shortcut to Myth vs Fact */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-teal-100">
            Confused by conflicting health advice online?
          </span>
          <button
            id="btn-goto-myths-from-hub"
            onClick={onOpenMyths}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span>Explore 50+ Myth vs Fact Checks</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              id="input-search-articles"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. acne, period pain, hydration, dental care, STI, stress)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <span>
            Showing <strong>{filteredArticles.length}</strong> evidence-based guides
          </span>
          <span>Verified by global health standards</span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No guides found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No health articles matched your query. Try clearing the search or choosing another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-teal-50 text-teal-800 text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                id={`article-card-${art.id}`}
                onClick={() => onSelectArticle(art)}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                      {art.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTimeMinutes} min</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {art.shortExplanation}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {art.tags.slice(0, 3).map((tag, tidx) => (
                      <span
                        key={tidx}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>{art.trustedSources?.[0]?.organization || 'WHO / CDC Guidelines'}</span>
                  </span>
                  <span className="font-semibold text-teal-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
