"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function InsecureDesignVulnerable() {
  const [description, setDescription] = useState("");
  const [approved, setApproved] = useState(false); // Client controls approval (insecure)
  const [response, setResponse] = useState<string | null>(null);

  async function submitRequest() {
    setResponse("Submitting...");
    try {
      const res = await fetch("/api/insecure-design/vulnerable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, approved }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Error submitting request.");
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-4 sm:px-0 pt-20 pb-16">
      {/* Subtle animated red dot grid */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,0,0,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <motion.div
        className="w-full max-w-2xl bg-gray-900 bg-opacity-80 rounded-xl shadow-xl p-8 font-mono"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center drop-shadow-sm">
          Vulnerable Insecure Design Demo
        </h1>

        <p className="text-green-300 text-center mb-8 leading-relaxed">
          This demo simulates a flawed approval workflow where the client can
          directly mark a request as <strong>approved</strong>. This
          represents&nbsp;
          <strong>Insecure Design</strong> — security logic should never be
          client-controlled.
        </p>

        <label className="block mb-5">
          <span className="block mb-2 font-semibold text-green-200">
            Request Description
          </span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your request"
            className="w-full px-4 py-3 bg-black text-white border border-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </label>

        <label className="flex items-center space-x-3 mb-8 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={approved}
            onChange={(e) => setApproved(e.target.checked)}
            className="w-6 h-6 accent-red-600"
          />
          <span className="text-green-200 font-semibold">
            Mark as <span className="underline">Approved</span> (Client-side
            bypass)
          </span>
        </label>

        <button
          onClick={submitRequest}
          disabled={!description.trim()}
          className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 font-bold text-white rounded border border-red-700 transition cursor-pointer"
          title={
            !description.trim() ? "Please enter a description first" : undefined
          }
        >
          Submit Request
        </button>

        {response && (
          <pre className="mt-10 bg-red-900 border border-red-600 text-white p-4 rounded whitespace-pre-wrap max-h-64 overflow-auto text-sm">
            {response}
          </pre>
        )}

        <section className="mt-10 text-sm text-green-300 italic leading-relaxed">
          <strong>How to test:</strong>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>
              Submit a request with the <strong>"Approved"</strong> checkbox
              checked.
            </li>
            <li>
              Inspect the server’s response — you’ll see it marked as approved.
            </li>
            <li>
              Open DevTools →&nbsp;
              <code className="bg-black px-1 rounded text-red-500 font-mono">
                Network
              </code>
              &nbsp; → Inspect the&nbsp;
              <code className="bg-black px-1 rounded text-red-500 font-mono">
                /api/insecure-design/vulnerable
              </code>
              &nbsp; request.
            </li>
            <li>
              Notice the payload includes&nbsp;
              <code className="bg-black px-1 rounded text-red-500 font-mono">
                approved: true
              </code>
              &nbsp; directly from the client.
            </li>
            <li>
              This bypasses any real approval process — a classic insecure
              design.
            </li>
          </ol>

          <strong className="block mt-4 text-red-600">
            Never trust client-side security logic.
          </strong>
        </section>
      </motion.div>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pt-10">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
