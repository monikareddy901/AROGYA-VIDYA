import React, { useState } from 'react';
import { Users, UserPlus, Heart, Shield, Check, Trash2, Edit3, Pill, FileText, PhoneCall } from 'lucide-react';
import { FamilyMember, LanguageCode, UserProfile } from '../types';
import { HealthBridgeStorage } from '../services/api';

interface FamilyCareViewProps {
  user: UserProfile;
  language: LanguageCode;
  onOpenEmergency: () => void;
}

export const FamilyCareView: React.FC<FamilyCareViewProps> = ({ user, language, onOpenEmergency }) => {
  const [family, setFamily] = useState<FamilyMember[]>(() => HealthBridgeStorage.getFamilyMembers());
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Parent');
  const [age, setAge] = useState<number>(55);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: FamilyMember = {
      id: 'fam-' + Date.now(),
      name: name.trim(),
      relation,
      age: Number(age) || 30,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      allowSharedReminders: true,
      allowEmergencyCardView: true,
      allowFullReportView: false,
    };

    const updated = HealthBridgeStorage.addFamilyMember(newMember);
    setFamily(updated);
    setShowAddModal(false);
    setName('');
  };

  const handleRemoveMember = (id: string) => {
    const updated = HealthBridgeStorage.removeFamilyMember(id);
    setFamily(updated);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
                Family Care & Multi-Profile Hub
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100">
                Coordinate health schedules, medication alerts, and emergency access for dependents and loved ones.
              </p>
            </div>
          </div>

          <button
            id="btn-add-family-member"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-indigo-700" />
            <span>Add Dependent / Member</span>
          </button>
        </div>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Current User Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-teal-500 shadow-sm relative">
          <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-teal-50 text-teal-800 text-[10px] font-bold rounded-full border border-teal-200">
            Account Holder
          </span>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white font-black text-sm flex items-center justify-center border border-teal-600 shadow-xs flex-shrink-0">
              {user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'MR'}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500">Primary Profile ({user.age || 26} yrs)</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span>Emergency Access:</span>
              <span className="font-semibold text-emerald-700">Full Owner</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Medication Sync:</span>
              <span className="font-semibold text-teal-700">Active</span>
            </div>
          </div>
        </div>

        {/* Family Members */}
        {family.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{member.name}</h3>
                    <p className="text-xs text-slate-500">{member.relation} • {member.age} yrs</p>
                  </div>
                </div>
                <button
                  id={`btn-remove-family-${member.id}`}
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Remove Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span>Shared Reminders:</span>
                  <span className={member.allowSharedReminders ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                    {member.allowSharedReminders ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Emergency Card:</span>
                  <span className={member.allowEmergencyCardView ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                    {member.allowEmergencyCardView ? 'Linked' : 'Restricted'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={onOpenEmergency}
                className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Emergency Card</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Family Profile</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  placeholder="e.g. Ramesh Kumar"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Child">Child</option>
                    <option value="Spouse">Spouse / Partner</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Other">Other Dependent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
