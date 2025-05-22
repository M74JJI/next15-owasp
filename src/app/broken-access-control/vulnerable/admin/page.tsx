import { cookies } from "next/headers";

export default async function VulnerableAdmin() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;

  let role = "user";
  let name = "Guest";

  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      role = user.role || "user";
      name = user.name || user.email || "User";
    } catch {
      role = "user";
    }
  }

  if (role !== "admin") {
    return (
      <main className="relative min-h-screen bg-black text-white px-6 py-12 flex items-center justify-center overflow-hidden">
        {/* Animated subtle grid background */}
        <div className="fixed inset-0 -z-10 opacity-30">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
        </div>

        <div className="max-w-lg w-full bg-gray-900 rounded-xl shadow-lg p-8 text-center border border-red-600/50">
          <h1 className="text-3xl font-extrabold text-red-600 mb-4 drop-shadow-md">
            Access Denied
          </h1>
          <p className="text-green-300">
            Sorry <span className="font-semibold text-red-400">{name}</span>,
            you are not authorized to view this page.
          </p>
          <p className="mt-6 text-sm text-green-400">
            You must be an <strong className="text-red-500">admin</strong> to
            access this panel.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated subtle grid background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
      </div>

      <div className="max-w-3xl w-full bg-gray-900 rounded-xl shadow-lg p-10 text-center border border-red-600/50">
        <h1 className="text-4xl font-extrabold text-red-600 mb-6 drop-shadow-md">
          🚨 Vulnerable Admin Panel
        </h1>
        <p className="text-green-300 mb-4">
          Welcome, <span className="font-semibold text-red-400">{name}</span>!
        </p>
        <p className="text-green-400">
          This panel trusts client cookies for access control. This is&nbsp;
          <strong className="text-red-500">insecure</strong> and can be bypassed
          easily by modifying cookies in browser dev tools.
        </p>
        <div className="mt-8 bg-red-950 p-6 rounded-lg border border-red-700 text-red-400">
          <h2 className="text-lg font-semibold mb-2 text-red-500">Warning</h2>
          <p className="text-red-400 text-sm">
            Never trust client-side cookies for authorization decisions in
            production systems.
          </p>
        </div>
      </div>
    </main>
  );
}
