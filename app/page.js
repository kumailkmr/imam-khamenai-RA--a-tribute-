"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
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
import HeroPortrait from "@/components/HeroPortrait";
import HeroSection from "@/components/HeroSection";
import BiographySection from "@/components/BiographySection";
import CommemorationSection from "@/components/CommemorationSection";
import Footer from "@/components/Footer";

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

      <HeroSection />
      <BiographySection />
      <Timeline />
      
      <CommemorationSection />

      <OfficialCondolences />
      <PressCoverage />
      
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
      
      <Footer />

      <AccessibilityMenu />
      <BackToTop />
    </main>
  );
}
