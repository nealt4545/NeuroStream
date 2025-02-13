// src/components/ClientWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import AuthButtons from "./AuthButtons";
import PageTransition from "./PageTransition";
import AnimatedLink from "./AnimatedLink";
import ParticleBackground from "./ParticleBackground";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* Particle background rendered behind all content */}
      <ParticleBackground />
      <header className="shadow p-4 sticky top-0 z-50 bg-header-gradient">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sidebar />
            <Link href="/" className="text-3xl font-bold text-white">
              Neuro Stream
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <AnimatedLink href="/" text="Home" />
            <AnimatedLink href="/about" text="About" />
            <AnimatedLink href="/contact" text="Contact" />
            <AuthButtons />
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="bg-white p-4 text-center text-sm text-black">
        © 2025 Neuro Stream
      </footer>
    </SessionProvider>
  );
}
