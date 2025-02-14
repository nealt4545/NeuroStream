// src/components/CodeRefactorTool.tsx
"use client";
import { useState } from "react";

export default function CodeRefactorTool() {
  const [inputCode, setInputCode] = useState("");
  const [refactoredCode, setRefactoredCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRefactor = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    setError("");
    setRefactoredCode("");
    try {
      const res = await fetch("/api/refactor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setRefactoredCode(data.refactoredCode);
      } else {
        setError(data.error || "Error refactoring code");
      }
    } catch (err) {
      console.error("Refactor Fetch Error:", err);
      setError("Failed to generate refactored code");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Code Refactoring Assistant</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={8}
        placeholder="Paste your code here..."
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button
        onClick={handleRefactor}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !inputCode}
      >
        {loading ? "Refactoring..." : "Refactor Code"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {refactoredCode && (
        <div className="mt-4">
          <h3 className="font-bold">Refactored Code:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{refactoredCode}</pre>
        </div>
      )}
    </div>
  );
}
