"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";

export default function NavLinks({
  variant,
}: {
  variant: "sidebar" | "mobile";
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={
        variant === "sidebar"
          ? "flex flex-col gap-1"
          : "flex gap-1 overflow-x-auto px-4 py-2"
      }
    >
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 whitespace-nowrap rounded-lg text-sm transition-colors ${
              variant === "sidebar" ? "px-3 py-2" : "px-3 py-1.5"
            } ${
              active
                ? "bg-[#7C6FF5]/10 text-[#E6E8EB]"
                : "text-[#8B92A3] hover:bg-[#12151C] hover:text-[#E6E8EB]"
            }`}
          >
            <span className={active ? "text-[#7C6FF5]" : ""}>
              <Icon size={16} />
            </span>
            {/* abel kenet  <Icon size={16} className={active ? "text-[#7C6FF5]" : ""} />
           {label} */}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}