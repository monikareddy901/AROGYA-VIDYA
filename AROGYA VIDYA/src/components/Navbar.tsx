import React, { useState } from 'react';
import {
  HeartPulse,
  Stethoscope,
  Pill,
  FileText,
  Shield,
  Eye,
  Volume2,
  VolumeX,
  Menu,
  X,
  Globe,
  User,
  LogOut,
  Calendar,
  Sparkles,
  PhoneCall,
  Clock,
  Building2,
  GraduationCap,
  Users,
  ChevronDown,
  Flame,
  Briefcase,
  Heart,
  ShieldCheck,
  UserCheck,
  Award,
  HelpCircle
} from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArogyavidyaLogo } from './ArogyavidyaLogo';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  user: UserProfile | null;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenEmergency: () => void;
  onOpenProfiles?: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  ttsEnabled: boolean;
  onToggleTTS: () => void;
  fontScale: 'normal' | 'large' | 'xl';
  onChangeFontScale: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  user,
  language,
  onSelectLanguage,
  onOpenAuth,
  onLogout,
  onOpenEmergency,
  onOpenProfiles,
  highContrast,
  onToggleHighContrast,
  ttsEnabled,
  onToggleTTS,
  fontScale,
  onChangeFontScale,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const isTabActive = (tabId: string) => {
    if (currentTab === tabId) return true;
    if (tabId === 'timetable' && (currentTab === 'routine' || currentTab === 'habits')) return true;
    if (tabId === 'medicines' && currentTab === 'medications') return true;
    if (tabId === 'hormonalMen' && (currentTab === 'hormones' || currentTab === 'pcos_mens')) return true;
    if (tabId === 'hygiene' && (currentTab === 'bodycare' || currentTab === 'personalHygiene')) return true;
    if (tabId === 'studentEdu' && (currentTab === 'student_edu' || currentTab === 'puberty')) return true;
    if (tabId === 'hospitals' && (currentTab === 'pharmacy' || currentTab === 'rootmap')) return true;
    if (tabId === 'wellness' && currentTab === 'habits') return true;
    if (tabId === 'learn' && currentTab === 'education') return true;
    if (tabId === 'buddy' && currentTab === 'bridgebuddy') return true;
    if (tabId === 'doctorPrep' && currentTab === 'doctor_prep') return true;
    return false;
  };

  // 1st: Profession Routine, 2nd: Medicine, then all other key features
  const navItems = [
    { id: 'timetable', label: 'Profession Routine', icon: Briefcase },
    { id: 'medicines', label: t.medicines, icon: Pill },
    { id: 'dashboard', label: t.dashboard, icon: HeartPulse },
    { id: 'hormonalMen', label: 'Hormonal & Men’s', icon: Heart },
    { id: 'hygiene', label: 'Hygiene & Care', icon: Sparkles },
    { id: 'wellness', label: 'Wellness & Streaks', icon: Flame },
    { id: 'symptoms', label: t.symptoms, icon: Stethoscope },
    { id: 'reports', label: t.reports, icon: FileText },
    { id: 'hospitals', label: 'Hospitals', icon: Building2 },
    { id: 'buddy', label: t.buddy, icon: Sparkles },
  ];

  const languages: Array<{ code: LanguageCode; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
  ];

  // User initials helper (No profile picture)
  const getUserInitials = (name?: string) => {
    if (!name) return 'MR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors border-b ${
        highContrast
          ? 'bg-slate-900 border-yellow-400 text-yellow-300'
          : 'bg-white/98 backdrop-blur-md border-slate-200 text-slate-800'
      }`}
    >
      {/* Top Primary Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Left Section: Mobile Menu trigger & Crisp Arogyavidya Logo */}
          <div className="flex items-center gap-3">
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* 🌟 Arogyavidya Logo cleanly placed on the left */}
            <div
              id="nav-logo"
              onClick={() => onSelectTab(user ? 'dashboard' : 'home')}
              className="flex items-center cursor-pointer select-none group py-1 transition-transform hover:scale-[1.01]"
              title="Arogyavidya — Learn. Understand. Care. Live Better"
            >
              <ArogyavidyaLogo size="md" align="left" showKannada={false} />
            </div>
          </div>

          {/* Right Section: Language, Accessibility, User initials, and SOS on the FAR RIGHT */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector */}
            <div className="relative">
              <button
                id="btn-language-selector"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer border border-slate-200/80"
                title="Select Language"
              >
                <Globe className="w-4 h-4 text-teal-700" />
                <span className="uppercase hidden sm:inline">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1.5 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-option-${lang.code}`}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between cursor-pointer ${
                        language === lang.code ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && <span className="text-teal-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessibility Tools (Voice Reader, Contrast) */}
            <div className="hidden lg:flex items-center gap-1 border-l border-slate-200 pl-2">
              <button
                id="btn-toggle-tts"
                onClick={onToggleTTS}
                className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  ttsEnabled ? 'bg-teal-100 text-teal-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
                title={ttsEnabled ? 'Voice Reader active' : 'Enable voice reader'}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4 text-teal-600" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                id="btn-contrast-toggle"
                onClick={onToggleHighContrast}
                className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  highContrast ? 'bg-yellow-400 text-slate-900 font-bold' : 'text-slate-500 hover:bg-slate-100'
                }`}
                title="Toggle High Contrast Mode"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* User Account Initials Dropdown (NO profile picture) */}
            {user ? (
              <div className="relative">
                <button
                  id="btn-user-avatar-menu"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-800 hover:bg-teal-900 text-white font-black text-xs shadow-xs border-2 border-teal-600 transition-colors cursor-pointer"
                  title={`${user.name} (${user.profession?.replace('_', ' ') || 'Software Engineer'})`}
                >
                  <span>{getUserInitials(user.name)}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-teal-800 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          {getUserInitials(user.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-extrabold text-slate-900 truncate">{user.name}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email || 'Bengaluru, Karnataka'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-bold rounded-md capitalize">
                          {user.profession?.replace('_', ' ') || 'Software Engineer'}
                        </span>
                        <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded-md">
                          {user.bloodGroup || 'O+'}
                        </span>
                      </div>
                    </div>

                    {onOpenProfiles && (
                      <button
                        id="menu-item-switch-profile"
                        onClick={() => {
                          onOpenProfiles();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-teal-800 hover:bg-teal-50 transition-colors cursor-pointer"
                      >
                        <Users className="w-4 h-4 text-teal-600" />
                        <span>Switch Profile / Add Family (+ New)</span>
                      </button>
                    )}

                    <button
                      id="menu-item-dashboard"
                      onClick={() => {
                        onSelectTab('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{t.dashboard}</span>
                    </button>

                    <button
                      id="menu-item-emergency-card"
                      onClick={() => {
                        onSelectTab('emergencyCard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-slate-400" />
                      <span>Emergency Medical ID</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      id="btn-menu-logout"
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-bold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-nav-login"
                onClick={onOpenAuth}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                {t.login}
              </button>
            )}

            {/* 🚨 Emergency ID & SOS 112 Red Button at the VERY LAST RIGHT END */}
            <button
              id="nav-emergency-btn"
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-red-500/30 transition-all animate-pulse cursor-pointer ml-1 border border-red-400/40"
              title="Open Emergency ID, SOS 112, First Aid & Hospital Network"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS 112 & ID</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Desktop Navigation Row: 1st Profession Routine, 2nd Medicines, then all others */}
      <div className="hidden xl:block bg-slate-50/95 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between space-x-1 py-1.5 no-scrollbar overflow-x-auto">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isTabActive(item.id);
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => onSelectTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-teal-800 text-white shadow-xs'
                        : 'text-slate-700 hover:text-teal-900 hover:bg-slate-200/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-200' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* More Hubs dropdown */}
            <div className="relative group shrink-0">
              <button
                id="nav-more-menu-btn"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-teal-900 hover:bg-slate-200/70 cursor-pointer"
              >
                <span>More Hubs</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
              <div className="absolute right-0 mt-1 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 hidden group-hover:block transition-all z-50">
                <button
                  id="nav-submenu-student"
                  onClick={() => onSelectTab('studentEdu')}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-medium cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Student Health & Puberty</span>
                </button>
                <button
                  id="nav-submenu-period"
                  onClick={() => onSelectTab('periodcare')}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-medium cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-pink-600" />
                  <span>Period & Cycle Tracker</span>
                </button>
                <button
                  id="nav-submenu-preventive"
                  onClick={() => onSelectTab('preventive')}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-medium cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.preventive}</span>
                </button>
                <button
                  id="nav-submenu-doctorprep"
                  onClick={() => onSelectTab('doctorPrep')}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-medium cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-cyan-600" />
                  <span>Doctor Visit Prep</span>
                </button>
                <button
                  id="nav-submenu-family"
                  onClick={() => onSelectTab('family')}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-medium cursor-pointer"
                >
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>Family Multi-Profile</span>
                </button>
                <button
                  id="nav-submenu-quiz"
                  onClick={() => onSelectTab('quiz')}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-medium cursor-pointer"
                >
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span>Health Literacy Quiz</span>
                </button>
                <button
                  id="nav-submenu-myths"
                  onClick={() => onSelectTab('myths')}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-medium cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>{t.myths}</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-1.5 pb-3 mb-2 border-b border-slate-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isTabActive(item.id);
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${
                    isActive ? 'bg-teal-800 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              id="mobile-nav-preventive"
              onClick={() => {
                onSelectTab('preventive');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.preventive}</span>
            </button>
            <button
              id="mobile-nav-quiz"
              onClick={() => {
                onSelectTab('quiz');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-800 rounded-lg text-xs font-medium cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Quiz</span>
            </button>
            <button
              id="mobile-nav-myths"
              onClick={() => {
                onSelectTab('myths');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.myths}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
