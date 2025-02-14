// src/app/tools/doc-generator/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import DocGeneratorTool from "../../../components/DocGeneratorTool";
import BackButton from "../../../components/BackButton";

export default function DocGeneratorPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/developer" />
        <div className="mt-4">
          <DocGeneratorTool />
        </div>
      </div>
    </PageTransition>
  );
}
