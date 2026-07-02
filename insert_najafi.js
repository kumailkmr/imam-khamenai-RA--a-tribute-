const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const condolences = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();

const najafi = {
  id: 'najafi',
  name_en: 'Grand Ayatollah Bashir al-Najafi',
  name_fa: 'آیت‌الله العظمی بشیر نجفی',
  affiliation_en: "Marja'",
  affiliation_fa: 'مرجع عالیقدر تقلید - نجف اشرف',
  excerpt_en: 'We offer our deepest condolences to the seminaries of Qom and Najaf on this profound loss.',
  excerpt_fa: 'ما عمیق‌ترین تسلیت‌های خود را به حوزه‌های علمیه قم و نجف بابت این ضایعه بزرگ عرض می‌داریم.',
  sourceUrl: '#',
  date_en: '',
  date_fa: ''
};

// Insert after zanjani
const zanjaniIndex = condolences.findIndex(c => c.id === 'zanjani');
condolences.splice(zanjaniIndex + 1, 0, najafi);

const now = Date.now();
const updateStmt = db.prepare('UPDATE condolences SET created_at = ? WHERE id = ?');
const insertStmt = db.prepare('INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

db.transaction(() => {
  condolences.forEach((c, i) => {
    if (c.id === 'najafi') {
      insertStmt.run(c.id, c.name_en, c.name_fa, c.affiliation_en, c.affiliation_fa, c.excerpt_en, c.excerpt_fa, c.sourceUrl, c.date_en, c.date_fa, now + i);
    } else {
      updateStmt.run(now + i, c.id);
    }
  });
})();

console.log('Successfully inserted Najafi.');
