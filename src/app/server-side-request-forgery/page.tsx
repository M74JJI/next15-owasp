"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SSRFLanding() {
  return (
    <main className="min-h-screen bg-black p-8 md:p-16 flex flex-col items-center justify-center text-white">
      {/* Animated subtle grid background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold font-mono mb-10 text-center text-green-400 relative z-10"
      >
        Server-Side Request Forgery (SSRF) Demo
      </motion.h1>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="w-full max-w-3xl space-y-8 relative z-10"
      >
        {/* Vulnerable Version */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02 }}
        >
          <Link
            href="/server-side-request-forgery/vulnerable"
            className="block p-6 bg-black/70 border border-red-600/50 rounded-xl shadow-md hover:shadow-red-600/40 transition-shadow duration-300 font-mono"
            aria-label="Go to Vulnerable SSRF Version"
          >
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              Vulnerable Version
            </h2>
            <p className="text-green-200 leading-relaxed">
              The server fetches any user-supplied URL without validation,
              allowing SSRF attacks.
            </p>
          </Link>
        </motion.div>

        {/* Secure Version */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02 }}
        >
          <Link
            href="/server-side-request-forgery/secure"
            className="block p-6 bg-black/70 border border-green-600/50 rounded-xl shadow-md hover:shadow-green-600/40 transition-shadow duration-300 font-mono"
            aria-label="Go to Secure SSRF Version"
          >
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              Secure Version
            </h2>
            <p className="text-green-200 leading-relaxed">
              The server validates and restricts URLs to prevent SSRF attacks.
            </p>
          </Link>
        </motion.div>
      </motion.section>

      <footer className="mt-20 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
