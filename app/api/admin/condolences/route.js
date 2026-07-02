import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifySession } from '@/lib/auth';
import crypto from 'crypto';

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const entries = db.prepare('SELECT * FROM condolences ORDER BY created_at ASC').all();
  return NextResponse.json(entries);
}

export async function POST(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa } = await request.json();
    const id = crypto.randomUUID();
    const created_at = Date.now();
    
    db.prepare(`
      INSERT INTO condolences (id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl || "", date_en || "", date_fa || "", created_at);
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to insert' }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id, name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl, date_en, date_fa } = await request.json();
    db.prepare(`
      UPDATE condolences 
      SET name_en=?, name_fa=?, affiliation_en=?, affiliation_fa=?, excerpt_en=?, excerpt_fa=?, sourceUrl=?, date_en=?, date_fa=?
      WHERE id=?
    `).run(name_en, name_fa, affiliation_en, affiliation_fa, excerpt_en, excerpt_fa, sourceUrl || "", date_en || "", date_fa || "", id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id } = await request.json();
    db.prepare('DELETE FROM condolences WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
