// src/app/dashboard/content/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import Link from "next/link";

export default function ContentDashboard() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold">Content AI Tools Dashboard</h1>
        <p className="mt-2 text-lg">
          Welcome to the Content AI Tools dashboard. Here you can access the full features of our tools.
        </p>
        
        {/* You could list full tool cards here which are clickable */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/tools/summarizer" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Text Summarizer</h4>
              <p className="mt-2 text-black">
                Summarize long passages of text using advanced AI algorithms.
              </p>
            </a>
          </Link>
          {/* Add additional full tool cards for content tools */}
        </div>
        
        {/* Optionally add navigation back to home */}
        <div className="mt-8">
          <Link href="/" legacyBehavior>
            <a className="text-blue-400 hover:underline">Back to Home</a>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
