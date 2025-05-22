"use client";

import { useState } from "react";

type User = {
  username: string;
  role: string;
  email: string;
};

export default function SecureUserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("Waiting for test...");
  const [error, setError] = useState("");

  const handleTestRequest = async () => {
    setStatus("Sending request...");
    setUser(null);
    setError("");

    try {
      const res = await fetch("/api/user/secure");
      if (!res.ok) throw new Error("Failed to fetch user data");
      const data: User = await res.json();
      setUser(data);
      setStatus("Response received");
    } catch (err) {
      setError("Unable to load user data");
      setStatus("Error fetching data");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 md:p-16 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-10 text-center">
        Secure User Info - Data Exposure Prevention
      </h1>

      <section className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
          User Details
        </h2>

        <button
          onClick={handleTestRequest}
          className="mb-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-200"
          disabled={status === "Sending request..."}
        >
          🧪 Test Request
        </button>

        <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-4">
          {status}
        </p>

        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        )}

        {user ? (
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <strong>Username:</strong> {user.username}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Role:</strong> {user.role}
            </li>
          </ul>
        ) : (
          !error && (
            <p className="text-gray-500 dark:text-gray-400">
              No data loaded yet.
            </p>
          )
        )}

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          This page fetches user info securely without exposing sensitive data
          like passwords or API keys.
        </p>

        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-md text-green-800 dark:text-green-300 text-sm">
          <strong>Steps to verify:</strong>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>
              Open your browser's Developer Tools (F12 or right-click &rarr;
              Inspect).
            </li>
            <li>
              Go to the <code>Network</code> tab.
            </li>
            <li>
              Reload this page or click the Test Request button to see network
              requests.
            </li>
            <li>
              Look for the request to <code>/api/user/secure</code>.
            </li>
            <li>
              Click on it and view the <code>Response</code> tab — you should
              see only <code>username</code>, <code>email</code>, and&nbsp;
              <code>role</code> fields.
            </li>
            <li>
              Note that sensitive fields such as <code>password</code> and&nbsp;
              <code>apiKey</code> are <strong>NOT</strong> included.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
