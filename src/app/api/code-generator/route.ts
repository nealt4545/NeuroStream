// src/app/api/code-generator/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    if (!description) {
      return NextResponse.json({ error: "No description provided" }, { status: 400 });
    }

    // Use GPT-3.5-turbo to generate code based on the description
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a code generator. Generate well-formatted code based on the user's description." },
          { role: "user", content: `Please generate code based on the following description:\n\n${description}` },
        ],
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ error: "No code generated", details: data }, { status: 500 });
    }

    const generatedCode = data.choices[0].message.content.trim();
    return NextResponse.json({ generatedCode });
  } catch (error) {
    console.error("Code Generator Error:", error);
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 });
  }
}
