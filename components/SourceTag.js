"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { ExternalLink } from "lucide-react";

export default function SourceTag({ url }) {
  const { t } = useAccessibility();

  if (!url) return null;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full border border-brass/40 text-brass-light hover:bg-brass/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brass text-xs font-mono"
      aria-label="Open source in new tab"
    >
      <span>{t.misc.source}</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}
