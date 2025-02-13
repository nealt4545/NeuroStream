// src/app/tools/code-debugger/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import CodeDebuggerTool from "../../../components/CodeDebuggerTool";
import BackButton from "../../../components/BackButton";

export default function CodeDebuggerPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/developer" />
        <div className="mt-4">
          <CodeDebuggerTool />
        </div>
      </div>
    </PageTransition>
  );
}
