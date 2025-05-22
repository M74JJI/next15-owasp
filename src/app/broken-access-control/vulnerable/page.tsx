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
    <main className="relative min-h-screen overflow-x-hidden bg-black px-4 sm:px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Animated background grid */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
      </div>

      <motion.article
        className="w-full max-w-3xl font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-12 text-center text-red-600 drop-shadow-md">
          Broken Access Control — Vulnerable Version
        </h1>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-red-500">
            How to Test This Vulnerability
          </h2>
          <ol className="list-decimal list-inside space-y-5 leading-relaxed text-green-200 text-lg">
            <li>
              Navigate to the vulnerable login page:&nbsp;
              <a
                href="/broken-access-control/vulnerable/login"
                className="text-red-400 underline hover:text-red-300 transition-all duration-300"
              >
                /broken-access-control/vulnerable/login
              </a>
              .
            </li>
            <li>
              Log in with the provided credentials for <strong>user</strong>{" "}
              and&nbsp;
              <strong>admin</strong>. The user should see an "Unauthorized
              Access" message on the admin dashboard.
            </li>
            <li>
              Open browser dev tools (F12) and go to the&nbsp;
              <strong>Application</strong> tab.
            </li>
            <li>
              Modify the&nbsp;
              <code className="bg-black px-1 py-[0.15rem] rounded border border-green-600/50">
                user
              </code>
              &nbsp; cookie’s role from&nbsp;
              <code className="bg-black px-1 py-[0.15rem] rounded border border-green-600/50">
                user
              </code>
              &nbsp; to&nbsp;
              <code className="bg-black px-1 py-[0.15rem] rounded border border-green-600/50">
                admin
              </code>
              .
            </li>
            <li>
              Revisit:&nbsp;
              <a
                href="/broken-access-control/vulnerable/admin"
                className="text-red-400 underline hover:text-red-300 transition-all duration-300"
              >
                /broken-access-control/vulnerable/admin
              </a>
              &nbsp;to see unauthorized access succeed.
            </li>
            <li>
              You’ve now bypassed access control by tampering with client-side
              data — illustrating the vulnerability.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-red-500">
            Why This Is a Vulnerability
          </h2>
          <p className="mb-6 leading-relaxed text-green-200 text-lg">
            The app uses cookies to determine access level — specifically
            a&nbsp;
            <code className="bg-black px-1 py-[0.15rem] rounded border border-green-600/50">
              role
            </code>
            &nbsp; value. Since this can be edited by the user, it allows
            unauthorized privilege escalation.
          </p>
          <p className="leading-relaxed text-green-200 text-lg">
            Access control must be enforced on the **server-side**. Never trust
            values stored in the client to determine access permissions.
          </p>
        </section>
      </motion.article>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
