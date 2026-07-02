"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getAudioState, setAudioState } from "@/lib/sound";

export default function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsEnabled(getAudioState());
    setMounted(true);
    
    // Listen for custom events if other components (like IntroOverlay) toggle it
    const handleStorageChange = () => {
      setIsEnabled(getAudioState());
    };
    window.addEventListener("audio_state_changed", handleStorageChange);
    return () => window.removeEventListener("audio_state_changed", handleStorageChange);
  }, []);

  const handleToggle = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await setAudioState(newState);
    window.dispatchEvent(new Event("audio_state_changed"));
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full border shadow-lg backdrop-blur-md transition-all ${
        isEnabled 
          ? "border-brass bg-brass/10 text-brass hover:bg-brass/20" 
          : "border-brass/30 bg-ink/50 text-parchment/50 hover:text-parchment hover:border-parchment/60"
      }`}
      aria-label={isEnabled ? "Mute audio" : "Enable audio"}
    >
      {isEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
