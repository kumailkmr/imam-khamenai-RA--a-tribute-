import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'tribute.db');
const db = new Database(dbPath);

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS guestbook (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    isHidden INTEGER DEFAULT 0,
    ip TEXT,
    flames INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    date_en TEXT NOT NULL,
    date_fa TEXT NOT NULL,
    text_en TEXT NOT NULL,
    text_fa TEXT NOT NULL,
    sourceUrl TEXT,
    isUrgent INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS condolences (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_fa TEXT NOT NULL,
    affiliation_en TEXT NOT NULL,
    affiliation_fa TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    excerpt_fa TEXT NOT NULL,
    sourceUrl TEXT,
    date_en TEXT,
    date_fa TEXT,
    created_at INTEGER NOT NULL
  );
`);

// Auto-seed initial announcements if empty
const annCount = db.prepare('SELECT COUNT(*) as count FROM announcements').get().count;
if (annCount === 0) {
  const insertAnn = db.prepare(`
    INSERT INTO announcements (id, date_en, date_fa, text_en, text_fa, sourceUrl, isUrgent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const initialAnnouncements = [
    {
      id: "1",
      date: { en: "March 1, 2026", fa: "۱۰ اسفند ۱۴۰۴" },
      text: { 
        en: "Iranian State Media (IRIB) officially confirms the death of Supreme Leader Sayyid Ali Khamenei. 40 days of national mourning declared.",
        fa: "صدا و سیمای جمهوری اسلامی ایران درگذشت رهبر معظم انقلاب را رسماً تایید کرد. ۴۰ روز عزای عمومی اعلام شد."
      },
      sourceUrl: "https://www.aljazeera.com", 
      isUrgent: false,
    },
    {
      id: "2",
      date: { en: "April 9, 2026", fa: "۲۰ فروردین ۱۴۰۵" },
      text: { 
        en: "Official 40th-day commemoration held.",
        fa: "مراسم رسمی چهلم برگزار شد."
      },
      sourceUrl: "https://www.reuters.com",
      isUrgent: false,
    },
    {
      id: "3",
      date: { en: "July 2, 2026", fa: "۱۱ تیر ۱۴۰۵" },
      text: { 
        en: "Final schedule for state funeral announced, taking place across Tehran, Qom, and Mashhad.",
        fa: "برنامه نهایی تشییع دولتی در تهران، قم و مشهد اعلام شد."
      },
      sourceUrl: "https://en.wikipedia.org/wiki/Ali_Khamenei",
      isUrgent: true,
    }
  ];

  const now = Date.now();
  db.transaction(() => {
    initialAnnouncements.forEach((a, i) => {
      insertAnn.run(
        a.id, a.date.en, a.date.fa, a.text.en, a.text.fa, a.sourceUrl, a.isUrgent ? 1 : 0, now + i
      );
    });
  })();
}

// Auto-seed initial condolences if empty
const condCount = db.prepare('SELECT COUNT(*) as count FROM condolences').get().count;
if (condCount === 0) {
  const insertCond = db.prepare(`
    INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialCondolences = [
    {
      id: "1",
      name: { en: "REPLACE WITH NAME", fa: "جایگزین با نام" },
      affiliation: { en: "REPLACE WITH AFFILIATION", fa: "جایگزین با مقام" },
      excerpt: { en: "REPLACE WITH VERIFIED SOURCED STATEMENT", fa: "جایگزین با متن تایید شده و مستند" },
      sourceUrl: "#",
      date: { en: "July 2026", fa: "تیر ۱۴۰۵" }
    }
  ];

  const now = Date.now();
  db.transaction(() => {
    initialCondolences.forEach((c, i) => {
      insertCond.run(
        c.id, c.name.en, c.name.fa, c.affiliation.en, c.affiliation.fa, c.excerpt.en, c.excerpt.fa, c.sourceUrl, c.date.en, c.date.fa, now + i
      );
    });
  })();
}

// Database migration block removed as column is now in initial schema.

export default db;
