// app/api/summarize/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      );
    }

    // Call the OpenAI Chat Completions API using gpt-3.5-turbo
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful summarizer." },
          { role: "user", content: `Please summarize the following text:\n\n${text}` },
        ],
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    console.log("OpenAI API response:", data); // Debug log

    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { error: "No summary returned", details: data },
        { status: 500 }
      );
    }

    // Extract the summary from the chat completion response
    const summary = data.choices[0].message.content.trim();
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarizer error:", error);
    return NextResponse.json(
      { error: "Failed to summarize text" },
      { status: 500 }
    );
  }
}
