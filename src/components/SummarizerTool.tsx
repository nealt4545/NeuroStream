"use client";
import { useState } from "react";

export default function SummarizerTool() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setError(data.error || "Error summarizing text");
      }
    } catch (err) {
      setError("Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Text Summarizer</h2>
      <textarea 
        className="w-full p-2 border rounded mb-2"
        rows={6}
        placeholder="Paste your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button 
        onClick={handleSummarize}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !inputText}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {summary && (
        <div className="mt-4">
          <h3 className="font-bold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
