import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RotateCcw,
  Bot,
  User,
  AlertTriangle,
  PhoneCall,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AIMessage, LanguageCode, UserProfile } from '../types';
import { AIService } from '../services/api';

interface FloatingBridgeBuddyProps {
  user: UserProfile;
  language: LanguageCode;
  onOpenEmergency: () => void;
  onOpenFullPage?: () => void;
}

export const FloatingBridgeBuddy: React.FC<FloatingBridgeBuddyProps> = ({
  user,
  language,
  onOpenEmergency,
  onOpenFullPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'floating-msg-welcome',
      role: 'assistant',
      content: `Hello **${user.name}**! 👋 I'm **BridgeBuddy AI**, your 24/7 personal health assistant.\n\nAsk me anything about daily routines, hygiene, symptoms, medications, or lab test terms in simple words!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Quick advice for morning routine',
    'Explain HDL vs LDL simply',
    'How much water should I drink today?',
    'What should I ask my doctor about fatigue?'
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

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
          content: 'I encountered an issue connecting to the AI health engine. Please try asking again in a moment.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setMessages([
      {
        id: 'msg-reset-' + Date.now(),
        role: 'assistant',
        content: `Chat cleared. How can I help you right now, ${user.name}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Button (Always Visible across the site) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xl border border-teal-500/30 backdrop-blur-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Ask BridgeBuddy AI</span>
          </div>

          <button
            id="btn-floating-bridgebuddy"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-teal-300/40 cursor-pointer"
            aria-label="Open BridgeBuddy AI Companion"
            title="Open BridgeBuddy AI Floating Chat"
          >
            <span className="absolute -inset-1 rounded-full bg-teal-400 opacity-30 group-hover:opacity-75 blur-sm transition duration-300 animate-pulse"></span>
            <Bot className="w-7 h-7 relative z-10 text-white group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-black text-slate-900">
              AI
            </span>
          </button>
        </div>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white border border-slate-200 shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10 rounded-3xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[420px] h-[580px] max-h-[88vh] rounded-3xl'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/30 flex items-center justify-center border border-teal-400/30">
                <Bot className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">BridgeBuddy AI</h3>
                  <span className="px-1.5 py-0.2 bg-teal-400/30 text-teal-200 text-[10px] font-black rounded uppercase">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-teal-200/90 font-medium">
                  Evidence-based simple medical guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/10 text-teal-200 hover:text-white transition-colors cursor-pointer"
                title="Restart Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {onOpenFullPage && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullPage();
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-teal-200 hover:text-white transition-colors cursor-pointer text-xs font-bold hidden sm:inline-flex"
                  title="Open Full Page View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-teal-200 hover:text-white transition-colors cursor-pointer hidden sm:inline-flex"
                title={isExpanded ? 'Minimize Window' : 'Expand Window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-teal-200 hover:text-white transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="bg-teal-50/70 border-b border-teal-100/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-teal-100 text-teal-900 border border-teal-200/80 rounded-full text-[11px] font-semibold transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-teal-800 text-white'
                        : 'bg-gradient-to-tr from-teal-700 to-emerald-600 text-white'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[82%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-teal-800 text-white rounded-tr-xs'
                          : msg.isEmergency
                          ? 'bg-red-50 text-red-950 border border-red-200 rounded-tl-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-tl-xs'
                      }`}
                    >
                      {msg.isEmergency && (
                        <div className="flex items-center gap-1.5 text-red-700 font-extrabold mb-1.5 pb-1 border-b border-red-200">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span>Potential Medical Emergency</span>
                        </div>
                      )}

                      <div className="prose prose-xs max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>

                      {msg.isEmergency && (
                        <div className="mt-2.5 pt-2 border-t border-red-200">
                          <button
                            onClick={onOpenEmergency}
                            className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 text-xs shadow-xs"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Call 112 SOS Immediately</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleSpeak(msg.content, msg.id)}
                          className={`hover:text-teal-700 flex items-center gap-1 transition-colors cursor-pointer ${
                            speakingMsgId === msg.id ? 'text-teal-700 font-bold' : ''
                          }`}
                          title="Listen with voice reader"
                        >
                          {speakingMsgId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-red-500" />
                              <span className="text-red-500">Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 p-3 rounded-2xl w-fit shadow-2xs">
                <Bot className="w-4 h-4 text-teal-600 animate-spin" />
                <span>BridgeBuddy is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="input-floating-ai-prompt"
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask BridgeBuddy AI in simple words..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || loading}
                className="p-2 bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-1.5">
              Educational guide only • Call 112 in medical emergencies
            </p>
          </div>
        </div>
      )}
    </>
  );
};
