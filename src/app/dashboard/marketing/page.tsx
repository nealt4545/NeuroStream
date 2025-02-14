// src/app/dashboard/marketing/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import Link from "next/link";

export default function MarketingDashboard() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold">Marketing Insights Tools Dashboard</h1>
        <p className="mt-2 text-lg">
          Welcome to the Marketing Insights Tools dashboard. Here you can access advanced tools to analyze marketing data and optimize campaigns.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/tools/sentiment" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Sentiment Analysis</h4>
              <p className="mt-2 text-black">
                Analyze the sentiment of your marketing text to gauge audience perception.
              </p>
            </a>
          </Link>
          <Link href="/tools/copy-generator" legacyBehavior>
            <a className="block cursor-pointer p-4 bg-white rounded shadow transition transform hover:scale-105">
              <h4 className="text-xl font-bold text-black">Copy Generator</h4>
              <p className="mt-2 text-black">
                Generate compelling marketing copy with SEO suggestions.
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
