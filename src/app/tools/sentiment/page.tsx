// src/app/tools/sentiment/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import SentimentTool from "../../../components/SentimentTool";
import BackButton from "../../../components/BackButton";

export default function SentimentPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/marketing" />
        <div className="mt-4">
          <SentimentTool />
        </div>        
      </div>
    </PageTransition>
  );
}
