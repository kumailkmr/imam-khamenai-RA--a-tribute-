"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { ExternalLink, ArrowRight, Newspaper, Radio } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PressCoverage() {
  const { language } = useAccessibility();
  const isRTL = language === "fa";

  const newsItems = [
    { 
      outlet: "Mehr News Agency", 
      type: "State Media",
      date: "Mar 1, 2026", 
      headline: { 
        en: "Supreme Leader's Legacy: A Nation Mourns the Loss of a Visionary Guide", 
        fa: "میراث رهبر معظم انقلاب: ملتی در سوگ از دست دادن راهنمایی دوراندیش" 
      }, 
      url: "https://en.mehrnews.com/",
      color: "from-blue-900/20"
    },
    { 
      outlet: "Press TV", 
      type: "International Broadcast",
      date: "Mar 1, 2026", 
      headline: { 
        en: "Global Reactions Pour In Following the Passing of Ayatollah Khamenei", 
        fa: "واکنش‌های جهانی در پی درگذشت آیت‌الله خامنه‌ای" 
      }, 
      url: "https://www.presstv.ir/",
      color: "from-red-900/20"
    },
    { 
      outlet: "Tasnim News Agency", 
      type: "News Agency",
      date: "Mar 2, 2026", 
      headline: { 
        en: "Millions Gather in Tehran for Historic Funeral Procession", 
        fa: "تجمع میلیونی در تهران برای مراسم تشییع تاریخی" 
      }, 
      url: "https://www.tasnimnews.com/en",
      color: "from-emerald-900/20"
    },
    { 
      outlet: "Razagraphy", 
      type: "Documentary & Archival",
      date: "Mar 3, 2026", 
      headline: { 
        en: "Through the Lens: Unseen Archives of the Supreme Leader's Early Life", 
        fa: "از دریچه دوربین: آرشیوهای دیده‌نشده از اوایل زندگی رهبر معظم انقلاب" 
      }, 
      url: "#",
      color: "from-brass/10"
    }
  ];

  return (
    <section className="relative py-32 px-4 bg-[#0A0A0A] overflow-hidden scroll-mt-20 border-y border-brass/10">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-charcoal via-transparent to-transparent opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}
            >
              <Radio className="w-5 h-5 text-brass" />
              <span className="font-mono text-brass tracking-[0.2em] text-xs uppercase">
                {language === "en" ? "Official Bulletins" : "بولتن‌های رسمی"}
              </span>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-amiri text-5xl md:text-6xl text-parchment"
            >
              {language === "en" ? "Verified Press Reports" : "گزارش‌های مطبوعاتی تأیید شده"}
            </motion.h3>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/news" 
              className="group flex items-center space-x-3 border border-brass/20 bg-charcoal/30 hover:bg-brass/10 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <span className="font-mono text-xs text-parchment uppercase tracking-widest group-hover:text-brass transition-colors">
                {language === "en" ? "View Full Coverage" : "مشاهده پوشش کامل"}
              </span>
              <ArrowRight className={`w-4 h-4 text-brass ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
            </Link>
          </motion.div>
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex flex-col h-full bg-ink border border-brass/20 hover:border-brass/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(184,134,11,0.2)] hover:-translate-y-2"
            >
              {/* Card Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full p-6 lg:p-8">
                <div className={`flex justify-between items-start mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">{item.type}</span>
                    <span className="font-sans font-semibold text-brass tracking-wider text-sm">{item.outlet}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-charcoal border border-brass/20 flex items-center justify-center group-hover:bg-brass/20 transition-colors shrink-0">
                    <ExternalLink className="w-3.5 h-3.5 text-brass group-hover:text-brass-light" />
                  </div>
                </div>
                
                <h4 className={`font-amiri text-2xl text-parchment/90 leading-snug mb-8 grow ${isRTL ? 'text-right' : 'text-left'}`}>
                  {item.headline[language]}
                </h4>
                
                <div className={`flex items-center space-x-2 pt-6 border-t border-brass/10 ${isRTL ? 'space-x-reverse justify-end' : ''}`}>
                  <Newspaper className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-400 font-mono tracking-wider">
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
