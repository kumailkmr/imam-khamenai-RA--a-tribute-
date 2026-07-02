"use client";

import { useState } from "react";
import Image from "next/image";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import SearchFilter from "@/components/SearchFilter";
import { Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const { language } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    { id: "portraits", label: language === "en" ? "Portraits" : "پرتره‌ها" },
    { id: "public", label: language === "en" ? "Public Appearances" : "حضور مردمی" }
  ];

  const filteredImages = archiveData.gallery.filter(img => 
    selectedCategory === "all" || img.category === selectedCategory
  );

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Photo Gallery" : "گالری تصاویر"} 
        description={language === "en" ? "Historical photographs from childhood to state ceremonies." : "عکس‌های تاریخی از دوران کودکی تا مراسم رسمی."}
        icon={ImageIcon}
      />
      
      <SearchFilter 
        value=""
        onChange={() => {}}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl border border-brass/20"
              onClick={() => setLightboxImage(img)}
            >
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <span className="text-parchment font-mono text-sm border border-parchment px-3 py-1 rounded">View</span>
              </div>
              <Image 
                src={img.src}
                alt={img.caption[language]}
                width={800}
                height={600}
                className="w-full h-auto object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/90 to-transparent z-20">
                <p className="text-parchment font-inter text-sm">{img.caption[language]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-md p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button className="absolute top-8 right-8 text-parchment/60 hover:text-brass transition-colors z-50">
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={lightboxImage.src}
                alt={lightboxImage.caption[language]}
                width={1920}
                height={1080}
                className="w-full h-full object-contain filter grayscale contrast-125 rounded-xl"
              />
              <div className="text-center mt-4">
                <p className="text-brass font-amiri text-xl">{lightboxImage.caption[language]}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
