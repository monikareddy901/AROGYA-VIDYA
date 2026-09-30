import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';
import { LanguageCode } from '../types';

interface HealthQuizProps {
  language: LanguageCode;
  onNavigate?: (tab: string) => void;
}

interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const HealthQuiz: React.FC<HealthQuizProps> = ({ language, onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      category: 'Hand Hygiene',
      question: 'According to the WHO, what is the minimum duration recommended to lather your hands with soap and water to effectively eliminate microbes?',
      options: [
        '5 seconds',
        '20 seconds',
        '2 full minutes',
        'Only until bubbles appear'
      ],
      correctIndex: 1,
      explanation: 'Washing hands with soap and friction for at least 20 seconds mechanically breaks down lipid viral envelopes and removes bacteria effectively.'
    },
    {
      id: 2,
      category: 'Oral Health',
      question: 'Why is brushing right after eating acidic foods (like citrus fruits or vinegar) discouraged by dental professionals?',
      options: [
        'Toothpaste loses its minty flavor',
        'Acids temporarily soften tooth enamel, so immediate brushing causes microscopic abrasion',
        'Acid activates bacteria to multiply faster',
        'It causes instantaneous tooth discoloration'
      ],
      correctIndex: 1,
      explanation: 'Acid temporarily weakens enamel minerals. Waiting 30 minutes allows saliva to remineralize and neutralize the oral pH before brushing.'
    },
    {
      id: 3,
      category: 'Puberty & Growth',
      question: 'Why do teenagers experience increased sweating and body odor during puberty?',
      options: [
        'Skin stops producing protective oils',
        'Activation of apocrine sweat glands, where harmless skin bacteria metabolize proteins and lipids',
        'Drinking too much water',
        'Lack of physical activity'
      ],
      correctIndex: 1,
      explanation: 'Hormonal surges activate apocrine sweat glands in underarms and groin. Fresh sweat is odorless; natural skin flora break it down into scent molecules.'
    },
    {
      id: 4,
      category: 'Menstrual Hygiene',
      question: 'What is the maximum recommended wear time for a single disposable tampon to prevent Toxic Shock Syndrome (TSS)?',
      options: [
        '24 hours',
        'Up to 12 hours',
        '8 hours (never overnight for high-absorbency)',
        'As long as it does not leak'
      ],
      correctIndex: 2,
      explanation: 'Leaving tampons in longer than 8 hours creates conditions where Staphylococcus aureus bacteria can proliferate and release toxins.'
    },
    {
      id: 5,
      category: 'Lab Reports',
      question: 'If a lab report value falls slightly outside the reference range, what does it mean?',
      options: [
        'It always means the patient has a critical disease',
        'Reference ranges reflect 95% of healthy populations; mild variations are normal and should be reviewed by a physician',
        'The lab test was defective and must be discarded',
        'Immediate emergency medication is required'
      ],
      correctIndex: 1,
      explanation: 'Reference ranges represent statistical averages for 95% of healthy individuals. Minor deviations can happen due to hydration, timing, or benign variations.'
    },
    {
      id: 6,
      category: 'Digital Wellness',
      question: 'What is the 20-20-20 rule recommended by optometrists for reducing screen eye strain?',
      options: [
        'Every 20 minutes, look at an object 20 feet away for at least 20 seconds',
        'Blink 20 times every 20 minutes',
        'Keep screens at 20% brightness for 20 hours',
        'Take a 20-minute nap every 2 hours'
      ],
      correctIndex: 0,
      explanation: 'Looking at distant objects relaxes the ciliary muscles of the eyes and resets natural blink rates, reducing digital eye strain.'
    }
  ];

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl space-y-2">
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
              <span>Interactive Health Literacy</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Health & Hygiene Knowledge Challenge
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Test your understanding of everyday biological facts, hygiene guidelines, and preventive care science.
          </p>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
          {/* Progress & Category */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-3 border-b border-slate-100">
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 rounded-full font-bold uppercase tracking-wider text-[10px]">
              {currentQ.category}
            </span>
            <span>
              Question {currentIdx + 1} of {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              let optionStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

              if (isAnswered) {
                if (optIdx === currentQ.correctIndex) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (optIdx === selectedOption) {
                  optionStyle = 'bg-red-50 border-red-500 text-red-950';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <div
                  key={optIdx}
                  id={`quiz-opt-${optIdx}`}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm select-none ${optionStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && optIdx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isAnswered && optIdx === selectedOption && optIdx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 text-xs text-teal-950 space-y-1 animate-in fade-in">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Scientific Explanation:</span>
              </span>
              <p className="leading-relaxed text-slate-700">{currentQ.explanation}</p>
            </div>
          )}

          {/* Footer Action */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                id="btn-quiz-next"
                onClick={handleNext}
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results / Certificate View */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg max-w-xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs animate-bounce">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Quiz Completed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              HealthBridge Wellness Certificate
            </h2>
            <p className="text-sm text-slate-600">
              You scored <strong>{score}</strong> out of <strong>{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
            {score >= 5
              ? 'Outstanding knowledge! You demonstrated strong comprehension of biological hygiene principles and evidence-based self-care.'
              : 'Great effort! Health literacy is a lifelong journey. Review the Health Education Hub for more insights.'}
          </div>

          <button
            id="btn-restart-quiz"
            onClick={handleRestart}
            className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Health Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
