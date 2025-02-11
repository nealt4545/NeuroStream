"use client"; // Needed if you're using client components inside your layout
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import Sidebar from "../components/Sidebar";
import AuthButtons from "../components/AuthButtons";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>AI Automation Tools</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <SessionProvider>
          <header className="bg-white dark:bg-gray-800 shadow p-4 sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Sidebar />
                <Link href="/" className="text-2xl font-bold">
                  AI Tools
                </Link>
              </div>
              <nav className="flex items-center space-x-6">
                <Link href="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About
                </Link>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  Contact
                </Link>
                <DarkModeToggle />
                <AuthButtons />
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-white dark:bg-gray-800 p-4 text-center text-sm">
            © 2025 AI Tools Platform
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
