// src/app/page.tsx
"use client"; // Ensure client-side rendering for stateful components

import { useState } from "react";
import CategoryRow from "../components/CategoryRow";
import SearchBar from "../components/SearchBar";
import ToolModal from "../components/ToolModal";

// Sample data for demonstration; later, you'll fetch this from your backend
const sampleTools = [
  { id: 1, name: 'Marketing Genie', category: 'Marketing', description: 'Automate your marketing campaigns.' },
  { id: 2, name: 'Social Media Spark', category: 'Marketing', description: 'Enhance your social media strategy.' },
  { id: 3, name: 'Finance Wizard', category: 'Finance', description: 'Manage and analyze financial data.' },
  { id: 4, name: 'Budget Tracker', category: 'Finance', description: 'Keep track of your expenses easily.' },
  { id: 5, name: 'ChatBot Pro', category: 'Customer Support', description: 'Improve customer support with AI chatbots.' },
  { id: 6, name: 'Helpdesk Hero', category: 'Customer Support', description: 'Streamline customer support queries.' },
];

const categories = ["Marketing", "Finance", "Customer Support"];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTool, setSelectedTool] = useState<any>(null);

  // Filter tools based on the search term (case-insensitive)
  const filteredTools = sampleTools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered tools by category
  const toolsByCategory = categories.map((cat) => ({
    category: cat,
    tools: filteredTools.filter((tool) => tool.category === cat),
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">AI Automation Tools</h1>
      
      {/* Search component */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Category rows */}
      {toolsByCategory.map(({ category, tools }) => (
        <CategoryRow key={category} category={category} tools={tools} onToolSelect={setSelectedTool} />
      ))}

      {/* Modal for tool details */}
      {selectedTool && (
        <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
}


