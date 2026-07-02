"use client";

import { useState } from "react";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import SearchFilter from "@/components/SearchFilter";
import { Video } from "lucide-react";
import { motion } from "framer-motion";

export default function VideosPage() {
  const { language } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "historical", label: language === "en" ? "Historical Footage" : "فیلم‌های تاریخی" },
    { id: "speeches", label: language === "en" ? "Speeches" : "سخنرانی‌ها" }
  ];

  const filteredVideos = archiveData.videos.filter(vid => {
    const matchesSearch = vid.title[language].toLowerCase().includes(searchQuery.toLowerCase()) || vid.year.toString().includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || vid.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Video Archive" : "آرشیو ویدیو"} 
        description={language === "en" ? "A curated collection of official speeches and historical footage." : "مجموعه‌ای منتخب از سخنرانی‌های رسمی و فیلم‌های تاریخی."}
        icon={Video}
      />
      
      <SearchFilter 
        value={searchQuery}
        onChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-2 gap-8">
        {filteredVideos.map((vid, index) => (
          <motion.div 
            key={vid.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-charcoal border border-brass/20 rounded-xl overflow-hidden hover:border-brass/40 transition-colors"
          >
            <div className="aspect-video bg-ink relative">
              {/* Note: Site owner must replace placeholder URL with real video embed */}
              <iframe 
                src={vid.url}
                className="w-full h-full absolute inset-0 grayscale contrast-125"
                allowFullScreen
                title={vid.title[language]}
              />
            </div>
            <div className="p-6">
              <span className="text-brass font-mono text-sm">{vid.year}</span>
              <h3 className="text-xl font-amiri text-parchment mt-2">{vid.title[language]}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
