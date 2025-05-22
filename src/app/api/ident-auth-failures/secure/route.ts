import bcrypt from "bcryptjs";

type User = {
  username: string;
  email: string;
  role: string;
  hashedPassword: string; // for demo only
};

const users: User[] = [
  {
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    hashedPassword: bcrypt.hashSync("admin123", 10),
  },
  {
    username: "user",
    email: "user@example.com",
    role: "user",
    hashedPassword: bcrypt.hashSync("password", 10),
  },
];

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return new Response(
      JSON.stringify({ message: "Missing username or password" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, role, hashedPassword } = user;

  return new Response(
    JSON.stringify({
      message: "Login successful",
      user: { username, email, role, hashedPassword }, // put hashedPassword here
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
