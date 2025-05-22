import { NextResponse } from "next/server";

// Simulated user data, without sensitive info
const safeUserData = {
  username: "admin",
  role: "admin",
  email: "admin@example.com",
};

export async function GET() {
  // Secure: Only return non-sensitive user info
  return NextResponse.json(safeUserData);
}
