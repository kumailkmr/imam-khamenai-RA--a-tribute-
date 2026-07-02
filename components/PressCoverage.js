"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { ExternalLink } from "lucide-react";

export default function PressCoverage() {
  const { language } = useAccessibility();

  const links = [
    { outlet: "Reuters", date: "Mar 1, 2026", headline: { en: "Iran's Supreme Leader Khamenei dies", fa: "رهبر جمهوری اسلامی ایران درگذشت" }, url: "https://reuters.com" },
    { outlet: "Al Jazeera", date: "Mar 1, 2026", headline: { en: "Middle East reacts to death of Ali Khamenei", fa: "واکنش خاورمیانه به درگذشت علی خامنه‌ای" }, url: "https://aljazeera.com" },
    { outlet: "AP News", date: "Mar 2, 2026", headline: { en: "Iran declares 40 days of mourning for Khamenei", fa: "اعلام ۴۰ روز عزای عمومی در ایران" }, url: "https://apnews.com" }
  ];

  return (
    <section className="py-24 px-4 bg-ink scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-amiri text-2xl md:text-3xl text-brass mb-8">
          {language === "en" ? "Press Coverage" : "پوشش خبری"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, i) => (
            <a 
              key={i} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 border border-brass/20 rounded bg-charcoal hover:bg-brass/10 transition-colors relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs uppercase text-brass-light tracking-widest">{link.outlet}</span>
                <ExternalLink className="w-4 h-4 text-parchment/30 group-hover:text-brass transition-colors" />
              </div>
              <h4 className="font-inter text-parchment/90 leading-snug mb-4">
                {link.headline[language]}
              </h4>
              <span className="text-xs text-parchment/50 font-mono absolute bottom-4 left-5">
                {link.date}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
