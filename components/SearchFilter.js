"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { Search } from "lucide-react";

export default function SearchFilter({ value, onChange, placeholder, categories, selectedCategory, onCategoryChange }) {
  const { language } = useAccessibility();

  return (
    <div className="mb-12 flex flex-col md:flex-row gap-4 items-center max-w-6xl mx-auto px-4">
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-parchment/40" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-brass/30 rounded-md leading-5 bg-charcoal text-parchment placeholder-parchment/40 focus:outline-none focus:ring-1 focus:ring-brass focus:border-brass sm:text-sm"
          placeholder={placeholder || (language === "en" ? "Search archive..." : "جستجو در آرشیو...")}
        />
      </div>

      {categories && categories.length > 0 && (
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-inter whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-brass text-ink"
                : "bg-charcoal text-parchment/80 border border-brass/30 hover:bg-brass/10 hover:text-brass"
            }`}
          >
            {language === "en" ? "All" : "همه"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-inter whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-brass text-ink"
                  : "bg-charcoal text-parchment/80 border border-brass/30 hover:bg-brass/10 hover:text-brass"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
