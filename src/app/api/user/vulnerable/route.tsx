import { NextResponse } from "next/server";

export async function GET() {
  // Vulnerable: Exposes sensitive data in API response
  return NextResponse.json({
    username: "admin",
    password: "supersecret123", // exposed sensitive info
    apiKey: "abcdef-123456-789xyz",
  });
}
