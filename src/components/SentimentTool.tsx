// src/components/SentimentTool.tsx
"use client";
import { useState } from "react";

export default function SentimentTool() {
  const [inputText, setInputText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSentiment = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setSentiment("");
    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      if (res.ok) {
        setSentiment(data.sentiment);
      } else {
        setError(data.error || "Error analyzing sentiment");
      }
    } catch (err) {
      console.error("Sentiment Fetch Error:", err);
      setError("Failed to analyze sentiment");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Sentiment Analysis Tool</h2>
      <textarea
        className="w-full p-2 border rounded mb-2 text-black"
        rows={4}
        placeholder="Enter text to analyze sentiment..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        onClick={analyzeSentiment}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !inputText}
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {sentiment && (
        <div className="mt-4">
          <h3 className="font-bold">Sentiment:</h3>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
}
