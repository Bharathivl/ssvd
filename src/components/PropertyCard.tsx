import React from 'react';
import { Property } from '../types';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Heart,
  Scale,
  Sparkles,
  Phone,
  Calendar,
  Share2,
  Building,
  ArrowRight
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (p: Property) => void;
  onToggleSaved: (id: string) => void;
  isSaved: boolean;
  onToggleCompare: (id: string) => void;
  isCompared: boolean;
  onBookVisit: (p: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onToggleSaved,
  isSaved,
  onToggleCompare,
  isCompared,
  onBookVisit,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(property)}
      className="group frosted-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/15 hover:border-white/80 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      <div>
        {/* Top Image & Badge Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img
            src={property.images[0]}
            alt={property.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.verified && (
              <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center shadow-sm">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </span>
            )}
            {property.featured && (
              <span className="bg-amber-500/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                Featured
              </span>
            )}
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
              {property.type}
            </span>
          </div>

          {/* Action Icons Right Overlay */}
          <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property.id);
              }}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSaved(property.id);
              }}
              title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              title="Share property"
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white backdrop-blur-md transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bottom Overlay Price & AI Rating */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 text-white">
            <div>
              <p className="text-xl font-extrabold tracking-tight drop-shadow-md">
                {property.priceFormatted}
              </p>
              <p className="text-[11px] text-slate-200 font-medium drop-shadow-sm">
                ₹ {property.pricePerSqft.toLocaleString('en-IN')} / sq.ft
              </p>
            </div>

            <div className="bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-400/30 flex items-center shadow-lg">
              <Sparkles className="h-3 w-3 text-amber-300 mr-1" />
              <div className="text-right">
                <p className="text-[9px] uppercase font-bold text-blue-100">AI Score</p>
                <p className="text-xs font-black text-white">{property.aiInsight.investmentScore}/100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {property.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400 flex-shrink-0" />
              <span className="truncate">{property.locality}, {property.city}</span>
            </p>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl text-slate-700 dark:text-slate-300 text-xs font-medium border border-white/50 dark:border-white/10">
            <div className="flex items-center space-x-1.5">
              <Bed className="h-4 w-4 text-blue-500" />
              <span>{property.bhk === 0 ? 'Plot' : `${property.bhk} BHK`}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bath className="h-4 w-4 text-indigo-500" />
              <span>{property.bathrooms > 0 ? `${property.bathrooms} Bath` : 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Maximize2 className="h-4 w-4 text-teal-500" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>

          {/* Builder & Furnishing Tag */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1 truncate">
              <Building className="h-3.5 w-3.5 text-slate-400" />
              <span className="truncate">{property.builder.name}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-white/50 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold">
              {property.status}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Action Bar */}
      <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-700/50 mt-3 flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookVisit(property);
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-400 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Book Visit</span>
        </button>

        <button
          onClick={() => onSelect(property)}
          className="py-2 px-3 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1"
        >
          <span>Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {copied && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-full shadow-lg z-20">
          Link Copied!
        </div>
      )}
    </div>
  );
};
