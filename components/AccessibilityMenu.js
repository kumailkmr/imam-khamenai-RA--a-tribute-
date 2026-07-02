"use client";

import { useState, useEffect } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import { Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage, textSize, changeTextSize, reducePattern, toggleReducePattern, t } = useAccessibility();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-charcoal border border-brass/30 flex items-center justify-center text-brass hover:bg-brass hover:text-ink transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2 focus:ring-offset-ink"
        aria-label="Accessibility Menu"
      >
        <Settings className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 left-0 bg-charcoal border border-brass/20 p-6 rounded-md shadow-2xl w-64 space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-amiri text-brass text-lg">Settings</h4>
              <button onClick={() => setIsOpen(false)} className="text-parchment/50 hover:text-parchment">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-parchment/60 uppercase">{t.accessibility.language}</label>
              <div className="flex space-x-2">
                <button 
                  onClick={() => changeLanguage('en')}
                  className={`flex-1 py-1 text-sm border ${language === 'en' ? 'border-brass text-brass' : 'border-parchment/10 text-parchment/50'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => changeLanguage('fa')}
                  className={`flex-1 py-1 font-amiri text-lg border ${language === 'fa' ? 'border-brass text-brass' : 'border-parchment/10 text-parchment/50'}`}
                >
                  فارسی
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-parchment/60 uppercase">{t.accessibility.textSize}</label>
              <div className="flex space-x-2">
                {['base', 'lg', 'xl'].map((size, i) => (
                  <button 
                    key={size}
                    onClick={() => changeTextSize(size)}
                    className={`flex-1 py-1 text-sm border ${textSize === size ? 'border-brass text-brass' : 'border-parchment/10 text-parchment/50'}`}
                  >
                    {['A', 'A+', 'A++'][i]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={reducePattern} 
                  onChange={toggleReducePattern}
                  className="form-checkbox text-brass focus:ring-brass bg-ink border-brass/30 h-4 w-4"
                />
                <span className="text-sm text-parchment/80">{t.accessibility.reducePattern}</span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
