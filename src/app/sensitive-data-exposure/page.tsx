"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SensitiveDataExposureLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 md:p-16 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-10"
      >
        Sensitive Data Exposure Demo
      </motion.h1>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="w-full max-w-3xl space-y-8"
      >
        {[
          {
            href: "/sensitive-data-exposure/vulnerable",
            title: "Vulnerable Version",
            titleColor: "text-red-700 dark:text-red-400",
            desc: "Sensitive data like passwords or API keys are exposed in plaintext, making it easy for attackers to steal them.",
            borderHover: "hover:border-red-500 dark:hover:border-red-400",
          },
          {
            href: "/sensitive-data-exposure/secure",
            title: "Secure Version",
            titleColor: "text-green-700 dark:text-green-400",
            desc: "Sensitive data is properly protected using hashing, encryption, and never exposed to clients directly.",
            borderHover: "hover:border-green-500 dark:hover:border-green-400",
          },
        ].map(({ href, title, titleColor, desc, borderHover }) => (
          <motion.div
            key={href}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Link
              href={href}
              className={`block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-transparent ${borderHover}`}
              aria-label={`Go to ${title}`}
            >
              <h2 className={`text-2xl font-semibold mb-2 ${titleColor}`}>
                {title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {desc}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      <footer className="mt-20 text-center text-gray-500 dark:text-gray-400 text-sm max-w-xl w-full px-4 sm:px-0">
        &copy; {new Date().getFullYear()} Mohamed Hajji - OWASP Demo Project
      </footer>
    </main>
  );
}
