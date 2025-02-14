"use client";
import { motion } from "framer-motion";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="relative flex items-center">
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded"
      >
        {text}
      </motion.div>
    </div>
  );
}
