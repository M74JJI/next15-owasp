"use client";

import { motion } from "framer-motion";

export default function BrokenAccessControlSecureLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(34,197,94,0.05)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 border border-green-500 dark:border-green-400"
      >
        <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-6">
          ✅ Secure Broken Access Control Demo
        </h1>

        <p className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
          This secure implementation enforces access control strictly on
          the&nbsp;
          <strong className="text-green-800 dark:text-green-300">
            server side
          </strong>
          &nbsp; using proper authentication and authorization mechanisms
          (e.g.,&nbsp;
          <code className="text-sm bg-green-100 dark:bg-green-800 px-1 rounded">
            NextAuth
          </code>
          ). Users <span className="font-semibold">cannot bypass</span> access
          just by modifying cookies or local storage.
        </p>

        <ol className="mb-10 list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li>
            Go to the&nbsp;
            <a
              href="/broken-access-control/secure/login"
              className="text-green-700 dark:text-green-400 font-semibold hover:underline"
            >
              Secure Login Page
            </a>
            &nbsp; and log in with the credentials.
          </li>
          <li>
            After login, you’ll be redirected to the&nbsp;
            <a
              href="/broken-access-control/secure/admin"
              className="text-green-700 dark:text-green-400 font-semibold hover:underline"
            >
              Secure Admin Dashboard
            </a>
            , accessible only to users with the admin role.
          </li>
          <li>
            Manipulating cookies or local storage won’t help — all access checks
            are done on the&nbsp;
            <strong className="text-green-800 dark:text-green-300">
              server
            </strong>
            .
          </li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/broken-access-control/secure/login"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition font-semibold text-center"
          >
            Go to Secure Login
          </a>
          <a
            href="/broken-access-control/secure/admin"
            className="px-6 py-3 border border-green-600 text-green-700 dark:text-green-400 rounded-lg shadow-md hover:bg-green-50 dark:hover:bg-gray-800 transition font-semibold text-center"
          >
            Go to Secure Admin
          </a>
        </div>
      </motion.div>
    </main>
  );
}
