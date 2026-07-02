import { NextResponse } from "next/server";
import db from "@/lib/db";

// Simple in-memory rate limiting (1 request per IP per 30 seconds)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 30000;

const blockedWords = ["spam", "fake", "hate", "insult"]; // Replace with real list

function containsProfanity(text) {
  const lowerText = text.toLowerCase();
  return blockedWords.some((word) => lowerText.includes(word));
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "newest"; // "newest" or "reactions"
    const offset = (page - 1) * limit;

    const orderBy = sort === "reactions" ? "flames DESC, timestamp DESC" : "timestamp DESC";

    const stmt = db.prepare(`SELECT id, name, message, timestamp, flames FROM guestbook WHERE isHidden = 0 ORDER BY ${orderBy} LIMIT ? OFFSET ?`);
    const entries = stmt.all(limit, offset);

    const countStmt = db.prepare(`SELECT COUNT(*) as count FROM guestbook WHERE isHidden = 0`);
    const total = countStmt.get().count;

    const flamesStmt = db.prepare(`SELECT SUM(flames) as totalFlames FROM guestbook WHERE isHidden = 0`);
    const totalFlames = flamesStmt.get().totalFlames || 0;

    return NextResponse.json({
      entries,
      total,
      totalFlames,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Database GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    
    if (ip !== "unknown") {
      const lastRequest = rateLimits.get(ip);
      if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_WINDOW_MS) {
        return NextResponse.json({ error: "Please wait 30 seconds before submitting another message." }, { status: 429 });
      }
    }

    const body = await request.json();
    
    if (!body.name || !body.message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    if (containsProfanity(body.name) || containsProfanity(body.message)) {
      return NextResponse.json({ error: "Message contains inappropriate content." }, { status: 400 });
    }

    const newEntry = {
      id: Date.now().toString() + Math.floor(Math.random() * 1000),
      name: body.name.trim(),
      message: body.message.trim(),
      timestamp: Date.now(),
      ip: ip,
      flames: 0
    };

    const stmt = db.prepare('INSERT INTO guestbook (id, name, message, timestamp, ip, flames) VALUES (@id, @name, @message, @timestamp, @ip, @flames)');
    stmt.run(newEntry);

    if (ip !== "unknown") {
      rateLimits.set(ip, Date.now());
    }

    return NextResponse.json({
      id: newEntry.id,
      name: newEntry.name,
      message: newEntry.message,
      timestamp: newEntry.timestamp,
      flames: newEntry.flames
    }, { status: 201 });
  } catch (error) {
    console.error("Database POST Error:", error);
    return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
  }
}
