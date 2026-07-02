"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [language, setLanguage] = useState("en"); // "en" or "fa"
  const [textSize, setTextSize] = useState("base"); // "base", "lg", "xl"
  const [reducePattern, setReducePattern] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage on mount
    const savedLang = localStorage.getItem("tribute_lang");
    const savedSize = localStorage.getItem("tribute_text_size");
    const savedPattern = localStorage.getItem("tribute_reduce_pattern");

    setTimeout(() => {
      if (savedLang) setLanguage(savedLang);
      if (savedSize) setTextSize(savedSize);
      if (savedPattern === "true") setReducePattern(true);
    }, 0);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("tribute_lang", lang);
  };

  const changeTextSize = (size) => {
    setTextSize(size);
    localStorage.setItem("tribute_text_size", size);
  };

  const toggleReducePattern = () => {
    const val = !reducePattern;
    setReducePattern(val);
    localStorage.setItem("tribute_reduce_pattern", val.toString());
  };

  const t = translations[language];
  const isRtl = language === "fa";

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        changeLanguage,
        textSize,
        changeTextSize,
        reducePattern,
        toggleReducePattern,
        t,
        isRtl
      }}
    >
      <div 
        dir={isRtl ? "rtl" : "ltr"} 
        className={`
          text-${textSize} 
          ${reducePattern ? 'reduce-pattern' : ''} 
          transition-all duration-300
        `}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
