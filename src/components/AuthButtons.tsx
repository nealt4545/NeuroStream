"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm">Hello, {session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <button
        onClick={() => signIn()}
        className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Sign in
      </button>
    );
  }
}
