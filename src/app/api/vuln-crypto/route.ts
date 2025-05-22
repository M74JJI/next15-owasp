import { NextResponse } from "next/server";

// Simulated insecure in-memory store
const fakeDB: { username: string; password: string }[] = [];

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // ❌ Vulnerable: store password in plaintext (no hashing)
  const user = { username, password };
  fakeDB.push(user);

  return NextResponse.json({
    status: "User stored (insecurely)",
    storedUser: user,
  });
}
