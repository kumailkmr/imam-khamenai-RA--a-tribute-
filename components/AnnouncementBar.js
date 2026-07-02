"use client";

import useSWR from 'swr';
import { Info } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";

export default function AnnouncementBar() {
  const { language, t } = useAccessibility();
  const { data } = useSWR('/api/announcements', (url) => fetch(url).then(r => r.json()));
  
  const announcements = data?.announcements || [];
  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="w-full bg-iran-green text-parchment py-1.5 px-4 overflow-hidden flex items-center z-40 relative group border-b border-iran-green-bright/30">
      <div className="flex-shrink-0 flex items-center space-x-2 mr-4 md:mr-8 font-mono text-xs md:text-sm uppercase tracking-widest font-bold">
        <Info className="w-4 h-4 text-brass-light" />
        <span className="hidden md:inline">{t.alerts.announcements}</span>
        <span className="md:hidden">{t.alerts.alert}</span>
      </div>
      
      {/* Ticker Animation */}
      <div className="flex-grow overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-ticker group-hover:[animation-play-state:paused]">
          {[...announcements, ...announcements].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="inline-flex items-center space-x-2 mr-16">
              <span className="text-brass-light font-mono text-xs">{item.date[language]}</span>
              <span className="text-sm">{item.text[language]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
