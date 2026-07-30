import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { BottomNav } from './BottomNav';
import { Wifi, Signal, Battery, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface PhoneFrameProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ currentTab, onSelectTab, children }) => {
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-6 px-2 bg-gradient-to-br from-[#eaedff] via-[#faf8ff] to-[#dae2fd]">
      {/* View Switcher bar */}
      <div className="mb-4 flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#bcc9c6] shadow-sm z-30">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-[#006a62]" />
          <span className="text-xs font-bold text-[#131b2e]">HaptiQ Wearable App Simulator</span>
        </div>
        <button
          onClick={() => setIsFullWidth(!isFullWidth)}
          className="text-xs text-[#006a62] font-semibold hover:bg-[#eaedff] px-2.5 py-1 rounded-full border border-[#bcc9c6] transition flex items-center space-x-1"
        >
          {isFullWidth ? (
            <>
              <Minimize2 className="w-3 h-3" />
              <span>Mobile Frame</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3" />
              <span>Expand View</span>
            </>
          )}
        </button>
      </div>

      {/* Phone Container Mockup */}
      <div
        className={`w-full transition-all duration-300 bg-white rounded-[40px] shadow-2xl border-[8px] border-[#131b2e] overflow-hidden flex flex-col relative ${
          isFullWidth ? 'max-w-4xl h-[840px]' : 'max-w-[390px] h-[812px]'
        }`}
      >
        {/* iOS / Mobile Status Bar (matching 9:41 wireframes) */}
        <div className="bg-[#faf8ff] px-6 pt-3 pb-2 flex justify-between items-center text-xs font-semibold text-[#131b2e] select-none border-b border-[#bcc9c6]/30 z-30">
          <span>{currentTime}</span>
          {/* Dynamic Speaker Notch */}
          <div className="w-24 h-4 bg-[#131b2e] rounded-full flex items-center justify-center">
            <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800 ml-2"></div>
          </div>
          <div className="flex items-center space-x-1.5 text-[#131b2e]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current text-[#006a62]" />
          </div>
        </div>

        {/* Screen Content Scroll Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          {children}
        </div>

        {/* Bottom Tab Navigation Bar */}
        <BottomNav currentTab={currentTab} onSelectTab={onSelectTab} />
      </div>
    </div>
  );
};
