import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Pill, 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  ExternalLink, 
  ShieldAlert, 
  Filter, 
  Star, 
  CheckCircle,
  Train,
  Navigation,
  Compass,
  HeartPulse,
  Activity,
  Layers,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { BENGALURU_HOSPITALS, EMERGENCY_NUMBERS, BengaluruZoneFacility } from '../data/hospitalsData';

interface HospitalPharmacyFinderProps {
  onNavigate?: (tab: any) => void;
}

export const HospitalPharmacyFinder: React.FC<HospitalPharmacyFinderProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [only24x7, setOnly24x7] = useState(false);
  const [showRouteMapModal, setShowRouteMapModal] = useState(false);
  const [selectedFacilityForRoute, setSelectedFacilityForRoute] = useState<BengaluruZoneFacility | null>(null);

  const zones = ['All', 'South', 'East', 'Central', 'North', 'West'];

  const filteredFacilities = useMemo(() => {
    return BENGALURU_HOSPITALS.filter((facility) => {
      // Zone Filter
      if (selectedZone !== 'All' && facility.zone !== selectedZone) {
        return false;
      }
      // Type Filter
      if (selectedType === 'hospitals' && !facility.type.includes('hospital')) {
        return false;
      }
      if (selectedType === 'govt' && facility.type !== 'govt_hospital') {
        return false;
      }
      if (selectedType === 'jan_aushadhi' && facility.type !== 'jan_aushadhi') {
        return false;
      }
      // 24/7 Filter
      if (only24x7 && !facility.open24Hours) {
        return false;
      }
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          facility.name.toLowerCase().includes(q) ||
          facility.locality.toLowerCase().includes(q) ||
          facility.address.toLowerCase().includes(q) ||
          (facility.nearestMetroStation && facility.nearestMetroStation.toLowerCase().includes(q)) ||
          facility.services.some(s => s.toLowerCase().includes(q)) ||
          facility.specialtiesDetailed.some(s => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchQuery, selectedZone, selectedType, only24x7]);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'hospital_24x7':
        return <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-md">24/7 Emergency Trauma</span>;
      case 'govt_hospital':
        return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md">Premier Government Institute (Free/Subsidized)</span>;
      case 'jan_aushadhi':
        return <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-md">PM Jan Aushadhi (50%-90% Off)</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">Healthcare Center</span>;
    }
  };

  const getMetroColor = (line?: string) => {
    switch (line) {
      case 'Purple Line': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Green Line': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Yellow Line': return 'bg-amber-100 text-amber-900 border-amber-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-600/50 backdrop-blur-md text-teal-100 text-xs font-semibold uppercase tracking-wider border border-teal-400/30">
              <MapPin className="w-3.5 h-3.5" />
              Bengaluru Hospitals & Route Map Directory
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Bengaluru Hospitals, Trauma Centers & Route Map
          </h1>
          <p className="text-teal-100 text-base sm:text-lg leading-relaxed">
            Find all premier hospitals in Bengaluru (Manipal, Apollo, Fortis, NIMHANS, Jayadeva, Victoria, Aster CMI, Narayana Health City) with interactive route map, Namma Metro connections, 24/7 casualty helplines, and Jan Aushadhi generic stores.
          </p>
        </div>
      </div>

      {/* Emergency Hotline Quick Bar */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />
          <span>Bengaluru & All-India 24/7 Emergency Dispatch Numbers</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EMERGENCY_NUMBERS.slice(0, 4).map((em, idx) => (
            <a
              key={idx}
              href={`tel:${em.number.replace(/\s+/g, '')}`}
              id={`call-emergency-${em.number}`}
              className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-rose-200 hover:border-rose-400 hover:shadow-md transition-all group"
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-medium text-slate-600 truncate">{em.service}</p>
                <p className="text-sm font-extrabold text-rose-700">{em.number}</p>
              </div>
              <Phone className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Bengaluru Metro & Hospital Route Map Guide Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Namma Metro & Hospital Route Map Guide
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Live Network
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Quickest metro transit lines to major hospitals across Bengaluru zones
              </p>
            </div>
          </div>
        </div>

        {/* Metro Line Visual Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600 animate-pulse" />
              <h4 className="font-extrabold text-xs text-purple-950 uppercase tracking-wider">
                Purple Line (East - West Corridor)
              </h4>
            </div>
            <p className="text-xs text-purple-900 font-medium">
              Whitefield ↔ Indiranagar ↔ MG Road ↔ Majestic ↔ Vijayanagar ↔ Challaghatta
            </p>
            <p className="text-[11px] text-slate-600">
              <strong>Serves:</strong> Manipal Whitefield, Manipal HAL (Indiranagar), CV Raman Hospital, Bowring Hospital (MG Rd), KC General.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
              <h4 className="font-extrabold text-xs text-emerald-950 uppercase tracking-wider">
                Green Line (North - South Corridor)
              </h4>
            </div>
            <p className="text-xs text-emerald-900 font-medium">
              Madavara / Nagasandra ↔ Yeshwanthpur ↔ Majestic ↔ KR Market ↔ Jayanagar ↔ Silk Institute
            </p>
            <p className="text-[11px] text-slate-600">
              <strong>Serves:</strong> Victoria Hospital (KR Market), Apollo Seshadripuram, Sparsh Yeshwanthpur, Manipal Yeshwanthpur, NIMHANS (South End), Jayadeva (Jayanagar).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600 animate-pulse" />
              <h4 className="font-extrabold text-xs text-amber-950 uppercase tracking-wider">
                Yellow Line (South - Electronic City)
              </h4>
            </div>
            <p className="text-xs text-amber-900 font-medium">
              RV Road ↔ Jayadeva Interchange ↔ Silk Board ↔ Electronic City ↔ Bommasandra
            </p>
            <p className="text-[11px] text-slate-600">
              <strong>Serves:</strong> Jayadeva Institute, Apollo & Fortis (Bannerghatta connector), Narayana Health City (Bommasandra).
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="input-hospital-search"
            placeholder="Search by Hospital name (e.g. Manipal, Apollo, Victoria, NIMHANS), Locality (e.g. Jayanagar, Whitefield) or Specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Bengaluru Zone Filters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              Filter by Bengaluru Zone:
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {zones.map((zone) => (
              <button
                key={zone}
                id={`btn-zone-${zone.toLowerCase()}`}
                onClick={() => setSelectedZone(zone)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedZone === zone
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {zone === 'All' ? 'All Bengaluru' : `${zone} Bengaluru`}
              </button>
            ))}
          </div>
        </div>

        {/* Type & 24/7 Toggles */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedType('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                selectedType === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All Types ({BENGALURU_HOSPITALS.length})
            </button>
            <button
              onClick={() => setSelectedType('hospitals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                selectedType === 'hospitals' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              24/7 Hospitals
            </button>
            <button
              onClick={() => setSelectedType('govt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                selectedType === 'govt' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Govt Institutes
            </button>
            <button
              onClick={() => setSelectedType('jan_aushadhi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                selectedType === 'jan_aushadhi' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Jan Aushadhi Generic Stores
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl hover:bg-slate-200">
            <input
              type="checkbox"
              checked={only24x7}
              onChange={(e) => setOnly24x7(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500"
            />
            <span>Open 24/7 Only</span>
          </label>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFacilities.map((facility) => (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            id={`facility-card-${facility.id}`}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    {getTypeBadge(facility.type)}
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {facility.zone} Bengaluru
                    </span>
                    {facility.open24Hours && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        24x7 Open
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{facility.locality}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{facility.rating}</span>
                </div>
              </div>

              {/* Metro Station & Route Info */}
              {facility.nearestMetroStation && (
                <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${getMetroColor(facility.metroLine)}`}>
                  <Train className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold">Nearest Metro:</span> {facility.nearestMetroStation}
                    {facility.metroLine && <span className="opacity-80 ml-1">({facility.metroLine})</span>}
                  </div>
                </div>
              )}

              {/* Address */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {facility.address}
              </p>

              {/* Generic Discount Highlight */}
              {facility.genericMedicineDiscount && (
                <div className="bg-amber-50/80 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-900 font-medium">
                  <strong>💡 Generic Savings:</strong> {facility.genericMedicineDiscount}
                </div>
              )}

              {/* Key Features & Specialties */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Medical Services:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {facility.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {srv}
                    </span>
                  ))}
                  {facility.hasICU && (
                    <span className="text-[11px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-md border border-rose-200">
                      ✓ ICU / CCU
                    </span>
                  )}
                  {facility.hasBloodBank && (
                    <span className="text-[11px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-md border border-red-200">
                      ✓ Blood Bank
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons: Call & Open Map Route */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`tel:${facility.phone.replace(/\s+/g, '')}`}
                id={`btn-call-${facility.id}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {facility.emergencyPhone ? 'Emergency / Desk' : 'Pharmacy'}</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.googleMapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                id={`btn-map-route-${facility.id}`}
                className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-teal-600" />
                <span>Get Route</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-lg">No matching medical facilities found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords or reset zone filters to view all hospitals across Bengaluru.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedZone('All');
              setSelectedType('All');
              setOnly24x7(false);
            }}
            className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
