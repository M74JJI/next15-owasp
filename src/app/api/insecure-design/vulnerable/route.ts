import { NextResponse } from "next/server";

type RequestBody = {
  description: string;
  approved: boolean;
};

export async function POST(req: Request) {
  const { description, approved } = (await req.json()) as RequestBody;

  // Vulnerable: Accepting client "approved" status directly (insecure design)
  const requestRecord = {
    id: Math.random().toString(36).slice(2, 10),
    description,
    approved,
    timestamp: new Date().toISOString(),
  };

  // Normally you'd save to DB, here just echo back
  return NextResponse.json({
    status: "Request submitted",
    request: requestRecord,
    warning:
      "Approval status was accepted from client. This is insecure design and allows bypass.",
  });
}
