import { NextResponse } from "next/server";
// @ts-ignore
import markedVuln from "marked-vuln";

export async function POST(req: Request) {
  const { markdown } = await req.json();

  // Vulnerable: directly convert markdown to HTML without sanitization
  const html = markedVuln(markdown, {
    gfm: true,
    headerIds: false,
    mangle: false,
    sanitize: false,
  });

  return NextResponse.json({ html });
}
