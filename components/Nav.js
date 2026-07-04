"use client";

import { useEffect, useState } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "biography", label: t.nav.biography, path: "/" },
    { id: "history", label: language === "en" ? "Historical Research" : "تحقیقات تاریخی", path: "/history" },
    { id: "timeline", label: t.nav.timeline, path: "/" },
    { id: "funeral", label: t.nav.funeral, path: "/" },
    { id: "guestbook", label: t.nav.guestbook, path: "/" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-brass/10 shadow-xl py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-brass/30 hover:border-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass">
          <Image 
            src="https://img.lemde.fr/2026/02/14/0/0/2523/1682/664/0/75/0/e50476d_upload-1-j3obcr1lhbux-2025-07-29t130007z-581199573-rc2dwfaiu7u9-rtrmadp-3-iran-nuclear.JPG"
            alt="Logo"
            fill
            unoptimized
            className="object-cover"
          />
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id} className="relative flex items-center">
                <Link 
                  href={item.path === "/" ? `/#${item.id}` : item.path}
                  className={`text-sm font-mono tracking-widest uppercase transition-all duration-300 focus:outline-none rounded px-4 py-2 border ${activeSection === item.id ? 'border-blue-400 text-white bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-blue-900/50 text-blue-200 bg-blue-900/20 hover:bg-blue-500 hover:border-blue-400 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}
                >
                  {item.label}
                </Link>
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-3 left-0 right-0 h-1 rounded-full bg-blue-400 mx-4 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
