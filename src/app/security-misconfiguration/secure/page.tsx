"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecureMisconfigPage() {
  const [error, setError] = useState<string | null>(null);

  function simulateError() {
    try {
      throw new Error("Database connection failed at line 42");
    } catch (err: any) {
      setError("Something went wrong. Please try again later.");
      // Log error on server or monitoring system instead of showing it
      console.error(err);
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-green-400 px-4 sm:px-0 py-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Background subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-small-white/[0.04] pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold mb-10 max-w-3xl text-center"
      >
        Secure Security Misconfiguration Demo
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-12 max-w-xl text-center text-green-300 leading-relaxed"
      >
        Click the button below to simulate a server error with safe error
        handling.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={simulateError}
        className="px-8 py-3 bg-green-700 rounded-lg shadow-lg text-white font-semibold hover:bg-green-800 transition"
      >
        Simulate Error
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="mt-12 max-w-xl bg-green-900 border border-green-700 rounded-lg p-6 shadow-lg text-green-300 font-mono text-center select-text"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
