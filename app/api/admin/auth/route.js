import { NextResponse } from "next/server";
import { createSession, deleteSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin"; // Default for local dev

    if (password === adminPassword) {
      await createSession();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function DELETE() {
  await deleteSession();
  return NextResponse.json({ success: true });
}
