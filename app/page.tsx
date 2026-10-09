
import Link from "next/link";
import { Suspense } from "react";
import { getFeaturedCommunities } from "@/lib/services/communityService";
import { getLatestPosts } from "@/lib/services/postService";
import CommunityCard from "@/components/CommunityCard";
import PostCard from "@/components/PostCard";
import HomeSidebar from "@/components/HomeSidebar";
import TrendingTopics from "@/components/TrendingTopics";

export const revalidate = 60;

export default async function HomePage() {
  const [communities, posts] = await Promise.all([
    getFeaturedCommunities(),
    getLatestPosts(),
  ]);

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main column */}
        <div className="min-w-0 space-y-10">
          {/* Hero */}
          <section className="rounded-2xl border border-[#232733] bg-[#12151C] p-8">
            <p className="text-xs font-mono uppercase tracking-wide text-[#7C6FF5]">
              Build · Share · Learn
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#E6E8EB] sm:text-3xl">
              Explore developer communities
            </h1>
            <p className="mt-2 max-w-lg text-sm text-[#8B92A3]">
              Join communities, read insightful blogs, share your knowledge,
              and grow with developers around the world.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/communities"
                className="rounded-lg bg-[#7C6FF5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6558E0]"
              >
                Browse Communities
              </Link>
              <Link
                href="/blogs"
                className="rounded-lg border border-[#232733] px-4 py-2 text-sm font-medium text-[#E6E8EB] transition-colors hover:border-[#333844]"
              >
                Create a Post
              </Link>
            </div>
          </section>

          {/* Featured communities */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-[#E6E8EB]">
                Featured Communities
              </h2>
              <Link href="/communities" className="text-xs text-[#7C6FF5] hover:underline">
                View all →
              </Link>
            </div>

            {communities.length === 0 ? (
              <p className="text-sm text-[#8B92A3]">No communities yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {communities.map((c: any) => (
                  <CommunityCard key={c._id} community={c} />
                ))}
              </div>
            )}
          </section>

          {/* Latest blogs */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-[#E6E8EB]">Latest Blogs</h2>
              <Link href="/blogs" className="text-xs text-[#7C6FF5] hover:underline">
                View all →
              </Link>
            </div>

            {posts.length === 0 ? (
              <p className="text-sm text-[#8B92A3]">No posts yet.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
          <Suspense fallback={<div className="h-40 rounded-xl bg-[#12151C]" />}>
            <HomeSidebar />
          </Suspense>
          <Suspense fallback={<div className="h-40 rounded-xl bg-[#12151C]" />}>
            <TrendingTopics />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}