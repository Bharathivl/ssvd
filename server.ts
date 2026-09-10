import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_PROPERTIES, MOCK_REVIEWS } from './src/data/mockProperties';
import { Property, SiteVisitBooking } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory property database
let properties: Property[] = [...INITIAL_PROPERTIES];
let bookings: SiteVisitBooking[] = [
  {
    id: 'book-101',
    propertyId: 'prop-1',
    propertyTitle: 'Skyline Azure 3BHK Luxury Residences',
    propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    userId: 'usr-1',
    userName: 'Bharath Kumar',
    userPhone: '+91 98765 43210',
    userEmail: 'bharath@example.com',
    date: '2026-08-05',
    timeSlot: '11:00 AM - 12:00 PM',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize Gemini Client:', err);
    return null;
  }
};

// ================= API ROUTES ================= //

// 1. Get all properties with filtering
app.get('/api/properties', (req, res) => {
  let result = [...properties];
  const { city, locality, minPrice, maxPrice, bhk, type, furnishing, status, search } = req.query;

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.builder.name.toLowerCase().includes(q)
    );
  }

  if (city && typeof city === 'string' && city !== 'All') {
    result = result.filter((p) => p.city.toLowerCase() === city.toLowerCase());
  }

  if (locality && typeof locality === 'string') {
    result = result.filter((p) => p.locality.toLowerCase().includes(locality.toLowerCase()));
  }

  if (minPrice) {
    result = result.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  if (bhk) {
    const bhkNum = Number(bhk);
    if (!isNaN(bhkNum) && bhkNum > 0) {
      result = result.filter((p) => p.bhk === bhkNum);
    }
  }

  if (type && typeof type === 'string' && type !== 'All') {
    result = result.filter((p) => p.type.toLowerCase() === type.toLowerCase());
  }

  if (furnishing && typeof furnishing === 'string' && furnishing !== 'All') {
    result = result.filter((p) => p.furnishing.toLowerCase() === furnishing.toLowerCase());
  }

  if (status && typeof status === 'string' && status !== 'All') {
    result = result.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  }

  res.json({ success: true, count: result.length, data: result });
});

// 2. Get Single Property by ID
app.get('/api/properties/:id', (req, res) => {
  const property = properties.find((p) => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  const reviews = MOCK_REVIEWS.filter((r) => r.propertyId === property.id);
  res.json({ success: true, data: { ...property, reviews } });
});

// 3. Create / Add New Property (Admin/Builder)
app.post('/api/properties', (req, res) => {
  const newPropData = req.body;
  const newId = `prop-${Date.now()}`;

  const formattedPrice =
    newPropData.price >= 10000000
      ? `₹ ${(newPropData.price / 10000000).toFixed(2)} Cr`
      : `₹ ${(newPropData.price / 100000).toFixed(1)} Lakhs`;

  const newProperty: Property = {
    ...newPropData,
    id: newId,
    priceFormatted: formattedPrice,
    verified: true,
    featured: newPropData.featured ?? false,
    trending: newPropData.trending ?? false,
    aiInsight: newPropData.aiInsight || {
      fairValue: Math.round(newPropData.price * 0.98),
      investmentScore: 88,
      threeYearGrowthEstimatePercent: 16.0,
      rentalYieldPercent: 4.5,
      pros: ['Prime connectivity', 'Modern specifications'],
      cons: ['New development area'],
    },
    nearby: newPropData.nearby || {
      schools: ['Reputed School (1.0 km)'],
      hospitals: ['Multispeciality Hospital (1.5 km)'],
      metro: ['Metro Station (0.8 km)'],
      malls: ['Shopping Complex (1.2 km)'],
    },
  };

  properties.unshift(newProperty);
  res.json({ success: true, data: newProperty, message: 'Property created successfully' });
});

// 4. Update Property
app.put('/api/properties/:id', (req, res) => {
  const index = properties.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  properties[index] = { ...properties[index], ...req.body };
  res.json({ success: true, data: properties[index], message: 'Property updated' });
});

// 5. Delete Property
app.delete('/api/properties/:id', (req, res) => {
  const index = properties.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  properties.splice(index, 1);
  res.json({ success: true, message: 'Property deleted successfully' });
});

// 6. NLP Search Endpoint (Gemini-Powered Natural Language Parser)
app.post('/api/ai/nlp-search', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ success: false, message: 'Query string required' });
  }

  const ai = getGeminiClient();

  let extractedParams = {
    city: 'All',
    locality: '',
    minPrice: 0,
    maxPrice: 500000000,
    bhk: 0,
    type: 'All',
    amenities: [] as string[],
    summaryReasoning: 'Parsed query parameters from your input.',
  };

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Analyze this Indian real estate user query: "${query}".
Extract criteria into JSON with these exact properties:
- city: string (e.g. "Mumbai", "Chennai", "Bangalore", "Delhi NCR", "Hyderabad", "Pune", "Kolkata", or "All")
- locality: string (e.g. "Velachery", "Bandra", "Whitefield", "Gachibowli", "Wakad", "DLF Phase 5" or empty)
- maxPriceInr: number (convert lakhs or crores into full INR numbers. E.g., 60 lakhs = 6000000, 1.5 Cr = 15000000, or 500000000 if unspecified)
- bhk: number (e.g. 1, 2, 3, 4, or 0 if unspecified)
- type: string ("Apartment", "Villa", "Plot", "Independent House", "Penthouse", or "All")
- keywords: array of strings (e.g. ["parking", "pool", "furnished"])
- summary: string (short conversational sentence explaining what you searched for)
`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              city: { type: Type.STRING },
              locality: { type: Type.STRING },
              maxPriceInr: { type: Type.NUMBER },
              bhk: { type: Type.NUMBER },
              type: { type: Type.STRING },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              summary: { type: Type.STRING },
            },
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        extractedParams = {
          city: parsed.city || 'All',
          locality: parsed.locality || '',
          minPrice: 0,
          maxPrice: parsed.maxPriceInr || 500000000,
          bhk: parsed.bhk || 0,
          type: parsed.type || 'All',
          amenities: parsed.keywords || [],
          summaryReasoning: parsed.summary || `Found matches based on: ${query}`,
        };
      }
    } catch (err) {
      console.error('NLP Search Gemini Error:', err);
    }
  }

  // Fallback rule parsing if AI is offline or parsing fallback needed
  if (!ai || extractedParams.city === 'All') {
    const qLower = query.toLowerCase();
    if (qLower.includes('velachery') || qLower.includes('chennai')) {
      extractedParams.city = 'Chennai';
      if (qLower.includes('velachery')) extractedParams.locality = 'Velachery';
    } else if (qLower.includes('mumbai') || qLower.includes('bandra') || qLower.includes('powai')) {
      extractedParams.city = 'Mumbai';
    } else if (qLower.includes('bangalore') || qLower.includes('whitefield') || qLower.includes('yelahanka')) {
      extractedParams.city = 'Bangalore';
    } else if (qLower.includes('hyderabad') || qLower.includes('gachibowli')) {
      extractedParams.city = 'Hyderabad';
    }

    if (qLower.includes('2 bhk') || qLower.includes('2bhk')) extractedParams.bhk = 2;
    else if (qLower.includes('3 bhk') || qLower.includes('3bhk')) extractedParams.bhk = 3;
    else if (qLower.includes('4 bhk') || qLower.includes('4bhk')) extractedParams.bhk = 4;

    if (qLower.includes('60 lakhs') || qLower.includes('60L') || qLower.includes('60l')) {
      extractedParams.maxPrice = 6000000;
    } else if (qLower.includes('1.5 cr') || qLower.includes('1.5cr')) {
      extractedParams.maxPrice = 15000000;
    }
  }

  // Filter matching properties
  let matched = properties.filter((p) => {
    if (extractedParams.city !== 'All' && p.city.toLowerCase() !== extractedParams.city.toLowerCase()) {
      return false;
    }
    if (extractedParams.locality && !p.locality.toLowerCase().includes(extractedParams.locality.toLowerCase())) {
      return false;
    }
    if (extractedParams.bhk > 0 && p.bhk !== extractedParams.bhk) {
      return false;
    }
    if (extractedParams.maxPrice > 0 && p.price > extractedParams.maxPrice) {
      return false;
    }
    return true;
  });

  if (matched.length === 0) {
    // Return closest properties if exact match is tight
    matched = properties.slice(0, 4);
  }

  res.json({
    success: true,
    query,
    extractedParams,
    results: matched,
    summaryReasoning: extractedParams.summaryReasoning,
  });
});

// 7. Conversational AI Chatbot Endpoint
app.post('/api/ai/chat', async (req, res) => {
  const { messages, userContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, message: 'Messages array required' });
  }

  const lastUserMsg = messages[messages.length - 1]?.text || 'Hi';
  const ai = getGeminiClient();

  const propertyCatalogSummary = properties
    .map(
      (p) =>
        `[ID: ${p.id}] ${p.title} - ${p.bhk} BHK ${p.type} in ${p.locality}, ${p.city} | Price: ${p.priceFormatted} (₹${p.price}) | Amenities: ${p.amenities.join(', ')}`
    )
    .join('\n');

  let botReply = 'Welcome to PropBot AI! Which city or locality are you looking to find properties in?';
  let suggestedPropIds: string[] = [];

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `You are PropBot AI, an intelligent, empathetic Indian real estate assistant.
You guide home buyers step-by-step:
1. Greet warmly & ask for City/Area
2. Ask for Budget range
3. Ask for Property Type & BHK
4. Ask for preferred amenities
5. Recommend matching properties from the catalog below
6. Offer to schedule a site visit with date & slot!

Catalog of Available Properties:
${propertyCatalogSummary}

User context: ${JSON.stringify(userContext || {})}
Conversation History:
${messages.map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n')}

Respond in JSON format with:
- replyText: string (conversational response formatted nicely)
- recommendedPropertyIds: array of strings (property IDs matching user interest, up to 3)
- offerSiteVisit: boolean
`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              replyText: { type: Type.STRING },
              recommendedPropertyIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              offerSiteVisit: { type: Type.BOOLEAN },
            },
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        botReply = parsed.replyText || botReply;
        suggestedPropIds = parsed.recommendedPropertyIds || [];
      }
    } catch (err) {
      console.error('AI Chat Error:', err);
    }
  }

  // Fallback intelligent responses if Gemini API is unavailable or error
  if (!ai || suggestedPropIds.length === 0) {
    const textLower = lastUserMsg.toLowerCase();
    if (textLower.includes('hi') || textLower.includes('hello') || textLower.includes('hey')) {
      botReply =
        "👋 Welcome to PropBot AI! I'm your AI property advisor. Which city are you looking to buy or invest in? (e.g. Mumbai, Chennai, Bangalore, Delhi NCR, Hyderabad, Pune)";
    } else if (textLower.includes('chennai') || textLower.includes('velachery')) {
      botReply =
        'Great choice! Chennai & Velachery are experiencing high demand near the OMR tech parks. What is your budget or BHK preference (e.g., 2 BHK under ₹70 Lakhs)?';
      suggestedPropIds = ['prop-2', 'prop-10'];
    } else if (textLower.includes('mumbai') || textLower.includes('bandra') || textLower.includes('powai')) {
      botReply =
        'Mumbai offers incredible resale liquidity and luxury sea views! Here are top recommendations in Bandra and Powai:';
      suggestedPropIds = ['prop-1', 'prop-9'];
    } else if (textLower.includes('bangalore') || textLower.includes('whitefield')) {
      botReply =
        'Bangalore IT hubs in Whitefield & Yelahanka have outstanding 3-year growth scores! Check out these premium homes:';
      suggestedPropIds = ['prop-3', 'prop-8'];
    } else if (textLower.includes('book') || textLower.includes('visit') || textLower.includes('site')) {
      botReply =
        '🗓️ I can schedule a free site visit with instant VIP pickup and verified builder desk assistance! Click the "Book Site Visit" button below on any property card.';
      suggestedPropIds = ['prop-1', 'prop-2', 'prop-3'];
    } else {
      botReply = `I found these matching properties for your search "${lastUserMsg}". Would you like to compare them or schedule a site visit?`;
      suggestedPropIds = ['prop-1', 'prop-2', 'prop-3'];
    }
  }

  const matchingProperties = properties.filter((p) => suggestedPropIds.includes(p.id));

  res.json({
    success: true,
    data: {
      replyText: botReply,
      suggestedProperties: matchingProperties,
    },
  });
});

// 8. AI Price & Growth Valuation Endpoint
app.post('/api/ai/price-predict', async (req, res) => {
  const { propertyId, bhk, sqft, city, locality, currentPrice } = req.body;
  const ai = getGeminiClient();

  let prediction = {
    estimatedFairValueInr: currentPrice ? Math.round(currentPrice * 0.98) : 7500000,
    pricePerSqftEstimate: sqft ? Math.round((currentPrice || 7500000) / sqft) : 6000,
    confidencePercent: 94,
    threeYearGrowthPercent: 18.5,
    rentalYieldPercent: 4.5,
    marketTrend: 'High Growth Zone',
    summary: 'Property is priced competitively within 2.5% of neighborhood benchmark.',
  };

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Provide an Indian Real Estate price valuation and market analysis for:
City: ${city}, Locality: ${locality}, BHK: ${bhk}, SqFt: ${sqft}, Asking Price: ₹${currentPrice}.

Return JSON:
- estimatedFairValueInr: number
- pricePerSqftEstimate: number
- confidencePercent: number
- threeYearGrowthPercent: number
- rentalYieldPercent: number
- marketTrend: string
- summary: string
`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              estimatedFairValueInr: { type: Type.NUMBER },
              pricePerSqftEstimate: { type: Type.NUMBER },
              confidencePercent: { type: Type.NUMBER },
              threeYearGrowthPercent: { type: Type.NUMBER },
              rentalYieldPercent: { type: Type.NUMBER },
              marketTrend: { type: Type.STRING },
              summary: { type: Type.STRING },
            },
          },
        },
      });

      if (response.text) {
        prediction = JSON.parse(response.text.trim());
      }
    } catch (err) {
      console.error('Price predict error:', err);
    }
  }

  res.json({ success: true, data: prediction });
});

// 9. Site Visit Bookings Endpoint
app.post('/api/bookings', (req, res) => {
  const { propertyId, date, timeSlot, userName, userPhone, userEmail } = req.body;

  const property = properties.find((p) => p.id === propertyId);
  if (!property) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }

  const newBooking: SiteVisitBooking = {
    id: `book-${Date.now()}`,
    propertyId: property.id,
    propertyTitle: property.title,
    propertyImage: property.images[0],
    userId: `usr-${Date.now()}`,
    userName: userName || 'Guest User',
    userPhone: userPhone || '+91 98765 43210',
    userEmail: userEmail || 'user@example.com',
    date: date || new Date().toISOString().split('T')[0],
    timeSlot: timeSlot || '10:00 AM - 11:00 AM',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  res.json({ success: true, data: newBooking, message: 'Site visit scheduled successfully!' });
});

app.get('/api/bookings', (req, res) => {
  res.json({ success: true, count: bookings.length, data: bookings });
});

// 10. Admin Analytics Endpoint
app.get('/api/admin/stats', (req, res) => {
  const totalProperties = properties.length;
  const totalRevenueInr = properties.reduce((acc, p) => acc + p.price, 0);

  res.json({
    success: true,
    data: {
      totalProperties,
      totalUsers: 1420,
      activeEnquiries: bookings.length + 42,
      totalRevenueInr,
      topSearchedCities: [
        { city: 'Mumbai', count: 480 },
        { city: 'Chennai', count: 390 },
        { city: 'Bangalore', count: 350 },
        { city: 'Hyderabad', count: 280 },
        { city: 'Delhi NCR', count: 210 },
      ],
      trendingLocalities: [
        { name: 'Velachery, Chennai', growth: '+15.2%', avgPriceSqft: 5666 },
        { name: 'Bandra West, Mumbai', growth: '+18.5%', avgPriceSqft: 10277 },
        { name: 'Whitefield, Bangalore', growth: '+21.0%', avgPriceSqft: 9285 },
        { name: 'Gachibowli, Hyderabad', growth: '+22.4%', avgPriceSqft: 6604 },
        { name: 'Wakad, Pune', growth: '+17.5%', avgPriceSqft: 5760 },
      ],
      monthlyEnquiries: [
        { month: 'Jan', count: 120 },
        { month: 'Feb', count: 180 },
        { month: 'Mar', count: 240 },
        { month: 'Apr', count: 310 },
        { month: 'May', count: 420 },
        { month: 'Jun', count: 580 },
      ],
    },
  });
});

// Server Initialization with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PropBot AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
