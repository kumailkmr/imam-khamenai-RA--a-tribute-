// Centralized placeholder data for the 14 new historical archive sections.
// Note: This relies heavily on structured metadata. Media assets and full translations
// should be verified by the site administrator prior to production.

export const archiveData = {
  biography: {
    earlyLife: { en: "Born in 1939 in Mashhad to a clerical family...", fa: "متولد ۱۳۱۸ در مشهد در خانواده‌ای روحانی..." },
    education: { en: "Studied in Mashhad, Najaf, and Qom...", fa: "تحصیل در مشهد، نجف و قم..." },
    politicalCareer: { en: "Active in the 1979 Revolution, served as President (1981-1989)...", fa: "فعال در انقلاب ۱۳۵۷، رئیس جمهور (۱۳۶۰-۱۳۶۸)..." },
  },
  
  timeline: [
    { year: 1939, title: { en: "Birth", fa: "تولد" }, desc: { en: "Born in Mashhad, Iran.", fa: "متولد مشهد، ایران." }, category: "personal" },
    { year: 1981, title: { en: "Elected President", fa: "انتخاب به عنوان رئیس جمهور" }, desc: { en: "Became the 3rd President of Iran.", fa: "به عنوان سومین رئیس جمهور ایران انتخاب شد." }, category: "political" },
    { year: 1989, title: { en: "Appointed Supreme Leader", fa: "انتصاب به عنوان رهبر" }, desc: { en: "Succeeded Ruhollah Khomeini.", fa: "جانشین روح‌الله خمینی شد." }, category: "political" },
    { year: 2026, title: { en: "Death", fa: "درگذشت" }, desc: { en: "Passed away in Tehran.", fa: "در تهران درگذشت." }, category: "personal" }
  ],
  
  gallery: [
    { src: "/images/hero.jpg", category: "portraits", caption: { en: "Official Portrait", fa: "پرتره رسمی" } },
    { src: "/images/hero.jpg", category: "public", caption: { en: "Public Address", fa: "سخنرانی عمومی" } },
    // More images would be added here
  ],
  
  videos: [
    { id: "v1", title: { en: "Inauguration 1981", fa: "تحلیف ۱۳۶۰" }, url: "https://www.youtube.com/embed/placeholder", category: "historical", year: 1981 },
    { id: "v2", title: { en: "Friday Prayer Address", fa: "خطبه نماز جمعه" }, url: "https://www.youtube.com/embed/placeholder", category: "speeches", year: 2010 }
  ],

  speeches: [
    { id: "s1", title: { en: "First Address as Leader", fa: "اولین سخنرانی به عنوان رهبر" }, year: 1989, tags: ["leadership", "historical"], pdf: "#" },
    { id: "s2", title: { en: "Speech on Science and Education", fa: "سخنرانی درباره علم و آموزش" }, year: 2015, tags: ["education"], pdf: "#" }
  ],

  reactions: [
    { country: { en: "Iraq", fa: "عراق" }, type: "government", text: { en: "Official statement of condolence...", fa: "پیام تسلیت رسمی..." } },
    { country: { en: "United Nations", fa: "سازمان ملل" }, type: "organization", text: { en: "Statement from the Secretary General...", fa: "بیانیه دبیرکل..." } }
  ],

  context: [
    { title: { en: "Role of Supreme Leader", fa: "نقش مقام رهبری" }, desc: { en: "The highest ranking political and religious authority...", fa: "عالی‌ترین مقام سیاسی و مذهبی..." } },
    { title: { en: "Assembly of Experts", fa: "مجلس خبرگان" }, desc: { en: "Body responsible for electing the leader...", fa: "نهاد مسئول انتخاب رهبر..." } }
  ],

  mapLocations: [
    { coords: [36.2972, 59.6067], title: { en: "Birthplace - Mashhad", fa: "زادگاه - مشهد" }, type: "historical" },
    { coords: [34.6416, 50.8746], title: { en: "Qom Seminary", fa: "حوزه علمیه قم" }, type: "education" },
    { coords: [35.6892, 51.3890], title: { en: "Leadership Office - Tehran", fa: "دفتر رهبری - تهران" }, type: "political" }
  ],

  archiveDocs: [
    { id: "d1", title: { en: "Constitutional Amendment 1989", fa: "اصلاحیه قانون اساسی ۱۳۶۸" }, category: "legal", url: "#" },
    { id: "d2", title: { en: "Will and Testament", fa: "وصیت‌نامه" }, category: "personal", url: "#" }
  ],

  news: [
    { date: "2026-03-01", title: { en: "State Media Announces Death", fa: "رسانه‌های دولتی درگذشت را اعلام کردند" }, source: "IRIB", url: "#" },
    { date: "2026-03-03", title: { en: "Dignitaries Arrive for Ceremony", fa: "ورود مقامات برای مراسم" }, source: "Tehran Times", url: "#" }
  ],

  quotes: [
    { text: { en: "The future belongs to the youth.", fa: "آینده متعلق به جوانان است." }, year: 2012, context: { en: "Address to University Students", fa: "سخنرانی برای دانشجویان" } },
    { text: { en: "Science is power.", fa: "العلم سلطان." }, year: 2005, context: { en: "Speech on National Development", fa: "سخنرانی توسعه ملی" } }
  ],

  faq: [
    { q: { en: "When did he become Supreme Leader?", fa: "چه زمانی به عنوان رهبر انتخاب شدند؟" }, a: { en: "On June 4, 1989.", fa: "در ۱۴ خرداد ۱۳۶۸." } },
    { q: { en: "How long was his presidency?", fa: "دوره ریاست جمهوری ایشان چقدر بود؟" }, a: { en: "From 1981 to 1989 (two terms).", fa: "از ۱۳۶۰ تا ۱۳۶۸ (دو دوره)." } }
  ],

  references: [
    { type: "official", title: { en: "Khamenei.ir Archives", fa: "آرشیو خامنه‌ای.آی‌آر" }, url: "https://khamenei.ir" },
    { type: "academic", title: { en: "History of Post-Revolution Iran", fa: "تاریخ ایران پس از انقلاب" }, url: "#" }
  ]
};
