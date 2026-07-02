"use client";

import { CalendarPlus, Share2, Check } from "lucide-react";
import { useState } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import { generateCalendarFile } from "@/lib/calendar";

export default function VisitorTools() {
  const { language } = useAccessibility();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "State Funeral & Mourning Period - Sayyid Ali Khamenei",
          url: window.location.href,
        });
      } catch (err) {
        console.warn("Share failed", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCalendar = async () => {
    try {
      const icsData = await generateCalendarFile();
      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "funeral_schedule.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to generate calendar", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-6 w-full justify-center lg:justify-start">
      <button 
        onClick={handleCalendar}
        className="flex items-center justify-center space-x-2 border border-brass/30 bg-ink hover:bg-brass/10 text-brass px-4 py-2 rounded transition-colors text-sm font-mono tracking-wide"
      >
        <CalendarPlus className="w-4 h-4" />
        <span>{language === "en" ? "Add to Calendar" : "افزودن به تقویم"}</span>
      </button>

      <button 
        onClick={handleShare}
        className="flex items-center justify-center space-x-2 border border-brass/30 bg-ink hover:bg-brass/10 text-brass px-4 py-2 rounded transition-colors text-sm font-mono tracking-wide"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
        <span>
          {copied 
            ? (language === "en" ? "Copied!" : "کپی شد!") 
            : (language === "en" ? "Share" : "اشتراک‌گذاری")}
        </span>
      </button>
    </div>
  );
}
