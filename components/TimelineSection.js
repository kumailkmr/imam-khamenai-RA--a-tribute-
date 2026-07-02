"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/content";
import { useAccessibility } from "./AccessibilityProvider";

export default function TimelineSection() {
  const { language, t } = useAccessibility();

  return (
    <section id="timeline" className="py-24 px-4 bg-ink scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-amiri text-3xl text-brass text-center mb-16">{t.timeline.title}</h3>
        
        <div className="relative">
          {/* Vertical Thread */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brass/30 to-transparent -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {timeline.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 border-brass bg-ink -translate-x-1/2 mt-1.5 z-10" />
                  
                  {/* Content Box */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <span className="font-mono text-sm text-iran-green-bright mb-2 block tracking-widest">{event.year[language]}</span>
                    <h4 className="font-amiri text-2xl text-brass-light mb-3">{event.title[language]}</h4>
                    <p className="text-parchment/70 font-light leading-relaxed">{event.description[language]}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
