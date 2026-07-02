"use client";

import { useState } from "react";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import SearchFilter from "@/components/SearchFilter";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function SpeechesPage() {
  const { language } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpeeches = archiveData.speeches.filter(speech => 
    speech.title[language].toLowerCase().includes(searchQuery.toLowerCase()) || 
    speech.year.toString().includes(searchQuery) ||
    speech.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Speeches & Writings" : "سخنرانی‌ها و نوشته‌ها"} 
        description={language === "en" ? "A searchable library of official documents and addresses." : "کتابخانه قابل جستجو از اسناد رسمی و سخنرانی‌ها."}
        icon={FileText}
      />
      
      <SearchFilter 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-6">
        {filteredSpeeches.map((speech, index) => (
          <motion.div 
            key={speech.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-charcoal p-6 border border-brass/20 rounded-xl hover:border-brass/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-brass/10 text-brass px-3 py-1 rounded-full text-xs font-mono">{speech.year}</span>
                <div className="flex space-x-2">
                  {speech.tags.map(tag => (
                    <span key={tag} className="text-parchment/40 text-xs font-mono uppercase">#{tag}</span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-amiri text-parchment group-hover:text-brass transition-colors">{speech.title[language]}</h3>
            </div>
            
            <a 
              href={speech.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-brass text-brass hover:bg-brass hover:text-ink transition-colors rounded font-mono text-sm uppercase"
            >
              <Download className="w-4 h-4 mr-2" />
              {language === "en" ? "Read / Download PDF" : "خواندن / دانلود PDF"}
            </a>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
