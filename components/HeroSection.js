"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useAccessibility } from "./AccessibilityProvider";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import Image from "next/image";
import { ChevronDown, ArrowRight, BookOpen, Clock, Users, MapPin } from "lucide-react";

export default function HeroSection() {
  const { language } = useAccessibility();
  const isRTL = language === "fa";
  const { scrollY } = useScroll();

  // Parallax effects
  const imageY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);
  const imageOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const textY = useTransform(scrollY, [0, 500], ["0%", "10%"]);

  return (
    <section 
      id="hero" 
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Image with Parallax & Vignette */}
      <motion.div 
        className="absolute inset-0 z-0 w-full h-full"
        style={{ y: imageY, opacity: imageOpacity }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80 md:opacity-90 transition-opacity duration-1000"
            src="https://www.youtube.com/embed/egiE8LEclcU?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=egiE8LEclcU&playsinline=1"
            allow="autoplay; encrypted-media"
          />
        </div>
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/70 to-[#0A0A0A] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent pointer-events-none" />
      </motion.div>

      {/* Subtle Geometric Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent mt-24" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent mb-24" />
        <div className="absolute top-0 left-12 w-px h-full bg-gradient-to-b from-transparent via-brass/20 to-transparent hidden md:block" />
        <div className="absolute top-0 right-12 w-px h-full bg-gradient-to-b from-transparent via-brass/20 to-transparent hidden md:block" />
      </div>

      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 mt-16"
      >
        <div className="space-y-8 max-w-3xl flex flex-col items-center">
          
          {/* Logo */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-brass/30 p-1 mb-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] group">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image 
                src="https://img.lemde.fr/2026/02/14/0/0/2523/1682/664/0/75/0/e50476d_upload-1-j3obcr1lhbux-2025-07-29t130007z-581199573-rc2dwfaiu7u9-rtrmadp-3-iran-nuclear.JPG"
                alt="Imam Khamenei"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Section Label */}
          <div className="flex items-center justify-center space-x-4 mb-4 opacity-80">
            <div className="h-px w-8 md:w-16 bg-brass" />
            <span className="font-mono text-brass-light tracking-[0.3em] text-[10px] md:text-xs uppercase">
              {language === "en" ? "Historical Archive" : "آرشیو تاریخی"}
            </span>
            <div className="h-px w-8 md:w-16 bg-brass" />
          </div>

          <h2 className="font-amiri text-5xl md:text-7xl lg:text-[5.5rem] text-parchment leading-tight drop-shadow-sm font-normal">
            {language === "fa" ? siteConfig.name.fa : siteConfig.name.en}
          </h2>
          
          <h1 className="font-mono text-brass/70 tracking-widest text-sm md:text-base uppercase mt-2">
            {siteConfig.dates[language]}
          </h1>

          <p className="font-sans text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mt-8 font-light tracking-wide text-center">
            {language === "en" 
              ? "A comprehensive digital documentation of the life, public career, and historical impact of Sayyid Ali Khamenei. This archive provides structured access to historical timelines, verified archival materials, and international responses."
              : "مستندات دیجیتال جامع از زندگی، دوران مسئولیت عمومی و تأثیر تاریخی سید علی خامنه‌ای. این آرشیو دسترسی ساختاریافته به گاه‌شمار تاریخی، مواد آرشیوی تأیید شده و واکنش‌های بین‌المللی را فراهم می‌کند."}
          </p>
          
          {/* Primary CTAs */}
          <div className={`flex flex-col sm:flex-row items-center gap-4 mt-12 w-full justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Link 
              href="#biography" 
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-brass/10 hover:bg-brass/20 border border-brass/40 hover:border-brass/80 text-brass-light transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            >
              <BookOpen className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono uppercase tracking-widest text-xs md:text-sm font-medium">
                {language === "en" ? "Explore Biography" : "مطالعه زندگینامه"}
              </span>
            </Link>
            
            <Link 
              href="#timeline" 
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            >
              <Clock className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono uppercase tracking-widest text-xs md:text-sm">
                {language === "en" ? "Historical Timeline" : "گاه‌شمار تاریخی"}
              </span>
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 pt-12 border-t border-white/5 opacity-70">
            <Link href="#guestbook" className="text-gray-400 hover:text-brass transition-colors font-sans text-xs md:text-sm tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass/40" />
              {language === "en" ? "Leave a Condolence Message" : "ثبت پیام تسلیت"}
            </Link>
            <Link href="#condolences" className="text-gray-400 hover:text-brass transition-colors font-sans text-xs md:text-sm tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass/40" />
              {language === "en" ? "Official Condolences" : "تسلیت‌های رسمی"}
            </Link>
            <Link href="#map" className="text-gray-400 hover:text-brass transition-colors font-sans text-xs md:text-sm tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass/40" />
              {language === "en" ? "Funeral Cities" : "شهرهای تشییع"}
            </Link>
            <Link href="#footer" className="text-gray-400 hover:text-brass transition-colors font-sans text-xs md:text-sm tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass/40" />
              {language === "en" ? "Acknowledgements" : "قدردانی‌ها"}
            </Link>
          </div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass/50 mb-1">
          {language === "en" ? "Scroll to Explore" : "برای مطالعه به پایین بکشید"}
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-brass/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
