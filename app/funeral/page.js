"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import ArchiveHeader from "@/components/ArchiveHeader";
import { Map as MapIcon } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Reuse the existing FuneralMap component securely
const FuneralMap = dynamic(() => import("@/components/FuneralMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-charcoal animate-pulse rounded-xl border border-brass/20" />
});

export default function FuneralArchivePage() {
  const { language } = useAccessibility();

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "State Funeral Archive" : "آرشیو مراسم تشییع"} 
        description={language === "en" ? "Documenting the national mourning, public attendance, and official ceremonies." : "مستندسازی عزاداری ملی، حضور مردمی و مراسم رسمی."}
        icon={MapIcon}
      />
      
      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-charcoal p-8 rounded-xl border border-brass/20"
        >
          <h2 className="text-2xl font-amiri text-brass mb-6">
            {language === "en" ? "Procession & Ceremony Locations" : "مکان‌های تشییع و مراسم"}
          </h2>
          <div className="w-full h-[500px] rounded overflow-hidden">
            <FuneralMap />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Placeholder cards for funeral events */}
          {[
            { city: "Tehran", date: "July 3-4, 2026", desc: "Main public procession and prayers." },
            { city: "Qom", date: "July 5, 2026", desc: "Seminary ceremonies." },
            { city: "Mashhad", date: "July 6-7, 2026", desc: "Final burial ceremonies." }
          ].map((event, i) => (
            <div key={i} className="bg-charcoal border border-brass/20 rounded p-6">
              <h3 className="text-xl font-amiri text-brass mb-2">{event.city}</h3>
              <p className="font-mono text-sm text-parchment/60 mb-4">{event.date}</p>
              <p className="text-parchment/80 font-inter text-sm">{event.desc}</p>
            </div>
          ))}
        </motion.section>
      </div>
    </main>
  );
}
