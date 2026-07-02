"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PhotoCredit from "./PhotoCredit";

/**
 * HERO PORTRAIT COMPONENT
 * 
 * SITE OWNER INSTRUCTIONS:
 * 1. Obtain a legally licensed photo (see README for sourcing via Wikimedia, Khamenei.ir, or Press Agencies).
 * 2. Replace the file at `public/images/portrait-placeholder.jpg` with your verified image.
 * 3. Update the `source` and `license` props below to accurately attribute the photographer/agency.
 */

export default function HeroPortrait() {
  const [hasError, setHasError] = useState(false);

  // Edit these lines once you have a real image to provide correct attribution
  const photoCredit = {
    source: "Pending Replacement", // e.g. "Khamenei.ir" or "Photographer Name"
    license: "Placeholder",        // e.g. "CC BY 4.0" or "Getty Images License"
    url: ""                        // e.g. "https://khamenei.ir/..."
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="flex flex-col items-center md:items-start"
    >
      <div className="relative w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-t-full border border-brass/30 p-1.5 overflow-hidden group">
        
        {/* Outer Frame ring */}
        <div className="absolute inset-0 rounded-t-full border border-brass/10 m-3 pointer-events-none z-20" />

        {!hasError ? (
          <div className="relative w-full h-full rounded-t-full overflow-hidden bg-charcoal">
            {/* Duotone Overlay - Charcoal/Gold blend over the real image */}
            <div className="absolute inset-0 bg-ink/40 mix-blend-multiply z-10 pointer-events-none group-hover:bg-ink/20 transition-colors duration-700" />
            <div className="absolute inset-0 bg-brass/20 mix-blend-overlay z-10 pointer-events-none group-hover:bg-brass/10 transition-colors duration-700" />
            
            <Image
              src="/images/hero.jpg"
              alt="Portrait of Sayyid Ali Khamenei"
              fill
              className="object-cover object-center filter grayscale contrast-125"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
              priority
              onError={() => setHasError(true)}
            />
          </div>
        ) : (
          // Graceful Fallback: Islamic pattern / dome silhouette if image is missing/broken
          <div className="w-full h-full rounded-t-full bg-charcoal border border-brass/20 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-20" />
            <svg className="w-16 h-16 text-brass/40 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2C7 2 3 7 3 14V22H21V14C21 7 17 2 12 2Z" />
              <path d="M12 2V6" />
              <path d="M12 22V18" />
            </svg>
          </div>
        )}
      </div>

      <PhotoCredit 
        source={photoCredit.source} 
        license={photoCredit.license} 
        url={photoCredit.url} 
      />
    </motion.div>
  );
}
