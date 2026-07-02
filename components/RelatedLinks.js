"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { Link2 } from "lucide-react";

export default function RelatedLinks() {
  const { language } = useAccessibility();

  const links = [
    { title: { en: "Official Website", fa: "وبگاه رسمی" }, url: "https://khamenei.ir" },
    { title: { en: "Supreme Leader's Office", fa: "دفتر مقام معظم رهبری" }, url: "https://leader.ir" },
    { title: { en: "Government Mourning Portal", fa: "پورتال عزای عمومی دولت" }, url: "https://dolat.ir" }
  ];

  return (
    <section className="py-16 px-4 bg-charcoal border-y border-iran-green/30 scroll-mt-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
        <h3 className="font-mono text-sm uppercase tracking-widest text-brass md:border-r border-brass/20 md:pr-6">
          {language === "en" ? "Related Links" : "پیوندهای مرتبط"}
        </h3>
        
        <div className="flex flex-wrap justify-center gap-4">
          {links.map((link, i) => (
            <a 
              key={i} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-ink/50 border border-brass/20 hover:border-brass/50 rounded transition-colors text-parchment/80 hover:text-parchment text-sm"
            >
              <Link2 className="w-4 h-4 text-brass" />
              <span>{link.title[language]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
