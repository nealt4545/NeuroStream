// src/components/ToolCard.tsx
"use client";
import React from "react";

interface ToolCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export default function ToolCard({ title, description, onClick }: ToolCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
      <h4 className="text-xl font-bold text-black">{title}</h4>
      <p className="mt-2 text-black">{description}</p>
    </div>
  );
}

