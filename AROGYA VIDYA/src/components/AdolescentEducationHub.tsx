import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Sparkles, 
  Heart, 
  Shield, 
  Lock, 
  Brain, 
  Phone, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft,
  Users,
  AlertCircle,
  Eye,
  Info
} from 'lucide-react';
import { STUDENT_EDUCATION_TOPICS, StudentTopic } from '../data/studentEducationData';

interface AdolescentEducationHubProps {
  onNavigate?: (tab: any) => void;
}

export const AdolescentEducationHub: React.FC<AdolescentEducationHubProps> = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState<StudentTopic | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-700/50 backdrop-blur-md text-blue-200 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
              <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
              Adolescent & Student Health Education
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Breaking the Silence: Student Health & Puberty
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
            In many Indian households, parents and elders find it awkward or taboo to talk about growing up, periods, wet dreams, or body boundaries. Here is 100% honest, doctor-backed, compassionate education made simple for students.
          </p>
        </div>
      </div>

      {selectedTopic ? (
        /* Detailed Topic View */
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => setSelectedTopic(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Student Topics
          </button>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
              <img
                src={selectedTopic.coverImage}
                alt={selectedTopic.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-lg bg-teal-600/90 text-xs font-bold uppercase tracking-wider">
                  {selectedTopic.readTime}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {selectedTopic.title}
                </h2>
                <p className="text-slate-200 text-sm sm:text-base">
                  {selectedTopic.subtitle}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Why Families Don't Talk About This */}
              <div className="bg-indigo-50/80 rounded-2xl p-5 border border-indigo-100 space-y-2">
                <h4 className="font-bold text-indigo-950 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600" />
                  Why Indian Families Often Stay Silent on This
                </h4>
                <p className="text-indigo-900/90 text-sm leading-relaxed">
                  {selectedTopic.whyIndianFamiliesDontTalk}
                </p>
              </div>

              {/* Plain Language Explanation */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">
                  Understanding What Happens Simply
                </h3>
                <p className="text-slate-700 text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  {selectedTopic.plainLanguageExplanation}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  Key Facts to Remember
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedTopic.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-800 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Myths vs Science */}
              {selectedTopic.commonMythsDebunked.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-rose-600" />
                    Common Myths Debunked
                  </h4>
                  <div className="space-y-3">
                    {selectedTopic.commonMythsDebunked.map((item, idx) => (
                      <div key={idx} className="bg-rose-50/50 rounded-xl p-4 border border-rose-100 space-y-1.5 text-sm">
                        <div className="font-bold text-rose-900">
                          ❌ False Rumor: "{item.myth}"
                        </div>
                        <div className="text-emerald-800 font-semibold flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>Medical Fact: {item.fact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Everyday Steps */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900">
                  What You Can Do (Practical Action Steps)
                </h4>
                <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200/80 space-y-2">
                  {selectedTopic.practicalSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-emerald-950">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency / Counseling Resource */}
              {selectedTopic.helplineOrResource && (
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                      Free Confidential Support Helpline
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {selectedTopic.helplineOrResource.name}
                    </h4>
                    <p className="text-blue-100 text-sm">
                      {selectedTopic.helplineOrResource.description}
                    </p>
                  </div>
                  <a
                    href={`tel:${selectedTopic.helplineOrResource.contact.split(' ')[0]}`}
                    className="flex-shrink-0 px-5 py-3 rounded-xl bg-white text-blue-900 font-bold text-sm shadow-md hover:bg-blue-50 flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-blue-700" />
                    Call {selectedTopic.helplineOrResource.contact}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Topic List Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDENT_EDUCATION_TOPICS.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedTopic(topic)}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={topic.coverImage}
                  alt={topic.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold">
                  {topic.readTime}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                    {topic.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-teal-700 font-semibold text-sm">
                  <span>Read Guide & Facts</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
