import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import {
  MapPin,
  Navigation,
  Layers,
  GraduationCap,
  HeartPulse,
  Train,
  ShoppingBag,
  Trees,
  Coffee,
  Compass,
  ZoomIn,
  ZoomOut,
  Footprints,
  Car,
  Clock,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

interface InteractiveMapPlaceholderProps {
  property: Property;
}

type AmenityCategory = 'all' | 'schools' | 'hospitals' | 'metro' | 'malls' | 'cafes' | 'parks';
type MapViewStyle = 'vector' | 'satellite' | 'transit';

interface MockPin {
  id: string;
  name: string;
  category: 'schools' | 'hospitals' | 'metro' | 'malls' | 'cafes' | 'parks';
  x: number; // percentage on map (0 - 100)
  y: number; // percentage on map (0 - 100)
  distance: string;
  walkTime: string;
  driveTime: string;
  rating?: number;
}

export const InteractiveMapPlaceholder: React.FC<InteractiveMapPlaceholderProps> = ({ property }) => {
  const [selectedCategory, setSelectedCategory] = useState<AmenityCategory>('all');
  const [activeViewStyle, setActiveViewStyle] = useState<MapViewStyle>('vector');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPin, setSelectedPin] = useState<MockPin | null>(null);
  const [showRadius, setShowRadius] = useState<boolean>(true);
  const [activeCommuteMode, setActiveCommuteMode] = useState<'walk' | 'drive'>('walk');

  // Deterministically generate nearby points around the central property (50, 50)
  const nearbyPins = useMemo<MockPin[]>(() => {
    const pins: MockPin[] = [];

    // Schools
    property.nearby.schools.forEach((name, index) => {
      const angles = [35, 140, 220, 310];
      const angle = (angles[index % angles.length] * Math.PI) / 180;
      const distPercent = 22 + (index * 7);
      pins.push({
        id: `school-${index}`,
        name,
        category: 'schools',
        x: Math.min(88, Math.max(12, 50 + Math.cos(angle) * distPercent)),
        y: Math.min(85, Math.max(15, 50 + Math.sin(angle) * distPercent)),
        distance: `${(0.4 + index * 0.5).toFixed(1)} km`,
        walkTime: `${Math.round(5 + index * 5)} mins`,
        driveTime: `${Math.round(2 + index * 2)} mins`,
        rating: 4.6 + (index * 0.1) % 0.4,
      });
    });

    // Hospitals
    property.nearby.hospitals.forEach((name, index) => {
      const angles = [75, 195, 290];
      const angle = (angles[index % angles.length] * Math.PI) / 180;
      const distPercent = 26 + (index * 8);
      pins.push({
        id: `hospital-${index}`,
        name,
        category: 'hospitals',
        x: Math.min(88, Math.max(12, 50 + Math.cos(angle) * distPercent)),
        y: Math.min(85, Math.max(15, 50 + Math.sin(angle) * distPercent)),
        distance: `${(0.8 + index * 0.6).toFixed(1)} km`,
        walkTime: `${Math.round(10 + index * 6)} mins`,
        driveTime: `${Math.round(4 + index * 2)} mins`,
        rating: 4.8,
      });
    });

    // Metro & Transit
    property.nearby.metro.forEach((name, index) => {
      const angles = [110, 260, 340];
      const angle = (angles[index % angles.length] * Math.PI) / 180;
      const distPercent = 18 + (index * 10);
      pins.push({
        id: `metro-${index}`,
        name,
        category: 'metro',
        x: Math.min(88, Math.max(12, 50 + Math.cos(angle) * distPercent)),
        y: Math.min(85, Math.max(15, 50 + Math.sin(angle) * distPercent)),
        distance: `${(0.3 + index * 0.4).toFixed(1)} km`,
        walkTime: `${Math.round(4 + index * 4)} mins`,
        driveTime: `${Math.round(2 + index * 1)} mins`,
        rating: 4.9,
      });
    });

    // Malls & Shopping
    property.nearby.malls.forEach((name, index) => {
      const angles = [15, 160, 245];
      const angle = (angles[index % angles.length] * Math.PI) / 180;
      const distPercent = 32 + (index * 6);
      pins.push({
        id: `mall-${index}`,
        name,
        category: 'malls',
        x: Math.min(88, Math.max(12, 50 + Math.cos(angle) * distPercent)),
        y: Math.min(85, Math.max(15, 50 + Math.sin(angle) * distPercent)),
        distance: `${(1.1 + index * 0.7).toFixed(1)} km`,
        walkTime: `${Math.round(14 + index * 6)} mins`,
        driveTime: `${Math.round(5 + index * 2)} mins`,
        rating: 4.7,
      });
    });

    // Add extra cafes and community parks
    pins.push({
      id: 'cafe-1',
      name: 'Third Wave Coffee Roasters',
      category: 'cafes',
      x: 38,
      y: 42,
      distance: '250 m',
      walkTime: '3 mins',
      driveTime: '1 min',
      rating: 4.8,
    });
    pins.push({
      id: 'cafe-2',
      name: 'Starbucks & Artisanal Bakery',
      category: 'cafes',
      x: 62,
      y: 58,
      distance: '450 m',
      walkTime: '5 mins',
      driveTime: '2 mins',
      rating: 4.7,
    });
    pins.push({
      id: 'park-1',
      name: 'Central Eco Green Park & Jogging Track',
      category: 'parks',
      x: 32,
      y: 65,
      distance: '500 m',
      walkTime: '6 mins',
      driveTime: '2 mins',
      rating: 4.9,
    });

    return pins;
  }, [property]);

  const filteredPins = useMemo(() => {
    if (selectedCategory === 'all') return nearbyPins;
    return nearbyPins.filter((p) => p.category === selectedCategory);
  }, [nearbyPins, selectedCategory]);

  const getCategoryIcon = (category: MockPin['category'], className = 'h-3.5 w-3.5') => {
    switch (category) {
      case 'schools':
        return <GraduationCap className={className} />;
      case 'hospitals':
        return <HeartPulse className={className} />;
      case 'metro':
        return <Train className={className} />;
      case 'malls':
        return <ShoppingBag className={className} />;
      case 'cafes':
        return <Coffee className={className} />;
      case 'parks':
        return <Trees className={className} />;
      default:
        return <MapPin className={className} />;
    }
  };

  const getCategoryColor = (category: MockPin['category']) => {
    switch (category) {
      case 'schools':
        return 'bg-blue-600 text-white border-blue-400 shadow-blue-500/40';
      case 'hospitals':
        return 'bg-rose-600 text-white border-rose-400 shadow-rose-500/40';
      case 'metro':
        return 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/40';
      case 'malls':
        return 'bg-amber-600 text-white border-amber-400 shadow-amber-500/40';
      case 'cafes':
        return 'bg-orange-500 text-white border-orange-300 shadow-orange-500/40';
      case 'parks':
        return 'bg-teal-600 text-white border-teal-400 shadow-teal-500/40';
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.6, Math.max(0.8, +(prev + delta).toFixed(1))));
  };

  const resetView = () => {
    setZoomLevel(1);
    setSelectedPin(null);
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-4">
      {/* Top Map Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Compass className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Interactive Locality Map & Neighborhood Radar
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                GPS Verified
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {property.locality}, {property.city} • Coordinates: {property.lat.toFixed(4)}° N, {property.lng.toFixed(4)}° E
            </p>
          </div>
        </div>

        {/* Style View Toggle & Radius */}
        <div className="flex items-center space-x-2">
          {/* Map Style Pills */}
          <div className="flex bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold backdrop-blur-md border border-white/30 dark:border-white/10">
            <button
              onClick={() => setActiveViewStyle('vector')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                activeViewStyle === 'vector'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Navigation className="h-3 w-3" />
              <span>Vector</span>
            </button>
            <button
              onClick={() => setActiveViewStyle('transit')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                activeViewStyle === 'transit'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Train className="h-3 w-3" />
              <span>Transit</span>
            </button>
            <button
              onClick={() => setActiveViewStyle('satellite')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                activeViewStyle === 'satellite'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>Satellite</span>
            </button>
          </div>

          {/* Toggle Radius */}
          <button
            onClick={() => setShowRadius(!showRadius)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              showRadius
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-500/20'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-white/50 dark:border-white/10'
            }`}
            title="Toggle Walk & Drive Isochrone Radii"
          >
            Isochrone Radius
          </button>
        </div>
      </div>

      {/* Amenity Category Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-semibold">
        <span className="text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">Filter Pins:</span>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
            selectedCategory === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-white/80 border border-white/40 dark:border-white/10'
          }`}
        >
          <span>All Landmarks ({nearbyPins.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('metro')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
            selectedCategory === 'metro'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20'
          }`}
        >
          <Train className="h-3.5 w-3.5" />
          <span>Metro ({property.nearby.metro.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('schools')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
            selectedCategory === 'schools'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 hover:bg-blue-500/20'
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Schools ({property.nearby.schools.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('hospitals')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
            selectedCategory === 'hospitals'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 hover:bg-rose-500/20'
          }`}
        >
          <HeartPulse className="h-3.5 w-3.5" />
          <span>Hospitals ({property.nearby.hospitals.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('malls')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
            selectedCategory === 'malls'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 hover:bg-amber-500/20'
          }`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Shopping ({property.nearby.malls.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('cafes')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
            selectedCategory === 'cafes'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20 hover:bg-orange-500/20'
          }`}
        >
          <Coffee className="h-3.5 w-3.5" />
          <span>Cafes & Dining (2)</span>
        </button>

        <button
          onClick={() => setSelectedCategory('parks')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
            selectedCategory === 'parks'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 hover:bg-teal-500/20'
          }`}
        >
          <Trees className="h-3.5 w-3.5" />
          <span>Parks & Greenery (1)</span>
        </button>
      </div>

      {/* Main Interactive Map Viewport */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-inner bg-slate-900 select-none">
        {/* Visual Map Stage with Scalable Viewport */}
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* 1. Vector Map Background Theme */}
          {activeViewStyle === 'vector' && (
            <div className="absolute inset-0 bg-[#e8ecef] dark:bg-[#111927]">
              {/* Street Vector Grid */}
              <svg className="w-full h-full opacity-60 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="road-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />
                    <rect x="2" y="2" width="76" height="76" fill="currentColor" className="text-slate-200/40 dark:text-slate-800/40" rx="4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#road-grid)" />

                {/* Major Arterial Roads & Highways */}
                <path d="M -50 160 Q 200 130, 450 170 T 900 150" fill="none" stroke="#fcd34d" strokeWidth="8" />
                <path d="M 220 -20 Q 240 200, 210 420" fill="none" stroke="#fb923c" strokeWidth="7" />
                <path d="M 520 -20 Q 490 180, 540 420" fill="none" stroke="#60a5fa" strokeWidth="6" />
                <path d="M -20 310 Q 300 290, 850 330" fill="none" stroke="#cbd5e1" strokeWidth="10" />

                {/* River / Lake Waterbody polygon */}
                <path
                  d="M 680 -10 Q 720 120, 690 220 T 750 420 L 850 420 L 850 -10 Z"
                  fill="#38bdf8"
                  className="opacity-30 dark:opacity-20"
                />

                {/* Park polygon */}
                <rect x="180" y="230" width="130" height="90" rx="16" fill="#4ade80" className="opacity-25 dark:opacity-20" />
              </svg>
            </div>
          )}

          {/* 2. Transit Map Theme */}
          {activeViewStyle === 'transit' && (
            <div className="absolute inset-0 bg-slate-900">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Dark Metro Radar Grid */}
                <defs>
                  <pattern id="transit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#transit-grid)" />

                {/* Metro Line 1 - Blue Line */}
                <path d="M -20 180 L 260 180 L 450 90 L 850 90" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
                {/* Metro Line 2 - Green Line */}
                <path d="M 380 -20 L 380 220 L 520 340 L 520 450" fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
                {/* Metro Line 3 - Yellow Line */}
                <path d="M -20 320 L 240 320 L 480 180 L 850 180" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="6,4" />

                {/* Interchange Stations */}
                <circle cx="480" cy="180" r="7" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
                <circle cx="380" cy="180" r="6" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
              </svg>
            </div>
          )}

          {/* 3. Satellite Theme */}
          {activeViewStyle === 'satellite' && (
            <div className="absolute inset-0 bg-[#1e2a38] overflow-hidden">
              <div className="w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                {/* Satellite Building Blocks & Green Patches */}
                <rect x="60" y="40" width="80" height="70" fill="#475569" rx="4" />
                <rect x="160" y="50" width="100" height="60" fill="#334155" rx="4" />
                <rect x="80" y="160" width="110" height="90" fill="#334155" rx="6" />
                <rect x="520" y="60" width="140" height="110" fill="#1e293b" rx="8" />
                <rect x="560" y="220" width="100" height="80" fill="#475569" rx="6" />
                <path d="M 320 220 Q 360 280, 420 260 T 490 320 L 320 340 Z" fill="#15803d" className="opacity-40" />
              </svg>
            </div>
          )}

          {/* Walkability & Commute Distance Isochrone Radii (Centered at 50%, 50%) */}
          {showRadius && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* 5-min walk radius (500m) */}
              <div className="absolute w-44 h-44 rounded-full border-2 border-dashed border-emerald-500/50 bg-emerald-500/10 flex items-start justify-center pt-1 animate-pulse">
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-emerald-700/80 text-white backdrop-blur-sm">
                  5 Min Walk (500m)
                </span>
              </div>

              {/* 10-min drive radius (1.5km) */}
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-blue-500/40 bg-blue-500/5 flex items-end justify-center pb-2">
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-blue-800/80 text-white backdrop-blur-sm">
                  10 Min Drive (1.5km)
                </span>
              </div>
            </div>
          )}

          {/* Nearby Amenity Pins */}
          {filteredPins.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <div
                key={pin.id}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => setSelectedPin(pin)}
              >
                {/* Pin Button */}
                <div
                  className={`p-2 rounded-2xl border-2 transition-all transform duration-200 flex items-center justify-center shadow-lg ${getCategoryColor(
                    pin.category
                  )} ${isSelected ? 'scale-125 ring-4 ring-white ring-offset-2 ring-offset-slate-900 z-30' : 'hover:scale-115'}`}
                >
                  {getCategoryIcon(pin.category, 'h-4 w-4')}
                </div>

                {/* Mini Pin Label on Hover */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:flex flex-col items-center pointer-events-none z-30 whitespace-nowrap">
                  <div className="px-2 py-0.5 bg-slate-900/90 text-white text-[10px] font-bold rounded-md shadow-md border border-white/20 backdrop-blur-sm">
                    {pin.name}
                  </div>
                  <span className="text-[9px] text-emerald-300 font-semibold bg-slate-900/90 px-1 rounded mt-0.5">
                    {pin.distance}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Property Main Location Pin (Center Point 50%, 50%) */}
          <div
            style={{ left: '50%', top: '50%' }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedPin(null)}
          >
            {/* Pulsing Ripple */}
            <div className="absolute -inset-4 rounded-full bg-blue-500/30 animate-ping" />
            <div className="absolute -inset-2 rounded-full bg-blue-600/40 animate-pulse" />

            {/* Main Pin Icon & Floating Price Badge */}
            <div className="relative px-3 py-1.5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-2xl shadow-2xl border-2 border-white flex items-center space-x-1.5 transform hover:scale-105 transition-transform">
              <MapPin className="h-4 w-4 text-amber-300 fill-amber-300 animate-bounce" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-wider leading-none text-blue-200">Property Location</p>
                <p className="text-xs font-black text-white leading-tight">{property.priceFormatted}</p>
              </div>
            </div>

            {/* Pointer Stem */}
            <div className="w-2 h-2 bg-indigo-600 transform rotate-45 -mt-1 border-r border-b border-white" />
          </div>
        </div>

        {/* Floating Zoom & Reset Map Controls */}
        <div className="absolute right-4 top-4 z-40 flex flex-col space-y-1.5">
          <button
            onClick={() => handleZoom(0.2)}
            className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl text-slate-800 dark:text-white hover:bg-white shadow-md border border-white/40 dark:border-white/10 transition-transform active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleZoom(-0.2)}
            className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl text-slate-800 dark:text-white hover:bg-white shadow-md border border-white/40 dark:border-white/10 transition-transform active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl text-slate-800 dark:text-white hover:bg-white shadow-md border border-white/40 dark:border-white/10 transition-transform active:scale-95"
            title="Reset Map Center"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Selected Amenity Info Modal / Floating Overlay */}
        {selectedPin && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl border border-white/60 dark:border-white/15 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-xl border ${getCategoryColor(selectedPin.category)}`}>
                  {getCategoryIcon(selectedPin.category, 'h-4 w-4')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedPin.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 capitalize">
                    {selectedPin.category} Landmark • ⭐ {selectedPin.rating || 4.8}/5.0
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Commute Time Badges */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="p-2 bg-slate-100/70 dark:bg-slate-800/70 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-semibold">Distance</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{selectedPin.distance}</span>
              </div>
              <div className="p-2 bg-emerald-500/10 rounded-xl text-center border border-emerald-500/20">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold flex items-center justify-center gap-1">
                  <Footprints className="h-3 w-3" /> Walk
                </span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300">{selectedPin.walkTime}</span>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-xl text-center border border-blue-500/20">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 block font-semibold flex items-center justify-center gap-1">
                  <Car className="h-3 w-3" /> Drive
                </span>
                <span className="font-extrabold text-blue-700 dark:text-blue-300">{selectedPin.driveTime}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Neighborhood Score & Commute Intelligence Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Walk Score */}
        <div className="p-3.5 frosted-card rounded-2xl flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/30">
            92
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Walk Score®: Walker's Paradise</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Daily errands do not require a car</p>
          </div>
        </div>

        {/* Transit Score */}
        <div className="p-3.5 frosted-card rounded-2xl flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm border border-blue-500/30">
            88
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Transit Score: Excellent Transit</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Rapid metro & express buses nearby</p>
          </div>
        </div>

        {/* Safety & Livability */}
        <div className="p-3.5 frosted-card rounded-2xl flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-500/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Livability & Safety: 4.9 / 5</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">24/7 CCTV surveillance & gated area</p>
          </div>
        </div>
      </div>
    </div>
  );
};
