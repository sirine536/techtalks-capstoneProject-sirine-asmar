

import Link from "next/link";
import { Suspense } from "react";
import AuthStatus from "@/components/AuthStatus";

export default function Navbar() {
  return (
    <nav className="border-b border-[#232733] bg-[#0B0D12]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm text-[#7C6FF5] tracking-wide">
          devcommunity
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/communities" className="text-[#8B92A3] hover:text-[#E6E8EB] transition-colors">
            Communities
          </Link>
          <Link href="/blogs" className="text-[#8B92A3] hover:text-[#E6E8EB] transition-colors">
            Blogs
          </Link>
        </div>

        <Suspense fallback={<div className="w-20 h-8" />}>
          <AuthStatus />
        </Suspense>
      </div>
    </nav>
  );
}