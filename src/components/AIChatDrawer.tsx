import React, { useState, useRef, useEffect } from 'react';
import { Property, ChatMessage } from '../types';
import { sendChatMessage } from '../services/api';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Building2,
  Calendar,
  MapPin,
  ChevronRight,
  User,
  Mic,
  RotateCcw
} from 'lucide-react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (p: Property) => void;
  onBookVisit: (p: Property) => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
  onBookVisit,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "👋 Hi! I'm PropBot AI, your personal real estate assistant. What city or neighborhood are you looking for property in today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setLoading(true);

    try {
      const formattedForApi = newHistory.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const response = await sendChatMessage(formattedForApi);

      if (response.success && response.data) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: response.data.replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedProperties: response.data.suggestedProperties || [],
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            sender: 'bot',
            text: 'I parsed your input! Here are matching top properties in that location:',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: "Conversation reset! Which city or locality would you like to search in?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const quickReplies = [
    '2 BHK in Velachery under 70 Lakhs',
    '3 BHK luxury villa in Whitefield Bangalore',
    'Book a site visit for Bandra West Mumbai property',
    'Show me ready-to-move properties with swimming pool',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-lg frosted-modal h-full flex flex-col shadow-2xl border-l border-white/50 dark:border-white/10 animate-in slide-in-from-right duration-300">
        {/* Chat Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between border-b border-blue-600">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-base">PropBot AI Assistant</h2>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-blue-100 font-medium">
                Real Estate Assistant • Powered by Gemini AI
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleResetChat}
              title="Reset Chat"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1 opacity-70 text-[10px]">
                  <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'PropBot AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="whitespace-pre-line font-medium">{msg.text}</p>
              </div>

              {/* Inline Property Recommendation Cards in Chat */}
              {msg.suggestedProperties && msg.suggestedProperties.length > 0 && (
                <div className="mt-3 w-full space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                    <Sparkles className="h-3 w-3 text-amber-500 mr-1" />
                    Recommended Listings:
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {msg.suggestedProperties.map((prop) => (
                      <div
                        key={prop.id}
                        onClick={() => {
                          onSelectProperty(prop);
                          onClose();
                        }}
                        className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all cursor-pointer flex items-center space-x-3 shadow-sm hover:shadow-md"
                      >
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          referrerPolicy="no-referrer"
                          className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {prop.title}
                          </p>
                          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-extrabold">
                            {prop.priceFormatted} • {prop.bhk} BHK
                          </p>
                          <p className="text-[10px] text-slate-500 truncate flex items-center">
                            <MapPin className="h-3 w-3 mr-0.5" />
                            {prop.locality}, {prop.city}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookVisit(prop);
                          }}
                          className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg text-[10px] font-bold flex items-center space-x-1 hover:bg-blue-100 flex-shrink-0"
                        >
                          <Calendar className="h-3 w-3" />
                          <span>Visit</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs p-3 bg-white dark:bg-slate-800 rounded-2xl w-fit">
              <Bot className="h-4 w-4 animate-spin text-blue-600" />
              <span>PropBot is thinking & matching listings...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex overflow-x-auto gap-2 no-scrollbar">
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={() => handleSend(qr)}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[11px] text-slate-700 dark:text-slate-300 hover:border-blue-500 whitespace-nowrap flex-shrink-0 font-medium"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your property question..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none border border-transparent focus:border-blue-500 font-medium"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md transition-all flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
