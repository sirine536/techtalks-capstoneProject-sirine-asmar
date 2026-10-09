import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-[#E6E8EB] mb-2">
          Page not found
        </h1>
        <p className="text-sm text-[#8B92A3] mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="text-sm bg-[#7C6FF5] hover:bg-[#6558E0] text-white rounded-lg px-4 py-2 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}