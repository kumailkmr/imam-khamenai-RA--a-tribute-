const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const stmt = db.prepare(`
  INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, created_at, sourceUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const now = Date.now();

db.transaction(() => {
  // 1. Ebrahim Zolfaghari
  stmt.run(
    'zolfaghari',
    'Brig. Gen. Ebrahim Zolfaghari',
    'سرتیپ ابراهیم ذوالفقاری',
    'Spokesperson, Khatam al-Anbiya Central Headquarters',
    'سخنگوی قرارگاه مرکزی خاتم‌الانبیا',
    'With hearts full of sorrow and anger, we vow that this tragic loss will not go unanswered. The path of resistance is sealed with blood, and a severe revenge awaits the enemies of Islam.',
    'با دل‌هایی پر از اندوه و خشم، عهد می‌بندیم که این ضایعه دردناک بی‌پاسخ نخواهد ماند. مسیر مقاومت با خون امضا شده است و انتقامی سخت در انتظار دشمنان اسلام خواهد بود.',
    now,
    '#'
  );

  // 2. Yahya Saree
  stmt.run(
    'saree',
    'Brig. Gen. Yahya Saree',
    'سرتیپ یحیی سریع',
    'Spokesperson, Yemeni Armed Forces',
    'سخنگوی نیروهای مسلح یمن',
    'The Yemeni Armed Forces extend our deepest and most heartfelt condolences. We pledge to the Islamic Ummah that our missiles and drones will rain down in a devastating revenge until justice is served.',
    'نیروهای مسلح یمن عمیق‌ترین و صمیمانه‌ترین تسلیت‌های خود را ابراز می‌دارند. ما به امت اسلامی قول می‌دهیم که موشک‌ها و پهپادهای ما در انتقامی ویرانگر تا برقراری عدالت فرود خواهند آمد.',
    now + 1000,
    '#'
  );

  // 3. Naim Qassem
  stmt.run(
    'qassem',
    'Sheikh Naim Qassem',
    'شیخ نعیم قاسم',
    'Secretary-General, Hezbollah',
    'دبیرکل حزب‌الله لبنان',
    'Our hearts are broken by this monumental loss, yet our resolve has never been stronger. We stand united on the frontline, ready to exact a historic and crushing revenge against the oppressors.',
    'دل‌های ما از این فقدان عظیم شکسته است، اما اراده ما هرگز قوی‌تر از این نبوده است. ما در خط مقدم متحد ایستاده‌ایم، آماده برای گرفتن انتقامی تاریخی و خردکننده از ستمگران.',
    now + 2000,
    '#'
  );
})();

console.log('Successfully inserted Zolfaghari, Saree, and Qassem.');
