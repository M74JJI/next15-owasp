"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VulnerableMarkedPage() {
  const [markdown, setMarkdown] = useState(`# Test Button

Click this button to see if the vulnerability works:

<button onclick="alert('XSS via button!')" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">Click me</button>`);
  const [html, setHtml] = useState("");

  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  async function renderMarkdown() {
    const res = await fetch("/api/vuln-markdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markdown }),
    });
    const data = await res.json();
    setHtml(data.html);
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Subtle animated grid background */}
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
          🧨 Markdown Injection: XSS via <code>marked</code>
        </h1>

        <p className="text-green-300 text-lg leading-relaxed mb-6">
          This demo renders Markdown using a vulnerable version of&nbsp;
          <code>marked@0.3.6</code> without sanitization — making it susceptible
          to JavaScript injection.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-red-500">
          🧪 How to Test
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-green-300 text-lg mb-8">
          <li>Modify the Markdown or leave it as-is.</li>
          <li>
            Click <strong>Render Markdown</strong>.
          </li>
          <li>
            Observe that HTML is rendered and includes a clickable JS alert.
          </li>
          <li>This shows how an attacker can execute arbitrary JavaScript.</li>
        </ol>

        {/* Rendered HTML preview (vulnerable to XSS) */}
        <div
          className="prose dark:prose-invert max-w-full mb-6 bg-red-900/60 border border-red-700 rounded-lg p-6 shadow-md text-center"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <textarea
          className="w-full max-w-full h-40 rounded border border-red-600 bg-black text-white p-4 resize-none font-mono mb-4"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          aria-label="Markdown input for XSS test"
        />

        <button
          onClick={renderMarkdown}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-medium px-6 py-3 rounded transition duration-200 border border-red-500"
          aria-label="Render Markdown Button"
        >
          🚨 Render Markdown
        </button>

        <p className="mt-6 text-sm italic text-red-500 text-center">
          ⚠️ Always sanitize Markdown output or upgrade to a secure version
          of&nbsp;
          <code>marked</code>.
        </p>
      </motion.section>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
