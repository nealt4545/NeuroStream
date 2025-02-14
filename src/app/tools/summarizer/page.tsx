// src/app/tools/summarizer/page.tsx
"use client";
import SummarizerTool from "../../../components/SummarizerTool";
import PageTransition from "../../../components/PageTransition";
import BackButton from "../../../components/BackButton";

export default function SummarizerPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/content" />
        <div className="mt-4"></div>
          <SummarizerTool />
      </div>
    </PageTransition>
  );
}


