import React, { useState } from 'react';
import { Property, SiteVisitBooking } from '../types';
import { PropertyCard } from './PropertyCard';
import {
  Home,
  Search,
  Heart,
  Bot,
  User,
  MapPin,
  Bell,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface MobileAppViewProps {
  properties: Property[];
  onSelectProperty: (p: Property) => void;
  savedIds: string[];
  onToggleSaved: (id: string) => void;
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onBookVisit: (p: Property) => void;
  onOpenChat: () => void;
  bookings: SiteVisitBooking[];
  user: any;
  onOpenAuth: () => void;
}

export const MobileAppView: React.FC<MobileAppViewProps> = ({
  properties,
  onSelectProperty,
  savedIds,
  onToggleSaved,
  comparedIds,
  onToggleCompare,
  onBookVisit,
  onOpenChat,
  bookings,
  user,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'saved' | 'chat' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredProperties = properties.filter((p) => {
    if (selectedCity !== 'All' && p.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  return (
    <div className="flex justify-center items-center my-6">
      {/* Mobile Device Viewport Mockup Container */}
      <div className="w-[380px] sm:w-[410px] h-[810px] frosted-glass rounded-[48px] p-3 shadow-2xl border-4 border-white/20 dark:border-white/10 relative flex flex-col overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="w-32 h-5 bg-black/80 backdrop-blur-md rounded-full mx-auto mb-2 flex items-center justify-center space-x-2 z-30 border border-white/10">
          <div className="h-2 w-2 rounded-full bg-slate-800" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>

        {/* Screen Content Wrapper */}
        <div className="bg-slate-100/90 dark:bg-slate-950/90 backdrop-blur-xl text-slate-900 dark:text-white flex-1 rounded-[36px] overflow-hidden flex flex-col justify-between relative">
          {/* Top Mobile App Header */}
          <div className="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-white/40 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                P
              </div>
              <div>
                <p className="font-extrabold text-xs">PropBot AI</p>
                <p className="text-[10px] text-slate-400">Mobile Edition</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenChat}
                className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300"
              >
                <Sparkles className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenAuth}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Tab Screen Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB 1: HOME */}
            {activeTab === 'home' && (
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city, locality, BHK..."
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 focus:outline-none"
                  />
                </div>

                {/* City Pills */}
                <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
                  {['All', 'Mumbai', 'Chennai', 'Bangalore', 'Hyderabad', 'Delhi NCR'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCity(c)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                        selectedCity === c
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* AI Banner Card */}
                <div
                  onClick={onOpenChat}
                  className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg cursor-pointer flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      AI Property Advisor
                    </span>
                    <p className="font-bold text-xs">Find Your Home in Seconds</p>
                    <p className="text-[10px] text-blue-100">Talk with PropBot AI</p>
                  </div>
                  <Bot className="h-8 w-8 text-amber-300 animate-bounce" />
                </div>

                {/* Featured Listings Stream */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-xs">Featured Properties</p>
                    <button onClick={() => setActiveTab('search')} className="text-[11px] text-blue-600 font-bold">
                      See All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {filteredProperties.slice(0, 4).map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        onSelect={onSelectProperty}
                        onToggleSaved={onToggleSaved}
                        isSaved={savedIds.includes(p.id)}
                        onToggleCompare={onToggleCompare}
                        isCompared={comparedIds.includes(p.id)}
                        onBookVisit={onBookVisit}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SEARCH */}
            {activeTab === 'search' && (
              <div className="space-y-3">
                <p className="font-bold text-xs text-slate-900 dark:text-white">All Properties ({filteredProperties.length})</p>
                <div className="space-y-3">
                  {filteredProperties.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      onSelect={onSelectProperty}
                      onToggleSaved={onToggleSaved}
                      isSaved={savedIds.includes(p.id)}
                      onToggleCompare={onToggleCompare}
                      isCompared={comparedIds.includes(p.id)}
                      onBookVisit={onBookVisit}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SAVED WISHLIST */}
            {activeTab === 'saved' && (
              <div className="space-y-3">
                <p className="font-bold text-xs">Saved Wishlist ({savedProperties.length})</p>
                {savedProperties.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-400">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p>No saved properties yet.</p>
                  </div>
                ) : (
                  savedProperties.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      onSelect={onSelectProperty}
                      onToggleSaved={onToggleSaved}
                      isSaved={true}
                      onToggleCompare={onToggleCompare}
                      isCompared={comparedIds.includes(p.id)}
                      onBookVisit={onBookVisit}
                    />
                  ))
                )}
              </div>
            )}

            {/* TAB 4: PROFILE & BOOKINGS */}
            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <div className="h-14 w-14 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto">
                    {user ? user.name.charAt(0) : 'U'}
                  </div>
                  <p className="font-bold text-sm">{user ? user.name : 'Guest Buyer'}</p>
                  <p className="text-slate-400 text-[11px]">{user ? user.email : 'guest@propbot.ai'}</p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="font-bold text-xs flex items-center text-blue-600">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>My Scheduled Visits ({bookings.length})</span>
                  </p>

                  <div className="space-y-2">
                    {bookings.map((b) => (
                      <div key={b.id} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="font-bold text-[11px] truncate">{b.propertyTitle}</p>
                        <p className="text-[10px] text-slate-400">{b.date} • {b.timeSlot}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Native Application Tab Navigation */}
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex justify-around items-center text-[10px] font-bold">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center space-y-0.5 ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center space-y-0.5 ${activeTab === 'search' ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>

            <button
              onClick={onOpenChat}
              className="flex flex-col items-center space-y-0.5 text-blue-600 p-1.5 bg-blue-50 dark:bg-blue-950 rounded-full"
            >
              <Bot className="h-5 w-5 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex flex-col items-center space-y-0.5 ${activeTab === 'saved' ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <Heart className="h-4 w-4" />
              <span>Saved</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center space-y-0.5 ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
