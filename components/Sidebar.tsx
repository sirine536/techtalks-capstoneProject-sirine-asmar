import Link from "next/link";
import { FiCode } from "react-icons/fi";
import NavLinks from "@/components/NavLinks";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between border-r border-[#232733] bg-[#0B0D12] p-4 lg:flex">
      <div>
        <Link href="/" className="mb-6 flex items-center gap-2.5 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C6FF5]/15 text-[#7C6FF5]">
            <FiCode size={16} />
          </span>
          <span>
            <span className="block text-sm font-semibold leading-tight text-[#E6E8EB]">
              DevCommunity
            </span>
            <span className="block text-[10px] leading-tight text-[#8B92A3]">
              Connect. Learn. Build Together.
            </span>
          </span>
        </Link>

        <NavLinks variant="sidebar" />
      </div>

      <div className="rounded-xl border border-[#232733] bg-[#12151C] p-4">
        <p className="text-sm font-medium text-[#E6E8EB]">
          Good developers build better together.
        </p>
        <p className="mt-1 text-xs text-[#8B92A3]">
          Join a community. Share knowledge. Grow your career.
        </p>
        <Link
          href="/blogs"
          className="mt-3 inline-block rounded-lg bg-[#7C6FF5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#6558E0]"
        >
          Create post →
        </Link>
      </div>
    </aside>
  );
}