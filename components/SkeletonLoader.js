"use client";

export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="bg-charcoal p-6 border-l-2 border-iran-green/50 relative overflow-hidden"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 gold-shimmer opacity-20 pointer-events-none" />
          
          <div className="flex justify-between items-baseline mb-4">
            <div className="h-6 w-32 bg-ink/50 rounded" />
            <div className="h-4 w-20 bg-ink/30 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-ink/40 rounded" />
            <div className="h-4 w-5/6 bg-ink/40 rounded" />
            <div className="h-4 w-4/6 bg-ink/40 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
