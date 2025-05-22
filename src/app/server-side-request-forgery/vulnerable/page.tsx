"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type FetchResponse = {
  status: number;
  contentType: string;
  body: any;
  error?: string;
};

export default function SSRFVulnerable() {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<FetchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/ssrf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({
        status: 0,
        contentType: "",
        body: "",
        error: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white px-4 py-10">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#ff000033_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ff555533_1px,transparent_1px)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-red-700 dark:text-red-400 mb-10">
          🔥 Server-Side Request Forgery (SSRF) Demo
        </h1>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 border border-red-500 dark:border-red-400 p-6 md:p-8 rounded-xl shadow-lg mb-10"
        >
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
            🧪 How to Test This Vulnerability
          </h2>

          <ol className="list-decimal pl-5 space-y-2 text-gray-800 dark:text-gray-300 text-sm">
            <li>
              Try a public API like&nbsp;
              <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                https://jsonplaceholder.typicode.com/posts/1
              </code>
            </li>
            <li>
              Test internal IPs like&nbsp;
              <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                http://127.0.0.1
              </code>
              &nbsp; or&nbsp;
              <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                http://localhost
              </code>
            </li>
            <li>
              Try cloud metadata endpoints:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  AWS:&nbsp;
                  <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                    http://169.254.169.254/latest/meta-data/
                  </code>
                </li>
                <li>
                  Azure:&nbsp;
                  <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                    http://169.254.169.254/metadata/instance?api-version=2021-02-01
                  </code>
                </li>
                <li>
                  GCP:&nbsp;
                  <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                    http://metadata.google.internal/computeMetadata/v1/
                  </code>
                </li>
              </ul>
            </li>
            <li>
              Try internal service ports:&nbsp;
              <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                http://127.0.0.1:8080
              </code>
            </li>
            <li>Observe the server’s response below.</li>
          </ol>

          <p className="mt-4 text-red-600 dark:text-red-400 font-semibold">
            ⚠️ This demo is intentionally vulnerable and for educational use
            only.
          </p>
        </motion.section>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 border border-red-500 dark:border-red-400 p-6 md:p-8 rounded-xl shadow-lg space-y-4"
        >
          <label
            htmlFor="url"
            className="block text-red-700 dark:text-red-400 font-medium"
          >
            Enter URL to fetch
          </label>
          <input
            id="url"
            type="url"
            required
            placeholder="https://example.com/api/data"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-red-600 hover:bg-red-700 text-white font-bold transition disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Fetch URL"}
          </button>
        </motion.form>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-white dark:bg-gray-900 border border-red-500 dark:border-red-400 p-6 md:p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
            🧾 Server Response
          </h2>

          {result === null ? (
            <p className="text-gray-700 dark:text-gray-300 italic">
              Submit a URL to view the server response here.
            </p>
          ) : result.error ? (
            <p className="text-red-600 dark:text-red-400 font-semibold">
              Error: {result.error}
            </p>
          ) : (
            <>
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Status:</strong> {result.status} |&nbsp;
                <strong>Content-Type:</strong> {result.contentType}
              </p>
              <pre className="max-h-96 overflow-auto whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 text-sm text-gray-800 dark:text-gray-200">
                {typeof result.body === "string"
                  ? result.body
                  : JSON.stringify(result.body, null, 2)}
              </pre>
            </>
          )}
        </motion.section>

        <div className="mt-6 text-center">
          <a
            href="/server-side-request-forgery"
            className="inline-block mt-4 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow transition"
          >
            🔙 Back to SSRF Demo Home
          </a>
        </div>

        <footer className="mt-20 text-center text-gray-500 dark:text-gray-400 text-sm px-4 sm:px-0">
          &copy; {new Date().getFullYear()} Mohamed Hajji — OWASP Top 10 Demo
          Project
        </footer>
      </motion.div>
    </main>
  );
}
