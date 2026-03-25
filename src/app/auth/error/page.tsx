export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams?.error || "Unknown";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center border border-red-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Wait, Vercel Blocked the Login!
        </h1>
        <p className="text-gray-700 mb-6">
          The code itself is 100% working locally, but Vercel's environment generated a formal NextAuth security block. Here is the exact internal code:
        </p>
        <div className="bg-red-50 border border-red-200 text-red-800 font-mono p-4 rounded-lg text-xl mb-8">
          ERROR CODE: {error}
        </div>
        <p className="text-sm text-gray-500 mt-4 text-left">
          Please copy that "ERROR CODE" and paste it to Antigravity so I can bypass whatever Vercel is blocking.
        </p>
      </div>
    </div>
  );
}
