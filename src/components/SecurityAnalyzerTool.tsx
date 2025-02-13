// src/components/SecurityAnalyzerTool.tsx
"use client";
import { useState } from "react";

export default function SecurityAnalyzerTool() {
  const [inputCode, setInputCode] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyzeSecurity = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    setError("");
    setVulnerabilities("");
    try {
      const res = await fetch("/api/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setVulnerabilities(data.vulnerabilities);
      } else {
        setError(data.error || "Error analyzing security vulnerabilities");
      }
    } catch (err) {
      console.error("Security Analyzer Fetch Error:", err);
      setError("Failed to analyze security vulnerabilities");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow text-black">
      <h2 className="text-xl font-bold mb-2">Security Vulnerability Analyzer</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={8}
        placeholder="Paste your code here..."
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button
        onClick={handleAnalyzeSecurity}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading || !inputCode}
      >
        {loading ? "Analyzing..." : "Analyze Security"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {vulnerabilities && (
        <div className="mt-4">
          <h3 className="font-bold">Security Vulnerabilities:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{vulnerabilities}</pre>
        </div>
      )}
    </div>
  );
}
