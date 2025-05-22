"use client";

import { motion } from "framer-motion";

export default function SecureExplanation() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-6 py-12 relative overflow-hidden">
      {/* Background grid animation */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-green-400 mb-8 text-center">
          ✅ Secure Cross-Site Scripting (XSS) Prevention
        </h1>

        <p className="text-lg text-gray-100 leading-relaxed mb-6">
          In this secure version, user comments are&nbsp;
          <strong className="text-green-300">properly sanitized</strong> and
          rendered as plain text rather than HTML. This prevents any malicious
          HTML or JavaScript from being executed.
        </p>

        <p className="text-gray-200 leading-relaxed mb-6 font-semibold">
          Key Protections:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-8">
          <li>Comments are rendered as plain text, not HTML.</li>
          <li>JSX safely escapes user input, preventing script execution.</li>
          <li>
            Server/API sanitizes or avoids rendering dangerous HTML entirely.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-400 mb-4">
          🔍 How to Verify Secure Implementation
        </h2>

        <ol className="list-decimal list-inside space-y-4 text-gray-300 mb-12">
          <li>
            <strong>Go to the Secure Comment Form:</strong>&nbsp;
            <a
              href="/cross-site-scripting/secure/comment-form"
              className="text-green-300 underline hover:text-green-400"
            >
              /secure/comment-form
            </a>
            &nbsp; and try submitting a script like&nbsp;
            <code className="bg-green-900 text-green-300 px-1 rounded text-sm">{`<script>alert('XSS!')</script>`}</code>
          </li>
          <li>It will be shown as plain text — no alert will trigger.</li>
          <li>
            <strong>View the admin panel:</strong>&nbsp;
            <a
              href="/cross-site-scripting/secure/admin"
              className="text-green-300 underline hover:text-green-400"
            >
              /secure/admin
            </a>
            &nbsp; to confirm safe rendering of all comments.
          </li>
          <li>
            <strong>Compare with vulnerable version:</strong>&nbsp;
            <a
              href="/cross-site-scripting/vulnerable/comment-form"
              className="text-green-300 underline hover:text-green-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              /vulnerable/comment-form
            </a>
            &nbsp; — the same payload will trigger an alert popup.
          </li>
          <li>
            <strong>Reset with "Delete All Comments":</strong> to test again
            from a clean slate.
          </li>
          <li>
            <strong>Inspect API Response:</strong> All comments are returned as
            plain, encoded text with no HTML tags.
          </li>
        </ol>

        <p className="text-gray-300">
          ✅ This secure setup ensures that all user input is treated as text,
          neutralizing XSS attacks completely.
        </p>
      </motion.div>
    </main>
  );
}
