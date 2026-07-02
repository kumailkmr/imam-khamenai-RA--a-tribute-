"use client";

import { useState } from "react";
import { extendedFuneralDetails } from "@/lib/announcements";
import { useAccessibility } from "./AccessibilityProvider";
import { Tv, ChevronDown, ChevronUp } from "lucide-react";

export default function LivestreamSlot() {
  const { language } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  // Read URL from config (assumed to be added to extendedFuneralDetails by admin/owner)
  // For this implementation, we check if livestreamUrl exists on the object.
  const url = extendedFuneralDetails.livestreamUrl;

  if (!url) return null;

  return (
    <div className="w-full mt-8 border border-brass/30 bg-ink/50 rounded overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-charcoal hover:bg-brass/10 transition-colors"
      >
        <div className="flex items-center space-x-3 text-brass">
          <Tv className="w-5 h-5" />
          <span className="font-amiri text-lg">
            {language === "en" ? "Live Broadcast" : "پخش زنده"}
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-brass/70" /> : <ChevronDown className="w-5 h-5 text-brass/70" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-brass/10">
          <div className="relative w-full pb-[56.25%] h-0 rounded overflow-hidden bg-black">
            <iframe 
              src={url} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
