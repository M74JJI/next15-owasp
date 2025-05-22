"use client";

import React, { useEffect, useState } from "react";

export default function SecureAdmin() {
  const [comments, setComments] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(data.comments);
    } catch {
      setError("Failed to load comments");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-green-900 via-gray-900 to-black p-8 md:p-16 mx-auto font-sans text-green-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-green-400 drop-shadow-lg">
        Admin - View Comments (Sanitized)
      </h1>

      {error && (
        <p className="mb-6 text-red-500 font-semibold text-center drop-shadow-md">
          {error}
        </p>
      )}

      <section className="max-w-4xl mx-auto">
        <ul className="space-y-5">
          {comments.length === 0 && (
            <p className="text-green-500 italic text-center">
              No comments found.
            </p>
          )}
          {comments.map((comment, idx) => (
            <li
              key={idx}
              className="p-5 bg-gray-800 bg-opacity-80 border border-green-700 rounded-lg font-mono text-green-300 break-words whitespace-pre-wrap shadow-inner"
            >
              {comment}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
