"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { siteConfig } from "@/lib/content";
import MomentOfSilence from "./MomentOfSilence";
import { Mail, Globe, Code2, Database, LayoutTemplate, Sparkles, Accessibility, Gauge, FolderTree } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const { language, t } = useAccessibility();
  const isRTL = language === "fa";

  const techStack = [
    "Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Vercel"
  ];

  const credits = [
    { icon: <Database className="w-3 h-3" />, label: "Research & Documentation" },
    { icon: <LayoutTemplate className="w-3 h-3" />, label: "Design System" },
    { icon: <Code2 className="w-3 h-3" />, label: "Frontend Development" },
    { icon: <Accessibility className="w-3 h-3" />, label: "Accessibility" },
    { icon: <Gauge className="w-3 h-3" />, label: "Performance Optimization" },
    { icon: <FolderTree className="w-3 h-3" />, label: "Content Organization" },
    { icon: <Globe className="w-3 h-3" />, label: "UI/UX Design" },
    { icon: <Sparkles className="w-3 h-3" />, label: "Animation System" }
  ];

  const sources = [
    "Historical sources", "Academic publications", "Official public documents", "International news organizations", "Digital archives"
  ];

  return (
    <footer className="bg-ink border-t border-brass/20 relative overflow-hidden print-hide z-10">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brass/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Existing Condolence Banner */}
        <div className="text-center mb-24 space-y-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brass/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          <p className="font-amiri text-3xl md:text-4xl text-brass drop-shadow-sm">{siteConfig.condolence}</p>
          <p className="font-light text-parchment/70 text-sm md:text-base max-w-2xl mx-auto">{siteConfig.condolenceTranslation[language]}</p>
          
          <div className="pt-8">
            <MomentOfSilence />
          </div>
        </div>

        {/* Multi-Column Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-t border-brass/10 pt-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Column 1: Acknowledgements & Sources */}
          <div className="space-y-8">
            <div>
              <h4 className="font-mono text-brass text-sm uppercase tracking-[0.2em] mb-4">Acknowledgements</h4>
              <div className="bg-charcoal/50 border border-brass/10 p-5 rounded backdrop-blur-sm shadow-lg">
                <p className="text-parchment/70 text-xs leading-relaxed font-sans">
                  This website is intended as a historical and educational archive. Information has been compiled from publicly available and scholarly sources. Every effort has been made to present information accurately and with appropriate citations.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono text-brass text-sm uppercase tracking-[0.2em] mb-4">Source Attribution</h4>
              <ul className="space-y-2">
                {sources.map((source, idx) => (
                  <li key={idx} className="text-parchment/50 text-xs font-mono tracking-wider flex items-center space-x-2">
                    <span className={`w-1 h-1 rounded-full bg-brass/30 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Credits */}
          <div className="space-y-6">
            <h4 className="font-mono text-brass text-sm uppercase tracking-[0.2em] mb-4">Credits</h4>
            <ul className="space-y-3">
              {credits.map((credit, idx) => (
                <li key={idx} className={`flex items-center space-x-3 text-parchment/60 hover:text-brass transition-colors text-xs font-sans group ${isRTL ? 'space-x-reverse' : ''}`}>
                  <div className="w-6 h-6 rounded-full bg-charcoal border border-brass/10 flex items-center justify-center group-hover:border-brass/40 transition-colors">
                    {credit.icon}
                  </div>
                  <span>{credit.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tech Stack */}
          <div className="space-y-6">
            <h4 className="font-mono text-brass text-sm uppercase tracking-[0.2em] mb-4">Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-charcoal/60 border border-brass/20 rounded-md text-[10px] font-mono text-parchment/70 tracking-widest hover:bg-brass/10 hover:border-brass/50 hover:text-brass transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Developer & Project Info */}
          <div className="space-y-10">
            <div>
              <h4 className="font-mono text-brass text-sm uppercase tracking-[0.2em] mb-4">Designed & Developed by</h4>
              <div className="group inline-block">
                <h5 className="font-amiri text-2xl text-parchment group-hover:text-brass-light transition-colors mb-2">Kumail Kmr</h5>
                <div className="space-y-1">
                  <p className="text-xs text-parchment/50 font-mono tracking-widest uppercase">Full Stack Developer</p>
                  <p className="text-xs text-parchment/50 font-mono tracking-widest uppercase">AI Automation Engineer</p>
                  <p className="text-xs text-parchment/50 font-mono tracking-widest uppercase">UI/UX Designer</p>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal border border-brass/20 flex items-center justify-center text-brass hover:bg-brass hover:text-ink transition-all duration-300 shadow-lg">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://github.com/kumailkmr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-charcoal border border-brass/20 flex items-center justify-center text-brass hover:bg-brass hover:text-ink transition-all duration-300 shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal border border-brass/20 flex items-center justify-center text-brass hover:bg-brass hover:text-ink transition-all duration-300 shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal border border-brass/20 flex items-center justify-center text-brass hover:bg-brass hover:text-ink transition-all duration-300 shadow-lg">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brass/10 bg-[#050505]">
        <div className={`max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          
          <div className="flex items-center space-x-6 text-[10px] font-mono tracking-widest text-parchment/40 uppercase">
            <span>Historical Research Archive</span>
            <span className="w-1 h-1 rounded-full bg-brass/30" />
            <span>v1.0.0</span>
            <span className="w-1 h-1 rounded-full bg-brass/30" />
            <span>Updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-parchment/40 uppercase text-center md:text-left">
            <span className="block md:inline">&copy; 2026 All Rights Reserved.</span>
            <span className="hidden md:inline mx-2">|</span>
            <span className="block md:inline mt-1 md:mt-0 text-brass/70">Designed & Developed by Kumail Kmr.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
