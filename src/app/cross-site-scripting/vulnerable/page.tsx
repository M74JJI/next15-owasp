"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function VulnerablePage() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Animated subtle grid background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <motion.article
        className="w-full max-w-3xl prose prose-invert font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-12 text-center text-red-600 drop-shadow-md">
          Vulnerable Cross-Site Scripting (XSS) Demo
        </h1>

        <section className="mb-14">
          <p className="text-green-200 text-lg leading-relaxed mb-6">
            This version allows users to submit comments that are rendered&nbsp;
            <strong>without any sanitization or escaping</strong>. As a result,
            an attacker can inject malicious HTML or JavaScript, which will
            execute in other users' browsers.
          </p>
          <p className="text-green-200 text-lg leading-relaxed">
            You can test this by submitting a comment with script tags or HTML
            elements and then viewing it on the comment page or admin panel.
          </p>
        </section>

        <section className="space-y-6">
          <a
            href="/cross-site-scripting/vulnerable/comment-form"
            className="block p-6 bg-black/70 rounded-xl shadow-md hover:shadow-xl border border-red-600/40 hover:border-red-500 transition-all duration-300"
            aria-label="Go to Vulnerable Comment Form"
          >
            <h2 className="text-2xl font-semibold mb-2 text-red-600">
              Submit Comments (Vulnerable)
            </h2>
            <p className="text-green-200 leading-relaxed">
              Write and submit comments with no filtering — scripts will
              execute!
            </p>
          </a>

          <a
            href="/cross-site-scripting/vulnerable/admin"
            className="block p-6 bg-black/70 rounded-xl shadow-md hover:shadow-xl border border-red-600/40 hover:border-red-500 transition-all duration-300"
            aria-label="Go to Vulnerable Admin Panel"
          >
            <h2 className="text-2xl font-semibold mb-2 text-red-600">
              Admin Panel (Vulnerable)
            </h2>
            <p className="text-green-200 leading-relaxed">
              View all comments rendered as raw HTML, making this page
              vulnerable to XSS attacks.
            </p>
          </a>
        </section>
      </motion.article>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
