// src/app/api/doc-generator/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }
    
    const prompt = `Generate comprehensive documentation for the following code. Include a description of functions, parameters, return values, and examples if applicable.\n\n${code}`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert documentation generator for code." },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
      }),
    });
    
    const data = await response.json();
    if (!response.ok || !data.choices || data.choices.length === 0) {
      const errorMsg = data.error ? data.error.message : "No documentation generated";
      return NextResponse.json({ error: errorMsg, details: data }, { status: 500 });
    }
    
    const documentation = data.choices[0].message.content.trim();
    return NextResponse.json({ documentation });
  } catch (error) {
    console.error("Doc Generator API Error:", error);
    return NextResponse.json({ error: "Failed to generate documentation" }, { status: 500 });
  }
}
