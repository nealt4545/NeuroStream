// src/components/AnimatedLink.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface AnimatedLinkProps {
  href: string;
  text: string;
}

export default function AnimatedLink({ href, text }: AnimatedLinkProps) {
  return (
    <Link href={href} className="text-white hover:text-gray-200 transition">
      <motion.span
        whileHover={{ scale: 1.1, color: "#E0E7FF" }} // Adjust color as desired
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.span>
    </Link>
  );
}
