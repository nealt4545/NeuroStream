// src/app/tools/code-generator/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import CodeGeneratorTool from "../../../components/CodeGeneratorTool";
import BackButton from "../../../components/BackButton";

export default function CodeGeneratorPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/developer" />
        <div className="mt-4">
          <CodeGeneratorTool />
        </div>
      </div>
    </PageTransition>
  );
}
