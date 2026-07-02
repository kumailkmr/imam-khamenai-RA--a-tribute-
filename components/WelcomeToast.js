"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { playWelcomeChime } from "@/lib/sound";

export default function WelcomeToast({ entryCount }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if intro is done (checking session storage or simply delaying)
    const timer = setTimeout(() => {
      setIsVisible(true);
      playWelcomeChime();
    }, 4500); // After intro

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10500); // 6s visibility

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="fixed top-6 right-6 md:top-20 md:right-6 z-40 bg-charcoal/90 backdrop-blur-md border-l-4 border-iran-green shadow-xl px-6 py-4 flex items-center justify-between gap-4 w-[90%] md:w-auto"
        >
          <div>
            <p className="font-amiri text-lg text-brass">Official Mourning Period</p>
            <p className="text-sm text-parchment/80">
              {entryCount > 0 
                ? `${entryCount.toLocaleString()} mourners have left condolences.`
                : "The nation mourns."}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-parchment/50 hover:text-parchment transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
