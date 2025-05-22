import { NextRequest, NextResponse } from "next/server";

let comments: string[] = [];

export async function GET() {
  return NextResponse.json({ comments });
}

export async function POST(request: NextRequest) {
  try {
    const { comment } = await request.json();

    if (typeof comment !== "string" || !comment.trim()) {
      return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
    }

    comments.push(comment);

    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  comments = [];
  return NextResponse.json({ comments });
}
