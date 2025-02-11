// src/components/ToolCard.tsx
"use client";
import { motion } from "framer-motion";

interface ToolCardProps {
  id: number;
  name: string;
  category: string;
  description?: string;
  onClick: () => void;
}

export default function ToolCard({
  id,
  name,
  category,
  description,
  onClick,
}: ToolCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 m-2 min-w-[200px] cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}
