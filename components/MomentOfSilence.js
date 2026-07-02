"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "./AccessibilityProvider";

export default function MomentOfSilence() {
  const [isActive, setIsActive] = useState(false);
  const { t } = useAccessibility();

  const handleStart = () => {
    setIsActive(true);
    
    // Auto end after 12 seconds
    setTimeout(() => {
      setIsActive(false);
    }, 12000);
  };

  return (
    <>
      <button 
        onClick={handleStart}
        className="text-xs font-mono uppercase tracking-widest text-parchment/40 hover:text-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass px-3 py-1 rounded"
      >
        {t.misc.momentOfSilence}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-default"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1.05, 1.1] }}
              transition={{ duration: 10, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
              className="text-center"
            >
              <h2 className="font-amiri text-4xl md:text-6xl text-brass glow-text">
                {t.misc.momentOfSilence}
              </h2>
            </motion.div>
            
            <button 
              onClick={() => setIsActive(false)}
              className="absolute bottom-12 text-sm font-mono text-parchment/30 hover:text-parchment transition-colors"
            >
              {t.misc.endSilence}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
