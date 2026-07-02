const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const desiredOrder = [
  'sistani',
  'makarem',
  'khorasani',
  'hamedani',
  'zanjani',
  'najafi',
  'mojtaba',
  'new_supreme_leader',
  'pezeshkian',
  'araghchi',
  'ghalibaf',
  'baghaei',
  'qaani',
  'vahidi',
  'rezaee',
  'larijani',
  'zolfaghari',
  'zameer',
  'razagraphy',
  'kumail_kmr',
  'qassem',
  'saree',
  'houthi',
  'hassan',
  'hadi',
  'mirwaiz',
  'ruhullah',
  'mujtaba',
  'imran',
  'masroor'
];

const now = Date.now();
const updateStmt = db.prepare('UPDATE condolences SET created_at = ? WHERE id = ?');

db.transaction(() => {
  desiredOrder.forEach((id, index) => {
    // Add time offset so they are ordered sequentially
    updateStmt.run(now + index * 1000, id);
  });
})();

console.log('Successfully reordered condolences.');
