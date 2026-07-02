import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { globalAlert, extendedFuneralDetails } from '@/lib/announcements';

export async function GET() {
  const entries = db.prepare('SELECT * FROM announcements ORDER BY created_at ASC').all();
  
  // Format to match old structure
  const announcements = entries.map(a => ({
    id: a.id,
    date: { en: a.date_en, fa: a.date_fa },
    text: { en: a.text_en, fa: a.text_fa },
    sourceUrl: a.sourceUrl,
    isUrgent: a.isUrgent === 1
  }));

  return NextResponse.json({
    announcements,
    globalAlert,
    extendedFuneralDetails
  });
}
