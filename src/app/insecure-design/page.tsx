"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InsecureDesignLanding() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Subtle animated grid background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <section className="w-full max-w-3xl space-y-8 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-green-400 font-mono mb-10"
        >
          Insecure Design Demo
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Link
              href="/insecure-design/vulnerable"
              className="block p-6 bg-black/70 border border-red-600/50 rounded-xl shadow-md hover:shadow-red-600/40 transition-shadow duration-300 font-mono"
              aria-label="Go to Vulnerable Version"
            >
              <h2 className="text-2xl font-semibold text-red-600 mb-2">
                Vulnerable Version
              </h2>
              <p className="text-green-200 leading-relaxed">
                The approval workflow can be bypassed by modifying client data,
                allowing unauthorized approvals.
              </p>
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Link
              href="/insecure-design/secure"
              className="block p-6 bg-black/70 border border-green-600/50 rounded-xl shadow-md hover:shadow-green-600/40 transition-shadow duration-300 font-mono"
              aria-label="Go to Secure Version"
            >
              <h2 className="text-2xl font-semibold text-green-400 mb-2">
                Secure Version
              </h2>
              <p className="text-green-200 leading-relaxed">
                Server-side validation enforces the approval process preventing
                unauthorized actions.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <footer className="mt-20 text-center pb-10 pt-8 text-sm text-green-500 font-mono relative z-10 px-4 sm:px-0 max-w-3xl w-full">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
