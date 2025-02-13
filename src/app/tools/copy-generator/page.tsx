// src/app/tools/copy-generator/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import CopyGeneratorTool from "../../../components/CopyGeneratorTool";
import BackButton from "../../../components/BackButton";

export default function CopyGeneratorPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/marketing" />
        <div className="mt-4">
          <CopyGeneratorTool />
        </div>
      </div>
    </PageTransition>
  );
}
