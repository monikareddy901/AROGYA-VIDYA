import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  AlertTriangle,
  Shield,
  Heart,
  QrCode,
  Download,
  Share2,
  Edit2,
  Check,
  User,
  HeartPulse,
  Flame,
  Activity,
  AlertOctagon,
  FileCheck
} from 'lucide-react';
import { EmergencyHealthCard, LanguageCode } from '../types';
import { HealthBridgeStorage } from '../services/api';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'helplines' | 'card' | 'firstaid' | 'redflags'>('helplines');
  const [card, setCard] = useState<EmergencyHealthCard>(() => HealthBridgeStorage.getEmergencyCard());
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [editForm, setEditForm] = useState<EmergencyHealthCard>(card);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const helplines = [
    { name: 'National Emergency Number', number: '112', desc: 'Unified Police, Fire & Medical', primary: true },
    { name: 'Ambulance Services', number: '108 / 102', desc: 'Emergency Medical Transport', primary: true },
    { name: 'Tele-MANAS Mental Health', number: '14416', desc: '24/7 Psychological Support & Crisis Counseling' },
    { name: 'Women Helpline (Domestic/Crisis)', number: '1091', desc: '24/7 Safety & Immediate Support' },
    { name: 'Poison Information Center', number: '1800-116-117', desc: 'Toxic Ingestion & Chemical Exposures' },
    { name: 'Child Helpline', number: '1098', desc: 'Child Welfare & Emergency Assistance' },
    { name: 'Disaster Helpline (NDRF)', number: '1078', desc: 'Natural Disasters & Search-Rescue' },
  ];

  const redFlags = [
    { title: 'Severe Chest Pain / Pressure', desc: 'Crushing chest tightness, pain radiating to left arm/jaw, accompanied by cold sweats or dizziness.' },
    { title: 'Sudden Weakness or Slurred Speech', desc: 'Facial drooping, arm weakness on one side, inability to speak clearly (Sign of Stroke / F.A.S.T.).' },
    { title: 'Severe Shortness of Breath', desc: 'Inability to speak in full sentences, gasping, blue/gray lips or nailbeds, severe wheezing.' },
    { title: 'Loss of Consciousness / Unresponsiveness', desc: 'Fainting with delayed recovery, seizures in a non-epileptic person, or altered mental state.' },
    { title: 'Uncontrolled Severe Bleeding', desc: 'Pulsing or continuous heavy blood flow not stopping after 5 minutes of direct firm pressure.' },
    { title: 'Severe Anaphylaxis / Allergic Reaction', desc: 'Throat swelling, difficulty breathing, widespread hives after medication, insect sting, or food.' },
  ];

  const firstAidGuides = [
    {
      title: 'CPR (Adult Hands-Only)',
      steps: [
        '1. Check responsiveness and call 112 immediately.',
        '2. Place heel of one hand in center of chest, place other hand on top.',
        '3. Push hard and fast (100–120 beats per minute, 2 inches deep) to the beat of "Stayin Alive".',
        '4. Do not stop compressions until paramedics arrive or AED is applied.'
      ]
    },
    {
      title: 'Choking (Heimlich Maneuver)',
      steps: [
        '1. If person cannot breathe, speak, or cough, stand behind them.',
        '2. Wrap arms around waist. Make a fist with one hand above navel.',
        '3. Grasp fist with other hand and give quick upward inward thrusts.',
        '4. Continue until obstruction is expelled or emergency medical team arrives.'
      ]
    },
    {
      title: 'Severe Bleeding Control',
      steps: [
        '1. Apply firm, direct pressure over wound with a clean cloth or sterile gauze.',
        '2. Maintain steady pressure for at least 5–10 minutes without lifting cloth to peek.',
        '3. If bleeding soaks through, add more layers without removing original layer.',
        '4. Keep injured limb elevated above heart level if no fractures are suspected.'
      ]
    },
    {
      title: 'Burns & Scalds',
      steps: [
        '1. Immediately cool the burn with cool running tap water for at least 10–20 minutes.',
        '2. NEVER apply ice, toothpaste, butter, or oil to a burn.',
        '3. Remove tight jewelry or clothing before swelling begins (unless stuck to skin).',
        '4. Cover loosely with sterile, non-stick plastic wrap or clean dressing.'
      ]
    }
  ];

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = HealthBridgeStorage.saveEmergencyCard(editForm);
    setCard(updated);
    setIsEditingCard(false);
  };

  const handlePrintCard = () => {
    window.print();
  };

  const handleShareCard = () => {
    const text = `🚨 HealthBridge Emergency Card\nName: ${card.fullName}\nBlood Group: ${card.bloodGroup}\nAllergies: ${card.allergies.join(', ') || 'None'}\nConditions: ${card.chronicConditions.join(', ') || 'None'}\nEmergency Contact: ${card.emergencyContacts[0]?.name} (${card.emergencyContacts[0]?.phone})`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-red-200 max-w-4xl w-full overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Red Alert Theme */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <AlertOctagon className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display">
                  Emergency Safety Hub
                </h2>
                <p className="text-xs text-red-100 mt-0.5">
                  Immediate 24/7 Helplines • Emergency Card • Red-Flag Triage • First Aid
                </p>
              </div>
            </div>

            <button
              id="btn-close-emergency-modal"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              id="tab-emergency-helplines"
              onClick={() => setActiveTab('helplines')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'helplines'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency Numbers (112)</span>
            </button>

            <button
              id="tab-emergency-card"
              onClick={() => setActiveTab('card')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Digital Health Card</span>
            </button>

            <button
              id="tab-emergency-redflags"
              onClick={() => setActiveTab('redflags')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'redflags'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Red-Flag Warning Signs</span>
            </button>

            <button
              id="tab-emergency-firstaid"
              onClick={() => setActiveTab('firstaid')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'firstaid'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>First Aid Guides</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 text-sm">
          
          {/* TAB 1: Emergency Helplines */}
          {activeTab === 'helplines' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs text-red-950">
                  <p className="font-bold text-sm text-red-900 mb-1">
                    Life-Threatening Emergency Protocol
                  </p>
                  <p>
                    If someone is unconscious, gasping for air, suffering sudden chest pain, slurring speech, or bleeding profusely, do not wait. Call <strong>112</strong> immediately.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {helplines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                      line.primary
                        ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{line.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{line.desc}</p>
                    </div>
                    <a
                      id={`call-btn-${line.number.replace(/\D/g, '')}`}
                      href={`tel:${line.number.split('/')[0].trim()}`}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 ${
                        line.primary
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{line.number}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Emergency Health Card */}
          {activeTab === 'card' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Personal Digital Emergency Health Card
                  </h3>
                  <p className="text-xs text-slate-500">
                    Essential medical data for first responders and ER personnel.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="btn-edit-emergency-card"
                    onClick={() => setIsEditingCard(!isEditingCard)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{isEditingCard ? 'Cancel' : 'Edit Info'}</span>
                  </button>
                  <button
                    id="btn-share-emergency-card"
                    onClick={handleShareCard}
                    className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>
                  <button
                    id="btn-print-emergency-card"
                    onClick={handlePrintCard}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Card</span>
                  </button>
                </div>
              </div>

              {isEditingCard ? (
                <form onSubmit={handleSaveCard} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                      <select
                        value={editForm.bloodGroup}
                        onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 outline-hidden"
                      >
                        {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Unknown'].map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Known Allergies (comma separated)</label>
                      <input
                        type="text"
                        value={editForm.allergies.join(', ')}
                        onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 outline-hidden"
                        placeholder="Penicillin, Peanuts, Latex..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Chronic Conditions (comma separated)</label>
                      <input
                        type="text"
                        value={editForm.chronicConditions.join(', ')}
                        onChange={(e) => setEditForm({ ...editForm, chronicConditions: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 outline-hidden"
                        placeholder="Asthma, Type 2 Diabetes, Hypertension..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Emergency Contact Name & Phone</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editForm.emergencyContacts[0]?.name || ''}
                        onChange={(e) => {
                          const updated = [...editForm.emergencyContacts];
                          updated[0] = { ...updated[0], name: e.target.value, relation: updated[0]?.relation || 'Family', isPrimary: true };
                          setEditForm({ ...editForm, emergencyContacts: updated });
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                        placeholder="Contact Name (e.g., Mom / Spouse)"
                      />
                      <input
                        type="tel"
                        value={editForm.emergencyContacts[0]?.phone || ''}
                        onChange={(e) => {
                          const updated = [...editForm.emergencyContacts];
                          updated[0] = { ...updated[0], phone: e.target.value, relation: updated[0]?.relation || 'Family', isPrimary: true };
                          setEditForm({ ...editForm, emergencyContacts: updated });
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                        placeholder="Emergency Phone (+91 98765 43210)"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingCard(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Emergency Card</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Card Visual Representation */
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-red-500/50 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                        +
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base tracking-wider uppercase">
                          Emergency Medical ID
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          HealthBridge Autonomous Patient Card
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-red-600/30 text-red-300 border border-red-500/40 rounded-full text-xs font-extrabold">
                        BLOOD: {card.bloodGroup}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Patient Name</span>
                      <span className="font-bold text-sm text-white mt-0.5 block">{card.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Allergies</span>
                      <span className="font-semibold text-rose-300 mt-0.5 block">
                        {card.allergies.length > 0 ? card.allergies.join(', ') : 'None Reported'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Conditions</span>
                      <span className="font-semibold text-amber-300 mt-0.5 block">
                        {card.chronicConditions.length > 0 ? card.chronicConditions.join(', ') : 'None Reported'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Emergency Contact</span>
                      <span className="font-bold text-white mt-0.5 block">
                        {card.emergencyContacts[0]?.name || 'Primary Contact'} ({card.emergencyContacts[0]?.phone || 'Not set'})
                      </span>
                    </div>
                    {card.emergencyContacts[0]?.phone && (
                      <a
                        href={`tel:${card.emergencyContacts[0].phone}`}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Call Contact</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Red-Flag Signs */}
          {activeTab === 'redflags' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                These symptoms indicate a potentially critical condition requiring immediate emergency care at the nearest hospital or by calling 112.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {redFlags.map((rf, idx) => (
                  <div key={idx} className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-rose-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{rf.title}</span>
                    </h4>
                    <p className="text-xs text-rose-900/90 leading-relaxed">
                      {rf.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: First Aid Quick Guides */}
          {activeTab === 'firstaid' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {firstAidGuides.map((guide, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                      <HeartPulse className="w-4 h-4 text-teal-600" />
                      <span>{guide.title}</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {guide.steps.map((st, sidx) => (
                        <li key={sidx} className="leading-relaxed">
                          {st}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            For critical emergencies, always dial 112 directly.
          </span>
          <button
            id="btn-bottom-close-emergency"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Emergency Hub
          </button>
        </div>
      </div>
    </div>
  );
};
