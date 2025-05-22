export default function UnauthorizedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          🚫 Access Denied
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You do not have permission to access this page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition font-semibold"
        >
          Go to Home
        </a>
      </div>
    </section>
  );
}
