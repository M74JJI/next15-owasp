"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type ServerResponse = {
  message: string;
  user?: {
    username: string;
    password: string;
    role: string;
  };
};

export default function VulnerableLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<ServerResponse | null>(null);

  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/ident-auth-failures/vulnerable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ message: "❌ Network error or invalid response." });
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Animated subtle grid background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,0,0,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <motion.article
        className="w-full max-w-3xl prose prose-invert font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-12 text-center text-red-600 drop-shadow-md">
          🔐 Vulnerable Login Demo — Identification & Authentication Failures
        </h1>

        <section className="mb-14">
          <p className="mb-6 leading-relaxed text-green-200 text-lg">
            This form simulates an insecure login system. Passwords are stored
            and returned in plaintext, with no hashing or proper session
            handling.
          </p>

          <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 rounded border border-red-600 bg-black text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded border border-red-600 bg-black text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded transition cursor-pointer border border-red-600 hover:border-red-500 drop-shadow-md"
            >
              Login (Insecure)
            </button>
          </form>

          {response && (
            <div className="mt-10 p-6 rounded bg-red-900 bg-opacity-80 text-white text-sm font-mono">
              <p className="font-bold mb-3">{response.message}</p>
              {response.user && (
                <pre className="bg-black bg-opacity-70 p-4 rounded text-xs overflow-auto border border-red-600">
                  {JSON.stringify(response.user, null, 2)}
                </pre>
              )}
            </div>
          )}
        </section>

        <section className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-red-600">
            🧪 Test Credentials
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-300 text-lg">
            <li>
              <code className="bg-black px-2 py-1 rounded border border-red-600">
                admin / admin123
              </code>
            </li>
            <li>
              <code className="bg-black px-2 py-1 rounded border border-red-600">
                user / password
              </code>
            </li>
            <li>
              <code className="bg-black px-2 py-1 rounded border border-red-600">
                guest / guest
              </code>
            </li>
          </ul>
        </section>
      </motion.article>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
