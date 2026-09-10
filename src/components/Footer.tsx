import React from 'react';
import { Building2, Phone, Mail, MapPin, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

interface FooterProps {
  setSelectedCity: (city: string) => void;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setSelectedCity, setActiveTab, onOpenChat }) => {
  return (
    <footer className="bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl text-slate-300 pt-12 pb-8 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                PropBot <span className="text-blue-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Smart Property Search Powered by Artificial Intelligence. Discover, compare, and book site visits across top Indian metropolitan cities with zero brokerage.
            </p>

            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span className="flex items-center"><ShieldCheck className="h-4 w-4 text-emerald-400 mr-1" /> 100% Verified</span>
              <span>•</span>
              <span>0% Brokerage</span>
            </div>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Popular Metros</h4>
            <ul className="space-y-2 text-slate-400">
              {['Mumbai', 'Chennai', 'Bangalore', 'Hyderabad', 'Delhi NCR', 'Pune', 'Kolkata'].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => {
                      setSelectedCity(city);
                      setActiveTab('search');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Properties in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-400">Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('search')} className="hover:text-blue-400">Property Search & Filters</button>
              </li>
              <li>
                <button onClick={onOpenChat} className="hover:text-blue-400">PropBot Conversational AI</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-blue-400">Side-By-Side Comparison</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('loan')} className="hover:text-blue-400">Home Loan & EMI Calculator</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-blue-400">Admin Panel</button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Get Price Drop Alerts</h4>
            <p className="text-slate-400">Subscribe for weekly AI property investment digests and price drop notifications.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed to price drop alerts!');
              }}
              className="flex space-x-1"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none flex-1"
              />
              <button type="submit" className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} PropBot AI Real Estate Platform. All rights reserved.</p>
          <p className="flex items-center">
            Built with <Heart className="h-3.5 w-3.5 text-rose-500 mx-1 fill-current" /> for AI Property Buyers in India
          </p>
        </div>
      </div>
    </footer>
  );
};
