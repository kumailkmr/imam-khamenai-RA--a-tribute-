import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.ADMIN_SECRET || 'default-secret-change-me';

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const isHidden = body.isHidden ? 1 : 0;

    const stmt = db.prepare('UPDATE guestbook SET isHidden = ? WHERE id = ?');
    const result = stmt.run(isHidden, id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, isHidden: body.isHidden });
  } catch (error) {
    console.error("Database PATCH Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.ADMIN_SECRET || 'default-secret-change-me';

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const stmt = db.prepare('DELETE FROM guestbook WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Database DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
