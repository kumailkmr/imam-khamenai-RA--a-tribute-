"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { Camera } from "lucide-react";

export default function PhotoCredit({ source, license, url }) {
  const { language } = useAccessibility();

  if (!source) return null;

  return (
    <div className="flex items-center space-x-2 text-xs font-mono text-parchment/40 mt-3 border-t border-brass/10 pt-2 w-full max-w-[280px] mx-auto md:max-w-none md:mx-0">
      <Camera className="w-3 h-3 flex-shrink-0" />
      <span className="truncate">
        {language === "en" ? "Photo: " : "عکس: "}
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-parchment transition-colors border-b border-transparent hover:border-parchment">
            {source}
          </a>
        ) : (
          source
        )}
        {license && <span className="opacity-70">, {license}</span>}
      </span>
    </div>
  );
}
