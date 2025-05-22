"use client";

import React, { useState, useEffect } from "react";

export default function SecureCommentForm() {
  const [comment, setComment] = useState("");
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    if (comment.trim().length > 500) {
      setError("Comment cannot exceed 500 characters");
      return;
    }

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
        setComment("");
      } else {
        setError("Failed to submit comment");
      }
    } catch {
      setError("Failed to submit comment");
    }
  }

  async function handleDeleteAll() {
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "DELETE",
      });
      if (res.ok) {
        setComments([]);
      } else {
        setError("Failed to delete comments");
      }
    } catch {
      setError("Failed to delete comments");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-green-900 via-gray-900 to-black p-8 md:p-16 flex flex-col items-center font-sans text-green-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-green-400 drop-shadow-lg">
        Submit Comment (Secure - Sanitized)
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-gray-900 bg-opacity-70 rounded-2xl p-8 shadow-lg border border-green-700 space-y-6"
      >
        <textarea
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          placeholder="Write your comment here (max 500 characters)..."
          className="w-full p-4 rounded-lg border border-green-600 bg-gray-800 text-green-200 placeholder-green-500 resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {error && (
          <p className="text-red-500 font-semibold text-center">{error}</p>
        )}

        <div className="flex space-x-6">
          <button
            type="submit"
            className="flex-grow py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-green-100 transition shadow-lg"
          >
            Submit Comment
          </button>
          <button
            type="button"
            onClick={handleDeleteAll}
            className="py-3 px-6 bg-red-700 hover:bg-red-800 rounded-lg font-semibold text-red-200 transition shadow-lg"
          >
            Delete All Comments
          </button>
        </div>
      </form>

      <section className="mt-12 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-green-400 drop-shadow-md">
          Comments
        </h2>
        <ul className="space-y-4">
          {comments.length === 0 && (
            <p className="text-green-500 italic">No comments yet.</p>
          )}
          {comments.map((c, i) => (
            <li
              key={i}
              className="bg-gray-800 bg-opacity-70 border border-green-700 rounded-lg p-4 font-mono whitespace-pre-wrap text-green-300 shadow-inner"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
