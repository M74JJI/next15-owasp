"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type FetchResponse = {
  status: number;
  contentType: string;
  body: any;
  error?: string;
};

export default function SSRFSecure() {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<FetchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/ssrf-secure", {
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
    <>
      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-gray-50 dark:bg-gray-900"
        /*
        style={{
          backgroundImage:
            "radial-gradient(circle 1px at center, #22c55e 1px, transparent 1px), radial-gradient(circle 1px at center, #16a34a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
       */
      />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-start p-8 md:p-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 dark:text-green-400 mb-12 drop-shadow-md">
          Secured: Server-Side Request Forgery (SSRF) Mitigation Demo
        </h1>

        <section className="w-full max-w-4xl space-y-10">
          {/* Instructions */}
          <article className="prose dark:prose-invert bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-green-600 dark:border-green-400 p-8">
            <h2>🛡️ How SSRF Is Prevented Here</h2>
            <p>
              This demo demonstrates how to protect your server from SSRF
              attacks by:
            </p>
            <ul>
              <li>
                Validating URLs against an allowlist of safe, public domains.
              </li>
              <li>
                Rejecting URLs pointing to internal IP addresses or localhost.
              </li>
              <li>Allowing only HTTP and HTTPS protocols.</li>
              <li>Parsing URL and checking hostname/IP before fetching.</li>
            </ul>
            <p>
              This ensures attackers cannot force your server to connect to
              internal or cloud metadata services.
            </p>

            <h3>How to test this mitigation:</h3>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                Fetch allowed public URLs like&nbsp;
                <code>https://jsonplaceholder.typicode.com/posts/1</code>.
              </li>
              <li>
                Try internal IPs like <code>http://127.0.0.1</code> or&nbsp;
                <code>http://localhost</code>. These should be blocked.
              </li>
              <li>
                Test cloud metadata URLs (e.g., AWS&nbsp;
                <code>http://169.254.169.254/latest/meta-data/</code>), also
                blocked.
              </li>
              <li>
                Unsupported schemes (like ftp://) or malformed URLs are
                rejected.
              </li>
              <li>Observe error messages explaining denied requests.</li>
            </ol>

            <p className="font-semibold text-green-700 dark:text-green-400 mt-6">
              Note: The server performs strict URL validation before making
              requests.
            </p>
          </article>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-green-600 dark:border-green-400 p-8 flex flex-col space-y-6"
          >
            <label
              htmlFor="url"
              className="block text-green-700 dark:text-green-400 font-semibold text-lg"
            >
              Enter URL to fetch (only allowed URLs will succeed)
            </label>
            <input
              type="url"
              id="url"
              placeholder="https://example.com/api/data"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              aria-describedby="urlHelp"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-lg transition-shadow shadow-green-600/50 focus:outline-none focus:ring-4 focus:ring-green-400"
              aria-live="polite"
            >
              {loading ? "Fetching..." : "Fetch URL"}
            </button>
          </form>

          {/* Response */}
          <section
            aria-live="polite"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-green-600 dark:border-green-400 p-8 prose dark:prose-invert"
          >
            <h2>📡 Response</h2>
            {result === null ? (
              <p className="italic text-gray-700 dark:text-gray-300">
                Enter a URL and submit to see the response here.
              </p>
            ) : result.error ? (
              <p className="text-red-600 dark:text-red-400 font-semibold">
                Error: {result.error}
              </p>
            ) : (
              <>
                <p>
                  <strong>Status:</strong> {result.status}
                </p>
                <p>
                  <strong>Content-Type:</strong> {result.contentType}
                </p>
                <pre className="overflow-auto max-h-96 bg-gray-100 dark:bg-gray-900 p-6 rounded-xl font-mono text-sm text-green-900 dark:text-green-300 whitespace-pre-wrap shadow-inner">
                  {result.body}
                </pre>
              </>
            )}
          </section>
        </section>
      </motion.main>
    </>
  );
}
