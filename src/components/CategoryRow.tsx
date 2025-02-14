// src/components/CategoryRow.tsx
import ToolCard from "./ToolCard";

interface Tool {
  id: number;
  name: string;
  category: string;
  description?: string;
}

interface CategoryRowProps {
  category: string;
  tools: Tool[];
  onToolSelect: (tool: Tool) => void;
}

export default function CategoryRow({ category, tools, onToolSelect }: CategoryRowProps) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {tools.map((tool) => (
          <ToolCard key={tool.id} {...tool} onClick={() => onToolSelect(tool)} />
        ))}
      </div>
    </div>
  );
}
