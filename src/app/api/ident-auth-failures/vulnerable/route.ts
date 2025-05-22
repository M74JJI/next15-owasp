import { NextResponse } from "next/server";

const users = [
  { username: "admin", password: "admin123" },
  { username: "user", password: "password" },
  { username: "guest", password: "guest" },
];

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return NextResponse.json({
        user,
        message: `✅ Login Success! Welcome, ${user.username}.`,
      });
    } else {
      return NextResponse.json(
        { message: "❌ Invalid username or password." },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "❌ Error processing login request." },
      { status: 400 }
    );
  }
}
