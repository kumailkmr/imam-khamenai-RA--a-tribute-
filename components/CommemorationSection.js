"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { extendedFuneralDetails, lastVerifiedDate } from "@/lib/announcements";
import { MapPin, Calendar, Clock, ArrowRight, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SourceTag from "./SourceTag";
import dynamic from "next/dynamic";

const FuneralMap = dynamic(() => import("@/components/FuneralMap"), { ssr: false });
const VisitorTools = dynamic(() => import("@/components/VisitorTools"), { ssr: false });
const LivestreamSlot = dynamic(() => import("@/components/LivestreamSlot"), { ssr: false });

export default function CommemorationSection() {
  const { language, t } = useAccessibility();
  const isRTL = language === "fa";

  return (
    <section id="funeral" className="relative py-32 px-4 bg-[#0A0A0A] overflow-hidden scroll-mt-20">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brass/5 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-12 w-px h-full bg-gradient-to-b from-brass/0 via-brass/20 to-brass/0 hidden lg:block pointer-events-none" />
      <div className="absolute top-0 right-12 w-px h-full bg-gradient-to-b from-brass/0 via-brass/20 to-brass/0 hidden lg:block pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="border border-brass/30 bg-charcoal/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-ink border-b border-brass/20 px-8 py-10 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-brass/10 to-transparent opacity-50" />
            
            {/* Status Badge */}
            <div className="absolute top-6 right-6">
              {extendedFuneralDetails.status === 'in-progress' && (
                <div className="bg-muted-red/20 border border-muted-red text-muted-red text-xs font-mono px-4 py-1.5 rounded-full flex items-center space-x-2 shadow-lg backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-muted-red animate-pulse" />
                  <span>{t.funeral.inProgress}</span>
                </div>
              )}
              {extendedFuneralDetails.status === 'concluded' && (
                <div className="bg-charcoal/50 border border-brass/30 text-parchment/70 text-xs font-mono px-4 py-1.5 rounded-full backdrop-blur-sm">
                  <span>{t.funeral.concluded}</span>
                </div>
              )}
            </div>

            <ShieldAlert className="w-8 h-8 text-brass mb-4 opacity-80" />
            <h3 className="font-amiri text-4xl md:text-5xl text-parchment drop-shadow-md relative z-10 mb-4">{t.funeral.title}</h3>
            
            <div className="flex flex-col items-center space-y-3 relative z-10 mt-2">
              <div className="flex items-center space-x-3 bg-charcoal/50 px-4 py-2 rounded-full border border-brass/10">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{t.funeral.source}</span>
                <SourceTag url="https://en.wikipedia.org/wiki/Ali_Khamenei#Death_and_funeral" />
              </div>
              <p className="text-[10px] font-mono text-brass/50 uppercase tracking-widest">
                {t.misc.lastVerified}: {lastVerifiedDate}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-brass/20 bg-charcoal/30 ${isRTL ? 'lg:divide-x-reverse' : ''}`}>
            
            {/* Left Column: Schedule */}
            <div className="p-8 lg:p-12 space-y-12">
              
              {/* Dates */}
              <div className="relative group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-ink border border-brass/20 flex items-center justify-center shrink-0 group-hover:border-brass/50 transition-colors">
                    <Calendar className="w-4 h-4 text-brass" />
                  </div>
                  <h5 className="font-mono text-xs text-brass uppercase tracking-[0.2em]">{t.funeral.dates}</h5>
                </div>
                <div className="pl-14">
                  <p className="font-amiri text-2xl md:text-3xl text-parchment/90 leading-tight">{extendedFuneralDetails.dates[language]}</p>
                </div>
              </div>

              {/* Dignitary */}
              <div className="relative group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-ink border border-brass/20 flex items-center justify-center shrink-0 group-hover:border-brass/50 transition-colors">
                    <Clock className="w-4 h-4 text-brass" />
                  </div>
                  <h5 className="font-mono text-xs text-brass uppercase tracking-[0.2em]">{t.funeral.dignitary}</h5>
                </div>
                <div className="pl-14">
                  <p className="font-amiri text-xl md:text-2xl text-parchment/80 leading-relaxed">{extendedFuneralDetails.dignitaryCeremony[language]}</p>
                </div>
              </div>
              
            </div>

            {/* Right Column: Locations */}
            <div className="p-8 lg:p-12 relative bg-ink/20">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-charcoal border border-brass/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-iran-green-bright" />
                </div>
                <h5 className="font-mono text-xs text-iran-green-bright uppercase tracking-[0.2em]">{t.funeral.locations}</h5>
              </div>
              
              <div className="space-y-8 pl-14 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-brass/40 before:to-transparent">
                {extendedFuneralDetails.locations.map((loc, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative"
                  >
                    <div className="absolute -left-14 top-2 w-2 h-2 rounded-full bg-brass ring-4 ring-ink" />
                    <span className="block font-amiri text-2xl text-brass mb-2">{loc.city[language]}</span>
                    <span className="block text-parchment/60 font-sans text-sm leading-relaxed">{loc.detail[language]}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Map & Tools Footer */}
          <div className="bg-ink p-8 lg:p-12 border-t border-brass/20">
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <p className="text-xs font-mono text-brass/60 uppercase tracking-[0.2em] mb-4">
                {t.funeral.scheduleHistory}
              </p>
              <p className="text-parchment/70 font-sans text-sm md:text-base font-light leading-loose">
                {extendedFuneralDetails.historyNote[language]}
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-brass/30 shadow-2xl mb-12">
              <FuneralMap />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VisitorTools />
              <LivestreamSlot />
            </div>
            
            <div className="mt-16 flex justify-center">
              <Link 
                href="/funeral" 
                className="group relative inline-flex items-center justify-center bg-charcoal border border-brass/30 px-8 py-4 rounded-full overflow-hidden hover:border-brass transition-all duration-500 shadow-[0_0_20px_rgba(184,134,11,0.05)] hover:shadow-[0_0_30px_rgba(184,134,11,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brass/0 via-brass/10 to-brass/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                <span className="font-mono text-xs text-parchment uppercase tracking-[0.2em] group-hover:text-brass transition-colors relative z-10">
                  {language === "en" ? "View Full State Funeral Archive" : "مشاهده آرشیو کامل مراسم تشییع"}
                </span>
                <ArrowRight className={`w-4 h-4 text-brass ${isRTL ? 'mr-3 rotate-180' : 'ml-3'} group-hover:translate-x-1 transition-transform relative z-10`} />
              </Link>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
