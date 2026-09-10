export interface Property {
  id: string;
  title: string;
  subtitle?: string;
  type: 'Apartment' | 'Villa' | 'Plot' | 'Independent House' | 'Penthouse' | 'Commercial';
  price: number; // in INR rupees
  priceFormatted: string; // e.g., "₹ 85.0 Lakhs" or "₹ 1.85 Cr"
  pricePerSqft: number;
  city: string;
  locality: string;
  address: string;
  pincode: string;
  lat: number;
  lng: number;
  bhk: number;
  bathrooms: number;
  balconies: number;
  sqft: number;
  furnishing: 'Furnished' | 'Semi Furnished' | 'Unfurnished';
  status: 'Ready to Move' | 'Under Construction';
  possessionDate?: string;
  facing: 'East' | 'West' | 'North' | 'South' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  floorNumber: number;
  totalFloors: number;
  propertyAgeYears: number;
  verified: boolean;
  featured: boolean;
  trending: boolean;
  images: string[];
  videoUrl?: string;
  virtualTour360?: string;
  floorPlanUrl?: string;
  brochurePdfUrl?: string;
  description: string;
  amenities: string[];
  builder: {
    name: string;
    rating: number;
    experienceYears: number;
    completedProjects: number;
    phone: string;
    email: string;
  };
  owner: {
    name: string;
    type: 'Builder' | 'Individual Owner' | 'Agent';
    phone: string;
    whatsapp: string;
    verified: boolean;
  };
  aiInsight: {
    fairValue: number;
    investmentScore: number; // 0-100
    threeYearGrowthEstimatePercent: number;
    rentalYieldPercent: number;
    pros: string[];
    cons: string[];
  };
  nearby: {
    schools: string[];
    hospitals: string[];
    metro: string[];
    malls: string[];
  };
}

export interface SearchFilters {
  query: string;
  city: string;
  locality: string;
  minPrice: number;
  maxPrice: number;
  propertyTypes: string[];
  bhkList: number[];
  furnishingList: string[];
  statusList: string[];
  amenitiesList: string[];
  facingList: string[];
  verifiedOnly: boolean;
  featuredOnly: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'admin' | 'builder';
  savedPropertyIds: string[];
  recentSearches: string[];
}

export interface SiteVisitBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  date: string;
  timeSlot: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedProperties?: Property[];
  actionPrompt?: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  localityRating: {
    safety: number;
    connectivity: number;
    environment: number;
  };
}

export interface AdminStats {
  totalProperties: number;
  totalUsers: number;
  activeEnquiries: number;
  totalRevenueInr: number;
  topSearchedCities: { city: string; count: number }[];
  trendingLocalities: { name: string; growth: string; avgPriceSqft: number }[];
  monthlyEnquiries: { month: string; count: number }[];
}
