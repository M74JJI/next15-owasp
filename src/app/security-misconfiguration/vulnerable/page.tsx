"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VulnerableMisconfigPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  if (shouldThrow) {
    // Simulate an unhandled error with detailed message
    throw new Error(
      "Database connection failed at line 42: ConnectionTimeoutException"
    );
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Subtle animated background grid */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,0,0,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <motion.section
        className="w-full max-w-3xl prose prose-invert font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-10 text-center text-red-600 drop-shadow-md">
          ⚠️ Security Misconfiguration: Error Detail Exposure
        </h1>

        <p className="text-green-300 text-lg leading-relaxed mb-6">
          This demo simulates a vulnerability where detailed server errors
          (e.g., stack traces, internal exceptions) are exposed to end users —
          which can leak sensitive implementation or infrastructure details.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-red-500">
          🧪 How to Test
        </h2>

        <ol className="list-decimal list-inside space-y-3 text-green-300 text-lg mb-8">
          <li>Click the button below to simulate a server-side error.</li>
          <li>
            The app will crash and show a raw error message (as would happen
            without proper error handling in production).
          </li>
          <li>
            This reflects a misconfiguration where full error details are
            visible to users instead of being logged securely and handled
            gracefully.
          </li>
        </ol>

        <button
          onClick={() => setShouldThrow(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition duration-200 border border-red-600/70 hover:border-red-500 cursor-pointer"
        >
          💥 Simulate Server Crash
        </button>

        <p className="mt-10 text-red-500 italic text-center text-sm drop-shadow-md">
          Best practice: Show user-friendly error messages and log full details
          securely on the server.
        </p>
      </motion.section>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
