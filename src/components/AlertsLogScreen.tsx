import React, { useState } from 'react';
import { AlertItem, TriggerCategory } from '../types';
import { WaveformVisualizer } from './WaveformVisualizer';
import { triggerHapticFeedback } from '../utils/haptics';
import { Flame, Car, Baby, UserCheck, PhoneIncoming, MapPin, Calendar, Bell, X, RefreshCw } from 'lucide-react';

interface AlertsLogScreenProps {
  alerts: AlertItem[];
  onClearAlerts?: () => void;
}

export const AlertsLogScreen: React.FC<AlertsLogScreenProps> = ({ alerts, onClearAlerts }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | TriggerCategory>('All');
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [activeModalAlert, setActiveModalAlert] = useState<AlertItem | null>(null);

  const filterTabs = ['All', 'Hazard', 'Social', 'Calls'];

  const getIcon = (iconName: string, category: string) => {
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
        return category === 'Hazard' ? (
          <Flame className="w-5 h-5 text-[#ba1a1a]" />
        ) : (
          <Bell className="w-5 h-5 text-[#006a62]" />
        );
    }
  };

  const filteredAlerts = alerts.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const handleReplayVibration = (alert: AlertItem) => {
    const patternKey =
      alert.category === 'Hazard'
        ? 'hazard'
        : alert.category === 'Traffic'
        ? 'traffic'
        : alert.category === 'Calls'
        ? 'call'
        : alert.type.includes('Baby')
        ? 'baby'
        : 'name';

    triggerHapticFeedback(patternKey, alert.urgency);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#faf8ff] p-5 space-y-4">
      {/* Title Header */}
      <div className="text-center pt-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#131b2e]">Recent Alerts</h1>
        <p className="text-xs text-[#505f76] mt-0.5">Tactile signal log and environmental acoustic history</p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex bg-[#eaedff] p-1 rounded-2xl border border-[#bcc9c6] justify-between">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            id={`filter-tab-${tab}`}
            onClick={() => {
              setSelectedCategory(tab as any);
              setShowEmptyState(false);
            }}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === tab && !showEmptyState
                ? 'bg-white text-[#131b2e] shadow-xs'
                : 'text-[#505f76] hover:text-[#131b2e]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty State Toggle Simulation (as seen in wireframe Screen 6) */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="text-xs text-[#006a62] font-semibold flex items-center space-x-1 hover:underline"
        >
          <RefreshCw className="w-3 h-3" />
          <span>{showEmptyState ? 'Show Logs' : 'Toggle Empty View'}</span>
        </button>
      </div>

      {/* Main Alerts Content */}
      {showEmptyState || filteredAlerts.length === 0 ? (
        /* Empty State Box matching Wireframe Screen 6 */
        <div className="bg-white border border-[#bcc9c6] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xs my-4">
          <div className="w-24 h-24 bg-[#eaedff] rounded-full flex items-center justify-center">
            <svg className="w-14 h-14 text-[#505f76]" viewBox="0 0 100 100" fill="none">
              <rect x="25" y="15" width="50" height="70" rx="20" stroke="currentColor" strokeWidth="3" />
              <rect x="35" y="25" width="30" height="50" rx="10" fill="#faf8ff" stroke="currentColor" strokeWidth="2" />
              <path d="M 40 45 Q 50 35 60 45" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-xs text-[#505f76] max-w-xs leading-relaxed font-medium">
            No empty state is more present in Vibration pattern used in then wiochers.
          </p>
          <button
            id="btn-view-state"
            onClick={() => setShowEmptyState(false)}
            className="bg-[#00a396] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:bg-[#006a62] transition"
          >
            View State
          </button>
        </div>
      ) : (
        /* Alerts List matching Screen 6 wireframe */
        <div className="space-y-3">
          {filteredAlerts.map((item) => (
            <div
              key={item.id}
              id={`alert-item-${item.id}`}
              onClick={() => {
                setActiveModalAlert(item);
                handleReplayVibration(item);
              }}
              className="bg-white border border-[#bcc9c6] hover:border-[#00a396] rounded-2xl p-4 shadow-xs transition cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center flex-shrink-0">
                    {getIcon(item.icon, item.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#131b2e]">{item.type}</h3>
                    <div className="flex items-center space-x-1.5 text-xs text-[#505f76] mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{item.timeAndDate}</span>
                    </div>
                  </div>
                </div>

                {/* Location Tag */}
                <span className="flex items-center space-x-1 text-xs font-medium text-[#006a62] bg-[#eaedff] border border-[#bcc9c6] px-2.5 py-1 rounded-full">
                  <MapPin className="w-3 h-3 text-[#00a396]" />
                  <span>{item.locationTag}</span>
                </span>
              </div>

              {/* Waveform preview at bottom of item */}
              <div className="bg-[#faf8ff] rounded-xl p-2 border border-[#bcc9c6]/40 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#505f76] uppercase tracking-wider pl-1">
                  Tactile Wave
                </span>
                <div className="w-32">
                  <WaveformVisualizer
                    type={item.waveformPattern}
                    color={item.category === 'Hazard' ? '#ba1a1a' : '#006a62'}
                    className="h-5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {activeModalAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-[#bcc9c6]">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center">
                  {getIcon(activeModalAlert.icon, activeModalAlert.category)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">{activeModalAlert.type}</h3>
                  <span className="text-xs text-[#006a62] font-medium">{activeModalAlert.category} Alert</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalAlert(null)}
                className="p-1 rounded-full hover:bg-[#eaedff] text-[#505f76]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#505f76] bg-[#faf8ff] p-3 rounded-xl border border-[#bcc9c6]/50">
              <p><strong>Timestamp:</strong> {activeModalAlert.timeAndDate}</p>
              <p><strong>Location:</strong> {activeModalAlert.locationTag}</p>
              <p><strong>Telemetry:</strong> {activeModalAlert.details || 'Detected by acoustic sensor matrix.'}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#131b2e]">Tactile Haptic Waveform</span>
              <div className="bg-[#eaedff] p-2 rounded-xl border border-[#bcc9c6]">
                <WaveformVisualizer type={activeModalAlert.waveformPattern} className="h-8" />
              </div>
            </div>

            <button
              onClick={() => handleReplayVibration(activeModalAlert)}
              className="w-full bg-[#00a396] hover:bg-[#006a62] text-white font-semibold py-3 rounded-xl text-xs transition shadow-sm"
            >
              Replay Haptic Vibration Pattern
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
