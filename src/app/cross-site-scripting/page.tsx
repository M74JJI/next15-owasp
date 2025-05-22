"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CrossSiteScriptingLanding() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      {/* Content */}
      <section className="w-full max-w-3xl space-y-8 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-green-400 font-mono mb-10"
        >
          Cross-Site Scripting (XSS) Demo
        </motion.h1>

        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.a
            href="/cross-site-scripting/vulnerable"
            className="block p-6 bg-black/70 border border-red-400/30 rounded-xl shadow-md hover:shadow-red-400/30 transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-2xl font-semibold text-red-400 mb-2 font-mono">
              Vulnerable Version
            </h2>
            <p className="text-green-200 font-mono leading-relaxed">
              User comments are rendered without sanitization, allowing
              arbitrary HTML/JavaScript injection (XSS).
            </p>
          </motion.a>

          <motion.a
            href="/cross-site-scripting/secure"
            className="block p-6 bg-black/70 border border-green-400/30 rounded-xl shadow-md hover:shadow-green-400/30 transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-2xl font-semibold text-green-400 mb-2 font-mono">
              Secure Version
            </h2>
            <p className="text-green-200 font-mono leading-relaxed">
              Comments are properly sanitized/escaped to prevent XSS attacks,
              ensuring safe rendering.
            </p>
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center pb-10 pt-8 text-sm text-green-500 font-mono relative z-10 px-4 sm:px-0 max-w-3xl w-full">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
