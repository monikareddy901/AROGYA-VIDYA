import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Home,
  ChevronRight,
  Clock,
  Pill,
  Building2,
  Sparkles,
  Flame,
  GraduationCap,
  Stethoscope,
  FileText,
  Heart,
  Calendar,
  BookOpen,
  Shield,
  Activity,
  Award
} from 'lucide-react';
import {
  UserProfile,
  LanguageCode,
  NavTab,
  HealthArticle,
  MedicalReport,
  Medication,
  PreventiveCareItem,
  TimelineEvent,
  HabitLog,
} from './types';
import { HealthBridgeStorage } from './services/api';
import { HEALTH_ARTICLES } from './data/healthArticles';
import { MYTHS_AND_FACTS } from './data/mythsAndFacts';
import { DEMO_USER, DEMO_PROFILES } from './data/demoData';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyBanner } from './components/EmergencyBanner';
import { EmergencyModal } from './components/EmergencyModal';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { DailyTimeTable } from './components/DailyTimeTable';
import { PersonalHygieneHub } from './components/PersonalHygieneHub';
import { AdolescentEducationHub } from './components/AdolescentEducationHub';
import { HospitalPharmacyFinder } from './components/HospitalPharmacyFinder';
import { HealthEducationHub } from './components/HealthEducationHub';
import { MythVsFact } from './components/MythVsFact';
import { SymptomNavigator } from './components/SymptomNavigator';
import { MedicalReportExplainer } from './components/MedicalReportExplainer';
import { MedicationManager } from './components/MedicationManager';
import { DailyWellnessTracker } from './components/DailyWellnessTracker';
import { PeriodCare } from './components/PeriodCare';
import { DoctorVisitPrep } from './components/DoctorVisitPrep';
import { PreventiveCare } from './components/PreventiveCare';
import { HealthTimeline } from './components/HealthTimeline';
import { BridgeBuddyAI } from './components/BridgeBuddyAI';
import { FloatingBridgeBuddy } from './components/FloatingBridgeBuddy';
import { HealthQuiz } from './components/HealthQuiz';
import { PrivacyView } from './components/PrivacyView';
import { AdminPortalView } from './components/AdminPortalView';
import { FamilyCareView } from './components/FamilyCareView';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { HormonalAndMensHealth } from './components/HormonalAndMensHealth';

export default function App() {
  // Profiles Management State
  const [profiles, setProfiles] = useState<UserProfile[]>(() => HealthBridgeStorage.getProfiles());
  const [activeProfileId, setActiveProfileId] = useState<string>(() => HealthBridgeStorage.getActiveProfileId());
  
  // Active User is dynamically resolved from activeProfileId
  const activeUser = profiles.find((p) => p.id === activeProfileId) || profiles[0] || DEMO_USER;
  const [user, setUser] = useState<UserProfile>(activeUser);

  const [language, setLanguage] = useState<LanguageCode>(() => HealthBridgeStorage.getLanguage());
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [historyStack, setHistoryStack] = useState<string[]>(['dashboard']);

  // Accessibility States
  const [highContrast, setHighContrast] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xl'>('normal');

  // Application Data States
  const [articles] = useState<HealthArticle[]>(HEALTH_ARTICLES);
  const [myths] = useState(MYTHS_AND_FACTS);
  const [reports, setReports] = useState<MedicalReport[]>(() => HealthBridgeStorage.getReports());
  const [medications, setMedications] = useState<Medication[]>(() => HealthBridgeStorage.getMedications());
  const [preventiveItems, setPreventiveItems] = useState<PreventiveCareItem[]>(() => HealthBridgeStorage.getPreventiveCare());
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() => HealthBridgeStorage.getTimeline());
  const [todayHabit, setTodayHabit] = useState<HabitLog>(() => HealthBridgeStorage.getTodayHabits());

  // Navigation Data Passing (e.g. from Symptom Navigator to Doctor Prep)
  const [doctorPrepInitialData, setDoctorPrepInitialData] = useState<any>(null);

  // Modal States
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  // Sync user state with active profile
  useEffect(() => {
    const current = profiles.find((p) => p.id === activeProfileId) || profiles[0] || DEMO_USER;
    setUser(current);
    HealthBridgeStorage.saveUser(current);
  }, [activeProfileId, profiles]);

  // Listen to browser Back / Forward buttons & URL Hash changes
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab as NavTab);
      } else {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          setActiveTab(hash as NavTab);
        } else {
          setActiveTab('dashboard');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentUser: UserProfile = user;

  // Profile Switching & Creation Handlers
  const handleSelectProfile = (profileId: string) => {
    setActiveProfileId(profileId);
    HealthBridgeStorage.setActiveProfileId(profileId);
    const target = profiles.find((p) => p.id === profileId);
    if (target) {
      setUser(target);
      HealthBridgeStorage.saveUser(target);
    }
  };

  const handleCreateProfile = (newProfile: UserProfile) => {
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    HealthBridgeStorage.saveProfiles(updated);
    setActiveProfileId(newProfile.id);
    HealthBridgeStorage.setActiveProfileId(newProfile.id);
    setUser(newProfile);
    HealthBridgeStorage.saveUser(newProfile);
  };

  // Tab Selection Router with Full History Support
  const handleSelectTab = (tab: string, pushToHistory = true) => {
    if (tab === 'emergencyCard' || tab === 'emergency') {
      setShowEmergencyModal(true);
      return;
    }
    const nextTab = tab as NavTab;
    if (nextTab !== activeTab) {
      if (pushToHistory) {
        setHistoryStack((prev) => [...prev, nextTab]);
        try {
          window.history.pushState({ tab: nextTab }, '', `#${nextTab}`);
        } catch (e) {
          // ignore
        }
      }
      setActiveTab(nextTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dedicated Back Button Handler
  const handleGoBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop(); // pop current tab
      const prevTab = newStack[newStack.length - 1] as NavTab;
      setHistoryStack(newStack);
      setActiveTab(prevTab || 'dashboard');
      try {
        window.history.pushState({ tab: prevTab || 'dashboard' }, '', `#${prevTab || 'dashboard'}`);
      } catch (e) {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('dashboard');
      setHistoryStack(['dashboard']);
      try {
        window.history.pushState({ tab: 'dashboard' }, '', '#dashboard');
      } catch (e) {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Tab Metadata Dictionary for clean Breadcrumbs
  const TAB_METADATA: Record<string, { label: string; icon: any; category?: string }> = {
    timetable: { label: 'Profession-Customized Routine', icon: Clock, category: 'Work & Daily Health' },
    routine: { label: 'Profession-Customized Routine', icon: Clock, category: 'Work & Daily Health' },
    medicines: { label: 'Medication Manager', icon: Pill, category: 'Prescriptions & Safety' },
    medications: { label: 'Medication Manager', icon: Pill, category: 'Prescriptions & Safety' },
    hormonalMen: { label: 'Hormonal Health & Men’s Wellness', icon: Heart, category: 'Endocrine & Gender Health' },
    hormones: { label: 'Hormonal Health & Men’s Wellness', icon: Heart, category: 'Endocrine & Gender Health' },
    pcos_mens: { label: 'Hormonal Health & Men’s Wellness', icon: Heart, category: 'Endocrine & Gender Health' },
    hospitals: { label: 'Bengaluru Hospitals & Metro Routes', icon: Building2, category: 'Medical Finder' },
    pharmacy: { label: 'Bengaluru Hospitals & Metro Routes', icon: Building2, category: 'Medical Finder' },
    rootmap: { label: 'Bengaluru Hospitals & Metro Routes', icon: Building2, category: 'Medical Finder' },
    hygiene: { label: 'Hygiene & Body Care Hub', icon: Sparkles, category: 'Preventive Care' },
    bodycare: { label: 'Hygiene & Body Care Hub', icon: Sparkles, category: 'Preventive Care' },
    personalHygiene: { label: 'Hygiene & Body Care Hub', icon: Sparkles, category: 'Preventive Care' },
    wellness: { label: 'Daily Wellness & Streaks', icon: Flame, category: 'Habits & Tracking' },
    habits: { label: 'Daily Wellness & Streaks', icon: Flame, category: 'Habits & Tracking' },
    studentEdu: { label: 'Student Health & Puberty Education', icon: GraduationCap, category: 'Youth Health' },
    student_edu: { label: 'Student Health & Puberty Education', icon: GraduationCap, category: 'Youth Health' },
    puberty: { label: 'Student Health & Puberty Education', icon: GraduationCap, category: 'Youth Health' },
    symptoms: { label: 'Symptom Navigator', icon: Stethoscope, category: 'Clinical Check' },
    reports: { label: 'Medical Report Explainer', icon: FileText, category: 'Lab & Diagnostic' },
    periodcare: { label: 'PeriodCare & Menstrual Tracker', icon: Heart, category: "Women's Health" },
    periodCare: { label: 'PeriodCare & Menstrual Tracker', icon: Heart, category: "Women's Health" },
    doctor_prep: { label: 'Doctor Visit Prep', icon: FileText, category: 'Consultation Guide' },
    doctorPrep: { label: 'Doctor Visit Prep', icon: FileText, category: 'Consultation Guide' },
    preventive: { label: 'Preventive Care Schedule', icon: Calendar, category: 'Screenings & Vaccines' },
    education: { label: 'Health Education Hub', icon: BookOpen, category: 'Learning Library' },
    learn: { label: 'Health Education Hub', icon: BookOpen, category: 'Learning Library' },
    myths: { label: 'Myth vs Fact Debunker', icon: Sparkles, category: 'Misconception Busting' },
    timeline: { label: 'Health Timeline', icon: Clock, category: 'Medical History' },
    bridgebuddy: { label: 'BridgeBuddy AI Companion', icon: Sparkles, category: 'AI Medical Helper' },
    buddy: { label: 'BridgeBuddy AI Companion', icon: Sparkles, category: 'AI Medical Helper' },
    quiz: { label: 'Health Literacy Quiz', icon: Award, category: 'Knowledge Challenge' },
    privacy: { label: 'Privacy & Security Center', icon: Shield, category: 'Security & Ethics' },
    family: { label: 'Family Health Care Hub', icon: Heart, category: 'Family Profiles' },
    admin: { label: 'Admin Safety Portal', icon: Shield, category: 'Administrative' },
  };

  const currentMeta = TAB_METADATA[activeTab];
  const CurrentIcon = currentMeta?.icon;

  // Sync language changes
  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    HealthBridgeStorage.saveLanguage(lang);
  };

  const handleCycleFontScale = () => {
    if (fontScale === 'normal') setFontScale('large');
    else if (fontScale === 'large') setFontScale('xl');
    else setFontScale('normal');
  };

  // Auth Handlers
  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    HealthBridgeStorage.saveUser(newUser);
    const exists = profiles.some(p => p.id === newUser.id);
    if (!exists) {
      const updated = [...profiles, newUser];
      setProfiles(updated);
      HealthBridgeStorage.saveProfiles(updated);
    }
    setActiveProfileId(newUser.id);
    HealthBridgeStorage.setActiveProfileId(newUser.id);
    setShowAuthModal(false);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    HealthBridgeStorage.clearUser();
    // Default back to Monika Reddy
    setActiveProfileId('monika-reddy-1');
    HealthBridgeStorage.setActiveProfileId('monika-reddy-1');
    setUser(DEMO_USER);
    setActiveTab('dashboard');
  };

  const handleUpdateHabit = (updated: HabitLog) => {
    setTodayHabit(updated);
    HealthBridgeStorage.saveTodayHabits(updated);
  };

  const handleLogMedication = (id: string, status: 'taken' | 'missed' | 'snoozed') => {
    const updated = HealthBridgeStorage.logMedicationStatus(id, status);
    setMedications(updated);
  };

  const handleNavigateToDoctorPrep = (data?: any) => {
    if (data) {
      setDoctorPrepInitialData(data);
    }
    setActiveTab('doctor_prep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fontClass =
    fontScale === 'xl' ? 'text-lg' : fontScale === 'large' ? 'text-base' : 'text-sm';

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-600 selection:text-white ${
        highContrast ? 'contrast-125 saturate-150' : ''
      } ${fontClass}`}
    >
      {/* Top Fixed Emergency Safety Banner */}
      <EmergencyBanner
        language={language}
        onOpenEmergency={() => setShowEmergencyModal(true)}
      />

      {/* Main Navigation Bar */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={handleSelectTab}
        user={currentUser}
        language={language}
        onSelectLanguage={handleLanguageChange}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onOpenEmergency={() => setShowEmergencyModal(true)}
        onOpenProfiles={() => setShowProfileModal(true)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        ttsEnabled={ttsEnabled}
        onToggleTTS={() => setTtsEnabled(!ttsEnabled)}
        fontScale={fontScale}
        onChangeFontScale={handleCycleFontScale}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Universal Back Navigation & Breadcrumb Header on all sub-pages */}
        {activeTab !== 'dashboard' && activeTab !== 'home' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                id="btn-universal-back"
                onClick={handleGoBack}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer group"
                title="Go back to previous page"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>← Back</span>
              </button>

              <button
                id="btn-return-dashboard"
                onClick={() => handleSelectTab('dashboard')}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                title="Return to Main Dashboard"
              >
                <Home className="w-4 h-4 text-teal-700" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            </div>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-1">
              <button
                onClick={() => handleSelectTab('dashboard')}
                className="hover:text-teal-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                Dashboard
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {currentMeta?.category && (
                <>
                  <span className="text-slate-400 hidden md:inline">{currentMeta.category}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden md:inline shrink-0" />
                </>
              )}
              <span className="font-extrabold text-teal-950 flex items-center gap-1.5 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/70 whitespace-nowrap">
                {CurrentIcon && <CurrentIcon className="w-3.5 h-3.5 text-teal-700" />}
                <span>{currentMeta?.label || activeTab}</span>
              </span>
            </div>
          </div>
        )}

        {/* Floating Quick Return Pill on sub-pages */}
        {activeTab !== 'dashboard' && activeTab !== 'home' && (
          <div className="fixed bottom-6 left-6 z-30 hidden sm:block">
            <button
              id="btn-floating-back-dashboard"
              onClick={() => handleSelectTab('dashboard')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 hover:bg-teal-900 text-white font-bold text-xs rounded-full shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
          </div>
        )}

        {/* Render Views Based on Active Tab */}
        
        {/* Home / Landing Page */}
        {activeTab === 'home' && (
          <LandingPage
            language={language}
            onGetStarted={() => {
              if (user) {
                setActiveTab('dashboard');
              } else {
                setShowAuthModal(true);
              }
            }}
            onExploreHealth={() => setActiveTab('education')}
            onSelectFeature={handleSelectTab}
          />
        )}

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <Dashboard
            user={currentUser}
            language={language}
            todayHabit={todayHabit}
            onUpdateHabit={handleUpdateHabit}
            medications={medications}
            onLogMedication={handleLogMedication}
            reports={reports}
            preventiveItems={preventiveItems}
            timeline={timelineEvents}
            articles={articles}
            onSelectTab={handleSelectTab}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenEmergency={() => setShowEmergencyModal(true)}
            onOpenProfiles={() => setShowProfileModal(true)}
          />
        )}

        {/* Daily Health Habit Timetable (timetable / routine) */}
        {(activeTab === 'timetable' || activeTab === 'routine') && (
          <DailyTimeTable currentProfile={currentUser} onNavigate={handleSelectTab} />
        )}

        {/* Personal Hygiene Hub (hygiene / bodycare / personalHygiene) */}
        {(activeTab === 'hygiene' || activeTab === 'bodycare' || activeTab === 'personalHygiene') && (
          <PersonalHygieneHub onNavigate={handleSelectTab} />
        )}

        {/* Student Health & Puberty Education (studentEdu / student_edu / puberty) */}
        {(activeTab === 'studentEdu' || activeTab === 'student_edu' || activeTab === 'puberty') && (
          <AdolescentEducationHub onNavigate={handleSelectTab} />
        )}

        {/* Nearby Bengaluru Hospitals & Route Map (hospitals / pharmacy / rootmap) */}
        {(activeTab === 'hospitals' || activeTab === 'pharmacy' || (activeTab as any) === 'rootmap') && (
          <HospitalPharmacyFinder onNavigate={handleSelectTab} />
        )}

        {/* Health Education Hub (learn / education) */}
        {(activeTab === 'education' || activeTab === 'learn') && (
          <HealthEducationHub
            articles={articles}
            language={language}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenMyths={() => setActiveTab('myths')}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Myth vs Fact */}
        {activeTab === 'myths' && (
          <MythVsFact myths={myths} language={language} onNavigate={handleSelectTab} />
        )}

        {/* Symptom Navigator */}
        {activeTab === 'symptoms' && (
          <SymptomNavigator
            user={currentUser}
            language={language}
            onOpenEmergency={() => setShowEmergencyModal(true)}
            onNavigateToDoctorPrep={handleNavigateToDoctorPrep}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Medical Report Explainer */}
        {activeTab === 'reports' && (
          <MedicalReportExplainer
            user={currentUser}
            reports={reports}
            onUpdateReports={setReports}
            language={language}
            onNavigateToDoctorPrep={handleNavigateToDoctorPrep}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Medication Manager (medications / medicines) */}
        {(activeTab === 'medications' || activeTab === 'medicines') && (
          <MedicationManager
            user={currentUser}
            medications={medications}
            onUpdateMedications={setMedications}
            language={language}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Daily Wellness Tracker (habits / wellness) */}
        {(activeTab === 'habits' || activeTab === 'wellness') && (
          <DailyWellnessTracker
            user={currentUser}
            todayHabit={todayHabit}
            onUpdateHabit={handleUpdateHabit}
            language={language}
            onOpenPeriodCare={() => setActiveTab('periodcare')}
            onNavigate={handleSelectTab}
          />
        )}

        {/* PeriodCare (periodcare / periodCare) */}
        {(activeTab === 'periodcare' || activeTab === 'periodCare') && (
          <PeriodCare
            user={currentUser}
            language={language}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Hormonal & Men's Health Hub (hormonalMen / hormones / pcos_mens) */}
        {(activeTab === 'hormonalMen' || activeTab === 'hormones' || activeTab === 'pcos_mens') && (
          <HormonalAndMensHealth
            language={language}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Preventive Care */}
        {activeTab === 'preventive' && (
          <PreventiveCare
            user={currentUser}
            preventiveItems={preventiveItems}
            onUpdateItems={setPreventiveItems}
            language={language}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Doctor Visit Prep (doctor_prep / doctorPrep) */}
        {(activeTab === 'doctor_prep' || activeTab === 'doctorPrep') && (
          <DoctorVisitPrep
            user={currentUser}
            reports={reports}
            medications={medications}
            initialData={doctorPrepInitialData}
            language={language}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Health Timeline */}
        {activeTab === 'timeline' && (
          <HealthTimeline
            user={currentUser}
            events={timelineEvents}
            onUpdateEvents={setTimelineEvents}
            language={language}
            onNavigate={handleSelectTab}
          />
        )}

        {/* BridgeBuddy AI Companion (bridgebuddy / buddy) */}
        {(activeTab === 'bridgebuddy' || activeTab === 'buddy') && (
          <BridgeBuddyAI
            user={currentUser}
            language={language}
            onOpenEmergency={() => setShowEmergencyModal(true)}
            onNavigate={handleSelectTab}
          />
        )}

        {/* Health Literacy Quiz */}
        {activeTab === 'quiz' && (
          <HealthQuiz language={language} onNavigate={handleSelectTab} />
        )}

        {/* Privacy Center */}
        {activeTab === 'privacy' && (
          <PrivacyView
            language={language}
            onNavigateHome={() => setActiveTab('dashboard')}
          />
        )}

        {/* Admin Portal */}
        {activeTab === 'admin' && (
          <AdminPortalView language={language} />
        )}

        {/* Family Care Hub */}
        {activeTab === 'family' && (
          <FamilyCareView
            user={currentUser}
            language={language}
            onOpenEmergency={() => setShowEmergencyModal(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        onSelectTab={handleSelectTab}
        onOpenEmergency={() => setShowEmergencyModal(true)}
      />

      {/* Emergency Modal Hub (112, Digital Card, First Aid, Red Flags) */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        language={language}
      />

      {/* Profile Switching & Creation Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        currentProfile={currentUser}
        profiles={profiles}
        onSelectProfile={(profile) => {
          handleSelectProfile(profile.id);
          setShowProfileModal(false);
        }}
        onSaveProfile={(profile) => {
          handleCreateProfile(profile);
          setShowProfileModal(false);
        }}
      />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLogin}
          language={language}
        />
      )}

      {/* Onboarding Modal */}
      {showOnboardingModal && (
        <OnboardingModal
          user={currentUser}
          isOpen={showOnboardingModal}
          onComplete={(updated) => {
            setUser(updated);
            HealthBridgeStorage.saveUser(updated);
            setShowOnboardingModal(false);
          }}
        />
      )}

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          language={language}
          onNavigateToDoctorPrep={handleNavigateToDoctorPrep}
        />
      )}

      {/* 🌟 Floating BridgeBuddy AI Assistant (Available globally throughout the entire site) */}
      <FloatingBridgeBuddy
        user={currentUser}
        language={language}
        onOpenEmergency={() => setShowEmergencyModal(true)}
        onOpenFullPage={() => handleSelectTab('buddy')}
      />
    </div>
  );
}
