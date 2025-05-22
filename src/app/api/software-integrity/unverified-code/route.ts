import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = `
    // Malicious or benign demo code
    console.log("🚨 Executed unverified external code!");
    alert("You just ran unverified external code — this is dangerous!");
  `;

  return new Response(code, {
    status: 200,
    headers: { "Content-Type": "text/javascript" },
  });
}
