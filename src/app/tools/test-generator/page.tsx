// src/app/tools/test-generator/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import TestGeneratorTool from "../../../components/TestGeneratorTool";
import BackButton from "../../../components/BackButton";

export default function TestGeneratorPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/developer" />
        <div className="mt-4">
          <TestGeneratorTool />
        </div>
      </div>
    </PageTransition>
  );
}
