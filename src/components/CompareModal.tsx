import React from 'react';
import { Property } from '../types';
import { X, Check, Minus, Building2, Bed, Bath, Maximize2, Sparkles, MapPin, Trash2 } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProperties: Property[];
  onRemoveFromCompare: (id: string) => void;
  onBookVisit: (p: Property) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProperties,
  onRemoveFromCompare,
  onBookVisit,
}) => {
  if (!isOpen) return null;

  const compareRows = [
    { label: 'City & Locality', getValue: (p: Property) => `${p.locality}, ${p.city}` },
    { label: 'Total Price', getValue: (p: Property) => p.priceFormatted },
    { label: 'Price per sq.ft', getValue: (p: Property) => `₹ ${p.pricePerSqft.toLocaleString('en-IN')}` },
    { label: 'BHK & Type', getValue: (p: Property) => `${p.bhk} BHK ${p.type}` },
    { label: 'Carpet Area', getValue: (p: Property) => `${p.sqft} sq.ft` },
    { label: 'Furnishing', getValue: (p: Property) => p.furnishing },
    { label: 'Possession Status', getValue: (p: Property) => p.status },
    { label: 'Facing', getValue: (p: Property) => p.facing },
    { label: 'AI Investment Score', getValue: (p: Property) => `${p.aiInsight.investmentScore} / 100` },
    { label: '3-Yr Growth Est.', getValue: (p: Property) => `+${p.aiInsight.threeYearGrowthEstimatePercent}%` },
    { label: 'Builder Name', getValue: (p: Property) => p.builder.name },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md p-4 flex justify-center items-center">
      <div className="frosted-modal rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-b border-white/50 dark:border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Property Side-By-Side Comparison</h2>
            <p className="text-xs text-slate-500">Comparing {comparedProperties.length} selected properties</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Table Area */}
        <div className="p-4 overflow-x-auto flex-1">
          {comparedProperties.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Building2 className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                No properties selected for comparison yet.
              </p>
              <p className="text-xs text-slate-400">Click the scale icon on any property card to compare side by side.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 font-bold text-slate-400 w-48">Feature</th>
                  {comparedProperties.map((p) => (
                    <th key={p.id} className="p-3 font-bold text-slate-900 dark:text-white min-w-[200px] align-top">
                      <div className="space-y-2">
                        <div className="relative h-28 rounded-xl overflow-hidden">
                          <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          <button
                            onClick={() => onRemoveFromCompare(p.id)}
                            className="absolute top-1.5 right-1.5 p-1 bg-slate-900/80 text-white rounded-full hover:bg-rose-600"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-bold text-xs line-clamp-1">{p.title}</p>
                        <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{p.priceFormatted}</p>
                        <button
                          onClick={() => onBookVisit(p)}
                          className="w-full py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold hover:bg-blue-700"
                        >
                          Book Visit
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {compareRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-slate-100 dark:border-slate-800 ${
                      idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-800/20' : ''
                    }`}
                  >
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">{row.label}</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 font-bold text-slate-800 dark:text-slate-200">
                        {row.getValue(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
