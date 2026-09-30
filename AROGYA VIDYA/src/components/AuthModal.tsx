import React, { useState } from 'react';
import { X, HeartPulse, Sparkles, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { DEMO_USER } from '../data/demoData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  language: LanguageCode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setForgotSubmitted(true);
      return;
    }

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || (mode === 'register' ? 'New User' : email.split('@')[0] || 'User'),
      email: email || 'user@healthbridge.care',
      preferredLanguage: language,
      selectedTopics: ['hygiene_center', 'nutrition', 'mental_wellbeing'],
      isAdmin: false,
      isGuest: false,
      createdAt: new Date().toISOString()
    };
    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickDemo = () => {
    onLoginSuccess(DEMO_USER);
    onClose();
  };

  const handleGuestMode = () => {
    const guestUser: UserProfile = {
      id: 'usr-guest-' + Date.now(),
      name: 'Guest Explorer',
      email: 'guest@healthbridge.care',
      preferredLanguage: language,
      selectedTopics: ['hygiene_center', 'nutrition', 'mental_wellbeing', 'puberty_academy'],
      isGuest: true,
      createdAt: new Date().toISOString()
    };
    onLoginSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-800 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-display">HealthBridge Account</h3>
              <p className="text-xs text-teal-100">Private, secure health navigation</p>
            </div>
          </div>
          <button
            id="btn-close-auth-modal"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Mode Switcher */}
          {mode !== 'forgot' && (
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
              <button
                id="tab-auth-login"
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-white text-teal-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Log In
              </button>
              <button
                id="tab-auth-register"
                type="button"
                onClick={() => setMode('register')}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'register' ? 'bg-white text-teal-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {forgotSubmitted ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-900 text-sm">Password Reset Instructions Sent</h4>
              <p className="text-xs text-emerald-700">
                If an account exists for {email}, a secure reset link has been dispatched.
              </p>
              <button
                onClick={() => {
                  setForgotSubmitted(false);
                  setMode('login');
                }}
                className="mt-2 text-xs font-semibold text-teal-800 underline"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name or Preferred Nickname
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="input-auth-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="input-auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-teal-700 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="input-auth-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              )}

              <button
                id="btn-submit-auth"
                type="submit"
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Register & Continue' : 'Send Reset Link'}
              </button>

              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full py-1.5 text-xs text-slate-600 hover:underline text-center block"
                >
                  Back to Log In
                </button>
              )}
            </form>
          )}

          {/* Quick Demo Option & Guest Mode */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <button
              id="btn-quick-demo-login"
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Explore Demo Profile (Alex Morgan, 29)</span>
            </button>

            <button
              id="btn-guest-mode"
              type="button"
              onClick={handleGuestMode}
              className="w-full py-1.5 text-xs text-slate-500 hover:text-slate-800 text-center font-medium"
            >
              Continue as Guest (Temporary Session)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
