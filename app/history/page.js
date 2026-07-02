"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";
import { historicalData } from "@/lib/historical-data";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Book, FileText, Anchor } from "lucide-react";
import Image from "next/image";

function HistoryHero() {
  const { language } = useAccessibility();
  const data = historicalData.hero;
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], ["0%", "15%"]);
  
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-charcoal border-b border-brass/20">
      <motion.div className="absolute inset-0 z-0 opacity-20" style={{ y: imageY }}>
        <Image src="/images/hero.jpg" alt="Archive" fill className="object-cover grayscale mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/20" />
      </motion.div>
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 mt-20">
        <div className="inline-flex items-center space-x-4 border border-brass/20 px-6 py-2 rounded-full bg-ink/50 backdrop-blur-sm">
          <Book className="w-4 h-4 text-brass" />
          <span className="font-mono text-xs text-brass tracking-widest uppercase">Historical Research Archive</span>
        </div>
        
        <h1 className="font-amiri text-5xl md:text-6xl text-parchment leading-tight">
          {data.title[language]}
        </h1>
        
        <p className="font-sans text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
          {data.intro[language]}
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 pt-8 opacity-60 font-mono text-xs tracking-wider">
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {data.readingTime}</div>
          <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> {data.sourceCount} Cited Sources</div>
          <div className="flex items-center gap-2">Updated: {data.lastUpdated}</div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title, num }) {
  return (
    <div className="flex items-center gap-4 mb-12 border-b border-brass/10 pb-6">
      <span className="font-mono text-2xl text-brass/40 font-light">0{num}</span>
      <h2 className="font-amiri text-3xl md:text-4xl text-parchment">{title}</h2>
    </div>
  );
}

function DocumentedFamily() {
  const { language } = useAccessibility();
  const data = historicalData.family;
  
  return (
    <section id="family" className="py-24 px-4 bg-ink">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title={language === "en" ? "Documented Family Background" : "پیشینه خانوادگی مستند"} num="1" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-charcoal p-8 border border-brass/10 rounded-sm">
              <h3 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">Parents</h3>
              <p className="text-gray-300 font-light leading-relaxed">{data.parents[language]}</p>
            </div>
            <div className="bg-charcoal p-8 border border-brass/10 rounded-sm">
              <h3 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">Birth</h3>
              <p className="text-gray-300 font-light leading-relaxed">{data.birth[language]}</p>
            </div>
          </div>
          <div className="bg-charcoal p-8 border border-brass/10 rounded-sm h-full flex flex-col justify-center">
             <h3 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">Background</h3>
             <p className="text-gray-300 font-light leading-relaxed">{data.background[language]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LineageClaims() {
  const { language } = useAccessibility();
  const data = historicalData.lineage;
  
  return (
    <section id="lineage" className="py-24 px-4 bg-charcoal border-y border-brass/10">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title={language === "en" ? "Claimed Genealogy & Religious Lineage" : "ادعای تبارشناسی و نسب مذهبی"} num="2" />
        <div className="space-y-8">
          <div className="border-l-2 border-brass/30 pl-6 py-2">
            <h3 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">Reported Claims</h3>
            <p className="text-gray-300 font-light leading-relaxed">{data.claims[language]}</p>
          </div>
          <div className="border-l-2 border-white/10 pl-6 py-2">
            <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-4">Scholarly Context & Methodology</h3>
            <p className="text-gray-400 font-light leading-relaxed">{data.scholarlyContext[language]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicCareer() {
  const { language } = useAccessibility();
  const events = historicalData.career.events;
  
  return (
    <section id="career" className="py-24 px-4 bg-ink">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title={language === "en" ? "Public Career" : "مسئولیت‌های عمومی"} num="4" />
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brass/20 before:to-transparent">
          {events.map((event, idx) => (
            <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-ink bg-charcoal text-brass shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
                <Anchor className="w-3 h-3" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-charcoal p-6 rounded-sm border border-brass/10 ml-16 md:ml-0">
                <span className="font-mono text-xs text-brass tracking-widest block mb-2">{event.year}</span>
                <h3 className="font-amiri text-xl text-parchment mb-3">{event.title[language]}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{event.desc[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HistoricalPerspectives() {
  const { language } = useAccessibility();
  const perspectives = historicalData.perspectives;
  
  return (
    <section id="perspectives" className="py-24 px-4 bg-charcoal border-y border-brass/10">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={language === "en" ? "Historical Perspectives" : "دیدگاه‌های تاریخی"} num="6" />
        <p className="text-gray-400 font-light mb-12 max-w-2xl">
          {language === "en" 
            ? "A summary of varying interpretations from different societal, academic, and international groups. No single perspective is presented as definitive." 
            : "خلاصه‌ای از تفاسیر مختلف از گروه‌های مختلف اجتماعی، دانشگاهی و بین‌المللی. هیچ دیدگاه واحدی به عنوان دیدگاه قطعی ارائه نشده است."}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {perspectives.map((p, idx) => (
            <div key={idx} className="bg-ink p-8 border border-brass/10 rounded-sm">
              <h3 className="font-mono text-xs text-brass tracking-widest uppercase mb-4 h-10">{p.group[language]}</h3>
              <p className="text-gray-300 font-light text-sm leading-relaxed">{p.view[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bibliography() {
  return (
    <section id="bibliography" className="py-24 px-4 bg-ink border-t border-brass/20">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="References & Bibliography" num="10" />
        <ul className="space-y-4 font-sans text-sm text-gray-400 font-light list-decimal pl-6">
          {historicalData.bibliography.map((ref, idx) => (
            <li key={idx} className="pl-2 leading-relaxed">{ref}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-ink pt-16">
      <HistoryHero />
      <DocumentedFamily />
      <LineageClaims />
      {/* Sections 3, 5, 7, 8, 9 would go here in a full implementation, following the same architectural pattern */}
      <PublicCareer />
      <HistoricalPerspectives />
      <Bibliography />
    </main>
  );
}
