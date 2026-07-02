import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  if (!(await verifySession())) return new NextResponse('Unauthorized', { status: 401 });
  
  const entries = db.prepare('SELECT * FROM guestbook ORDER BY timestamp DESC').all();
  
  // Format as CSV
  const header = ['id', 'name', 'message', 'timestamp', 'isHidden', 'ip', 'flames'].join(',');
  const rows = entries.map(e => [
    e.id, 
    `"${e.name.replace(/"/g, '""')}"`, 
    `"${e.message.replace(/"/g, '""')}"`, 
    e.timestamp, 
    e.isHidden, 
    e.ip || '', 
    e.flames
  ].join(','));
  
  const csv = [header, ...rows].join('\n');
  
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="guestbook_export.csv"',
    },
  });
}
