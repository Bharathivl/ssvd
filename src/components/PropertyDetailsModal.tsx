import React, { useState } from 'react';
import { Property, Review } from '../types';
import { InteractiveMapPlaceholder } from './InteractiveMapPlaceholder';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Heart,
  Scale,
  Sparkles,
  Phone,
  MessageSquare,
  Calendar,
  Share2,
  Building,
  ShieldCheck,
  Download,
  Eye,
  Video,
  Layers,
  Calculator,
  Compass,
  Clock,
  User,
  Star,
  Check,
  Map
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onToggleSaved: (id: string) => void;
  isSaved: boolean;
  onToggleCompare: (id: string) => void;
  isCompared: boolean;
  onBookVisit: (p: Property) => void;
  similarProperties: Property[];
  onSelectProperty: (p: Property) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onToggleSaved,
  isSaved,
  onToggleCompare,
  isCompared,
  onBookVisit,
  similarProperties,
  onSelectProperty,
}) => {
  if (!property) return null;

  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'virtual360' | 'video' | 'floorplan' | 'map'>('photos');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM - 12:00 PM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // EMI Calculator Local State for Property
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const interestRate = 8.5; // % per annum

  const principal = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;
  const emi = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookVisit(property);
    setBookingSubmitted(true);
    setTimeout(() => setBookingSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md p-2 sm:p-4 md:p-6 flex justify-center items-start">
      <div className="frosted-modal rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl my-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-4 border-b border-white/50 dark:border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{property.title}</h2>
              {property.verified && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-0.5" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-0.5">
              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
              {property.address}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleCompare(property.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            <button
              onClick={() => onToggleSaved(property.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 ${
                isSaved
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-8">
          {/* Media Viewer & Gallery Tabs */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveMediaTab('photos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                  activeMediaTab === 'photos'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Photos ({property.images.length})</span>
              </button>

              <button
                onClick={() => setActiveMediaTab('virtual360')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                  activeMediaTab === 'virtual360'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>360° Virtual Tour</span>
              </button>

              <button
                onClick={() => setActiveMediaTab('video')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                  activeMediaTab === 'video'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Video className="h-3.5 w-3.5" />
                <span>Video Walkthrough</span>
              </button>

              <button
                onClick={() => setActiveMediaTab('floorplan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                  activeMediaTab === 'floorplan'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Floor Plan</span>
              </button>

              <button
                onClick={() => setActiveMediaTab('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                  activeMediaTab === 'map'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Map className="h-3.5 w-3.5" />
                <span>Locality Map & Radar</span>
              </button>
            </div>

            {/* Main Media View Window */}
            <div className={`relative ${activeMediaTab === 'map' ? 'min-h-[420px]' : 'aspect-[16/9] sm:aspect-[21/9]'} rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800`}>
              {activeMediaTab === 'photos' && (
                <img
                  src={property.images[selectedImageIndex]}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
              )}

              {activeMediaTab === 'virtual360' && (
                <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                  <img
                    src={property.virtualTour360 || property.images[0]}
                    alt="360 view"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 text-center">
                    <Sparkles className="h-10 w-10 text-amber-300 animate-spin mb-2" />
                    <p className="font-bold text-lg">Interactive 360° Panorama Active</p>
                    <p className="text-xs text-slate-300">Drag cursor to rotate 360 degrees around living room</p>
                  </div>
                </div>
              )}

              {activeMediaTab === 'video' && (
                <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                  <video controls className="w-full h-full max-h-full object-contain" poster={property.images[0]}>
                    <source src={property.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {activeMediaTab === 'floorplan' && (
                <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4">
                  <img
                    src={property.floorPlanUrl}
                    alt="Floor Plan"
                    referrerPolicy="no-referrer"
                    className="max-h-full object-contain rounded-lg"
                  />
                </div>
              )}

              {activeMediaTab === 'map' && (
                <div className="w-full h-full p-3 bg-slate-950 overflow-y-auto">
                  <InteractiveMapPlaceholder property={property} />
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {activeMediaTab === 'photos' && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative h-16 w-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === i ? 'border-blue-600 scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Key Metrics Overview Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-lg">
            <div>
              <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider">Total Asking Price</p>
              <p className="text-3xl font-black text-white mt-1">{property.priceFormatted}</p>
              <p className="text-xs text-blue-200 font-medium">₹ {property.pricePerSqft.toLocaleString('en-IN')} / sq.ft</p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-6">
              <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider">Estimated Monthly EMI</p>
              <p className="text-2xl font-bold text-amber-300 mt-1">₹ {emi.toLocaleString('en-IN')} <span className="text-xs text-white">/mo</span></p>
              <p className="text-xs text-blue-200">Based on 20% down payment @ 8.5% interest</p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider">AI Investment Score</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-2xl font-extrabold text-emerald-300">{property.aiInsight.investmentScore}/100</span>
                  <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-200 text-[10px] font-bold rounded-full">
                    +{property.aiInsight.threeYearGrowthEstimatePercent}% 3-Yr ROI
                  </span>
                </div>
              </div>

              <a
                href="#download-brochure"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Brochure PDF for "${property.title}" downloaded successfully!`);
                }}
                className="inline-flex items-center space-x-1.5 text-xs text-blue-200 hover:text-white font-bold underline mt-2"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Brochure PDF</span>
              </a>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">BHK & Type</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{property.bhk} BHK {property.type}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Carpet Area</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{property.sqft} sq.ft</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Furnishing</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{property.furnishing}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Facing & Floor</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{property.facing} • Floor {property.floorNumber}/{property.totalFloors}</p>
            </div>
          </div>

          {/* Description & Amenities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Property Description</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Amenities & Facilities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center space-x-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location & Interactive Map Component */}
              <div className="space-y-4">
                <InteractiveMapPlaceholder property={property} />

                {/* Detailed Directory Breakdown */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Neighborhood Landmarks Directory
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-bold text-blue-600 dark:text-blue-400 mb-1">🏫 Nearby Schools & Colleges</p>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {property.nearby.schools.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-rose-600 dark:text-rose-400 mb-1">🏥 Hospitals & Healthcare</p>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {property.nearby.hospitals.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">🚇 Metro Stations & Transit</p>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {property.nearby.metro.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-amber-600 dark:text-amber-400 mb-1">🛍️ Shopping Malls & Hubs</p>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {property.nearby.malls.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Contact & Book Visit Card */}
            <div className="space-y-6">
              {/* Site Visit Booking Box */}
              <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Schedule VIP Site Visit</h4>
                </div>

                {bookingSubmitted ? (
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold text-center flex items-center justify-center space-x-1.5">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Visit confirmed! Builder advisor will call you.</span>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Select Date</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Time Slot</label>
                      <select
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                      >
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                        <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                        <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bharath Kumar"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      Confirm Free Site Visit
                    </button>
                  </form>
                )}
              </div>

              {/* Owner & Builder Contact Card */}
              <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Listing Managed By</p>
                    <p className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{property.owner.name}</p>
                    <p className="text-xs text-slate-500">{property.owner.type}</p>
                  </div>
                  {property.owner.verified && (
                    <span className="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={`tel:${property.owner.phone}`}
                    className="py-2 px-3 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${property.owner.whatsapp}?text=Hi, I am interested in ${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties Section */}
          {similarProperties.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Similar Properties in {property.city}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {similarProperties.slice(0, 3).map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectProperty(sim)}
                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all cursor-pointer flex space-x-3 items-center"
                  >
                    <img src={sim.images[0]} alt={sim.title} referrerPolicy="no-referrer" className="h-16 w-20 rounded-xl object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{sim.title}</p>
                      <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{sim.priceFormatted}</p>
                      <p className="text-[10px] text-slate-500 truncate">{sim.locality}, {sim.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
