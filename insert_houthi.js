const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const stmt = db.prepare(`
  INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, created_at, sourceUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const now = Date.now();

db.transaction(() => {
  stmt.run(
    'houthi',
    'Abdul-Malik al-Houthi',
    'عبدالملک بدرالدین الحوثی',
    'Leader of the Houthi Movement (Ansar Allah)',
    'رهبر جنبش انصارالله یمن',
    'Our hearts ache with profound sorrow over this tragic loss. Yet, our grief only fuels our determination. We swear to God that we will take a severe and crushing revenge against the US and the Zionist enemy for their endless crimes.',
    'دل‌های ما از این فقدان غم‌انگیز به شدت به درد آمده است. با این حال، اندوه ما تنها بر عزم ما می‌افزاید. ما به خداوند سوگند یاد می‌کنیم که انتقامی سخت و کوبنده از آمریکا و دشمن صهیونیستی به خاطر جنایات بی‌پایانشان خواهیم گرفت.',
    now,
    '#'
  );
})();

console.log('Successfully inserted Houthi.');
