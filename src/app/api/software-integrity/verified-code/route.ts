import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = `
    // Trusted demo code
    console.log("✅ Executed verified external code!");
    alert("You just ran verified external code — this is safe!");
  `;

  return new Response(code, {
    status: 200,
    headers: { "Content-Type": "text/javascript" },
  });
}
