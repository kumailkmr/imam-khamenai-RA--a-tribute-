"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { mutate } from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "./AccessibilityProvider";

export default function GuestbookForm() {
  const { t } = useAccessibility();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSuccess(true);
      setName("");
      setMessage("");
      
      // Revalidate the guestbook feed
      mutate(key => typeof key === 'string' && key.startsWith('/api/guestbook'));
      
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false); // Hide form after success
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-16">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div 
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <button
              onClick={() => setShowForm(true)}
              className="group relative overflow-hidden inline-flex items-center space-x-3 bg-brass text-ink px-8 py-3 rounded hover:bg-brass-light transition-all focus:outline-none focus:ring-2 focus:ring-brass"
            >
              <span className="font-mono text-sm uppercase tracking-widest font-bold">
                {t.nav.hero === "Hero" ? "Add Condolence Message" : "ارسال پیام تسلیت"}
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-8 relative border border-brass/20 p-6 bg-charcoal/50 rounded"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-amiri text-xl text-brass">
                {t.nav.hero === "Hero" ? "Leave a Message" : "ثبت پیام"}
              </h4>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-parchment/50 hover:text-parchment"
              >
                {t.nav.hero === "Hero" ? "Cancel" : "لغو"}
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.guestbook.namePlaceholder}
                className="w-full bg-transparent border-b border-brass/30 py-3 text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-brass transition-colors font-mono"
                required
              />
            </div>
            <div className="relative">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.guestbook.messagePlaceholder}
                rows={4}
                className="w-full bg-transparent border-b border-brass/30 py-3 text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-brass transition-colors resize-y font-light"
                required
              />
            </div>
            
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-red text-sm">
                {error}
              </motion.p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || success}
                className="group relative overflow-hidden flex items-center space-x-2 text-brass border border-brass/50 px-6 py-2 hover:bg-brass hover:text-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brass"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  {success ? (
                    <>
                      <span>{t.guestbook.submitted}</span>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="w-4 h-4" /></motion.div>
                    </>
                  ) : isSubmitting ? (
                    <span>{t.guestbook.submitting}</span>
                  ) : (
                    <>
                      <span>{t.guestbook.submit}</span>
                      <Send className={`w-4 h-4 transition-transform ${t.nav.hero === "Hero" ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1 rotate-180'}`} />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
