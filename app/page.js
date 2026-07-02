"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { siteConfig, biography, timeline } from "@/lib/content";
import { extendedFuneralDetails, lastVerifiedDate } from "@/lib/announcements";
import { useAccessibility } from "@/components/AccessibilityProvider";

// Static Imports for above-the-fold
import IntroOverlay from "@/components/IntroOverlay";
import AnnouncementBar from "@/components/AnnouncementBar";
import AlertBanner from "@/components/AlertBanner";
import WelcomeToast from "@/components/WelcomeToast";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import BackToTop from "@/components/BackToTop";
import MomentOfSilence from "@/components/MomentOfSilence";
import SourceTag from "@/components/SourceTag";
import HeroPortrait from "@/components/HeroPortrait";

// Dynamic Imports for below-the-fold
const GuestbookForm = dynamic(() => import("@/components/GuestbookForm"), { ssr: false });
const GuestbookFeed = dynamic(() => import("@/components/GuestbookFeed"), { ssr: false });
const Timeline = dynamic(() => import("@/components/TimelineSection"), { ssr: false });
const FuneralMap = dynamic(() => import("@/components/FuneralMap"), { ssr: false });
const VisitorTools = dynamic(() => import("@/components/VisitorTools"), { ssr: false });
const LivestreamSlot = dynamic(() => import("@/components/LivestreamSlot"), { ssr: false });
const OfficialCondolences = dynamic(() => import("@/components/OfficialCondolences"), { ssr: false });
const PressCoverage = dynamic(() => import("@/components/PressCoverage"), { ssr: false });
const RelatedLinks = dynamic(() => import("@/components/RelatedLinks"), { ssr: false });

function Hero() {
  const { language } = useAccessibility();
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20 pb-16 bg-pattern animate-drift">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/50 to-ink pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-6xl mx-auto mt-12 md:mt-0"
      >
        <HeroPortrait />

        <div className="space-y-6 max-w-2xl">
          <h2 className="font-amiri text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-brass-light to-brass leading-snug drop-shadow-sm">
            {siteConfig.name.fa}
          </h2>
          <h1 className="font-amiri text-4xl md:text-6xl text-parchment tracking-wide">
            {siteConfig.name.en}
          </h1>
          
          <div className="flex items-center justify-center space-x-4 pt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-brass" />
            <span className="font-mono text-brass-light tracking-widest text-sm md:text-base">
              {siteConfig.dates[language]}
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-brass" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Biography() {
  const { language, t } = useAccessibility();
  return (
    <section id="biography" className="py-24 px-4 bg-charcoal border-y border-iran-green/30 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-2 space-y-6"
        >
          <div className="flex items-center space-x-4">
            <h3 className="font-amiri text-3xl text-brass border-b border-brass/20 pb-4 inline-block pr-12">
              {t.biography.title}
            </h3>
          </div>
          <div className="text-lg md:text-xl text-parchment/90 leading-relaxed font-light space-y-4" dangerouslySetInnerHTML={{ __html: biography.prose[language] }} />
          <SourceTag url="#" />
        </motion.div>

        <div className="space-y-8 md:border-l border-brass/10 md:pl-8 flex flex-col justify-center">
          {biography.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-1"
            >
              <p className="font-mono text-sm text-iran-green-bright uppercase tracking-wider">{stat.label[language]}</p>
              <p className="font-amiri text-3xl text-brass">{stat.value[language]}</p>
              <p className="text-sm text-parchment/60">{stat.detail[language]}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Commemoration() {
  const { language, t } = useAccessibility();
  return (
    <section id="funeral" className="py-24 px-4 bg-charcoal bg-pattern animate-drift relative border-y border-muted-red/20 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border border-brass/20 bg-ink/80 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden"
        >
          {extendedFuneralDetails.status === 'in-progress' && (
             <div className="absolute top-0 right-0 bg-muted-red text-white text-xs font-mono px-4 py-1 flex items-center space-x-2 shadow-lg">
               <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
               <span>{t.funeral.inProgress}</span>
             </div>
          )}
          {extendedFuneralDetails.status === 'concluded' && (
             <div className="absolute top-0 right-0 bg-charcoal text-parchment/50 border-b border-l border-brass/20 text-xs font-mono px-4 py-1">
               <span>{t.funeral.concluded}</span>
             </div>
          )}
          
          <div className="text-center mb-12">
            <h3 className="font-amiri text-3xl text-brass mb-4">{t.funeral.title}</h3>
            <div className="h-px w-24 bg-iran-green mx-auto" />
            <div className="mt-4 flex flex-col items-center justify-center space-y-2">
              <p className="text-sm font-mono text-parchment/50 uppercase flex items-center space-x-2">
                <span>{t.funeral.source}</span>
                <SourceTag url="https://en.wikipedia.org/wiki/Ali_Khamenei#Death_and_funeral" />
              </p>
              <p className="text-xs font-mono text-parchment/30 uppercase tracking-widest">
                {t.misc.lastVerified}: {lastVerifiedDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-brass">
                <Calendar className="w-6 h-6" />
                <h5 className="font-mono text-sm uppercase tracking-widest">{t.funeral.dates}</h5>
              </div>
              <p className="font-amiri text-2xl text-parchment">{extendedFuneralDetails.dates[language]}</p>
              
              <div className="flex items-center space-x-3 text-brass pt-6 border-t border-brass/10">
                <Clock className="w-6 h-6" />
                <h5 className="font-mono text-sm uppercase tracking-widest">{t.funeral.dignitary}</h5>
              </div>
              <p className="font-amiri text-xl text-parchment">{extendedFuneralDetails.dignitaryCeremony[language]}</p>
            </div>
            
            <div className="space-y-6">
               <div className="flex items-center space-x-3 text-iran-green-bright">
                <MapPin className="w-6 h-6" />
                <h5 className="font-mono text-sm uppercase tracking-widest">{t.funeral.locations}</h5>
              </div>
              <div className="space-y-4">
                {extendedFuneralDetails.locations.map((loc, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col"
                  >
                    <span className="font-amiri text-xl text-brass-light">{loc.city[language]}</span>
                    <span className="text-parchment/70 font-light">{loc.detail[language]}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-brass/10 text-center">
             <p className="text-sm font-mono text-parchment/50 uppercase tracking-widest mb-2">
               {t.funeral.scheduleHistory}
             </p>
             <p className="text-parchment/70 font-light text-sm max-w-2xl mx-auto leading-relaxed">
               {extendedFuneralDetails.historyNote[language]}
             </p>
             <FuneralMap />
             <VisitorTools />
             <LivestreamSlot />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [totalEntries, setTotalEntries] = useState(0);
  const { language, t } = useAccessibility();

  return (
    <main className="min-h-screen">
      <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-charcoal focus:text-brass focus:ring-2 focus:ring-brass rounded">
        {t.misc.skipToContent}
      </a>
      
      <ScrollProgress />
      <Nav />
      <IntroOverlay />
      <WelcomeToast entryCount={totalEntries} />
      
      <div className="sticky top-0 z-40 flex flex-col shadow-lg shadow-black/50">
        <AlertBanner />
        <AnnouncementBar />
      </div>
      
      <Hero />
      <Biography />
      <Timeline />
      
      <OfficialCondolences />
      <PressCoverage />
      
      <Commemoration />
      
      <section id="guestbook" className="py-24 px-4 bg-ink scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 mb-8 border-b border-brass/20 pb-4 inline-block">
            <h3 className="font-amiri text-3xl text-brass">
              {t.guestbook.title}
            </h3>
            {/* Animated Flame icon near guestbook heading */}
            <svg className="w-6 h-6 text-brass animate-pulse" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
               <path d="M12 2C12 2 8 8 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 8 12 2 12 2ZM12 22C8.68629 22 6 19.3137 6 16C6 11 12 5 12 5C12 5 18 11 18 16C18 19.3137 15.3137 22 12 22Z" />
            </svg>
          </div>
          <GuestbookForm />
          <GuestbookFeed onNewEntryCount={setTotalEntries} />
        </div>
      </section>
      
      <RelatedLinks />
      
      <footer className="py-12 bg-charcoal text-center border-t border-brass/20 space-y-6 relative overflow-hidden group print-hide">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brass/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        
        <p className="font-amiri text-2xl md:text-3xl text-brass">{siteConfig.condolence}</p>
        <p className="font-light text-parchment/70 text-sm md:text-base">{siteConfig.condolenceTranslation[language]}</p>
        
        <div className="pt-6">
          <MomentOfSilence />
        </div>
        
        <div className="w-12 h-px bg-iran-green mx-auto my-8" />
        
        <p className="text-xs font-mono text-parchment/40 max-w-2xl mx-auto px-4">
          {t.footer.disclaimer}
        </p>
      </footer>

      <AccessibilityMenu />
      <BackToTop />
    </main>
  );
}
