"use client";

import { useState } from "react";

export default function VulnerableMisconfigPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Simulate an unhandled error with detailed message
    throw new Error(
      "Database connection failed at line 42: ConnectionTimeoutException"
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-red-900 via-gray-900 to-black p-8 md:p-16 flex flex-col items-center font-sans text-red-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-red-400 drop-shadow-lg">
        Security Misconfiguration (Vulnerable)
      </h1>

      <p className="mb-8 text-lg text-red-300 text-center max-w-2xl">
        This page demonstrates a security misconfiguration vulnerability by
        simulating a detailed unhandled server error. Click the button below to
        trigger the error.
      </p>

      <button
        onClick={() => setShouldThrow(true)}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition shadow-lg"
      >
        Simulate Server Error
      </button>

      <section className="mt-16 w-full max-w-2xl bg-red-800 bg-opacity-20 border border-red-700 rounded-xl p-6 text-sm font-mono text-red-300 shadow-inner">
        <p className="mb-2 font-semibold text-red-400">
          ⚠️ Vulnerability Insight:
        </p>
        <p>
          This type of misconfiguration may expose sensitive information like
          stack traces, internal error messages, or environment details to
          attackers. Always sanitize and suppress internal errors in production
          environments.
        </p>
      </section>
    </main>
  );
}
