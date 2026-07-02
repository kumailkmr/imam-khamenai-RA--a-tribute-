const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const condolences = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();

const larijani = {
  id: 'larijani',
  name_en: 'Ali Larijani',
  name_fa: 'علی لاریجانی',
  affiliation_en: 'Former Parliament Speaker',
  affiliation_fa: 'رئیس پیشین مجلس شورای اسلامی',
  excerpt_en: 'The immense weight of this loss shatters the heart of our nation. His divine wisdom was the anchor of the Islamic Republic, and his absence leaves an eternal void.',
  excerpt_fa: 'سنگینی این ضایعه قلب ملت ما را در هم می‌شکند. حکمت الهی او لنگرگاه جمهوری اسلامی بود و فقدانش خلأیی ابدی بر جای می‌گذارد.',
  sourceUrl: '#',
  date_en: '',
  date_fa: ''
};

// Insert after rezaee
const rezaeeIndex = condolences.findIndex(c => c.id === 'rezaee');
condolences.splice(rezaeeIndex + 1, 0, larijani);

const now = Date.now();
const updateStmt = db.prepare('UPDATE condolences SET created_at = ? WHERE id = ?');
const insertStmt = db.prepare('INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

db.transaction(() => {
  condolences.forEach((c, i) => {
    if (c.id === 'larijani') {
      insertStmt.run(c.id, c.name_en, c.name_fa, c.affiliation_en, c.affiliation_fa, c.excerpt_en, c.excerpt_fa, c.sourceUrl, c.date_en, c.date_fa, now + i);
    } else {
      updateStmt.run(now + i, c.id);
    }
  });
})();

console.log('Successfully inserted Larijani.');
