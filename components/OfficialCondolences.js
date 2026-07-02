"use client";

import useSWR from "swr";
import { useAccessibility } from "./AccessibilityProvider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const profileImages = {
  sistani: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO3w3NkEiRVYBDj1SQKXq6GO_vd_EJe_EuY7t2wqBeva3uuURqN2-0KcY&s=10",
  makarem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs58VqiNJoFhisXUdrbi9ZSdStHQyWxeOQHdE21X7hrwe4KVHbrs4UGhHu&s=10",
  khorasani: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDqKp5ebLArRIOjLL0rkCb_kKN_g0ZLHSBF5JGMeEtw&s=10",
  hamedani: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKx8LbDD8MrMzqS1kxIlJuZe8nZl-vP0mqdj5VJihfhg&s=10",
  zanjani: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQetbxDdp3MpVe8evPjocpyWWGCjpXvooxkzwDa1DOcPw&s=10",
  najafi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRorNxdSOf3sv12FJzNCb9rIHaKzM-lYnHqi_V7OBpNtT0gWsW5vMTnLLY&s=10",
  mojtaba: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Ayatollah_Sayyid_Mojtaba_Khamenei%2C_10_April_2026_%28cropped%29.jpg/1280px-Ayatollah_Sayyid_Mojtaba_Khamenei%2C_10_April_2026_%28cropped%29.jpg",
  new_supreme_leader: "https://ui-avatars.com/api/?name=Supreme+Leader&background=0D8ABC&color=fff&size=256",
  zameer: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTwqZTkKd1yfxlMiQmJ6wGyOPlES2DxNiosQTeF6O7cQ&s=10",
  hassan: "https://pbs.twimg.com/profile_images/1846177581403348992/SwYfquV6_400x400.jpg",
  hadi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVa6EXjapCz6K8cfRmg2LumupYNWOjs7N3NDi_LslLg&s=10",
  mirwaiz: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TtxTowFLhqrNy0k-y44s6o2ccNMBO_sJICbOnluXBZJKB2tEB1XGpife&s=10",
  ruhullah: "https://pbs.twimg.com/profile_images/1885655033234014208/9qWIzSK5_400x400.jpg",
  mujtaba: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipzvgJ2omIIP2IqBE1Isz9NHfpvFVDxAyz2gdjK-PUJdwLC03Uln5rW8&s=10",
  imran: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTYliCpeIfP-zK20z__qchyW64BDd9LUopqmXPpof0IqLdTSxkTmSVNlk&s=10",
  masroor: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVP5HlfLLWXbVO6oQ9Xn9NISfl2NTNXvK2D4DIuAtFkF9PxAJzRMAc58S&s=10",
  razagraphy: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo0MmXgKnqcBQ1juCkq3q9d8IHopygKVG_l-GYx0lShHJ54aosLRbEV--3&s=10",
  kumail_kmr: "/kumail.jpg",
  pezeshkian: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3OiNb4r3jXkw94aCQvVXCy7nwWjnhUjxSgqrxd2aq1QLC8_YZn3_AwAg&s=10",
  araghchi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQNMiYv1JS-0Nug2FLWdm6vM0lHVNAgGCUBtgzCQRj8B8mu3SCuUJWuA&s=10",
  ghalibaf: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0xN0w0T-OtqSiogjMdpgIsoK1QG6z1cnzAWgKf00iHMbIiUSzmhKLdOs&s=10",
  baghaei: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurIUeh6DavzfZP1YRKVGDcNQWDqHlYLjIN_tEzLLf1Q&s=10",
  qaani: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Esmail_Ghaani_in_january_2020_%283x4_cropped%29.jpg",
  vahidi: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Ahmad_Vahidi.jpg",
  rezaee: "https://static.srpcdigital.com/styles/1037xauto/public/2025-07/1124999_0.png.webp",
  larijani: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ali_Larijani%2C_2021-01-12_%28cropped%29.jpg/960px-Ali_Larijani%2C_2021-01-12_%28cropped%29.jpg",
  zolfaghari: "https://files.modern.az/photo/orginal/2026/03/23/1774243891_albay-ibrahim-zulfikari.jpg",
  saree: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnfT_j8R3lJ_Y9OzJPsLYVqmjZ78NYygfDHToEq9bbiLzu0t_41BABO3ge&s=10",
  qassem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiwPDYEqxD31o-5I2KDBIyhCwBJqH3GtY25CRzNsSLhg&s=10",
  houthi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XZXb-hkbJwYLY1ctSexP66tFdVvPKFNHJpA0tuLQRtEjoQcXjwo7kmk&s=10"
};

export default function OfficialCondolences() {
  const { language, t } = useAccessibility();
  const { data: condolences } = useSWR("/api/condolences", url => fetch(url).then(r => r.json()));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer;
    if (!isHovered && condolences && condolences.length > 0) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % condolences.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isHovered, condolences]);

  if (!condolences || condolences.length === 0) return null;

  const current = condolences[currentIndex];
  const isRTL = language === "fa";

  return (
    <section id="condolences" className="py-32 px-4 bg-charcoal border-y border-blue-500/30 scroll-mt-20 relative overflow-hidden">
      {/* Ambient Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h3 className="font-amiri text-4xl text-blue-400 mb-16 text-center drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          {language === "en" ? "Official Condolences" : "تسلیت‌های رسمی"}
        </h3>
        
        {/* Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden py-10 mt-10 marquee-container">
          <style>{`
            @keyframes marquee-ltr {
              from { transform: translateX(0%); }
              to { transform: translateX(-50%); }
            }
            @keyframes marquee-rtl {
              from { transform: translateX(-50%); }
              to { transform: translateX(0%); }
            }
            .marquee-scroll {
              display: flex;
              white-space: nowrap;
              width: max-content;
              animation: marquee-ltr 60s linear infinite;
            }
            .marquee-scroll-rtl {
              display: flex;
              white-space: nowrap;
              width: max-content;
              animation: marquee-rtl 60s linear infinite;
            }
            .marquee-container:hover .marquee-scroll,
            .marquee-container:hover .marquee-scroll-rtl {
              animation-play-state: paused;
            }
          `}</style>
          
          {/* Gradient Masks for smooth fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

          <div className={`gap-8 ${isRTL ? 'marquee-scroll-rtl' : 'marquee-scroll'}`}>
            {[...condolences, ...condolences].map((current, idx) => (
              <div 
                key={`${current.id}-${idx}`} 
                className="w-[320px] md:w-[450px] shrink-0 bg-ink/60 backdrop-blur-2xl border border-blue-500/30 p-8 rounded-3xl shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:border-blue-400/80 hover:shadow-[0_15px_40px_rgba(59,130,246,0.3)] transition-all duration-300 group flex flex-col gap-6 whitespace-normal relative overflow-hidden"
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                {/* Subtle top glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors relative z-10 bg-ink">
                      <Image
                        src={profileImages[current.id] || "https://ui-avatars.com/api/?name=" + current.name.en + "&background=0D8ABC&color=fff&size=256"}
                        alt={current.name[language]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </div>
                  </div>
                  <div>
                    <strong className="text-blue-300 block font-amiri text-xl md:text-2xl drop-shadow-md leading-tight mb-1">{current.name[language]}</strong>
                    <span className="text-blue-200/70 font-mono tracking-widest uppercase text-[10px] md:text-xs block">{current.affiliation[language]}</span>
                  </div>
                </div>

                <blockquote className="font-amiri text-lg md:text-xl text-gray-300 leading-relaxed italic flex-1">
                  &quot;{current.excerpt[language]}&quot;
                </blockquote>

                {current.sourceUrl && current.sourceUrl !== "#" && (
                  <a 
                    href={current.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-auto text-blue-400 hover:text-white underline decoration-blue-500/50 underline-offset-4 transition-colors font-mono text-[10px] md:text-xs uppercase tracking-widest w-max"
                  >
                    {language === "en" ? "Read Full Statement" : "خواندن متن کامل"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 text-center relative z-20">
          <Link href="/reactions" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-mono text-sm uppercase tracking-widest transition-colors group">
            {language === "en" ? "View International Reactions Archive" : "مشاهده آرشیو واکنش‌های بین‌المللی"}
            <ArrowRight className={`w-4 h-4 ${language === "en" ? "ml-2" : "mr-2 rotate-180"} group-hover:translate-x-1 transition-transform`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
