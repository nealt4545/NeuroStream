// src/app/page.tsx
"use client";
import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import PageTransition from "../components/PageTransition";
import Link from "next/link";
import Carousel from "../components/Carousel";
import Modal from "../components/Modal";

export default function HomePage() {
  // State to track which tool's example is selected
  const [selectedTool, setSelectedTool] = useState<{ toolName: string; example: string } | null>(null);

  // Example details for each category

  // Developer AI Tools Examples
  const developerExamples: Record<string, string> = {
    "Code Interpreter": "Example: Explains the purpose, logic, and expected output of a code snippet.",
    "Code Generator": "Example: Generates code for a function to calculate factorials based on a natural language description.",
    "Refactoring Assistant": "Example: Suggests improvements to simplify nested logic and improve variable naming.",
    "Test Generator": "Example: Automatically generates unit tests to cover edge cases in your function.",
    "Doc Generator": "Example: Creates comprehensive documentation including function descriptions and usage examples.",
    "Code Debugger": "Example: Analyzes error logs and code to provide debugging advice.",
    "Security Analyzer": "Example: Reviews code for common security vulnerabilities and suggests fixes."
  };

  // Content AI Tools Examples
  const contentExamples: Record<string, string> = {
    "Text Summarizer": "Example: Summarizes long articles into concise, digestible paragraphs."
  };

  // Marketing Insights Tools Examples
  const marketingExamples: Record<string, string> = {
    "Sentiment Analysis": "Example: Determines if a piece of marketing text has a positive, negative, or neutral tone.",
    "Copy Generator": "Example: Generates engaging ad copy and social media posts with SEO suggestions."
  };

  // Reusable function to render a tile (receives the tool name and example text)
  const renderTile = (toolName: string, example: string) => (
    <div
      key={toolName}
      className="cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105"
      onClick={() => setSelectedTool({ toolName, example })}
    >
      <h4 className="text-xl font-bold text-black">{toolName}</h4>
      <p className="mt-2 text-black">
        Preview: {example.substring(0, 50)}...
      </p>
    </div>
  );

  return (
    <>
      <HeroSection />
      <PageTransition>
        <div className="container mx-auto p-4 text-white">
          <h2 className="text-3xl font-bold mt-8">Our AI Tools</h2>
          <p className="mt-4 text-lg">
            Explore a range of AI automation tools designed to streamline your workflow.
          </p>

          {/* Content AI Tools Preview */}
          <div className="mt-12">
            <Link href="/dashboard/content" legacyBehavior>
              <a className="block">
                <h3 className="text-2xl font-bold hover:underline">Content AI Tools</h3>
              </a>
            </Link>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(contentExamples).map((toolName) =>
                renderTile(toolName, contentExamples[toolName])
              )}
            </div>
          </div>

          {/* Developer AI Tools Preview */}
          <div className="mt-12">
            <Link href="/dashboard/developer" legacyBehavior>
              <a className="block">
                <h3 className="text-2xl font-bold hover:underline">Developer AI Tools</h3>
              </a>
            </Link>
            <div className="mt-4">
              <Carousel visibleCount={3} gap={16}>
                {Object.keys(developerExamples).map((toolName) =>
                  renderTile(toolName, developerExamples[toolName])
                )}
              </Carousel>
            </div>
          </div>

          {/* Marketing Insights Tools Preview */}
          <div className="mt-12">
            <Link href="/dashboard/marketing" legacyBehavior>
              <a className="block">
                <h3 className="text-2xl font-bold hover:underline">Marketing Insights Tools</h3>
              </a>
            </Link>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(marketingExamples).map((toolName) =>
                renderTile(toolName, marketingExamples[toolName])
              )}
            </div>
          </div>
        </div>
      </PageTransition>

      {/* Modal for tool examples */}
      <Modal isOpen={!!selectedTool} onClose={() => setSelectedTool(null)}>
        {selectedTool && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{selectedTool.toolName} Example</h2>
            <p>{selectedTool.example}</p>
          </div>
        )}
      </Modal>
    </>
  );
}


