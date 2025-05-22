"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";

export default function SecurityLoggingMonitoringVulnerable() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  const VALID_USERNAME = "admin";
  const VALID_PASSWORD = "password123";

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setLoginMessage({ type: "success", text: "Login successful! 🎉" });
    } else {
      // Vulnerable: no logging or monitoring of failed attempts
      setLoginMessage({ type: "error", text: "Invalid username or password." });
    }
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Background grid animation */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <motion.section
        className="w-full max-w-3xl prose prose-invert font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-10 text-center text-red-600 drop-shadow-md">
          🛑 Security Logging and Monitoring Failure
        </h1>

        <p className="text-green-300 text-lg leading-relaxed mb-6">
          This demo shows a login flow that does not log failed authentication
          attempts — leaving it vulnerable to brute-force and credential
          stuffing attacks.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-red-500">
          🧪 Test Instructions
        </h2>

        <ol className="list-decimal list-inside space-y-3 text-green-300 text-lg mb-8">
          <li>Login with valid credentials to confirm successful login:</li>
          <li className="ml-6">
            <code className="bg-black px-2 py-[0.15rem] rounded border border-red-600/50">
              Username: admin, Password: password123
            </code>
          </li>
          <li>Now try logging in with invalid credentials multiple times.</li>
          <li>
            Notice that there is no record or log of these failed attempts — a
            major monitoring gap.
          </li>
        </ol>

        <form onSubmit={handleLogin} className="space-y-4 mb-10">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition border border-red-600/70"
          >
            🔐 Login
          </button>
        </form>

        {loginMessage && (
          <p
            className={`mt-4 font-medium text-lg ${
              loginMessage.type === "error" ? "text-red-400" : "text-green-400"
            }`}
            role="alert"
          >
            {loginMessage.text}
          </p>
        )}

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-red-500 mb-2">
            📜 Monitoring Logs
          </h3>
          <p className="text-green-300 text-base mb-3">
            No logs recorded — even if attackers try brute-forcing:
          </p>
          <pre className="bg-gray-900 border border-gray-700 rounded p-4 text-sm text-gray-400 h-40 overflow-auto font-mono">
            (No logs available)
          </pre>
        </div>
      </motion.section>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
