"use client";

import { useState } from "react";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import SearchFilter from "@/components/SearchFilter";
import { MessageCircle, Quote, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function QuotesPage() {
  const { language } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const filteredQuotes = archiveData.quotes.filter(q => 
    q.text[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.context[language].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Quotes Collection" : "مجموعه نقل‌قول‌ها"} 
        description={language === "en" ? "A curated archive of significant statements and aphorisms." : "آرشیوی منتخب از بیانات و جملات قصار مهم."}
        icon={MessageCircle}
      />
      
      <SearchFilter 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="max-w-5xl mx-auto px-4 pb-24 grid md:grid-cols-2 gap-6">
        {filteredQuotes.map((q, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-charcoal p-8 border border-brass/20 rounded-xl relative group"
          >
            <Quote className="absolute top-6 left-6 w-12 h-12 text-brass/10 group-hover:text-brass/20 transition-colors z-0" />
            <div className="relative z-10">
              <p className="font-amiri text-2xl text-parchment mb-6 leading-relaxed">
                &quot;{q.text[language]}&quot;
              </p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <p className="font-mono text-sm text-brass">{q.year}</p>
                  <p className="font-inter text-sm text-parchment/60">{q.context[language]}</p>
                </div>
                <button 
                  onClick={() => handleCopy(index, q.text[language])}
                  className="p-2 bg-ink rounded border border-brass/30 text-parchment/60 hover:text-brass hover:border-brass transition-colors"
                  title="Copy quote"
                >
                  {copiedId === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
