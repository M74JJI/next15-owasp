"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SoftwareAndDataIntegrityVulnerable() {
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const externalScriptUrl = "/api/software-integrity/unverified-code";

  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  const loadAndExecuteUnverifiedCode = async () => {
    setLoading(true);
    setLog((logs) => [...logs, "📡 Fetching external script..."]);

    try {
      const res = await fetch(externalScriptUrl);
      if (!res.ok) throw new Error("Failed to fetch external script");
      const code = await res.text();

      setLog((logs) => [...logs, "⚠️ Executing unverified external code..."]);

      // Vulnerable behavior: eval on untrusted code
      // eslint-disable-next-line no-eval
      eval(code);

      setLog((logs) => [
        ...logs,
        "✅ Execution completed — no integrity check performed.",
      ]);
    } catch (error) {
      setLog((logs) => [...logs, `❌ Error: ${(error as Error).message}`]);
    }
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Animated subtle grid background */}
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
          🧪 Software Integrity Vulnerability: Unverified Code Execution
        </h1>

        <p className="text-green-300 text-lg leading-relaxed mb-6">
          This demo simulates a scenario where external scripts are fetched and
          executed <strong>without verification</strong>. This violates software
          integrity principles and could lead to supply chain attacks.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-red-500">
          💥 Simulated Vulnerability
        </h2>

        <p className="text-green-300 text-lg leading-relaxed mb-6">
          Press the button below to fetch and execute a script using&nbsp;
          <code className="px-1 py-[0.15rem] bg-black rounded border border-red-600/50">
            eval()
          </code>
          &nbsp; — without validating its source or contents.
        </p>

        <button
          onClick={loadAndExecuteUnverifiedCode}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-lg font-medium shadow-md transition duration-200 border border-red-600/70 hover:border-red-500 cursor-pointer"
        >
          {loading ? "Loading..." : "🚨 Load & Execute Unverified Code"}
        </button>

        <div className="mt-6 bg-red-900 bg-opacity-60 p-4 rounded border border-red-600 font-mono text-sm text-red-300 overflow-y-auto max-h-64">
          {log.length === 0 ? (
            <p>
              Click the button above to simulate loading unverified external
              code.
            </p>
          ) : (
            log.map((entry, idx) => <p key={idx}>{entry}</p>)
          )}
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-red-500">
          🛠️ Steps to Reproduce
        </h2>

        <ol className="list-decimal list-inside space-y-2 text-green-300 text-lg mb-10">
          <li>Open Developer Tools (F12).</li>
          <li>Click the button above to trigger the fetch and eval process.</li>
          <li>
            Inspect the <code>Network</code> tab for the script fetch request.
          </li>
          <li>
            Observe that the code is executed&nbsp;
            <strong>without integrity verification</strong>.
          </li>
        </ol>

        <p className="mt-4 text-red-500 italic text-center text-sm drop-shadow-md">
          Best practice: Always verify third-party software via signatures,
          checksums, or Subresource Integrity (SRI).
        </p>
      </motion.section>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
