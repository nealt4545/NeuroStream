// src/components/DocGeneratorTool.tsx
"use client";
import { useState } from "react";

export default function DocGeneratorTool() {
  const [inputCode, setInputCode] = useState("");
  const [documentation, setDocumentation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateDocs = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    setError("");
    setDocumentation("");
    try {
      const res = await fetch("/api/doc-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setDocumentation(data.documentation);
      } else {
        setError(data.error || "Error generating documentation");
      }
    } catch (err) {
      console.error("Doc Generator Fetch Error:", err);
      setError("Failed to generate documentation");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Code Documentation Generator</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={8}
        placeholder="Paste your code here..."
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button
        onClick={handleGenerateDocs}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !inputCode}
      >
        {loading ? "Generating Docs..." : "Generate Documentation"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {documentation && (
        <div className="mt-4">
          <h3 className="font-bold">Documentation:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{documentation}</pre>
        </div>
      )}
    </div>
  );
}
