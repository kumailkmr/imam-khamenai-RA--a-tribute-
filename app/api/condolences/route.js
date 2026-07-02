import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const entries = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();
  
  const condolences = entries.map(c => ({
    id: c.id,
    name: { en: c.name_en, fa: c.name_fa },
    affiliation: { en: c.affiliation_en, fa: c.affiliation_fa },
    excerpt: { en: c.excerpt_en, fa: c.excerpt_fa },
    sourceUrl: c.sourceUrl,
    date: { en: c.date_en, fa: c.date_fa }
  }));

  return NextResponse.json(condolences);
}
