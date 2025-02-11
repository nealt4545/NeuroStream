"use client";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button visible only on small screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 md:hidden border rounded"
      >
        Menu
      </button>

      {/* Sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Sidebar content */}
          <div
            className="fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-800 w-64 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="mb-4 p-2 border rounded"
            >
              Close
            </button>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={() => setIsOpen(false)}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
