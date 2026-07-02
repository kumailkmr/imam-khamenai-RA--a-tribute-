"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function GuestbookReactions({ entryId, initialFlames = 0 }) {
  const [flames, setFlames] = useState(initialFlames);
  const [hasReacted, setHasReacted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if reacted in this session
    const reacted = sessionStorage.getItem(`reacted_${entryId}`);
    if (reacted) {
      setTimeout(() => setHasReacted(true), 0);
    }
  }, [entryId]);

  const handleReact = async () => {
    if (hasReacted) return;

    // Optimistic UI update
    setFlames((prev) => prev + 1);
    setHasReacted(true);
    setIsAnimating(true);
    sessionStorage.setItem(`reacted_${entryId}`, "true");

    setTimeout(() => setIsAnimating(false), 1000);

    try {
      await fetch(`/api/guestbook/${entryId}/react`, {
        method: "PATCH",
      });
    } catch (e) {
      console.error("Reaction failed", e);
      // Revert if failed
      setFlames((prev) => prev - 1);
      setHasReacted(false);
      sessionStorage.removeItem(`reacted_${entryId}`);
    }
  };

  return (
    <button 
      onClick={handleReact}
      disabled={hasReacted}
      aria-label="Light a candle / React with flame"
      className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-brass ${
        hasReacted 
          ? 'bg-brass/10 border-brass text-brass cursor-default' 
          : 'bg-ink border-brass/30 text-parchment/60 hover:border-brass hover:text-brass'
      }`}
    >
      <motion.div
        animate={isAnimating ? { scale: [1, 1.5, 1], rotate: [0, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Flame className={`w-4 h-4 ${hasReacted ? 'fill-brass text-brass' : ''}`} />
      </motion.div>
      <span className="font-mono text-xs">{flames}</span>
    </button>
  );
}
