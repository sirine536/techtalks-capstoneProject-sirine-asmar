import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#232733] px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-[#8B92A3] sm:flex-row">
        <p>A community for developers, by developers.</p>
        <div className="flex gap-4">
          <Link href="/" className="transition-colors hover:text-[#E6E8EB]">
            Privacy
          </Link>
          <Link href="/" className="transition-colors hover:text-[#E6E8EB]">
            Terms
          </Link>
          <Link href="/" className="transition-colors hover:text-[#E6E8EB]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}