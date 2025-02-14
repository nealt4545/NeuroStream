// src/app/layout.tsx
import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Neuro Stream</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* The body is a flex column so that its children can stretch */}
      <body className="min-h-screen flex flex-col bg-gray-900 text-white">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

