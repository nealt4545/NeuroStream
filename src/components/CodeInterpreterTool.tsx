// src/components/CodeInterpreterTool.tsx
"use client";
import { useState } from "react";

export default function CodeInterpreterTool() {
  const [inputCode, setInputCode] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInterpret = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    setError("");
    setInterpretation("");
    try {
      const res = await fetch("/api/code-interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setInterpretation(data.interpretation || "No interpretation provided");
      } else {
        setError(data.error || "Error interpreting code");
      }
    } catch {
      setError("Failed to interpret code");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Code Interpreter</h2>
      <textarea
        className="w-full p-2 border rounded mb-2 text-black"
        rows={8}
        placeholder="Paste your code here..."
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button
        onClick={handleInterpret}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !inputCode}
      >
        {loading ? "Interpreting..." : "Interpret Code"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {interpretation && (
        <div className="mt-4">
          <h3 className="font-bold">Interpretation:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-black">{interpretation}</pre>
        </div>
      )}
    </div>
  );
}

