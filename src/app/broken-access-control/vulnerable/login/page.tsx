"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/lib/users";
import { motion } from "framer-motion";

export default function VulnerableLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    setError("");

    // BAD: Insecure client-side cookie storing full user info
    const userCookieValue = JSON.stringify({
      id: user.id,
      name: user.email.split("@")[0],
      email: user.email,
      role: user.role,
    });

    document.cookie = `user=${userCookieValue}; path=/; max-age=86400; SameSite=Lax`;

    router.push("/broken-access-control/vulnerable/admin");
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 sm:px-6 py-12">
      {/* Subtle animated background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 border border-red-600/20 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-8 drop-shadow">
          Vulnerable Login
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-green-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-2 rounded-lg border border-green-500 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-green-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-lg border border-green-500 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 bg-red-950 border border-red-700/40 rounded-lg p-4 text-sm text-red-300">
          <h2 className="font-semibold mb-2 text-center">Test Credentials</h2>
          <ul className="space-y-1 font-mono">
            <li>
              <strong>Admin:</strong> admin@example.com / adminpass
            </li>
            <li>
              <strong>User:</strong> user@example.com / userpass
            </li>
          </ul>
          <p className="mt-3 text-center italic text-red-400">
            Use these to demonstrate the broken access control flaw.
          </p>
        </div>

        <p className="mt-6 text-center text-green-400 text-sm">
          This login stores user details in a cookie without validation — a
          serious security flaw.
        </p>
      </motion.section>
    </main>
  );
}
