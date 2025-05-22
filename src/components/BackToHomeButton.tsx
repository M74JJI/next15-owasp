"use client";

import { useRouter } from "next/navigation";

export default function BackToHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="
        fixed bottom-4 left-4
        bg-blue-600 hover:bg-blue-700
        text-white
        px-4 py-2
        rounded-md
        shadow-md
        transition
        focus:outline-none focus:ring-2 focus:ring-blue-400
        z-50
      "
      aria-label="Go back to Home page"
      title="Go back to Home"
    >
      Home
    </button>
  );
}
