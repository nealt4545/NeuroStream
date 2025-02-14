// src/app/api/chatbot/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // Adjust path as needed
import { getUsage, incrementUsage } from "../../../lib/usageStore";

export async function POST(request: Request) {
  // Retrieve session information (user must be signed in)
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id as string;
  const isSubscribed = session.user.isSubscribed;
  const dailyLimit = 5;

  if (!isSubscribed) {
    const currentUsage = getUsage(userId);
    if (currentUsage >= dailyLimit) {
      return NextResponse.json(
        { error: "Daily limit reached. Please subscribe for more usage." },
        { status: 429 }
      );
    }
    incrementUsage(userId);
  }

  try {
    const { messages } = await request.json();
    if (!messages) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful chatbot assistant. Answer questions concisely." },
          ...messages,
        ],
        max_tokens: 150,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      console.error("Failed to parse JSON. Response text:", text);
      return NextResponse.json({ error: "Failed to parse response", details: text }, { status: response.status });
    }
    
    console.log("OpenAI response data:", data);
    
    if (!response.ok) {
      console.error("OpenAI API returned error status:", response.status, data);
      return NextResponse.json({ error: "OpenAI API call failed", details: data }, { status: response.status });
    }

    if (!data.choices || data.choices.length === 0) {
      const errorMsg = data.error ? data.error.message : "No response generated";
      return NextResponse.json({ error: errorMsg, details: data }, { status: 500 });
    }
    const reply = data.choices[0].message.content.trim();
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return NextResponse.json({ error: "Failed to generate chatbot response" }, { status: 500 });
  }
}

