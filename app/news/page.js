"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import { Newspaper } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsPage() {
  const { language } = useAccessibility();

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "News Timeline" : "تایم‌لاین اخبار"} 
        description={language === "en" ? "Chronological archive of announcements and press coverage." : "آرشیو زمانی اطلاعیه‌ها و پوشش خبری."}
        icon={Newspaper}
      />
      
      <div className="max-w-4xl mx-auto px-4 pb-24">
        {archiveData.news.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0 mb-8 flex flex-col md:flex-row md:items-center group"
          >
            <div className="hidden md:block w-32 text-right pr-6 font-mono text-brass/60 group-hover:text-brass transition-colors">
              {item.date}
            </div>
            
            <div className="absolute left-0 md:relative md:left-auto w-px h-full bg-brass/20 md:mx-4">
              <div className="absolute top-2 -left-1.5 w-3 h-3 rounded-full bg-charcoal border-2 border-brass group-hover:bg-brass transition-colors" />
            </div>
            
            <div className="md:hidden font-mono text-xs text-brass/60 mb-1">
              {item.date}
            </div>
            
            <div className="flex-1 bg-charcoal p-6 rounded-xl border border-brass/10 group-hover:border-brass/30 transition-colors">
              <h3 className="text-xl font-amiri text-parchment mb-2">{item.title[language]}</h3>
              <div className="flex items-center justify-between">
                <span className="text-parchment/50 font-mono text-sm uppercase">{item.source}</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-brass hover:text-brass-light font-mono text-sm underline underline-offset-4">
                  {language === "en" ? "Read More" : "بیشتر بخوانید"}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
