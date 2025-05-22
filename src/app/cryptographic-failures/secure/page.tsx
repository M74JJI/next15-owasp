"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SecureCryptoPage() {
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async () => {
    const res = await fetch("/api/secure-crypto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "secure_user",
        password: "StrongP@ssw0rd",
      }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-6 py-12 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-green-400 mb-6 text-center">
          🔐 Secure Password Handling Demo
        </h1>

        <p className="text-gray-300 text-sm mb-4">
          This demo hashes the password before storage using&nbsp;
          <code className="bg-green-900 px-1 rounded text-green-300">
            bcrypt
          </code>
          . Even if the database is compromised, raw passwords are never
          exposed.
        </p>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-3 cursor-pointer bg-green-600 hover:bg-green-700 transition rounded-lg text-white font-semibold shadow"
          >
            Simulate Signup (Secure)
          </button>
        </div>

        {response && (
          <div className="mt-8 text-sm text-gray-200">
            <strong className="block mb-2 text-green-300">
              📦 Stored User:
            </strong>
            <pre className="bg-gray-800 p-4 rounded-md text-xs break-all overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        <h2 className="text-lg font-semibold mt-10 mb-2 text-green-400">
          🧪 Testing with Postman:
        </h2>
        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-3">
          <li>
            <strong>POST</strong> to&nbsp;
            <code className="bg-gray-800 px-1 rounded">/api/secure-crypto</code>
          </li>
          <li>
            Set JSON body:
            <pre className="bg-gray-800 p-3 rounded mt-2 text-xs overflow-auto">{`{
  "username": "secure_user",
  "password": "StrongP@ssw0rd"
}`}</pre>
          </li>
          <li>
            Observe the password is securely <strong>hashed</strong> in the
            response.
          </li>
        </ol>
      </motion.div>
    </main>
  );
}
