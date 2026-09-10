import { Property } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Skyline Azure 3BHK Luxury Residences',
    subtitle: 'Ultra-modern high-rise apartment with panoramic ocean & city views',
    type: 'Apartment',
    price: 18500000, // 1.85 Cr
    priceFormatted: '₹ 1.85 Cr',
    pricePerSqft: 10277,
    city: 'Mumbai',
    locality: 'Bandra West',
    address: 'Carter Road, Bandra West, Mumbai, Maharashtra 400050',
    pincode: '400050',
    lat: 19.0596,
    lng: 72.8295,
    bhk: 3,
    bathrooms: 3,
    balconies: 2,
    sqft: 1800,
    furnishing: 'Furnished',
    status: 'Ready to Move',
    facing: 'East',
    floorNumber: 18,
    totalFloors: 32,
    propertyAgeYears: 2,
    verified: true,
    featured: true,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTour360: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    brochurePdfUrl: '#',
    description: 'Skyline Azure offers high-end luxury living in the heart of Bandra West. Features Italian marble flooring, VRV central air conditioning, designer modular kitchen with built-in appliances, and smart home automation. Complete with infinity pool, automated valet parking, and 24/7 concierge services.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security', 'Club House', 'EV Charging', 'Power Backup'],
    builder: {
      name: 'Skyline Urban Developers',
      rating: 4.8,
      experienceYears: 22,
      completedProjects: 45,
      phone: '+91 98200 11223',
      email: 'sales@skylinedevelopers.com'
    },
    owner: {
      name: 'Skyline Direct Sales',
      type: 'Builder',
      phone: '+91 98200 11223',
      whatsapp: '919820011223',
      verified: true
    },
    aiInsight: {
      fairValue: 18200000,
      investmentScore: 94,
      threeYearGrowthEstimatePercent: 18.5,
      rentalYieldPercent: 4.2,
      pros: ['Prime Bandra sea-front location', 'Exceptional resale liquidity', 'Top-tier amenities and zero noise pollution'],
      cons: ['Maintenance cost is premium (₹14/sqft)']
    },
    nearby: {
      schools: ['St. Andrew High School (0.6 km)', 'Arya Vidya Mandir (1.2 km)'],
      hospitals: ['Lilavati Hospital (1.5 km)', 'Holy Family Hospital (0.8 km)'],
      metro: ['Bandra Metro Station (1.8 km)'],
      malls: ['Linking Road Shopping Hub (0.5 km)', 'Jio World Drive (3.2 km)']
    }
  },
  {
    id: 'prop-2',
    title: 'Prestige Willow Greens 2BHK Smart Home',
    subtitle: 'Eco-friendly apartment inside IT Corridor with lush landscaping',
    type: 'Apartment',
    price: 6800000, // 68 Lakhs
    priceFormatted: '₹ 68.0 Lakhs',
    pricePerSqft: 5666,
    city: 'Chennai',
    locality: 'Velachery',
    address: '100 Feet Bypass Road, Velachery, Chennai, Tamil Nadu 600042',
    pincode: '600042',
    lat: 12.9815,
    lng: 80.218,
    bhk: 2,
    bathrooms: 2,
    balconies: 1,
    sqft: 1200,
    furnishing: 'Semi Furnished',
    status: 'Ready to Move',
    facing: 'North',
    floorNumber: 5,
    totalFloors: 14,
    propertyAgeYears: 1,
    verified: true,
    featured: true,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTour360: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    brochurePdfUrl: '#',
    description: 'Ideally situated near Velachery MRTS and OMR IT Corridor. Features voice-controlled smart switches, power backup, covered car parking, swimming pool, and solar-powered common lighting. Highly sought after by tech professionals.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'Prestige Estate Infra',
      rating: 4.7,
      experienceYears: 28,
      completedProjects: 82,
      phone: '+91 94440 98765',
      email: 'chennai@prestigegroup.in'
    },
    owner: {
      name: 'Ramesh Kumar',
      type: 'Individual Owner',
      phone: '+91 98401 22334',
      whatsapp: '919840122334',
      verified: true
    },
    aiInsight: {
      fairValue: 6750000,
      investmentScore: 91,
      threeYearGrowthEstimatePercent: 15.2,
      rentalYieldPercent: 4.8,
      pros: ['High rental demand from OMR tech parks', 'Next to Phoenix Marketcity mall', 'Covered reserved basement parking'],
      cons: ['Slight waterlogging during extreme monsoon']
    },
    nearby: {
      schools: ['DAV Public School (1.1 km)', 'Sunshine Academy (0.9 km)'],
      hospitals: ['Prashanth Super Speciality (0.8 km)', 'Apollo Clinic (1.4 km)'],
      metro: ['Velachery MRTS Station (0.5 km)'],
      malls: ['Phoenix Marketcity (0.7 km)', 'Grand Square (1.2 km)']
    }
  },
  {
    id: 'prop-3',
    title: 'Sobha Royal Pavilion 4BHK Premium Villa',
    subtitle: 'Spanish architectural villa with private lawn & personal plunge pool',
    type: 'Villa',
    price: 32500000, // 3.25 Cr
    priceFormatted: '₹ 3.25 Cr',
    pricePerSqft: 9285,
    city: 'Bangalore',
    locality: 'Whitefield',
    address: 'Sarjapur - Whitefield Main Road, Bangalore, Karnataka 560066',
    pincode: '560066',
    lat: 12.9698,
    lng: 77.7499,
    bhk: 4,
    bathrooms: 5,
    balconies: 3,
    sqft: 3500,
    furnishing: 'Furnished',
    status: 'Ready to Move',
    facing: 'East',
    floorNumber: 0,
    totalFloors: 2,
    propertyAgeYears: 1,
    verified: true,
    featured: true,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTour360: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    brochurePdfUrl: '#',
    description: 'An enclave of ultra-luxury villas built with classic royal Spanish themes. Double-height ceilings, imported teak wood doors, private garden, dual parking garage, rooftop gazebo, and access to a 50,000 sqft clubhouse.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security', 'Club House'],
    builder: {
      name: 'Sobha Developers',
      rating: 4.9,
      experienceYears: 30,
      completedProjects: 110,
      phone: '+91 80 4186 0000',
      email: 'sales@sobha.com'
    },
    owner: {
      name: 'Sobha Luxury Direct',
      type: 'Builder',
      phone: '+91 80 4186 0000',
      whatsapp: '918041860000',
      verified: true
    },
    aiInsight: {
      fairValue: 32000000,
      investmentScore: 96,
      threeYearGrowthEstimatePercent: 21.0,
      rentalYieldPercent: 3.9,
      pros: ['High capital appreciation corridor near Purple Metro line', 'Gated villa community with 80% open green space'],
      cons: ['High ticket price strictly for HNI buyers']
    },
    nearby: {
      schools: ['The International School Bangalore (2.5 km)', 'Inventure Academy (3.1 km)'],
      hospitals: ['Manipal Hospital Whitefield (1.8 km)', 'Columbia Asia (2.2 km)'],
      metro: ['Whitefield Metro Station (1.2 km)'],
      malls: ['Forum Neighborhood Mall (1.5 km)', 'Nexus Shantiniketan (2.8 km)']
    }
  },
  {
    id: 'prop-4',
    title: 'DLF Crest 3BHK Penthouse Estate',
    subtitle: 'Signature golf-course view residence with ultra-premium specifications',
    type: 'Penthouse',
    price: 45000000, // 4.5 Cr
    priceFormatted: '₹ 4.50 Cr',
    pricePerSqft: 15000,
    city: 'Delhi NCR',
    locality: 'DLF Phase 5, Gurgaon',
    address: 'Golf Course Road, DLF Phase 5, Gurgaon, Haryana 122002',
    pincode: '122002',
    lat: 28.4595,
    lng: 77.0266,
    bhk: 3,
    bathrooms: 4,
    balconies: 3,
    sqft: 3000,
    furnishing: 'Furnished',
    status: 'Ready to Move',
    facing: 'North-East',
    floorNumber: 26,
    totalFloors: 28,
    propertyAgeYears: 3,
    verified: true,
    featured: false,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'DLF Crest represents the pinnacle of cosmopolitan living in Gurgaon. Floor-to-ceiling double glazed glass windows, automated climate control, dedicated servant quarters, 3 car parking slots, and direct view of DLF Golf Course.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'DLF Limited',
      rating: 4.8,
      experienceYears: 75,
      completedProjects: 150,
      phone: '+91 124 433 2000',
      email: 'customercare@dlf.in'
    },
    owner: {
      name: 'Anil Singhania',
      type: 'Individual Owner',
      phone: '+91 98110 54321',
      whatsapp: '919811054321',
      verified: true
    },
    aiInsight: {
      fairValue: 44500000,
      investmentScore: 92,
      threeYearGrowthEstimatePercent: 16.8,
      rentalYieldPercent: 3.8,
      pros: ['Gurgaon most prestigious Golf Course Road pincode', 'Rapid Metro line within 400m'],
      cons: ['High monthly society maintenance charges']
    },
    nearby: {
      schools: ['Lancer International School (0.8 km)', 'Suncity School (1.5 km)'],
      hospitals: ['Fortis Memorial Research Institute (2.0 km)', 'Max Hospital (2.5 km)'],
      metro: ['Sector 53-54 Rapid Metro (0.4 km)'],
      malls: ['Central Plaza (0.6 km)', 'Galleria Market (1.8 km)']
    }
  },
  {
    id: 'prop-5',
    title: 'My Home Bhooja 3BHK IT-Hub Residence',
    subtitle: 'Vastu-compliant luxury tower opposite Bio-Diversity Park',
    type: 'Apartment',
    price: 14200000, // 1.42 Cr
    priceFormatted: '₹ 1.42 Cr',
    pricePerSqft: 6604,
    city: 'Hyderabad',
    locality: 'Gachibowli',
    address: 'Near Bio-Diversity Park, Gachibowli, Hyderabad, Telangana 500032',
    pincode: '500032',
    lat: 17.4401,
    lng: 78.3489,
    bhk: 3,
    bathrooms: 3,
    balconies: 2,
    sqft: 2150,
    furnishing: 'Semi Furnished',
    status: 'Ready to Move',
    facing: 'East',
    floorNumber: 12,
    totalFloors: 35,
    propertyAgeYears: 2,
    verified: true,
    featured: false,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Located in Hyderabad Financial District & Gachibowli hub. Ultra-spacious floor plan with 100% Vastu alignment, high speed elevators, indoor badminton courts, temperature controlled pool, and supermarket within complex.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'My Home Group',
      rating: 4.8,
      experienceYears: 35,
      completedProjects: 30,
      phone: '+91 40 6688 8888',
      email: 'sales@myhomegroup.in'
    },
    owner: {
      name: 'My Home Sales Office',
      type: 'Builder',
      phone: '+91 40 6688 8888',
      whatsapp: '914066888888',
      verified: true
    },
    aiInsight: {
      fairValue: 14000000,
      investmentScore: 93,
      threeYearGrowthEstimatePercent: 22.4,
      rentalYieldPercent: 5.1,
      pros: ['Highest rental demand in Cyberabad area', 'Direct access to ORR express highway'],
      cons: ['Traffic during peak evening office hours']
    },
    nearby: {
      schools: ['Oakridge International School (2.0 km)', 'Chirec International (1.8 km)'],
      hospitals: ['AIG Hospitals (1.1 km)', 'Care Hospital (1.5 km)'],
      metro: ['Raidurg Metro Station (1.0 km)'],
      malls: ['IKEA Hyderabad (1.2 km)', 'Inorbit Mall Cyberabad (2.4 km)']
    }
  },
  {
    id: 'prop-6',
    title: 'Godrej Elements 2BHK Urban Smart Home',
    subtitle: 'Modern high-tech community with IoT automation & rooftop skywalk',
    type: 'Apartment',
    price: 7200000, // 72 Lakhs
    priceFormatted: '₹ 72.0 Lakhs',
    pricePerSqft: 5760,
    city: 'Pune',
    locality: 'Wakad',
    address: 'Hinjewadi-Wakad Link Road, Wakad, Pune, Maharashtra 411057',
    pincode: '411057',
    lat: 18.5987,
    lng: 73.7688,
    bhk: 2,
    bathrooms: 2,
    balconies: 2,
    sqft: 1250,
    furnishing: 'Semi Furnished',
    status: 'Under Construction',
    possessionDate: 'Dec 2026',
    facing: 'West',
    floorNumber: 8,
    totalFloors: 22,
    propertyAgeYears: 0,
    verified: true,
    featured: true,
    trending: false,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Godrej Elements offers futuristic living next to Hinjewadi IT Park Phase 1. Features keyless entry, smart air purifiers, acoustic sound-proof windows, amphitheatre, organic terrace gardens, and creche for kids.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'Godrej Properties',
      rating: 4.8,
      experienceYears: 32,
      completedProjects: 95,
      phone: '+91 20 6711 0000',
      email: 'pune.sales@godrejproperties.com'
    },
    owner: {
      name: 'Godrej Sales Partner',
      type: 'Agent',
      phone: '+91 98230 99887',
      whatsapp: '919823099887',
      verified: true
    },
    aiInsight: {
      fairValue: 7100000,
      investmentScore: 89,
      threeYearGrowthEstimatePercent: 17.5,
      rentalYieldPercent: 4.6,
      pros: ['Hinjewadi IT park proximity ensures 100% occupancy', 'Upcoming Pune Metro Line 3 station nearby'],
      cons: ['Under construction with possession in 8 months']
    },
    nearby: {
      schools: ['EuroSchool Wakad (0.8 km)', 'Wisdom World School (1.4 km)'],
      hospitals: ['Ruby Hall Clinic Hinjawadi (1.5 km)', 'Lifepoint Multispeciality (1.0 km)'],
      metro: ['Wakad Chowk Metro (0.6 km)'],
      malls: ['Phoenix Marketcity Wakad (1.1 km)', 'Xion Mall Hinjewadi (1.3 km)']
    }
  },
  {
    id: 'prop-7',
    title: 'Adani Oyster Grande 4BHK Grand Villa',
    subtitle: 'Lavish independent gated villa with private lawn & private elevator',
    type: 'Villa',
    price: 28000000, // 2.8 Cr
    priceFormatted: '₹ 2.80 Cr',
    pricePerSqft: 8750,
    city: 'Delhi NCR',
    locality: 'Dwarka Expressway, Gurgaon',
    address: 'Sector 102, Dwarka Expressway, Gurgaon, Haryana 122006',
    pincode: '122006',
    lat: 28.4891,
    lng: 76.9854,
    bhk: 4,
    bathrooms: 4,
    balconies: 3,
    sqft: 3200,
    furnishing: 'Unfurnished',
    status: 'Ready to Move',
    facing: 'East',
    floorNumber: 0,
    totalFloors: 3,
    propertyAgeYears: 1,
    verified: true,
    featured: false,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A masterpiece on the fast-growing Dwarka Expressway corridor. Seamless connectivity to IGI Airport (15 mins). Features double car park, private hydraulic glass lift, VRF cooling piping, organic garden plot, and club access.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'Adani Realty',
      rating: 4.6,
      experienceYears: 15,
      completedProjects: 25,
      phone: '+91 1800 233 0007',
      email: 'realty@adani.com'
    },
    owner: {
      name: 'Adani Direct Desk',
      type: 'Builder',
      phone: '+91 1800 233 0007',
      whatsapp: '9118002330007',
      verified: true
    },
    aiInsight: {
      fairValue: 27500000,
      investmentScore: 92,
      threeYearGrowthEstimatePercent: 24.0,
      rentalYieldPercent: 3.5,
      pros: ['Dwarka Expressway inauguration boosted capital appreciation', '15 mins to IGI Airport Delhi'],
      cons: ['Unfurnished unit requires fitting budget of ~₹15-20L']
    },
    nearby: {
      schools: ['DPS Sector 102 (0.5 km)', 'Imperial Heritage School (1.2 km)'],
      hospitals: ['Columbia Asia Hospital (3.5 km)', 'Signature Advanced Hospital (2.0 km)'],
      metro: ['Dwarka Sector 21 Metro (6.0 km)'],
      malls: ['Conscient One Mall (1.5 km)']
    }
  },
  {
    id: 'prop-8',
    title: 'Puravankara Atmosphere 2BHK Garden Apartment',
    subtitle: 'Lush green landscape facing home with modern clubhouse',
    type: 'Apartment',
    price: 5200000, // 52 Lakhs
    priceFormatted: '₹ 52.0 Lakhs',
    pricePerSqft: 4952,
    city: 'Bangalore',
    locality: 'Yelahanka',
    address: 'Doddaballapur Main Road, Yelahanka, Bangalore, Karnataka 560064',
    pincode: '560064',
    lat: 13.1007,
    lng: 77.5963,
    bhk: 2,
    bathrooms: 2,
    balconies: 1,
    sqft: 1050,
    furnishing: 'Semi Furnished',
    status: 'Ready to Move',
    facing: 'East',
    floorNumber: 4,
    totalFloors: 12,
    propertyAgeYears: 2,
    verified: true,
    featured: false,
    trending: false,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Located in serene North Bangalore close to Kempegowda International Airport. Designed with BluNex smart home features, oxygenating plants landscape, jogging track, skating rink, and tennis courts.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'Puravankara Ltd',
      rating: 4.6,
      experienceYears: 45,
      completedProjects: 70,
      phone: '+91 80 4455 5555',
      email: 'sales@puravankara.com'
    },
    owner: {
      name: 'Vikram Joshi',
      type: 'Individual Owner',
      phone: '+91 98450 88776',
      whatsapp: '919845088776',
      verified: true
    },
    aiInsight: {
      fairValue: 5150000,
      investmentScore: 88,
      threeYearGrowthEstimatePercent: 14.5,
      rentalYieldPercent: 4.5,
      pros: ['20 mins drive to Bangalore Airport', 'Peaceful green surroundings away from city traffic'],
      cons: ['Slightly far from central MG Road CBD (22 km)']
    },
    nearby: {
      schools: ['Canadian International School (2.0 km)', 'National Public School (1.5 km)'],
      hospitals: ['Aster CMI Hospital (6.0 km)', 'Manipal Yelahanka (2.5 km)'],
      metro: ['Yelahanka Metro Station (Proposed 1.0 km)'],
      malls: ['RMZ Galleria Mall (2.0 km)']
    }
  },
  {
    id: 'prop-9',
    title: 'Hiranandani Gardens 1BHK Executive Suite',
    subtitle: 'Classic Neo-classical architecture studio home in Powai',
    type: 'Apartment',
    price: 9500000, // 95 Lakhs
    priceFormatted: '₹ 95.0 Lakhs',
    pricePerSqft: 14615,
    city: 'Mumbai',
    locality: 'Powai',
    address: 'Central Avenue, Hiranandani Gardens, Powai, Mumbai, Maharashtra 400076',
    pincode: '400076',
    lat: 19.1197,
    lng: 72.9051,
    bhk: 1,
    bathrooms: 1,
    balconies: 1,
    sqft: 650,
    furnishing: 'Furnished',
    status: 'Ready to Move',
    facing: 'North',
    floorNumber: 11,
    totalFloors: 24,
    propertyAgeYears: 4,
    verified: true,
    featured: true,
    trending: false,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Iconic Powai township experience. Walkable to IIT Bombay, Hiranandani Hospital, high-street restaurants, and corporate parks. High rental yield with constant demand from young tech founders and executives.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'Hiranandani Group',
      rating: 4.9,
      experienceYears: 40,
      completedProjects: 60,
      phone: '+91 22 2576 3700',
      email: 'sales@hiranandani.net'
    },
    owner: {
      name: 'Priya Sharma',
      type: 'Individual Owner',
      phone: '+91 98201 77665',
      whatsapp: '919820177665',
      verified: true
    },
    aiInsight: {
      fairValue: 9400000,
      investmentScore: 90,
      threeYearGrowthEstimatePercent: 12.8,
      rentalYieldPercent: 5.4,
      pros: ['Self-contained European style township', 'Very high rental demand (₹38k/month)'],
      cons: ['Compact 650 sqft layout']
    },
    nearby: {
      schools: ['Hiranandani Foundation School (0.3 km)', 'IIT Bombay (1.0 km)'],
      hospitals: ['Dr. L H Hiranandani Hospital (0.4 km)'],
      metro: ['IIT Powai Metro (1.2 km)'],
      malls: ['Galleria Shopping Centre Powai (0.2 km)', 'R City Mall Ghatkopar (3.5 km)']
    }
  },
  {
    id: 'prop-10',
    title: 'Casagrand Platinum 3BHK Gated Villa',
    subtitle: 'Modern minimalist villa with private courtyard & terrace garden',
    type: 'Villa',
    price: 11500000, // 1.15 Cr
    priceFormatted: '₹ 1.15 Cr',
    pricePerSqft: 5227,
    city: 'Chennai',
    locality: 'Perungudi',
    address: 'OMR Road, Perungudi, Chennai, Tamil Nadu 600096',
    pincode: '600096',
    lat: 12.9654,
    lng: 80.2461,
    bhk: 3,
    bathrooms: 3,
    balconies: 2,
    sqft: 2200,
    furnishing: 'Semi Furnished',
    status: 'Ready to Move',
    facing: 'East',
    floorNumber: 0,
    totalFloors: 2,
    propertyAgeYears: 1,
    verified: true,
    featured: false,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Located right on main OMR technology corridor. Features individual villa privacy inside a 100-villa gated community with 50+ amenities including clubhouse, pool, squash court, solar water heaters, and water treatment plant.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'Casagrand Builder Private Limited',
      rating: 4.7,
      experienceYears: 18,
      completedProjects: 120,
      phone: '+91 44 4411 1111',
      email: 'sales@casagrand.co.in'
    },
    owner: {
      name: 'Casagrand Direct',
      type: 'Builder',
      phone: '+91 44 4411 1111',
      whatsapp: '914444111111',
      verified: true
    },
    aiInsight: {
      fairValue: 11200000,
      investmentScore: 93,
      threeYearGrowthEstimatePercent: 19.0,
      rentalYieldPercent: 4.9,
      pros: ['Rare independent villa living on OMR road', 'Near World Trade Center Chennai'],
      cons: ['Ground water salinity managed by internal RO plant']
    },
    nearby: {
      schools: ['American International School (2.0 km)', 'Aachi Global School (1.0 km)'],
      hospitals: ['Apollo Specialty OMR (1.5 km)'],
      metro: ['Perungudi Metro (0.8 km)'],
      malls: ['BSR Mall OMR (0.5 km)']
    }
  },
  {
    id: 'prop-11',
    title: 'PS Group Reserve 3BHK Eco Park Residence',
    subtitle: 'Surrounded by 3-acre natural body and bird sanctuary',
    type: 'Apartment',
    price: 8800000, // 88 Lakhs
    priceFormatted: '₹ 88.0 Lakhs',
    pricePerSqft: 5500,
    city: 'Kolkata',
    locality: 'New Town',
    address: 'Action Area 2, New Town, Kolkata, West Bengal 700156',
    pincode: '700156',
    lat: 22.5958,
    lng: 88.4726,
    bhk: 3,
    bathrooms: 2,
    balconies: 2,
    sqft: 1600,
    furnishing: 'Unfurnished',
    status: 'Ready to Move',
    facing: 'South',
    floorNumber: 7,
    totalFloors: 20,
    propertyAgeYears: 1,
    verified: true,
    featured: false,
    trending: false,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'IGBC Gold Certified green building facing Kolkata Eco Park. Cross ventilation, natural daylight, floating pavilion, swimming pool with deck, EV charging slots, and 3-tier biometrics security.',
    amenities: ['Parking', 'Lift', 'Swimming Pool', 'Gym', 'Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'PS Group',
      rating: 4.8,
      experienceYears: 38,
      completedProjects: 100,
      phone: '+91 33 6767 6767',
      email: 'sales@psgroup.in'
    },
    owner: {
      name: 'Subhashish Das',
      type: 'Individual Owner',
      phone: '+91 98300 44556',
      whatsapp: '919830044556',
      verified: true
    },
    aiInsight: {
      fairValue: 8700000,
      investmentScore: 89,
      threeYearGrowthEstimatePercent: 13.5,
      rentalYieldPercent: 4.1,
      pros: ['Facing Eco Park green zone', 'Metro line expansion operational soon'],
      cons: ['Slight distance to Central Park Salt Lake']
    },
    nearby: {
      schools: ['DPS New Town (1.0 km)', 'St. Xavier University (2.2 km)'],
      hospitals: ['Tata Medical Center (1.8 km)'],
      metro: ['New Town Metro Station (0.7 km)'],
      malls: ['City Centre 2 (3.0 km)']
    }
  },
  {
    id: 'prop-12',
    title: 'Aparna CyberZoned 2BHK Smart City Plot / Villa Land',
    subtitle: 'HMDA Approved East-Facing Villa Plot in Cyber Corridor',
    type: 'Plot',
    price: 4800000, // 48 Lakhs
    priceFormatted: '₹ 48.0 Lakhs',
    pricePerSqft: 2666,
    city: 'Hyderabad',
    locality: 'Nallagandla',
    address: 'Nallagandla - Tellapur Main Road, Hyderabad, Telangana 500019',
    pincode: '500019',
    lat: 17.4721,
    lng: 78.3121,
    bhk: 0,
    bathrooms: 0,
    balconies: 0,
    sqft: 1800,
    furnishing: 'Unfurnished',
    status: 'Ready to Move',
    facing: 'East',
    floorNumber: 0,
    totalFloors: 0,
    propertyAgeYears: 0,
    verified: true,
    featured: false,
    trending: true,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clear title, 100% HMDA approved plot ready for immediate villa construction (G+2 permission). 40 feet wide black top roads, underground drainage, electricity line connected, streetlights installed.',
    amenities: ['Garden', 'Gated Community', 'Security'],
    builder: {
      name: 'Aparna Constructions',
      rating: 4.9,
      experienceYears: 27,
      completedProjects: 55,
      phone: '+91 40 2335 2708',
      email: 'sales@aparnaconstructions.com'
    },
    owner: {
      name: 'Aparna Land Desk',
      type: 'Builder',
      phone: '+91 40 2335 2708',
      whatsapp: '914023352708',
      verified: true
    },
    aiInsight: {
      fairValue: 4700000,
      investmentScore: 95,
      threeYearGrowthEstimatePercent: 28.0,
      rentalYieldPercent: 0,
      pros: ['Highest land value growth rate in Hyderabad West zone', 'Clear title HMDA layout'],
      cons: ['Plot investment has no immediate rental yield until constructed']
    },
    nearby: {
      schools: ['Epistemo Vikas Leadership School (0.5 km)'],
      hospitals: ['Citizens Specialty Hospital (2.0 km)'],
      metro: ['Chanda Nagar MMTS (2.5 km)'],
      malls: ['Aparna Mall Nallagandla (1.0 km)']
    }
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    propertyId: 'prop-1',
    userName: 'Karan Malhotra',
    rating: 5,
    date: '15 July 2026',
    comment: 'Visited the show flat in Skyline Azure. Absolute luxury and the ocean view from 18th floor is breath-taking!',
    localityRating: { safety: 5, connectivity: 5, environment: 4.8 }
  },
  {
    id: 'rev-2',
    propertyId: 'prop-2',
    userName: 'Srinivasan R.',
    rating: 4.5,
    date: '28 June 2026',
    comment: 'Great location near Velachery MRTS. OMR IT companies are just 15 mins away. Best for working couples.',
    localityRating: { safety: 4.5, connectivity: 4.9, environment: 4.2 }
  },
  {
    id: 'rev-3',
    propertyId: 'prop-3',
    userName: 'Ananya Rao',
    rating: 5,
    date: '10 June 2026',
    comment: 'The Spanish style villa architecture in Whitefield is unmatched. High quality construction by Sobha.',
    localityRating: { safety: 4.8, connectivity: 4.6, environment: 5.0 }
  }
];
