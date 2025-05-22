"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SecureLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else if (res?.ok) {
      router.push("/broken-access-control/secure/admin");
    }
  }

  return (
    <section className="bg-gradient-to-br from-green-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-6 text-center">
          🔐 Secure Login (NextAuth)
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="name@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg transition"
          >
            Sign In
          </button>
        </form>

        {/* Test Credentials */}
        <div className="mt-8 bg-green-100 dark:bg-green-900 rounded-lg p-4 text-sm text-green-900 dark:text-green-300">
          <h2 className="font-semibold mb-2 text-center">
            🧪 Test Credentials
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Admin:</strong> admin@example.com / adminpass
            </li>
            <li>
              <strong>User:</strong> user@example.com / userpass
            </li>
          </ul>
          <p className="mt-2 text-center italic text-green-700 dark:text-green-400">
            Use these credentials to test secure login functionality.
          </p>
        </div>
      </div>
    </section>
  );
}
