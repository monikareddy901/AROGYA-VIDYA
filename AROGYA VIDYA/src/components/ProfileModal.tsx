import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  UserPlus, 
  UserCheck, 
  Users, 
  Heart, 
  Shield, 
  Briefcase, 
  Phone, 
  MapPin, 
  Droplet, 
  AlertTriangle, 
  Check, 
  Trash2,
  Sparkles,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { UserProfile, ProfessionType, LanguageCode } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onSaveProfile: (profile: UserProfile) => void;
  onDeleteProfile?: (profileId: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  profiles,
  onSelectProfile,
  onSaveProfile,
  onDeleteProfile
}) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editProfileId, setEditProfileId] = useState<string | null>(null);

  // New Profile Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 25,
    gender: 'Female' as 'Female' | 'Male' | 'Non-Binary' | 'Other',
    profession: 'software_engineer' as ProfessionType,
    professionTitle: '',
    bloodGroup: 'B Positive (B+)',
    city: 'Bengaluru',
    locality: '',
    chronicConditions: '',
    allergies: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    preferredLanguage: 'en' as LanguageCode
  });

  const bloodGroups = [
    'A Positive (A+)', 'A Negative (A-)',
    'B Positive (B+)', 'B Negative (B-)',
    'O Positive (O+)', 'O Negative (O-)',
    'AB Positive (AB+)', 'AB Negative (AB-)'
  ];

  const professions: { id: ProfessionType; label: string; icon: string }[] = [
    { id: 'software_engineer', label: 'Software / IT Engineer', icon: '💻' },
    { id: 'doctor_nurse', label: 'Doctor / Nurse / Healthcare', icon: '🩺' },
    { id: 'student', label: 'Student (School / College)', icon: '🎓' },
    { id: 'teacher', label: 'Teacher / Professor', icon: '🧑‍🏫' },
    { id: 'desk_corporate', label: 'Corporate / Desk / Banking Job', icon: '💼' },
    { id: 'field_worker', label: 'Field / Delivery / Construction Worker', icon: '🏗️' },
    { id: 'night_shift', label: 'Night Shift / BPO Specialist', icon: '🌙' },
    { id: 'homemaker', label: 'Homemaker / Full-time Caregiver', icon: '🏡' },
    { id: 'other', label: 'Other Profession', icon: '⚡' }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: 25,
      gender: 'Female',
      profession: 'software_engineer',
      professionTitle: '',
      bloodGroup: 'B Positive (B+)',
      city: 'Bengaluru',
      locality: '',
      chronicConditions: '',
      allergies: '',
      emergencyContactName: '',
      emergencyContactRelation: '',
      emergencyContactPhone: '',
      preferredLanguage: 'en'
    });
    setIsCreatingNew(false);
    setEditProfileId(null);
  };

  const handleStartCreate = () => {
    resetForm();
    setIsCreatingNew(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newProfile: UserProfile = {
      id: editProfileId || `usr-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@arogyavidya.care`,
      age: Number(formData.age),
      gender: formData.gender,
      profession: formData.profession,
      professionTitle: formData.professionTitle.trim() || professions.find(p => p.id === formData.profession)?.label,
      bloodGroup: formData.bloodGroup,
      city: formData.city.trim() || 'Bengaluru',
      locality: formData.locality.trim(),
      chronicConditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(s => s.trim()).filter(Boolean) : ['None'],
      allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : ['None'],
      emergencyContact: formData.emergencyContactName ? {
        name: formData.emergencyContactName,
        relation: formData.emergencyContactRelation || 'Family',
        phone: formData.emergencyContactPhone || '+91 98765 43210'
      } : undefined,
      preferredLanguage: formData.preferredLanguage,
      selectedTopics: ['hygiene_center', 'nutrition', 'mental_wellbeing'],
      isAdmin: false,
      isGuest: false,
      avatarUrl: formData.gender === 'Female' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSaveProfile(newProfile);
    onSelectProfile(newProfile);
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-teal-200">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Health & Family Profiles</h2>
                <p className="text-xs text-teal-200">
                  Switch or create health profiles for family members, students, and elders
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {!isCreatingNew ? (
              /* Profile Switcher List View */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Select Active Profile</h3>
                    <p className="text-xs text-slate-500">
                      Routines, health cards, and reminders adjust for the active person.
                    </p>
                  </div>
                  <button
                    onClick={handleStartCreate}
                    id="btn-create-another-profile"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Add Another Profile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profiles.map((p) => {
                    const isActive = p.id === currentProfile.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProfile(p);
                          onClose();
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                          isActive
                            ? 'border-teal-600 bg-teal-50/60 shadow-md'
                            : 'border-slate-200 hover:border-teal-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white font-black text-sm flex items-center justify-center border border-teal-600 shadow-xs flex-shrink-0">
                            {p.name ? p.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'MR'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-slate-900 truncate flex items-center gap-1.5">
                                {p.name}
                                {isActive && (
                                  <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-bold">
                                    Active
                                  </span>
                                )}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                              {p.professionTitle || p.profession || 'General Member'} • {p.age ? `${p.age} yrs` : ''}
                            </p>
                            <p className="text-[11px] text-teal-800 font-semibold mt-1">
                              🩸 {p.bloodGroup || 'Blood group not set'} • 📍 {p.locality || p.city || 'Bengaluru'}
                            </p>
                          </div>
                        </div>

                        {p.chronicConditions && p.chronicConditions.length > 0 && p.chronicConditions[0] !== 'None' && (
                          <div className="text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                            <strong>Care Notes:</strong> {p.chronicConditions.join(', ')}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="text-slate-500 font-medium">
                            Language: {p.preferredLanguage === 'kn' ? 'ಕನ್ನಡ (Kannada)' : p.preferredLanguage === 'hi' ? 'हिंदी (Hindi)' : p.preferredLanguage === 'te' ? 'తెలుగు (Telugu)' : 'English'}
                          </span>
                          <span className="font-bold text-teal-700 flex items-center gap-1">
                            {isActive ? 'Currently Active' : 'Switch to Profile'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Create New Profile Form */
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Create New Health Profile</h3>
                    <p className="text-xs text-slate-500">
                      Provide health and lifestyle details to personalize routines, precautions, and emergency cards.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                  >
                    Back to Profiles
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Monika Reddy, Suresh Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Age (Years) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={120}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-Binary">Non-Binary / Transgender</option>
                      <option value="Other">Other / Prefer not to say</option>
                    </select>
                  </div>

                  {/* Profession / Work */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Profession / Daily Work Style *
                    </label>
                    <select
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 font-medium"
                    >
                      {professions.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.icon} {prof.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Specific Job Title */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Specific Job Title (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Frontend Engineer, Staff Nurse, High School Student"
                      value={formData.professionTitle}
                      onChange={(e) => setFormData({ ...formData, professionTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Blood Group */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Blood Group *
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50"
                    >
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City & Locality */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      City & Locality (Bengaluru)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Indiranagar, Whitefield, Jayanagar"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Preferred Language */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Preferred Language
                    </label>
                    <select
                      value={formData.preferredLanguage}
                      onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 font-medium"
                    >
                      <option value="en">English</option>
                      <option value="kn">ಕನ್ನಡ (Kannada)</option>
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="te">తెలుగు (Telugu)</option>
                    </select>
                  </div>

                  {/* Chronic Health Conditions */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Chronic Health Conditions (Comma Separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Diabetes, Hypertension, Asthma, Thyroid, None"
                      value={formData.chronicConditions}
                      onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Allergies */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Known Allergies (Crucial for Emergency ID)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Penicillin, Peanuts, Sulfa Drugs, Dust, None"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Emergency Contact Section */}
                  <div className="sm:col-span-2 pt-3 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-teal-600" />
                      Emergency Contact Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Contact Person Name"
                        value={formData.emergencyContactName}
                        onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-slate-50"
                      />
                      <input
                        type="text"
                        placeholder="Relationship (e.g. Father, Spouse)"
                        value={formData.emergencyContactRelation}
                        onChange={(e) => setFormData({ ...formData, emergencyContactRelation: e.target.value })}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-slate-50"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number (+91 ...)"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btn-save-profile"
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save & Activate Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
