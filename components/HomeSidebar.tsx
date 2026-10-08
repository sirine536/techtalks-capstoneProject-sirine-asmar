import Link from "next/link";
import { auth } from "@/auth";
import {
  getUserByUsername,
  getUserCommunities,
  getUserCommunitiesCount,
  getUserPostsCount,
} from "@/lib/services/userService";
import { getTechIcon } from "@/lib/techIcons";

export default async function HomeSidebar() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="rounded-xl border border-[#232733] bg-[#12151C] p-5 text-center">
        <p className="text-sm text-[#E6E8EB]">
          Sign in to join communities and track your posts.
        </p>
        <Link
          href="/login"
          className="mt-3 inline-block rounded-lg bg-[#7C6FF5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6558E0]"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const username = (session.user as any).username;
  const userId = (session.user as any).id;

  const [user, communities, postsCount] = await Promise.all([
    getUserByUsername(username),
    getUserCommunities(userId),
    getUserPostsCount(userId),
  ]);

  return (
    <div className="space-y-4">
      {/* Profile summary */}
      <div className="rounded-xl border border-[#232733] bg-[#12151C] p-5">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <img src={user.image} alt={user.name} className="h-11 w-11 rounded-full" />
          ) : (
            <div className="h-11 w-11 rounded-full bg-[#1C1F26]" />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#E6E8EB]">
              {user?.name}
            </p>
            <p className="truncate text-xs text-[#8B92A3]">@{user?.username}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between border-t border-[#232733] pt-3 text-center">
          <div>
            <p className="text-sm font-medium text-[#E6E8EB]">{postsCount}</p>
            <p className="text-xs text-[#8B92A3]">Posts</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#E6E8EB]">{communities.length}</p>
            <p className="text-xs text-[#8B92A3]">Communities</p>
          </div>
        </div>

        <Link
          href={`/profile/${username}`}
          className="mt-4 block rounded-lg border border-[#232733] py-1.5 text-center text-xs text-[#E6E8EB] transition-colors hover:border-[#7C6FF5] hover:text-[#7C6FF5]"
        >
          View profile
        </Link>
      </div>

      {/* My communities */}
      <div className="rounded-xl border border-[#232733] bg-[#12151C] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#E6E8EB]">My Communities</h3>
          <Link href="/communities" className="text-xs text-[#7C6FF5] hover:underline">
            View all
          </Link>
        </div>

        {communities.length === 0 ? (
          <p className="text-xs text-[#8B92A3]">
            You haven't joined any communities yet.
          </p>
        ) : (
          <div className="space-y-2">
            {communities.slice(0, 4).map((c: any) => {
              const { icon: Icon, bg, color } = getTechIcon(c.name);
              return (
                <Link
                  key={c._id}
                  href={`/communities/${c.slug}`}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#1C1F26]"
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-md ${bg}`}>
                    <Icon size={14} className={color} />
                  </span>
                  <span className="truncate text-xs text-[#E6E8EB]">{c.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}