"use client";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 border rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

