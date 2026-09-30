import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  ShieldAlert,
  Volume2,
  VolumeX,
  RotateCcw,
  User,
  Bot,
  AlertTriangle,
  HeartPulse,
  PhoneCall,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AIMessage, LanguageCode, UserProfile } from '../types';
import { AIService } from '../services/api';
import { TRANSLATIONS } from '../data/translations';

interface BridgeBuddyAIProps {
  user: UserProfile;
  language: LanguageCode;
  onOpenEmergency: () => void;
  onNavigate?: (tab: string) => void;
}

export const BridgeBuddyAI: React.FC<BridgeBuddyAIProps> = ({
  user,
  language,
  onOpenEmergency,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Hello ${user.name}! I'm **BridgeBuddy**, your evidence-based health education companion.\n\nYou can ask me about:\n- 🧼 **Hygiene routines** (hand, skin, dental, and personal care)\n- 🌱 **Puberty & body development** questions without embarrassment\n- 📄 **Understanding medical terminology** and routine lab test concepts\n- 🥗 **Nutrition & daily wellness habits**\n- 👨‍⚕️ **How to formulate questions for your next doctor's visit**\n\n*Reminder: I provide educational information only and cannot diagnose diseases or prescribe treatments. In an emergency, please call 112 immediately.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const promptSuggestions = [
    'What happens to the body during puberty?',
    'What is the difference between HDL and LDL cholesterol?',
    'How often should I brush and floss my teeth?',
    'What questions should I ask my doctor about fatigue?',
    'Is it safe to wash intimate areas with soap?',
    'How do I maintain good sleep hygiene?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputPrompt).trim();
    if (!textToSend || loading) return;

    const userMessage: AIMessage = {
      id: 'msg-usr-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await AIService.askBridgeBuddy(
        newHistory.map((m) => ({ role: m.role, content: m.content })),
        { name: user.name, topics: user.selectedTopics },
        language
      );

      const assistantMessage: AIMessage = {
        id: 'msg-ast-' + Date.now(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: response.isEmergency,
        disclaimer: response.disclaimer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-err-' + Date.now(),
          role: 'assistant',
          content: 'I apologize, but I am having trouble connecting right now. Please try again or consult your doctor.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    } else {
      window.speechSynthesis.cancel();
      // Strip basic markdown
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingMsgId(msgId);
    }
  };

  const clearChat = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeakingMsgId(null);
    setMessages([
      {
        id: 'msg-welcome-new',
        role: 'assistant',
        content: `Chat cleared. How can I help you learn about your health today, ${user.name}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-700 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-teal-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display">
              BridgeBuddy AI Health Companion
            </h1>
          </div>
          <p className="text-xs text-teal-100 max-w-xl">
            Ask questions about hygiene, bodily changes, medical lab concepts, or prepare for clinician appointments.
          </p>
        </div>

        <button
          id="btn-clear-buddy-chat"
          onClick={clearChat}
          className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Safety Notice Card */}
      <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Educational Boundary Notice:</strong> BridgeBuddy is an educational AI. It never provides medical diagnoses, prescribes medicines, or interprets emergency symptoms.
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[600px]">
        {/* Messages Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isSpeaking = speakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-teal-700 text-white rounded-tr-none'
                      : msg.isEmergency
                      ? 'bg-red-50 text-red-950 border border-red-300 rounded-tl-none'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center justify-between text-[10px] opacity-80 pb-1 border-b border-black/5">
                    <span className="font-semibold">
                      {isUser ? user.name : 'BridgeBuddy'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Content */}
                  <div className="markdown-body prose-sm max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {/* Emergency Callout if triggered */}
                  {msg.isEmergency && (
                    <div className="pt-2">
                      <button
                        onClick={onOpenEmergency}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                        <span>Dial 112 Emergency Hub</span>
                      </button>
                    </div>
                  )}

                  {/* TTS & Action Bar on Assistant */}
                  {!isUser && !msg.isEmergency && (
                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-[11px] text-slate-500">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.content)}
                        className={`flex items-center gap-1 hover:text-teal-700 transition-colors cursor-pointer ${
                          isSpeaking ? 'text-teal-700 font-bold' : ''
                        }`}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
                      </button>
                      <span className="text-[10px] italic">Educational Information Only</span>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
                <span>BridgeBuddy is formulating evidence-based guidance...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 overflow-x-auto flex items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">Try asking:</span>
          {promptSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sug)}
              className="px-3 py-1 bg-white hover:bg-teal-50 hover:text-teal-800 text-slate-700 border border-slate-200 rounded-full whitespace-nowrap text-[11px] transition-colors cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="input-buddy-prompt"
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask a health, hygiene, or biological question in plain language..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <button
              id="btn-send-buddy-message"
              type="submit"
              disabled={!inputPrompt.trim() || loading}
              className="p-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
