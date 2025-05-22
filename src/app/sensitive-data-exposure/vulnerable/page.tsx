"use client";

import React, { useState } from "react";

type UserData = {
  username: string;
  password: string;
  apiKey: string;
};

export default function SensitiveDataExposureVulnerable() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [status, setStatus] = useState("Waiting for test...");

  const handleTestRequest = async () => {
    setStatus("Sending request...");
    setUserData(null);

    try {
      const res = await fetch("/api/user/vulnerable");
      const data = await res.json();
      setUserData(data);
      setStatus("Response received");
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setStatus("Error fetching data");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 md:p-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-red-700 dark:text-red-400 mb-10">
        Vulnerable Sensitive Data Exposure
      </h1>

      <section className="w-full max-w-3xl space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This demo fetches sensitive user data including passwords and API keys
          from a client-accessible API endpoint and displays it directly. This
          represents a <strong>Sensitive Data Exposure</strong> vulnerability.
        </p>

        <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Open your browser's developer tools.</li>
          <li>
            Go to the <strong>Network</strong> tab and look for the API call
            to&nbsp;
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
              /api/user/vulnerable
            </code>
            .
          </li>
          <li>
            Inspect the response and notice the sensitive data in plaintext.
          </li>
          <li>
            Understand how exposing such secrets can lead to account compromise
            or unauthorized system access.
          </li>
        </ol>

        <button
          onClick={handleTestRequest}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-200 disabled:opacity-50"
          disabled={status === "Sending request..."}
        >
          🧪 Test Request
        </button>

        <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
          {status}
        </p>

        <div className="mt-8 bg-red-100 dark:bg-red-900 p-6 rounded-lg border border-red-300 dark:border-red-700">
          <h2 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">
            Warning
          </h2>
          <p className="text-red-800 dark:text-red-400 text-sm">
            Never expose passwords, API keys, or other sensitive data in client
            responses or UI. Always protect sensitive data using hashing,
            encryption, and secure transmission.
          </p>
        </div>

        <div className="mt-8 bg-red-50 dark:bg-red-900 p-6 rounded-lg border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300">
          <h3 className="font-semibold mb-2 text-center text-lg">
            Exposed User Data
          </h3>
          {userData ? (
            <ul className="space-y-2">
              <li>
                <strong>Username:</strong> {userData.username}
              </li>
              <li>
                <strong>Password:</strong> {userData.password}
              </li>
              <li>
                <strong>API Key:</strong> {userData.apiKey}
              </li>
            </ul>
          ) : (
            <p className="text-center">No data loaded yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
