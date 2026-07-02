"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { timeline } from "@/lib/content";
import { useAccessibility } from "./AccessibilityProvider";

export default function TimelineSection() {
  const { language, t } = useAccessibility();

  return (
    <section id="timeline" className="py-24 px-4 bg-ink relative overflow-hidden scroll-mt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brass/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-iran-green/5 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-4 mb-4"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brass" />
            <span className="font-mono text-brass tracking-widest text-sm uppercase">
              {language === "en" ? "Milestones" : "نقاط عطف"}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brass" />
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-amiri text-4xl md:text-5xl text-parchment"
          >
            {t.timeline.title}
          </motion.h3>
        </div>
        
        <div className="relative">
          {/* Glowing Vertical Thread */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
          
          <div className="space-y-12 md:space-y-0 relative">
            {timeline.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center md:pb-24 last:pb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Glowing Dot */}
                  <div className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full border-2 border-brass bg-ink shadow-[0_0_15px_rgba(212,175,55,0.6)] -translate-x-1/2 z-20 top-0 md:top-1/2 md:-translate-y-1/2 hidden md:block" />
                  
                  {/* Mobile Dot */}
                  <div className="absolute left-8 w-4 h-4 rounded-full border-2 border-brass bg-ink shadow-[0_0_10px_rgba(212,175,55,0.6)] -translate-x-1/2 z-20 top-6 md:hidden" />

                  {/* Connecting Line (Desktop) */}
                  <div className={`hidden md:block absolute top-1/2 w-1/2 h-px bg-gradient-to-r ${isEven ? 'from-transparent to-brass/30 right-1/2' : 'from-brass/30 to-transparent left-1/2'} -translate-y-1/2 z-10`} />
                  
                  {/* Content Box */}
                  <div className={`ml-20 md:ml-0 md:w-[45%] w-full pr-4 md:pr-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="bg-charcoal/40 backdrop-blur-md border border-brass/20 p-8 rounded-2xl group hover:border-brass/60 transition-all duration-500 hover:shadow-2xl hover:shadow-brass/10 hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-brass/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-brass/10 border border-brass/20 rounded-full font-mono text-xs text-brass mb-4 tracking-widest shadow-sm">
                          {event.year[language]}
                        </span>
                        <h4 className="font-amiri text-2xl md:text-3xl text-parchment mb-3 group-hover:text-brass-light transition-colors drop-shadow-sm">
                          {event.title[language]}
                        </h4>
                        <p className="text-parchment/70 font-light leading-relaxed text-sm md:text-base">
                          {event.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-24 text-center relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brass/20 to-transparent -translate-y-1/2" />
          <Link href="/timeline" className="relative z-10 inline-flex items-center bg-ink px-8 py-4 border border-brass/30 text-brass hover:text-ink hover:bg-brass hover:border-brass font-mono text-sm uppercase tracking-widest transition-all duration-300 rounded-full group shadow-xl">
            {language === "en" ? "View Interactive Timeline" : "مشاهده گاه‌شمار تعاملی"}
            <ArrowRight className={`w-4 h-4 ${language === "en" ? "ml-3" : "mr-3 rotate-180"} group-hover:translate-x-1 transition-transform`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
