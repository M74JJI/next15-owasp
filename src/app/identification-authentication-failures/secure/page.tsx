"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type User = {
  username: string;
  email: string;
  role: string;
  hashedPassword?: string; // optional
};

export default function IdentificationAuthenticationSecure() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [responseMsg, setResponseMsg] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMsg("");
    setUserData(null);
    setLoading(true);

    try {
      const res = await fetch("/api/ident-auth-failures/secure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(data.message);
        setUserData(data.user);
      } else {
        setResponseMsg(data.message || "Login failed");
      }
    } catch (error) {
      setResponseMsg("Network or server error");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-6 py-12 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-green-400 mb-6 text-center">
          🔐 Secure Identification & Authentication
        </h1>

        <p className="text-gray-300 text-sm mb-6">
          This secure login implementation hashes passwords and avoids exposing
          sensitive info in API responses.
        </p>

        <h2 className="text-green-300 font-semibold text-sm mb-2">
          🧪 Test Credentials:
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-300 mb-6 space-y-1">
          <li>
            <strong>Username:</strong> <code>admin</code> / Password:&nbsp;
            <code>admin123</code>
          </li>
          <li>
            <strong>Username:</strong> <code>user</code> / Password:&nbsp;
            <code>password</code>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-700 bg-gray-800 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-700 bg-gray-800 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {responseMsg && (
          <p
            className={`mt-6 text-center font-medium ${
              responseMsg.includes("successful")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {responseMsg}
          </p>
        )}

        {userData && (
          <div className="mt-6 bg-gray-800 p-4 rounded text-sm text-green-300 border border-green-700">
            <h3 className="font-semibold mb-2">✅ Logged-in User Info:</h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Username:</strong> {userData.username}
              </li>
              <li>
                <strong>Email:</strong> {userData.email}
              </li>
              <li>
                <strong>Role:</strong> {userData.role}
              </li>
              {userData.hashedPassword && (
                <li>
                  <strong>Hashed Password (demo):</strong>&nbsp;
                  <code className="break-all">{userData.hashedPassword}</code>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-800 rounded border border-gray-700 text-gray-300 text-sm">
          <strong className="text-green-300">📋 How to Test:</strong>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Use one of the test credentials above.</li>
            <li>
              Click the <strong>Login</strong> button.
            </li>
            <li>On success, API returns user info without sensitive fields.</li>
            <li>Try incorrect credentials to test error handling.</li>
            <li>
              Check the <code>Network</code> tab in DevTools to inspect
              requests.
            </li>
          </ol>
        </div>
      </motion.div>
    </main>
  );
}
