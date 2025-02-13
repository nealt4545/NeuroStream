// src/components/BackButton.tsx
"use client";
import Link from "next/link";

interface BackButtonProps {
  to: string;
}

export default function BackButton({ to }: BackButtonProps) {
  return (
    <Link href={to} legacyBehavior>
      <a className="inline-block px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300">
        &larr; Back
      </a>
    </Link>
  );
}
