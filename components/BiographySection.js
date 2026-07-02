"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { biography } from "@/lib/content";
import { motion } from "framer-motion";
import SourceTag from "./SourceTag";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function BiographySection() {
  const { language, t } = useAccessibility();
  const isRTL = language === "fa";
  
  return (
    <section id="biography" className="relative py-32 px-4 bg-[#0A0A0A] overflow-hidden scroll-mt-20">
      
      {/* Premium Museum Textures & Lighting */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brass/5 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-iran-green/5 via-transparent to-transparent opacity-40 pointer-events-none" />
      
      {/* Structural Borders */}
      <div className="absolute top-0 left-12 w-px h-full bg-gradient-to-b from-brass/0 via-brass/20 to-brass/0 hidden lg:block pointer-events-none" />
      <div className="absolute top-0 right-12 w-px h-full bg-gradient-to-b from-brass/0 via-brass/20 to-brass/0 hidden lg:block pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center space-x-4 mb-6 border border-brass/20 px-6 py-2 rounded-full bg-charcoal/50 backdrop-blur-sm shadow-[0_0_15px_rgba(184,134,11,0.1)]"
          >
            <BookOpen className="w-4 h-4 text-brass" />
            <span className="font-mono text-brass tracking-[0.2em] text-xs uppercase">
              {language === "en" ? "Life & Legacy" : "زندگی و میراث"}
            </span>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-amiri text-5xl md:text-6xl text-parchment drop-shadow-md"
          >
            {t.biography.title}
          </motion.h3>
        </div>

        {/* 3-Column Archival Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start ${isRTL ? 'lg:rtl' : 'lg:ltr'}`}>
          
          {/* Column 1: Archival Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 relative group"
          >
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-brass/30 p-2 bg-charcoal/80 shadow-2xl">
              <div className="relative w-full h-full border border-brass/10 overflow-hidden rounded-sm">
                <Image 
                  src="https://img.lemde.fr/2026/02/14/0/0/2523/1682/664/0/75/0/e50476d_upload-1-j3obcr1lhbux-2025-07-29t130007z-581199573-rc2dwfaiu7u9-rtrmadp-3-iran-nuclear.JPG"
                  alt="Archival Portrait"
                  fill
                  unoptimized
                  className="object-cover filter grayscale sepia-[0.2] contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-ink border border-brass/20 p-4 rounded-sm shadow-xl z-20">
              <p className="font-mono text-xs text-brass tracking-widest uppercase">Archival File</p>
              <p className="font-sans text-[10px] text-gray-500 mt-1">Ref: 1939-PRESENT</p>
            </div>
          </motion.div>

          {/* Column 2: Prose */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`lg:col-span-5 space-y-8 lg:px-4 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <div className="relative">
              <span className="absolute -top-12 -left-8 font-amiri text-9xl text-brass/5 leading-none select-none pointer-events-none">
                &ldquo;
              </span>
              <div 
                className="text-lg md:text-xl text-parchment/80 leading-[2.2] font-light [&>p]:mb-8 relative z-10" 
                dangerouslySetInnerHTML={{ __html: biography.prose[language] }} 
              />
            </div>
            
            <div className="pt-8 border-t border-brass/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <SourceTag url="#" />
              <Link 
                href="/history"
                className="group flex items-center space-x-3 bg-charcoal border border-brass/30 px-6 py-3 rounded-full hover:bg-brass/10 hover:border-brass transition-all duration-300"
              >
                <span className="font-mono text-xs text-parchment uppercase tracking-widest group-hover:text-brass transition-colors">
                  {language === "en" ? "Explore Full History" : "مشاهده تاریخ کامل"}
                </span>
                <ArrowRight className="w-4 h-4 text-brass group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Column 3: Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {biography.stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3 + (idx * 0.15) }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-charcoal/80 to-ink border border-brass/15 p-6 rounded-xl flex flex-col justify-center relative overflow-hidden group shadow-lg hover:shadow-brass/10 hover:border-brass/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brass/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-start text-left">
                  <div className="w-full flex justify-between items-center mb-4">
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{stat.label[language]}</p>
                    <div className="w-6 h-px bg-brass/20 group-hover:bg-brass/60 transition-colors" />
                  </div>
                  <p className="font-amiri text-4xl text-brass group-hover:text-brass-light transition-colors drop-shadow-sm mb-2">{stat.value[language]}</p>
                  <p className="text-xs text-parchment/50 font-sans leading-relaxed">{stat.detail[language]}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
