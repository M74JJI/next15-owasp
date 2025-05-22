import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Simulated secure in-memory DB
const secureDB: { username: string; hashedPassword: string }[] = [];

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // ✅ Secure: hash password before storing
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = { username, hashedPassword };
  secureDB.push(user);

  return NextResponse.json({
    status: "User securely stored",
    storedUser: user,
  });
}
