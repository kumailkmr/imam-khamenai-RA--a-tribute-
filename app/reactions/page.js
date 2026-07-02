"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import { Globe, Building, Flag } from "lucide-react";
import { motion } from "framer-motion";

export default function ReactionsPage() {
  const { language } = useAccessibility();

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "International Reactions" : "واکنش‌های بین‌المللی"} 
        description={language === "en" ? "Official statements and messages of condolence from governments and international bodies." : "بیانیه‌های رسمی و پیام‌های تسلیت از سوی دولت‌ها و نهادهای بین‌المللی."}
        icon={Globe}
      />
      
      <div className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archiveData.reactions.map((reaction, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-charcoal p-6 border border-brass/20 rounded-xl hover:border-brass/40 transition-colors flex flex-col"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center border border-brass/30">
                {reaction.type === "government" ? <Flag className="w-5 h-5 text-brass" /> : <Building className="w-5 h-5 text-brass" />}
              </div>
              <div>
                <h3 className="font-amiri text-xl text-brass">{reaction.country[language]}</h3>
                <span className="font-mono text-xs text-parchment/40 uppercase">{reaction.type}</span>
              </div>
            </div>
            <p className="font-inter text-parchment/80 leading-relaxed italic flex-1">
              "{reaction.text[language]}"
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
