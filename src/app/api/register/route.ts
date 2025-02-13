// src/app/api/register/route.ts
import { NextResponse } from "next/server";

// Dummy in-memory users store (for demo purposes)
const users = [];

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // For demo, push user into in-memory array
    users.push({ username, email, password });
    return NextResponse.json({ message: "Registration successful" });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

