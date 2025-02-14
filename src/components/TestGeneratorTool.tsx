// src/components/TestGeneratorTool.tsx
"use client";
import { useState } from "react";

export default function TestGeneratorTool() {
  const [inputCode, setInputCode] = useState("");
  const [tests, setTests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateTests = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    setError("");
    setTests("");
    try {
      const res = await fetch("/api/test-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setTests(data.tests);
      } else {
        setError(data.error || "Error generating tests");
      }
    } catch (err) {
      console.error("Test Generator Fetch Error:", err);
      setError("Failed to generate tests");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">AI-Powered Test Generator</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={8}
        placeholder="Paste your code here to generate tests..."
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button
        onClick={handleGenerateTests}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !inputCode}
      >
        {loading ? "Generating Tests..." : "Generate Tests"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {tests && (
        <div className="mt-4">
          <h3 className="font-bold">Generated Tests:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{tests}</pre>
        </div>
      )}
    </div>
  );
}
