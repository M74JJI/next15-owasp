"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type LogEntry = {
  timestamp: string;
  username: string;
  reason: string;
};

export default function SecurityLoggingMonitoringSecure() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const VALID_USERNAME = "admin";
  const VALID_PASSWORD = "password123";

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setLoginMessage({ type: "success", text: "Login successful! 🎉" });
    } else {
      const newLog: LogEntry = {
        timestamp: new Date().toLocaleString(),
        username,
        reason: "Invalid username or password",
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]);
      setLoginMessage({ type: "error", text: "Invalid username or password." });
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white px-4 sm:px-0 py-12 flex flex-col items-center overflow-hidden">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-grid-small-white/[0.04] pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-green-400 mb-12 text-center max-w-3xl"
      >
        Secure: Security Logging and Monitoring Enabled
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full max-w-3xl space-y-10 z-10"
      >
        {/* Instructions */}
        <div className="bg-[#111] border border-green-600 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-5">
            Instructions
          </h2>
          <p className="text-gray-300 mb-3 leading-relaxed">
            Use the following valid credentials to login successfully:
          </p>
          <ul className="list-disc list-inside text-gray-300 mb-5">
            <li>
              Username: <code className="bg-gray-800 px-1 rounded">admin</code>
            </li>
            <li>
              Password:&nbsp;
              <code className="bg-gray-800 px-1 rounded">password123</code>
            </li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            Try logging in with <strong>incorrect credentials</strong> multiple
            times. Failed login attempts are <em>logged and monitored</em> here
            in real time.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[#111] border border-green-600 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Login Form (Secure)
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 text-green-300 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Username"
              required
              autoComplete="username"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 text-green-300 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Password"
              required
              autoComplete="current-password"
            />

            <button
              type="submit"
              className="w-full py-3 bg-green-700 hover:bg-green-800 disabled:bg-green-500 text-white font-semibold rounded-lg shadow transition"
            >
              Login
            </button>
          </form>

          {loginMessage && (
            <p
              role="alert"
              className={`mt-5 font-medium ${
                loginMessage.type === "error"
                  ? "text-red-600"
                  : "text-green-400"
              }`}
            >
              {loginMessage.text}
            </p>
          )}
        </div>

        {/* Logs / Monitoring */}
        <div className="bg-[#111] border border-green-600 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Logs / Monitoring
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            All failed login attempts are logged below for monitoring and
            alerting.
          </p>

          {logs.length === 0 ? (
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-black border border-green-700 rounded-lg p-5 text-green-400 text-sm h-40 overflow-auto font-mono"
            >
              No failed login attempts yet.
            </motion.pre>
          ) : (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-h-40 overflow-auto text-green-300 text-sm border border-green-700 rounded-lg p-5 font-mono bg-black"
            >
              {logs.map((log, index) => (
                <li key={index} className="mb-2">
                  <strong>{log.timestamp}</strong> - Username:&nbsp;
                  <code className="bg-green-900 px-1 rounded">
                    {log.username}
                  </code>
                  &nbsp; - <em>{log.reason}</em>
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        <a
          href="/security-logging-and-monitoring-failures"
          className="block text-center py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-md transition-colors"
          aria-label="Back to Security Logging and Monitoring Failures Landing"
        >
          ← Back to Demo Home
        </a>
      </motion.section>

      <footer className="mt-20 text-center text-gray-500 text-sm max-w-xl px-4 sm:px-0">
        &copy; {new Date().getFullYear()} Mohamed Hajji - OWASP Demo Project
      </footer>
    </main>
  );
}
