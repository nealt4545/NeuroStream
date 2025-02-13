// src/components/CodeGeneratorTool.tsx
"use client";
import { useState } from "react";

export default function CodeGeneratorTool() {
  const [description, setDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setGeneratedCode("");
    try {
      const res = await fetch("/api/code-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCode(data.generatedCode);
      } else {
        setError(data.error || "Error generating code");
      }
    } catch (err) {
      setError("Failed to generate code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Code Generator</h2>
      <textarea
        className="w-full p-2 border rounded mb-2 text-black"
        rows={6}
        placeholder="Describe the code you need..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !description}
      >
        {loading ? "Generating..." : "Generate Code"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {generatedCode && (
        <div className="mt-4">
          <h3 className="font-bold">Generated Code:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-black">{generatedCode}</pre>
        </div>
      )}
    </div>
  );
}
