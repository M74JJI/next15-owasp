"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SecureMarkedPage() {
  const [markdown, setMarkdown] = useState(`# Test Button

Clicking this button should NOT trigger an alert:

<button onclick="alert('XSS via button!')" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">Click me</button>`);

  const [html, setHtml] = useState("");

  async function renderMarkdown() {
    const res = await fetch("/api/secure-markdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markdown }),
    });
    const data = await res.json();
    setHtml(data.html);
  }

  return (
    <main className="relative min-h-screen bg-black text-green-400 px-4 sm:px-0 py-16 flex flex-col items-center justify-start overflow-hidden">
      {/* Background subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-small-white/[0.04] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl p-10 max-w-3xl w-full z-10"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center text-green-500">
          ✅ Secure Component: Sanitized Marked Demo
        </h1>

        <p className="text-green-300 mb-6 max-w-xl mx-auto leading-relaxed text-center">
          This demo uses a secure rendering pipeline with sanitized markdown
          input to prevent&nbsp;
          <strong className="text-green-400">XSS attacks</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mb-4">
          🔬 How to Test This Secure Version
        </h2>
        <ol className="list-decimal pl-6 mb-8 space-y-2 text-green-300 text-sm max-w-xl mx-auto">
          <li>Modify the Markdown in the textarea or keep the default.</li>
          <li>
            Click <strong>Render Markdown</strong>.
          </li>
          <li>The rendered HTML appears above.</li>
          <li>
            Clicking the button <em>will not</em> trigger an alert because
            dangerous attributes like <code>onclick</code> are sanitized.
          </li>
          <li>This shows how sanitizing input prevents XSS attacks.</li>
        </ol>

        <motion.div
          layout
          className="prose prose-invert max-w-xl mb-8 bg-green-900 bg-opacity-40 p-6 rounded-lg shadow-inner text-center mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <textarea
          className="w-full  h-40 rounded border border-green-700 bg-black bg-opacity-70 text-green-300 p-4 resize-none font-mono shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          aria-label="Markdown input for secure XSS test"
        />

        <button
          onClick={renderMarkdown}
          className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold shadow-lg transition-transform active:scale-95"
          aria-label="Render Markdown Button"
        >
          Render Markdown
        </button>

        <p className="mt-6 text-center text-green-500 italic text-sm max-w-xl mx-auto">
          ✅ Sanitization removes dangerous HTML and event handlers to secure
          markdown rendering.
        </p>
      </motion.div>
    </main>
  );
}
