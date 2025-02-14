// src/app/tools/code-interpreter/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import CodeInterpreterTool from "../../../components/CodeInterpreterTool";
import BackButton from "../../../components/BackButton";

export default function CodeInterpreterPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/developer" />
        <div className="mt-4">
          <CodeInterpreterTool />
        </div>
      </div>
    </PageTransition>
  );
}
