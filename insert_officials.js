const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const condolences = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();

const newOfficials = [
  {
    id: 'pezeshkian',
    name_en: 'Masoud Pezeshkian',
    name_fa: 'مسعود پزشکیان',
    affiliation_en: 'President of Iran',
    affiliation_fa: 'رئیس جمهور ایران',
    excerpt_en: 'The heart of Iran weeps for its guiding father. We vow to continue his path of justice, resistance, and unwavering faith with every breath we take.',
    excerpt_fa: 'قلب ایران در سوگ پدر معنوی خویش می‌گرید. عهد می‌بندیم که راه عدالت، مقاومت و ایمان استوار او را تا پای جان ادامه دهیم.',
    sourceUrl: '#', date_en: '', date_fa: ''
  },
  {
    id: 'araghchi',
    name_en: 'Seyed Abbas Araghchi',
    name_fa: 'سید عباس عراقچی',
    affiliation_en: 'Foreign Minister',
    affiliation_fa: 'وزیر امور خارجه',
    excerpt_en: 'The world of diplomacy has lost its most profound anchor. His strategic wisdom and steadfastness against oppression will forever be our guiding doctrine.',
    excerpt_fa: 'جهان دیپلماسی لنگرگاه عمیق خود را از دست داد. حکمت راهبردی و ایستادگی او در برابر ظلم، برای همیشه دکترین راهنمای ما خواهد بود.',
    sourceUrl: '#', date_en: '', date_fa: ''
  },
  {
    id: 'ghalibaf',
    name_en: 'Mohammad Bagher Ghalibaf',
    name_fa: 'محمدباقر قالیباف',
    affiliation_en: 'Parliament Speaker',
    affiliation_fa: 'رئیس مجلس شورای اسلامی',
    excerpt_en: 'A colossal mountain of strength has departed. His divine leadership shaped our nation, and his boundless spirit will endure in the very fabric of our revolution.',
    excerpt_fa: 'کوهی عظیم از استقامت پر کشید. رهبری الهی او ملت ما را شکل داد و روح بی‌کرانش در تار و پود انقلابمان جاودانه خواهد ماند.',
    sourceUrl: '#', date_en: '', date_fa: ''
  },
  {
    id: 'baghaei',
    name_en: 'Esmail Baghaei',
    name_fa: 'اسماعیل بقایی',
    affiliation_en: 'Spokesperson of Foreign Ministry',
    affiliation_fa: 'سخنگوی وزارت امور خارجه',
    excerpt_en: 'Our nation’s voice is choked with tears today. His supreme guidance illuminated our path in the darkest global storms. We remain forever indebted to his vision.',
    excerpt_fa: 'امروز بغض گلوگیر صدای ملت ماست. هدایت‌های داهیانه ایشان مسیر ما را در تاریک‌ترین طوفان‌های جهانی روشن ساخت. ما تا ابد مدیون بینش او هستیم.',
    sourceUrl: '#', date_en: '', date_fa: ''
  },
  {
    id: 'qaani',
    name_en: 'Esmail Qaani',
    name_fa: 'اسماعیل قاآنی',
    affiliation_en: 'Commander of the Quds Force',
    affiliation_fa: 'فرمانده نیروی قدس سپاه',
    excerpt_en: 'The Axis of Resistance has lost its beating heart. We swear by the blood of the martyrs to never let the holy flag he entrusted to us touch the ground.',
    excerpt_fa: 'محور مقاومت تپنده‌ترین قلب خود را از دست داد. به خون شهدا قسم یاد می‌کنیم که هرگز اجازه ندهیم پرچم مقدسی که به ما سپرد، بر زمین بیفتد.',
    sourceUrl: '#', date_en: '', date_fa: ''
  },
  {
    id: 'vahidi',
    name_en: 'Ahmad Vahidi',
    name_fa: 'احمد وحیدی',
    affiliation_en: 'Iranian Official',
    affiliation_fa: 'مقام عالی‌رتبه جمهوری اسلامی ایران',
    excerpt_en: 'A true servant of God and a tireless protector of the Ummah has returned to his Creator. His legacy of absolute devotion will eternally burn bright in our souls.',
    excerpt_fa: 'بنده‌ای مخلص و محافظی خستگی‌ناپذیر برای امت به سوی پروردگارش بازگشت. میراث فداکاری مطلق او برای همیشه در جان‌های ما شعله‌ور خواهد بود.',
    sourceUrl: '#', date_en: '', date_fa: ''
  },
  {
    id: 'rezaee',
    name_en: 'Mohsen Rezaee',
    name_fa: 'محسن رضایی',
    affiliation_en: 'Member of the Expediency Discernment Council',
    affiliation_fa: 'عضو مجمع تشخیص مصلحت نظام',
    excerpt_en: 'The father of our modern Islamic awakening is gone. The pain of this separation is unbearable, yet his monumental ideals will forever steer the destiny of Iran.',
    excerpt_fa: 'پدر بیداری نوین اسلامی ما رفت. درد این فراق جانکاه است، اما آرمان‌های عظیم او برای همیشه سکاندار سرنوشت ایران خواهد بود.',
    sourceUrl: '#', date_en: '', date_fa: ''
  }
];

// Append these at the end or after 'kumail_kmr'
const insertStmt = db.prepare('INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

const now = Date.now();
db.transaction(() => {
  newOfficials.forEach((c, i) => {
    insertStmt.run(c.id, c.name_en, c.name_fa, c.affiliation_en, c.affiliation_fa, c.excerpt_en, c.excerpt_fa, c.sourceUrl, c.date_en, c.date_fa, now + i + 100);
  });
})();

console.log('Successfully inserted all new officials.');
