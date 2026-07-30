import React, { useState } from 'react';
import { UserProfile, HearingLossDegree, PreferredLanguage } from '../types';
import { Upload, CheckCircle2, UserCheck } from 'lucide-react';

interface OnboardingProfileScreenProps {
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  onGetStarted: () => void;
}

export const OnboardingProfileScreen: React.FC<OnboardingProfileScreenProps> = ({
  profile,
  onSaveProfile,
  onGetStarted,
}) => {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [degree, setDegree] = useState<HearingLossDegree>(profile.degreeOfHearingLoss);
  const [language, setLanguage] = useState<PreferredLanguage>(profile.preferredLanguage);
  const [photoUrl, setPhotoUrl] = useState(profile.profilePhotoUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name,
      age,
      degreeOfHearingLoss: degree,
      preferredLanguage: language,
      profilePhotoUrl: photoUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onGetStarted();
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#faf8ff] p-5 justify-between">
      <div className="space-y-6 max-w-md mx-auto w-full pt-2 pb-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#131b2e]">HaptiQ</h1>
          <p className="text-sm font-medium text-[#006a62]">Feel Your World</p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Name Field */}
          <div>
            <label id="label-name" className="block text-sm font-medium text-[#131b2e] mb-1.5">
              Name
            </label>
            <input
              id="input-profile-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-[#eef0ff] border border-[#bcc9c6] rounded-xl px-4 py-3 text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00a396] transition"
            />
          </div>

          {/* Age Field */}
          <div>
            <label id="label-age" className="block text-sm font-medium text-[#131b2e] mb-1.5">
              Age
            </label>
            <input
              id="input-profile-age"
              type="number"
              required
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your age"
              className="w-full bg-[#eef0ff] border border-[#bcc9c6] rounded-xl px-4 py-3 text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00a396] transition"
            />
          </div>

          {/* Degree of Hearing Loss */}
          <div>
            <label id="label-[#degree]" className="block text-sm font-medium text-[#131b2e] mb-2">
              Degree of hearing loss
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['mild', 'moderate', 'profound'] as HearingLossDegree[]).map((level) => (
                <button
                  key={level}
                  id={`btn-degree-${level}`}
                  type="button"
                  onClick={() => setDegree(level)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium capitalize border transition-all ${
                    degree === level
                      ? 'bg-[#006a62] text-white border-[#006a62] shadow-sm'
                      : 'bg-white text-[#505f76] border-[#bcc9c6] hover:border-[#006a62]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label id="label-language" className="block text-sm font-medium text-[#131b2e] mb-1.5">
              Preferred language
            </label>
            <select
              id="select-preferred-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as PreferredLanguage)}
              className="w-full bg-[#eef0ff] border border-[#bcc9c6] rounded-xl px-4 py-3 text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00a396] transition"
            >
              <option value="English/Swahili">English/Swahili</option>
              <option value="English">English</option>
              <option value="Swahili">Swahili</option>
            </select>
          </div>

          {/* Profile Photo */}
          <div>
            <label id="label-profile-photo" className="block text-sm font-medium text-[#131b2e] mb-1.5">
              Profile photo
            </label>
            <div className="relative border-2 border-dashed border-[#bcc9c6] rounded-2xl p-4 bg-[#f2f3ff] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#eaedff] transition">
              <input
                id="input-file-photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {photoUrl ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={photoUrl}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#00a396]"
                  />
                  <span className="text-xs text-[#006a62] font-semibold">Change photo</span>
                </div>
              ) : (
                <div className="space-y-2 flex flex-col items-center py-2">
                  <Upload className="w-8 h-8 text-[#505f76]" />
                  <span className="text-sm font-medium text-[#505f76]">Profile photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            id="btn-get-started"
            type="submit"
            className="w-full bg-[#00a396] hover:bg-[#006a62] text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                <span>Saved & Launching...</span>
              </>
            ) : (
              <>
                <UserCheck className="w-5 h-5" />
                <span>Get Started</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
