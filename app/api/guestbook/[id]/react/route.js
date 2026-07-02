import { NextResponse } from "next/server";
import db from "@/lib/db";

// Rate limiting for reactions (e.g. 1 per 2 seconds per IP overall to prevent macro spam)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 2000;

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (ip !== "unknown") {
      const lastRequest = rateLimits.get(ip);
      if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_WINDOW_MS) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
      }
      rateLimits.set(ip, Date.now());
    }

    const stmt = db.prepare('UPDATE guestbook SET flames = flames + 1 WHERE id = ? AND isHidden = 0');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    const getStmt = db.prepare('SELECT flames FROM guestbook WHERE id = ?');
    const row = getStmt.get(id);

    return NextResponse.json({ success: true, flames: row.flames });
  } catch (error) {
    console.error("Reaction PATCH Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
