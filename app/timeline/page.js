"use client";

import { useState } from "react";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import SearchFilter from "@/components/SearchFilter";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function TimelinePage() {
  const { language } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "personal", label: language === "en" ? "Personal" : "شخصی" },
    { id: "political", label: language === "en" ? "Political" : "سیاسی" }
  ];

  const filteredTimeline = archiveData.timeline.filter(item => {
    const matchesSearch = item.title[language].toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.year.toString().includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Interactive Timeline" : "گاه‌شمار تعاملی"} 
        description={language === "en" ? "A chronological record of major milestones and events." : "ثبت زمانی نقاط عطف و رویدادهای مهم."}
        icon={Clock}
      />
      
      <SearchFilter 
        value={searchQuery}
        onChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="max-w-4xl mx-auto px-4 pb-24 relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brass/20" />
        
        {filteredTimeline.length === 0 ? (
          <div className="text-center text-parchment/60 py-12 font-mono">
            {language === "en" ? "No events found matching your criteria." : "هیچ رویدادی با معیارهای شما یافت نشد."}
          </div>
        ) : (
          filteredTimeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center justify-between md:justify-normal mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="hidden md:block w-5/12" />
              
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-charcoal border-2 border-brass transform -translate-x-1/2 z-10" />
              
              <div className="w-full ml-16 md:ml-0 md:w-5/12">
                <div className="bg-charcoal p-6 rounded-xl border border-brass/20 hover:border-brass/50 transition-colors group">
                  <span className="text-brass font-mono font-bold text-xl mb-2 block">{item.year}</span>
                  <h3 className="text-xl font-amiri text-parchment mb-2 group-hover:text-brass-light transition-colors">{item.title[language]}</h3>
                  <p className="text-parchment/70 font-inter text-sm leading-relaxed">{item.desc[language]}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}
