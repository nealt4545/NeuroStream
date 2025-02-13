// src/app/api/copy-generator/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    if (!topic) {
      return NextResponse.json({ error: "No topic provided" }, { status: 400 });
    }

    // Construct a prompt that asks the model to generate marketing copy along with SEO recommendations.
    const prompt = `Generate engaging marketing copy for the following topic or product: "${topic}". Include a catchy headline, a short description, and suggest 3 SEO keywords.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a creative marketing assistant who generates compelling copy and SEO suggestions." },
          { role: "user", content: prompt },
        ],
        max_tokens: 250,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices || data.choices.length === 0) {
      const errorMsg = data.error ? data.error.message : "No copy generated";
      return NextResponse.json({ error: errorMsg, details: data }, { status: 500 });
    }

    const generatedCopy = data.choices[0].message.content.trim();
    return NextResponse.json({ generatedCopy });
  } catch (error) {
    console.error("Copy Generator API Error:", error);
    return NextResponse.json({ error: "Failed to generate marketing copy" }, { status: 500 });
  }
}
