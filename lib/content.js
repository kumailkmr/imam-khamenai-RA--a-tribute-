export const siteConfig = {
  name: {
    en: "Imam Sayyid Ali Khamenei",
    fa: "سید علی خامنه‌ای" // As requested: Arabic: السيد علي الخامنئي, Persian: سید علی خامنه‌ای
  },
  dates: {
    en: "19 April 1939 – 28 February 2026",
    fa: "۳۰ فروردین ۱۳۱۸ – ۹ اسفند ۱۴۰۴" // Persian equivalent
  },
  condolence: "إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
  condolenceTranslation: {
    en: "Indeed, we belong to Allah, and indeed, to Him we return.",
    fa: "ما از آن خداییم و به سوی او باز می‌گردیم."
  }
};

export const biography = {
  prose: {
    en: `Sayyid Ali Hosseini Khamenei was the second Supreme Leader of Iran, serving from 1989 until 2026, and previously served as the third President of Iran from 1981 to 1989. 

He was killed on 28 February 2026 in Tehran, during joint US–Israeli strikes at the outset of the 2026 Iran war. While initial reports of the strikes were disputed, his death was officially confirmed by Iranian state media (IRIB) around 1 March 2026. Following the confirmation, the Iranian government declared 40 days of national mourning and a 7-day public holiday.`,
    
    fa: `سید علی حسینی خامنه‌ای دومین رهبر جمهوری اسلامی ایران بود که از سال ۱۳۶۸ تا ۱۴۰۴ در این مقام حضور داشت. وی پیش از آن، از سال ۱۳۶۰ تا ۱۳۶۸ به عنوان سومین رئیس‌جمهور ایران فعالیت کرد.

ایشان در ۹ اسفند ۱۴۰۴ در تهران، طی حملات مشترک آمریکا و اسرائیل در آغاز جنگ ایران در سال ۱۴۰۴ کشته شد. در حالی که گزارش‌های اولیه مورد مناقشه بود، مرگ وی حوالی ۱۰ اسفند ۱۴۰۴ به طور رسمی توسط رسانه‌های دولتی ایران (صدا و سیما) تایید شد. پس از این تایید، دولت ایران ۴۰ روز عزای عمومی و ۷ روز تعطیل رسمی اعلام کرد.`
  },
  stats: [
    { 
      label: { en: "Born", fa: "تولد" }, 
      value: { en: "19 April 1939", fa: "۳۰ فروردین ۱۳۱۸" }, 
      detail: { en: "Mashhad, Iran", fa: "مشهد، ایران" } 
    },
    { 
      label: { en: "Role", fa: "مقام" }, 
      value: { en: "Supreme Leader", fa: "رهبر معظم" }, 
      detail: { en: "1989 - 2026", fa: "۱۳۶۸ - ۱۴۰۴" } 
    },
    { 
      label: { en: "Died", fa: "درگذشت" }, 
      value: { en: "28 Feb 2026", fa: "۹ اسفند ۱۴۰۴" }, 
      detail: { en: "Tehran, Iran", fa: "تهران، ایران" } 
    },
  ],
  sourceUrl: "https://en.wikipedia.org/wiki/Ali_Khamenei" // General source reference
};

export const timeline = [
  {
    year: { en: "1939", fa: "۱۳۱۸" },
    title: { en: "Birth", fa: "تولد" },
    description: { en: "Born in Mashhad, Iran.", fa: "متولد مشهد، ایران." },
    major: true
  },
  {
    year: { en: "1981", fa: "۱۳۶۰" },
    title: { en: "Elected President", fa: "انتخاب به ریاست جمهوری" },
    description: { en: "Elected as the third President of the Islamic Republic of Iran.", fa: "انتخاب به عنوان سومین رئیس‌جمهور جمهوری اسلامی ایران." },
    major: true
  },
  {
    year: { en: "1989", fa: "۱۳۶۸" },
    title: { en: "Appointed Supreme Leader", fa: "انتصاب به عنوان رهبر" },
    description: { en: "Chosen by the Assembly of Experts to succeed Imam Khomeini as Supreme Leader.", fa: "انتخاب توسط مجلس خبرگان به عنوان جانشین امام خمینی در مقام رهبری." },
    major: true
  },
  {
    year: { en: "2026", fa: "۱۴۰۴" },
    title: { en: "Death in Tehran", fa: "درگذشت در تهران" },
    description: { en: "Killed during joint US-Israeli strikes on 28 February 2026. Death confirmed by state media on 1 March.", fa: "در ۹ اسفند ۱۴۰۴ طی حملات مشترک کشته شد. تایید رسمی در ۱۰ اسفند." },
    major: true,
    sourceUrl: "https://en.wikipedia.org/wiki/2026_Iran_war"
  }
];

// NOTE: Do not fabricate quotes. 
// If you wish to display quotes, insert fully sourced text here.
export const quotes = [
  // {
  //   text: { en: "", fa: "" },
  //   source: { en: "", fa: "" },
  //   sourceUrl: ""
  // }
];
