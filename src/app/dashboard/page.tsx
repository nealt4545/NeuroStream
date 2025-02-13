// src/app/dashboard/developer/page.tsx
"use client";
import PageTransition from "../../components/PageTransition";
import Link from "next/link";

export default function DeveloperDashboard() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold">Developer AI Tools Dashboard</h1>
        <p className="mt-2 text-lg">
          Welcome to the Developer AI Tools dashboard. Access full-featured tools below.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Code Interpreter */}
          <Link href="/tools/code-interpreter" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Code Interpreter</h4>
              <p className="mt-2 text-black">
                Understand and explain code snippets.
              </p>
            </a>
          </Link>
          {/* Code Generator */}
          <Link href="/tools/code-generator" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Code Generator</h4>
              <p className="mt-2 text-black">
                Generate code based on natural language descriptions.
              </p>
            </a>
          </Link>
          {/* Refactoring Assistant */}
          <Link href="/tools/refactor" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Refactoring Assistant</h4>
              <p className="mt-2 text-black">
                Refactor code for clarity and efficiency.
              </p>
            </a>
          </Link>
          {/* Test Generator */}
          <Link href="/tools/test-generator" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Test Generator</h4>
              <p className="mt-2 text-black">
                Generate unit tests automatically.
              </p>
            </a>
          </Link>
          {/* Documentation Generator */}
          <Link href="/tools/doc-generator" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Documentation Generator</h4>
              <p className="mt-2 text-black">
                Generate comprehensive code documentation.
              </p>
            </a>
          </Link>
          {/* Code Debugger */}
          <Link href="/tools/code-debugger" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Code Debugger</h4>
              <p className="mt-2 text-black">
                Get debugging advice for your code.
              </p>
            </a>
          </Link>
          {/* Security Analyzer */}
          <Link href="/tools/security" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Security Analyzer</h4>
              <p className="mt-2 text-black">
                Identify security vulnerabilities in your code.
              </p>
            </a>
          </Link>
        </div>
        <div className="mt-8">
          <Link href="/" legacyBehavior>
            <a className="text-blue-400 hover:underline">Back to Home</a>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
