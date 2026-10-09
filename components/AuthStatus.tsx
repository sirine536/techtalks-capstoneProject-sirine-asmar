import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AuthStatus() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={`/profile/${(session.user as any).username}`}
          className="text-sm text-[#E6E8EB] hover:text-[#7C6FF5] transition-colors"
        >
          {session.user.name}
        </Link>
<Link
  href="/settings"
  className="text-sm text-[#8B92A3] hover:text-[#E6E8EB] transition-colors"
>
  Settings
</Link>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="text-sm text-[#8B92A3] hover:text-[#E6E8EB] border border-[#232733] hover:border-[#333844] rounded-lg px-3 py-1.5 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-sm bg-[#7C6FF5] hover:bg-[#6558E0] text-white rounded-lg px-4 py-1.5 transition-colors"
    >
      Sign in
    </Link>
  );
}