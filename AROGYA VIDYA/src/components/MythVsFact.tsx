import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, HelpCircle, ShieldCheck, Search, Filter, ArrowLeft } from 'lucide-react';
import { HealthCategory, LanguageCode, MythFactItem } from '../types';

interface MythVsFactProps {
  myths: MythFactItem[];
  language: LanguageCode;
  onNavigate?: (tab: string) => void;
}

export const MythVsFact: React.FC<MythVsFactProps> = ({ myths, language, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'puberty_academy', label: 'Puberty & Growth' },
    { id: 'hygiene_center', label: 'Hygiene & Cleanliness' },
    { id: 'womens_health', label: "Women's & Periods" },
    { id: 'mens_health', label: "Men's Health" },
    { id: 'nutrition', label: 'Nutrition & Diet' },
    { id: 'sexual_health', label: 'Sexual Health' },
  ];

  const filteredMyths = myths.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.myth.toLowerCase().includes(q) ||
      m.fact.toLowerCase().includes(q) ||
      m.explanation.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    const all: Record<string, boolean> = {};
    myths.forEach((m) => {
      all[m.id] = true;
    });
    setRevealedIds(all);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Myth-Busting Science Center</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display">
            Myth vs Fact: Science Over Stigma
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Misinformation can create unnecessary anxiety and harmful habits. Test your assumptions and explore evidence-backed scientific facts reviewed by healthcare standards.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-amber-200">
            Interactive Flashcards — Click any card to uncover the biological reality.
          </span>
          <button
            id="btn-reveal-all-myths"
            onClick={revealAll}
            className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            Reveal All Facts
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            id="input-search-myths"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health myths (e.g. shaving, cold water, douching, masturbation, carbs)..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`myth-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMyths.map((item) => {
          const isRevealed = revealedIds[item.id];

          return (
            <div
              key={item.id}
              id={`myth-card-${item.id}`}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between transition-all hover:shadow-md"
            >
              {/* Myth Section */}
              <div className="p-6 bg-red-50/40 border-b border-red-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Common Myth</span>
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-bold text-base text-red-950 pt-1">
                  "{item.myth}"
                </h3>
              </div>

              {/* Reveal Action / Fact Section */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                {isRevealed ? (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full w-fit">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>The Scientific Fact</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {item.fact}
                    </h4>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      {item.explanation}
                    </p>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                        <span>Source: {item.evidenceSource}</span>
                      </span>
                      <button
                        onClick={() => toggleReveal(item.id)}
                        className="text-amber-800 font-semibold hover:underline cursor-pointer"
                      >
                        Hide details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center space-y-3">
                    <p className="text-xs text-slate-500">
                      Is this myth scientifically accurate or a widespread misconception?
                    </p>
                    <button
                      id={`btn-reveal-${item.id}`}
                      onClick={() => toggleReveal(item.id)}
                      className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Uncover Scientific Fact</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
