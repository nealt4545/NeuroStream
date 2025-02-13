// src/app/api/refactor/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }
    
    const prompt = `Refactor the following code to improve readability and efficiency while preserving functionality. Provide only the refactored code:\n\n${code}`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a code refactoring assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
      }),
    });
    
    const data = await response.json();
    if (!response.ok || !data.choices || data.choices.length === 0) {
      const errorMsg = data.error ? data.error.message : "No refactored code generated";
      return NextResponse.json({ error: errorMsg, details: data }, { status: 500 });
    }
    
    const refactoredCode = data.choices[0].message.content.trim();
    return NextResponse.json({ refactoredCode });
  } catch (error) {
    console.error("Refactor API Error:", error);
    return NextResponse.json({ error: "Failed to generate refactored code" }, { status: 500 });
  }
}
