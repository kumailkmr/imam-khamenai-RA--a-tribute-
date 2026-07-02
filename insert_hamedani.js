const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const condolences = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();

const hamedani = {
  id: 'hamedani',
  name_en: 'Grand Ayatollah Hossein Noori Hamedani',
  name_fa: 'آیت‌الله العظمی حسین نوری همدانی',
  affiliation_en: "Marja'",
  affiliation_fa: 'مرجع عالیقدر تقلید',
  excerpt_en: 'The loss of this great pillar of the Islamic Revolution is a tragedy for the Muslim world. His legacy will remain eternal.',
  excerpt_fa: 'فقدان این ستون استوار انقلاب اسلامی ضایعه‌ای بزرگ برای جهان اسلام است. یاد او جاودانه خواهد ماند.',
  sourceUrl: '#',
  date_en: '',
  date_fa: ''
};

// Insert after khorasani
const khorasaniIndex = condolences.findIndex(c => c.id === 'khorasani');
condolences.splice(khorasaniIndex + 1, 0, hamedani);

const now = Date.now();
const updateStmt = db.prepare('UPDATE condolences SET created_at = ? WHERE id = ?');
const insertStmt = db.prepare('INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

db.transaction(() => {
  condolences.forEach((c, i) => {
    if (c.id === 'hamedani') {
      insertStmt.run(c.id, c.name_en, c.name_fa, c.affiliation_en, c.affiliation_fa, c.excerpt_en, c.excerpt_fa, c.sourceUrl, c.date_en, c.date_fa, now + i);
    } else {
      updateStmt.run(now + i, c.id);
    }
  });
})();

console.log('Successfully inserted Hamedani.');
