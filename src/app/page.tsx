"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const vulnerabilities = [
  { id: "A01", title: "Broken Access Control", link: "/broken-access-control" },
  {
    id: "A02",
    title: "Cryptographic Failures",
    link: "/cryptographic-failures",
  },
  { id: "A03", title: "Injection (XSS)", link: "/cross-site-scripting" },
  { id: "A04", title: "Insecure Design", link: "/insecure-design" },
  {
    id: "A05",
    title: "Security Misconfiguration",
    link: "/security-misconfiguration",
  },
  {
    id: "A06",
    title: "Vulnerable and Outdated Components",
    link: "/vulnerable-and-outdated-components",
  },
  {
    id: "A07",
    title: "Identification and Authentication Failures",
    link: "/identification-authentication-failures",
  },
  {
    id: "A08",
    title: "Software and Data Integrity Failures",
    link: "/software-and-data-integrity-failures",
  },
  {
    id: "A09",
    title: "Security Logging and Monitoring Failures",
    link: "/security-logging-and-monitoring-failures",
  },
  {
    id: "A10",
    title: "Server-Side Request Forgery (SSRF)",
    link: "/server-side-request-forgery",
  },
];

export default function Home() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-green-400 via-cyan-400 to-teal-500 text-transparent bg-clip-text font-mono drop-shadow-md"
        >
          OWASP Top 10
          <br />
          Cybersecurity Lab
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-md md:text-lg max-w-2xl text-green-300 font-mono mb-8 leading-relaxed"
        >
          A hands-on Next.js 15+ hacking environment to simulate, exploit, and
          fix vulnerabilities from the OWASP Top 10 list — built for
          cybersecurity enthusiasts.
        </motion.p>

        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="bg-black/70 border border-green-400/30 p-4 rounded-md text-left text-green-400 font-mono text-sm max-w-lg mx-auto shadow-lg"
        >
          {`> Initializing cyber lab...
✔ Modules loaded
✔ Vulnerable apps compiled
✔ Ready to exploit

> ./launch --target=owasp --mode=hacking`}
          &nbsp;
        </motion.pre>

        <motion.div
          className="mt-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </section>

      <section className="relative z-10 w-full max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-400">
            OWASP Vulnerabilities
          </h2>
          <p className="mt-4 text-lg text-green-200 font-mono">
            Click below to test, break, and fix each attack vector.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {vulnerabilities.map(({ id, title, link }) => (
            <motion.a
              key={id}
              href={link}
              className="group relative p-5 border border-green-400/40 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-green-400/30 transition-transform duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="absolute inset-0 bg-green-500 opacity-10 blur-lg scale-105 group-hover:opacity-20 transition" />
              <div className="relative z-10">
                <h3 className="text-xs text-green-300 font-mono">{id}</h3>
                <h4 className="mt-1 font-bold text-white text-lg font-mono">
                  {title}
                </h4>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <footer className="text-center pb-10 pt-8 text-sm text-green-500 font-mono relative z-10">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
