"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InsecureDesignSecure() {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitRequest() {
    setIsSubmitting(true);
    setResponse("Submitting...");

    try {
      const res = await fetch("/api/insecure-design/secure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Error submitting request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white px-4 py-10 sm:px-0 flex items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-small-white/[0.05] dark:bg-grid-small-white/[0.03] pointer-events-none" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-[#111] border border-gray-800 rounded-2xl shadow-lg max-w-xl w-full p-8 sm:p-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-green-400 mb-6 text-center">
          ✅ Secure Insecure Design Demo
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          This secure implementation demonstrates proper design where approval
          status is enforced server-side only. Clients cannot tamper with it.
        </p>

        <label className="block mb-6 text-left">
          <span className="text-sm font-semibold text-gray-200">
            📝 Request Description
          </span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your request"
            className="mt-2 w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <button
          onClick={submitRequest}
          disabled={!description.trim() || isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>

        {response && (
          <motion.pre
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-[#0e1a0e] border border-green-800 text-green-300 text-sm p-4 rounded-xl overflow-auto max-h-64 whitespace-pre-wrap"
          >
            {response}
          </motion.pre>
        )}

        {/* Instructions */}
        <div className="mt-10 bg-black/30 border border-gray-700 text-sm text-gray-300 p-4 rounded-lg">
          <h2 className="text-green-400 font-semibold mb-2">🔍 How to Test:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Submit any request description above.</li>
            <li>
              Observe that <code>approved: false</code> is always enforced by
              the server.
            </li>
            <li>
              Open DevTools → Network → Inspect the POST payload — it does
              <em>not</em> include any approval field.
            </li>
            <li>Server logic decides whether a request gets approved.</li>
          </ol>
        </div>
      </motion.div>
    </main>
  );
}
