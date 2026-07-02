"use client";

import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import SkeletonLoader from "./SkeletonLoader";
import GuestbookReactions from "./GuestbookReactions";
import { playGuestbookChime } from "@/lib/sound";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GuestbookFeed({ onNewEntryCount }) {
  const { t } = useAccessibility();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest"); // "newest" or "reactions"
  const [now, setNow] = useState(0); // initialize to 0 for SSR, then set on mount
  const [entries, setEntries] = useState([]);
  const prevTotalRef = useRef();

  useEffect(() => {
    setTimeout(() => setNow(Date.now()), 0);
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);
  const limit = 10;
  
  const { data, error, isLoading } = useSWR(`/api/guestbook?page=${page}&limit=${limit}&sort=${sort}`, fetcher, {
    refreshInterval: page === 1 ? 5000 : 0, // Only poll if on first page
    revalidateOnFocus: true,
  });

  useEffect(() => {
    if (data) {
      if (onNewEntryCount) onNewEntryCount(data.total);
      
      // Sound ping if total increased while polling
      if (prevTotalRef.current !== undefined && data.total > prevTotalRef.current) {
        playGuestbookChime();
      }
      prevTotalRef.current = data.total;

      if (page === 1) {
        setTimeout(() => setEntries(data.entries), 0);
      } else {
        // Append unique entries for load more
        setTimeout(() => {
          setEntries((prev) => {
            const newEntries = [...prev];
            data.entries.forEach(entry => {
              if (!newEntries.find(e => e.id === entry.id)) {
                newEntries.push(entry);
              }
            });
            return newEntries;
          });
        }, 0);
      }
    }
  }, [data, page, onNewEntryCount]);

  const handleSortChange = (newSort) => {
    if (newSort === sort) return;
    setSort(newSort);
    setPage(1);
    setEntries([]); // Clear current to trigger skeleton on fresh sort
  };

  const formatRelativeTime = (timestamp) => {
    if (now === 0) return '';
    const rtf = new Intl.RelativeTimeFormat(t.nav.hero === "Hero" ? 'en' : 'fa', { numeric: 'auto' });
    const diffMs = timestamp - now;
    const daysDifference = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (daysDifference === 0) {
      const hoursDifference = Math.round(diffMs / (1000 * 60 * 60));
      if (hoursDifference === 0) {
        const mins = Math.round(diffMs / (1000 * 60));
        return mins === 0 ? 'just now' : rtf.format(mins, 'minute');
      }
      return rtf.format(hoursDifference, 'hour');
    }
    return rtf.format(daysDifference, 'day');
  };

  return (
    <div className="space-y-8">
      {/* Stat Strip & Sort Toggles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brass/20 pb-4">
        <div className="flex space-x-6 text-sm font-mono text-parchment/60">
          <div>
            <span className="text-brass mr-2">{data?.total || 0}</span>
            {t.guestbook.totalMessages}
          </div>
          <div>
            <span className="text-brass mr-2">{data?.totalFlames || 0}</span>
            {t.guestbook.totalFlames}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => handleSortChange("newest")}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-brass ${sort === 'newest' ? 'bg-brass text-ink' : 'bg-charcoal border border-brass/30 text-parchment/60 hover:text-parchment'}`}
          >
            {t.guestbook.newest}
          </button>
          <button 
            onClick={() => handleSortChange("reactions")}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-brass ${sort === 'reactions' ? 'bg-brass text-ink' : 'bg-charcoal border border-brass/30 text-parchment/60 hover:text-parchment'}`}
          >
            {t.guestbook.mostReactions}
          </button>
        </div>
      </div>

      {error && <p className="text-muted-red font-light italic">{t.guestbook.error}</p>}
      
      {/* Skeletons when fetching fresh page 1 */}
      {isLoading && page === 1 && <SkeletonLoader count={3} />}
      
      {!isLoading && entries.length === 0 && (
        <p className="text-parchment/50 font-light italic">{t.guestbook.noMessages}</p>
      )}

      {entries.length > 0 && (
        <div className="space-y-6">
          <AnimatePresence>
            {entries.map((entry, index) => (
              <motion.div 
                key={`${entry.id}-${sort}`} // force re-anim on sort
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index < 5 ? index * 0.1 : 0 }}
                className="bg-charcoal p-6 border-l-2 border-iran-green"
              >
                <div className="flex justify-between items-baseline mb-3">
                  <h4 className="font-amiri text-xl text-brass-light">{entry.name}</h4>
                  <span className="font-mono text-xs text-parchment/40">
                    {formatRelativeTime(entry.timestamp)}
                  </span>
                </div>
                <p className="text-parchment/80 font-light leading-relaxed whitespace-pre-line mb-4">
                  {entry.message}
                </p>
                <div className="flex justify-end">
                  <GuestbookReactions entryId={entry.id} initialFlames={entry.flames} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Pagination Load More */}
          {data && page < data.totalPages && (
            <div className="pt-8 text-center">
              <button 
                onClick={() => setPage(page + 1)}
                disabled={isLoading}
                className="px-6 py-2 border border-brass/50 text-brass hover:bg-brass hover:text-ink transition-colors font-mono uppercase tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-brass"
              >
                {isLoading ? t.guestbook.loading : t.guestbook.loadMore}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
