// src/components/HeroSection.tsx
"use client";
import { motion } from "framer-motion";
import ChatbotTool from "./ChatbotTool";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neuroBlue to-neuroPurple opacity-80 animate-gradientBackground"></div>
      
      {/* Hero text and embedded chatbot */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-4 relative z-10"
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to Neuro Stream
        </h1>
        <p className="text-xl text-white mb-6">
          Unleashing the power of AI automation tools
        </p>
        {/* Embed ChatbotTool in a container with its own z-index */}
        <div className="mx-auto w-full max-w-md relative z-10">
          <ChatbotTool />
        </div>
      </motion.div>
    </section>
  );
}
