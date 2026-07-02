import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifySession } from '@/lib/auth';
import crypto from 'crypto';

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const entries = db.prepare('SELECT * FROM announcements ORDER BY created_at ASC').all();
  return NextResponse.json(entries);
}

export async function POST(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { date_en, date_fa, text_en, text_fa, sourceUrl, isUrgent } = await request.json();
    const id = crypto.randomUUID();
    const created_at = Date.now();
    
    db.prepare(`
      INSERT INTO announcements (id, date_en, date_fa, text_en, text_fa, sourceUrl, isUrgent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, date_en, date_fa, text_en, text_fa, sourceUrl || "", isUrgent ? 1 : 0, created_at);
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to insert' }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id, date_en, date_fa, text_en, text_fa, sourceUrl, isUrgent } = await request.json();
    db.prepare(`
      UPDATE announcements 
      SET date_en=?, date_fa=?, text_en=?, text_fa=?, sourceUrl=?, isUrgent=?
      WHERE id=?
    `).run(date_en, date_fa, text_en, text_fa, sourceUrl || "", isUrgent ? 1 : 0, id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id } = await request.json();
    db.prepare('DELETE FROM announcements WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
