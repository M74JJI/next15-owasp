"use client";
import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [comments, setComments] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments))
      .catch(() => setError("Failed to load comments"));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-red-900 via-gray-900 to-black p-8 md:p-16 flex flex-col items-center font-sans text-red-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-red-400 drop-shadow-lg">
        Admin Panel - Comments (Vulnerable to XSS)
      </h1>

      {error && (
        <p className="text-center text-red-500 font-semibold mb-8">{error}</p>
      )}

      <ul className="w-full max-w-3xl space-y-6">
        {comments.length === 0 && (
          <p className="text-red-500 italic text-center">No comments found.</p>
        )}
        {comments.map((c, i) => (
          <li
            key={i}
            className="p-6 bg-gray-800 bg-opacity-70 border border-red-700 rounded-lg font-mono whitespace-pre-wrap text-red-300 shadow-inner"
            dangerouslySetInnerHTML={{ __html: c }}
          />
        ))}
      </ul>
    </main>
  );
}
