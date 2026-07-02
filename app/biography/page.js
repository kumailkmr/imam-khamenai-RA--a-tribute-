"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import { archiveData } from "@/lib/archive-data";
import ArchiveHeader from "@/components/ArchiveHeader";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function BiographyPage() {
  const { language } = useAccessibility();
  const bio = archiveData.biography;

  const sections = [
    { title: language === "en" ? "Early Life" : "اوایل زندگی", content: bio.earlyLife[language] },
    { title: language === "en" ? "Education & Religious Studies" : "تحصیلات و مطالعات مذهبی", content: bio.education[language] },
    { title: language === "en" ? "Political Career & Leadership" : "دوران سیاسی و رهبری", content: bio.politicalCareer[language] }
  ];

  return (
    <main className="min-h-screen bg-ink pt-16">
      <ArchiveHeader 
        title={language === "en" ? "Extended Biography" : "زندگی‌نامه تفصیلی"} 
        description={language === "en" ? "A comprehensive look at the life, studies, and leadership." : "نگاهی جامع به زندگی، تحصیلات و دوران رهبری."}
        icon={BookOpen}
      />
      
      <div className="max-w-4xl mx-auto px-4 pb-24">
        {sections.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-12 bg-charcoal border border-brass/20 rounded-xl p-8 hover:border-brass/40 transition-colors"
          >
            <h2 className="text-2xl font-amiri text-brass mb-6">{section.title}</h2>
            <div className="prose prose-invert prose-p:text-parchment/80 prose-p:leading-loose">
              <p>{section.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
