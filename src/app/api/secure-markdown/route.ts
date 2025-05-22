import { NextResponse } from "next/server";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

marked.setOptions({
  gfm: true,
});

export async function POST(req: Request) {
  const { markdown } = await req.json();

  try {
    // Convert Markdown to raw HTML
    const rawHtml = marked.parse(markdown);

    // Sanitize the raw HTML to remove <script>, onclick, etc.
    const cleanHtml = DOMPurify.sanitize(rawHtml as any);

    return NextResponse.json({ html: cleanHtml });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to render markdown securely." },
      { status: 500 }
    );
  }
}
