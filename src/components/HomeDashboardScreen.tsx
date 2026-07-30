import React, { useState } from 'react';
import { SoundTrigger, AlertItem } from '../types';
import { triggerHapticFeedback } from '../utils/haptics';
import { Bluetooth, Battery, PhoneCall, Radio, Play } from 'lucide-react';
import { WaveformVisualizer } from './WaveformVisualizer';

interface HomeDashboardScreenProps {
  triggers: SoundTrigger[];
  onToggleTrigger: (id: string) => void;
  onNavigateTab: (tab: any) => void;
  onTriggerSimulatedAlert: (alert: AlertItem) => void;
}

export const HomeDashboardScreen: React.FC<HomeDashboardScreenProps> = ({
  triggers,
  onToggleTrigger,
  onNavigateTab,
  onTriggerSimulatedAlert,
}) => {
  const [activePulse, setActivePulse] = useState<string | null>(null);
  const [batteryLevel] = useState(88);

  const handleTestTrigger = (trigger: SoundTrigger) => {
    setActivePulse(trigger.id);
    const patternKey =
      trigger.category === 'Hazard'
        ? 'hazard'
        : trigger.category === 'Traffic'
        ? 'traffic'
        : trigger.category === 'Calls'
        ? 'call'
        : trigger.title.includes('Baby')
        ? 'baby'
        : 'name';

    triggerHapticFeedback(patternKey, trigger.intensity);

    // Also push a simulated alert item into recent alerts history
    const newAlert: AlertItem = {
      id: `sim-${Date.now()}`,
      type: trigger.title,
      category: trigger.category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAndDate: `${new Date().toISOString().split('T')[0]} • Live Detection`,
      locationTag: trigger.category === 'Traffic' ? 'Outside' : 'Home',
      waveformPattern: trigger.waveformPattern,
      icon: trigger.icon,
      urgency: trigger.urgency,
      details: `Test haptic pulse triggered for ${trigger.title}. Vibration intensity set to ${trigger.intensity || 'high'}.`,
    };
    onTriggerSimulatedAlert(newAlert);

    setTimeout(() => {
      setActivePulse(null);
    }, 2500);
  };

  // Quick categories matching Screen 2 toggles: Fire & Hazards, Traffic, Voice Calls, Baby Cry
  const quickCategories = [
    { key: 'Fire & Hazards', category: 'Hazard', id: 't-1' },
    { key: 'Traffic', category: 'Traffic', id: 't-2' },
    { key: 'Voice Calls', category: 'Calls', id: 't-5' },
    { key: 'Baby Cry', category: 'Social', id: 't-3' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#faf8ff] p-5 space-y-6">
      {/* App & Connectivity Header */}
      <div className="flex justify-between items-center pt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131b2e]">HaptiQ</h1>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#eaedff] border border-[#bcc9c6] rounded-full px-3 py-1">
          <Bluetooth className="w-4 h-4 text-[#00a396]" />
          <span className="w-2 h-2 rounded-full bg-[#00a396] animate-pulse"></span>
          <span className="text-xs font-semibold text-[#006a62]">connected</span>
        </div>
      </div>

      {/* Central Visualizer: HaptiQ Wristband Interactive Graphic */}
      <div className="bg-white border border-[#bcc9c6] rounded-3xl p-6 flex flex-col items-center justify-center text-center relative shadow-sm overflow-hidden">
        {/* Pulsing rings visualizer */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-3">
          <div
            className={`absolute inset-0 rounded-full border-2 border-[#00a396]/30 ${
              activePulse ? 'haptic-pulse-fast bg-[#00a396]/10' : 'haptic-pulse'
            }`}
          ></div>
          <div
            className={`absolute w-36 h-36 rounded-full border border-[#00a396]/40 ${
              activePulse ? 'haptic-pulse-fast' : 'haptic-pulse'
            }`}
            style={{ animationDelay: '0.8s' }}
          ></div>

          {/* Wristband Central Diagram SVG */}
          <div className="relative z-10 w-28 h-28 bg-[#faf8ff] rounded-full border-2 border-[#006a62] flex flex-col items-center justify-center shadow-inner">
            <div className="relative flex items-center justify-center">
              {/* Wristband body graphic */}
              <svg className="w-20 h-20 text-[#006a62]" viewBox="0 0 100 100" fill="none">
                <rect x="25" y="15" width="50" height="70" rx="25" stroke="currentColor" strokeWidth="4" />
                <rect x="35" y="25" width="30" height="50" rx="15" fill="#eaedff" stroke="currentColor" strokeWidth="3" />
                {/* Haptic sensor circles */}
                <circle cx="50" cy="50" r="8" fill={activePulse ? '#ba1a1a' : '#00a396'} className={activePulse ? 'animate-ping' : ''} />
                <path d="M 40 50 Q 50 40 60 50" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M 40 55 Q 50 65 60 55" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status text */}
        <h2 className="text-lg font-bold text-[#131b2e] mb-1">
          {activePulse ? 'Transmitting Haptic Pulse...' : 'HaptiQ Band Connected'}
        </h2>
        
        {/* Battery Level */}
        <div className="flex items-center space-x-1.5 text-xs text-[#505f76] font-medium bg-[#f2f3ff] px-2.5 py-1 rounded-full border border-[#bcc9c6]">
          <span>Battery</span>
          <div className="flex items-center space-x-1">
            <Battery className="w-4 h-4 text-[#006a62]" />
            <span className="font-bold text-[#006a62]">{batteryLevel}%</span>
          </div>
        </div>

        {activePulse && (
          <div className="mt-3 w-full max-w-xs">
            <WaveformVisualizer type="hazard-pulse" active={true} color="#ba1a1a" className="h-6" />
          </div>
        )}
      </div>

      {/* Action Shortcut Banner */}
      <div className="flex space-x-2">
        <button
          id="btn-quick-live-call"
          onClick={() => onNavigateTab('live-call')}
          className="flex-1 bg-[#006a62] hover:bg-[#00302c] text-white p-3.5 rounded-2xl flex items-center justify-center space-x-2 text-sm font-semibold shadow-sm transition active:scale-95"
        >
          <PhoneCall className="w-4 h-4 text-[#7cf6e7]" />
          <span>Launch Live Call</span>
        </button>
        <button
          id="btn-quick-test-mic"
          onClick={() => {
            const hazardTrigger = triggers.find((t) => t.category === 'Hazard') || triggers[0];
            handleTestTrigger(hazardTrigger);
          }}
          className="bg-[#eaedff] border border-[#bcc9c6] hover:bg-[#dae2fd] text-[#006a62] px-4 py-3.5 rounded-2xl flex items-center space-x-1.5 text-sm font-semibold transition active:scale-95"
        >
          <Radio className="w-4 h-4" />
          <span>Test Pulse</span>
        </button>
      </div>

      {/* Fast Toggles List (as in Screen 2 wireframe) */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider font-bold text-[#505f76] px-1">
          Active Sound Detection
        </h3>
        <div className="space-y-2">
          {quickCategories.map((qc) => {
            const trigger = triggers.find((t) => t.id === qc.id) || {
              id: qc.id,
              title: qc.key,
              enabled: true,
            };

            return (
              <div
                key={qc.id}
                id={`dashboard-toggle-${qc.id}`}
                className="bg-white border border-[#bcc9c6] rounded-2xl p-4 flex items-center justify-between shadow-xs transition hover:border-[#00a396]"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleTestTrigger(trigger as SoundTrigger)}
                    className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#006a62] flex items-center justify-center hover:bg-[#00a396] hover:text-white transition"
                    title="Test vibration pattern"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                  <span className="font-semibold text-sm text-[#131b2e]">{qc.key}</span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trigger.enabled}
                    onChange={() => onToggleTrigger(trigger.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#bcc9c6] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a396]"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
