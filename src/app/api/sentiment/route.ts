// src/app/api/sentiment/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Construct a prompt for sentiment analysis
    const prompt = `Analyze the sentiment of the following text and reply with one word: Positive, Negative, or Neutral. Text: "${text}"`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a sentiment analysis assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 20,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices || data.choices.length === 0) {
      const errorMsg = data.error ? data.error.message : "Failed to generate sentiment analysis";
      return NextResponse.json({ error: errorMsg, details: data }, { status: 500 });
    }

    const sentiment = data.choices[0].message.content.trim();
    return NextResponse.json({ sentiment });
  } catch (error) {
    console.error("Sentiment API Error:", error);
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 });
  }
}
