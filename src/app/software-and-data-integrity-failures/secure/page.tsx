"use client";

import { useState } from "react";

export default function SoftwareAndDataIntegritySecure() {
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // External script endpoint
  const externalScriptUrl = "/api/software-integrity/verified-code";

  // The expected SHA-256 checksum of the trusted code (for demo, fixed value)
  // In real-world, this might come from a trusted source or embedded in app config
  const expectedChecksum =
    "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2";

  // Utility: Compute SHA-256 hash of string (using SubtleCrypto)
  async function computeSHA256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  const loadAndVerifyCode = async () => {
    setLoading(true);
    setLog((logs) => [
      ...logs,
      "Fetching external script from verified source...",
    ]);

    try {
      const res = await fetch(externalScriptUrl);
      if (!res.ok) throw new Error("Failed to fetch external script");
      const code = await res.text();

      setLog((logs) => [...logs, "Computing checksum of fetched code..."]);
      const checksum = await computeSHA256(code);
      setLog((logs) => [...logs, `Computed checksum: ${checksum}`]);
      setLog((logs) => [...logs, `Expected checksum: ${expectedChecksum}`]);

      if (checksum !== expectedChecksum) {
        setLog((logs) => [...logs, "Checksum mismatch! Aborting execution."]);
        setLoading(false);
        return;
      }

      setLog((logs) => [
        ...logs,
        "Checksum verified — executing trusted code...",
      ]);

      // Safe to eval now as integrity verified
      // eslint-disable-next-line no-eval
      eval(code);

      setLog((logs) => [...logs, "Execution completed successfully."]);
    } catch (error) {
      setLog((logs) => [...logs, `Error: ${(error as Error).message}`]);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 md:p-16 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-10 text-center">
        Secure Software and Data Integrity Example
      </h1>

      <section className="w-full max-w-3xl bg-gray-900 bg-opacity-80 dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 text-green-300">
        <p className="leading-relaxed text-green-300">
          This demo loads external code but&nbsp;
          <strong className="text-green-400">verifies the checksum</strong> of
          the code before executing it, preventing injection of malicious code.
        </p>

        <button
          onClick={loadAndVerifyCode}
          disabled={loading}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg transition active:scale-95"
          aria-live="polite"
          aria-busy={loading}
        >
          {loading ? "Loading..." : "Load & Verify Code"}
        </button>

        <div className="mt-6 bg-green-900 bg-opacity-70 p-4 rounded-lg border border-green-700 h-48 overflow-y-auto font-mono text-green-400 text-sm leading-relaxed shadow-inner">
          {log.length === 0 ? (
            <p>
              Click the button above to load code with integrity verification.
            </p>
          ) : (
            log.map((entry, idx) => <p key={idx}>{entry}</p>)
          )}
        </div>

        <div className="mt-6 p-4 bg-green-800 bg-opacity-70 rounded-lg border border-green-600 text-green-400 text-sm">
          <strong>Steps to Test:</strong>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>
              Open your browser Developer Tools (F12 or right-click &rarr;
              Inspect).
            </li>
            <li>
              Click the <strong>Load & Verify Code</strong> button.
            </li>
            <li>Observe the checksum computation and verification logs.</li>
            <li>
              If checksum matches, code executes safely; if not, execution is
              aborted.
            </li>
            <li>
              Inspect the <code>Network</code> tab for the script response
              from&nbsp;
              <code>{externalScriptUrl}</code>.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
