"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, Clock, Map, Image as ImageIcon, Video, FileText, Globe, GraduationCap, MapPin, Archive, Newspaper, MessageCircle, HelpCircle, Link as LinkIcon } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";

const archiveLinks = [
  { href: "/biography", icon: BookOpen, label: { en: "Extended Biography", fa: "زندگی‌نامه تفصیلی" } },
  { href: "/timeline", icon: Clock, label: { en: "Interactive Timeline", fa: "گاه‌شمار تعاملی" } },
  { href: "/funeral", icon: Map, label: { en: "State Funeral Archive", fa: "آرشیو مراسم تشییع" } },
  { href: "/gallery", icon: ImageIcon, label: { en: "Photo Gallery", fa: "گالری تصاویر" } },
  { href: "/videos", icon: Video, label: { en: "Video Archive", fa: "آرشیو ویدیو" } },
  { href: "/speeches", icon: FileText, label: { en: "Speeches & Writings", fa: "سخنرانی‌ها و نوشته‌ها" } },
  { href: "/reactions", icon: Globe, label: { en: "International Reactions", fa: "واکنش‌های بین‌المللی" } },
  { href: "/context", icon: GraduationCap, label: { en: "Historical Context", fa: "زمینه تاریخی" } },
  { href: "/map", icon: MapPin, label: { en: "Interactive Map", fa: "نقشه تعاملی" } },
  { href: "/archive", icon: Archive, label: { en: "Archive & Documents", fa: "اسناد و بایگانی" } },
  { href: "/news", icon: Newspaper, label: { en: "News Timeline", fa: "تایم‌لاین اخبار" } },
  { href: "/quotes", icon: MessageCircle, label: { en: "Quotes Collection", fa: "مجموعه نقل‌قول‌ها" } },
  { href: "/faq", icon: HelpCircle, label: { en: "Frequently Asked Questions", fa: "سوالات متداول" } },
  { href: "/references", icon: LinkIcon, label: { en: "References", fa: "منابع" } },
];

export default function ArchiveMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useAccessibility();
  const pathname = usePathname();

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 text-parchment hover:text-brass transition-colors px-3 py-2 border border-transparent hover:border-brass/30 rounded"
      >
        <Menu className="w-5 h-5" />
        <span className="hidden md:inline font-mono text-sm tracking-widest uppercase">
          {language === "en" ? "Archive" : "آرشیو"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: language === "en" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: language === "en" ? "100%" : "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={`fixed top-0 bottom-0 ${language === "en" ? "right-0" : "left-0"} w-full md:w-96 bg-charcoal border-${language === "en" ? "l" : "r"} border-brass/30 shadow-2xl z-50 overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8 border-b border-brass/20 pb-4">
                  <h2 className="font-amiri text-2xl text-brass">
                    {language === "en" ? "Historical Archive" : "آرشیو تاریخی"}
                  </h2>
                  <button onClick={() => setIsOpen(false)} className="text-parchment/60 hover:text-brass p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-2">
                  <Link 
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded hover:bg-brass/10 transition-colors group mb-4 border border-brass/20"
                  >
                    <span className="font-mono text-sm text-brass group-hover:text-brass-light transition-colors">
                      {language === "en" ? "← Back to Main Memorial" : "← بازگشت به صفحه اصلی"}
                    </span>
                  </Link>

                  {archiveLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link 
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 p-3 rounded transition-colors group ${
                          isActive ? "bg-brass/10 text-brass border border-brass/30" : "hover:bg-ink text-parchment/80 hover:text-parchment border border-transparent"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-brass" : "text-parchment/50 group-hover:text-brass-light"}`} />
                        <span className="font-inter text-sm md:text-base">
                          {link.label[language]}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
