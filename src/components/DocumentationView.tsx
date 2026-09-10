import React, { useState } from 'react';
import { X, FileText, Database, Code2, Terminal, BookOpen, Download } from 'lucide-react';

interface DocumentationViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [docTab, setDocTab] = useState<'readme' | 'api' | 'database' | 'install'>('readme');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md p-4 flex justify-center items-center">
      <div className="frosted-modal rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <h2 className="font-bold text-base">PropBot AI Documentation & Schema</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-2 gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setDocTab('readme')}
            className={`px-3 py-1.5 rounded-xl ${docTab === 'readme' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            README & Overview
          </button>
          <button
            onClick={() => setDocTab('api')}
            className={`px-3 py-1.5 rounded-xl ${docTab === 'api' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            API Endpoints
          </button>
          <button
            onClick={() => setDocTab('database')}
            className={`px-3 py-1.5 rounded-xl ${docTab === 'database' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Database ER Schema
          </button>
          <button
            onClick={() => setDocTab('install')}
            className={`px-3 py-1.5 rounded-xl ${docTab === 'install' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Installation Guide
          </button>
        </div>

        {/* Content Box */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs space-y-4 text-slate-800 dark:text-slate-200">
          {docTab === 'readme' && (
            <div className="space-y-3 font-sans">
              <h3 className="text-base font-bold text-blue-600">PropBot AI Real Estate Platform</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                PropBot AI is a production-grade full-stack real estate discovery and intelligence platform powered by Gemini AI and Express Node server.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
                <p className="font-bold">✨ Key Architectural Features:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Natural Language Property Search using Gemini 3.6 Flash parsing</li>
                  <li>Conversational PropBot Chatbot with property card injection & visit scheduling</li>
                  <li>AI Price Valuation & Area 3-Year Growth Score calculations</li>
                  <li>Side-by-side comparative matrix for properties</li>
                  <li>Integrated EMI & Loan Eligibility Calculators</li>
                  <li>Complete Admin Panel with GMV and enquiry analytics</li>
                  <li>Responsive Desktop Web + Mobile Viewport Mode (iOS/Android)</li>
                </ul>
              </div>
            </div>
          )}

          {docTab === 'api' && (
            <div className="space-y-3">
              <p className="font-bold font-sans text-sm text-blue-600">REST API Specifications:</p>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-3">
                <p className="text-emerald-400">GET /api/properties</p>
                <p className="text-slate-400 text-[11px]">Fetch properties with city, price, BHK, and search query filters.</p>

                <p className="text-emerald-400">POST /api/ai/nlp-search</p>
                <p className="text-slate-400 text-[11px]">Body: {"{ query: string }"}. Parses plain English into structured filters via Gemini.</p>

                <p className="text-emerald-400">POST /api/ai/chat</p>
                <p className="text-slate-400 text-[11px]">Body: {"{ messages: array }"}. Runs conversational PropBot chat & matches property IDs.</p>

                <p className="text-emerald-400">POST /api/bookings</p>
                <p className="text-slate-400 text-[11px]">Body: {"{ propertyId, date, timeSlot, userName, userPhone }"}. Schedules site visit.</p>

                <p className="text-emerald-400">GET /api/admin/stats</p>
                <p className="text-slate-400 text-[11px]">Returns total properties, user counts, top searched cities & revenue.</p>
              </div>
            </div>
          )}

          {docTab === 'database' && (
            <div className="space-y-3 font-sans">
              <p className="font-bold text-sm text-blue-600">Relational Database ER Schema:</p>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl space-y-3 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <p className="font-bold text-blue-600">Table: properties</p>
                  <p className="text-slate-500 text-[11px]">id (PK), title, type, price, city, locality, bhk, sqft, furnishing, status, facing, builder_id (FK), ai_score, created_at</p>
                </div>
                <div>
                  <p className="font-bold text-indigo-600">Table: site_visit_bookings</p>
                  <p className="text-slate-500 text-[11px]">id (PK), property_id (FK), user_name, user_phone, date, time_slot, status</p>
                </div>
                <div>
                  <p className="font-bold text-emerald-600">Table: builders_owners</p>
                  <p className="text-slate-500 text-[11px]">id (PK), name, phone, email, experience_years, completed_projects, rating</p>
                </div>
              </div>
            </div>
          )}

          {docTab === 'install' && (
            <div className="space-y-3">
              <p className="font-bold font-sans text-sm text-blue-600">Local Setup & Deployment Guide:</p>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2">
                <p className="text-amber-400"># 1. Install Dependencies</p>
                <p className="text-slate-300">npm install</p>

                <p className="text-amber-400 pt-2"># 2. Configure Environment Secrets (.env)</p>
                <p className="text-slate-300">GEMINI_API_KEY="your_google_gemini_api_key"</p>

                <p className="text-amber-400 pt-2"># 3. Start Development Server</p>
                <p className="text-slate-300">npm run dev</p>

                <p className="text-amber-400 pt-2"># 4. Production Build</p>
                <p className="text-slate-300">npm run build && npm start</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
