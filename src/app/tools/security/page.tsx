// src/app/tools/security/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import SecurityAnalyzerTool from "../../../components/SecurityAnalyzerTool";
import BackButton from "../../../components/BackButton";

export default function SecurityAnalyzerPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Back button linking to the Content AI Tools Dashboard */}
        <BackButton to="/dashboard/developer" />
        <div className="mt-4">
          <SecurityAnalyzerTool />
        </div>
      </div>
    </PageTransition>
  );
}
