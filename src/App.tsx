import React, { useState, useEffect } from 'react';
import { Property, SiteVisitBooking } from './types';
import { fetchProperties, performNlpSearch, fetchBookings } from './services/api';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { CompareModal } from './components/CompareModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { LoanCalculator } from './components/LoanCalculator';
import { AdminPanel } from './components/AdminPanel';
import { MobileAppView } from './components/MobileAppView';
import { AuthModal } from './components/AuthModal';
import { DocumentationView } from './components/DocumentationView';
import { Footer } from './components/Footer';
import { INITIAL_PROPERTIES } from './data/mockProperties';
import {
  Search,
  Filter,
  Sparkles,
  Building2,
  MapPin,
  X,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  TrendingUp,
  Heart,
  Scale
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedBhk, setSelectedBhk] = useState<number>(0);
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(50000000); // 5 Crores
  const [searchQuery, setSearchQuery] = useState<string>('');

  // AI & Modal States
  const [nlpReasoning, setNlpReasoning] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(['prop-1', 'prop-2']);
  const [comparedIds, setComparedIds] = useState<string[]>(['prop-1', 'prop-3']);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<SiteVisitBooking[]>([]);

  // Load properties & bookings from backend API
  const loadData = async () => {
    const list = await fetchProperties();
    if (list && list.length > 0) {
      setProperties(list);
    }
    const visitList = await fetchBookings();
    setBookings(visitList);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Sync Dark Mode Class to Root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle NLP Search submission
  const handleNlpSearch = async (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
    const res = await performNlpSearch(query);
    if (res.success) {
      if (res.extractedParams) {
        if (res.extractedParams.city) setSelectedCity(res.extractedParams.city);
        if (res.extractedParams.locality) setSelectedLocality(res.extractedParams.locality);
        if (res.extractedParams.bhk) setSelectedBhk(res.extractedParams.bhk);
        if (res.extractedParams.maxPrice) setMaxPrice(res.extractedParams.maxPrice);
        if (res.extractedParams.type) setSelectedType(res.extractedParams.type);
      }
      if (res.results && res.results.length > 0) {
        setProperties(res.results);
      }
      setNlpReasoning(res.summaryReasoning || `Matched listings for "${query}"`);
    }
  };

  const handleToggleSaved = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 4) {
        alert('You can compare up to 4 properties simultaneously.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleResetFilters = () => {
    setSelectedCity('All');
    setSelectedLocality('');
    setSelectedType('All');
    setSelectedBhk(0);
    setSelectedFurnishing('All');
    setSelectedStatus('All');
    setMaxPrice(50000000);
    setSearchQuery('');
    setNlpReasoning(null);
    loadData();
  };

  // Filter properties client-side
  const filteredProperties = properties.filter((p) => {
    if (selectedCity !== 'All' && p.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (selectedLocality && !p.locality.toLowerCase().includes(selectedLocality.toLowerCase())) {
      return false;
    }
    if (selectedType !== 'All' && p.type.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }
    if (selectedBhk > 0 && p.bhk !== selectedBhk) {
      return false;
    }
    if (selectedFurnishing !== 'All' && p.furnishing.toLowerCase() !== selectedFurnishing.toLowerCase()) {
      return false;
    }
    if (selectedStatus !== 'All' && p.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    if (p.price > maxPrice) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const featuredProperties = properties.filter((p) => p.featured);
  const trendingProperties = properties.filter((p) => p.trending);
  const wishlistProperties = properties.filter((p) => savedIds.includes(p.id));
  const comparedPropertyList = properties.filter((p) => comparedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans relative overflow-x-hidden">
      {/* Ambient Background Glow Orbs for Frosted Glass Depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-sky-400/15 dark:bg-teal-600/20 rounded-full blur-3xl" />
      </div>

      {/* Platform Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        savedCount={savedIds.length}
        compareCount={comparedIds.length}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        user={user}
      />

      {/* Main Screen Router / Render Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Mobile Viewport Simulation Mode Toggle */}
        {isMobileFrame ? (
          <MobileAppView
            properties={properties}
            onSelectProperty={(p) => setSelectedProperty(p)}
            savedIds={savedIds}
            onToggleSaved={handleToggleSaved}
            comparedIds={comparedIds}
            onToggleCompare={handleToggleCompare}
            onBookVisit={(p) => setSelectedProperty(p)}
            onOpenChat={() => setIsChatOpen(true)}
            bookings={bookings}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        ) : (
          <>
            {/* VIEW 1: HOME PAGE */}
            {activeTab === 'home' && (
              <div className="space-y-12">
                {/* Hero Section */}
                <HeroBanner
                  onNlpSearch={handleNlpSearch}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  onSelectCategory={(type) => {
                    setSelectedType(type);
                    setActiveTab('search');
                  }}
                  onOpenChat={() => setIsChatOpen(true)}
                />

                {/* Featured Properties Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        <Sparkles className="h-4 w-4" />
                        <span>Handpicked Collection</span>
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                        Featured Properties
                      </h2>
                    </div>

                    <button
                      onClick={() => setActiveTab('search')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center"
                    >
                      <span>Explore All Listings</span>
                      <span className="ml-1">→</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProperties.slice(0, 6).map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        onSelect={(p) => setSelectedProperty(p)}
                        onToggleSaved={handleToggleSaved}
                        isSaved={savedIds.includes(p.id)}
                        onToggleCompare={handleToggleCompare}
                        isCompared={comparedIds.includes(p.id)}
                        onBookVisit={(p) => setSelectedProperty(p)}
                      />
                    ))}
                  </div>
                </div>

                {/* Trending Localities & Area Investment Ratings */}
                <div className="frosted-glass p-8 rounded-3xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Top High-Growth Localities & AI Investment Scores
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Analyzed based on infrastructure, metro connectivity, school quality, and 3-year resale trends.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { city: 'Chennai', locality: 'Velachery', price: '₹ 5,666 / sqft', score: 91, growth: '+15.2%' },
                      { city: 'Mumbai', locality: 'Bandra West', price: '₹ 10,277 / sqft', score: 94, growth: '+18.5%' },
                      { city: 'Bangalore', locality: 'Whitefield', price: '₹ 9,285 / sqft', score: 96, growth: '+21.0%' },
                      { city: 'Hyderabad', locality: 'Gachibowli', price: '₹ 6,604 / sqft', score: 93, growth: '+22.4%' },
                      { city: 'Pune', locality: 'Wakad', price: '₹ 5,760 / sqft', score: 89, growth: '+17.5%' },
                      { city: 'Delhi NCR', locality: 'DLF Phase 5', price: '₹ 15,000 / sqft', score: 92, growth: '+16.8%' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedCity(item.city);
                          setSelectedLocality(item.locality);
                          setActiveTab('search');
                        }}
                        className="p-4 frosted-card rounded-2xl hover:border-blue-500 transition-all cursor-pointer flex justify-between items-center"
                      >
                        <div>
                          <p className="font-extrabold text-sm text-slate-900 dark:text-white">{item.locality}</p>
                          <p className="text-xs text-slate-500">{item.city} • {item.price}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full border border-emerald-500/30">
                            {item.growth}
                          </span>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1">Score {item.score}/100</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Verified Listings */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    Latest Verified Properties
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.slice(0, 6).map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        onSelect={(p) => setSelectedProperty(p)}
                        onToggleSaved={handleToggleSaved}
                        isSaved={savedIds.includes(p.id)}
                        onToggleCompare={handleToggleCompare}
                        isCompared={comparedIds.includes(p.id)}
                        onBookVisit={(p) => setSelectedProperty(p)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: SEARCH & FILTER PAGE */}
            {activeTab === 'search' && (
              <div className="space-y-6">
                {/* Search Bar & Filter Controls Header */}
                <div className="frosted-glass p-6 rounded-3xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                        Property Search & Filters
                      </h1>
                      <p className="text-xs text-slate-500">
                        Showing {filteredProperties.length} matching listings in {selectedCity}
                      </p>
                    </div>

                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center space-x-1 w-fit"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  </div>

                  {/* AI Reasoning Pill if NLP query was submitted */}
                  {nlpReasoning && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs text-blue-900 dark:text-blue-200 flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold">{nlpReasoning}</span>
                    </div>
                  )}

                  {/* Filters Bar Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                    {/* City */}
                    <div>
                      <label className="font-bold text-slate-500 block mb-1">City</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-semibold"
                      >
                        {['All', 'Mumbai', 'Chennai', 'Bangalore', 'Hyderabad', 'Delhi NCR', 'Pune', 'Kolkata'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="font-bold text-slate-500 block mb-1">Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-semibold"
                      >
                        {['All', 'Apartment', 'Villa', 'Plot', 'Penthouse'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* BHK */}
                    <div>
                      <label className="font-bold text-slate-500 block mb-1">BHK</label>
                      <select
                        value={selectedBhk}
                        onChange={(e) => setSelectedBhk(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-semibold"
                      >
                        <option value={0}>Any BHK</option>
                        <option value={1}>1 BHK</option>
                        <option value={2}>2 BHK</option>
                        <option value={3}>3 BHK</option>
                        <option value={4}>4 BHK</option>
                      </select>
                    </div>

                    {/* Furnishing */}
                    <div>
                      <label className="font-bold text-slate-500 block mb-1">Furnishing</label>
                      <select
                        value={selectedFurnishing}
                        onChange={(e) => setSelectedFurnishing(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-semibold"
                      >
                        <option value="All">All</option>
                        <option value="Furnished">Furnished</option>
                        <option value="Semi Furnished">Semi Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="font-bold text-slate-500 block mb-1">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-semibold"
                      >
                        <option value="All">All</option>
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                      </select>
                    </div>

                    {/* Max Budget Slider */}
                    <div>
                      <label className="font-bold text-slate-500 block mb-1">Max Budget</label>
                      <div className="text-[11px] font-extrabold text-blue-600">
                        ₹ {(maxPrice / 100000).toFixed(0)} Lakhs
                      </div>
                      <input
                        type="range"
                        min={3000000}
                        max={50000000}
                        step={1000000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-blue-600 mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Filtered Grid Output */}
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <Building2 className="h-12 w-12 text-slate-300 mx-auto" />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      No properties found matching your criteria.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        onSelect={(p) => setSelectedProperty(p)}
                        onToggleSaved={handleToggleSaved}
                        isSaved={savedIds.includes(p.id)}
                        onToggleCompare={handleToggleCompare}
                        isCompared={comparedIds.includes(p.id)}
                        onBookVisit={(p) => setSelectedProperty(p)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 3: COMPARE VIEW */}
            {activeTab === 'compare' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-black">Property Side-By-Side Comparison</h1>
                  <p className="text-xs text-slate-500">{comparedPropertyList.length} properties selected</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparedPropertyList.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      onSelect={(p) => setSelectedProperty(p)}
                      onToggleSaved={handleToggleSaved}
                      isSaved={savedIds.includes(p.id)}
                      onToggleCompare={handleToggleCompare}
                      isCompared={true}
                      onBookVisit={(p) => setSelectedProperty(p)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 4: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h1 className="text-2xl font-black">My Saved Properties ({wishlistProperties.length})</h1>
                {wishlistProperties.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <Heart className="h-12 w-12 text-slate-300 mx-auto" />
                    <p className="text-sm font-bold">Your wishlist is empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProperties.map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        onSelect={(p) => setSelectedProperty(p)}
                        onToggleSaved={handleToggleSaved}
                        isSaved={true}
                        onToggleCompare={handleToggleCompare}
                        isCompared={comparedIds.includes(p.id)}
                        onBookVisit={(p) => setSelectedProperty(p)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 5: LOAN & EMI CALCULATOR */}
            {activeTab === 'loan' && <LoanCalculator />}

            {/* VIEW 6: ADMIN PANEL */}
            {activeTab === 'admin' && (
              <AdminPanel
                properties={properties}
                onRefreshProperties={loadData}
                bookings={bookings}
              />
            )}
          </>
        )}
      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onToggleSaved={handleToggleSaved}
          isSaved={savedIds.includes(selectedProperty.id)}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedIds.includes(selectedProperty.id)}
          onBookVisit={(p) => {
            loadData();
          }}
          similarProperties={properties.filter(
            (p) => p.city === selectedProperty.city && p.id !== selectedProperty.id
          )}
          onSelectProperty={(p) => setSelectedProperty(p)}
        />
      )}

      {/* Side-by-side Compare Matrix Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProperties={comparedPropertyList}
        onRemoveFromCompare={handleToggleCompare}
        onBookVisit={(p) => setSelectedProperty(p)}
      />

      {/* AI Conversational Chatbot Drawer */}
      <AIChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSelectProperty={(p) => setSelectedProperty(p)}
        onBookVisit={(p) => setSelectedProperty(p)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* Documentation Drawer */}
      <DocumentationView
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Footer */}
      <Footer
        setSelectedCity={setSelectedCity}
        setActiveTab={setActiveTab}
        onOpenChat={() => setIsChatOpen(true)}
      />
    </div>
  );
}
