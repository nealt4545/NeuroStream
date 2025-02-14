// src/components/ToolModal.tsx
interface Tool {
    id: number;
    name: string;
    category: string;
    description?: string;
  }
  
  interface ToolModalProps {
    tool: Tool;
    onClose: () => void;
  }
  
  export default function ToolModal({ tool, onClose }: ToolModalProps) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
        {/* Modal content */}
        <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">{tool.name}</h2>
          <p className="mb-4">{tool.description}</p>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">
            Close
          </button>
        </div>
      </div>
    );
  }
  