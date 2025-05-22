import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid URL" },
        { status: 400 }
      );
    }

    const res = await fetch(url);
    const contentType = res.headers.get("content-type") || "";

    let body: any;

    if (contentType.includes("application/json")) {
      // Try parsing JSON, fallback to text if parsing fails
      try {
        body = await res.json();
      } catch {
        body = await res.text();
      }
    } else {
      body = await res.text();
    }

    return NextResponse.json({
      status: res.status,
      contentType,
      body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Fetch failed" },
      { status: 500 }
    );
  }
}
