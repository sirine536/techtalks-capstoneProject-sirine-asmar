import { Suspense } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import AuthStatus from "@/components/AuthStatus";
import NavLinks from "@/components/NavLinks";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#232733] bg-[#0B0D12]/90 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm text-[#7C6FF5] lg:hidden"
        >
          devcommunity
        </Link>

        <form action="/blogs" className="relative w-full max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B92A3]">
            <FiSearch size={14} />
          </span>
          <input
            name="search"
            type="search"
            aria-label="Search posts"
            placeholder="Search posts..."
            className="w-full rounded-lg border border-[#232733] bg-[#12151C] py-2 pl-9 pr-3 text-sm text-[#E6E8EB] outline-none placeholder:text-[#8B92A3] focus:border-[#7C6FF5]"
          />
        </form>

        <div className="ml-auto">
          <Suspense fallback={<div className="h-8 w-20" />}>
            <AuthStatus />
          </Suspense>
        </div>
      </div>

      <div className="border-t border-[#232733] lg:hidden">
        <NavLinks variant="mobile" />
      </div>
    </header>
  );
}