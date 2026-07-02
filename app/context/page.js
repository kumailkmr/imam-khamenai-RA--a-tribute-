"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function ContextPage() {
  const { language } = useAccessibility();

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Historical Context" : "زمینه تاریخی"} 
        description={language === "en" ? "Educational resources regarding the political system and history." : "منابع آموزشی در مورد سیستم سیاسی و تاریخ."}
        icon={GraduationCap}
      />
      
      <div className="max-w-5xl mx-auto px-4 pb-24 grid gap-8 md:grid-cols-2">
        {archiveData.context.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-charcoal p-8 rounded-xl border border-brass/20 hover:border-brass/40 transition-colors"
          >
            <h2 className="text-2xl font-amiri text-brass mb-4">{item.title[language]}</h2>
            <p className="text-parchment/80 font-inter leading-relaxed">
              {item.desc[language]}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
