"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import { Link as LinkIcon, Book, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ReferencesPage() {
  const { language } = useAccessibility();

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "References & Sources" : "منابع و مآخذ"} 
        description={language === "en" ? "Citations and external resources." : "استنادها و منابع خارجی."}
        icon={LinkIcon}
      />
      
      <div className="max-w-5xl mx-auto px-4 pb-24 grid md:grid-cols-2 gap-6">
        {archiveData.references.map((ref, index) => (
          <motion.a 
            key={index}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-charcoal p-6 border border-brass/20 rounded-xl hover:border-brass hover:bg-brass/5 transition-colors flex items-center space-x-4 group"
          >
            <div className="bg-ink p-3 rounded-full border border-brass/20 group-hover:bg-brass/20 transition-colors">
              {ref.type === "official" ? <Building2 className="w-6 h-6 text-brass" /> : <Book className="w-6 h-6 text-brass" />}
            </div>
            <div>
              <h3 className="font-amiri text-xl text-parchment group-hover:text-brass-light transition-colors">{ref.title[language]}</h3>
              <span className="font-mono text-xs text-parchment/40 uppercase">{ref.type} Source</span>
            </div>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
