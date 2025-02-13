// src/app/api/security/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }
    
    const prompt = `Analyze the following code for common security vulnerabilities (e.g., SQL injection, XSS, insecure dependencies) and provide a list of potential issues with suggestions for remediation:\n\n${code}`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a security vulnerability analyzer." },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
      }),
    });
    
    const data = await response.json();
    if (!response.ok || !data.choices || data.choices.length === 0) {
      const errorMsg = data.error ? data.error.message : "No vulnerabilities identified";
      return NextResponse.json({ error: errorMsg, details: data }, { status: 500 });
    }
    
    const vulnerabilities = data.choices[0].message.content.trim();
    return NextResponse.json({ vulnerabilities });
  } catch (error) {
    console.error("Security Analyzer API Error:", error);
    return NextResponse.json({ error: "Failed to analyze security vulnerabilities" }, { status: 500 });
  }
}
