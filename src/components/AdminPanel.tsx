import React, { useState, useEffect } from 'react';
import { Property, SiteVisitBooking, AdminStats } from '../types';
import { fetchAdminStats, createProperty, deleteProperty } from '../services/api';
import {
  ShieldCheck,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  BarChart3,
  X,
  Sparkles
} from 'lucide-react';

interface AdminPanelProps {
  properties: Property[];
  onRefreshProperties: () => void;
  bookings: SiteVisitBooking[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  properties,
  onRefreshProperties,
  bookings,
}) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'properties' | 'bookings'>('analytics');
  const [showAddModal, setShowAddModal] = useState(false);

  // New property form state
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [locality, setLocality] = useState('');
  const [price, setPrice] = useState(8500000);
  const [type, setType] = useState<'Apartment' | 'Villa' | 'Plot'>('Apartment');
  const [bhk, setBhk] = useState(2);
  const [sqft, setSqft] = useState(1200);
  const [furnishing, setFurnishing] = useState<'Furnished' | 'Semi Furnished' | 'Unfurnished'>('Semi Furnished');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80');

  useEffect(() => {
    fetchAdminStats().then((data) => setStats(data));
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !locality) return;

    const res = await createProperty({
      title,
      type,
      price,
      pricePerSqft: Math.round(price / sqft),
      city,
      locality,
      address: `${locality}, ${city}`,
      pincode: '400001',
      lat: 19.076,
      lng: 72.8777,
      bhk,
      bathrooms: bhk,
      balconies: 1,
      sqft,
      furnishing,
      status: 'Ready to Move',
      facing: 'East',
      floorNumber: 5,
      totalFloors: 15,
      propertyAgeYears: 1,
      images: [imageUrl],
      description: 'Newly listed verified property on PropBot AI.',
      amenities: ['Parking', 'Lift', 'Security', 'Gated Community'],
      builder: {
        name: 'PropBot Verified Builder',
        rating: 4.8,
        experienceYears: 15,
        completedProjects: 20,
        phone: '+91 98765 00000',
        email: 'sales@propbot.ai',
      },
      owner: {
        name: 'PropBot Partner',
        type: 'Builder',
        phone: '+91 98765 00000',
        whatsapp: '919876500000',
        verified: true,
      },
    });

    if (res.success) {
      setShowAddModal(false);
      onRefreshProperties();
      alert('New property listing created successfully!');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property listing?')) {
      const ok = await deleteProperty(id);
      if (ok) {
        onRefreshProperties();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">PropBot Admin Dashboard</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Manage listings, site visit bookings, and AI performance metrics</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property Listing</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Analytics & Intelligence
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'properties'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Properties Catalog ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'bookings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Site Visit Bookings ({bookings.length})
        </button>
      </div>

      {/* Tab 1: Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top 4 Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 frosted-card rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-blue-600">
                <span className="text-xs font-bold uppercase text-slate-400">Total Properties</span>
                <Building2 className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{properties.length}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+12% this month</p>
            </div>

            <div className="p-5 frosted-card rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-indigo-600">
                <span className="text-xs font-bold uppercase text-slate-400">Active Platform Users</span>
                <Users className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats?.totalUsers || 1420}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+24% new signups</p>
            </div>

            <div className="p-5 frosted-card rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-emerald-600">
                <span className="text-xs font-bold uppercase text-slate-400">Site Enquiries & Visits</span>
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{bookings.length + 42}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">100% verified leads</p>
            </div>

            <div className="p-5 frosted-card rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-amber-500">
                <span className="text-xs font-bold uppercase text-slate-400">Portfolio GMV Value</span>
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                ₹ {((stats?.totalRevenueInr || 180000000) / 10000000).toFixed(1)} Cr
              </p>
              <p className="text-[11px] text-slate-400 font-medium">Across 7 Indian Metros</p>
            </div>
          </div>

          {/* Localities & Search Visual Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Top Searched Cities</h3>
              <div className="space-y-3">
                {stats?.topSearchedCities.map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>{c.city}</span>
                      <span>{c.count} searches</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${Math.min(100, (c.count / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Highest Growth Localities</h3>
              <div className="space-y-2 text-xs">
                {stats?.trendingLocalities.map((loc, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{loc.name}</p>
                      <p className="text-[11px] text-slate-500">₹ {loc.avgPriceSqft.toLocaleString('en-IN')} / sqft</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg text-xs">
                      {loc.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Property Management Table */}
      {activeTab === 'properties' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Property</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                      <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="h-10 w-12 rounded-lg object-cover" />
                      <span className="line-clamp-1">{p.title}</span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{p.locality}, {p.city}</td>
                    <td className="p-3 font-extrabold text-blue-600">{p.priceFormatted}</td>
                    <td className="p-3 text-slate-600">{p.bhk} BHK {p.type}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-bold text-[10px]">
                        Verified
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Site Visit Bookings Table */}
      {activeTab === 'bookings' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Property</th>
                  <th className="p-3">Visitor Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date & Slot</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{b.propertyTitle}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">{b.userName}</td>
                    <td className="p-3 text-blue-600 font-mono">{b.userPhone}</td>
                    <td className="p-3 text-slate-600">{b.date} ({b.timeSlot})</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded font-bold text-[10px]">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm p-4 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-lg w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Property Listing</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Property Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prestige Heights 3BHK"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Locality</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Velachery"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    step={100000}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">BHK</label>
                  <input
                    type="number"
                    value={bhk}
                    onChange={(e) => setBhk(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">SqFt</label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
