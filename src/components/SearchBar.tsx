// src/components/SearchBar.tsx
interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
  }
  
  export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a tool..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    );
  }
  