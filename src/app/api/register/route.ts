import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// This in-memory array is for demonstration only.
// In production, replace this with a real database.
let users: { username: string; email: string; passwordHash: string }[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if the user already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    
    // Hash the password (do not store plaintext passwords in production)
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Save the new user in the in-memory store
    users.push({ username, email, passwordHash });
    
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
