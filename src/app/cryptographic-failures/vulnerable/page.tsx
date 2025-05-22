"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CryptoFailurePage() {
  const [status, setStatus] = useState("Waiting for test...");
  const [response, setResponse] = useState<null | Record<string, any>>(null);

  useEffect(() => {
    document.body.classList.add("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-black", "text-white");
    };
  }, []);

  const handleSimulate = async () => {
    setStatus("Sending request...");
    try {
      const res = await fetch("/api/vuln-crypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          password: "supersecret123",
        }),
      });

      const data = await res.json();
      setResponse(data);
      setStatus("Response received");
    } catch (error) {
      setStatus("Error sending request");
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden px-8 md:px-16 flex flex-col items-center pt-20 pb-16">
      {/* Animated subtle grid background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
      </div>

      <motion.article
        className="w-full max-w-3xl prose prose-invert font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-12 text-center text-red-600 drop-shadow-md">
          🔐 Cryptographic Failure: Plaintext Password Storage
        </h1>

        <p className="text-green-300 leading-relaxed text-lg mb-6">
          This demo shows a vulnerable API that stores user credentials without
          any encryption. This violates basic cryptographic security practices
          and is commonly exploited in data breaches.
        </p>

        <h2 className="text-2xl font-semibold mb-6 text-red-600">
          🧪 How to Test Using Postman
        </h2>

        <ol className="list-decimal list-inside space-y-5 leading-relaxed text-green-300 text-lg mb-8">
          <li>
            Open <strong>Postman</strong> or any API client.
          </li>
          <li>
            Send a&nbsp;
            <code className="bg-black px-1 py-[0.15rem] rounded border border-red-600/50">
              POST
            </code>
            &nbsp; request to:&nbsp;
            <code className="bg-black px-1 py-[0.15rem] rounded border border-red-600/50">
              /api/vuln-crypto
            </code>
          </li>
          <li>
            In the <strong>Body</strong> tab, select <em>raw → JSON</em> and
            send:
            <pre className="bg-black bg-opacity-60 p-3 mt-2 rounded text-sm overflow-auto border border-red-600/50 text-red-400 font-mono">{`{
  "username": "testuser",
  "password": "supersecret123"
}`}</pre>
          </li>
          <li>
            Observe that the response includes your password in plaintext:
            <pre className="bg-red-900 bg-opacity-70 text-white mt-2 p-3 rounded text-sm overflow-auto border border-red-500 font-mono">{`{
  "status": "User stored (insecurely)",
  "storedUser": {
    "username": "testuser",
    "password": "supersecret123"
  }
}`}</pre>
          </li>
        </ol>

        <button
          onClick={handleSimulate}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition duration-200 border border-red-600/70 hover:border-red-500 cursor-pointer"
        >
          🚨 Simulate Insecure Storage
        </button>

        <p className="mt-4 text-green-300 italic text-lg">{status}</p>

        {response && (
          <div className="mt-6 text-left w-full bg-red-900 bg-opacity-70 p-4 rounded text-sm text-white overflow-auto border border-red-600 font-mono">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        <p className="mt-10 text-red-500 italic text-center text-sm drop-shadow-md">
          Best practice is to hash passwords using strong algorithms (e.g.,
          bcrypt or Argon2).
        </p>
      </motion.article>

      <footer className="mt-24 text-center text-green-500 text-sm max-w-xl w-full px-4 sm:px-0 relative z-10 font-mono pb-10 pt-8 drop-shadow-md">
        &copy; {new Date().getFullYear()} Mohamed Hajji — Cybersecurity
        Awareness Project
      </footer>
    </main>
  );
}
