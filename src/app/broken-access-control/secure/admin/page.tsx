import { getUserSession } from "@/lib/auth";

type Session = {
  user: {
    id: string;
    email: string;
    role: string;
  };
  expires: string;
} | null;

export default async function SecureAdmin() {
  const session = (await getUserSession()) as Session;
  const role = session?.user?.role;

  if (role !== "admin") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-4">
            ❌ Access Denied
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            You do not have permission to access this page.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
          ✅ Secure Admin Panel
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Access granted based on verified <strong>server-side session</strong>.
        </p>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          You are authenticated as an admin.
        </p>
      </div>
    </section>
  );
}
