import React, { useState } from 'react';
import {
  ClipboardCheck,
  Search,
  Plus,
  Calendar,
  Building,
  CheckCircle2,
  Camera,
  Layers,
  Zap,
  MapPin,
  X
} from 'lucide-react';
import { SiteSurvey, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface SiteSurveysViewProps {
  currentUser: AdminUser;
}

export const SiteSurveysView: React.FC<SiteSurveysViewProps> = ({ currentUser }) => {
  const surveys = adminStore.getSurveys();
  const [selectedSurvey, setSelectedSurvey] = useState<SiteSurvey | null>(surveys[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for new survey
  const [customerName, setCustomerName] = useState('');
  const [surveyor, setSurveyor] = useState(currentUser.name);
  const [propertyType, setPropertyType] = useState('Industrial Warehouse');
  const [roofType, setRoofType] = useState('Trapezoidal Sheet Metal');
  const [roofArea, setRoofArea] = useState('8500');
  const [electricalSystem, setElectricalSystem] = useState('3-Phase 400V / 11kV Substation');
  const [transformerRating, setTransformerRating] = useState('1500');
  const [meterMpan, setMeterMpan] = useState('12 0001 9988 771');
  const [notes, setNotes] = useState('');

  const handleCreateSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;

    const newSurv = adminStore.addSurvey({
      customerName,
      surveyor,
      date: new Date().toISOString().substring(0, 10),
      propertyType,
      roofType,
      roofAreaSqMeters: Number(roofArea) || 1000,
      orientation: 'South (180°)',
      pitchDegrees: 8,
      shadingAnalysis: 'NONE',
      electricalSystem,
      transformerRatingKva: Number(transformerRating) || 500,
      mainSwitchboardCondition: 'EXCELLENT',
      meterMpan,
      structuralNotes: 'Verified purlins spacing and wind uplift load capacity.',
      generalNotes: notes || 'Site survey logged successfully.',
      photos: [
        {
          id: `PHT-${Date.now()}`,
          category: 'ROOF',
          url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
          caption: 'Roof overview photo',
          uploadedAt: new Date().toISOString().substring(0, 10)
        }
      ],
      status: 'COMPLETED'
    });

    setSelectedSurvey(newSurv);
    setShowCreateModal(false);
  };

  const filteredSurveys = surveys.filter((s) =>
    s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.surveyor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Site Survey & Electrical Infrastructure Module
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {surveys.length} Logged Surveys
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            3D LiDAR roof audits, structural load checks, transformer kVA ratings, MPAN metering and DNO substation data.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ LOG SITE SURVEY</span>
        </button>
      </div>

      {/* Main Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Survey List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search surveys by customer or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-sm text-xs font-mono focus:outline-none focus:border-[#7AAA2B]"
            />
          </div>

          <div className="space-y-2">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.id}
                onClick={() => setSelectedSurvey(survey)}
                className={`p-4 rounded-sm border transition-all cursor-pointer space-y-2 ${
                  selectedSurvey?.id === survey.id
                    ? 'bg-[#06152F] text-white border-[#7AAA2B] shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${
                    selectedSurvey?.id === survey.id ? 'text-[#7AAA2B]' : 'text-[#FF6321]'
                  }`}>
                    {survey.id}
                  </span>
                  <span className="text-[10px] font-mono opacity-70">
                    {survey.date}
                  </span>
                </div>

                <div className="font-bold text-sm line-clamp-1">
                  {survey.customerName}
                </div>

                <div className="text-xs opacity-80 font-mono">
                  {survey.propertyType} • {survey.roofAreaSqMeters.toLocaleString()} m²
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-200/40">
                  <span>Surveyor: {survey.surveyor.split(',')[0]}</span>
                  <span className="text-emerald-400 font-bold uppercase">{survey.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Survey Detail Dossier */}
        <div className="lg:col-span-2">
          {selectedSurvey ? (
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6321]">
                      {selectedSurvey.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold">
                      {selectedSurvey.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 uppercase font-display mt-1">
                    {selectedSurvey.customerName}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Audited on {selectedSurvey.date} by {selectedSurvey.surveyor}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Roof Cladding Type</span>
                  <strong className="text-slate-800">{selectedSurvey.roofType}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Usable Roof Area</span>
                  <strong className="text-[#7AAA2B] font-mono text-sm">{selectedSurvey.roofAreaSqMeters.toLocaleString()} m²</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Orientation & Pitch</span>
                  <strong className="text-slate-800 font-mono">{selectedSurvey.orientation} ({selectedSurvey.pitchDegrees}°)</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Electrical Supply</span>
                  <strong className="text-slate-800 font-mono">{selectedSurvey.electricalSystem}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Transformer Rating</span>
                  <strong className="text-slate-800 font-mono">{selectedSurvey.transformerRatingKva} kVA</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Meter MPAN</span>
                  <strong className="text-slate-800 font-mono">{selectedSurvey.meterMpan}</strong>
                </div>
              </div>

              {/* Structural & Electrical Notes */}
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-1">
                    Structural Integrity & Purlin Load Audit
                  </span>
                  <p className="text-slate-600 leading-relaxed font-sans">
                    {selectedSurvey.structuralNotes}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-1">
                    General Access, Cable Runs & Safety Notes
                  </span>
                  <p className="text-slate-600 leading-relaxed font-sans">
                    {selectedSurvey.generalNotes}
                  </p>
                </div>
              </div>

              {/* Photo Upload Gallery */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#7AAA2B]" />
                  Uploaded Site Photos & SLD Diagrams ({selectedSurvey.photos.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedSurvey.photos.map((pht) => (
                    <div key={pht.id} className="group relative rounded-sm overflow-hidden border border-slate-200 bg-slate-100 aspect-video">
                      <img
                        src={pht.url}
                        alt={pht.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] text-white font-mono truncate">{pht.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 font-mono bg-white rounded-sm border border-slate-200">
              Select a site survey from the list to view the technical dossier.
            </div>
          )}
        </div>

      </div>

      {/* Log Site Survey Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-sm border border-slate-300 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 uppercase font-display">
                Log New Site Survey Dossier
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-sm text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSurvey} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-mono mb-1">Customer / Site Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Northampton Logistics Terminal"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-sm focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Surveyor (CEng/MCS)</label>
                  <input
                    type="text"
                    required
                    value={surveyor}
                    onChange={(e) => setSurveyor(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Property Type</label>
                  <input
                    type="text"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Roof Cladding Type</label>
                  <input
                    type="text"
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Usable Roof Area (m²)</label>
                  <input
                    type="number"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Transformer Rating (kVA)</label>
                  <input
                    type="number"
                    value={transformerRating}
                    onChange={(e) => setTransformerRating(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-mono mb-1">Meter MPAN Reference</label>
                  <input
                    type="text"
                    value={meterMpan}
                    onChange={(e) => setMeterMpan(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-mono mb-1">Structural & Engineering Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Note purlin spacing, G99 trip settings, cable route..."
                  className="w-full p-2 border border-slate-300 rounded-sm focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-sm text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 mini-tag bg-[#7AAA2B] text-[#06152F] font-bold rounded-sm cursor-pointer"
                >
                  Save Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
