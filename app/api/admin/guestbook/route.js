import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const entries = db.prepare('SELECT * FROM guestbook ORDER BY timestamp DESC').all();
  return NextResponse.json(entries);
}

export async function PATCH(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id, isHidden } = await request.json();
    db.prepare('UPDATE guestbook SET isHidden = ? WHERE id = ?').run(isHidden ? 1 : 0, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id } = await request.json();
    db.prepare('DELETE FROM guestbook WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
