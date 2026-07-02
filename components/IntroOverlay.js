"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/content";
import { useAccessibility } from "./AccessibilityProvider";
import { playIntroDrone, getAudioState, setAudioState } from "@/lib/sound";

export default function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const { t } = useAccessibility();
  const shouldReduceMotion = useReducedMotion();
  
  // Keep track of the cancellation function for the drone
  const stopDroneRef = useRef(null);

  useEffect(() => {
    // Sync initial sound state (deferred to avoid synchronous state update in effect)
    setTimeout(() => {
      setSoundEnabled(getAudioState());
    }, 0);
  }, []);

  const handleDismiss = () => {
    setIsDismissing(true);
    sessionStorage.setItem("tribute_intro_seen", "true");
    
    // Trigger drone fadeout if playing
    if (stopDroneRef.current) {
      stopDroneRef.current();
      stopDroneRef.current = null;
    }

    setTimeout(() => {
      setIsVisible(false);
    }, 600); // 0.6s fade out (3.2 -> 3.8s)
  };

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("tribute_intro_seen");
    if (hasSeenIntro && process.env.NODE_ENV !== "development") {
      setTimeout(() => setIsVisible(false), 0);
      return;
    }

    if (shouldReduceMotion) {
      // Just a simple fade out after a short time
      const timer = setTimeout(() => handleDismiss(), 1500);
      return () => clearTimeout(timer);
    } else {
      // Exact sequence timing: total ~3.8s
      const timer = setTimeout(() => handleDismiss(), 3200); // Trigger dismiss at 3.2s to fade by 3.8s
      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion]);

  // When sound toggles in the intro, update global state
  const handleSoundToggle = async () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    await setAudioState(newState);
    window.dispatchEvent(new Event("audio_state_changed"));
    
    // Play drone immediately if unmuted during intro sequence
    if (newState && !isDismissing) {
      stopDroneRef.current = playIntroDrone();
    } else if (!newState && stopDroneRef.current) {
      stopDroneRef.current();
      stopDroneRef.current = null;
    }
  };
  // Remove old local audio effect
  // Removed local audio effect since it's handled on toggle/mount

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isDismissing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink cursor-pointer"
          onClick={handleDismiss}
        >
          {/* Background Pattern: Fades in 0 - 0.8s */}
          {!shouldReduceMotion && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" 
            />
          )}

          {/* Sound toggle */}
          <div className="absolute top-6 right-6 z-[110]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleSoundToggle}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-colors text-xs font-mono uppercase tracking-widest ${
                soundEnabled 
                  ? 'border-brass bg-brass/10 text-brass' 
                  : 'border-brass/30 text-parchment/50 hover:text-parchment hover:border-parchment'
              }`}
            >
              <div className={`w-2 h-2 rounded-full border border-current ${soundEnabled ? 'bg-current' : 'bg-transparent'}`} />
              <span>{soundEnabled ? t.misc.soundOn : t.misc.enableSound}</span>
            </button>
          </div>

          <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-2xl px-4">
            
            {shouldReduceMotion ? (
              // Simplified for reduced motion
              <div className="text-center space-y-6">
                <h1 className="font-amiri text-5xl text-brass leading-snug">{siteConfig.name.fa}</h1>
                <h2 className="font-amiri text-3xl text-parchment">{siteConfig.name.en}</h2>
              </div>
            ) : (
              // Strict sequence animation
              <>
                {/* 0.8 - 1.8s (1s duration, 0.8s delay) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="mb-8"
                >
                  <h1 className="font-amiri text-5xl md:text-7xl lg:text-8xl text-brass text-center leading-snug drop-shadow-lg">
                    {siteConfig.name.fa}
                  </h1>
                </motion.div>

                {/* 1.8 - 2.6s (0.8s duration, 1.8s delay) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.8, ease: "easeInOut" }}
                  className="mb-8"
                >
                  <h2 className="font-amiri text-3xl md:text-4xl lg:text-5xl text-parchment text-center tracking-wide">
                    {siteConfig.name.en}
                  </h2>
                </motion.div>

                {/* 2.6 - 3.2s (0.6s duration, 2.6s delay) */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 2.6, ease: "easeInOut" }}
                  className="h-[1px] w-full max-w-[200px] bg-gradient-to-r from-transparent via-brass to-transparent origin-center"
                />
              </>
            )}
          </div>

          {/* Skip Intro */}
          <div className="absolute bottom-8 right-8 z-[110]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="text-xs font-mono text-parchment/40 hover:text-parchment transition-colors uppercase tracking-widest border-b border-transparent hover:border-parchment/40"
            >
              {t.misc.skipIntro}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
