"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BrokenAccessControlLanding() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Animated subtle background grid */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      {/* Content section: grows and centers content */}
      <section className="flex-grow p-8 md:p-16 flex flex-col items-center justify-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-green-400 font-mono mb-10 text-center"
        >
          Broken Access Control Demo
        </motion.h1>

        <motion.div
          className="w-full max-w-3xl space-y-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            className="block"
          >
            <Link
              href="/broken-access-control/vulnerable"
              className="block p-6 bg-black/70 border border-red-400/30 rounded-xl shadow-md hover:shadow-red-400/30 transition-shadow duration-300 font-mono"
              aria-label="Go to Vulnerable Version"
            >
              <h2 className="text-2xl font-semibold text-red-400 mb-2">
                Vulnerable Version
              </h2>
              <p className="text-green-200 leading-relaxed">
                Access control based on client cookies — easily bypassable and
                insecure.
              </p>
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            className="block"
          >
            <Link
              href="/broken-access-control/secure"
              className="block p-6 bg-black/70 border border-green-400/30 rounded-xl shadow-md hover:shadow-green-400/30 transition-shadow duration-300 font-mono"
              aria-label="Go to Secure Version"
            >
              <h2 className="text-2xl font-semibold text-green-400 mb-2">
                Secure Version
              </h2>
              <p className="text-green-200 leading-relaxed">
                Access control enforced on the server using NextAuth — robust
                and secure.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer stays visible at bottom */}
      <footer className="text-center pb-10 pt-8 px-4 sm:px-0 text-sm text-green-500 font-mono relative z-10">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
