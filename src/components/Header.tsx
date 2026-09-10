import React from 'react';
import {
  Building2,
  Bot,
  Search,
  Heart,
  Scale,
  Calculator,
  ShieldCheck,
  User,
  Smartphone,
  Moon,
  Sun,
  MapPin,
  Menu,
  X,
  FileText
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  savedCount: number;
  compareCount: number;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenAuth: () => void;
  onOpenChat: () => void;
  onOpenDocs: () => void;
  user: any;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  savedCount,
  compareCount,
  isDarkMode,
  setIsDarkMode,
  isMobileFrame,
  setIsMobileFrame,
  onOpenAuth,
  onOpenChat,
  onOpenDocs,
  user,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cities = ['All', 'Mumbai', 'Chennai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Pune', 'Kolkata'];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-white/50 dark:border-white/10 shadow-lg shadow-black/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border border-white/20">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                  PropBot <span className="text-blue-600 dark:text-blue-400">AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-md border border-blue-400/30 backdrop-blur-sm">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Smart Property Search
              </p>
            </div>
          </div>

          {/* City Selector (Desktop) */}
          <div className="hidden lg:flex items-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-xl px-2.5 py-1.5 border border-white/50 dark:border-white/10 shadow-sm">
            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1.5" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 ${
                activeTab === 'search'
                  ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <Search className="h-3.5 w-3.5 mr-1" />
              <span>Search & Filter</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all relative flex items-center ${
                activeTab === 'compare'
                  ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <Scale className="h-3.5 w-3.5 mr-1" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all relative flex items-center ${
                activeTab === 'wishlist'
                  ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <Heart className="h-3.5 w-3.5 mr-1" />
              <span>Wishlist</span>
              {savedCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('loan')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center ${
                activeTab === 'loan'
                  ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <Calculator className="h-3.5 w-3.5 mr-1" />
              <span>Loans & EMI</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center ${
                activeTab === 'admin'
                  ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              <span>Admin Panel</span>
            </button>
          </nav>

          {/* Action Buttons Right */}
          <div className="flex items-center space-x-2">
            {/* AI Assistant Chat Launcher Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Bot className="h-4 w-4 animate-pulse" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Mobile View Toggle */}
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              title="Toggle Mobile App View Mode"
              className={`p-2 rounded-lg border text-xs transition-colors hidden sm:flex items-center ${
                isMobileFrame
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Smartphone className="h-4 w-4" />
            </button>

            {/* Docs Drawer Toggle */}
            <button
              onClick={onOpenDocs}
              title="View Documentation & Architecture"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs hidden sm:flex items-center"
            >
              <FileText className="h-4 w-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* User Account Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
            </button>

            {/* Mobile Hamburger Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="px-2 pb-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold p-2 rounded-lg text-slate-800 dark:text-slate-200"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 px-2">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === 'home' ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab('search');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === 'search' ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Search & Filter
              </button>
              <button
                onClick={() => {
                  setActiveTab('compare');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === 'compare' ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Compare ({compareCount})
              </button>
              <button
                onClick={() => {
                  setActiveTab('wishlist');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === 'wishlist' ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Wishlist ({savedCount})
              </button>
              <button
                onClick={() => {
                  setActiveTab('loan');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === 'loan' ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Loans & EMI
              </button>
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === 'admin' ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Admin Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
