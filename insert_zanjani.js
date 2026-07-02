const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const condolences = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();

const zanjani = {
  id: 'zanjani',
  name_en: 'Grand Ayatollah Sayyid Mousa Shubayri Zanjani',
  name_fa: 'آیت‌الله العظمی سید موسی شبیری زنجانی',
  affiliation_en: "Marja'",
  affiliation_fa: 'مرجع عالیقدر تقلید',
  excerpt_en: 'With immense sorrow, we extend our condolences to the Imam of the Time (ajtf) and the Muslim Ummah on this great tragedy.',
  excerpt_fa: 'با اندوه فراوان، این مصیبت بزرگ را به پیشگاه امام زمان (عج) و امت اسلامی تسلیت عرض می‌نماییم.',
  sourceUrl: '#',
  date_en: '',
  date_fa: ''
};

// Insert after hamedani
const hamedaniIndex = condolences.findIndex(c => c.id === 'hamedani');
condolences.splice(hamedaniIndex + 1, 0, zanjani);

const now = Date.now();
const updateStmt = db.prepare('UPDATE condolences SET created_at = ? WHERE id = ?');
const insertStmt = db.prepare('INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

db.transaction(() => {
  condolences.forEach((c, i) => {
    if (c.id === 'zanjani') {
      insertStmt.run(c.id, c.name_en, c.name_fa, c.affiliation_en, c.affiliation_fa, c.excerpt_en, c.excerpt_fa, c.sourceUrl, c.date_en, c.date_fa, now + i);
    } else {
      updateStmt.run(now + i, c.id);
    }
  });
})();

console.log('Successfully inserted Zanjani.');
