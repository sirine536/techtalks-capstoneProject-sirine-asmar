import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FiFileText,
  FiBookmark,
  FiUsers,
  FiUserCheck,
  FiEdit3,
} from "react-icons/fi";
import { auth } from "@/auth";
import { getDashboardData } from "@/lib/services/dashboardService";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const username = (session.user as any).username;
  const { stats, recentPosts, recentComments } = await getDashboardData(userId);

  const statCards = [
    { label: "Posts", value: stats.postsCount, icon: FiFileText, href: `/profile/${username}` },
    { label: "Bookmarks", value: stats.bookmarksCount, icon: FiBookmark, href: "/bookmarks" },
    { label: "Communities", value: stats.communitiesCount, icon: FiUsers, href: "/communities" },
    { label: "Followers", value: stats.followersCount, icon: FiUserCheck, href: `/profile/${username}` },
  ];

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#E6E8EB]">
              Welcome back, {session.user.name?.split(" ")[0]}
            </h1>
            <p className="mt-1 text-sm text-[#8B92A3]">
              Here's what's happening with your content.
            </p>
          </div>
          <Link
            href="/blogs"
            className="flex items-center gap-2 rounded-lg bg-[#7C6FF5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6558E0]"
          >
            <FiEdit3 size={14} />
            Write a post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-xl border border-[#232733] bg-[#12151C] p-4 transition-colors hover:border-[#333844]"
            >
              <Icon size={16} className="text-[#7C6FF5]" />
              <p className="mt-3 text-2xl font-semibold text-[#E6E8EB]">{value}</p>
              <p className="text-xs text-[#8B92A3]">{label}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* My recent posts */}
          <section>
            <h2 className="mb-3 text-sm font-medium text-[#E6E8EB]">
              Your recent posts
            </h2>
            {recentPosts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#232733] p-6 text-center">
                <p className="text-sm text-[#8B92A3]">
                  You haven't published anything yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post: any) => (
                  <PostCard
                    key={post._id}
                    post={{ ...post, authorId: { name: session.user?.name } }}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Comments on my posts */}
          <section>
            <h2 className="mb-3 text-sm font-medium text-[#E6E8EB]">
              Latest comments on your posts
            </h2>
            {recentComments.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#232733] p-6 text-center">
                <p className="text-sm text-[#8B92A3]">
                  No comments from others yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentComments.map((c: any) => (
                  <Link
                    key={c._id}
                    href={`/blogs/${c.postId?.slug}`}
                    className="block rounded-xl border border-[#232733] bg-[#12151C] p-4 transition-colors hover:border-[#333844]"
                  >
                    <p className="text-xs text-[#8B92A3]">
                      <span className="text-[#E6E8EB]">{c.authorId?.name}</span>{" "}
                      commented on{" "}
                      <span className="text-[#7C6FF5]">{c.postId?.title}</span>
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm text-[#8B92A3]">
                      {c.content}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}