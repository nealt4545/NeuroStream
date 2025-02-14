// src/components/CodeDebuggerTool.tsx
"use client";
import { useState } from "react";

export default function CodeDebuggerTool() {
  const [errorLog, setErrorLog] = useState("");
  const [code, setCode] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDebug = async () => {
    if (!errorLog.trim() || !code.trim()) return;
    setLoading(true);
    setError("");
    setAdvice("");
    try {
      const res = await fetch("/api/code-debugger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ errorLog, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdvice(data.advice);
      } else {
        setError(data.error || "Error generating debugging advice");
      }
    } catch (err) {
      console.error("Code Debugger Fetch Error:", err);
      setError("Failed to generate debugging advice");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Intelligent Code Debugger/Assistant</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        placeholder="Paste error log here..."
        value={errorLog}
        onChange={(e) => setErrorLog(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={8}
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleDebug}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !errorLog || !code}
      >
        {loading ? "Analyzing..." : "Get Debugging Advice"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {advice && (
        <div className="mt-4">
          <h3 className="font-bold">Debugging Advice:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{advice}</pre>
        </div>
      )}
    </div>
  );
}
