import { NextResponse } from "next/server";

type RequestBody = {
  description: string;
  approvedByUser: boolean;
};

export async function POST(req: Request) {
  const { description } = (await req.json()) as RequestBody;

  // Secure: ignore client approval flag, always set approved: false
  const requestRecord = {
    id: Math.random().toString(36).slice(2, 10),
    description,
    approved: false,
    timestamp: new Date().toISOString(),
    note: "Server enforced approval workflow. Approval must happen separately.",
  };

  return NextResponse.json({
    status: "Request submitted securely",
    request: requestRecord,
  });
}
