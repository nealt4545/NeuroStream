// src/app/api/code-interpreter/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    // Use GPT-3.5-turbo to interpret/explain the code
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a code interpreter. Explain what the provided code does in a clear and concise manner." },
          { role: "user", content: `Please explain what the following code does:\n\n${code}` },
        ],
        max_tokens: 250,
      }),
    });

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ error: "No explanation returned", details: data }, { status: 500 });
    }

    const explanation = data.choices[0].message.content.trim();
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Code Interpreter Error:", error);
    return NextResponse.json({ error: "Failed to interpret code" }, { status: 500 });
  }
}
