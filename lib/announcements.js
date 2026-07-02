// Ensure to update this timestamp whenever verifying the dates below.
export const lastVerifiedDate = "July 2, 2026";

export const announcements = [
  {
    id: "1",
    date: { en: "March 1, 2026", fa: "۱۰ اسفند ۱۴۰۴" },
    text: { 
      en: "Iranian State Media (IRIB) officially confirms the death of Supreme Leader Sayyid Ali Khamenei. 40 days of national mourning declared.",
      fa: "صدا و سیمای جمهوری اسلامی ایران درگذشت رهبر معظم انقلاب را رسماً تایید کرد. ۴۰ روز عزای عمومی اعلام شد."
    },
    sourceUrl: "https://www.aljazeera.com", 
    isUrgent: false,
  },
  {
    id: "2",
    date: { en: "April 9, 2026", fa: "۲۰ فروردین ۱۴۰۵" },
    text: { 
      en: "Official 40th-day commemoration held.",
      fa: "مراسم رسمی چهلم برگزار شد."
    },
    sourceUrl: "https://www.reuters.com",
    isUrgent: false,
  },
  {
    id: "3",
    date: { en: "July 2, 2026", fa: "۱۱ تیر ۱۴۰۵" },
    text: { 
      en: "Final schedule for state funeral announced, taking place across Tehran, Qom, and Mashhad.",
      fa: "برنامه نهایی تشییع دولتی در تهران، قم و مشهد اعلام شد."
    },
    sourceUrl: "https://en.wikipedia.org/wiki/Ali_Khamenei",
    isUrgent: true,
  }
];

export const globalAlert = {
  isActive: false, // Turned off since the 40-day mourning period has ended.
  message: {
    en: "Official state funeral proceedings are currently scheduled for July 4-9, 2026.",
    fa: "مراسم رسمی تشییع دولتی برای ۱۳ تا ۱۸ تیر ۱۴۰۵ برنامه‌ریزی شده است."
  },
  type: "info",
};

export const extendedFuneralDetails = {
  status: "upcoming", // "upcoming", "in-progress", "concluded"
  dates: { en: "July 4–9, 2026", fa: "۱۳ تا ۱۸ تیر ۱۴۰۵" },
  locations: [
    { 
      city: { en: "Tehran", fa: "تهران" }, 
      detail: { en: "24-hour continuous public ceremony", fa: "مراسم عمومی ۲۴ ساعته پیوسته" }
    },
    { 
      city: { en: "Qom", fa: "قم" }, 
      detail: { en: "Public procession", fa: "تشییع عمومی" }
    },
    { 
      city: { en: "Mashhad", fa: "مشهد" }, 
      detail: { en: "Public procession & Burial", fa: "تشییع عمومی و خاکسپاری" }
    }
  ],
  dignitaryCeremony: { en: "July 3, 2026 (Tehran)", fa: "۱۲ تیر ۱۴۰۵ (تهران)" },
  historyNote: {
    en: "The funeral was originally planned for early March 2026 but was postponed due to the ongoing conflict. The 40th-day commemoration was held independently on 9 April 2026.",
    fa: "مراسم تشییع در ابتدا برای اوایل اسفند برنامه‌ریزی شده بود اما به دلیل درگیری‌های جاری به تعویق افتاد. مراسم چهلم به طور جداگانه در ۲۰ فروردین ۱۴۰۵ برگزار شد."
  }
};
