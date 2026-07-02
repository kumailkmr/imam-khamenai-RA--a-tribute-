"use client";

import { useAccessibility } from "./AccessibilityProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArchiveHeader({ title, description, icon: Icon }) {
  const { language } = useAccessibility();

  return (
    <div className="pt-32 pb-12 px-4 max-w-6xl mx-auto border-b border-brass/20 mb-12">
      <Link 
        href="/" 
        className="inline-flex items-center text-parchment/60 hover:text-brass transition-colors mb-8 group"
      >
        <ArrowLeft className={`w-4 h-4 ${language === "en" ? "mr-2" : "ml-2 rotate-180"} group-hover:-translate-x-1 transition-transform`} />
        <span className="font-mono text-sm uppercase tracking-widest">
          {language === "en" ? "Return to Memorial" : "بازگشت به یادبود"}
        </span>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-4 mb-4"
      >
        {Icon && <Icon className="w-10 h-10 text-brass opacity-80" />}
        <h1 className="text-4xl md:text-5xl font-amiri text-brass">{title}</h1>
      </motion.div>
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-parchment/80 text-lg md:text-xl font-inter max-w-3xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
