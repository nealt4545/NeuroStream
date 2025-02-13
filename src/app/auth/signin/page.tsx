// src/app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input type="text" name="username" id="username" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input type="password" name="password" id="password" className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Sign In</button>
      </form>
      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" legacyBehavior>
          <a className="text-blue-600 underline">Register here</a>
        </Link>
      </p>
    </div>
  );
}
