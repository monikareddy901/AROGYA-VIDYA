import React, { useState } from 'react';
import {
  Heart,
  Shield,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Apple,
  Ban,
  Activity,
  Flame,
  Moon,
  Droplets,
  Brain,
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Clock,
  Pill,
  UserCheck,
  Award,
  HelpCircle,
  Dna,
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';
import { LanguageCode } from '../types';

interface HormonalAndMensHealthProps {
  language?: LanguageCode;
  onNavigate?: (tab: string) => void;
}

export const HormonalAndMensHealth: React.FC<HormonalAndMensHealthProps> = ({
  language = 'en',
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState<'pcos_pcod' | 'mens_health' | 'nutrition' | 'doctor_guidance'>('pcos_pcod');
  const [pcosComparisonMode, setPcosComparisonMode] = useState<'both' | 'pcos' | 'pcod'>('both');
  const [searchFilter, setSearchFilter] = useState('');

  // PCOS vs PCOD Key Differences Data
  const comparisonData = [
    {
      feature: 'Full Name',
      pcod: 'Polycystic Ovarian Disease',
      pcos: 'Polycystic Ovary Syndrome',
      importance: 'PCOD is primarily an ovarian condition, while PCOS is a complex endocrine & metabolic disorder.'
    },
    {
      feature: 'Prevalence in India',
      pcod: 'Extremely Common (~30% to 35% of women)',
      pcos: 'Less Common but Serious (~8% to 12% of women)',
      importance: 'Many women with PCOD do not have PCOS.'
    },
    {
      feature: 'Underlying Nature',
      pcod: 'Ovaries release immature or partially mature eggs due to lifestyle and temporary hormonal imbalances.',
      pcos: 'Endocrine disorder where ovaries produce excessive androgens (male hormones), disrupting regular ovulation.',
      importance: 'PCOS involves deep hormone signaling pathways in the brain and ovaries.'
    },
    {
      feature: 'Insulin Resistance & Metabolism',
      pcod: 'Usually mild or absent; mostly related to lifestyle factors.',
      pcos: 'Profound insulin resistance present in 70%–80% of individuals, regardless of body weight.',
      importance: 'PCOS has higher metabolic implications for glucose handling and lipid profiles.'
    },
    {
      feature: 'Fertility & Conception',
      pcod: 'Most women can conceive naturally or with simple dietary & lifestyle modifications.',
      pcos: 'May require specialized medical assistance (ovulation induction) under a gynecologist’s care.',
      importance: 'Neither condition means infertility—both can be effectively managed.'
    },
    {
      feature: 'Long-Term Health Risks',
      pcod: 'Low risk of severe long-term complications if healthy weight and diet are maintained.',
      pcos: 'Higher risk of Type 2 diabetes, elevated blood pressure, cardiovascular issues, and endometrial thickening if untreated.',
      importance: 'PCOS requires lifelong holistic preventive monitoring.'
    },
    {
      feature: 'Primary Management',
      pcod: 'Primarily balanced nutrition, regular exercise, stress control, and sleep hygiene.',
      pcos: 'Holistic lifestyle modifications alongside medical treatment (metformin, hormonal therapy if prescribed).',
      importance: 'Lifestyle changes form the bedrock of both conditions.'
    }
  ];

  // Common PCOS/PCOD Symptoms
  const pcosSymptoms = [
    {
      title: 'Irregular or Absent Menstrual Cycles',
      desc: 'Cycles longer than 35 days, fewer than 8 periods a year, or unpredictable spotting.',
      icon: Calendar,
      color: 'bg-rose-50 border-rose-200 text-rose-800'
    },
    {
      title: 'Hormonal Acne & Skin Breakouts',
      desc: 'Persistent, deep, cystic pimples primarily concentrated on the jawline, chin, and upper neck.',
      icon: Sparkles,
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      title: 'Hirsutism (Excess Hair Growth)',
      desc: 'Unwanted coarse hair growth on the chin, upper lip, chest, abdomen, or inner thighs due to androgens.',
      icon: Shield,
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      title: 'Weight Fluctuations & Insulin Resistance',
      desc: 'Difficulty losing weight, rapid abdominal weight gain, or intense cravings for sweets and refined carbs.',
      icon: Activity,
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      title: 'Hair Thinning (Androgenic Alopecia)',
      desc: 'Gradual thinning of hair at the crown or widening of the center hair partition.',
      icon: Info,
      color: 'bg-teal-50 border-teal-200 text-teal-800'
    },
    {
      title: 'Acanthosis Nigricans (Skin Darkening)',
      desc: 'Velvety, darkened skin patches in body folds (back of the neck, armpits, and groin), signaling insulin resistance.',
      icon: AlertTriangle,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    }
  ];

  // What to Eat (PCOS & Hormonal Health)
  const pcosFoodsToEat = [
    {
      category: 'Non-Starchy Vegetables',
      items: 'Spinach (Palak), Methi, Broccoli, Cabbage, Cauliflower, Lauki, Cucumber, Capsicum',
      benefit: 'High in dietary fiber and essential micronutrients; minimizes post-meal blood glucose spikes.'
    },
    {
      category: 'Low-Glycemic Index Fruits',
      items: 'Apples, Pears, Guavas, Berries (strawberries, amla), Oranges, Papaya, Pomegranate',
      benefit: 'Rich in antioxidants and polyphenols; provides sweetness without severe insulin spikes.'
    },
    {
      category: 'Traditional Millets & Whole Grains',
      items: 'Ragi (Finger millet), Jowar, Bajra, Foxtail millet, Brown/Red rice, Whole oats, Quinoa',
      benefit: 'Slow-digesting complex carbs that improve insulin sensitivity and sustain energy throughout the day.'
    },
    {
      category: 'Plant & Animal Quality Proteins',
      items: 'Moong dal, Chana/Chickpeas, Rajma, Edamame, Paneer/Tofu, Eggs, Lean fish, Greek yogurt/Curd',
      benefit: 'Protein stabilizes satiety hormones, curbs sugar cravings, and supports lean muscle tissue.'
    },
    {
      category: 'Hormone-Supporting Healthy Fats & Seeds',
      items: 'Flaxseeds (ground), Chia seeds, Pumpkin seeds (rich in zinc), Walnuts, Almonds, Cold-pressed oils',
      benefit: 'Provides omega-3 fatty acids and lignans which help gently regulate androgen and estrogen metabolism.'
    }
  ];

  // Foods to Limit (PCOS & Hormonal Health)
  const pcosFoodsToLimit = [
    {
      category: 'Sugary Drinks & Sweetened Beverages',
      items: 'Carbonated sodas, packaged fruit juices, sweetened milk teas, bubble tea, energy drinks',
      why: 'Causes sharp, rapid glucose and insulin spikes that signal ovaries to produce more androgens.'
    },
    {
      category: 'Ultra-Processed Foods & Packaged Snacks',
      items: 'Potato chips, packaged cookies/biscuits, instant noodles, extruded namkeens with trans-fats',
      why: 'Promotes systemic low-grade inflammation and disrupts gut microbiome balance.'
    },
    {
      category: 'Excessive Refined Carbohydrates',
      items: 'Maida, white bread, pastries, bakery cakes, deep-fried snacks (bhature, samosas)',
      why: 'Quickly converted into bloodstream glucose, aggravating insulin resistance and fatigue.'
    },
    {
      category: 'Excess Added Sugars & Syrups',
      items: 'Refined white sugar, high-fructose corn syrups, condensed milk sweets (mithai in excess)',
      why: 'Exacerbates hormonal fluctuations, skin acne breakouts, and cravings.'
    },
    {
      category: 'Re-Heated & Hydrogenated Oils',
      items: 'Commercial deep-fryer oil, vanaspati, margarine',
      why: 'Rich in harmful trans-fats and free radicals that drive cellular inflammation.'
    }
  ];

  // Men's Health Modules
  const mensHealthTopics = [
    {
      id: 'mens-nutrition',
      title: 'Nutrition & Heart-Smart Eating for Men',
      badge: 'Metabolic & Cardiovascular',
      icon: Apple,
      color: 'border-emerald-200 bg-emerald-50/60',
      summary: 'Fueling lean muscle mass, cardiovascular elasticity, and stable daily stamina.',
      goodFoods: [
        'Lycopene-rich cooked tomatoes (supports prostate cellular health)',
        'Omega-3 fatty fish (sardines, salmon, mackerel, rohu) or flaxseed/walnuts for heart arteries',
        'High-fiber millets & pulses to keep visceral belly fat low',
        'Zinc-rich pumpkin seeds, eggs, and chickpeas for testosterone and immune synthesis',
        'Adequate clean water (3 to 3.5 Liters daily for active men)'
      ],
      limitFoods: [
        'Excessive sodium/salt (packaged namkeens, pickles in excess) which accelerates hypertension',
        'Excess sugary beverages & alcohol that convert directly into visceral liver & abdominal fat',
        'Deep-fried street foods with oxidized fats'
      ]
    },
    {
      id: 'mens-fitness',
      title: 'Physical Activity, Muscle & Visceral Fat',
      badge: 'Strength & Stamina',
      icon: Flame,
      color: 'border-amber-200 bg-amber-50/60',
      summary: 'Why muscle is an active metabolic organ that protects men from diabetes and cardiovascular decline.',
      keyPoints: [
        'Combine progressive resistance training (squats, pushups, weights 3x/week) with 150 mins aerobic cardio.',
        'Visceral abdominal fat (belly fat) acts as an endocrine disruptor, converting testosterone to estrogen and elevating inflammation.',
        'Regular movement enhances nitric oxide release, keeping blood vessels dilated and blood pressure healthy.'
      ]
    },
    {
      id: 'mens-sleep-stress',
      title: 'Sleep, Stress & Emotional Wellbeing',
      badge: 'Hormones & Mental Health',
      icon: Moon,
      color: 'border-indigo-200 bg-indigo-50/60',
      summary: 'Testosterone production occurs primarily during deep REM sleep cycles.',
      keyPoints: [
        '7 to 8 hours of uninterrupted nocturnal sleep is required for peak hormone renewal and cognitive focus.',
        'Chronic workplace stress elevates cortisol, suppressing immune defense and causing burnout.',
        'Breaking the stigma: Seeking help for anxiety, depression, or emotional overload is a sign of strength, not weakness.'
      ]
    },
    {
      id: 'mens-hygiene-testicular',
      title: 'Hygiene & Testicular Self-Awareness',
      badge: 'Preventive Care',
      icon: Shield,
      color: 'border-teal-200 bg-teal-50/60',
      summary: 'Daily hygiene practices and routine monthly self-examination.',
      keyPoints: [
        'Daily cleansing of the groin area with mild water; dry thoroughly to avoid fungal infections (jock itch/tinea cruris).',
        'Wear breathable cotton underwear; avoid overly tight synthetic clothing during workouts.',
        'Monthly testicular self-check in a warm shower: roll each testicle between fingers to check for new hard lumps, sudden swelling, or changes in firmness.'
      ]
    },
    {
      id: 'mens-prostate-aging',
      title: 'Prostate Health & Healthy Aging',
      badge: '40+ Awareness',
      icon: UserCheck,
      color: 'border-purple-200 bg-purple-50/60',
      summary: 'Understanding the prostate gland and normal age-related urinary changes.',
      keyPoints: [
        'Benign Prostatic Hyperplasia (BPH) is common non-cancerous enlargement that occurs naturally after age 45-50.',
        'Notice urinary flow: difficulty starting, weak stream, or getting up multiple times at night should be discussed with a doctor.',
        'Routine health checkups after age 45 should include blood pressure, fasting glucose, lipid panel, and doctor consultation.'
      ]
    },
    {
      id: 'mens-sexual-health',
      title: 'Sexual & Reproductive Health Awareness',
      badge: 'Taboo-Free Facts',
      icon: Heart,
      color: 'border-rose-200 bg-rose-50/60',
      summary: 'Evidence-based understanding of reproductive health, stamina, and cardiovascular connection.',
      keyPoints: [
        'Erectile function is directly linked to cardiovascular health—blood vessels in the pelvic region are among the smallest and earliest to reflect vascular wellbeing.',
        'Occasional performance fluctuations due to exhaustion, alcohol, or stress are completely normal.',
        'Persistent difficulties are easily treatable by medical doctors; avoid unverified OTC magic pills or street remedies.'
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <span className="px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 text-xs font-black uppercase tracking-wider border border-teal-400/30 flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5" />
              Hormonal & Gender Wellness Hub
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
            Hormonal Health, PCOS/PCOD & Men’s Wellness
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Evidence-based, taboo-free educational guides covering women's endocrine health (PCOS & PCOD), nutrition, symptom management, and comprehensive men's preventive wellness.
          </p>

          {/* Medical Disclaimer Banner inside header */}
          <div className="mt-4 p-3 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-start gap-2.5 text-xs text-amber-100">
            <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p>
              <strong>Educational Awareness Only:</strong> This guide provides evidence-backed lifestyle and nutritional knowledge. Food choices and healthy habits support hormonal balance but do <strong>not</strong> replace formal clinical diagnosis, medical testing, or prescribed therapies. No specific food can "cure" chronic diseases. Consult a qualified doctor for persistent symptoms.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        <button
          onClick={() => setActiveSection('pcos_pcod')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'pcos_pcod'
              ? 'bg-rose-800 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-300" />
          <span>PCOS & PCOD Awareness (Women)</span>
        </button>

        <button
          onClick={() => setActiveSection('mens_health')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'mens_health'
              ? 'bg-blue-800 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Shield className="w-4 h-4 text-blue-300" />
          <span>Men’s Health & Wellness</span>
        </button>

        <button
          onClick={() => setActiveSection('nutrition')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'nutrition'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Apple className="w-4 h-4 text-emerald-300" />
          <span>Nutrition: What to Eat & Limit</span>
        </button>

        <button
          onClick={() => setActiveSection('doctor_guidance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'doctor_guidance'
              ? 'bg-purple-800 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-purple-300" />
          <span>When to See a Doctor & Red Flags</span>
        </button>
      </div>

      {/* SECTION 1: PCOS & PCOD AWARENESS (WOMEN) */}
      {activeSection === 'pcos_pcod' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Intro Cards: Simple Definition of PCOS vs PCOD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PCOS Definition Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-xs space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg">
                PCOS
              </div>
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md uppercase">
                  Endocrine & Metabolic Syndrome
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Polycystic Ovary Syndrome (PCOS)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>What is PCOS?</strong> PCOS is a metabolic and endocrine disorder that affects the ovaries and hormone signaling. In PCOS, the body often produces higher-than-normal levels of <strong>androgens (male hormones)</strong> and suffers from <strong>insulin resistance</strong>. This prevents mature eggs from developing and releasing regularly, often resulting in ovaries with multiple small, fluid-filled immature follicles ("cysts") visible on ultrasound.
              </p>
              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100 text-xs text-rose-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Key Impact:
                </p>
                <p>
                  Systemic effects on insulin metabolism, menstrual regularity, skin, hair, and potential long-term cardiovascular health if unmanaged.
                </p>
              </div>
            </div>

            {/* PCOD Definition Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-teal-200 shadow-xs space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-lg">
                PCOD
              </div>
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-teal-100 text-teal-800 rounded-md uppercase">
                  Common Ovarian Condition
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Polycystic Ovarian Disease (PCOD)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>What is PCOD?</strong> PCOD is a very common condition in which the ovaries produce immature or partially mature eggs in large numbers due to hormonal imbalance and lifestyle factors (poor diet, stress, sedentary habits). These immature eggs accumulate and may turn into harmless cysts.
              </p>
              <div className="bg-teal-50 p-3 rounded-2xl border border-teal-100 text-xs text-teal-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  Key Advantage:
                </p>
                <p>
                  PCOD is more localized to the ovaries and generally responds quickly and positively to healthy dietary adjustments, weight stabilization, and exercise without severe systemic metabolic illness.
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>How PCOD Differs from PCOS: Clear Side-by-Side Comparison</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Doctor-verified distinctions to remove confusion and health anxiety.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-extrabold uppercase text-[11px]">
                    <th className="p-3.5 rounded-l-xl w-1/4">Aspect / Feature</th>
                    <th className="p-3.5 text-teal-900 bg-teal-100/70 w-3/8">PCOD (Ovarian Condition)</th>
                    <th className="p-3.5 text-rose-900 bg-rose-100/70 rounded-r-xl w-3/8">PCOS (Endocrine Syndrome)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-extrabold text-slate-900 align-top">
                        {row.feature}
                        <p className="text-[10px] font-normal text-slate-400 mt-0.5">{row.importance}</p>
                      </td>
                      <td className="p-3.5 text-slate-800 bg-teal-50/30 align-top leading-relaxed">
                        <span className="font-semibold text-teal-900">{row.pcod}</span>
                      </td>
                      <td className="p-3.5 text-slate-800 bg-rose-50/30 align-top leading-relaxed">
                        <span className="font-semibold text-rose-900">{row.pcos}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Symptoms Grid */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Common Signs & Symptoms to Notice
              </h3>
              <p className="text-xs text-slate-500">
                Symptoms can range from mild to pronounced. Experiencing one symptom does not automatically confirm PCOS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pcosSymptoms.map((sym, idx) => {
                const Icon = sym.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl p-5 border ${sym.color} flex flex-col justify-between space-y-2`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                        {sym.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {sym.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lifestyle Pillars: Hydration, Sleep, Exercise & Stress */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-black text-teal-300 uppercase tracking-wider">
                Evidence-Based Holistic Foundation
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                The 4 Lifestyle Pillars of Hormonal Equilibrium
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Daily habits scientifically shown to sensitize insulin receptors and support regular ovulation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hydration */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                  <Droplets className="w-4 h-4" />
                  <span>1. Hydration</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drink <strong>2.5 to 3 Liters</strong> of water daily. Herbal infusions like spearmint tea have shown mild anti-androgenic benefits.
                </p>
              </div>

              {/* Sleep */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Moon className="w-4 h-4" />
                  <span>2. Restorative Sleep</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Aim for <strong>7 to 9 hours</strong> of consistent nighttime sleep. Sleep deprivation directly impairs insulin sensitivity the next day.
                </p>
              </div>

              {/* Physical Activity */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>3. Strength & Cardio</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Combine <strong>resistance training</strong> (builds muscle to soak up glucose) with brisk walking or yoga 150 mins/week.
                </p>
              </div>

              {/* Stress Management */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-pink-300 font-bold text-sm">
                  <Brain className="w-4 h-4" />
                  <span>4. Stress & Cortisol</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Chronic stress spikes cortisol, which signals the adrenal glands to produce more androgens. Practice pranayama, walking, and mindful breaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MEN'S HEALTH & WELLNESS */}
      {activeSection === 'mens_health' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 space-y-2">
            <h3 className="text-lg font-black text-blue-950 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-700" />
              <span>Comprehensive Men’s Health & Preventive Wellness</span>
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              Men often delay visiting doctors until symptoms become acute. Proactive preventive health—focusing on cardiovascular stamina, metabolic health, testicular and prostate awareness, sleep, and emotional strength—extends healthspan and vitality.
            </p>
          </div>

          {/* Grid of Men's Health Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mensHealthTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.id}
                  className={`bg-white rounded-3xl p-5 border ${topic.color} shadow-xs flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center text-slate-900 border border-slate-100">
                        <Icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                        {topic.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>

                    {topic.keyPoints && (
                      <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        {topic.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {topic.goodFoods && (
                      <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                        <p className="font-bold text-emerald-800 text-[11px] uppercase">Foods to Prioritize:</p>
                        <ul className="space-y-1 text-slate-700">
                          {topic.goodFoods.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Men's Common Health Concerns Table (Educational / Non-diagnostic) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Basic Educational Awareness: Common Men’s Health Concerns
            </h3>
            <p className="text-xs text-slate-500">
              Awareness helps you recognize early indicators and seek routine primary care before issues escalate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h5 className="font-bold text-sm text-slate-900">1. High Blood Pressure (Hypertension)</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Often called the "silent killer" because it has zero symptoms until advanced. Check your blood pressure annually (target under 120/80 mmHg).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h5 className="font-bold text-sm text-slate-900">2. Type 2 Diabetes & Insulin Resistance</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  South Asian men carry higher genetic risk for early insulin resistance. Check HbA1c and Fasting Glucose tests annually after age 30.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h5 className="font-bold text-sm text-slate-900">3. Heart & Lipid Health</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monitor LDL ("bad cholesterol") and Triglycerides. Regular cardiovascular workouts keep coronary arteries flexible and clean.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h5 className="font-bold text-sm text-slate-900">4. Prostate Health (BPH)</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Notice changes in urination speed, night awakenings, or weak flow. Benign prostate enlargement is standard as men age and easily managed.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h5 className="font-bold text-sm text-slate-900">5. Testicular Health</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Most common in young men aged 15–40. Monthly self-checks after a warm shower identify harmless cysts vs items needing ultrasound check.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h5 className="font-bold text-sm text-slate-900">6. Mental Wellbeing & Stress</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chronic exhaustion, anger, isolation, or loss of interest in hobbies are signs of burnout or depression. Speak openly with medical professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: NUTRITION - WHAT TO EAT & WHAT TO LIMIT */}
      {activeSection === 'nutrition' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Note */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-2">
            <h3 className="text-lg font-black text-emerald-950 flex items-center gap-2">
              <Apple className="w-5 h-5 text-emerald-700" />
              <span>Evidence-Based Nutritional Guidance</span>
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              Food is information for your endocrine and cardiovascular systems. Nourishing your body with unrefined, fiber-rich, and antioxidant-dense whole foods stabilizes glucose and supports cellular vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* What to Eat Column */}
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    What to Eat: Wholesome Nutritional Choices
                  </h4>
                  <p className="text-xs text-slate-500">Prioritize these minimally processed nutrient powerhouses</p>
                </div>
              </div>

              <div className="space-y-4">
                {pcosFoodsToEat.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-xs text-emerald-950 uppercase tracking-wide">
                        {item.category}
                      </h5>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">{item.items}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                      <span className="font-bold text-emerald-800">Why it helps:</span> {item.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Foods to Limit Column */}
            <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                  <Ban className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    Foods to Limit or Avoid
                  </h4>
                  <p className="text-xs text-slate-500">Minimize items that trigger insulin spikes and inflammation</p>
                </div>
              </div>

              <div className="space-y-4">
                {pcosFoodsToLimit.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-xs text-rose-950 uppercase tracking-wide">
                        {item.category}
                      </h5>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">{item.items}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                      <span className="font-bold text-rose-800">Why to limit:</span> {item.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: WHEN TO SEE A DOCTOR & RED FLAGS */}
      {activeSection === 'doctor_guidance' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-6 space-y-2">
            <h3 className="text-lg font-black text-purple-950 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-purple-700" />
              <span>When to Consult a Qualified Healthcare Professional</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-900 leading-relaxed">
              Timely consultation with an Obstetrician/Gynecologist, Endocrinologist, Urologist, or General Physician ensures accurate clinical diagnosis through blood hormone profiles, ultrasound imaging, and tailored care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For Women (PCOS / Hormonal Red Flags) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-extrabold text-base border-b border-slate-100 pb-2">
                <Heart className="w-5 h-5" />
                <span>Consult a Gynecologist / Endocrinologist If:</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>You have missed periods for <strong>3 or more consecutive months</strong> without pregnancy.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Your menstrual cycles are persistently irregular (shorter than 21 days or longer than 35–45 days).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Heavy bleeding that requires changing menstrual pads/tampons every hour for two consecutive hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Rapid, sudden onset of facial/body hair growth, severe cystic acne, or progressive scalp hair thinning.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Trying to conceive for 6 to 12 months without success.</span>
                </li>
              </ul>
            </div>

            {/* For Men (Men's Health Red Flags) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-blue-800 font-extrabold text-base border-b border-slate-100 pb-2">
                <Shield className="w-5 h-5" />
                <span>Consult a Urologist / Physician If:</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Any new, firm, painless or painful lump felt in the testicle or sudden scrotal swelling.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Difficulty starting urination, significantly weak urine flow, or blood in urine/semen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Sudden unexplained chest tightness, shortness of breath, or persistent resting blood pressure above 140/90.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Persistent chronic fatigue, low libido, or mood changes interfering with daily work and relationships.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Age 45–50+ for routine preventive prostate and cardiovascular health baseline review.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Doctor Prep Button */}
          <div className="bg-gradient-to-r from-teal-800 to-emerald-700 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-lg">Planning a Doctor’s Visit?</h4>
              <p className="text-xs text-teal-100 mt-1">
                Use our Doctor Visit Prep tool to generate a printable summary of your symptoms, questions, and medications.
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('doctorPrep')}
                className="px-5 py-2.5 bg-white hover:bg-teal-50 text-teal-900 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Open Doctor Visit Prep →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
