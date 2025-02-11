"use client"; // This is a client component because it uses state and effects.
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Toggle the dark class on the <html> element
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
