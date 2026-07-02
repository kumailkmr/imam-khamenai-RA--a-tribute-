"use client";

import { useState } from "react";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import SearchFilter from "@/components/SearchFilter";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const { language } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaq = archiveData.faq.filter(item => 
    item.q[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a[language].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Frequently Asked Questions" : "سوالات متداول"} 
        description={language === "en" ? "Common questions regarding historical and political facts." : "پرسش‌های رایج در مورد حقایق تاریخی و سیاسی."}
        icon={HelpCircle}
      />
      
      <SearchFilter 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="max-w-4xl mx-auto px-4 pb-24 space-y-4">
        {filteredFaq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-charcoal border rounded-xl overflow-hidden transition-colors ${isOpen ? 'border-brass/50' : 'border-brass/20 hover:border-brass/40'}`}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-amiri text-lg text-parchment">{item.q[language]}</span>
                <ChevronDown className={`w-5 h-5 text-brass transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-parchment/80 font-inter leading-relaxed border-t border-brass/10 pt-4 mt-2">
                      {item.a[language]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
