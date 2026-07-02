"use client";

import useSWR from "swr";
import { useAccessibility } from "./AccessibilityProvider";
import { motion } from "framer-motion";

export default function OfficialCondolences() {
  const { language, t } = useAccessibility();
  const { data: condolences } = useSWR("/api/condolences", url => fetch(url).then(r => r.json()));

  if (!condolences || condolences.length === 0) return null;

  return (
    <section id="condolences" className="py-24 px-4 bg-charcoal border-y border-brass/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-amiri text-3xl text-brass mb-12 text-center">
          {language === "en" ? "Official Condolences" : "تسلیت‌های رسمی"}
        </h3>
        
        <div className="space-y-6">
          {condolences.map((c, i) => (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-ink/50 border border-brass/20 p-6 rounded"
            >
              <blockquote className="font-inter text-parchment/90 italic mb-4 leading-relaxed text-lg">
                "{c.excerpt[language]}"
              </blockquote>
              <div className="flex flex-col md:flex-row md:items-center justify-between text-sm">
                <div>
                  <strong className="text-brass block font-amiri text-xl">{c.name[language]}</strong>
                  <span className="text-parchment/60 font-mono tracking-widest uppercase text-xs">{c.affiliation[language]}</span>
                </div>
                {c.sourceUrl && c.sourceUrl !== "#" && (
                  <a 
                    href={c.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 md:mt-0 text-brass-light hover:text-parchment underline decoration-brass/30 underline-offset-4 transition-colors"
                  >
                    {language === "en" ? "Read Full Statement" : "خواندن متن کامل"}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
