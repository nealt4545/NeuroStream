// src/components/CopyGeneratorTool.tsx
"use client";
import { useState } from "react";

export default function CopyGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [generatedCopy, setGeneratedCopy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setGeneratedCopy("");
    try {
      const res = await fetch("/api/copy-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCopy(data.generatedCopy);
      } else {
        setError(data.error || "Error generating copy");
        console.error("API Error:", data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to generate copy");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Content & Copy Generator</h2>
      <textarea
        className="w-full p-2 border rounded mb-2 text-black"
        rows={3}
        placeholder="Enter a topic or product description..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !topic}
      >
        {loading ? "Generating..." : "Generate Copy"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {generatedCopy && (
        <div className="mt-4">
          <h3 className="font-bold">Generated Copy:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-black">{generatedCopy}</pre>
        </div>
      )}
    </div>
  );
}
