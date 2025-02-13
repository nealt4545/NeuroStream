// src/components/ChatbotTool.tsx
"use client";
import { useState } from "react";

export default function ChatbotTool() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    // Append the user's message to the conversation
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setError(data.error || "Error from API");
        console.error("API Error:", data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to send message");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white bg-opacity-100 rounded shadow text-black cursor-auto">
      <h2 className="text-xl font-bold mb-2">Chatbot Assistant</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.role === "user" ? "text-blue-600" : "text-gray-700"}`}
          >
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded mb-2 text-black"
        rows={3}
        placeholder="Type your message here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
