"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/content";
import { useAccessibility } from "./AccessibilityProvider";
import { playIntroDrone, getAudioState, setAudioState } from "@/lib/sound";

export default function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const { t, language } = useAccessibility();
  const shouldReduceMotion = useReducedMotion();
  
  // Keep track of the cancellation function for the drone
  const stopDroneRef = useRef(null);

  useEffect(() => {
    // Sync initial sound state (deferred to avoid synchronous state update in effect)
    setTimeout(() => {
      setSoundEnabled(getAudioState());
    }, 0);

    const hasSeenIntro = sessionStorage.getItem("tribute_intro_seen");
    if (hasSeenIntro && process.env.NODE_ENV !== "development") {
      setTimeout(() => setIsVisible(false), 0);
      return;
    }
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    if (shouldReduceMotion) {
      // Just a simple fade out after a short time
      const timer = setTimeout(() => handleDismiss(), 1500);
      return () => clearTimeout(timer);
    } else {
      // Exact sequence timing: total ~6.8s
      const timer = setTimeout(() => handleDismiss(), 6000); // Trigger dismiss at 6s to fade by 6.8s
      return () => clearTimeout(timer);
    }
  }, [hasStarted, shouldReduceMotion]);

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

  const handleStart = async () => {
    setHasStarted(true);
    setSoundEnabled(true);
    await setAudioState(true);
    window.dispatchEvent(new Event("audio_state_changed"));
  };

  // When sound toggles in the intro, update global state
  const handleSoundToggle = async () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    await setAudioState(newState);
    window.dispatchEvent(new Event("audio_state_changed"));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isDismissing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink overflow-hidden"
        >
          {/* Background Pattern */}
          {!shouldReduceMotion && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" 
            />
          )}

          {!hasStarted ? (
            // Click to Enter Screen (Bypasses Browser Autoplay Restrictions)
            <div className="relative z-10 flex flex-col items-center justify-center">
              <button 
                onClick={handleStart}
                className="group relative flex flex-col items-center justify-center focus:outline-none"
              >
                <div className="absolute inset-0 bg-brass/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-brass/30 flex items-center justify-center mb-6 group-hover:border-brass/80 group-hover:bg-brass/5 transition-all duration-700 shadow-[0_0_30px_rgba(184,134,11,0.1)] group-hover:shadow-[0_0_50px_rgba(184,134,11,0.3)]">
                  <div className="w-2 h-2 rounded-full bg-brass animate-ping" />
                </div>
                <span className="font-mono text-sm tracking-[0.3em] uppercase text-parchment/60 group-hover:text-brass transition-colors duration-500">
                  {language === "en" ? "Click to Enter" : "برای ورود کلیک کنید"}
                </span>
              </button>
            </div>
          ) : (
            // 6-Second Intro Sequence
            <>
              {/* Hidden YouTube Iframe for Audio (Now allowed to autoplay because of user interaction) */}
              {soundEnabled && (
                <iframe 
                  src="https://www.youtube.com/embed/Oo3Ocy7N1R0?autoplay=1&controls=0&showinfo=0&autohide=1&mute=0" 
                  allow="autoplay" 
                  className="absolute opacity-0 pointer-events-none w-1 h-1 -z-50"
                  title="Intro Audio"
                />
              )}

              {/* Sound toggle */}
              <div className="absolute top-6 right-6 z-[110]">
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

              <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-4xl px-4">
                
                {shouldReduceMotion ? (
                  <div className="text-center space-y-6">
                    <h1 className="font-amiri text-5xl text-brass leading-snug">آیت‌الله سید علی خامنه‌ای (رضوان الله علیه)</h1>
                    <h2 className="font-amiri text-3xl text-parchment">Ayatollah Seyyed Ali Khamenei (R.A)</h2>
                  </div>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                      className="mb-8"
                    >
                      <h1 className="font-amiri text-4xl md:text-6xl lg:text-7xl text-brass text-center leading-snug drop-shadow-2xl">
                        آیت‌الله سید علی خامنه‌ای <span className="text-2xl md:text-4xl text-brass/70">(رضوان الله علیه)</span>
                      </h1>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 2, delay: 2.5, ease: "easeInOut" }}
                      className="mb-8"
                    >
                      <h2 className="font-amiri text-2xl md:text-4xl lg:text-5xl text-parchment text-center tracking-wide drop-shadow-xl">
                        Ayatollah Seyyed Ali Khamenei <span className="text-lg md:text-2xl text-parchment/60">(R.A)</span>
                      </h2>
                    </motion.div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 4, ease: "easeInOut" }}
                      className="h-px w-full max-w-[300px] bg-gradient-to-r from-transparent via-brass to-transparent origin-center shadow-[0_0_15px_rgba(184,134,11,0.5)]"
                    />
                  </>
                )}
              </div>

              {/* Skip Intro */}
              <div className="absolute bottom-8 right-8 z-[110]">
                <button
                  onClick={handleDismiss}
                  className="text-xs font-mono text-parchment/40 hover:text-parchment transition-colors uppercase tracking-widest border-b border-transparent hover:border-parchment/40"
                >
                  {t.misc.skipIntro}
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
