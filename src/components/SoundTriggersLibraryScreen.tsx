import React from 'react';
import { SoundTrigger } from '../types';
import { WaveformVisualizer } from './WaveformVisualizer';
import { triggerHapticFeedback } from '../utils/haptics';
import { Plus, Flame, Car, Baby, UserCheck, PhoneIncoming, BellRing, Play } from 'lucide-react';

interface SoundTriggersLibraryScreenProps {
  triggers: SoundTrigger[];
  onToggleTrigger: (id: string) => void;
  onOpenCreateTrigger: () => void;
}

export const SoundTriggersLibraryScreen: React.FC<SoundTriggersLibraryScreenProps> = ({
  triggers,
  onToggleTrigger,
  onOpenCreateTrigger,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame':
        return <Flame className="w-5 h-5 text-[#ba1a1a]" />;
      case 'car':
        return <Car className="w-5 h-5 text-[#006a62]" />;
      case 'baby':
        return <Baby className="w-5 h-5 text-[#855300]" />;
      case 'user-check':
        return <UserCheck className="w-5 h-5 text-[#00a396]" />;
      case 'phone-incoming':
        return <PhoneIncoming className="w-5 h-5 text-[#505f76]" />;
      default:
        return <BellRing className="w-5 h-5 text-[#006a62]" />;
    }
  };

  const handleTestPattern = (trigger: SoundTrigger) => {
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
  };

  const presetTriggers = triggers.filter((t) => !t.isCustom);
  const customTriggers = triggers.filter((t) => t.isCustom);

  return (
    <div className="flex flex-col min-h-full bg-[#faf8ff] p-5 space-y-5">
      {/* Title Header */}
      <div className="text-center pt-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#131b2e]">Sound Triggers</h1>
        <p className="text-xs text-[#505f76] mt-0.5">Customize tactile response patterns for ambient sounds</p>
      </div>

      {/* Preset Triggers Section */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider font-bold text-[#505f76] px-1">
          Preset Triggers
        </h2>

        <div className="space-y-3">
          {presetTriggers.map((trigger) => (
            <div
              key={trigger.id}
              id={`trigger-card-${trigger.id}`}
              className="bg-white border border-[#bcc9c6] rounded-2xl p-4 shadow-xs hover:border-[#00a396] transition space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center">
                    {getIcon(trigger.icon)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-sm text-[#131b2e]">{trigger.title}</h3>
                      {trigger.subtitle && (
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-[#ffdad6] text-[#93000a] rounded">
                          {trigger.subtitle}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#505f76] capitalize">{trigger.category}</span>
                  </div>
                </div>

                {/* Toggle switch */}
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

              {/* Waveform preview & test button */}
              <div className="flex items-center space-x-2 pt-1 border-t border-[#f2f3ff]">
                <button
                  onClick={() => handleTestPattern(trigger)}
                  className="p-1.5 rounded-lg text-[#006a62] hover:bg-[#eaedff] transition flex items-center text-xs font-semibold space-x-1"
                  title="Test vibration on band"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Test</span>
                </button>
                <div className="flex-1 bg-[#faf8ff] rounded-lg p-1.5 border border-[#bcc9c6]/40">
                  <WaveformVisualizer
                    type={trigger.waveformPattern}
                    color={trigger.category === 'Hazard' ? '#ba1a1a' : '#006a62'}
                    className="h-6"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Triggers Section */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs uppercase tracking-wider font-bold text-[#505f76] px-1">
          Custom Triggers
        </h2>

        {customTriggers.length > 0 && (
          <div className="space-y-3 mb-3">
            {customTriggers.map((trigger) => (
              <div
                key={trigger.id}
                className="bg-white border border-[#00a396]/50 rounded-2xl p-4 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#131b2e]">{trigger.title}</h3>
                    <span className="text-xs text-[#006a62] font-medium">
                      Intensity: {trigger.intensity || 'medium'}
                    </span>
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
                <div className="bg-[#faf8ff] rounded-lg p-1.5 border border-[#bcc9c6]/40">
                  <WaveformVisualizer type={trigger.waveformPattern} className="h-6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Custom Trigger Button */}
        <button
          id="btn-add-custom-trigger"
          onClick={onOpenCreateTrigger}
          className="w-full border-2 border-dashed border-[#00a396] hover:bg-[#eaedff]/60 text-[#006a62] font-semibold py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 transition active:scale-[0.99]"
        >
          <Plus className="w-5 h-5 text-[#00a396]" />
          <span>Add Custom Trigger</span>
        </button>
      </div>
    </div>
  );
};
