import React, { useState } from 'react';
import { Search, Mic, Sparkles, Building2, MapPin, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

interface HeroBannerProps {
  onNlpSearch: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onSelectCategory: (type: string) => void;
  onOpenChat: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onNlpSearch,
  selectedCity,
  setSelectedCity,
  onSelectCategory,
  onOpenChat,
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      onNlpSearch(queryInput.trim());
    }
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition simulation active. Speak your property requirement!');
      setQueryInput('2 BHK apartment under 70 lakhs in Velachery with parking');
      return;
    }

    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setQueryInput('3 BHK luxury villa in Whitefield Bangalore under 3 crores');
    }, 2500);
  };

  const quickPrompts = [
    '2 BHK apartment under ₹60 lakhs in Velachery with parking',
    '3 BHK luxury villa in Whitefield Bangalore',
    'Ready to move 3 BHK in Bandra West Mumbai',
    'Plot in Nallagandla Hyderabad under 50 lakhs',
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-900/90 via-indigo-900/90 to-slate-900/90 backdrop-blur-2xl text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 rounded-3xl mb-8 shadow-2xl border border-white/10">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Badge Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
          <span>Next-Gen Real Estate AI Engine</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
          Smart Property Search Powered by{' '}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Ask in plain English or voice. Our AI analyzes 10,000+ verified listings across top Indian metros, predicts fair valuations, and schedules instant site visits.
        </p>

        {/* NLP Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-2 border border-slate-200 dark:border-slate-700">
            <div className="pl-3 pr-2 text-slate-400 flex items-center">
              <Search className="h-5 w-5 text-blue-600" />
            </div>

            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder='Try: "2 BHK apartment under 60 lakhs in Velachery with parking"'
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none px-2 py-2"
            />

            {/* Voice Search Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              title="Voice Search"
              className={`p-2.5 rounded-xl transition-all mr-1.5 ${
                isListening
                  ? 'bg-rose-500 text-white animate-bounce'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Mic className="h-4 w-4" />
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5 flex-shrink-0"
            >
              <span>AI Search</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Quick Sample NLP Prompts */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Try asking:</span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQueryInput(p);
                onNlpSearch(p);
              }}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 text-[11px] font-medium transition-colors"
            >
              "{p}"
            </button>
          ))}
        </div>

        {/* Property Category Pills */}
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          {['All', 'Apartment', 'Villa', 'Plot', 'Independent House', 'Penthouse'].map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all flex items-center space-x-1.5"
            >
              <Building2 className="h-3.5 w-3.5 text-blue-400" />
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Live Key Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto border-t border-white/10 text-center">
          <div>
            <p className="text-xl sm:text-2xl font-black text-white">10,000+</p>
            <p className="text-[11px] text-slate-400 font-medium">Verified Listings</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-blue-400">98.4%</p>
            <p className="text-[11px] text-slate-400 font-medium">AI Price Accuracy</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-amber-300">0%</p>
            <p className="text-[11px] text-slate-400 font-medium">Brokerage Fee</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-emerald-400">24/7</p>
            <p className="text-[11px] text-slate-400 font-medium">Conversational AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};
