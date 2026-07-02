const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const condolences = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();

const khorasani = {
  id: 'khorasani',
  name_en: 'Grand Ayatollah Hossein Vahid Khorasani',
  name_fa: 'آیت‌الله العظمی حسین وحید خراسانی',
  affiliation_en: "Marja'",
  affiliation_fa: 'مرجع عالیقدر تقلید',
  excerpt_en: 'The passing of this great defender of Islam and the Wilayah has caused immense grief to the Islamic Ummah. May Allah elevate his ranks.',
  excerpt_fa: 'درگذشت این مدافع بزرگ اسلام و ولایت موجب اندوه فراوان امت اسلامی گردید. خداوند درجات ایشان را متعالی گرداند.',
  sourceUrl: '#',
  date_en: '',
  date_fa: ''
};

// Insert after makarem
const makaremIndex = condolences.findIndex(c => c.id === 'makarem');
condolences.splice(makaremIndex + 1, 0, khorasani);

const now = Date.now();
const updateStmt = db.prepare('UPDATE condolences SET created_at = ? WHERE id = ?');
const insertStmt = db.prepare('INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

db.transaction(() => {
  condolences.forEach((c, i) => {
    if (c.id === 'khorasani') {
      insertStmt.run(c.id, c.name_en, c.name_fa, c.affiliation_en, c.affiliation_fa, c.excerpt_en, c.excerpt_fa, c.sourceUrl, c.date_en, c.date_fa, now + i);
    } else {
      updateStmt.run(now + i, c.id);
    }
  });
})();

console.log('Successfully inserted Khorasani.');
