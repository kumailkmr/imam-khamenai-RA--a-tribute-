"use client";

import { useEffect, useState } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import { motion } from "framer-motion";
import ArchiveMenu from "./ArchiveMenu";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { t } = useAccessibility();

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
    { id: "biography", label: t.nav.biography },
    { id: "timeline", label: t.nav.timeline },
    { id: "funeral", label: t.nav.funeral },
    { id: "guestbook", label: t.nav.guestbook },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'bg-charcoal border-b border-brass/20 shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="font-amiri text-2xl text-brass hover:text-brass-light transition-colors focus:outline-none focus:ring-2 focus:ring-brass rounded">
          {t.nav.hero}
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id} className="relative flex items-center">
                <a 
                  href={`#${item.id}`}
                  className={`text-sm font-mono tracking-widest uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-brass rounded px-2 py-1 ${activeSection === item.id ? 'text-brass' : 'text-parchment/60 hover:text-parchment'}`}
                >
                  {item.label}
                </a>
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brass mx-2"
                  />
                )}
              </li>
            ))}
          </ul>
          
          <div className="h-6 w-px bg-brass/20 mx-2" />
          
          <ArchiveMenu />
        </div>

        <div className="md:hidden flex items-center">
          <ArchiveMenu />
        </div>
      </div>
    </nav>
  );
}
