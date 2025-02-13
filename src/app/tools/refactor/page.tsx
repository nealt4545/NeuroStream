// src/app/tools/refactor/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import CodeRefactorTool from "../../../components/CodeRefactorTool";
import BackButton from "../../../components/BackButton";

export default function RefactorPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/developer" />
        <div className="mt-4">
          <CodeRefactorTool />
        </div>
      </div>
    </PageTransition>
  );
}
