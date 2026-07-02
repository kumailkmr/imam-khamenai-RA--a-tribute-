"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { globalAlert } from "@/lib/announcements";
import { useAccessibility } from "./AccessibilityProvider";
import { playAlertChime } from "@/lib/sound";

export default function AlertBanner() {
  const { language } = useAccessibility();
  const [isVisible, setIsVisible] = useState(globalAlert?.isActive);

  if (!globalAlert || !isVisible) return null;

  const isUrgent = globalAlert.type === "urgent";

  useEffect(() => {
    if (isUrgent && isVisible) {
      playAlertChime();
    }
  }, [isUrgent, isVisible]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`w-full overflow-hidden ${isUrgent ? 'bg-muted-red' : 'bg-brass'} text-ink`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium text-sm md:text-base leading-tight">
              {globalAlert.message[language]}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
