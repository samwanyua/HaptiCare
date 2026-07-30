import React from 'react';
import { NavTab } from '../types';
import { Home, Zap, Bell, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'triggers' as NavTab, label: 'Triggers', icon: Zap },
    { id: 'alerts' as NavTab, label: 'Alerts', icon: Bell },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-[#bcc9c6] px-4 py-2 flex justify-around items-center sticky bottom-0 z-40 w-full shadow-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          currentTab === tab.id ||
          (currentTab === 'create-trigger' && tab.id === 'triggers') ||
          (currentTab === 'live-call' && tab.id === 'home');

        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-[#006a62] font-semibold bg-[#eaedff]'
                : 'text-[#505f76] hover:text-[#006a62]'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-xs mt-1 font-medium tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
