// src/app/api/code-debugger/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { errorLog, code } = await request.json();
    if (!errorLog || !code) {
      return NextResponse.json({ error: "Please provide both error log and code" }, { status: 400 });
    }
    
    const prompt = `Analyze the following error log and code snippet. Provide possible reasons for the error and suggest fixes or improvements:\n\nError Log:\n${errorLog}\n\nCode:\n${code}`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a code debugging assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
      }),
    });
    
    const data = await response.json();
    if (!response.ok || !data.choices || data.choices.length === 0) {
      const errorMsg = data.error ? data.error.message : "No debugging advice generated";
      return NextResponse.json({ error: errorMsg, details: data }, { status: 500 });
    }
    
    const advice = data.choices[0].message.content.trim();
    return NextResponse.json({ advice });
  } catch (error) {
    console.error("Code Debugger API Error:", error);
    return NextResponse.json({ error: "Failed to generate debugging advice" }, { status: 500 });
  }
}
