"use client";

import { useState } from "react";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import SearchFilter from "@/components/SearchFilter";
import { Archive, File } from "lucide-react";
import { motion } from "framer-motion";

export default function ArchiveDocsPage() {
  const { language } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = archiveData.archiveDocs.filter(doc => 
    doc.title[language].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Archive & Documents" : "اسناد و بایگانی"} 
        description={language === "en" ? "Historical records, constitutional documents, and public records." : "اسناد تاریخی، حقوقی و مدارک عمومی."}
        icon={Archive}
      />
      
      <SearchFilter 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc, index) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-charcoal p-6 border border-brass/20 rounded-xl hover:border-brass/40 transition-colors flex items-start space-x-4 group cursor-pointer"
          >
            <div className="bg-ink p-3 rounded-lg border border-brass/10 group-hover:bg-brass/10 transition-colors">
              <File className="w-6 h-6 text-brass" />
            </div>
            <div>
              <span className="text-parchment/40 text-xs font-mono uppercase block mb-1">{doc.category}</span>
              <h3 className="text-lg font-inter text-parchment group-hover:text-brass-light transition-colors">{doc.title[language]}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
