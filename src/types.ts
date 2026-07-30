export type HearingLossDegree = 'mild' | 'moderate' | 'profound';
export type PreferredLanguage = 'English/Swahili' | 'English' | 'Swahili';

export interface UserProfile {
  name: string;
  age: number | string;
  degreeOfHearingLoss: HearingLossDegree;
  preferredLanguage: PreferredLanguage;
  profilePhotoUrl?: string;
}

export type TriggerCategory = 'Hazard' | 'Traffic' | 'Social' | 'Calls' | 'Custom';
export type UrgencyLevel = 'high' | 'medium' | 'low';

export interface SoundTrigger {
  id: string;
  title: string;
  subtitle?: string;
  category: TriggerCategory;
  waveformPattern: 'hazard-pulse' | 'traffic-double' | 'baby-wave' | 'name-staccato' | 'phone-buzz' | 'custom-pattern';
  enabled: boolean;
  icon: string; // Lucide or Material symbol name
  urgency: UrgencyLevel;
  isCustom?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  vibrationPatternIndex?: number;
}

export type LocationTag = 'Home' | 'Outside' | 'Office' | 'Transit';

export interface AlertItem {
  id: string;
  type: string;
  category: TriggerCategory;
  timestamp: string;
  timeAndDate: string;
  locationTag: LocationTag;
  waveformPattern: string;
  icon: string;
  urgency: UrgencyLevel;
  details?: string;
}

export interface CallMessage {
  id: string;
  speaker: 'Caller' | 'You';
  text: string;
  translatedText?: string;
  timestamp: string;
}

export type NavTab = 'home' | 'triggers' | 'alerts' | 'profile' | 'create-trigger' | 'live-call';
export type MainViewMode = 'app-wireframes' | 'landing-page';
