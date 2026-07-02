const Database = require('better-sqlite3');
const db = new Database('data/tribute.db');

const updateStmt = db.prepare(`
  UPDATE condolences 
  SET name_en = 'Kumail Ali', 
      name_fa = 'کمیل علی', 
      excerpt_en = 'The loss of our beloved Imam leaves an unfillable void in our hearts. His guiding light and profound wisdom will forever be missed, but his legacy will eternally illuminate our path.',
      excerpt_fa = 'ہمارے پیارے امام کے بچھڑنے سے ہمارے دلوں میں ایک ایسا خلا پیدا ہوا ہے جو کبھی نہیں بھر سکتا۔ ان کی رہنمائی اور حکمت کی روشنی ہمیشہ یاد آئے گی، لیکن ان کی میراث ہمیشہ ہمارا راستہ روشن کرتی رہے گی۔'
  WHERE id = 'kumail_kmr'
`);

updateStmt.run();

console.log('Successfully updated Kumail KMR details in DB.');
