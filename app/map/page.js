"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function MapPage() {
  const { language } = useAccessibility();

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Interactive Map" : "نقشه تعاملی"} 
        description={language === "en" ? "Visualizing the geographical footprint of historical and official events." : "تجسم ردپای جغرافیایی رویدادهای تاریخی و رسمی."}
        icon={MapPin}
      />
      
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="bg-charcoal p-4 md:p-8 rounded-xl border border-brass/20">
          <div className="aspect-square md:aspect-video w-full rounded border border-brass/10 bg-ink relative flex items-center justify-center flex-col text-parchment/60">
            <MapPin className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-mono text-sm max-w-sm text-center px-4">
              {language === "en" 
                ? "Full interactive maps integration requires client-side API keys. A static list of significant locations is provided below."
                : "ادغام کامل نقشه تعاملی نیازمند کلید API سمت کلاینت است. لیستی از مکان‌های مهم در زیر ارائه شده است."}
            </p>
          </div>
          
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {archiveData.mapLocations.map((loc, i) => (
              <div key={i} className="p-4 border border-brass/10 rounded-lg hover:bg-brass/5 transition-colors">
                <MapPin className="w-5 h-5 text-brass mb-2" />
                <h3 className="font-amiri text-lg text-parchment mb-1">{loc.title[language]}</h3>
                <p className="font-mono text-xs text-parchment/40">Coords: {loc.coords.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
