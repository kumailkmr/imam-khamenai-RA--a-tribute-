const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const condolences = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();

const newLeader = {
  id: 'new_supreme_leader',
  name_en: 'Current Supreme Leader of Iran',
  name_fa: 'رهبر معظم کنونی ایران',
  affiliation_en: 'Supreme Leader',
  affiliation_fa: 'رهبر معظم انقلاب',
  excerpt_en: 'We mourn the immense loss of the great leader who guided us with wisdom and devotion.',
  excerpt_fa: 'ما در سوگ از دست دادن رهبر بزرگی می‌نشینیم که با خرد و فداکاری ما را هدایت کرد.',
  sourceUrl: '#',
  date_en: '',
  date_fa: ''
};

// Insert after mojtaba
const mojtabaIndex = condolences.findIndex(c => c.id === 'mojtaba');
condolences.splice(mojtabaIndex + 1, 0, newLeader);

// Reassign created_at to maintain order
const now = Date.now();
const updateStmt = db.prepare('UPDATE condolences SET created_at = ? WHERE id = ?');
const insertStmt = db.prepare('INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

db.transaction(() => {
  condolences.forEach((c, i) => {
    if (c.id === 'new_supreme_leader') {
      insertStmt.run(c.id, c.name_en, c.name_fa, c.affiliation_en, c.affiliation_fa, c.excerpt_en, c.excerpt_fa, c.sourceUrl, c.date_en, c.date_fa, now + i);
    } else {
      updateStmt.run(now + i, c.id);
    }
  });
})();

console.log('Successfully inserted new supreme leader.');
